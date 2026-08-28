import React from 'react';
import { ComparativoImportacao } from '../types';
import { formatPeriodo } from '../utils/formatters';

interface ResumoProcessamentoProps {
  comparativo: ComparativoImportacao;
}

export const ResumoProcessamento: React.FC<ResumoProcessamentoProps> = ({ comparativo }) => {
  const stats = [
    { label: 'Total de CPFs analisados', value: comparativo.totalAnalisados, tone: 'neutral' },
    { label: 'Inadimplentes', value: comparativo.totalInadimplentes, tone: 'danger' },
    { label: 'Novos inadimplentes', value: comparativo.novosInadimplentes, tone: 'danger' },
    { label: 'Deixaram de ser inadimplentes', value: comparativo.deixaramDeSerInadimplentes, tone: 'success' },
    { label: 'Continuam inadimplentes', value: comparativo.continuamInadimplentes, tone: 'warning' },
    { label: 'Regulares', value: comparativo.totalRegulares, tone: 'success' },
    { label: 'Novos no sistema', value: comparativo.novosNoSistema, tone: 'neutral' },
    { label: 'Ausentes na planilha atual', value: comparativo.ausentesNoPeriodoAtual, tone: 'muted' },
  ];

  return (
    <div className="resumo-processamento">
      <div className="resumo-header">
        <span className="resumo-title">Processamento DMPC — {formatPeriodo(comparativo.periodo)}</span>
        {comparativo.periodoAnterior && (
          <span className="resumo-subtitle">
            Comparado com {formatPeriodo(comparativo.periodoAnterior)}
          </span>
        )}
      </div>
      <div className="resumo-grid">
        {stats.map((stat) => (
          <div key={stat.label} className={`resumo-stat resumo-stat-${stat.tone}`}>
            <div className="resumo-stat-value">{stat.value.toLocaleString('pt-BR')}</div>
            <div className="resumo-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      {!comparativo.periodoAnterior && (
        <p className="state-subtext" style={{ marginTop: 12 }}>
          Esta é a primeira planilha importada — não há período anterior para comparação.
        </p>
      )}
    </div>
  );
};
