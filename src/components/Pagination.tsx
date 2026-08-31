import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

const buildPageList = (current: number, totalPages: number): (number | 'ellipsis')[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, 2, totalPages - 1, totalPages, current - 1, current, current + 1]);
  const filtered = Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  const result: (number | 'ellipsis')[] = [];
  filtered.forEach((p, index) => {
    if (index > 0 && p - filtered[index - 1] > 1) {
      result.push('ellipsis');
    }
    result.push(p);
  });

  return result;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);
  const pageList = buildPageList(page, totalPages);

  return (
    <div className="pagination">
      <div className="pagination-summary">
        Mostrando <strong>{startItem}–{endItem}</strong> de{' '}
        <strong>{totalItems.toLocaleString('pt-BR')}</strong> registro(s)
      </div>

      <div className="pagination-controls">
        <div className="pagination-page-size">
          <span className="pagination-page-size-label">Itens por página:</span>
          <select
            className="select pagination-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="pagination-nav">
          <button
            className="pagination-btn"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            title="Página anterior"
          >
            <ChevronLeft size={16} />
          </button>

          {pageList.map((item, index) =>
            item === 'ellipsis' ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                …
              </span>
            ) : (
              <button
                key={item}
                className={`pagination-btn${item === page ? ' active' : ''}`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            )
          )}

          <button
            className="pagination-btn"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            title="Próxima página"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
