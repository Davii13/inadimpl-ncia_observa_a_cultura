# Análise de Inadimplência - Observa Cultura

Sistema de análise centralizada de inadimplência com foco em CPF/pessoas.

## 🎯 Funcionalidades

- **Busca por CPF**: Pesquise inadimplências de um CPF específico
- **Busca por Projeto**: Visualize todos os inadimplentes relacionados a um projeto
- **Filtro por Período**: Consulte inadimplências dentro de uma data inicial e final
- **Segurança de Dados**: CPF mascarado por padrão (ex: `123.***.***.90`)
- **Detalhes Expandíveis**: Visualize informações completas do inadimplente
- **Status Colorido**: Indicadores visuais para diferentes status de inadimplência

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Rodar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no seu navegador.

### Build

```bash
# Compilar para produção
npm run build

# Visualizar build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── FilterSection.tsx   # Seção de filtros
│   └── ResultsTable.tsx    # Tabela de resultados
├── pages/              # Páginas principais
│   └── AnaliseInadimplencia.tsx  # Página principal
├── data/               # Dados mockup
│   └── mockData.ts     # Dados de exemplo
├── types/              # Tipos TypeScript
│   └── index.ts        # Definições de tipos
├── utils/              # Funções utilitárias
│   └── formatters.ts   # Formatadores e validadores
├── App.tsx             # Componente raiz
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🎨 Design

- **Tema**: Dark mode (azul escuro/preto)
- **Framework CSS**: Tailwind CSS
- **Ícones**: Lucide React
- **Cores**:
  - Fundo: `#0f1419`
  - Secundário: `#1a2b42`
  - Terciário: `#2a3f5f`
  - Primária: `#0284c7`

## 📊 Status de Inadimplência

- **Ativo**: Em processo de cobrança (vermelho)
- **Resolvido**: Débito quitado (verde)
- **Pendente**: Aguardando processamento (amarelo)
- **Cancelado**: Débito cancelado (cinza)

## 🔒 Segurança

- CPF mascarado por padrão (ex: `123.***.***.90`)
- Botão para visualizar/ocultar CPF completo
- Validação de formato de CPF
- Validação de datas

## 📝 Dados Mockup

O projeto utiliza dados mockup para demonstração. Para integrar com uma API real:

1. Edite `src/data/mockData.ts`
2. Substitua os dados mockup por chamadas a endpoints API
3. Atualize a lógica de filtragem em `AnaliseInadimplencia.tsx`

## 🛠️ Tecnologias

- **React 19**: Framework UI
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Estilização
- **Vite 8**: Build tool
- **Lucide React**: Biblioteca de ícones
