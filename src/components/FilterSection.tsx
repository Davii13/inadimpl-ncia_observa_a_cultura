import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { FiltrosInadimplencia, ProjetoOption, PeriodoRapido, SituacaoDMPCFiltro, Mecanismo } from '../types';
import { validateCPF, formatCPF } from '../utils/formatters';
import { mockMunicipios, mockEditais } from '../data/mockData';

interface FilterSectionProps {
  projetos: ProjetoOption[];
  onFilterChange: (filtros: Partial<FiltrosInadimplencia>) => void;
  onSearch: (filtros: FiltrosInadimplencia) => void;
}

const defaultFiltros: FiltrosInadimplencia = {
  busca: '',
  cpf: '',
  projetoId: '',
  dataInicial: '',
  dataFinal: '',
  periodoRapido: 'tudo',
  situacao: 'todos',
  municipio: '',
  edital: '',
  statusInadimplencia: '',
  mecanismo: '',
  alteracao: 'todos',
};

const periodoRapidoOptions: { value: PeriodoRapido; label: string }[] = [
  { value: 'tudo', label: 'Tudo' },
  { value: '7dias', label: '7 dias' },
  { value: '30dias', label: '30 dias' },
  { value: '90dias', label: '90 dias' },
  { value: '1ano', label: '1 ano' },
];

const situacaoOptions: { value: SituacaoDMPCFiltro; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'inadimplente', label: 'Inadimplente' },
  { value: 'regular', label: 'Regular' },
];

const mecanismoOptions: { value: Mecanismo | ''; label: string }[] = [
  { value: '', label: 'Todos' },
  { value: 'FEC', label: 'FEC' },
  { value: 'LEIC', label: 'LEIC' },
];

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  defaultOpen = false,
  children,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="filter-section">
      <button className="filter-section-header" onClick={() => setOpen(!open)} type="button">
        <span className="filter-section-title">{title}</span>
        <span className={`panel-chevron${open ? ' open' : ''}`}>
          <ChevronDown size={16} />
        </span>
      </button>
      {open && <div className="filter-section-body">{children}</div>}
    </div>
  );
};

