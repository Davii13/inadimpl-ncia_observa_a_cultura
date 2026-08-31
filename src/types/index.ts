export interface Inadimplente {
  id: string;
  cpf: string;
  nome: string;
  projeto: string;
  numeroProjetosRelacionados?: number;
  idProjeto: string;
  statusInadimplencia: 'ativo' | 'resolvido' | 'pendente' | 'cancelado';
  dataPeriodo: string;
  municipio: string;
  executor: string;
  representante: string;
  dataRegistro?: string;
}

export interface ProjetoOption {
  id: string;
  nome: string;
  numero: string;
}

export type SituacaoDMPC = 'inadimplente' | 'regular';

export type TipoAlteracao =
  | 'novo_inadimplente'
  | 'continua_inadimplente'
  | 'deixou_inadimplente'
  | 'permanece_regular'
  | 'novo_no_sistema'
  | 'ausente_no_periodo';

export interface FiltrosInadimplencia {
  cpf: string;
  projetoId: string;
  dataInicial: string;
  dataFinal: string;
  alteracao?: TipoAlteracao | 'todos';
}

/** Uma linha de CPF dentro de uma planilha DMPC processada. */
export interface RegistroDMPC {
  cpf: string;
  nome: string;
  situacao: SituacaoDMPC;
  periodo: string; // formato "YYYY-MM"
  projeto?: string;
  idProjeto?: string;
  municipio?: string;
  linhaOrigem: number;
  observacoes?: string;
}

/** Situação consolidada de um CPF em um período específico (nó do histórico). */
export interface SituacaoPeriodo {
  periodo: string; // "YYYY-MM"
  situacao: SituacaoDMPC;
  importacaoId: string;
}

/** Histórico temporal completo de um CPF ao longo das importações DMPC. */
export interface HistoricoCPF {
  cpf: string;
  nome: string;
  situacoes: SituacaoPeriodo[]; // ordenado cronologicamente
}

export type StatusImportacao = 'processado' | 'processando' | 'erro' | 'cancelado';

export interface LinhaInvalida {
  linha: number;
  motivo: string;
  conteudo?: string;
}

export interface ImportacaoDMPC {
  id: string;
  periodo: string; // "YYYY-MM"
  nomeArquivo: string;
  dataImportacao: string; // ISO
  totalRegistros: number;
  registrosValidos: number;
  registrosInvalidos: number;
  duplicadosNaPlanilha: number;
  status: StatusImportacao;
  usuario: string;
  linhasInvalidas: LinhaInvalida[];
}

/** Resultado da comparação entre uma importação e o período anterior. */
export interface ComparativoImportacao {
  importacaoId: string;
  periodo: string;
  periodoAnterior: string | null;
  totalAnalisados: number;
  totalInadimplentes: number;
  totalRegulares: number;
  novosInadimplentes: number;
  deixaramDeSerInadimplentes: number;
  continuamInadimplentes: number;
  permanecemRegulares: number;
  novosNoSistema: number;
  ausentesNoPeriodoAtual: number;
}

export interface DetalheAlteracaoCPF {
  cpf: string;
  nome: string;
  tipoAlteracao: TipoAlteracao;
  situacaoAnterior: SituacaoDMPC | null;
  situacaoAtual: SituacaoDMPC | null;
}
