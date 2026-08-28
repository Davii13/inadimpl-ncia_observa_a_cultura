import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { FiltrosInadimplencia, ProjetoOption } from '../types';
import { validateCPF, formatCPF } from '../utils/formatters';

interface FilterSectionProps {
  projetos: ProjetoOption[];
  onFilterChange: (filtros: Partial<FiltrosInadimplencia>) => void;
  onSearch: (filtros: FiltrosInadimplencia) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ projetos, onSearch }) => {
  const [expanded, setExpanded] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosInadimplencia>({
    cpf: '',
    projetoId: '',
    dataInicial: '',
    dataFinal: '',
    alteracao: 'todos',
  });
  const [cpfError, setCpfError] = useState('');
  const [periodError, setPeriodError] = useState('');

  const handleCPFChange = (value: string) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 11) {
      const formatted = clean.length > 0 ? formatCPF(clean) : '';
      setFiltros({ ...filtros, cpf: formatted });
      setCpfError('');
    }
  };

  const handleSearch = () => {
    setCpfError('');
    setPeriodError('');

    if (filtros.cpf && !validateCPF(filtros.cpf)) {
      setCpfError('CPF inválido. Use o formato: 000.000.000-00');
      return;
    }

    if (filtros.dataInicial && filtros.dataFinal) {
      if (new Date(filtros.dataInicial) > new Date(filtros.dataFinal)) {
        setPeriodError('A data inicial deve ser anterior à data final.');
        return;
      }
    }

    onSearch(filtros);
  };

  const handleClear = () => {
    setFiltros({ cpf: '', projetoId: '', dataInicial: '', dataFinal: '', alteracao: 'todos' });
    setCpfError('');
    setPeriodError('');
  };

  return (
    <div className="panel">
      <div className="panel-header" onClick={() => setExpanded(!expanded)}>
        <span className="panel-header-title">Filtros</span>
        <span className={`panel-chevron${expanded ? ' open' : ''}`}>
          <ChevronDown size={18} />
        </span>
      </div>

      {expanded && (
        <div className="panel-body">
          <div className="filters-grid">
            <div className="field">
              <label className="field-label">📋 Buscar por CPF</label>
              <input
                type="text"
                className="input"
                placeholder="000.000.000-00"
                value={filtros.cpf}
                onChange={(e) => handleCPFChange(e.target.value)}
              />
              {cpfError && <span className="field-error">{cpfError}</span>}
            </div>

            <div className="field">
              <label className="field-label">📁 Buscar por Projeto</label>
              <select
                className="select"
                value={filtros.projetoId}
                onChange={(e) => setFiltros({ ...filtros, projetoId: e.target.value })}
              >
                <option value="">Selecione um projeto</option>
                {projetos.map((projeto) => (
                  <option key={projeto.id} value={projeto.id}>
                    {projeto.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" data-field="periodo">
              <label className="field-label">📅 Filtrar por Período</label>
              <div className="field-row">
                <input
                  type="date"
                  className="input"
                  value={filtros.dataInicial}
                  onChange={(e) => setFiltros({ ...filtros, dataInicial: e.target.value })}
                />
                <span className="field-row-sep">até</span>
                <input
                  type="date"
                  className="input"
                  value={filtros.dataFinal}
                  onChange={(e) => setFiltros({ ...filtros, dataFinal: e.target.value })}
                />
              </div>
              {periodError && <span className="field-error">{periodError}</span>}
            </div>

            <div className="field">
              <label className="field-label">🔄 Situação da Alteração</label>
              <select
                className="select"
                value={filtros.alteracao}
                onChange={(e) =>
                  setFiltros({ ...filtros, alteracao: e.target.value as FiltrosInadimplencia['alteracao'] })
                }
              >
                <option value="todos">Todos</option>
                <option value="novo_inadimplente">Novos inadimplentes</option>
                <option value="continua_inadimplente">Continuam inadimplentes</option>
                <option value="deixou_inadimplente">Deixaram de ser inadimplentes</option>
                <option value="permanece_regular">Permaneceram regulares</option>
              </select>
            </div>
          </div>

          <div className="field-actions">
            <button className="btn btn-primary" onClick={handleSearch}>
              <Search size={15} />
              Pesquisar
            </button>
            <button className="btn" onClick={handleClear}>
              Limpar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
