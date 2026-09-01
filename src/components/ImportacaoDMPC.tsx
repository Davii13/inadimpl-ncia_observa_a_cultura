import React, { useState, useRef } from 'react';
import { Upload, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  ImportacaoDMPC as ImportacaoDMPCType,
  RegistroDMPC,
  ComparativoImportacao,
  DetalheAlteracaoCPF,
} from '../types';
import { parseCSVDMPC } from '../utils/csvParser';
import { compararPeriodos } from '../utils/dmpcComparator';
import { formatPeriodo } from '../utils/formatters';
import { ResumoProcessamento } from './ResumoProcessamento';
import { DetalheImportacaoModal } from './DetalheImportacaoModal';

interface ImportacaoDMPCProps {
  importacoes: ImportacaoDMPCType[];
  registrosPorImportacao: Record<string, RegistroDMPC[]>;
  detalhesPorImportacao: Record<string, DetalheAlteracaoCPF[]>;
  onImportComplete: (
    importacao: ImportacaoDMPCType,
    registros: RegistroDMPC[],
    comparativo: ComparativoImportacao,
    detalhes: DetalheAlteracaoCPF[]
  ) => void;
}

const gerarOpcoesPeriodo = (): { value: string; label: string }[] => {
  const opcoes: { value: string; label: string }[] = [];
  const hoje = new Date();
  for (let i = -2; i <= 12; i++) {
    const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    opcoes.push({ value, label: formatPeriodo(value) });
  }
  return opcoes;
};

