import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/** Resets scroll position whenever the route changes. */
function ScrollReset() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

/** Floating scroll-to-top button, appears after scrolling down. */
function ScrollTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showScrollTop) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-9 h-9 rounded-full bg-[#e63946]/90 hover:bg-[#e63946] text-white flex items-center justify-center shadow-lg shadow-black/40 transition-all duration-200 hover:scale-105 active:scale-95 border border-[#e63946]/50"
    >
      <ChevronRight size={16} className="rotate-[-90deg]" />
    </button>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-[#e0e0e0] flex flex-col">
      <Navbar />
      <ScrollReset />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}
