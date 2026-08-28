# 🔧 Troubleshooting - Guia de Solução de Problemas

Soluções para problemas comuns ao usar ou desenvolver o projeto.

---

## ❌ Problemas de Instalação

### Problema: "npm: command not found"

**Causa:** Node.js não está instalado ou não está no PATH

**Solução:**
1. Baixe Node.js em [nodejs.org](https://nodejs.org)
2. Instale a versão LTS (recomendado)
3. Abra novo terminal e tente novamente
4. Verifique: `node --version` e `npm --version`

---

### Problema: "Cannot find module react"

**Causa:** Dependências não instaladas

**Solução:**
```bash
npm install
```

Se ainda não funcionar:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Problema: "npm ERR! code ERESOLVE"

**Causa:** Conflito de versão de dependências

**Solução:**
```bash
npm install --legacy-peer-deps
```

---

## ❌ Problemas de Execução

### Problema: Porta 5173 já em uso

**Causa:** Outro processo está usando a porta

**Solução (Opção 1 - Usar outra porta):**
```bash
npm run dev -- --port 3000
```

**Solução (Opção 2 - Liberar porta 5173):**

No Windows (PowerShell como Admin):
```powershell
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

No Mac/Linux:
```bash
lsof -i :5173
kill -9 <PID>
```

---

### Problema: "ENOENT: no such file or directory"

**Causa:** Arquivo ou pasta não encontrada

**Solução:**
1. Verifique o caminho dos arquivos
2. Certifique-se de estar no diretório correto
3. Execute novamente após conferir caminhos

---

### Problema: TypeScript errors na compilação

**Causa:** Erros de tipo não resolvidos

**Solução:**
```bash
npx tsc --noEmit
```

Identifique o erro e corrija no arquivo indicado.

---

## ❌ Problemas de Build

### Problema: "Build failed in 232ms"

**Causa:** Erro durante o build (geralmente Tailwind CSS)

**Solução:**
```bash
npm install @tailwindcss/postcss
npm run build
```

---

### Problema: "dist folder is empty"

**Causa:** Build não gerou arquivos

**Solução:**
```bash
rm -rf dist
npm run build
```

Se persistir, verifique erros:
```bash
npm run build -- --debug
```

---

## ❌ Problemas Visuais/UX

### Problema: Estilos não aparecem

**Causa:** Cache do navegador

**Solução:**
1. **Hard refresh:**
   - Windows/Linux: `Ctrl + Shift + Delete`
   - Mac: `Cmd + Shift + Delete`

2. **Ou limpe manualmente:**
   - Abra DevTools (F12)
   - Application → Clear Storage
   - Reload

3. **Ou use modo incógnito:**
   - Abre sem cache

---

### Problema: Layout quebrado em mobile

**Causa:** Viewport não configurada ou Tailwind não aplica

**Solução:**
1. Verifique `<meta name="viewport">` em `index.html`
2. Teste em diferentes resoluções (DevTools)
3. Limpe cache CSS (hard refresh)

---

### Problema: CPF não formata automaticamente

**Causa:** Função `formatCPF` pode ter erro

**Solução:**
1. Verifique a função em `src/utils/formatters.ts`
2. Teste em console: `formatCPF('12345678901')`
3. Confirme que a função está sendo chamada

---

### Problema: Tabela muito larga em mobile

**Causa:** Overflow horizontal

**Solução:**
1. Tabela já tem `overflow-x-auto`
2. Se ainda assim não funciona, adicione em `ResultsTable.tsx`:
```tsx
<div className="overflow-x-auto">
  <table className="w-full">
    {/* ... */}
  </table>
</div>
```

---

## ❌ Problemas de Filtros

### Problema: Pesquisa não retorna resultados

**Causa:** 
1. CPF inválido
2. Projeto não selecionado corretamente
3. Período inválido
4. Dados mockup não correspondem

**Solução:**
1. Verifique a validação de entrada
2. Use os dados mockup fornecidos
3. Teste com: CPF `123*`, Projeto `Mojubá`, Período `2025-01 a 2025-02`

---

### Problema: CPF mascarado não muda

**Causa:** Estado não atualiza

**Solução:**
1. Abra DevTools (F12)
2. Verifique se o clique no ícone 👁️ funciona
3. Veja erros no console
4. Verifique a função `toggleCPFMask` em `ResultsTable.tsx`

---

### Problema: Data final menor que data inicial

**Causa:** Validação pode estar falhando

**Solução:**
1. A validação ocorre na função `handleSearch`
2. Certifique-se de: `dataInicial ≤ dataFinal`
3. Formato esperado: `YYYY-MM-DD`

---

## ❌ Problemas de Desempenho

### Problema: Tabela lenta com muitos dados

**Causa:** React renderizando muitos elementos

**Solução (futuro):**
1. Adicione paginação
2. Use React Query para cache
3. Use `useMemo` para dados filtrados
4. Implemente virtualization (react-window)

**Por enquanto:**
```bash
# Não há limite de dados mockup, mas o design suporta:
# - Até 50-100 linhas sem problemas
# - Para mais, implemente paginação
```

---

### Problema: Build demora muito

**Causa:** Vite pode estar fazendo rebuild desnecessário

**Solução:**
```bash
rm -rf dist node_modules
npm install
npm run build
```

---

## ❌ Problemas de Tipo/TypeScript

### Problema: "Type X is not assignable to Y"

**Causa:** Tipos incompatíveis

**Solução:**
1. Verifique os tipos em `src/types/index.ts`
2. Importe os tipos corretos: `import { Inadimplente } from '../types'`
3. Use `as` para casting (último recurso):
```tsx
const item = data as Inadimplente;
```

---

### Problema: "Property X does not exist on type Y"

**Causa:** Propriedade não definida na interface

**Solução:**
1. Adicione a propriedade em `src/types/index.ts`
2. Ou acesse com verificação:
```tsx
if ('propriedade' in objeto) {
  // Use objeto.propriedade
}
```

---

## ❌ Problemas de Integração com API

### Problema: "Cannot fetch from API"

**Causa:** URL incorreta ou API offline

**Solução:**
1. Verifique URL em `.env`: `VITE_API_URL=...`
2. Teste a URL no navegador ou Postman
3. Verifique CORS se API em domínio diferente
4. Use proxy se necessário em `vite.config.ts`

---

### Problema: Erro CORS

**Causa:** Requisição bloqueada por política de origem

**Solução (Adicione em `vite.config.ts`):**
```tsx
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://seu-backend.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

---

### Problema: Dados da API não aparecem

**Causa:** Resposta da API não corresponde aos tipos esperados

**Solução:**
1. Verifique estrutura da resposta em DevTools (Network tab)
2. Compare com tipos em `src/types/index.ts`
3. Adapte tipos ou API conforme necessário
4. Use `console.log()` para debug

---

## ❌ Problemas de Git

### Problema: "fatal: your current branch 'main' does not have any commits yet"

**Causa:** Repositório vazio

**Solução:**
```bash
git add .
git commit -m "Initial commit"
```

---

### Problema: Merge conflict

**Causa:** Mudanças conflitantes

**Solução:**
1. Identifique arquivos conflitados: `git status`
2. Abra arquivo e resolva conflitos
3. Remova marcadores `<<<<<<<`, `=======`, `>>>>>>>`
4. `git add arquivo && git commit -m "Resolved conflict"`

---

## ❌ Problemas de Editor/IDE

### Problema: VS Code não reconhece tipos

**Causa:** TypeScript server não iniciou

**Solução:**
1. Feche VS Code completamente
2. Delete pasta `.vscode` se houver configuração conflitante
3. Abra novamente
4. Ou execute: `Developer: Reload Window` (Ctrl+Shift+P)

---

### Problema: Intellisense não funciona

**Causa:** Extensão TypeScript não ativa

**Solução:**
1. Instale "TypeScript Vue Plugin"
2. Ou "Prettier - Code formatter"
3. Restart VS Code

---

## 📊 Checklist de Debug

Antes de reportar um bug, verifique:

- [ ] Executou `npm install`?
- [ ] Terminal mostra erro específico?
- [ ] DevTools mostra erro no console?
- [ ] Testou hard refresh (Ctrl+Shift+Delete)?
- [ ] Testou em navegador diferente?
- [ ] Tipos estão corretos em TypeScript?
- [ ] Dados mockup têm estrutura esperada?
- [ ] Função `formatCPF` retorna valor correto?
- [ ] Estado React está atualizando?
- [ ] Sem espaços em branco nos inputs?

---

## 🆘 Obter Ajuda

Se nenhuma solução acima funcionar:

1. **Verifique os logs:**
   ```bash
   npm run dev 2>&1 | tee build.log
   ```

2. **Teste isoladamente:**
   ```tsx
   // Em src/App.tsx, teste uma coisa por vez
   import { formatCPF } from './utils/formatters';
   console.log(formatCPF('12345678901'));
   ```

3. **Procure em:**
   - GitHub Issues do projeto
   - Stack Overflow
   - Documentação das dependências

4. **Reporte com:**
   - Versão do Node.js: `node --version`
   - Versão do npm: `npm --version`
   - Sistema operacional
   - Erro completo (copiar/colar do terminal)
   - Passos para reproduzir

---

## ✨ Boas Práticas de Debug

```tsx
// ✅ Use console.log com contexto
console.log('Filtros aplicados:', filtros);
console.log('Resultados encontrados:', resultados.length);

// ✅ Use debugger do navegador
// Em DevTools → Sources → clique na linha

// ✅ Inspecione estado React
// Extensão: React Developer Tools

// ✅ Verifique tipos
// VS Code: hover sobre variável para ver tipo

// ✅ Use TypeScript strict
// Detecta erros em tempo de compilação
```

---

## 📝 Logs Úteis

Habilitar debug detalhado:

```bash
# Debug Vite
VITE_DEBUG=* npm run dev

# Debug Node
NODE_DEBUG=* npm run dev

# Debug TypeScript
npx tsc --diagnostics
```

---

Boa sorte! 🍀 Se o problema persistir, revise [README.md](./README.md) ou [QUICK_START.md](./QUICK_START.md).
