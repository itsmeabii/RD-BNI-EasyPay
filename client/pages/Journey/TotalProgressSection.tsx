import { useAuth } from "@/context/AuthContext";
import { StarSection } from "./StarSection";
import { MILESTONE_VALUES } from "@/constants/Journey";
import { useEffect, useState } from "react";
import { fetchProgramProgress } from "@/lib/utils/Training/TrainingSeriesUtils";

export function TotalProgressSection() {
  const { user } = useAuth();
  const [starsCompleted, setStarsCompleted] = useState(0);

  useEffect(() => {
    if (!user?.id) return;
    fetchProgramProgress(user.id).then(({ overall }) => {
      setStarsCompleted(overall.starsCompleted);
    });
  }, [user?.id]);

  return (
    <div className="w-full flex flex-col gap-[18px]">
      <h2 className="text-[28px] md:text-[35px] font-semibold text-black mb-10">
        Total Progress:
      </h2>

      <div className="flex items-center w-full">
        {MILESTONE_VALUES.map((milestone, index) => (
          <>
            <div
              key={milestone}
              className="relative flex flex-col items-center flex-shrink-0"
            >
              <span className="absolute bottom-full mb-1 text-[13px] md:text-[18px] text-black whitespace-nowrap">
                {milestone} star
              </span>
              <StarSection filled={starsCompleted >= milestone} />
            </div>

            {index < MILESTONE_VALUES.length - 1 && (
              <div key={`line-${index}`} className="flex-1 h-[4px] bg-[#D9D9D9]" />
            )}
          </>
        ))}
      </div>
    </div>
  );
}