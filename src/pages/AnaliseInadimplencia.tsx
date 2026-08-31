import React, { useMemo, useState } from 'react';
import { RefreshCw, X, UploadCloud } from 'lucide-react';
import { FilterSection } from '../components/FilterSection';
import { ResultsTable } from '../components/ResultsTable';
import { ImportacaoDMPC } from '../components/ImportacaoDMPC';
import { Modal } from '../components/Modal';
import {
  Inadimplente,
  FiltrosInadimplencia,
  ImportacaoDMPC as ImportacaoDMPCType,
  RegistroDMPC,
  ComparativoImportacao,
  HistoricoCPF,
} from '../types';
import { mockProjetos, mockInadimplentes } from '../data/mockData';
import {
  mockImportacoes,
  mockRegistrosPorImportacao,
  construirHistoricoCPF,
} from '../data/dmpcMockData';

const emptyFiltros: FiltrosInadimplencia = {
  cpf: '',
  projetoId: '',
  dataInicial: '',
  dataFinal: '',
  alteracao: 'todos',
};

export const AnaliseInadimplencia: React.FC = () => {
  const [resultados, setResultados] = useState<Inadimplente[]>(mockInadimplentes);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);
  const [filtroAtivo, setFiltroAtivo] = useState(false);
  const [filtrosAtuais, setFiltrosAtuais] = useState<FiltrosInadimplencia>(emptyFiltros);
  const [resetKey, setResetKey] = useState(0);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [importacoes, setImportacoes] = useState<ImportacaoDMPCType[]>(mockImportacoes);
  const [registrosPorImportacao, setRegistrosPorImportacao] = useState<
    Record<string, RegistroDMPC[]>
  >(mockRegistrosPorImportacao);

  const historicoCPFList = useMemo<HistoricoCPF[]>(
    () => construirHistoricoCPFCompleto(registrosPorImportacao),
    [registrosPorImportacao]
  );

  const historicoPorCpf = useMemo(() => {
    const map = new Map<string, HistoricoCPF>();
    historicoCPFList.forEach((h) => map.set(h.cpf, h));
    return map;
  }, [historicoCPFList]);

  const handleFilterSearch = (filtros: FiltrosInadimplencia) => {
    setIsLoading(true);
    setFiltrosAtuais(filtros);

    setTimeout(() => {
      let filtered = [...mockInadimplentes];

      if (filtros.cpf) {
        const cpfClean = filtros.cpf.replace(/\D/g, '');
        filtered = filtered.filter((item) => item.cpf.replace(/\D/g, '').includes(cpfClean));
      }

      if (filtros.projetoId) {
        filtered = filtered.filter((item) => item.idProjeto === filtros.projetoId);
      }

      if (filtros.dataInicial && filtros.dataFinal) {
        const inicio = new Date(filtros.dataInicial);
        const fim = new Date(filtros.dataFinal);

        filtered = filtered.filter((item) => {
          const itemDate = new Date(`${item.dataPeriodo}-01`);
          return itemDate >= inicio && itemDate <= fim;
        });
      }

      if (filtros.alteracao && filtros.alteracao !== 'todos') {
        filtered = filtered.filter((item) => {
          const historico = historicoPorCpf.get(item.cpf);
          if (!historico || historico.situacoes.length < 2) return false;
          const ordenadas = historico.situacoes;
          const atual = ordenadas[ordenadas.length - 1];
          const anterior = ordenadas[ordenadas.length - 2];

          if (filtros.alteracao === 'novo_inadimplente') {
            return anterior.situacao === 'regular' && atual.situacao === 'inadimplente';
          }
          if (filtros.alteracao === 'continua_inadimplente') {
            return anterior.situacao === 'inadimplente' && atual.situacao === 'inadimplente';
          }
          if (filtros.alteracao === 'deixou_inadimplente') {
            return anterior.situacao === 'inadimplente' && atual.situacao === 'regular';
          }
          if (filtros.alteracao === 'permanece_regular') {
            return anterior.situacao === 'regular' && atual.situacao === 'regular';
          }
          return true;
        });
      }

      setResultados(filtered);
      setHasSearched(true);
      setFiltroAtivo(
        !!(
          filtros.cpf ||
          filtros.projetoId ||
          filtros.dataInicial ||
          filtros.dataFinal ||
          (filtros.alteracao && filtros.alteracao !== 'todos')
        )
      );
      setIsLoading(false);
    }, 400);
  };

  const handleClearFilters = () => {
    setResultados(mockInadimplentes);
    setHasSearched(true);
    setFiltroAtivo(false);
    setFiltrosAtuais(emptyFiltros);
    setResetKey((k) => k + 1);
  };

  const handleRefresh = () => {
    if (filtroAtivo) {
      handleFilterSearch(filtrosAtuais);
    }
  };

  const handleImportComplete = (
    novaImportacao: ImportacaoDMPCType,
    registros: RegistroDMPC[],
    comparativo: ComparativoImportacao
  ) => {
    void comparativo;
    setImportacoes((prev) => [...prev, novaImportacao]);
    setRegistrosPorImportacao((prev) => ({ ...prev, [novaImportacao.id]: registros }));
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Análise de Inadimplência</h1>
          <p className="page-subtitle">
            Consulte dados de inadimplência por CPF, projeto ou período. Esta é uma central de
            análise para investigar as pessoas/CPFs que possuem inadimplência relacionada aos
            projetos, alimentada mensalmente pelas planilhas da DMPC.
          </p>
        </div>
        <div className="page-actions">
          <button className="btn" onClick={handleRefresh} disabled={!filtroAtivo}>
            <RefreshCw size={15} />
            Atualizar
          </button>
          <button className="btn" onClick={() => setIsImportModalOpen(true)}>
            <UploadCloud size={15} />
            Importar DMPC
          </button>
          <button className="btn" onClick={handleClearFilters} disabled={!filtroAtivo}>
            <X size={15} />
            Limpar filtros
          </button>
        </div>
      </div>

      <FilterSection
        key={resetKey}
        projetos={mockProjetos}
        onFilterChange={() => {}}
        onSearch={handleFilterSearch}
      />

      <div className="panel">
        <ResultsTable
          data={resultados}
          isLoading={isLoading}
          hasSearched={hasSearched}
          historicoPorCpf={historicoPorCpf}
        />
      </div>

      {isImportModalOpen && (
        <Modal title="Importação de Dados DMPC" onClose={() => setIsImportModalOpen(false)}>
          <ImportacaoDMPC
            importacoes={importacoes}
            registrosPorImportacao={registrosPorImportacao}
            onImportComplete={handleImportComplete}
          />
        </Modal>
      )}
    </>
  );
};

function construirHistoricoCPFCompleto(
  registrosPorImportacao: Record<string, RegistroDMPC[]>
): HistoricoCPF[] {
  const base = construirHistoricoCPF();
  const porCpf = new Map<string, HistoricoCPF>(base.map((h) => [h.cpf, h]));

  Object.entries(registrosPorImportacao).forEach(([importacaoId, registros]) => {
    if (importacaoId === 'imp-2026-08' || importacaoId === 'imp-2026-09') return;

    registros.forEach((registro) => {
      if (!porCpf.has(registro.cpf)) {
        porCpf.set(registro.cpf, { cpf: registro.cpf, nome: registro.nome, situacoes: [] });
      }
      const historico = porCpf.get(registro.cpf)!;
      const jaExiste = historico.situacoes.some((s) => s.periodo === registro.periodo);
      if (!jaExiste) {
        historico.situacoes.push({
          periodo: registro.periodo,
          situacao: registro.situacao,
          importacaoId,
        });
        historico.situacoes.sort((a, b) => a.periodo.localeCompare(b.periodo));
      }
    });
  });

  return Array.from(porCpf.values());
}
