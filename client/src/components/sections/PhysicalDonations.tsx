import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  PHYSICAL_DONATION_CATEGORIES,
  PHYSICAL_DONATION_STEPS,
} from "@/data/donations";
import { Package, Truck } from "lucide-react";

export function PhysicalDonations() {
  return (
    <>
      {/* ===== PHYSICAL / IN-KIND DONATIONS ===== */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Package size={16} className="text-[#f77f00]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: PHYSICAL DONATIONS
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Donate Physical Items & Goods
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: NOT JUST MONEY — CLOTHES, TOYS, BOOKS, ELECTRONICS & MORE
            </p>

            {/* Physical donation process flow */}
            <div className="mb-8">
              <h3 className="font-heading text-sm font-semibold text-white mb-4">
                How It Works
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {PHYSICAL_DONATION_STEPS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[9px] font-bold text-[#f77f00] bg-[#f77f00]/10 px-1.5 py-0.5 rounded">
                          STEP {item.step}
                        </span>
                      </div>
                      <h4 className="font-heading text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                        <Icon size={14} className="text-[#f77f00]" />
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Physical donation category cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {PHYSICAL_DONATION_CATEGORIES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
                  >
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
                      style={{
                        backgroundColor: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Icon size={16} style={{ color: item.color }} />
                    </div>
                    <h3 className="font-heading text-xs font-semibold text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                      {item.description}
                    </p>
                    <div className="border-t border-white/[0.05] pt-2 mt-2">
                      <p className="font-mono text-[8px] text-gray-600 uppercase tracking-wider mb-1">
                        We Accept:
                      </p>
                      <p className="text-[9px] text-gray-400 leading-relaxed">
                        {item.accepted}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
