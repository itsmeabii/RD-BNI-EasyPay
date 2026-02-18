import { Star } from "./Star";

export function TotalProgress() {
  const milestones = [
    { label: "5 star", completed: true },
    { label: "10 star", completed: true },
    { label: "15 star", completed: true },
    { label: "20 star", completed: true },
    { label: "25 star", completed: false },
    { label: "30 star", completed: false },
    { label: "40 star", completed: false },
    { label: "50 star", completed: false },
  ];

  return (
    <div className="w-full max-w-[1073px] flex flex-col gap-[18px]">
      <h2 className="text-[28px] md:text-[35px] font-semibold text-black">
        Total Progress:
      </h2>

      {/* Star Labels */}
      <div className="flex items-center justify-between gap-2 md:gap-[68px] overflow-x-auto">
        {milestones.map((milestone) => (
          <div key={milestone.label} className="flex-shrink-0 w-[75px]">
            <div className="text-[18px] md:text-[22px] text-black text-center">
              {milestone.label}
            </div>
          </div>
        ))}
      </div>

      {/* Stars Row */}
      <div className="flex items-center justify-center gap-2 md:gap-0 overflow-x-auto">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <Star filled={milestone.completed} />
            {index < milestones.length - 1 && (
              <div className="hidden md:block w-[90px] h-1 bg-[#D9D9D9] mx-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
