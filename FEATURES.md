# Funcionalidades da Tela de Análise de Inadimplência

## 🎯 Visão Geral

A tela "Análise de Inadimplência" é uma **central de análise** que permite consultar dados de inadimplência de três perspectivas principais:

```
             ANÁLISE DE INADIMPLÊNCIA
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
        CPF         PROJETO       PERÍODO
          │            │            │
          ↓            ↓            ↓
   Pesquisar      Selecionar    Definir datas
   um CPF        um projeto     inicial/final
```

---

## 📋 Seção de Filtros

### Características:

- **Expansível/Colapsável**: Clique em "FILTROS" para expandir/recolher
- **Design Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Validação em Tempo Real**: CPF é formatado automaticamente

### Componentes:

```
┌──────────────────────────────────────────────────┐
│ FILTROS                                      [v] │
├──────────────────────────────────────────────────┤
│                                                  │
│  📋 BUSCAR POR CPF                               │
│  ┌────────────────────────────────┐              │
│  │ 000.000.000-00              [👁] │              │
│  └────────────────────────────────┘              │
│                                                  │
│  📁 BUSCAR POR PROJETO                           │
│  ┌────────────────────────────────┐              │
│  │ Selecione um projeto      [v]  │              │
│  └────────────────────────────────┘              │
│                                                  │
│  📅 FILTRAR POR PERÍODO                          │
│  ┌────────────────┐    ┌────────────────┐        │
│  │ Data inicial   │ até│ Data final     │        │
│  └────────────────┘    └────────────────┘        │
│                                                  │
│  [🔍 Pesquisar]  [Limpar]                       │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 📊 Tabela de Resultados

### Colunas:

1. **CPF** (Mascarado)
   - Padrão: `123.***.***.90`
   - Clique no ícone 👁️ para mostrar completo
   - Clique novamente para ocultar

2. **Nome** (do inadimplente)
   - Nome completo do responsável

3. **Projeto** (nome)
   - Nome completo do projeto

4. **Nº Projeto** (ID)
   - Identificador numérico: `2024.3805.30455`

5. **Status** (da inadimplência)
   - Ativo (🔴 Vermelho) - Em processo de cobrança
   - Resolvido (🟢 Verde) - Débito quitado
   - Pendente (🟡 Amarelo) - Aguardando processamento
   - Cancelado (⚫ Cinza) - Débito cancelado

6. **Período** (Data/Mês)
   - Formato: `2025-01`, `2025-02`, etc.

7. **Município**
   - Município do executor

8. **Ações**
   - Botão [⌄] para expandir linha com mais detalhes

### Exemplo Visual:

```
┌───────────────────────────────────────────────────────────────────────────┐
│ INADIMPLENTES · Detalhamento (8)                                          │
├───────────────────────────────────────────────────────────────────────────┤
│
│ CPF          │ NOME            │ PROJETO      │ Nº     │ STATUS│PERÍODO│MUN
│ ─────────────┼─────────────────┼──────────────┼────────┼───────┼───────┼───
│ 123.***.***-90│João Silva      │Projeto X    │2024... │● Ativo│2025-01│NL
│      [👁]    │                │            │        │       │       │
│ ─────────────┴─────────────────┴──────────────┴────────┴───────┴───────┴───
│              CPF (Completo): 123.456.789-90
│              Data Registro: 2024-09-15
│              Executor: Associação Artística...
│              Projetos Relacionados: 2
│ ─────────────────────────────────────────────────────────────────────────
│
│ 456.***.***-12│Maria Souza    │Projeto Y    │2024... │● Ativo│2025-02│BH
│      [👁]    │                │            │        │       │       │
│
```

---

## 🔍 Estados da Interface

### 1. Estado Inicial (Sem Filtro Aplicado)

```
📋
Aplique filtros acima para visualizar os inadimplentes
```

### 2. Carregando

```
⏳ Carregando dados...
```

### 3. Sem Resultados

```
🔍
Nenhuma inadimplência encontrada
Tente ajustar seus filtros ou buscar novamente
```

### 4. Com Resultados

Mostra tabela com dados encontrados + footer com info:

```
Mostrando 5 resultado(s) · Filtros aplicados
```

### 5. CPF Inválido

Campo com mensagem de erro:

```
CPF inválido. Use o formato: 000.000.000-00
```

---

## 🎨 Paleta de Cores

### Fundo e Estrutura
- **Fundo Principal**: `#0F1419` (Dark Navy)
- **Cards/Containers**: `#1A2B42` (Dark Blue)
- **Bordas/Separadores**: `#2A3F5F` (Tertiary)

