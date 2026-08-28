# 🎯 Exemplos de Uso - Análise de Inadimplência

Casos de uso reais e como usar a tela para resolvê-los.

---

## Cenário 1: Verificar Situação de Uma Pessoa

**Pergunta:** "Qual é a situação de inadimplência de João Silva Santos?"

### Passo a Passo:

1. Abra a tela "Análise de Inadimplência"
2. Na seção de filtros, encontre "📋 BUSCAR POR CPF"
3. Digite o CPF: `123.456.789-01` (ou qualquer padrão conhecido)
4. Clique "🔍 Pesquisar"

### Resultado Esperado:

```
INADIMPLENTES · Detalhamento (1)

CPF            │ NOME              │ PROJETO        │ STATUS  │ PERÍODO
123.***.***.01 │ João Silva Santos │ Mojubá - ...   │ Ativo   │ 2025-01
```

5. Clique o ícone 👁️ para ver o CPF completo
6. Clique [⌄] para expandir e ver informações adicionais

---

## Cenário 2: Auditar Inadimplentes de Um Projeto

**Pergunta:** "Quem está inadimplente no Projeto Mojubá?"

### Passo a Passo:

1. Abra a tela "Análise de Inadimplência"
2. Na seção de filtros, encontre "📁 BUSCAR POR PROJETO"
3. Clique na dropdown e selecione "Mojubá - Raízes da Música Brasileira"
4. Clique "🔍 Pesquisar"

### Resultado Esperado:

```
INADIMPLENTES · Detalhamento (2)

CPF            │ NOME                 │ PROJETO              │ STATUS  │ PERÍODO
123.***.***.90 │ João Silva Santos    │ Mojubá - Raízes...   │ Ativo   │ 2025-01
333.***.***.66 │ Juliana Costa Mendes │ Mojubá - Raízes...   │ Ativo   │ 2025-01
```

5. Agora você pode ver todos os inadimplentes deste projeto
6. Clique em cada linha para expandir e ver detalhes

---

## Cenário 3: Analisar Inadimplências em Um Período

**Pergunta:** "Quem ficou inadimplente em janeiro de 2025?"

### Passo a Passo:

1. Abra a tela "Análise de Inadimplência"
2. Na seção de filtros, encontre "📅 FILTRAR POR PERÍODO"
3. Data inicial: `2025-01-01`
4. Data final: `2025-01-31`
5. Clique "🔍 Pesquisar"

### Resultado Esperado:

```
INADIMPLENTES · Detalhamento (5)

CPF            │ NOME              │ PROJETO        │ STATUS    │ PERÍODO
123.***.***.90 │ João Silva        │ Mojubá - ...   │ Ativo     │ 2025-01
456.***.***.12 │ Maria Souza       │ Fabuloso...    │ Ativo     │ 2025-01
333.***.***.66 │ Juliana Costa     │ Mojubá - ...   │ Ativo     │ 2025-01
777.***.***.00 │ Bruno Xavier      │ Festival...    │ Pendente  │ 2025-01
```

---

## Cenário 4: Filtro Combinado - Pessoa em Projeto

**Pergunta:** "João Silva está inadimplente no Projeto Mojubá?"

### Passo a Passo:

1. Abra a tela "Análise de Inadimplência"
2. Preenchimento:
   - CPF: `123.456.789-01`
   - Projeto: `Mojubá - Raízes da Música Brasileira`
3. Clique "🔍 Pesquisar"

### Resultado Esperado:

```
INADIMPLENTES · Detalhamento (1)

CPF            │ NOME              │ PROJETO        │ STATUS  │ PERÍODO
123.***.***.01 │ João Silva Santos │ Mojubá - ...   │ Ativo   │ 2025-01
```

**Conclusão:** Sim, João está inadimplente neste projeto.

---

## Cenário 5: Filtro Combinado - Pessoa em Período

**Pergunta:** "Maria Souza tem inadimplência registrada em fevereiro de 2025?"

### Passo a Passo:

1. Abra a tela "Análise de Inadimplência"
2. Preenchimento:
   - CPF: `456.789.012-34`
   - Data inicial: `2025-02-01`
   - Data final: `2025-02-28`
