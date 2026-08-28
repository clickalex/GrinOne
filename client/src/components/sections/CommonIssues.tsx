import {
  Clock,
  Database as DatabaseIcon,
  Globe as GlobeOffIcon,
  MailX,
  Shield,
  ShieldAlert,
  Smartphone,
  UserX,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { AlertTriangle } from "lucide-react";

export function CommonIssues() {
  return (
    <>
      {/* Common Issues & Solutions */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={16} className="text-[#f77f00]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: TROUBLESHOOTING
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Common Issues & Solutions
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: KNOWN PROBLEMS — DIAGNOSE & RESOLVE
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: AlertTriangle,
                  color: "#e63946",
                  issue: "Payment Gateway Integration Fails",
                  solution:
                    "Verify API keys are correctly configured. Test in sandbox mode before going live. Ensure webhook URLs are publicly accessible and return 200 status. Check that PCI DSS compliance requirements are met.",
                  detail:
                    "Common cause: Missing or incorrect secret keys, unverified webhook endpoints",
                },
                {
                  icon: ShieldAlert,
                  color: "#e63946",
                  issue: "PCI DSS Compliance Errors",
                  solution:
                    "Use Stripe/PayPal hosted checkout or embedded forms (SAQ A). Never store raw card numbers. Enable TLS 1.2+ on all endpoints. Conduct quarterly vulnerability scans.",
                  detail:
                    "Most common: Storing card data on own servers instead of using tokenization",
                },
                {
                  icon: GlobeOffIcon,
                  color: "#e63946",
                  issue: "Charitable Registration Missing",
                  solution:
                    "Register in all states where you solicit donations (40+ US states). Use services like Harbor Compliance. Renew registrations annually. Display registration numbers on the donation page.",
                  detail:
                    "Common cause: Assuming federal 501(c)(3) status covers all state requirements",
                },
                {
                  icon: MailX,
                  color: "#e63946",
                  issue: "Tax Receipts Not Generated",
                  solution:
                    "Configure automated receipt generation via your payment processor (Stripe/PayPal). Include: donor name, date, amount, organization EIN, statement that no goods/services were provided in exchange.",
                  detail: "Required for donations of $250+ per IRS guidelines",
                },
                {
                  icon: Clock,
                  color: "#f77f00",
                  issue: "Slow Page Load on Donation Page",
                  solution:
                    "Lazy-load images below the fold. Use CDN for static assets. Minimize JavaScript bundles. Pre-connect to payment gateway domains. Aim for under 3-second load time.",
                  detail:
                    "Impact: Every 1-second delay reduces conversion by 7%",
                },
                {
                  icon: Smartphone,
                  color: "#f77f00",
                  issue: "Mobile Form Errors",
                  solution:
                    "Use responsive input fields with proper input types (email, tel, number). Avoid horizontal scrolling. Test on real devices (iOS Safari, Android Chrome). Keep form under 4 visible fields on mobile.",
                  detail:
                    "Common cause: Fixed-width containers, missing viewport meta tag",
                },
                {
                  icon: UserX,
                  color: "#0077b6",
                  issue: "Low Donation Conversion Rate",
                  solution:
                    "Reduce form fields to minimum (name, email, amount, payment). Add suggested amount buttons. Show trust badges (SSL, PCI, nonprofit registration). Add social proof (recent donors, impact stats). A/B test CTA button text.",
                  detail:
                    "Benchmark: 1-3% of visitors donate; top performers achieve 5%+",
                },
                {
                  icon: DatabaseIcon,
                  color: "#0077b6",
                  issue: "Donor Data Not Syncing to CRM",
                  solution:
                    "Use Zapier or native integrations (Salesforce Nonprofit, HubSpot, DonorPerfect). Map fields consistently. Set up retry logic for failed syncs. Validate data before insertion.",
                  detail:
                    "Common cause: Missing field mapping, API rate limits, duplicate records",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <Icon size={14} style={{ color: item.color }} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white mb-1">
                          {item.issue}
                        </h4>
                        <p className="text-[10px] text-gray-400 mb-1.5 leading-relaxed">
                          {item.solution}
                        </p>
                        <p className="font-mono text-[8px] text-gray-600">
                          ⚠ {item.detail}
                        </p>
                      </div>
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
