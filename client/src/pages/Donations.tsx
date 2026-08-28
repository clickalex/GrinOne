import { Heart } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { DonationFlow } from "@/components/sections/DonationFlow";
import { DonationTypes } from "@/components/sections/DonationTypes";
import { PhysicalDonations } from "@/components/sections/PhysicalDonations";

export default function Donations() {
  return (
    <div>
      <PageHeader
        icon={Heart}
        kicker="Donations"
        title="Every Way to Give"
        description="Follow a donation from the donor's click to funds deployed in the field, browse all nine donation types, and see how physical in-kind giving works."
        accent="#e63946"
      />
      <DonationFlow />
      <DonationTypes />
      <PhysicalDonations />
    </div>
  );
}
