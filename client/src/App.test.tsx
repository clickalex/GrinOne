/**
 * Smoke test — renders the whole app and verifies the key modules mount
 * without runtime errors.
 */
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import App from "./App";

afterEach(cleanup);

beforeAll(() => {
  // framer-motion's useInView needs IntersectionObserver
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = () => [];
    root = null;
    rootMargin = "";
    thresholds = [];
  }
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  if (!window.matchMedia) {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))
    );
  }
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});

describe("GrinOne roadmap page", () => {
  it("renders without crashing and shows core modules", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<App />);

    // Hero
    expect(screen.getAllByText("GrinOne").length).toBeGreaterThan(0);
    expect(screen.getByText("Donation Platform")).toBeInTheDocument();
    expect(screen.getByText("Donate Now")).toBeInTheDocument();

    // All five phases
    for (const title of [
      "Planning & Strategy",
      "Design & User Experience",
      "Development & Integration",
      "Testing & Quality Assurance",
      "Launch & Optimization",
    ]) {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    }

    // Key modules
    expect(
      screen.getByText("How a Donation Reaches Its Destination")
    ).toBeInTheDocument();
    expect(screen.getByText("All Donation Types Accepted")).toBeInTheDocument();
    expect(screen.getByText("Where Your Donations Go")).toBeInTheDocument();
    expect(screen.getByText("Donor Message Wall")).toBeInTheDocument();
    expect(
      screen.getByText("See What Your Donation Achieves")
    ).toBeInTheDocument();

    // No unexpected React runtime errors
    const reactErrors = errorSpy.mock.calls.filter(
      args =>
        String(args[0]).includes("Error") ||
        String(args[0]).includes("Warning: ")
    );
    expect(reactErrors).toEqual([]);
    errorSpy.mockRestore();
  });

  it("opens and closes the donation modal", () => {
    render(<App />);
    fireEvent.click(screen.getAllByLabelText("Open donation form")[0]);
    expect(screen.getByRole("dialog", { name: "Donation form" })).toBeDefined();
    expect(screen.getByText("Make a Donation")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("impact calculator shows combined general-fund impact without '$$' glitches", () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /General Fund/ }));
    expect(screen.getByText(/Combined Impact/)).toBeInTheDocument();
    expect(container.textContent).not.toContain("$$");
  });

  it("physical donation widget schedules a pickup", () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText("Toggle Books"));
    fireEvent.click(screen.getByText(/Schedule Donation · 1 item/));
    expect(screen.getByText("Pickup scheduled!")).toBeInTheDocument();
  });

  it("one-click donate demo reacts to currency and amount selection", () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText("Switch to EUR"));
    fireEvent.click(screen.getByRole("button", { name: "€250" }));
    expect(
      screen.getByRole("button", { name: /One-Click Donate €250/ })
    ).toBeInTheDocument();
  });
});
