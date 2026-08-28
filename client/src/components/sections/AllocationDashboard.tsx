import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CommandModule } from "@/components/shared/CommandModule";
import { FUND_ALLOCATION } from "@/data/donations";
import { PieChart, DollarSign } from "lucide-react";

export function AllocationDashboard() {
  return (
    <>
      {/* ===== NEW: DONATION DETAILS DASHBOARD ===== */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <PieChart size={16} className="text-[#2d6a4f]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: FUND ALLOCATION
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Where Your Donations Go
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: FULL TRANSPARENCY — TRACKING EVERY DOLLAR FROM DONOR TO
              IMPACT
            </p>

            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
              {[
                {
                  label: "Total Raised",
                  value: "$107,460",
                  sub: "All-time contributions",
                  color: "#2d6a4f",
                },
                {
                  label: "Active Programs",
                  value: "32",
                  sub: "Across 5 categories",
                  color: "#0077b6",
                },
                {
                  label: "Beneficiaries",
                  value: "30,600",
                  sub: "People directly helped",
                  color: "#e63946",
                },
                {
                  label: "Admin Overhead",
                  value: "7%",
                  sub: "Below industry avg of 15%",
                  color: "#6a4c93",
                },
              ].map((stat, i) => (
                <CommandModule key={i} className="p-3 text-center">
                  <div className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div className="font-heading text-lg font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-[9px] text-gray-600 mt-0.5">
                    {stat.sub}
                  </div>
                </CommandModule>
              ))}
            </div>

            {/* Allocation breakdown */}
            <CommandModule className="p-4">
              <div className="space-y-4">
                {FUND_ALLOCATION.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon size={14} style={{ color: item.color }} />
                          <span className="text-xs font-medium text-white">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-gray-500 hidden sm:block">
                            {item.recipients}
                          </span>
                          <span
                            className="font-mono text-xs font-semibold"
                            style={{ color: item.color }}
                          >
                            {item.amount}
                          </span>
                          <span className="font-mono text-[10px] text-gray-500">
                            {item.pct}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                      <p className="text-[9px] text-gray-600 mt-1">
                        {item.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CommandModule>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
