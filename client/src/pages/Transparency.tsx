import { Eye } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AllocationDashboard } from "@/components/sections/AllocationDashboard";
import { CostBreakdown } from "@/components/sections/CostBreakdown";
import { ComplianceChecklist } from "@/components/sections/ComplianceChecklist";

export default function Transparency() {
  return (
    <div>
      <PageHeader
        icon={Eye}
        kicker="Transparency"
        title="Where Every Dollar Goes"
        description="Full visibility into fund allocation, the monthly cost of running the platform, and the compliance checklist we verify before every launch."
        accent="#f77f00"
      />
      <AllocationDashboard />
      <CostBreakdown />
      <ComplianceChecklist />
    </div>
  );
}
