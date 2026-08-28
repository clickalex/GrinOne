import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { Pagination } from "./Pagination";

afterEach(cleanup);

/** Stateful wrapper so page clicks re-render like a real parent. */
function Harness({
  totalItems,
  pageSize,
  itemLabel = "ROWS",
}: {
  totalItems: number;
  pageSize: number;
  itemLabel?: string;
}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  return (
    <Pagination
      page={page}
      pageCount={pageCount}
      onPageChange={setPage}
      totalItems={totalItems}
      pageSize={pageSize}
      itemLabel={itemLabel}
    />
  );
}

describe("Pagination control", () => {
  it("renders nothing when the list fits on one page", () => {
    const { container } = render(<Harness totalItems={10} pageSize={10} />);
    expect(container.querySelector("nav")).toBeNull();
  });

  it("shows a range label, steps through pages, and disables edges", () => {
    render(<Harness totalItems={35} pageSize={10} />);

    expect(screen.getByText(/Showing 1–10 of 35 ROWS/i)).toBeInTheDocument();

    // Jump to page 3
    fireEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(screen.getByText(/Showing 21–30 of 35 ROWS/i)).toBeInTheDocument();

    // Next reaches the last (partial) page
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByText(/Showing 31–35 of 35 ROWS/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();

    // Previous goes back one page
    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(screen.getByText(/Showing 21–30 of 35 ROWS/i)).toBeInTheDocument();

    // Page 1 disables Previous
    fireEvent.click(screen.getByRole("button", { name: "Page 1" }));
    expect(
      screen.getByRole("button", { name: "Previous page" })
    ).toBeDisabled();
  });

  it("collapses long page ranges with ellipses", () => {
    render(<Harness totalItems={100} pageSize={10} />);

    // Page 1 of 10 → adjacent window, only a trailing ellipsis
    expect(screen.getAllByText("…").length).toBe(1);

    // Walk the window out to page 5 → 1 … 4 5 6 … 10, two ellipses
    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    fireEvent.click(screen.getByRole("button", { name: "Page 3" }));
    fireEvent.click(screen.getByRole("button", { name: "Page 4" }));
    fireEvent.click(screen.getByRole("button", { name: "Page 5" }));
    expect(screen.getAllByText("…").length).toBe(2);
    expect(screen.getByRole("button", { name: "Page 10" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Page 8" })).toBeNull();
  });

  it("marks the active page with aria-current", () => {
    render(<Harness totalItems={25} pageSize={10} />);
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("button", { name: "Page 2" })).not.toHaveAttribute(
      "aria-current"
    );
  });
});
