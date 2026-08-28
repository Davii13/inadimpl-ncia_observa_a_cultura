# Guia de Integração com API Real

Este documento explica como integrar o projeto com uma API real em vez de usar dados mockup.

## 1. Criar um serviço de API

Crie um novo arquivo `src/services/api.ts`:

```typescript
import { Inadimplente, ProjetoOption } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const apiService = {
  async getProjetos(): Promise<ProjetoOption[]> {
    const response = await fetch(`${API_BASE_URL}/projetos`);
    if (!response.ok) throw new Error('Erro ao buscar projetos');
    return response.json();
  },

  async searchInadimplentes(filtros: {
    cpf?: string;
    projetoId?: string;
    dataInicial?: string;
    dataFinal?: string;
  }): Promise<Inadimplente[]> {
    const params = new URLSearchParams();
    if (filtros.cpf) params.append('cpf', filtros.cpf);
    if (filtros.projetoId) params.append('projetoId', filtros.projetoId);
    if (filtros.dataInicial) params.append('dataInicial', filtros.dataInicial);
    if (filtros.dataFinal) params.append('dataFinal', filtros.dataFinal);

    const response = await fetch(`${API_BASE_URL}/inadimplentes?${params}`);
    if (!response.ok) throw new Error('Erro ao buscar inadimplentes');
    return response.json();
  },

  async getInadimplenteById(id: string): Promise<Inadimplente> {
    const response = await fetch(`${API_BASE_URL}/inadimplentes/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar inadimplente');
    return response.json();
  },
};
```

## 2. Atualizar a página AnaliseInadimplencia.tsx

Modifique `src/pages/AnaliseInadimplencia.tsx` para usar o serviço:

```typescript
import { useEffect } from 'react';
import { apiService } from '../services/api';

export const AnaliseInadimplencia: React.FC = () => {
  const [projetos, setProjetos] = useState<ProjetoOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjetos = async () => {
      try {
        const data = await apiService.getProjetos();
        setProjetos(data);
      } catch (err) {
        setError('Erro ao carregar projetos');
        console.error(err);
      }
    };

    loadProjetos();
  }, []);

  const handleFilterSearch = async (filtros: FiltrosInadimplencia) => {
    setIsLoading(true);
    setFiltrosAtuais(filtros);

    try {
      const resultados = await apiService.searchInadimplentes(filtros);
      setResultados(resultados);
      setHasSearched(true);
      setFiltroAtivo(/* ... */);
    } catch (err) {
      setError('Erro ao buscar inadimplentes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ... resto do código
};
```

## 3. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

E atualize o serviço:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

## 4. Tratamento de Erros

Adicione um componente de erro:

```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error.message}</p>
      </div>
    );
  }

  return <>{children}</>;
};
```

## 5. Estrutura esperada da API

### GET /api/projetos

```json
[
  {
    "id": "2024.3805.30455",
    "nome": "Mojubá - Raízes da Música Brasileira",
    "numero": "2024.3805.30455"
  }
]
```

### GET /api/inadimplentes

Query params:
- `cpf`: string (opcional)
- `projetoId`: string (opcional)
- `dataInicial`: string ISO date (opcional)
- `dataFinal`: string ISO date (opcional)

Response:

```json
[
  {
    "id": "1",
    "cpf": "12345678901",
    "nome": "João Silva Santos",
    "projeto": "Mojubá - Raízes da Música Brasileira",
    "numeroProjetosRelacionados": 2,
    "idProjeto": "2024.3805.30455",
    "statusInadimplencia": "ativo",
    "dataPeriodo": "2025-01",
    "municipio": "NOVA LIMA",
    "executor": "Associação Artística Coral Ars Antiqua",
    "dataRegistro": "2024-09-15"
  }
]
```

## 6. Paginação (Opcional)

Para grandes volumes de dados, adicione paginação:

```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

async function searchInadimplentes(
  filtros: FiltrosInadimplencia,
  page = 1,
  limit = 50
): Promise<PaginatedResponse<Inadimplente>> {
  // ...
}
```

## 7. Cache com React Query (Recomendado)

Para melhor performance, considere usar React Query:

```bash
npm install @tanstack/react-query
```

```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['inadimplentes', filtros],
  queryFn: () => apiService.searchInadimplentes(filtros),
  enabled: !!filtros.cpf || !!filtros.projetoId, // só executa se houver filtro
});
```

## 8. Autenticação

Se a API requer autenticação, adicione ao serviço:

```typescript
export const apiService = {
  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  },

  async getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  async getProjetos(): Promise<ProjetoOption[]> {
    const response = await fetch(`${API_BASE_URL}/projetos`, {
      headers: await this.getAuthHeaders(),
    });
    // ...
  },
};
```

## Dúvidas?

Consulte a documentação do projeto em `README.md`.
