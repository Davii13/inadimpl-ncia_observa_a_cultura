import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, ChevronDown, ClipboardList, SearchX } from 'lucide-react';
import { Inadimplente, HistoricoCPF } from '../types';
import { maskCPF, formatCPF } from '../utils/formatters';
import { HistoricoCPFTimeline } from './HistoricoCPFTimeline';
import { Pagination } from './Pagination';

interface ResultsTableProps {
  data: Inadimplente[];
  isLoading?: boolean;
  hasSearched?: boolean;
  historicoPorCpf?: Map<string, HistoricoCPF>;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  data,
  isLoading = false,
  hasSearched = false,
  historicoPorCpf,
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [unmaskedCPFs, setUnmaskedCPFs] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setPage(1);
  }, [data]);

  const startIndex = (page - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const toggleRow = (id: string) => {
    const next = new Set(expandedRows);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpandedRows(next);
  };

  const toggleCPFMask = (cpf: string) => {
    const next = new Set(unmaskedCPFs);
    next.has(cpf) ? next.delete(cpf) : next.add(cpf);
    setUnmaskedCPFs(next);
  };

  if (isLoading) {
    return (
      <div className="state-box">
        <div className="spinner" />
        <p className="state-text">Carregando dados...</p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="state-box">
        <ClipboardList className="state-icon" size={28} strokeWidth={1.5} />
        <p className="state-text">Aplique filtros acima para visualizar os inadimplentes</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="state-box">
        <SearchX className="state-icon" size={28} strokeWidth={1.5} />
        <p className="state-text">Nenhuma inadimplência encontrada</p>
        <p className="state-subtext">Tente ajustar seus filtros ou buscar novamente</p>
      </div>
    );
  }

  return (
    <>
      <div className="panel-table-header">
        <span className="panel-table-title">Inadimplentes · Detalhamento ({data.length})</span>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Situação Atual</th>
              <th>Nome do Projeto</th>
              <th>Nº do Projeto</th>
              <th>Mecanismo</th>
              <th>Executor</th>
              <th>Município do Executor</th>
              <th>Representante</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => {
              const isExpanded = expandedRows.has(item.id);
              const isCPFUnmasked = unmaskedCPFs.has(item.cpf);
              const displayCPF = isCPFUnmasked ? formatCPF(item.cpf) : maskCPF(item.cpf);
              const historico = historicoPorCpf?.get(item.cpf);
              const situacaoDMPC =
                historico && historico.situacoes.length > 0
                  ? historico.situacoes[historico.situacoes.length - 1].situacao
                  : null;
              const situacaoAtual =
                situacaoDMPC ??
                (item.statusInadimplencia === 'ativo' || item.statusInadimplencia === 'pendente'
                  ? 'inadimplente'
                  : 'regular');

              return (
                <React.Fragment key={item.id}>
                  <tr>
                    <td className="name-cell">{item.nome}</td>
                    <td className="cpf-cell">
                      <div className="cpf-flex">
                        <span>{displayCPF}</span>
                        <button
                          className="icon-btn"
                          onClick={() => toggleCPFMask(item.cpf)}
                          title={isCPFUnmasked ? 'Ocultar CPF' : 'Mostrar CPF'}
                        >
                          {isCPFUnmasked ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          situacaoAtual === 'inadimplente' ? 'badge-ativo' : 'badge-resolvido'
                        }`}
                      >
                        {situacaoAtual === 'inadimplente' ? 'Inadimplente' : 'Adimplente'}
                      </span>
                    </td>
                    <td>{item.projeto}</td>
                    <td>{item.idProjeto}</td>
                    <td>
                      <span className={`badge badge-mecanismo-${item.mecanismo.toLowerCase()}`}>
                        {item.mecanismo}
                      </span>
                    </td>
                    <td>{item.executor}</td>
                    <td>{item.municipio}</td>
                    <td>{item.representante}</td>
                    <td>
                      <button
                        className="icon-btn"
                        onClick={() => toggleRow(item.id)}
                        title={isExpanded ? 'Recolher' : 'Expandir'}
                      >
                        <ChevronDown
                          size={16}
                          style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.15s ease',
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="expanded-row">
                      <td colSpan={10}>
                        <div className="expanded-grid">
                          <div>
                            <div className="expanded-label">Período do Registro Inicial</div>
                            <div className="expanded-value">{item.dataPeriodo}</div>
                          </div>
                          <div>
                            <div className="expanded-label">Data de Registro</div>
                            <div className="expanded-value">{item.dataRegistro || 'N/A'}</div>
                          </div>
                        </div>

                        {historicoPorCpf?.has(item.cpf) && (
                          <div className="historico-section">
                            <div className="expanded-label" style={{ marginBottom: 10 }}>
                              Evolução da Situação (DMPC)
                            </div>
                            <HistoricoCPFTimeline
                              situacoes={historicoPorCpf.get(item.cpf)!.situacoes}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={data.length}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </>
  );
};
