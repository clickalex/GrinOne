import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CheckSquare } from "lucide-react";

export function FeaturesChecklist() {
  return (
    <>
      {/* Essential Features Checklist */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <CheckSquare size={16} className="text-[#6a4c93]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: FEATURE GAPS — MISSING ESSENTIALS
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Essential Donation Platform Features
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: COMPLETE CHECKLIST — FEATURES EVERY DONATION PLATFORM
              MUST INCLUDE
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Trust & Compliance",
                  items: [
                    "EIN number displayed",
                    "Tax-deductible statement",
                    "SSL certificate badge",
                    "Privacy policy link",
                    "Form 990 public access",
                    "PCI DSS badge",
                    "GDPR cookie consent",
                  ],
                },
                {
                  title: "Donor Experience",
                  items: [
                    "One-click donate (saved cards)",
                    "Apple Pay / Google Pay",
                    "Text-to-give (SMS)",
                    "Progress thermometer",
                    "Countdown timer for campaigns",
                    "Multi-currency support",
                    "Guest checkout (no account needed)",
                  ],
                },
                {
                  title: "Social & Sharing",
                  items: [
                    "Social share after donation",
                    "Referral tracking links",
                    "Peer-to-peer campaign pages",
                    "Donor wall of honor",
                    "Honorary/tribute giving",
                    "Corporate matching lookup",
                    "LinkedIn donate button",
                  ],
                },
                {
                  title: "Engagement & Retention",
                  items: [
                    "Recurring donation management",
                    "Donor portal (view history)",
                    "Impact report delivery",
                    "Welcome email series",
                    "Lapsed donor re-engagement",
                    "Birthday/anniversary asks",
                    "Upgrade prompts for monthly donors",
                  ],
                },
                {
                  title: "Security & Fraud",
                  items: [
                    "AVS (address verification)",
                    "3D Secure authentication",
                    "Velocity checks",
                    "Risk scoring engine",
                    "Chargeback management",
                    "Duplicate donation detection",
                    "Fraud alert notifications",
                  ],
                },
                {
                  title: "Admin & Operations",
                  items: [
                    "Bulk receipt generation",
                    "Donor data export (CSV/Excel)",
                    "Custom report builder",
                    "Board-level dashboards",
                    "Event ticketing integration",
                    "Volunteer sign-up link",
                    "Legacy/planned giving portal",
                  ],
                },
              ].map((category, i) => (
                <div
                  key={i}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4"
                >
                  <h4 className="text-xs font-semibold text-white mb-3 font-heading">
                    {category.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckSquare
                          size={11}
                          className="text-[#2d6a4f] mt-0.5 shrink-0"
                        />
                        <span className="text-[10px] text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
