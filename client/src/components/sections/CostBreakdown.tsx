import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CommandModule } from "@/components/shared/CommandModule";
import { MONTHLY_COST_BREAKDOWN } from "@/data/donations";
import { Eye, DollarSign } from "lucide-react";

export function CostBreakdown() {
  return (
    <>
      {/* ===== NEW: TRANSPARENCY / COST BREAKDOWN ===== */}
      <section className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} className="text-[#f77f00]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: TRANSPARENCY
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Website Maintenance & Cost Breakdown
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: FULL DISCLOSURE OF OPERATIONAL COSTS — EVERY PENNY
              ACCOUNTED FOR
            </p>

            {/* Visual cost split */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#2d6a4f]" />
                  <span className="text-xs text-gray-400">93% to Programs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#6a4c93]" />
                  <span className="text-xs text-gray-400">
                    7% for Operations
                  </span>
                </div>
              </div>
              <div className="w-full h-4 bg-white/[0.04] rounded-full overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "93%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-l-full bg-[#2d6a4f]"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "7%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-r-full bg-[#6a4c93]"
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="font-mono text-[9px] text-[#2d6a4f]">
                  $99,900 / YEAR TO PROGRAMS
                </span>
                <span className="font-mono text-[9px] text-[#6a4c93]">
                  $7,560 / YEAR TO OPERATIONS
                </span>
              </div>
            </div>

            {/* Monthly cost table */}
            <CommandModule>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th
                        scope="col"
                        className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                      >
                        Expense
                      </th>
                      <th
                        scope="col"
                        className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                      >
                        Monthly Cost
                      </th>
                      <th
                        scope="col"
                        className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHLY_COST_BREAKDOWN.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i === MONTHLY_COST_BREAKDOWN.length - 1 ? "bg-white/[0.03] font-semibold" : ""}`}
                      >
                        <td className="px-4 py-2.5 text-gray-300">
                          {row.item}
                        </td>
                        <td
                          className="px-4 py-2.5 font-mono"
                          style={{
                            color:
                              i === MONTHLY_COST_BREAKDOWN.length - 1
                                ? "#f77f00"
                                : "#e0e0e0",
                          }}
                        >
                          {row.cost}
                        </td>
                        <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell">
                          {row.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CommandModule>

            {/* Transparency note */}
            <div className="mt-4 rounded-lg border border-[#2d6a4f]/20 bg-[#2d6a4f]/5 p-4">
              <div className="flex items-start gap-3">
                <Eye size={16} className="text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-xs font-semibold text-white mb-1">
                    Our Transparency Commitment
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    We believe in complete transparency. 93% of every dollar
                    donated goes directly to programs and causes. Only 7% covers
                    essential operations including hosting, security, payment
                    processing, and a small team that manages the platform. We
                    publish quarterly financial reports and annual audited
                    statements. Every donor receives a quarterly impact report
                    showing exactly where their contribution went.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
