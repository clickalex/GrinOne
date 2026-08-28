import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Eye,
  Heart,
  Target,
  Zap,
} from "lucide-react";
import { Link } from "wouter";
import { PHASES } from "@/lib/phases";
import { useDonation } from "@/contexts/DonationContext";

/* Mission modules — one page per area, linked from the hub below */
const MODULES = [
  {
    path: "/roadmap",
    icon: Target,
    kicker: "MODULE 01",
    title: "Project Roadmap",
    description:
      "Five phases from planning to launch — 15 steps, deliverables, and the full 8-16 week timeline.",
    color: "#2d6a4f",
    meta: "PHASES: 05 · STEPS: 15",
  },
  {
    path: "/donations",
    icon: Heart,
    kicker: "MODULE 02",
    title: "Donation Options",
    description:
      "How a donation travels from click to deployment, all 9 donation types, and physical in-kind giving.",
    color: "#e63946",
    meta: "TYPES: 09 · FLOW: 7 STEPS",
  },
  {
    path: "/transparency",
    icon: Eye,
    kicker: "MODULE 03",
    title: "Transparency",
    description:
      "Where every dollar goes — fund allocation, monthly cost breakdown, and the pre-launch compliance checklist.",
    color: "#f77f00",
    meta: "PROGRAM SPEND: 85%",
  },
  {
    path: "/guide",
    icon: BookOpen,
    kicker: "MODULE 04",
    title: "Builder's Guide",
    description:
      "Essential features, platform comparison, technology stack guidance, and troubleshooting common issues.",
    color: "#6a4c93",
    meta: "CHECKLIST · COMPARISON · FIXES",
  },
  {
    path: "/demo",
    icon: Zap,
    kicker: "MODULE 05",
    title: "Live Demo Zone",
    description:
      "One-click donate, impact calculator, physical donation scheduler, donor wall, and live activity bots.",
    color: "#e63946",
    meta: "INTERACTIVE · CLIENT-SIDE",
    badge: "DEMO",
  },
];

export default function Home() {
  const { openDonation } = useDonation();

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0">
          <img
            src="/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] via-[#0a0a14]/70 to-[#0a0a14]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-16 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2d6a4f]/20 to-transparent" />
          <div className="absolute top-32 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0077b6]/15 to-transparent" />
          <div className="absolute bottom-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e63946]/20 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-white/[0.06] bg-white/[0.03]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                  PHASES: 05
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-white/[0.06] bg-white/[0.03]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e63946]" />
                <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                  STEPS: 15
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-white/[0.06] bg-white/[0.03]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f77f00]" />
                <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                  TIMELINE: 8-16 WEEKS
                </span>
              </div>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5 leading-[1.15]">
              <span className="block text-[#e63946] mb-3">GrinOne</span>
              <span className="block text-white">Donation Platform</span>
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8">
              A comprehensive, phase-by-phase guide covering every step required
              to plan, design, develop, test, launch, and optimize a donation
              website — powered by GrinOne.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <button
                onClick={openDonation}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#e63946] to-[#f77f00] text-white font-heading text-sm font-bold shadow-lg shadow-[#e63946]/20 hover:shadow-[#e63946]/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
              >
                <Heart size={15} />
                Donate Now
              </button>
              <Link
                href="/demo"
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.1] bg-white/[0.03] text-gray-300 font-heading text-sm font-semibold hover:bg-white/[0.06] hover:text-white transition-all duration-200 active:scale-[0.97]"
              >
                <Zap size={15} className="text-[#f77f00]" />
                Try the Live Demo
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {PHASES.map(phase => (
                <Link
                  key={phase.id}
                  href="/roadmap"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-md border transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                  style={{
                    borderColor: `${phase.color}30`,
                    backgroundColor: `${phase.color}08`,
                  }}
                >
                  <span
                    className="font-mono text-[11px] font-bold"
                    style={{ color: phase.color }}
                  >
                    {phase.number}
                  </span>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {phase.title}
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-gray-600 group-hover:text-gray-400 transition-colors"
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== NAVIGATION HUB ===== */}
      <section className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 mb-1">
            <ArrowRight size={16} className="text-[#0077b6]" />
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              MISSION MODULES — NAVIGATE THE PLATFORM
            </span>
          </div>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">
            Explore GrinOne, One Page at a Time
          </h2>
          <p className="text-xs text-gray-500 mb-8">
            SYS.REF: NAVIGATION — EVERY MODULE IS ONE CLICK AWAY — USE THE
            COMMAND BAR ABOVE TO JUMP BETWEEN PAGES
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map(mod => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.path}
                  href={mod.path}
                  className="group relative rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 overflow-hidden transition-all duration-200 hover:bg-white/[0.04] hover:scale-[1.02] active:scale-[0.98] flex flex-col"
                  style={{ borderTop: `2px solid ${mod.color}` }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(to right, transparent, ${mod.color}, transparent)`,
                    }}
                  />
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: `${mod.color}18`,
                        border: `1px solid ${mod.color}35`,
                      }}
                    >
                      <Icon size={16} style={{ color: mod.color }} />
                    </div>
                    <span className="font-mono text-[9px] text-gray-600 tracking-[0.2em]">
                      {mod.kicker}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-heading text-sm font-bold text-white">
                      {mod.title}
                    </h3>
                    {mod.badge && (
                      <span
                        className="px-1.5 py-0.5 rounded border font-mono text-[7px]"
                        style={{
                          borderColor: `${mod.color}30`,
                          backgroundColor: `${mod.color}10`,
                          color: mod.color,
                        }}
                      >
                        {mod.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">
                    {mod.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] text-gray-600 tracking-wider">
                      {mod.meta}
                    </span>
                    <span
                      className="flex items-center gap-1 font-mono text-[10px] font-bold tracking-wider uppercase"
                      style={{ color: mod.color }}
                    >
                      Enter
                      <ChevronRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Donate card */}
            <button
              onClick={openDonation}
              className="group relative rounded-lg border border-[#e63946]/20 bg-gradient-to-br from-[#e63946]/10 to-[#f77f00]/5 p-5 overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left flex flex-col"
              style={{ borderTop: "2px solid #e63946" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(230,57,70,0.18)",
                    border: "1px solid rgba(230,57,70,0.35)",
                  }}
                >
                  <Heart size={16} className="text-[#e63946]" />
                </div>
                <span className="font-mono text-[9px] text-gray-600 tracking-[0.2em]">
                  MODULE 06
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-heading text-sm font-bold text-white">
                  Donate Now
                </h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">
                Open the donation form — choose an amount, campaign, frequency,
                and payment method. Fully simulated, no real payments.
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] text-gray-600 tracking-wider">
                  ONE-TIME · RECURRING · CRYPTO
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] font-bold tracking-wider uppercase text-[#e63946]">
                  Give
                  <ChevronRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
