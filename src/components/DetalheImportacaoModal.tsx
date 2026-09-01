import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ImportacaoDMPC, DetalheAlteracaoCPF, TipoAlteracao } from '../types';
import { formatCPF, formatPeriodo, getTipoAlteracaoLabel, getTipoAlteracaoBadgeClass } from '../utils/formatters';
import { Modal } from './Modal';

interface DetalheImportacaoModalProps {
  importacao: ImportacaoDMPC;
  detalhes: DetalheAlteracaoCPF[];
  onClose: () => void;
}

type FiltroAba = 'todos' | TipoAlteracao;

const abas: { value: FiltroAba; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'continua_inadimplente', label: 'Continuam inadimplentes' },
  { value: 'novo_inadimplente', label: 'Novos inadimplentes' },
  { value: 'deixou_inadimplente', label: 'Deixaram de ser inadimplentes' },
  { value: 'permanece_regular', label: 'Permanecem regulares' },
  { value: 'novo_no_sistema', label: 'Novos no sistema' },
  { value: 'ausente_no_periodo', label: 'Ausentes nesta planilha' },
];

export const DetalheImportacaoModal: React.FC<DetalheImportacaoModalProps> = ({
  importacao,
  detalhes,
  onClose,
}) => {
  const [aba, setAba] = useState<FiltroAba>('todos');
  const [busca, setBusca] = useState('');

  const contagemPorAba = useMemo(() => {
    const map = new Map<FiltroAba, number>();
    map.set('todos', detalhes.length);
    detalhes.forEach((d) => map.set(d.tipoAlteracao, (map.get(d.tipoAlteracao) ?? 0) + 1));
    return map;
  }, [detalhes]);

  const filtrados = useMemo(() => {
    let lista = detalhes;
    if (aba !== 'todos') {
      lista = lista.filter((d) => d.tipoAlteracao === aba);
    }
    if (busca) {
      const buscaClean = busca.replace(/\D/g, '');
      const buscaLower = busca.toLowerCase();
      lista = lista.filter((d) => {
        const cpfMatch = buscaClean.length > 0 && d.cpf.includes(buscaClean);
        const nomeMatch = d.nome.toLowerCase().includes(buscaLower);
        return cpfMatch || nomeMatch;
      });
    }
    return lista;
  }, [detalhes, aba, busca]);

  return (
    <Modal
      title={`Detalhamento · ${formatPeriodo(importacao.periodo)} (${importacao.nomeArquivo})`}
      onClose={onClose}
    >
      <div className="detalhe-modal-content">
        <div className="chip-row">
          {abas.map((item) => {
            const count = contagemPorAba.get(item.value) ?? 0;
            if (item.value !== 'todos' && count === 0) return null;
            return (
              <button
                key={item.value}
                type="button"
                className={`chip${aba === item.value ? ' active' : ''}`}
                onClick={() => setAba(item.value)}
              >
                {item.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="field">
          <div className="dmpc-search-input">
            <Search size={15} />
            <input
              type="text"
              className="input"
              placeholder="Buscar por nome ou CPF..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {filtrados.length === 0 ? (
          <div className="state-box">
            <p className="state-text">Nenhum CPF encontrado nesta categoria.</p>
          </div>
        ) : (
          <div className="table-wrapper detalhe-table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>CPF</th>
                  <th>Nome</th>
                  <th>Situação Anterior</th>
                  <th>Situação Atual</th>
                  <th>Alteração</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((d) => (
                  <tr key={d.cpf}>
                    <td className="cpf-cell">{formatCPF(d.cpf)}</td>
                    <td className="name-cell">{d.nome}</td>
                    <td>{d.situacaoAnterior ? formatSituacao(d.situacaoAnterior) : '—'}</td>
                    <td>{d.situacaoAtual ? formatSituacao(d.situacaoAtual) : '—'}</td>
                    <td>
                      <span className={`badge ${getTipoAlteracaoBadgeClass(d.tipoAlteracao)}`}>
                        {getTipoAlteracaoLabel(d.tipoAlteracao)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="footer-note">
          Mostrando <strong>{filtrados.length}</strong> de <strong>{detalhes.length}</strong> CPF(s)
          analisados nesta importação.
        </div>
      </div>
    </Modal>
  );
};

function formatSituacao(situacao: 'inadimplente' | 'regular'): string {
  return situacao === 'inadimplente' ? 'Inadimplente' : 'Regular';
}
