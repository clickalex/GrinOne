import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { DONATION_FLOW_STEPS } from "@/data/donations";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  Database,
  Shield,
  Rocket,
} from "lucide-react";

export function DonationFlow() {
  return (
    <>
      {/* ===== NEW: DONATION FLOW ===== */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-[#e63946]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: DONATION FLOW
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              How a Donation Reaches Its Destination
            </h2>
            <p className="text-xs text-gray-500 mb-8">
              SYS.REF: END-TO-END JOURNEY FROM DONOR CLICK TO FUNDS DEPLOYED — 7
              CRITICAL STEPS
            </p>

            {/* Flow Diagram — Desktop: horizontal, Mobile: vertical */}
            <div className="hidden md:block overflow-x-auto pb-2">
              <div className="flex items-start gap-0 min-w-max mx-auto w-fit">
                {DONATION_FLOW_STEPS.map((item, i) => {
                  const StepIcon = item.icon;
                  return (
                    <div key={item.step} className="flex items-start">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="flex flex-col items-center text-center w-[130px]"
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                          style={{
                            backgroundColor: `rgba(230,57,70,0.12)`,
                            border: `1px solid rgba(230,57,70,0.25)`,
                          }}
                        >
                          <StepIcon size={18} className="text-[#e63946]" />
                        </div>
                        <span className="font-mono text-[9px] text-gray-500 mb-1">
                          STEP {item.step}
                        </span>
                        <span className="font-heading text-[11px] font-semibold text-white mb-1">
                          {item.title}
                        </span>
                        <span className="text-[9px] text-gray-500 leading-tight">
                          {item.description}
                        </span>
                      </motion.div>
                      {i < DONATION_FLOW_STEPS.length - 1 && (
                        <div className="flex items-center pt-4 shrink-0">
                          <ArrowRight size={14} className="text-gray-700" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: vertical flow */}
            <div className="md:hidden space-y-0">
              {DONATION_FLOW_STEPS.map((item, i) => {
                const StepIcon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="relative pl-6"
                    style={{
                      borderLeft:
                        i < DONATION_FLOW_STEPS.length - 1
                          ? `2px solid rgba(230,57,70,0.25)`
                          : `2px solid transparent`,
                    }}
                  >
                    <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[#e63946]" />
                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-md p-3 mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <StepIcon size={14} className="text-[#e63946]" />
                        <span className="font-mono text-[9px] text-gray-500">
                          STEP {item.step}
                        </span>
                      </div>
                      <span className="font-heading text-xs font-semibold text-white">
                        {item.title}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
