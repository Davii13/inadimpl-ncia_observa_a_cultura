import React from 'react';
import { SituacaoPeriodo } from '../types';
import { formatPeriodo, getSituacaoDMPCLabel } from '../utils/formatters';

interface HistoricoCPFTimelineProps {
  situacoes: SituacaoPeriodo[];
}

export const HistoricoCPFTimeline: React.FC<HistoricoCPFTimelineProps> = ({ situacoes }) => {
  if (situacoes.length === 0) {
    return <p className="state-subtext">Sem histórico de importações DMPC para este CPF.</p>;
  }

  return (
    <div className="timeline">
      {situacoes.map((s, index) => (
        <div key={`${s.periodo}-${index}`} className="timeline-item">
          <span className={`timeline-dot timeline-dot-${s.situacao}`} />
          <div>
            <div className="timeline-periodo">{formatPeriodo(s.periodo)}</div>
            <div className={`timeline-situacao timeline-situacao-${s.situacao}`}>
              {getSituacaoDMPCLabel(s.situacao)}
            </div>
          </div>
          {index < situacoes.length - 1 && <span className="timeline-arrow">→</span>}
        </div>
      ))}
    </div>
  );
};
