import { Star } from "./StarSection";

const MILESTONES = [
  { label: "5 star", completed: true },
  { label: "10 star", completed: true },
  { label: "15 star", completed: true },
  { label: "20 star", completed: true },
  { label: "25 star", completed: false },
  { label: "30 star", completed: false },
  { label: "40 star", completed: false },
  { label: "50 star", completed: false },
];

export function TotalProgress() {
  return (
    <div className="w-full flex flex-col gap-[18px]">
      <h2 className="text-[28px] md:text-[35px] font-semibold text-black mb-10">
        Total Progress:
      </h2>

      <div className="flex items-center w-full">
        {MILESTONES.map((milestone, index) => (
          <>
            {/* Star column with label above */}
            <div
              key={milestone.label}
              className="relative flex flex-col items-center flex-shrink-0"
            >
              <span className="absolute bottom-full mb-1 text-[13px] md:text-[18px] text-black whitespace-nowrap">
                {milestone.label}
              </span>
              <Star filled={milestone.completed} />
            </div>

            {/* Connector line */}
            {index < MILESTONES.length - 1 && (
              <div key={`line-${index}`} className="flex-1 h-[4px] bg-[#D9D9D9]" />
            )}
          </>
        ))}
      </div>
    </div>
  );
}