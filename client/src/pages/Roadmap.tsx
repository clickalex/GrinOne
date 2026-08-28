import { Target } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PhaseSections } from "@/components/sections/PhaseSections";
import { Deliverables } from "@/components/sections/Deliverables";
import { Timeline } from "@/components/sections/Timeline";

export default function Roadmap() {
  return (
    <div>
      <PageHeader
        icon={Target}
        kicker="Roadmap"
        title="From First Sketch to Launch Day"
        description="Five phases, fifteen steps. Work top to bottom — each phase builds on the last, ending with a platform ready to accept its first donation."
        accent="#2d6a4f"
      />
      <PhaseSections />
      <Deliverables />
      <Timeline />
    </div>
  );
}
