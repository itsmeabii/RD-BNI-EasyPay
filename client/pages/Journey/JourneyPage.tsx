import { TotalProgress } from "./TotalProgressSection";
import { InProgress } from "./InProgressSection";
import { Mission } from "./MissionSection";
import { SuccessMap } from "./SuccessMapSection";
import { Rewards } from "./RewardsSection";

export default function Journey() {
  return (
    <div className="px-20 bg-white">
      {/* Main Content */}
      <div className="flex flex-col items-center gap-[18px] px-4 md:px-8 py-8 md:py-6 relative">
        {/* Total Progress Section */}
        <TotalProgress />

        {/* In Progress Section */}
        <InProgress />

        {/* Mission Section */}
        <Mission />

        {/* Success Map Section */}
        <SuccessMap />

        {/* Rewards Section */}
        <Rewards />
      </div>
    </div>
  );
}