3. Clique "🔍 Pesquisar"

### Resultado Esperado:

```
INADIMPLENTES · Detalhamento (1)

CPF            │ NOME              │ PROJETO        │ STATUS  │ PERÍODO
456.***.***.34 │ Maria Souza Costa │ Fabuloso...    │ Ativo   │ 2025-02
```

**Conclusão:** Sim, registrada em fevereiro.

---

## Cenário 6: Visualizar Detalhes Completos

**Pergunta:** "Quero ver todas as informações de João Silva"

### Passo a Passo:

1. Pesquise por CPF de João: `123.456.789-01`
2. Na tabela, clique o botão [⌄] na coluna "Ações"

### Resultado Esperado:

A linha expande mostrando:

```
═════════════════════════════════════════════════════════════════
INFORMAÇÕES ADICIONAIS

CPF (Completo)            │ 123.456.789-01
Data de Registro          │ 2024-09-15
Executor                  │ Associação Artística Coral Ars Antiqua
Projetos Relacionados     │ 2
═════════════════════════════════════════════════════════════════
```

4. Para ocultar, clique [⌄] novamente (ele vira [⌃])

---

## Cenário 7: Desmascarar CPF com Segurança

**Pergunta:** "Qual é o CPF completo daquele inadimplente?"

### Passo a Passo:

1. Na tabela, localize a linha desejada
2. Clique o ícone 👁️ na coluna CPF (mostra "oculto" visualmente)

### Resultado Esperado:

```
ANTES:  123.***.***.90   [👁]
DEPOIS: 123.456.789-90   [👁️‍🗨️]  (ícone muda para "mostrado")
```

3. Para ocultar novamente, clique o ícone [👁️‍🗨️]

**Segurança:** O CPF mascarado é a visualização padrão, protegendo dados pessoais.

---

## Cenário 8: Nenhum Resultado Encontrado

**Pergunta:** "Existe inadimplência com este CPF?"

### Passo a Passo:

1. Digite um CPF inexistente: `999.999.999-99`
2. Clique "🔍 Pesquisar"

### Resultado Esperado:

```
╔════════════════════════════════════════╗
║ 🔍                                     ║
║                                        ║
║ Nenhuma inadimplência encontrada       ║
║ Tente ajustar seus filtros ou         ║
║ buscar novamente                       ║
╚════════════════════════════════════════╝
```

**Conclusão:** Este CPF não tem registros de inadimplência.

---

## Cenário 9: CPF Inválido

**Pergunta:** "O que acontece se eu digitar um CPF inválido?"

### Passo a Passo:

1. Digite um CPF incompleto: `123`
2. Clique "🔍 Pesquisar"

### Resultado Esperado:

```
CPF: [123.___________]

❌ CPF inválido. Use o formato: 000.000.000-00
```

**Conclusão:** Sistema valida entrada antes de buscar.

---

## Cenário 10: Atualizar Dados

**Pergunta:** "Como atualizo os dados sem mudar os filtros?"

### Passo a Passo:

1. Aplique qualquer filtro (ex: CPF João)
2. Clique o botão [🔄 Atualizar] no topo

### Resultado Esperado:

```
Mostrando 1 resultado(s) · Filtros aplicados
[Agora os dados foram recarregados]
```

**Nota:** Botão fica disponível apenas quando há filtros aplicados.

---

## Cenário 11: Limpar Filtros

**Pergunta:** "Como volto ao estado inicial?"

### Passo a Passo:

1. Com qualquer filtro aplicado, clique [✕ Limpar filtros]

### Resultado Esperado:

```
✓ Todos os campos de filtro foram resetados
✓ Tabela volta ao estado inicial
✓ Mensagem aparece: "Aplique filtros acima para visualizar..."
```

---

## Cenário 12: Expandir/Recolher Filtros

**Pergunta:** "Como economizo espaço na tela?"

### Passo a Passo:

1. Clique no header "FILTROS" (ou no ícone [v])
2. A seção de filtros recolhe

### Resultado Esperado:

```
ANTES: [Todos os campos visíveis]
DEPOIS: [Apenas header "FILTROS ▶" visível]
```

