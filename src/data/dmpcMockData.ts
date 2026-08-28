import { RegistroDMPC, ImportacaoDMPC, HistoricoCPF } from '../types';

export const mockRegistrosAgosto2026: RegistroDMPC[] = [
  { cpf: '12345678900', nome: 'João Silva Santos', situacao: 'inadimplente', periodo: '2026-08', projeto: 'Mojubá - Raízes da Música Brasileira', idProjeto: '2024.3805.30455', municipio: 'NOVA LIMA', linhaOrigem: 2 },
  { cpf: '45612378945', nome: 'Carlos Lima Oliveira', situacao: 'inadimplente', periodo: '2026-08', projeto: 'Festival Sumidouro em Cena - 7ª Edição', idProjeto: '2024.3809.30453', municipio: 'PEDRO LEOPOLDO', linhaOrigem: 3 },
  { cpf: '11122233344', nome: 'Ana Paula Ferreira', situacao: 'inadimplente', periodo: '2026-08', projeto: 'Festival Sumidouro em Cena - 7ª Edição', idProjeto: '2024.3809.30452', municipio: 'PEDRO LEOPOLDO', linhaOrigem: 4 },
  { cpf: '55566677788', nome: 'Ricardo Mendes Gomes', situacao: 'regular', periodo: '2026-08', projeto: 'Minas Plus Fashion 2027', idProjeto: '2024.3807.0061', municipio: 'UBERABA', linhaOrigem: 5 },
  { cpf: '99988877766', nome: 'Fernanda Rocha Dias', situacao: 'inadimplente', periodo: '2026-08', projeto: 'Circulação dos Espetáculos do Retinências Produção', idProjeto: '2024.3805.30458', municipio: 'BELO HORIZONTE', linhaOrigem: 6 },
  { cpf: '33344455566', nome: 'Juliana Costa Mendes', situacao: 'inadimplente', periodo: '2026-08', projeto: 'Mojubá - Raízes da Música Brasileira', idProjeto: '2024.3805.30455', municipio: 'NOVA LIMA', linhaOrigem: 7 },
];

export const mockRegistrosSetembro2026: RegistroDMPC[] = [
  { cpf: '12345678900', nome: 'João Silva Santos', situacao: 'inadimplente', periodo: '2026-09', projeto: 'Mojubá - Raízes da Música Brasileira', idProjeto: '2024.3805.30455', municipio: 'NOVA LIMA', linhaOrigem: 2 },
  { cpf: '11122233344', nome: 'Ana Paula Ferreira', situacao: 'regular', periodo: '2026-09', projeto: 'Festival Sumidouro em Cena - 7ª Edição', idProjeto: '2024.3809.30452', municipio: 'PEDRO LEOPOLDO', linhaOrigem: 3 },
  { cpf: '55566677788', nome: 'Ricardo Mendes Gomes', situacao: 'inadimplente', periodo: '2026-09', projeto: 'Minas Plus Fashion 2027', idProjeto: '2024.3807.0061', municipio: 'UBERABA', linhaOrigem: 4 },
  { cpf: '99988877766', nome: 'Fernanda Rocha Dias', situacao: 'inadimplente', periodo: '2026-09', projeto: 'Circulação dos Espetáculos do Retinências Produção', idProjeto: '2024.3805.30458', municipio: 'BELO HORIZONTE', linhaOrigem: 5 },
  { cpf: '33344455566', nome: 'Juliana Costa Mendes', situacao: 'regular', periodo: '2026-09', projeto: 'Mojubá - Raízes da Música Brasileira', idProjeto: '2024.3805.30455', municipio: 'NOVA LIMA', linhaOrigem: 6 },
  { cpf: '77788899900', nome: 'Bruno Xavier Silva', situacao: 'inadimplente', periodo: '2026-09', projeto: 'Festival Sumidouro em Cena - 7ª Edição', idProjeto: '2024.3809.30453', municipio: 'PEDRO LEOPOLDO', linhaOrigem: 7 },
];

export const mockImportacoes: ImportacaoDMPC[] = [
  {
    id: 'imp-2026-08',
    periodo: '2026-08',
    nomeArquivo: 'DMPC_08_2026.csv',
    dataImportacao: '2026-09-01T10:15:00Z',
    totalRegistros: 6,
    registrosValidos: 6,
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
    totalRegistros: 6,
    registrosValidos: 6,
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
