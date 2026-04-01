interface PaginationLabels {
  previous: string;
  next: string;
  page: string;
  of: string;
}

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  loading?: boolean;
  labels: PaginationLabels;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange?: (page: number) => void;
}

export default function PaginationControls({
  page,
  totalPages,
  hasPrevPage,
  hasNextPage,
  loading = false,
  labels,
  onPrevious,
  onNext,
  onPageChange,
}: PaginationControlsProps) {
  const pageWindowSize = 5;
  const halfWindow = Math.floor(pageWindowSize / 2);

  let startPage = Math.max(1, page - halfWindow);
  const endPage = Math.min(totalPages, startPage + pageWindowSize - 1);

  if (endPage - startPage + 1 < pageWindowSize) {
    startPage = Math.max(1, endPage - pageWindowSize + 1);
  }

  const pageNumbers = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, index) => startPage + index,
  );

  return (
    <div className="w-full flex justify-center px-2">
      <div className="w-full max-w-3xl rounded-2xl border border-border bg-surface/95 p-3 md:p-4 shadow-sm">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={onPrevious}
            disabled={!hasPrevPage || loading}
            className="inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 border border-border rounded-lg font-bold text-xs md:text-sm text-text-primary bg-bg/40 hover:bg-bg disabled:opacity-50">
            <span aria-hidden="true">&lt;</span>
            {labels.previous}
          </button>

          {startPage > 1 && (
            <>
              <span className="px-3 py-1.5 rounded-lg border border-border text-sm font-bold text-text-secondary bg-bg/40">
                1
              </span>
              {startPage > 2 && (
                <span className="text-text-secondary font-bold">...</span>
              )}
            </>
          )}

          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={
                pageNumber === page
                  ? undefined
                  : () => onPageChange?.(pageNumber)
              }
              disabled={loading || pageNumber === page}
              className={`px-3 py-1.5 rounded-lg border text-sm font-bold transition-colors disabled:opacity-60 ${
                pageNumber === page
                  ? "border-button-primary bg-button-primary text-button-primary-text"
                  : "border-border text-text-primary bg-bg/40 hover:bg-bg"
              }`}>
              {pageNumber}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="text-text-secondary font-bold">...</span>
              )}
              <span className="px-3 py-1.5 rounded-lg border border-border text-sm font-bold text-text-secondary bg-bg/40">
                {totalPages}
              </span>
            </>
          )}
          <button
            onClick={onNext}
            disabled={!hasNextPage || loading}
            className="inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 border border-border rounded-lg font-bold text-xs md:text-sm text-text-primary bg-bg/40 hover:bg-bg disabled:opacity-50">
            {labels.next}
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>

        <div className="mt-3 text-center text-xs md:text-sm font-bold text-text-secondary">
          {labels.page} {page} {labels.of} {totalPages}
        </div>
      </div>
    </div>
  );
}
