import { useEffect, useState } from "react";
import { StarSection } from "./StarSection";
import { fetchProgramProgress } from "@/lib/utils/Training/TrainingSeriesUtils";
import { fetchTrainingSeries } from "@/lib/utils/Training/TrainingSeriesUtils";
import { OverallProgress, ProgramProgress } from "@/types/JourneyTypes";
import { useAuth } from "@/context/AuthContext";

function ProgramTracker({ title, starsCompleted, totalStars = 10 }: ProgramProgress) {
  return (
    <div className="flex flex-col w-full gap-[12px]">
      <div className="text-[18px] md:text-[22px] text-black">{title}</div>
      <div className="flex items-center gap-[10px] md:gap-[14px] flex-wrap">
        {Array.from({ length: totalStars }).map((_, index) => (
          <StarSection key={index} filled={index < starsCompleted} size="sm" />
        ))}
      </div>
    </div>
  );
}

export function InProgressSection() {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<ProgramProgress[]>([]);
  const [overall, setOverall] = useState<OverallProgress>({ starsCompleted: 0, totalStars: 50 });

  useEffect(() => {
    if (user?.id) {
      // logged in — fetch with progress
      fetchProgramProgress(user.id).then(({ overall, programs }) => {
        setOverall(overall);
        setPrograms(programs);
      });
    } else {
      // not logged in — show all series with 0 stars
      fetchTrainingSeries().then((series) => {
        setPrograms(series.map((s) => ({
          id: s.id,
          title: s.title,
          starsCompleted: 0, // 👈 empty stars
          totalStars: 10,
        })));
      });
    }
  }, [user?.id]);

  return (
    <div className="w-full flex flex-col gap-[12px] md:gap-[18px]">
      <h2 className="text-[28px] md:text-[35px] font-semibold text-black">
        In Progress:
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {programs.map((program) => (
          <ProgramTracker key={program.id} {...program} />
        ))}
      </div>
    </div>
  );
}