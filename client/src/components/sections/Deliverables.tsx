import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CommandModule } from "@/components/shared/CommandModule";
import { FileText } from "lucide-react";

export function Deliverables() {
  const deliverables = [
    {
      phase: "Phase 01",
      deliverable:
        "Project charter, compliance audit, technology selection document",
      role: "Project Manager / Legal",
      color: "#2d6a4f",
    },
    {
      phase: "Phase 02",
      deliverable: "Wireframes, design mockups, mobile prototypes, style guide",
      role: "UX / UI Designer",
      color: "#0077b6",
    },
    {
      phase: "Phase 03",
      deliverable:
        "Frontend code, payment integration, CRM integration, API docs",
      role: "Developer / Integration Specialist",
      color: "#e63946",
    },
    {
      phase: "Phase 04",
      deliverable:
        "Security audit report, UAT sign-off, performance test results",
      role: "QA Engineer / Security Auditor",
      color: "#f77f00",
    },
    {
      phase: "Phase 05",
      deliverable:
        "Launch plan, marketing materials, analytics dashboard, reports",
      role: "Marketing Manager / Data Analyst",
      color: "#6a4c93",
    },
  ];

  return (
    <>
      {" "}
      {/* Deliverables */}
      <section className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} className="text-[#6a4c93]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: DELIVERABLES
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Key Deliverables by Phase
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: OUTPUT SPECIFICATIONS AND RESPONSIBLE PARTIES PER PHASE
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
                        Phase
                      </th>
                      <th
                        scope="col"
                        className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                      >
                        Key Deliverable
                      </th>
                      <th
                        scope="col"
                        className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                      >
                        Responsible Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliverables.map((d, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-2.5">
                          <span
                            className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: `${d.color}15`,
                              color: d.color,
                            }}
                          >
                            {d.phase}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-gray-300">
                          {d.deliverable}
                        </td>
                        <td className="px-4 py-2.5 text-gray-500">{d.role}</td>
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
