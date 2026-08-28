import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import { Inadimplente, HistoricoCPF } from '../types';
import { maskCPF, formatCPF, getStatusLabel } from '../utils/formatters';
import { HistoricoCPFTimeline } from './HistoricoCPFTimeline';

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
        <div className="state-icon">📋</div>
        <p className="state-text">Aplique filtros acima para visualizar os inadimplentes</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="state-box">
        <div className="state-icon">🔍</div>
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
              <th>CPF</th>
              <th>Nome</th>
              <th>Projeto</th>
              <th>Nº Projeto</th>
              <th>Status</th>
              <th>Período</th>
              <th>Município</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const isExpanded = expandedRows.has(item.id);
              const isCPFUnmasked = unmaskedCPFs.has(item.cpf);
              const displayCPF = isCPFUnmasked ? formatCPF(item.cpf) : maskCPF(item.cpf);
              const statusClass = `badge badge-${item.statusInadimplencia}`;

              return (
                <React.Fragment key={item.id}>
                  <tr>
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
                    <td className="name-cell">{item.nome}</td>
                    <td>{item.projeto}</td>
                    <td>{item.idProjeto}</td>
                    <td>
                      <span className={statusClass}>
                        <span className="badge-dot" />
                        {getStatusLabel(item.statusInadimplencia)}
                      </span>
                    </td>
                    <td>{item.dataPeriodo}</td>
                    <td>{item.municipio}</td>
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
                      <td colSpan={8}>
                        <div className="expanded-grid">
                          <div>
                            <div className="expanded-label">CPF (Completo)</div>
                            <div className="expanded-value">{formatCPF(item.cpf)}</div>
                          </div>
                          <div>
                            <div className="expanded-label">Data de Registro</div>
                            <div className="expanded-value">{item.dataRegistro || 'N/A'}</div>
                          </div>
                          {item.executor && (
                            <div>
                              <div className="expanded-label">Executor</div>
                              <div className="expanded-value">{item.executor}</div>
                            </div>
                          )}
                          {item.numeroProjetosRelacionados && (
                            <div>
                              <div className="expanded-label">Projetos Relacionados</div>
                              <div className="expanded-value">
                                {item.numeroProjetosRelacionados}
                              </div>
                            </div>
                          )}
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
    </>
  );
};
