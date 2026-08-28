export const formatCPF = (cpf: string): string => {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return cpf;
  return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9)}`;
};

export const maskCPF = (cpf: string): string => {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return cpf;
  return `${clean.slice(0, 3)}.***.***.${clean.slice(9)}`;
};

export const formatDate = (date: string): string => {
  try {
    const d = new Date(date);
    return new Intl.DateTimeFormat('pt-BR').format(d);
  } catch {
    return date;
  }
};

export const validateCPF = (cpf: string): boolean => {
  const clean = cpf.replace(/\D/g, '');
  return clean.length === 11;
};

export const getStatusColor = (status: string): { bg: string; text: string; dot: string } => {
  const colors = {
    ativo: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    resolvido: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    pendente: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    cancelado: { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500' },
  };
  return colors[status as keyof typeof colors] || colors.pendente;
};

export const getStatusLabel = (status: string): string => {
  const labels = {
    ativo: 'Ativo',
    resolvido: 'Resolvido',
    pendente: 'Pendente',
    cancelado: 'Cancelado',
  };
  return labels[status as keyof typeof labels] || status;
};

export const formatPeriodo = (periodo: string): string => {
  const [ano, mes] = periodo.split('-');
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  const index = parseInt(mes, 10) - 1;
  return meses[index] ? `${meses[index]}/${ano}` : periodo;
};

export const formatDateTime = (isoDate: string): string => {
  try {
    const d = new Date(isoDate);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d);
  } catch {
    return isoDate;
  }
};

export const getTipoAlteracaoLabel = (tipo: string): string => {
  const labels: Record<string, string> = {
    novo_inadimplente: 'Tornou-se inadimplente',
    continua_inadimplente: 'Continua inadimplente',
    deixou_inadimplente: 'Deixou de ser inadimplente',
    permanece_regular: 'Permanece regular',
    novo_no_sistema: 'Novo no sistema',
    ausente_no_periodo: 'Ausente na planilha atual',
  };
  return labels[tipo] || tipo;
};

export const getTipoAlteracaoBadgeClass = (tipo: string): string => {
  const classes: Record<string, string> = {
    novo_inadimplente: 'badge-ativo',
    continua_inadimplente: 'badge-ativo',
    deixou_inadimplente: 'badge-resolvido',
    permanece_regular: 'badge-resolvido',
    novo_no_sistema: 'badge-pendente',
    ausente_no_periodo: 'badge-cancelado',
  };
  return classes[tipo] || 'badge-cancelado';
};

export const getSituacaoDMPCLabel = (situacao: string): string =>
  situacao === 'inadimplente' ? 'Inadimplente' : 'Regular';
