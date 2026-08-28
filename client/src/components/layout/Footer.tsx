import { Link } from "wouter";
import { Activity } from "lucide-react";
import GrinOneLogo from "@/components/GrinOneLogo";

const FOOTER_LINKS = [
  { path: "/", label: "Overview" },
  { path: "/roadmap", label: "Roadmap" },
  { path: "/donations", label: "Donations" },
  { path: "/transparency", label: "Transparency" },
  { path: "/guide", label: "Guide" },
  { path: "/demo", label: "Live Demo" },
];

export function Footer() {
  return (
    <footer className="py-8 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href="/"
            aria-label="GrinOne home"
            className="flex items-center gap-2"
          >
            <GrinOneLogo size={20} />
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-bold text-xs text-gray-400">
                Grin
              </span>
              <span className="font-heading font-bold text-xs text-[#e63946]">
                One
              </span>
            </div>
          </Link>
          <nav
            aria-label="Footer"
            className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2"
          >
            {FOOTER_LINKS.map(link => (
              <Link
                key={link.path}
                href={link.path}
                className="font-mono text-[10px] text-gray-500 tracking-wider uppercase hover:text-[#e63946] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 tracking-wider">
            <Activity size={12} />
            <span>BUILD — TEST — LAUNCH — OPTIMIZE — SCALE</span>
          </div>
          <div className="text-[10px] text-gray-600">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-400 font-semibold">GrinOne</span>{" "}
            &middot; Built for transparent, impactful giving
          </div>
        </div>
      </div>
    </footer>
  );
}
