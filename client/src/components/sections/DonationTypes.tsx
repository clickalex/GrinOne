import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { DONATION_TYPES } from "@/data/donations";

export function DonationTypes() {
  return (
    <>
      {/* ===== NEW: DONATION TYPES ===== */}
      <section className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Heart size={16} className="text-[#e63946]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: DONATION TYPES
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              All Donation Types Accepted
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: SUPPORT EVERY GIVING METHOD TO MAXIMIZE DONOR
              PARTICIPATION
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {DONATION_TYPES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
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
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
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
