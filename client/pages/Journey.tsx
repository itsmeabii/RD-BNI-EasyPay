import { TotalProgress } from "../components/Journey/TotalProgress";
import { InProgress } from "../components/Journey/InProgress";
import { Mission } from "../components/Journey/Mission";
import { SuccessMap } from "../components/Journey/SuccessMap";
import { Rewards } from "../components/Journey/Rewards";

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
