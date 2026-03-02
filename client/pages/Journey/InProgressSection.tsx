import { PROGRAMS, ProgramTrackerProps } from "@/data/Journey";
import { Star } from "./StarSection";

function ProgramTracker({ title, starsCompleted, totalStars = 10 }: ProgramTrackerProps) {
  return (
    <div className="flex flex-col w-full gap-[12px]">
      <div className="text-[18px] md:text-[22px] text-black">{title}</div>
      <div className="flex items-center gap-[10px] md:gap-[14px] flex-wrap">
        {Array.from({ length: totalStars }).map((_, index) => (
          <Star key={index} filled={index < starsCompleted} size="sm" />
        ))}
      </div>
    </div>
  );
}

export function InProgress() {
  return (
    <div className="w-full flex flex-col gap-[12px] md:gap-[18px]">
      <h2 className="text-[28px] md:text-[35px] font-semibold text-black">
        In Progress:
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {PROGRAMS.map((program, index) => (
          <ProgramTracker key={index} {...program} />
        ))}
      </div>
    </div>
  );
}