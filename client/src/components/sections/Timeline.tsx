import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CommandModule } from "@/components/shared/CommandModule";
import { Timer } from "lucide-react";

export function Timeline() {
  return (
    <>
      {/* Timeline */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Timer size={16} className="text-[#e63946]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: MISSION TIMELINE
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Estimated Timeline
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: TOTAL MISSION DURATION — 8 TO 16 WEEKS DEPENDENT ON
              COMPLEXITY
            </p>
            <CommandModule className="p-4">
              <div className="space-y-4">
                {[
                  {
                    phase: "Phase 01: Planning & Strategy",
                    duration: "2-3 weeks",
                    pct: 20,
                    color: "#2d6a4f",
                  },
                  {
                    phase: "Phase 02: Design & UX",
                    duration: "2-3 weeks",
                    pct: 20,
                    color: "#0077b6",
                  },
                  {
                    phase: "Phase 03: Development & Integration",
                    duration: "3-4 weeks",
                    pct: 30,
                    color: "#e63946",
                  },
                  {
                    phase: "Phase 04: Testing & QA",
                    duration: "2-3 weeks",
                    pct: 20,
                    color: "#f77f00",
                  },
                  {
                    phase: "Phase 05: Launch & Optimization",
                    duration: "1-3 weeks (ongoing)",
                    pct: 15,
                    color: "#6a4c93",
                  },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-300">
                        {item.phase}
                      </span>
                      <span className="font-mono text-[10px] text-gray-500">
                        {item.duration}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.12 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-600">
                  MISSION_STATUS: FULL_ROADMAP
                </span>
                <span className="font-mono text-[10px] text-gray-600">
                  COMPLEXITY: MEDIUM_TO_HIGH
                </span>
              </div>
            </CommandModule>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
