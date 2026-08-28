import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Mission-control styled pagination control. Renders nothing when the
 * whole list fits on a single page.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  totalItems,
  pageSize,
  itemLabel = "ROWS",
  accent = "#0077b6",
}: {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called with the new page number. */
  onPageChange: (page: number) => void;
  /** Total rows across all pages — used for the "showing X–Y of Z" label. */
  totalItems: number;
  /** Rows per page — used for the "showing X–Y of Z" label. */
  pageSize: number;
  /** Plural noun shown in the range label, e.g. "DONORS". */
  itemLabel?: string;
  /** Accent color for the active page pill. */
  accent?: string;
}) {
  if (pageCount <= 1) return null;

  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalItems);

  // Numbered buttons with ellipses when there are many pages
  const pageNumbers: Array<number | "ellipsis"> = [];
  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push("ellipsis");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(pageCount - 1, page + 1);
      i++
    ) {
      pageNumbers.push(i);
    }
    if (page < pageCount - 2) pageNumbers.push("ellipsis");
    pageNumbers.push(pageCount);
  }

  const stepButton =
    "flex items-center justify-center w-6 h-6 rounded border font-mono text-[10px] transition-colors disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <nav
      aria-label={`Pagination — ${itemLabel.toLowerCase()}`}
      className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2"
    >
      <span
        className="font-mono text-[9px] text-gray-500 tracking-wider uppercase"
        aria-live="polite"
      >
        Showing {rangeStart}–{rangeEnd} of {totalItems} {itemLabel}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className={`${stepButton} border-white/[0.08] bg-white/[0.03] text-gray-300 hover:bg-white/[0.06]`}
        >
          <ChevronLeft size={12} />
        </button>
        {pageNumbers.map((p, i) =>
          p === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="px-1 font-mono text-[10px] text-gray-600 select-none"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={`flex items-center justify-center min-w-6 h-6 px-1.5 rounded border font-mono text-[10px] font-semibold transition-colors ${
                p === page
                  ? "cursor-default"
                  : "border-white/[0.08] bg-white/[0.03] text-gray-300 hover:bg-white/[0.06] cursor-pointer"
              }`}
              style={
                p === page
                  ? {
                      backgroundColor: `${accent}18`,
                      borderColor: `${accent}50`,
                      color: accent,
                    }
                  : undefined
              }
            >
              {p}
            </button>
          )
        )}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pageCount}
          aria-label="Next page"
          className={`${stepButton} border-white/[0.08] bg-white/[0.03] text-gray-300 hover:bg-white/[0.06]`}
        >
          <ChevronRight size={12} />
        </button>
      </div>
    </nav>
  );
}
