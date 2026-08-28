import { useCallback, useEffect, useState } from "react";
import { CheckSquare, Lock, Square } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CommandModule } from "@/components/shared/CommandModule";

const complianceItems = [
  "SSL/TLS certificate installed and enforced on all pages",
  "PCI DSS compliance confirmed (SAQ A completed annually)",
  "Charitable solicitation registrations filed in all required jurisdictions",
  "Privacy policy published with GDPR/CCPA disclosures",
  "Cookie consent mechanism implemented",
  "Data encryption at rest and in transit verified",
  "Automated tax receipts configured (required for $250+)",
  "Recurring donation terms and conditions clearly displayed",
  "Refund and cancellation policy published",
  "Nonprofit registration number and tax-exempt status displayed",
  "3D Secure / Strong Customer Authentication enabled",
  "Fraud detection and velocity limits configured",
  "Database backups scheduled and tested",
  "Incident response plan documented",
  "Staff training on data handling and privacy completed",
];

export function ComplianceChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
    // Persist compliance checklist across visits
    try {
      const stored = localStorage.getItem("grinone-compliance");
      if (stored) return new Set(JSON.parse(stored) as string[]);
    } catch {
      // localStorage unavailable or corrupted — start fresh
    }
    return new Set();
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "grinone-compliance",
        JSON.stringify(Array.from(checkedItems))
      );
    } catch {
      // localStorage unavailable — persistence disabled
    }
  }, [checkedItems]);

  const toggleCheck = useCallback((key: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  return (
    <>
      {/* Compliance Checklist */}
      <section className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Lock size={16} className="text-[#f77f00]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: PRE-LAUNCH CHECKLIST
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Compliance & Security Checklist
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              STATUS: {checkedItems.size}/{complianceItems.length} VERIFIED —
              VERIFY ALL BEFORE DEPLOYMENT
            </p>
            <CommandModule className="p-1">
              <div className="space-y-0.5 p-2">
                {complianceItems.map((item, i) => {
                  const key = `compliance-${i}`;
                  const isChecked = checkedItems.has(key);
                  return (
                    <button
                      key={key}
                      onClick={() => toggleCheck(key)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/[0.03] transition-all text-left w-full group"
                    >
                      {isChecked ? (
                        <CheckSquare
                          size={15}
                          className="text-green-500 shrink-0"
                        />
                      ) : (
                        <Square
                          size={15}
                          className="text-gray-600 shrink-0 group-hover:text-gray-400 transition-colors"
                        />
                      )}
                      <span
                        className={`text-xs transition-colors ${isChecked ? "text-gray-500 line-through" : "text-gray-300"}`}
                      >
                        {item}
                      </span>
                      {isChecked && (
                        <span className="font-mono text-[9px] text-green-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          OK
                        </span>
                      )}
                    </button>
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
