import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTHS } from "@/constants/Training";
import { fetchTrainings } from "@/lib/utils/Training/TrainingUtils";
import { EventType, WorkshopEvent, WorkshopStatus } from "@/types/JourneyTypes";
import TrainingDetailsPopUp from "@/components/Journey/TrainingDetailsPopUp";
import { MapPin } from "@/components/Journey/MapPin";
import { Training } from "@/types/TrainingTypes";
import { supabase } from "@/lib/supabase/Client";
import { formatDate } from "@/lib/utils/Formatter";

type MonthData = {
  month: string;
  events: WorkshopEvent[];
};

type MissionMapProps = {
  userId: string; 
};

const X_POSITIONS = ["22%", "55%", "80%", "75%", "90%"];
const Y_POSITIONS = ["15%", "65%", "10%", "60%", "20%"];

function getEventType(code: string): EventType {
  const c = code.toUpperCase();
  if (c === "MSP") return "msp";
  if (c === "MSWS") return "msws";
  if (c === "ODWB") return "odwb";
  return "default";
}

function buildMonths(
  trainings: Training[],
  progressMap: Map<number, WorkshopStatus>
): MonthData[] {
  const map = new Map<string, WorkshopEvent[]>();

  const lastOfMonth = new Map<string, number>();
  trainings.forEach((training) => {
    training.months.forEach((month) => {
      lastOfMonth.set(month, training.id);
    });
  });

  trainings.forEach((training) => {
    training.months.forEach((month) => {
      if (!map.has(month)) map.set(month, []);
      const existingEvents = map.get(month)!;
      const index = existingEvents.length;
      const firstDate = training.dates[0]?.date ?? "";

      existingEvents.push({
        trainingId: training.id,
        date: firstDate ? formatDate(firstDate) : "TBD",
        label: `${training.title}\n(${training.code})`,
        type: getEventType(training.code),
        status: progressMap.get(training.id) ?? "upcoming",
        isLastOfMonth: lastOfMonth.get(month) === training.id,
        x: X_POSITIONS[index % X_POSITIONS.length],
        y: Y_POSITIONS[index % Y_POSITIONS.length],
      });
    });
  });

  return Array.from(map.entries())
    .sort((a, b) => MONTHS.indexOf(a[0]) - MONTHS.indexOf(b[0]))
    .map(([month, events]) => ({ month, events }));
}

export function MissionMap({ userId }: MissionMapProps) { // 👈 accept userId prop
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [progressMap, setProgressMap] = useState<Map<number, WorkshopStatus>>(new Map());
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    async function init() {
      setLoading(true);

      const data = await fetchTrainings();
      setTrainings(data);

      const { data: progress, error } = await supabase
        .from("user_training_progress")
        .select("training_id, status")
        .eq("user_id", userId); // 👈 use prop directly, no GetUser() needed

      if (!error && progress) {
        const map = new Map<number, WorkshopStatus>();
        progress.forEach((p) => map.set(p.training_id, p.status as WorkshopStatus));
        setProgressMap(map);
      }

      setLoading(false);
    }

    init();
  }, [userId]);

  const monthsData = useMemo(
    () => buildMonths(trainings, progressMap),
    [trainings, progressMap]
  );

  const goBack = () => { setSelectedId(null); setCurrentIndex((prev) => Math.max(0, prev - 1)); };
  const goNext = () => { setSelectedId(null); setCurrentIndex((prev) => Math.min(monthsData.length - 1, prev + 1)); };

  if (loading) {
    return <div className="text-center text-gray-400 text-sm py-10">Loading map...</div>;
  }

  if (monthsData.length === 0) {
    return <div className="text-center text-gray-400 text-sm py-10">No trainings available.</div>;
  }

  const current = monthsData[currentIndex];
  const selectedEvent = current.events.find((e) => e.trainingId === selectedId) ?? null;
  const selectedTraining = selectedEvent
    ? trainings.find((t) => t.id === selectedEvent.trainingId) ?? null
    : null;

  return (
    <div className="w-full flex flex-col gap-[6px]">
      <div className="relative w-full select-none">
        <div className="relative w-full h-[681px] border border-gray-300 overflow-hidden bg-[#e8dcc8]">
          {/* Road SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice">
            <rect width="800" height="340" fill="#e8dcc8" />
            <path d="M 0 280 C 100 260, 150 200, 200 180 C 250 160, 280 220, 350 210 C 420 200, 450 140, 520 130 C 590 120, 640 160, 700 140 C 750 125, 780 100, 800 90"
              fill="none" stroke="#888" strokeWidth="28" strokeLinecap="round" />
            <path d="M 0 280 C 100 260, 150 200, 200 180 C 250 160, 280 220, 350 210 C 420 200, 450 140, 520 130 C 590 120, 640 160, 700 140 C 750 125, 780 100, 800 90"
              fill="none" stroke="#aaa" strokeWidth="24" strokeLinecap="round" />
            <path d="M 0 280 C 100 260, 150 200, 200 180 C 250 160, 280 220, 350 210 C 420 200, 450 140, 520 130 C 590 120, 640 160, 700 140 C 750 125, 780 100, 800 90"
              fill="none" stroke="white" strokeWidth="2" strokeDasharray="20 15" strokeLinecap="round" />
          </svg>

          {/* Month title */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-2xl font-bold text-black">
            {current.month}
          </div>

          {/* Map Pins */}
          {current.events.map((event) => (
            <MapPin
              key={event.trainingId}
              event={event}
              onClick={() => setSelectedId(prev => prev === event.trainingId ? null : event.trainingId)}
            />
          ))}

          {/* Details popup */}
          {selectedEvent && selectedTraining && (() => {
            const xVal = parseFloat(selectedEvent.x);
            const yVal = parseFloat(selectedEvent.y);
            const flipX = xVal > 60;
            const flipY = yVal > 60;
            return (
              <div
                className="absolute z-30"
                style={{
                  left: selectedEvent.x,
                  top: selectedEvent.y,
                  transform: `translate(${flipX ? "calc(-100% - 60px)" : "60px"}, ${flipY ? "calc(-100% + 40px)" : "-10px"})`,
                }}
              >
                <TrainingDetailsPopUp
                  training={selectedTraining}
                  event={selectedEvent}
                  onClose={() => setSelectedId(null)}
                />
              </div>
            );
          })()}
        </div>

        {/* Left arrow */}
        <button onClick={goBack} disabled={currentIndex === 0} aria-label="Previous month"
          className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-20 h-20 flex items-center justify-center text-bni-red disabled:opacity-30 transition">
          <ChevronLeft className="w-20 h-20" strokeWidth={2} />
        </button>

        {/* Right arrow */}
        <button onClick={goNext} disabled={currentIndex === monthsData.length - 1} aria-label="Next month"
          className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-20 h-20 flex items-center justify-center text-bni-red disabled:opacity-30 transition">
          <ChevronRight className="w-20 h-20" strokeWidth={2} />
        </button>

        <p className="text-center text-xs text-gray-400 italic mt-1">
          Click date for detail information
        </p>
      </div>
    </div>
  );
}