export const ImportacaoDMPC: React.FC<ImportacaoDMPCProps> = ({
  importacoes,
  registrosPorImportacao,
  detalhesPorImportacao,
  onImportComplete,
}) => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [periodo, setPeriodo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [ultimoComparativo, setUltimoComparativo] = useState<ComparativoImportacao | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const opcoesPeriodo = gerarOpcoesPeriodo();

  /** Período processado imediatamente anterior a `p` (não necessariamente a última importação). */
  const periodoAnteriorA = (p: string): string | null => {
    const anteriores = importacoes
      .filter((imp) => imp.status === 'processado' && imp.periodo < p)
      .map((imp) => imp.periodo)
      .sort((a, b) => b.localeCompare(a));
    return anteriores[0] ?? null;
  };

  const jaExisteImportacaoParaPeriodo = (p: string) =>
    importacoes.some((imp) => imp.periodo === p && imp.status === 'processado');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArquivo(file);
      setError('');
    }
  };

  const handleImportar = async () => {
    setError('');

    if (!arquivo) {
      setError('Selecione um arquivo para importar.');
      return;
    }
    if (!periodo) {
      setError('Selecione o período de referência da planilha.');
      return;
    }
    if (jaExisteImportacaoParaPeriodo(periodo)) {
      setError(
        `Já existe uma planilha processada para ${formatPeriodo(periodo)}. Reprocesse a importação existente em vez de duplicá-la.`
      );
      return;
    }

    setIsProcessing(true);

    try {
      const content = await arquivo.text();
      const { registros, invalidas, duplicados } = parseCSVDMPC(content, periodo);

      if (registros.length === 0) {
        setError(
          invalidas[0]?.motivo ||
            'Nenhum registro válido foi encontrado na planilha. Verifique o formato do arquivo.'
        );
        setIsProcessing(false);
        return;
      }

      const importacaoId = `imp-${periodo}`;
      const periodoAnterior = periodoAnteriorA(periodo);
      const registrosAnteriores = periodoAnterior
        ? registrosPorImportacao[`imp-${periodoAnterior}`] ?? null
        : null;

      const { comparativo, detalhes } = compararPeriodos(
        registros,
        registrosAnteriores,
        importacaoId,
        periodo,
        periodoAnterior
      );

      const novaImportacao: ImportacaoDMPCType = {
        id: importacaoId,
        periodo,
        nomeArquivo: arquivo.name,
        dataImportacao: new Date().toISOString(),
        totalRegistros: registros.length + invalidas.length,
        registrosValidos: registros.length,
        registrosInvalidos: invalidas.length,
        duplicadosNaPlanilha: duplicados,
        status: 'processado',
        usuario: 'Davi Nunes Carvalho',
        linhasInvalidas: invalidas,
      };

      onImportComplete(novaImportacao, registros, comparativo, detalhes);
      setUltimoComparativo(comparativo);
      setArquivo(null);
      setPeriodo('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError('Erro ao ler o arquivo. Verifique se é um CSV válido.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="dmpc-modal-content">
      <p className="dmpc-hint">
        Anexe a planilha mensal da DMPC (formato CSV, colunas: <code>cpf</code>, <code>nome</code>,{' '}
        <code>inadimplente</code> [SIM/NÃO], <code>projeto</code>, <code>id_projeto</code>,{' '}
        <code>municipio</code>). Cada planilha é registrada como uma referência mensal e não
        substitui o histórico anterior.
      </p>

      <div className="dmpc-upload-row">
        <div className="field" style={{ flex: 2 }}>
          <label className="field-label">Arquivo</label>
          <label className="dmpc-file-input">
            <Upload size={16} />
            <span>{arquivo ? arquivo.name : 'Selecionar planilha (.csv)'}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileSelect}
              hidden
            />
          </label>
        </div>

        <div className="field" style={{ flex: 1 }}>
          <label className="field-label">Período de Referência</label>
          <select className="select" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
            <option value="">Selecione...</option>
            {opcoesPeriodo.map((op) => (
              <option key={op.value} value={op.value} disabled={jaExisteImportacaoParaPeriodo(op.value)}>
                {op.label}
                {jaExisteImportacaoParaPeriodo(op.value) ? ' (já importado)' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="field" style={{ flex: '0 0 auto', justifyContent: 'flex-end' }}>
          <label className="field-label" style={{ visibility: 'hidden' }}>
            Ação
          </label>
          <button className="btn btn-primary" onClick={handleImportar} disabled={isProcessing}>
            <Upload size={15} />
            {isProcessing ? 'Processando...' : 'Importar planilha'}
          </button>
        </div>
      </div>

      {error && (
        <div className="dmpc-alert dmpc-alert-error">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {ultimoComparativo && !error && (
        <div className="dmpc-alert dmpc-alert-success">
          <CheckCircle2 size={16} />
          <span>Planilha de {formatPeriodo(ultimoComparativo.periodo)} processada com sucesso.</span>
        </div>
      )}

      {ultimoComparativo && <ResumoProcessamento comparativo={ultimoComparativo} />}

      <HistoricoImportacoes importacoes={importacoes} detalhesPorImportacao={detalhesPorImportacao} />
    </div>
  );
};

const HistoricoImportacoes: React.FC<{
  importacoes: ImportacaoDMPCType[];
  detalhesPorImportacao: Record<string, DetalheAlteracaoCPF[]>;
}> = ({ importacoes, detalhesPorImportacao }) => {
  const [detalheAberto, setDetalheAberto] = useState<ImportacaoDMPCType | null>(null);
  const ordenadas = [...importacoes].sort((a, b) => b.periodo.localeCompare(a.periodo));

  if (ordenadas.length === 0) {
    return (
      <div className="dmpc-history">
        <div className="panel-table-title" style={{ marginBottom: 8 }}>
          Histórico das Importações
        </div>
        <p className="state-subtext">Nenhuma planilha importada ainda.</p>
      </div>
    );
  }

  return (
    <div className="dmpc-history">
      <div className="panel-table-title" style={{ marginBottom: 8 }}>
        Histórico das Importações
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Período</th>
              <th>Arquivo</th>
              <th>Data da Importação</th>
              <th>Registros</th>
              <th>Situação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ordenadas.map((imp) => (
              <tr key={imp.id}>
                <td className="name-cell">{formatPeriodo(imp.periodo)}</td>
                <td>{imp.nomeArquivo}</td>
                <td>{new Date(imp.dataImportacao).toLocaleDateString('pt-BR')}</td>
                <td>
                  {imp.registrosValidos.toLocaleString('pt-BR')}
                  {imp.registrosInvalidos > 0 && (
                    <span style={{ color: 'var(--danger)', marginLeft: 6 }}>
                      ({imp.registrosInvalidos} inválidos)
                    </span>
                  )}
                </td>
                <td>
                  <span className={`badge ${imp.status === 'processado' ? 'badge-resolvido' : 'badge-cancelado'}`}>
                    <span className="badge-dot" />
                    {imp.status === 'processado' ? 'Processado' : imp.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-small"
                    onClick={() => setDetalheAberto(imp)}
                    disabled={!detalhesPorImportacao[imp.id]?.length}
                  >
                    Ver detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detalheAberto && (
        <DetalheImportacaoModal
          importacao={detalheAberto}
          detalhes={detalhesPorImportacao[detalheAberto.id] ?? []}
          onClose={() => setDetalheAberto(null)}
        />
      )}
    </div>
  );
};
