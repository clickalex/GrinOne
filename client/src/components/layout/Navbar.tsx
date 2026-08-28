import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Activity,
  BookOpen,
  Eye,
  Heart,
  Menu,
  Target,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import GrinOneLogo from "@/components/GrinOneLogo";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { useDonation } from "@/contexts/DonationContext";

type NavItem = {
  path: string;
  label: string;
  icon: LucideIcon;
  color: string;
};

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Overview", icon: Activity, color: "#0077b6" },
  { path: "/roadmap", label: "Roadmap", icon: Target, color: "#2d6a4f" },
  { path: "/donations", label: "Donations", icon: Heart, color: "#e63946" },
  { path: "/transparency", label: "Transparency", icon: Eye, color: "#f77f00" },
  { path: "/guide", label: "Guide", icon: BookOpen, color: "#6a4c93" },
  { path: "/demo", label: "Live Demo", icon: Zap, color: "#e63946" },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openDonation } = useDonation();

  const isActive = (path: string) =>
    path === "/" ? location === "/" : location.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a14]/95 backdrop-blur-xl border-b border-white/[0.04]">
      <ScrollProgressBar />
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="GrinOne home"
          className="flex items-center gap-2.5 shrink-0"
        >
          <GrinOneLogo size={28} />
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading font-bold text-sm text-white tracking-wide">
              Grin
            </span>
            <span className="font-heading font-bold text-sm text-[#e63946] tracking-wide">
              One
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-label={`Go to ${item.label}`}
                aria-current={active ? "page" : undefined}
                className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all duration-200"
                style={{
                  backgroundColor: active ? `${item.color}14` : "transparent",
                }}
              >
                <Icon
                  size={11}
                  style={{ color: active ? item.color : "#666" }}
                />
                <span
                  className="font-mono text-[10px] font-semibold tracking-wider uppercase"
                  style={{ color: active ? item.color : "#888" }}
                >
                  {item.label}
                </span>
                {active && (
                  <span
                    className="absolute -bottom-[9px] left-2 right-2 h-[2px] rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </Link>
            );
          })}
          {/* Donate CTA — always visible */}
          <button
            onClick={openDonation}
            aria-label="Open donation form"
            className="ml-1.5 flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-[#e63946] to-[#f77f00] text-white font-mono text-[10px] font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
          >
            <Heart size={11} />
            DONATE
          </button>
        </div>

        {/* Mobile: donate + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={openDonation}
            aria-label="Open donation form"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-[#e63946] to-[#f77f00] text-white font-mono text-[10px] font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
          >
            <Heart size={11} />
            DONATE
          </button>
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.04] bg-[#0a0a14]/98 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1.5">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded border transition-all duration-200"
                  style={{
                    backgroundColor: active ? `${item.color}14` : "transparent",
                    borderColor: active
                      ? `${item.color}40`
                      : "rgba(255,255,255,0.06)",
                  }}
                >
                  <Icon
                    size={13}
                    style={{ color: active ? item.color : "#666" }}
                  />
                  <span
                    className="font-mono text-[11px] font-semibold tracking-wider uppercase"
                    style={{ color: active ? item.color : "#999" }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
