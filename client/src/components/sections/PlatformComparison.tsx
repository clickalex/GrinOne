import { Globe } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CommandModule } from "@/components/shared/CommandModule";

export function PlatformComparison() {
  return (
    <>
      {/* Platform Comparison */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Globe size={16} className="text-[#0077b6]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: PLATFORM ANALYSIS
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Platform & Technology Comparison
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: EVALUATE APPROACH — HOSTED VS API VS PLUGIN VS CUSTOM
            </p>
            <CommandModule>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th
                        scope="col"
                        className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                      >
                        Examples
                      </th>
                      <th
                        scope="col"
                        className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                      >
                        Advantages
                      </th>
                      <th
                        scope="col"
                        className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                      >
                        Limitations
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        type: "Hosted Platforms",
                        examples: "CauseVox, Kindful, Donorbox",
                        pros: "Quick setup, built-in compliance, CRM integration",
                        cons: "Less customization, monthly fees",
                      },
                      {
                        type: "Payment Gateway (API)",
                        examples: "Stripe, PayPal, Razorpay",
                        pros: "Full control, lower fees at scale",
                        cons: "Requires dev resources, PCI responsibility",
                      },
                      {
                        type: "WordPress + Plugin",
                        examples: "GiveWP, Charitable",
                        pros: "Flexible, large plugin ecosystem",
                        cons: "Maintenance burden, plugin compatibility",
                      },
                      {
                        type: "Custom-Built",
                        examples: "React/Node.js, Laravel, Django",
                        pros: "Complete control, unique features",
                        cons: "Highest cost, longest timeline, full PCI",
                      },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-2.5 font-medium text-gray-200">
                          {row.type}
                        </td>
                        <td className="px-4 py-2.5 text-gray-500 font-mono text-[10px]">
                          {row.examples}
                        </td>
                        <td className="px-4 py-2.5 text-green-400/80">
                          {row.pros}
                        </td>
                        <td className="px-4 py-2.5 text-red-400/70">
                          {row.cons}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CommandModule>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
