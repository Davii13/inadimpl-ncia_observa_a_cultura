export type Mecanismo = 'FEC' | 'LEIC';

export const STATUS_PROJETO_OPTIONS = [
  'Agendado',
  'Agendado [Em captação]',
  'Ajuste a ser feito pela Equipe Técnica - Projeto em execução',
  'Aprovado',
  'Aprovado não classificado',
  'CA Prorrogação Assinada',
  'Certidão de Aprovação assinada',
  'Declaração de Incentivo Homologada',
  'Desistência do Executor',
  'Diligência Readequação',
  'Emitir Certificado',
  'Fato relevante [Em captação]',
  'Fato relevante [Em execução]',
  'Fato relevante [Encerrado]',
  'Fato relevante [Expirado]',
  'Fato relevante [Indeferidos]',
  'Inadimplente',
  'Indeferido',
  'Início Cadastro',
  'Nova Readequação Aprovada',
  'Prazo de Captação Expirado',
  'Prazo de Captação Prorrogado',
  'Prazo de execução encerrado',
  'Protocolo',
  'Readequação Aprovada',
  'Readequação em tramitação',
  'Readequação Reprovada',
  'Reajuste Reprovado',
  'Recurso Deferido - Projeto Aprovado',
  'Recurso Deferido - Projeto Não Aprovado',
  'Recurso indeferido',
  'Recurso rejeitado',
  'Regularmente Inscrito',
  'Rejeitado/Arquivado',
  'Retorno 1ª Diligência Técnica',
] as const;

export type StatusProjeto = (typeof STATUS_PROJETO_OPTIONS)[number];

export interface DocumentoComprovacao {
  nomeArquivo: string;
  url: string;
  dataUpload: string;
}

export interface PrazoExecucao {
  inicio: string;
  fim: string;
}

export interface Inadimplente {
  id: string;
  cpf: string;
  nome: string;
  projeto: string;
  numeroProjetosRelacionados?: number;
  idProjeto: string;
  mecanismo: Mecanismo;
  statusInadimplencia: 'ativo' | 'resolvido' | 'pendente' | 'cancelado';
  statusProjeto: StatusProjeto;
  prazoExecucao: PrazoExecucao;
  documentoComprovacao?: DocumentoComprovacao;
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

export type PeriodoRapido = 'tudo' | '7dias' | '30dias' | '90dias' | '1ano';
export type SituacaoDMPCFiltro = SituacaoDMPC | 'todos';

export interface FiltrosInadimplencia {
  busca: string;
  cpf: string;
  projetoId: string;
  dataInicial: string;
  dataFinal: string;
  periodoRapido: PeriodoRapido;
  situacao: SituacaoDMPCFiltro;
  municipio: string;
  edital: string;
  statusInadimplencia: string;
  mecanismo: Mecanismo | '';
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
