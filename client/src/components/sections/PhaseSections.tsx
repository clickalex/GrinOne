import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Signal } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PHASES, PHASE_CONTENT } from "@/lib/phases";

export function PhaseSections() {
  const [activePhase, setActivePhase] = useState("planning");
  const phaseRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActivePhase(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    Object.values(phaseRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToPhase = (id: string) => {
    phaseRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* In-page phase quick nav */}
      <div className="sticky top-[46px] md:top-[53px] z-40 bg-[#0a0a14]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-2 flex items-center gap-2 overflow-x-auto">
          <span className="font-mono text-[9px] text-gray-600 tracking-[0.2em] uppercase shrink-0 hidden sm:inline">
            Phases
          </span>
          {PHASES.map(phase => {
            const Icon = phase.icon;
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => scrollToPhase(phase.id)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded transition-all duration-200 group shrink-0"
                aria-label={`Jump to phase ${phase.number}: ${phase.title}`}
                style={{
                  backgroundColor: isActive ? phase.colorLight : "transparent",
                  border: isActive
                    ? `1px solid ${phase.color}50`
                    : "1px solid transparent",
                }}
              >
                <Icon
                  size={11}
                  style={{ color: isActive ? phase.color : "#555" }}
                />
                <span
                  className="font-mono text-[10px] font-semibold"
                  style={{ color: isActive ? phase.color : "#555" }}
                >
                  {phase.number}
                </span>
                <span
                  className="font-mono text-[10px] hidden lg:inline"
                  style={{ color: isActive ? phase.color : "#555" }}
                >
                  {phase.title.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase Sections */}
      {PHASES.map(phase => {
        const content = PHASE_CONTENT[phase.id];
        const PhaseIcon = phase.icon;
        return (
          <section
            key={phase.id}
            id={phase.id}
            ref={el => {
              phaseRefs.current[phase.id] = el;
            }}
            className="relative py-14 md:py-18 scroll-mt-24"
            style={{ borderLeft: `3px solid ${phase.color}` }}
          >
            <div className="max-w-5xl mx-auto px-4 md:px-8">
              <AnimatedSection>
                <div className="mb-8">
                  <div className="flex items-start gap-4 mb-3">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${phase.color}18`,
                        border: `1px solid ${phase.color}35`,
                      }}
                    >
                      <PhaseIcon size={20} style={{ color: phase.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-widest"
                          style={{
                            backgroundColor: `${phase.color}15`,
                            color: phase.color,
                          }}
                        >
                          {phase.label}
                        </span>
                        <span className="font-mono text-[10px] text-gray-600 tracking-wider">
                          PHASE {phase.number}
                        </span>
                      </div>
                      <h2 className="font-heading text-xl md:text-2xl font-bold text-white">
                        {phase.title}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-14 mb-3">
                    <Signal size={12} className="text-gray-600" />
                    <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                      {content.telemetry}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 ml-14">
                    {content.subtitle}
                  </p>
                </div>
                <div className="space-y-4 mb-8">
                  {content.steps.map((step, idx) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                      className="relative pl-5"
                      style={{ borderLeft: `2px solid ${phase.color}30` }}
                    >
                      <div
                        className="absolute -left-[5px] top-2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: phase.color }}
                      />
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-md p-4 hover:bg-white/[0.04] transition-colors duration-200">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: `${phase.color}10`,
                              color: phase.color,
                            }}
                          >
                            {step.number}
                          </span>
                          <h3 className="font-heading text-sm font-semibold text-white">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>
        );
      })}
    </>
  );
}
