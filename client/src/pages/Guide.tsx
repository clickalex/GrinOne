import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FeaturesChecklist } from "@/components/sections/FeaturesChecklist";
import { PlatformComparison } from "@/components/sections/PlatformComparison";
import { TechStack } from "@/components/sections/TechStack";
import { CommonIssues } from "@/components/sections/CommonIssues";

export default function Guide() {
  return (
    <div>
      <PageHeader
        icon={BookOpen}
        kicker="Guide"
        title="The Builder's Reference"
        description="Essential features every donation platform needs, how leading providers compare, technology choices, and fixes for the most common launch issues."
        accent="#6a4c93"
      />
      <FeaturesChecklist />
      <PlatformComparison />
      <TechStack />
      <CommonIssues />
    </div>
  );
}
