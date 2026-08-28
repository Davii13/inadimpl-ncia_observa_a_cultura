# 🔧 Debug - Estilização Não Aparece

Se a estilização (CSS) não está aparecendo, siga estes passos:

## ✅ Passo 1: Hard Refresh do Navegador

### Windows/Linux:
```
Ctrl + Shift + Delete
```

### Mac:
```
Cmd + Shift + Delete
```

Isso limpa o cache completo do navegador.

---

## ✅ Passo 2: Fechar e Reiniciar Dev Server

No terminal onde `npm run dev` está rodando, pressione:
```
Ctrl + C
```

Depois execute novamente:
```
npm run dev
```

---

## ✅ Passo 3: Modo Incógnito

Abra uma aba incógnita/privada do navegador:
- **Chrome:** Ctrl + Shift + N
- **Firefox:** Ctrl + Shift + P
- **Safari:** Cmd + Shift + N

Acesse: http://localhost:5173

---

## ✅ Passo 4: Verificar DevTools

Abra DevTools (F12) e:

1. Vá para aba **Network**
2. Recarregue a página (F5)
3. Procure por arquivo `.css`
   - Deve estar como `index-XXXXX.css`
   - Deve ter status `200` (sucesso)
   - Tamanho deve ser > 5 KB

Se o CSS não carregar:
- Tamanho 0 bytes = problema de compilação Tailwind
- Status 404 = arquivo não encontrado

---

## ✅ Passo 5: Limpar node_modules (Último Recurso)

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## ✅ Checklist

- [ ] Executou `npm install` com sucesso (sem erros)
- [ ] Executou `npm run dev` (está rodando em http://localhost:5173)
- [ ] Fez Hard Refresh (Ctrl+Shift+Delete)
- [ ] CSS aparece em DevTools → Network → .css (status 200)
- [ ] Vê as cores (dark navy/azul escuro) fundo
- [ ] Vê Navbar no topo
- [ ] Vê Sidebar à esquerda
- [ ] Vê Filtros com estilo
- [ ] Vê Tabela com estilo

---

Se ainda não funcionar, tente:

```bash
npm run build
npm run preview
```

Isso testa a versão de produção em http://localhost:4173 (porta diferente).

---

**Desenvolvido com ❤️ em React + TypeScript + Tailwind CSS**
