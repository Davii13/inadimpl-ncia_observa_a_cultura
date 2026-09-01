import { RegistroDMPC, ImportacaoDMPC, HistoricoCPF, SituacaoDMPC } from '../types';
import { mockInadimplentes } from './mockData';

/**
 * Deriva as planilhas DMPC mockup a partir da base de inadimplentes, garantindo que
 * CPF/nome/projeto sempre estejam alinhados entre a tabela principal e o histórico DMPC
 * (evita o bug de CPFs desencontrados entre as duas fontes de dados mockup).
 */
const situacaoAgosto = (index: number): SituacaoDMPC => (index % 5 === 0 ? 'regular' : 'inadimplente');

/** Evolui a situação de agosto para setembro seguindo um padrão cíclico plausível. */
const situacaoSetembro = (index: number, agosto: SituacaoDMPC): SituacaoDMPC => {
  const ciclo = index % 4;
  if (agosto === 'inadimplente') {
    // 1 em cada 4 inadimplentes de agosto regulariza em setembro.
    return ciclo === 3 ? 'regular' : 'inadimplente';
  }
  // 1 em cada 4 regulares de agosto torna-se inadimplente em setembro.
  return ciclo === 1 ? 'inadimplente' : 'regular';
};

export const mockRegistrosAgosto2026: RegistroDMPC[] = mockInadimplentes.map((item, index) => ({
  cpf: item.cpf,
  nome: item.nome,
  situacao: situacaoAgosto(index),
  periodo: '2026-08',
  projeto: item.projeto,
  idProjeto: item.idProjeto,
  municipio: item.municipio,
  linhaOrigem: index + 2,
}));

export const mockRegistrosSetembro2026: RegistroDMPC[] = mockInadimplentes.map((item, index) => ({
  cpf: item.cpf,
  nome: item.nome,
  situacao: situacaoSetembro(index, situacaoAgosto(index)),
  periodo: '2026-09',
  projeto: item.projeto,
  idProjeto: item.idProjeto,
  municipio: item.municipio,
  linhaOrigem: index + 2,
}));

export const mockImportacoes: ImportacaoDMPC[] = [
  {
    id: 'imp-2026-08',
    periodo: '2026-08',
    nomeArquivo: 'DMPC_08_2026.csv',
    dataImportacao: '2026-09-01T10:15:00Z',
    totalRegistros: mockRegistrosAgosto2026.length,
    registrosValidos: mockRegistrosAgosto2026.length,
    registrosInvalidos: 0,
    duplicadosNaPlanilha: 0,
    status: 'processado',
    usuario: 'Davi Nunes Carvalho',
    linhasInvalidas: [],
  },
  {
    id: 'imp-2026-09',
    periodo: '2026-09',
    nomeArquivo: 'DMPC_09_2026.csv',
    dataImportacao: '2026-10-01T09:40:00Z',
    totalRegistros: mockRegistrosSetembro2026.length,
    registrosValidos: mockRegistrosSetembro2026.length,
    registrosInvalidos: 0,
    duplicadosNaPlanilha: 0,
    status: 'processado',
    usuario: 'Davi Nunes Carvalho',
    linhasInvalidas: [],
  },
];

export const mockRegistrosPorImportacao: Record<string, RegistroDMPC[]> = {
  'imp-2026-08': mockRegistrosAgosto2026,
  'imp-2026-09': mockRegistrosSetembro2026,
};

export function construirHistoricoCPF(): HistoricoCPF[] {
  const todos = [...mockRegistrosAgosto2026, ...mockRegistrosSetembro2026];
  const porCpf = new Map<string, HistoricoCPF>();

  for (const registro of todos) {
    if (!porCpf.has(registro.cpf)) {
      porCpf.set(registro.cpf, { cpf: registro.cpf, nome: registro.nome, situacoes: [] });
    }
    const importacaoId = registro.periodo === '2026-08' ? 'imp-2026-08' : 'imp-2026-09';
    porCpf.get(registro.cpf)!.situacoes.push({
      periodo: registro.periodo,
      situacao: registro.situacao,
      importacaoId,
    });
  }

  for (const historico of porCpf.values()) {
    historico.situacoes.sort((a, b) => a.periodo.localeCompare(b.periodo));
  }

  return Array.from(porCpf.values());
}