export const FilterSection: React.FC<FilterSectionProps> = ({ projetos, onSearch }) => {
  const [expanded, setExpanded] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosInadimplencia>(defaultFiltros);
  const [cpfError, setCpfError] = useState('');
  const [periodError, setPeriodError] = useState('');

  const patch = (partial: Partial<FiltrosInadimplencia>) => setFiltros({ ...filtros, ...partial });

  const handleBuscaChange = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '');
    const looksLikeCPF = onlyDigits.length >= 3 && /^\d+$/.test(value.replace(/[.\-\s]/g, ''));

    if (looksLikeCPF && onlyDigits.length <= 11) {
      patch({ busca: onlyDigits.length > 0 ? formatCPF(onlyDigits) : '' });
    } else {
      patch({ busca: value });
    }
    setCpfError('');
  };

  const handleSearch = () => {
    setCpfError('');
    setPeriodError('');

    const buscaClean = filtros.busca.replace(/\D/g, '');
    const buscaPareceCPF = buscaClean.length > 0 && /^\d+$/.test(filtros.busca.replace(/[.\-\s]/g, ''));
    if (buscaPareceCPF && !validateCPF(filtros.busca)) {
      setCpfError('CPF incompleto ou inválido. Use o formato: 000.000.000-00');
      return;
    }

    if (filtros.dataInicial && filtros.dataFinal) {
      if (new Date(filtros.dataInicial) > new Date(filtros.dataFinal)) {
        setPeriodError('A data inicial deve ser anterior à data final.');
        return;
      }
    }

    const cpf = buscaPareceCPF ? filtros.busca : '';
    onSearch({ ...filtros, cpf });
  };

  const handleClear = () => {
    setFiltros(defaultFiltros);
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
        <div className="panel-body panel-body-sections">
          <CollapsibleSection title="Buscar" defaultOpen>
            <div className="field">
              <label className="field-label">Nome, CPF ou nº do projeto</label>
              <input
                type="text"
                className="input"
                placeholder="Nome, CPF ou nº..."
                value={filtros.busca}
                onChange={(e) => handleBuscaChange(e.target.value)}
              />
              {cpfError && <span className="field-error">{cpfError}</span>}
            </div>

            <div className="chip-row-group">
              <div className="chip-group">
                <span className="chip-group-label">Período rápido:</span>
                <div className="chip-row">
                  {periodoRapidoOptions.map((op) => (
                    <button
                      key={op.value}
                      type="button"
                      className={`chip${filtros.periodoRapido === op.value ? ' active' : ''}`}
                      onClick={() => patch({ periodoRapido: op.value })}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="chip-group">
                <span className="chip-group-label">Situação:</span>
                <div className="chip-row">
                  {situacaoOptions.map((op) => (
                    <button
                      key={op.value}
                      type="button"
                      className={`chip${filtros.situacao === op.value ? ' active' : ''}`}
                      onClick={() => patch({ situacao: op.value })}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="chip-group">
                <span className="chip-group-label">Mecanismo:</span>
                <div className="chip-row">
                  {mecanismoOptions.map((op) => (
                    <button
                      key={op.value || 'todos'}
                      type="button"
                      className={`chip${filtros.mecanismo === op.value ? ' active' : ''}`}
                      onClick={() => patch({ mecanismo: op.value })}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Período">
            <div className="filters-grid">
              <div className="field">
                <label className="field-label">De (data de referência)</label>
                <input
                  type="date"
                  className="input"
                  value={filtros.dataInicial}
                  onChange={(e) => patch({ dataInicial: e.target.value })}
                />
              </div>
              <div className="field">
                <label className="field-label">Até (data de referência)</label>
                <input
                  type="date"
                  className="input"
                  value={filtros.dataFinal}
                  onChange={(e) => patch({ dataFinal: e.target.value })}
                />
              </div>
            </div>
            {periodError && <span className="field-error">{periodError}</span>}
          </CollapsibleSection>

          <CollapsibleSection title="Geografia">
            <div className="filters-grid">
              <div className="field">
                <label className="field-label">Município do executor</label>
                <select
                  className="select"
                  value={filtros.municipio}
                  onChange={(e) => patch({ municipio: e.target.value })}
                >
                  <option value="">Todos</option>
                  {mockMunicipios.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="field-label">Projeto</label>
                <select
                  className="select"
                  value={filtros.projetoId}
                  onChange={(e) => patch({ projetoId: e.target.value })}
                >
                  <option value="">Todos</option>
                  {projetos.map((projeto) => (
                    <option key={projeto.id} value={projeto.id}>
                      {projeto.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Edital">
            <div className="field">
              <label className="field-label">Edital</label>
              <select
                className="select"
                value={filtros.edital}
                onChange={(e) => patch({ edital: e.target.value })}
              >
                <option value="">Todos</option>
                {mockEditais.map((edital) => (
                  <option key={edital} value={edital}>
                    {edital}
                  </option>
                ))}
              </select>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Status">
            <div className="filters-grid">
              <div className="field">
                <label className="field-label">Status da inadimplência</label>
                <select
                  className="select"
                  value={filtros.statusInadimplencia}
                  onChange={(e) => patch({ statusInadimplencia: e.target.value })}
                >
                  <option value="">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="resolvido">Resolvido</option>
                  <option value="pendente">Pendente</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <div className="field">
                <label className="field-label">Situação da alteração</label>
                <select
                  className="select"
                  value={filtros.alteracao}
                  onChange={(e) =>
                    patch({ alteracao: e.target.value as FiltrosInadimplencia['alteracao'] })
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
          </CollapsibleSection>

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
