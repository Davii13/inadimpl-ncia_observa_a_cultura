import { RegistroDMPC, LinhaInvalida, SituacaoDMPC } from '../types';
import { validateCPF } from './formatters';

interface ParseResult {
  registros: RegistroDMPC[];
  invalidas: LinhaInvalida[];
  duplicados: number;
}

const normalizeCPF = (raw: string): string => raw.replace(/\D/g, '');

const parseSituacao = (raw: string): SituacaoDMPC | null => {
  const value = raw.trim().toUpperCase();
  if (['SIM', 'INADIMPLENTE', 'S', 'TRUE', '1'].includes(value)) return 'inadimplente';
  if (['NAO', 'NÃO', 'REGULAR', 'N', 'FALSE', '0'].includes(value)) return 'regular';
  return null;
};

/**
 * Parser de CSV simples e seguro (sem dependências externas com CVEs conhecidos).
 * Espera cabeçalho com colunas: cpf, nome, inadimplente, projeto, id_projeto, municipio
 * A coluna "inadimplente" é a fonte da verdade (SIM/NAO) — nunca inferimos por ausência.
 */
export function parseCSVDMPC(content: string, periodo: string): ParseResult {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const registros: RegistroDMPC[] = [];
  const invalidas: LinhaInvalida[] = [];
  const seen = new Set<string>();
  let duplicados = 0;

  if (lines.length === 0) {
    return { registros, invalidas, duplicados };
  }

  const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const idx = {
    cpf: header.indexOf('cpf'),
    nome: header.indexOf('nome'),
    inadimplente: header.indexOf('inadimplente'),
    projeto: header.indexOf('projeto'),
    idProjeto: header.indexOf('id_projeto'),
    municipio: header.indexOf('municipio'),
  };

  if (idx.cpf === -1 || idx.nome === -1 || idx.inadimplente === -1) {
    invalidas.push({
      linha: 1,
      motivo:
        'Cabeçalho inválido: são obrigatórias as colunas "cpf", "nome" e "inadimplente" (SIM/NÃO).',
    });
    return { registros, invalidas, duplicados };
  }

  for (let i = 1; i < lines.length; i++) {
    const linhaNum = i + 1;
    const cols = lines[i].split(',').map((c) => c.trim());

    const cpfRaw = cols[idx.cpf] ?? '';
    const cpf = normalizeCPF(cpfRaw);
    const nome = cols[idx.nome] ?? '';
    const situacaoRaw = cols[idx.inadimplente] ?? '';
    const situacao = parseSituacao(situacaoRaw);

    if (!cpf || !validateCPF(cpf)) {
      invalidas.push({ linha: linhaNum, motivo: 'CPF ausente ou em formato inválido', conteudo: cpfRaw });
      continue;
    }

    if (!nome) {
      invalidas.push({ linha: linhaNum, motivo: 'Nome ausente', conteudo: lines[i] });
      continue;
    }

    if (situacao === null) {
      invalidas.push({
        linha: linhaNum,
        motivo: `Valor de "inadimplente" não reconhecido: "${situacaoRaw}" (use SIM/NAO)`,
        conteudo: lines[i],
      });
      continue;
    }

    if (seen.has(cpf)) {
      duplicados++;
      continue;
    }
    seen.add(cpf);

    registros.push({
      cpf,
      nome,
      situacao,
      periodo,
      projeto: idx.projeto !== -1 ? cols[idx.projeto] : undefined,
      idProjeto: idx.idProjeto !== -1 ? cols[idx.idProjeto] : undefined,
      municipio: idx.municipio !== -1 ? cols[idx.municipio] : undefined,
      linhaOrigem: linhaNum,
    });
  }

  return { registros, invalidas, duplicados };
}
