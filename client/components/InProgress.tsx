import { Star } from "./Star";

interface ProgramTrackerProps {
  title: string;
  starsCompleted: number;
}

function ProgramTracker({ title, starsCompleted }: ProgramTrackerProps) {
  return (
    <div className="flex flex-col gap-[12px] md:gap-[18px] flex-1 min-w-[280px]">
      <div className="text-[18px] md:text-[22px] text-black">
        {title}
      </div>
      <div className="flex items-center gap-[10px] md:gap-[14px] flex-wrap">
        {Array.from({ length: 10 }).map((_, index) => (
          <Star key={index} filled={index < starsCompleted} size="sm" />
        ))}
      </div>
    </div>
  );
}

export function InProgress() {
  return (
    <div className="w-full flex flex-col md:flex-row items-start gap-4">
      {/* Left side - In Progress label and programs */}
      <div className="flex flex-col gap-[20px] flex-1">
        <h2 className="text-[28px] md:text-[35px] font-semibold text-black">
          In Progress:
        </h2>

        <div className="flex flex-col gap-[20px]">
          <ProgramTracker 
            title="MSP (Member Success Program)" 
            starsCompleted={5}
          />
          <ProgramTracker 
            title="MSWS (Member Success Workshop Series)" 
            starsCompleted={5}
          />
        </div>
      </div>

      {/* Right side - Additional MSWS program */}
      <div className="flex flex-col gap-[20px] flex-1 min-w-[280px]">
        {/* Empty space to align with the grid */}
        <div className="h-[28px] md:h-[35px]"></div>
        <ProgramTracker 
          title="MSWS (Member Success Workshop Series)" 
          starsCompleted={5}
        />
      </div>

      {/* Scrollbar indicator */}
      <div className="hidden md:flex flex-col items-center gap-2 ml-1">
        <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
          <path 
            d="M4.31263 1.33701C4.73794 0.752822 5.61039 0.772628 5.97648 1.37479L8.08867 4.84893C8.49832 5.52272 7.97768 6.4008 7.17926 6.38267L2.61329 6.27902C1.81487 6.26089 1.38295 5.36119 1.85885 4.7075L4.31263 1.33701Z" 
            fill="#D9D9D9"
          />
        </svg>
        <div className="w-2 h-[210px] bg-[#999] relative">
          <div className="w-[3px] h-[62px] rounded-[5px] bg-[#D9D9D9] absolute left-1/2 -translate-x-1/2 top-[2px]"></div>
        </div>
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path 
            d="M5.69262 7.18816C5.26438 7.77142 4.39185 7.74966 4.02876 7.14668L1.93387 3.66773C1.52765 2.99312 2.05271 2.11642 2.85104 2.13632L7.41667 2.25014C8.215 2.27004 8.64247 3.17049 8.16336 3.82303L5.69262 7.18816Z" 
            fill="#D9D9D9"
          />
        </svg>
      </div>
    </div>
  );
}
