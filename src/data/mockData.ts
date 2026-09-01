import { Inadimplente, ProjetoOption } from '../types';

export const mockProjetos: ProjetoOption[] = [
  {
    id: '2024.3805.30455',
    nome: 'Mojubá - Raízes da Música Brasileira',
    numero: '2024.3805.30455',
  },
  {
    id: '2024.3808.30454',
    nome: 'Fabuloso Carnaval de Ronaldo Fraga',
    numero: '2024.3808.30454',
  },
  {
    id: '2024.3809.30453',
    nome: 'Festival Sumidouro em Cena - 7ª Edição',
    numero: '2024.3809.30453',
  },
  {
    id: '2024.3809.30452',
    nome: 'Festival Sumidouro em Cena - 7ª Edição',
    numero: '2024.3809.30452',
  },
  {
    id: '2024.3807.0061',
    nome: 'Minas Plus Fashion 2027',
    numero: '2024.3807.0061',
  },
  {
    id: '2024.3805.30458',
    nome: 'Circulação dos Espetáculos do Retinências Produção',
    numero: '2024.3805.30458',
  },
  {
    id: '2024.3810.30470',
    nome: 'Vozes do Cerrado - Circuito Cultural',
    numero: '2024.3810.30470',
  },
  {
    id: '2024.3811.30481',
    nome: 'Sarau Literário das Gerais',
    numero: '2024.3811.30481',
  },
];

export const mockMunicipios: string[] = [
  'NOVA LIMA',
  'BELO HORIZONTE',
  'PEDRO LEOPOLDO',
  'UBERABA',
  'CONTAGEM',
  'JUIZ DE FORA',
  'MONTES CLAROS',
];

export const mockEditais: string[] = [
  'Edital FEC 2024',
  'Edital LEIC 2024',
  'Edital FEC 2025',
];

const nomesBase = [
  'João Silva Santos',
  'Maria Souza Costa',
  'Carlos Lima Oliveira',
  'Ana Paula Ferreira',
  'Ricardo Mendes Gomes',
  'Fernanda Rocha Dias',
  'Juliana Costa Mendes',
  'Bruno Xavier Silva',
  'Patrícia Almeida Souza',
  'Rafael Barbosa Lima',
  'Camila Nogueira Reis',
  'Eduardo Martins Pinto',
  'Larissa Cardoso Rocha',
  'Thiago Ribeiro Alves',
  'Beatriz Fonseca Castro',
  'Gustavo Henrique Teixeira',
  'Mariana Vieira Correia',
  'Felipe Andrade Nunes',
  'Renata Batista Moura',
  'Diego Carvalho Freitas',
  'Vanessa Lopes Cunha',
  'Marcos Paulo Duarte',
  'Sabrina Gomes Pereira',
  'Leandro Farias Monteiro',
  'Débora Ramos Siqueira',
  'André Luiz Cavalcanti',
  'Priscila Tavares Machado',
  'Vinícius Guimarães Lima',
  'Tatiane Cordeiro Brito',
  'Rodrigo Azevedo Melo',
  'Aline Peixoto Sales',
  'Fábio Junqueira Rezende',
  'Cristina Moraes Vidal',
  'Gabriel Nascimento Prado',
  'Simone Araújo Bastos',
  'Henrique Coelho Vasconcelos',
  'Letícia Barros Andrade',
  'Otávio Campos Figueiredo',
  'Michele Torres Sampaio',
  'Alexandre Dutra Neves',
];

const executoresBase = [
  { executor: 'Associação Artística Coral Ars Antiqua', representante: 'Angela Regina Ferreira' },
  { executor: 'MODAS ETC E TAL LTDA.', representante: 'Ronaldo Moreira Fraga' },
  { executor: 'Lisandro Puntel Ruas', representante: 'Lisandro Puntel Ruas' },
  { executor: 'Neilane Daniele de Morais Almeida', representante: 'Neilane Daniele de Morais Almeida' },
  { executor: 'Retinências Núcleo de Artes Cênicas', representante: 'Marcus Vinícius Andrade' },
  { executor: 'Instituto Cultural Vozes do Cerrado', representante: 'Fernanda Guimarães Peixoto' },
  { executor: 'Coletivo Sarau das Gerais', representante: 'Otávio Ribeiro Sales' },
];

const statusCiclo: Inadimplente['statusInadimplencia'][] = [
  'ativo',
  'ativo',
  'resolvido',
  'pendente',
  'ativo',
  'cancelado',
  'pendente',
];

/** Gera um CPF numérico determinístico e único (sem validação de dígito verificador real — dado mockup). */
const gerarCPF = (seed: number): string => String(seed).padStart(11, '1');

const periodosRegistro = ['2024-12', '2025-01', '2025-02', '2025-03'];
const datasRegistro = [
  '2024-07-22',
  '2024-08-10',
  '2024-09-08',
  '2024-09-15',
  '2024-09-28',
  '2024-10-12',
  '2024-10-20',
  '2024-11-05',
];

export const mockInadimplentes: Inadimplente[] = nomesBase.map((nome, index) => {
  const projeto = mockProjetos[index % mockProjetos.length];
  const executorInfo = executoresBase[index % executoresBase.length];
  const municipio = mockMunicipios[index % mockMunicipios.length];

  return {
    id: String(index + 1),
    cpf: gerarCPF(10000000000 + index * 137),
    nome,
    projeto: projeto.nome,
    numeroProjetosRelacionados: (index % 3) + 1,
    idProjeto: projeto.id,
    mecanismo: index % 2 === 0 ? 'FEC' : 'LEIC',
    statusInadimplencia: statusCiclo[index % statusCiclo.length],
    dataPeriodo: periodosRegistro[index % periodosRegistro.length],
    municipio,
    executor: executorInfo.executor,
    representante: executorInfo.representante,
    dataRegistro: datasRegistro[index % datasRegistro.length],
  };
});
