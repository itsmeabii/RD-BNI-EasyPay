import { TotalProgress } from "../components/TotalProgress";
import { InProgress } from "../components/InProgress";
import { Mission } from "../components/Mission";
import { SuccessMap } from "../components/SuccessMap";
import { Rewards } from "../components/Rewards";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
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
