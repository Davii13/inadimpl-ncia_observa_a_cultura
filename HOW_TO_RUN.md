# 🚀 Como Rodar o Projeto Reformulado

## Status: ✅ PRONTO PARA VISUALIZAR

A tela agora inclui:
- ✅ Navbar (topo com logo e menu)
- ✅ Sidebar (esquerda com menu de navegação)
- ✅ Análise de Inadimplência (reformulada para CPF/Pessoas)
- ✅ Dados mockup funcionais (8 pessoas, 6 projetos)
- ✅ Design conforme referência visual

---

## 1️⃣ Instalar Dependências

```bash
cd "c:\Users\davin\Desktop\CLONES GIT HUB\inadimpl-ncia_observa_a_cultura"
npm install
```

---

## 2️⃣ Rodar Servidor de Desenvolvimento

```bash
npm run dev
```

Você verá:
```
  VITE v8.2.2  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 3️⃣ Abrir no Navegador

Acesse: **http://localhost:5173**

---

## 🎯 O Que Você Verá

### Estrutura Visual:

```
┌─────────────────────────────────────────────────────┐
│  Observa Cultura  🔔  👤                            │  ← Navbar
├────────────┬──────────────────────────────────────┐
│ Dashboard  │ Análise de Inadimplência             │
│ Fomento    │ [Limpar filtros] [Atualizar]         │
│ Readequa.. │                                      │
│ Prestação  │ FILTROS        [v]                   │
│ Análise ✓  │ ├─ CPF: [_______]                    │
│ Fomento DI │ ├─ Projeto: [_______]                │
│ Inscritos  │ └─ Período: [__] até [__]            │
│            │ [Pesquisar] [Limpar]                 │
│ Davi N. ↓  │                                      │
│            │ INADIMPLENTES · Detalhamento (8)    │
│            │ ┌────────────────────────────────────┤
│            │ │ CPF  │Nome│Projeto│Nº│Status│Data │
│            │ ├────────────────────────────────────┤
│            │ │123..│João│Proj X │  │Ativo │2025  │
│            │ │456..│Maria│Proj Y│  │Ativo │2025  │
│            │ ...                                   │
└────────────┴──────────────────────────────────────┘
```

---

## 🧪 Teste as Funcionalidades

### 1. Buscar por CPF
- Digite `123` no campo CPF
- Clique "Pesquisar"
- ✅ Mostra todas as pessoas com CPF começando em `123`

### 2. Buscar por Projeto
- Selecione "Mojubá - Raízes da Música Brasileira"
- Clique "Pesquisar"
- ✅ Mostra 2 pessoas inadimplentes

### 3. Filtrar por Período
- Data inicial: `2025-01-01`
- Data final: `2025-02-28`
- Clique "Pesquisar"
- ✅ Mostra inadimplentes nesse período

### 4. Expandir Linha
- Na tabela, clique [⌄] na coluna Ações
- ✅ Expande mostrando CPF completo, data registro, etc

### 5. Desmascarar CPF
- Clique o ícone 👁️ ao lado do CPF mascarado
- ✅ CPF fica visível como `123.456.789-01`

### 6. Menu Sidebar
- Clique o ícone ☰ na navbar
- ✅ Sidebar abre/fecha

---

## 📊 Dados Mockup Inclusos

**8 Pessoas Inadimplentes:**
1. João Silva Santos - CPF `123.456.789-01` - Projeto Mojubá
2. Maria Souza Costa - CPF `456.789.012-34` - Projeto Fabuloso
3. Carlos Lima Oliveira - CPF `456.123.789-45` - Projeto Festival
4. Ana Paula Ferreira - CPF `111.222.333-44` - Projeto Festival
5. Ricardo Mendes - CPF `555.666.777-88` - Projeto Minas Plus
6. Fernanda Rocha - CPF `999.888.777-66` - Projeto Circulação
7. Juliana Costa - CPF `333.444.555-66` - Projeto Mojubá
8. Bruno Xavier - CPF `777.888.999-00` - Projeto Festival

**6 Projetos:**
- Mojubá - Raízes da Música Brasileira
- Fabuloso Carnaval de Ronaldo Fraga
- Festival Sumidouro em Cena - 7ª Edição
- Minas Plus Fashion 2027
- Circulação dos Espetáculos do Retinências

---

## 🎨 Estilo Visual

- **Tema:** Dark Mode (Azul escuro/preto)
- **Navbar:** Topo com logo e ícones
- **Sidebar:** Menu à esquerda com navegação
- **Conteúdo:** Filtros + Tabela com dados

---

## 🔧 Comandos Disponíveis

```bash
# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Verificar tipos TypeScript
npx tsc --noEmit

# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## ⚠️ Se Tiver Problemas

### Porta já em uso
```bash
npm run dev -- --port 3000
```

### Limpar cache
```bash
rm -rf dist
npm run build
```

### Erro de módulo
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📁 Estrutura do Projeto

```
src/
├── App.tsx                          ← Layout principal (Navbar + Sidebar + Page)
├── components/
│   ├── Navbar.tsx                   ← Navbar superior
│   ├── Sidebar.tsx                  ← Menu esquerdo
│   ├── FilterSection.tsx            ← Seção de filtros
│   └── ResultsTable.tsx             ← Tabela de resultados
├── pages/
│   └── AnaliseInadimplencia.tsx    ← Página principal
├── data/
│   └── mockData.ts                  ← Dados de exemplo
├── types/
│   └── index.ts                     ← Tipos TypeScript
├── utils/
│   └── formatters.ts                ← Funções auxiliares
├── main.tsx                         ← Entry point
└── index.css                        ← Estilos globais
```

---

## ✨ Recursos Implementados

✅ Navbar com logo e ícones  
✅ Sidebar com menu navegável  
✅ Busca por CPF  
✅ Busca por Projeto  
✅ Filtro por Período  
✅ CPF mascarado (123.***.***.90)  
✅ Toggle CPF completo  
✅ Status colorido  
✅ Linhas expandíveis  
✅ Validação de entrada  
✅ Dados mockup funcional  
✅ Responsivo  

---

## 🎯 Próximos Passos

1. **Rodar:** `npm run dev`
2. **Acessar:** http://localhost:5173
3. **Testar:** Explore as funcionalidades
4. **Integrar:** Substitua dados mockup por API real

---

**Desenvolvido com ❤️ em React + TypeScript + Tailwind CSS**