### Texto
- **Títulos**: Branco (`#FFFFFF`)
- **Descrições**: Cinza Claro (`#D1D5DB`)
- **Labels**: Cinza Médio (`#9CA3AF`)

### Status
- **Ativo**: Vermelho (`#EF4444`)
- **Resolvido**: Verde (`#22C55E`)
- **Pendente**: Amarelo (`#FBBF24`)
- **Cancelado**: Cinza (`#6B7280`)

### Botões
- **Primário**: Azul (`#0284C7`)
- **Secundário**: Bordado (`#2A3F5F`)
- **Hover**: Escuro (`#0369A1`)

---

## ⚡ Funcionalidades Principais

### 1. Busca por CPF

- Digite ou cole um CPF
- Formato aceito: `000.000.000-00` ou apenas números
- Clique "Pesquisar" para filtrar
- Resultados mostram todos os registros daquele CPF

**Caso de Uso**: "Qual é a situação de inadimplência da pessoa X?"

### 2. Busca por Projeto

- Selecione um projeto na dropdown
- Clique "Pesquisar"
- Resultados mostram todos os CPFs/pessoas inadimplentes naquele projeto

**Caso de Uso**: "Quem está inadimplente no Projeto X?"

### 3. Filtro por Período

- Informe data inicial e data final
- Clique "Pesquisar"
- Resultados mostram todas as inadimplências registradas nesse período

**Caso de Uso**: "Quem ficou inadimplente entre jan-2025 e mar-2025?"

### 4. Filtros Combinados

- Combine CPF + Projeto + Período
- Sistema filtra progressivamente
- Botão "Limpar" reseta todos os filtros

**Caso de Uso**: "A pessoa X está inadimplente no Projeto Y no período 2025?"

### 5. Visualizar CPF Completo

- CPF aparece mascarado por padrão: `123.***.***.90`
- Clique no ícone 👁️ para revelar CPF completo
- Clique novamente para ocultar
- Funciona independentemente por linha

**Motivo**: Proteção de dados pessoais

### 6. Expandir Linha

- Clique no botão [⌄] na coluna "Ações"
- Linha expande mostrando informações adicionais:
  - CPF (Completo)
  - Data de Registro
  - Executor
  - Projetos Relacionados

### 7. Atualizar

- Botão [🔄 Atualizar] (habilitado apenas com filtros aplicados)
- Recarrega os dados com os mesmos filtros
- Útil para ver atualizações em tempo real

### 8. Limpar Filtros

- Botão [✕ Limpar filtros] (habilitado apenas com filtros aplicados)
- Reseta todos os campos de filtro
- Volta ao estado inicial

---

## 📱 Responsividade

A tela é totalmente responsiva:

- **Desktop**: Layout completo com todas as colunas visíveis
- **Tablet**: Tabela com scroll horizontal
- **Mobile**: Tabela com scroll horizontal, filtros em accordion

---

## 🔐 Segurança

- ✅ CPF mascarado por padrão
- ✅ Validação de formato de CPF
- ✅ Validação de período (data inicial ≤ data final)
- ✅ Sem exposição de dados sensíveis

---

## 🚀 Performance

- Filtros aplicados com debounce (500ms)
- Paginação pode ser adicionada para grandes volumes
- Cache de projetos no estado local
- Sem re-renders desnecessários

---

## 📝 Dados Exibidos

Cada pessoa inadimplente mostra:

```
{
  "id": "1",
  "cpf": "12345678901",              // Mascarado na tabela
  "nome": "João Silva Santos",        // Nome completo
  "projeto": "Mojubá - Raízes...",   // Nome projeto
  "numeroProjetosRelacionados": 2,   // Count de projetos
  "idProjeto": "2024.3805.30455",    // ID projeto
  "statusInadimplencia": "ativo",    // ativo|resolvido|pendente|cancelado
  "dataPeriodo": "2025-01",          // Mês/período
  "municipio": "NOVA LIMA",          // Município
  "executor": "Associação...",       // Entidade responsável
  "dataRegistro": "2024-09-15"       // Data do registro
}
```

---

## ✨ Destaques do Design

1. ✅ **Consistente com o sistema atual** - Cores, tipografia e componentes reutilizáveis
2. ✅ **Foco no CPF/Pessoa** - Análise centrada no inadimplente, não em projetos
3. ✅ **Intuitivo** - Responde rapidamente as 3 perguntas principais
4. ✅ **Seguro** - Proteção de dados pessoais
5. ✅ **Profissional** - Interface limpa e organizada
6. ✅ **Escalável** - Preparado para grandes volumes de dados