3. Clique novamente para expandir

---

## Cenário 13: Análise de Status

**Pergunta:** "Qual é o significado dos status?"

### Interpretação:

| Status | Cor | Significado |
|--------|-----|------------|
| Ativo | 🔴 Vermelho | Em processo de cobrança |
| Resolvido | 🟢 Verde | Débito foi quitado |
| Pendente | 🟡 Amarelo | Aguardando processamento |
| Cancelado | ⚫ Cinza | Débito foi cancelado |

**Exemplo:**
```
João Silva    │ 2025-01 │ Ativo   │ Ainda em cobrança
Carlos Lima   │ 2025-01 │ Resolvido│ Já pagou
Ana Paula     │ 2025-03 │ Pendente│ Esperando confirmação
Fernanda      │ 2024-12 │ Cancelado│ Sem cobrança
```

---

## Cenário 14: Análise em Lote

**Pergunta:** "Como faço auditoria de múltiplas pessoas?"

### Passo a Passo:

1. Pesquise por Projeto (mostra todas de uma vez)
2. Expanda cada linha para ver detalhes
3. Use teclado para navegar (Tab, Arrows)
4. Você pode ir comparando status, períodos, etc.

### Exemplo:

```
PROJETO: Festival Sumidouro
├─ João Silva        │ 2025-01 │ Ativo
├─ Maria Souza       │ 2025-02 │ Ativo
├─ Carlos Lima       │ 2025-01 │ Resolvido
└─ Bruno Xavier      │ 2025-01 │ Pendente
```

---

## Cenário 15: Relatório Rápido

**Pergunta:** "Como faço um relatório de inadimplentes por período?"

### Passo a Passo:

1. Abra "Análise de Inadimplência"
2. Data inicial: `2025-01-01`
3. Data final: `2025-03-31`
4. Clique "🔍 Pesquisar"
5. Você tem agora todos os inadimplentes do trimestre
6. Pode anotar, copiar para Excel, ou tomar screenshot

### Resultado:

```
RELATÓRIO - INADIMPLENTES Q1 2025 (Jan-Mar)

1. João Silva (123.456.789-01) - Ativo - 2025-01
2. Maria Souza (456.789.012-34) - Ativo - 2025-02
3. Carlos Lima (456.123.789-45) - Resolvido - 2025-01
4. Ana Paula (111.222.333-44) - Pendente - 2025-03
5. Ricardo Mendes (555.666.777-88) - Ativo - 2025-02
6. Bruno Xavier (777.888.999-00) - Pendente - 2025-01

Total: 6 registros
```

---

## ⚡ Dicas Rápidas

1. **CPF:** Formata automaticamente enquanto digita
2. **Tab:** Navega entre filtros com teclado
3. **Enter:** Executa busca sem clicar botão
4. **Expandir:** Use [⌄] para mais informações
5. **Máscarar:** Use 👁️ para controlar visibilidade
6. **Limpar:** Botão reseta tudo em um clique
7. **Atualizar:** Recarrega sem mudar filtros
8. **Período:** Data inicial ≤ Data final (validado)

---

## 🎓 Fluxo Típico de Um Usuário

```
┌─────────────────────────────────────┐
│ 1. Abrir Tela                       │
│    "Análise de Inadimplência"       │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ 2. Escolher Tipo de Busca           │
│    - Por CPF                        │
│    - Por Projeto                    │
│    - Por Período                    │
│    - Combinado                      │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ 3. Preencher Filtros                │
│    + Validação automática           │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ 4. Pesquisar                        │
│    [🔍 Pesquisar]                   │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ 5. Visualizar Resultados            │
│    - Tabela com dados               │
│    - Status colorido                │
│    - Dados mascarados               │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ 6. Explorar Detalhes                │
│    - Expandir linha [⌄]             │
│    - Desmascarar CPF [👁️]           │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ 7. Ações                            │
│    - Atualizar [🔄]                 │
│    - Limpar [✕]                     │
│    - Nova Busca                     │
└─────────────────────────────────────┘
```

---

Agora você está pronto para usar a tela! 🚀
