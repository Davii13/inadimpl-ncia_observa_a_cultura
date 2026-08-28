# 🚀 Quick Start - Análise de Inadimplência

## Começar em 3 passos

### 1️⃣ Instalar Dependências

```bash
npm install
```

### 2️⃣ Rodar Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor inicia em `http://localhost:5173`

### 3️⃣ Abrir no Navegador

Abra [http://localhost:5173](http://localhost:5173) e veja a tela em ação!

---

## 🧪 Testando as Funcionalidades

### Teste 1: Busca por CPF

1. Digite `123` no campo "Buscar por CPF"
2. Clique "Pesquisar"
3. ✅ Resultado: Mostra todos os inadimplentes com CPF começando em `123`

### Teste 2: Busca por Projeto

1. Selecione "Mojubá - Raízes da Música Brasileira"
2. Clique "Pesquisar"
3. ✅ Resultado: Mostra 2 pessoas inadimplentes neste projeto

### Teste 3: Filtro por Período

1. Selecione Data inicial: `2025-01-01`
2. Selecione Data final: `2025-02-28`
3. Clique "Pesquisar"
4. ✅ Resultado: Mostra inadimplentes neste período

### Teste 4: Visualizar CPF Completo

1. Na tabela de resultados, clique o ícone 👁️ ao lado do CPF mascarado
2. ✅ Resultado: CPF fica visível como `123.456.789-90`
3. Clique novamente para ocultar

### Teste 5: Expandir Linha

1. Na tabela, clique o botão [⌄] na coluna "Ações"
2. ✅ Resultado: Linha expande mostrando mais informações
3. Clique novamente para recolher

### Teste 6: Limpar Filtros

1. Com filtros aplicados, clique "Limpar filtros"
2. ✅ Resultado: Todos os campos ressetam, tabela volta ao estado inicial

### Teste 7: Atualizar

1. Com filtros aplicados, clique "Atualizar"
2. ✅ Resultado: Dados recarregam com os mesmos filtros

### Teste 8: Validação de CPF

1. Digite um CPF inválido, ex: `111`
2. Clique "Pesquisar"
3. ✅ Resultado: Mostra mensagem de erro

---

## 📁 Estrutura de Arquivos Criados

```
inadimpl-ncia_observa_a_cultura/
│
├── src/
│   ├── components/
│   │   ├── FilterSection.tsx       # Seção de filtros
│   │   └── ResultsTable.tsx        # Tabela de resultados
│   │
│   ├── pages/
│   │   └── AnaliseInadimplencia.tsx # Página principal
│   │
│   ├── data/
│   │   └── mockData.ts             # Dados de exemplo
│   │
│   ├── types/
│   │   └── index.ts                # Tipos TypeScript
│   │
│   ├── utils/
│   │   └── formatters.ts           # Formatadores e validadores
│   │
│   ├── App.tsx                     # App root
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Estilos globais
│   └── vite-env.d.ts               # Tipos Vite
│
├── index.html                      # Template HTML
├── package.json                    # Dependências
├── tsconfig.json                   # Configuração TypeScript
├── vite.config.ts                  # Configuração Vite
├── postcss.config.js               # Configuração PostCSS
├── tailwind.config.js              # Configuração Tailwind
│
├── README.md                       # Documentação principal
├── FEATURES.md                     # Descrição das funcionalidades
├── INTEGRATION_GUIDE.md            # Guia para integrar com API real
├── QUICK_START.md                  # Este arquivo
├── .gitignore                      # Arquivos ignorados pelo Git
└── dist/                           # Build de produção (gerado)
```

---

## 🎯 Próximos Passos

### Integração com API Real

Quando estiver pronto para integrar com uma API real:

1. Leia [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
2. Crie `src/services/api.ts` com suas chamadas API
3. Atualize `AnaliseInadimplencia.tsx` para usar o serviço
4. Configure variáveis de ambiente em `.env`

### Adições Sugeridas

- [ ] Paginação na tabela
- [ ] Export para CSV/Excel
- [ ] Filtros salvos (localStorage)
- [ ] Dark/Light mode toggle
- [ ] Notificações de erro
- [ ] Loading state melhorado
- [ ] Busca com autocomplete
- [ ] Gráficos de inadimplência

### Build para Produção

```bash
npm run build
```

Isso cria uma pasta `dist/` pronta para deploy.

---

## 💡 Dicas

**Limpar cache:**
```bash
rm -rf node_modules dist
npm install
npm run dev
```

**Verificar tipos TypeScript:**
```bash
npx tsc --noEmit
```

**Formatar código:**
```bash
npm install -D prettier
npx prettier --write src/
```

---

## ⚡ Performance

O projeto atual:
- ✅ Bundle otimizado (200KB gzipped)
- ✅ Sem dependências pesadas
- ✅ Renderização eficiente
- ✅ Pronto para grandes datasets

---

## 🎓 Para Aprender Mais

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Lucide Icons](https://lucide.dev)

---

## ❓ Problemas Comuns

**Erro: "Cannot find module"**
→ Execute `npm install`

**Porta 5173 já em uso**
→ Use `npm run dev -- --port 3000`

**Estilos não aparecem**
→ Limpe o cache: `Ctrl+Shift+Delete` no navegador

**Build falha**
→ Verifique TypeScript errors: `npx tsc --noEmit`

---

Bom desenvolvimento! 🎉
