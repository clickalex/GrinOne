import { useState } from "react";

/** Max rows shown in any list before pagination kicks in. */
export const DEFAULT_PAGE_SIZE = 10;

/**
 * Pagination state for a list of `totalItems` rows shown `pageSize` at a
 * time. The current page is clamped when the list shrinks (e.g. when a
 * filter narrows the results), and `reset()` returns to page 1 — call it
 * whenever the filter criteria change.
 */
export function usePagination(totalItems: number, pageSize: number) {
  const [rawPage, setRawPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(1, rawPage), pageCount);
  const setPage = (next: number) =>
    setRawPage(Math.min(Math.max(1, next), pageCount));
  const reset = () => setRawPage(1);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return { page, pageCount, setPage, reset, startIndex, endIndex };
}
