import { Database } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CommandModule } from "@/components/shared/CommandModule";

export function TechStack() {
  const techStack = [
    {
      component: "Frontend Framework",
      options: "React, Vue.js, WordPress",
      criteria: "Team expertise, SEO needs, customization level",
    },
    {
      component: "Backend Platform",
      options: "Node.js, Laravel, Django",
      criteria: "Scalability needs, existing infrastructure",
    },
    {
      component: "Payment Gateway",
      options: "Stripe, PayPal, Razorpay",
      criteria: "Transaction fees, supported currencies, PCI handling",
    },
    {
      component: "Database",
      options: "PostgreSQL, MySQL",
      criteria: "Data volume, query complexity, hosting environment",
    },
    {
      component: "Hosting",
      options: "AWS, DigitalOcean, Vercel",
      criteria: "Traffic volume, budget, geographic requirements",
    },
    {
      component: "Email Service",
      options: "SendGrid, Mailgun, AWS SES",
      criteria: "Deliverability, automation capabilities, cost",
    },
    {
      component: "Analytics",
      options: "Google Analytics, Plausible",
      criteria: "Privacy requirements, customization needs",
    },
    {
      component: "CRM Integration",
      options: "Salesforce NPSP, HubSpot",
      criteria: "Existing systems, budget, feature requirements",
    },
  ];

  return (
    <>
      {" "}
      {/* Technology Stack */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Database size={16} className="text-[#2d6a4f]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: INFRASTRUCTURE
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Recommended Technology Stack
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: SELECT COMPONENTS FOR EACH LAYER OF THE DONATION PLATFORM
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {techStack.map((item, i) => (
                <CommandModule key={i} className="p-4">
                  <div className="font-heading text-xs font-semibold text-white mb-1">
                    {item.component}
                  </div>
                  <div className="font-mono text-[10px] text-[#0077b6] mb-1.5">
                    {item.options}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    Decision criteria: {item.criteria}
                  </div>
                </CommandModule>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
