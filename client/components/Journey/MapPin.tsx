import { WorkshopEvent, WorkshopStatus } from "@/types/JourneyTypes";
import { Trophy } from "lucide-react";

type MapPinProps = {
    event: WorkshopEvent;
    onClick: () => void;
};

const PIN_STYLES: Record<WorkshopStatus, string> = {
  missed:    "bg-white text-gray-700 border-2 border-gray-400",
  completed: "bg-gray-400 text-white",
  current:   "bg-bni-red text-white border-[#FF0000]",
  upcoming:  "bg-white text-gray-700 border-2 border-gray-400",
};
export function MapPin({ event, onClick }: MapPinProps) {
  const isCompleted = event.status === "completed";
  const isCurrent = event.status === "current";

  return (
    <div
      className="absolute -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1"
      style={{ left: event.x, top: event.y }}
      onClick={onClick}
    >
      {/* Trophy */}
      {event.isLastOfMonth && (
        <Trophy className="w-10 h-10 text-yellow-500" fill="currentColor" />
      )}

      {/* Pin icon + Label side by side */}
      <div className="flex items-center gap-2">
        {isCurrent && (
          <img src="/Location.svg" alt="current location" className="w-10 h-10" />
        )}
        <div className="text-sm leading-tight text-gray-700 font-medium whitespace-pre-line hidden sm:block text-center">
          {event.label}
        </div>
      </div>

      {/* Circle with date */}
      <div className={`w-20 h-20 rounded-full shadow flex flex-col items-center justify-center text-[11px] font-semibold text-center leading-tight ${PIN_STYLES[event.status]}`}>
        {event.date}
        {isCompleted && (
          <span className="text-[9px] font-normal mt-0.5 opacity-80">Completed</span>
        )}
      </div>
    </div>
  );
}