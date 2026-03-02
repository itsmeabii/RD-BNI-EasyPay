import { TotalProgressSection } from "./TotalProgressSection";
import { InProgressSection } from "./InProgressSection";
import { Mission } from "./Mission/MissionSection";
import { SuccessMapSection } from "./SuccessMapSection";
import { RewardsSection } from "./RewardsSection";

export default function Journey() {
  return (
    <div className="px-20 bg-white">
      {/* Main Content */}
      <div className="flex flex-col items-center gap-[18px] px-4 md:px-8 py-8 md:py-6 relative">
        {/* Total Progress Section */}
        <TotalProgressSection />

        {/* In Progress Section */}
        <InProgressSection />

        {/* Mission Section */}
        <Mission />

        {/* Success Map Section */}
        <SuccessMapSection />

        {/* Rewards Section */}
        <RewardsSection />
      </div>
    </div>
  );
}
