import {
  RegistroDMPC,
  ComparativoImportacao,
  DetalheAlteracaoCPF,
  TipoAlteracao,
} from '../types';

/**
 * Compara os registros de uma importação com os da importação do período imediatamente
 * anterior. A regra central: a situação de um CPF só é conhecida quando ele aparece
 * explicitamente na planilha com a coluna "inadimplente" preenchida. Um CPF que não
 * aparece na planilha atual é marcado como "ausente_no_periodo" — NUNCA é presumido
 * como tendo deixado de ser inadimplente.
 */
export function compararPeriodos(
  atual: RegistroDMPC[],
  anterior: RegistroDMPC[] | null,
  importacaoId: string,
  periodo: string,
  periodoAnterior: string | null
): { comparativo: ComparativoImportacao; detalhes: DetalheAlteracaoCPF[] } {
  const mapaAtual = new Map(atual.map((r) => [r.cpf, r]));
  const mapaAnterior = new Map((anterior ?? []).map((r) => [r.cpf, r]));

  const detalhes: DetalheAlteracaoCPF[] = [];

  let novosInadimplentes = 0;
  let deixaramDeSerInadimplentes = 0;
  let continuamInadimplentes = 0;
  let permanecemRegulares = 0;
  let novosNoSistema = 0;

  for (const registro of atual) {
    const anteriorRegistro = mapaAnterior.get(registro.cpf);
    let tipo: TipoAlteracao;

    if (!anteriorRegistro) {
      tipo = 'novo_no_sistema';
      novosNoSistema++;
    } else if (anteriorRegistro.situacao === 'inadimplente' && registro.situacao === 'inadimplente') {
      tipo = 'continua_inadimplente';
      continuamInadimplentes++;
    } else if (anteriorRegistro.situacao === 'inadimplente' && registro.situacao === 'regular') {
      tipo = 'deixou_inadimplente';
      deixaramDeSerInadimplentes++;
    } else if (anteriorRegistro.situacao === 'regular' && registro.situacao === 'inadimplente') {
      tipo = 'novo_inadimplente';
      novosInadimplentes++;
    } else {
      tipo = 'permanece_regular';
      permanecemRegulares++;
    }

    detalhes.push({
      cpf: registro.cpf,
      nome: registro.nome,
      tipoAlteracao: tipo,
      situacaoAnterior: anteriorRegistro?.situacao ?? null,
      situacaoAtual: registro.situacao,
    });
  }

  let ausentesNoPeriodoAtual = 0;
  for (const registroAnterior of anterior ?? []) {
    if (!mapaAtual.has(registroAnterior.cpf)) {
      ausentesNoPeriodoAtual++;
      detalhes.push({
        cpf: registroAnterior.cpf,
        nome: registroAnterior.nome,
        tipoAlteracao: 'ausente_no_periodo',
        situacaoAnterior: registroAnterior.situacao,
        situacaoAtual: null,
      });
    }
  }

  const totalInadimplentes = atual.filter((r) => r.situacao === 'inadimplente').length;
  const totalRegulares = atual.filter((r) => r.situacao === 'regular').length;

  const comparativo: ComparativoImportacao = {
    importacaoId,
    periodo,
    periodoAnterior,
    totalAnalisados: atual.length,
    totalInadimplentes,
    totalRegulares,
    novosInadimplentes,
    deixaramDeSerInadimplentes,
    continuamInadimplentes,
    permanecemRegulares,
    novosNoSistema,
    ausentesNoPeriodoAtual,
  };

  return { comparativo, detalhes };
}
