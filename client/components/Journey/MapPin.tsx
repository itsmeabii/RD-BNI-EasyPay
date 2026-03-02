import { WorkshopEvent, WorkshopStatus } from "@/data/Journey";
import { Trophy } from "lucide-react";

type MapPinProps = {
    event: WorkshopEvent;
    onClick: () => void;
};

const PIN_STYLES: Record<WorkshopStatus, string> = {
  missed:    "bg-white text-gray-700 border-2 border-gray-400",
  completed: "bg-gray-400 text-white",
  current:   "bg-[#CF2031] text-white border-[#FF0000]",
  upcoming:  "bg-white text-gray-700 border-2 border-gray-400",
};
export function MapPin({ event, onClick }: MapPinProps) {
  const isCompleted = event.status === "completed";
  const isCurrent = event.status === "current";

  return (
    <div
      className="absolute flex flex-col items-center gap-1 -translate-x-1/2 cursor-pointer"
      style={{ left: event.x, top: event.y }}
      onClick={onClick}
    >
        {event.isLastOfMonth && (
          <Trophy className="w-10 h-10 text-yellow-500 mb-1" fill="currentColor" />
        )}

        {isCurrent && (
          <img src="/Location.svg" alt="current location" className="w-10 h-10 mb-1" />
        )}

        <div className="text-[11px] text-center leading-tight text-gray-700 font-medium whitespace-pre-line mb-0.5 hidden sm:block">
          {event.label}
        </div>
      
      <div className={`w-20 h-20 rounded-full shadow flex flex-col items-center justify-center text-[11px] font-semibold text-center leading-tight ${PIN_STYLES[event.status]}`}>
        {event.date}
        {isCompleted && (
          <span className="text-[9px] font-normal mt-0.5 opacity-80">Completed</span>
        )}
      </div>
    </div>
  );
}