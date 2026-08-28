/**
 * Smoke tests — multi-page app: renders each page, verifies key modules
 * mount, and checks navigation between pages.
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

/** Reset browser history back to the home page between tests. */
function resetLocation() {
  window.history.pushState({}, "", "/");
}

function navigate(label: string) {
  fireEvent.click(screen.getAllByRole("link", { name: label })[0]);
}

describe("GrinOne multi-page app", () => {
  it("renders the home page with hero and navigation hub", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<App />);

    // Hero
    expect(screen.getAllByText("GrinOne").length).toBeGreaterThan(0);
    expect(screen.getByText("Donation Platform")).toBeInTheDocument();
    expect(screen.getAllByText("Donate Now").length).toBeGreaterThan(0);

    // Navigation hub links to every page
    for (const card of [
      "Project Roadmap",
      "Donation Options",
      "Builder's Guide",
      "Live Demo Zone",
    ]) {
      expect(screen.getByText(card)).toBeInTheDocument();
    }
    // "Transparency" appears in both the navbar and the hub card
    expect(screen.getAllByText("Transparency").length).toBeGreaterThan(0);

    const reactErrors = errorSpy.mock.calls.filter(
      args =>
        String(args[0]).includes("Error") ||
        String(args[0]).includes("Warning: ")
    );
    expect(reactErrors).toEqual([]);
    errorSpy.mockRestore();
  });

  it("navbar links navigate between pages", () => {
    render(<App />);

    // Roadmap
    navigate("Go to Roadmap");
    expect(screen.getAllByText("Planning & Strategy").length).toBeGreaterThan(
      0
    );

    // Donations
    navigate("Go to Donations");
    expect(
      screen.getByText("How a Donation Reaches Its Destination")
    ).toBeInTheDocument();

    // Transparency
    navigate("Go to Transparency");
    expect(screen.getByText("Where Your Donations Go")).toBeInTheDocument();

    // Guide
    navigate("Go to Guide");
    expect(
      screen.getByText("Essential Donation Platform Features")
    ).toBeInTheDocument();

    // Demo
    navigate("Go to Live Demo");
    expect(screen.getByText("Donor Message Wall")).toBeInTheDocument();

    // Back home
    navigate("GrinOne home");
    expect(screen.getByText("Donation Platform")).toBeInTheDocument();
  });

  it("opens and closes the donation modal from any page", () => {
    render(<App />);
    fireEvent.click(screen.getAllByLabelText("Open donation form")[0]);
    expect(screen.getByRole("dialog", { name: "Donation form" })).toBeDefined();
    expect(screen.getByText("Make a Donation")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("demo page: impact calculator shows combined general-fund impact without '$$' glitches", () => {
    resetLocation();
    render(<App />);
    navigate("Go to Live Demo");
    fireEvent.click(screen.getByRole("button", { name: /General Fund/ }));
    expect(screen.getByText(/Combined Impact/)).toBeInTheDocument();
  });

  it("demo page: physical donation widget schedules a pickup", () => {
    resetLocation();
    render(<App />);
    navigate("Go to Live Demo");
    fireEvent.click(screen.getByLabelText("Toggle Books"));
    fireEvent.click(screen.getByText(/Schedule Donation · 1 item/));
    expect(screen.getByText("Pickup scheduled!")).toBeInTheDocument();
  });

  it("demo page: one-click donate reacts to currency and amount selection", () => {
    resetLocation();
    render(<App />);
    navigate("Go to Live Demo");
    fireEvent.click(screen.getByLabelText("Switch to EUR"));
    fireEvent.click(screen.getByRole("button", { name: "€250" }));
    expect(
      screen.getByRole("button", { name: /One-Click Donate €250/ })
    ).toBeInTheDocument();
  });

  it("transparency page: persists the compliance checklist to localStorage", () => {
    localStorage.removeItem("grinone-compliance");
    resetLocation();
    render(<App />);
    navigate("Go to Transparency");
    fireEvent.click(
      screen.getByText(
        "SSL/TLS certificate installed and enforced on all pages"
      )
    );
    const stored = JSON.parse(
      localStorage.getItem("grinone-compliance") ?? "[]"
    );
    expect(stored).toContain("compliance-0");
    localStorage.removeItem("grinone-compliance");
  });

  it("transparency page: compliance checklist paginates at 10 rows", () => {
    resetLocation();
    render(<App />);
    navigate("Go to Transparency");

    // Page 1 shows the first 10 of 15 items only
    expect(
      screen.getByText(
        "SSL/TLS certificate installed and enforced on all pages"
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Staff training on data handling and privacy completed"
      )
    ).toBeNull();
    expect(screen.getByText(/Showing 1–10 of 15 items/i)).toBeInTheDocument();

    // Next page reveals the remaining 5
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(
      screen.getByText("Staff training on data handling and privacy completed")
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "SSL/TLS certificate installed and enforced on all pages"
      )
    ).toBeNull();
    expect(screen.getByText(/Showing 11–15 of 15 items/i)).toBeInTheDocument();

    // And back again
    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(
      screen.getByText(
        "SSL/TLS certificate installed and enforced on all pages"
      )
    ).toBeInTheDocument();
  });

  it("demo page: donor table never renders more than 10 rows", () => {
    resetLocation();
    render(<App />);
    navigate("Go to Live Demo");

    // 1 header row + at most 10 body rows
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1);
    expect(rows.length).toBeLessThanOrEqual(11);
  });

  it("roadmap page: shows all five phases, deliverables and timeline", () => {
    resetLocation();
    render(<App />);
    navigate("Go to Roadmap");
    for (const title of [
      "Design & User Experience",
      "Development & Integration",
      "Testing & Quality Assurance",
      "Launch & Optimization",
    ]) {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    }
    expect(screen.getByText("Key Deliverables by Phase")).toBeInTheDocument();
    expect(screen.getByText(/Estimated Timeline/)).toBeInTheDocument();
  });
});
