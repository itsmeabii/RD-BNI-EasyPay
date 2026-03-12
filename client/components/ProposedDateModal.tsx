import { useState } from "react";
import { supabase } from "@/lib/supabase/Client";

interface ProposedDateModalProps {
  requestId: string;
  requestedAt: string;
  currentDate: string;
  onClose: () => void;
  onUpdated: () => void;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function parseInitialDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

function formatDisplay(date: Date, hours: number, minutes: number, ampm: "AM" | "PM"): string {
  const month = FULL_MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  return `${month} ${day}, ${year} ${h}:${m}${ampm.toLowerCase()}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export const ProposedDateModal = ({
  requestId,
  requestedAt,
  currentDate,
  onClose,
  onUpdated,
}: ProposedDateModalProps) => {
  const initial = parseInitialDate(currentDate);
  const [selectedDate, setSelectedDate] = useState<Date>(initial);
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const [showCalendar, setShowCalendar] = useState(false);
  const [hours, setHours] = useState(initial.getHours() % 12 || 12);
  const [minutes, setMinutes] = useState(initial.getMinutes());
  const [ampm, setAmpm] = useState<"AM" | "PM">(initial.getHours() >= 12 ? "PM" : "AM");
  const [saving, setSaving] = useState(false);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    setSelectedDate(d);
  };

  const handleApply = async () => {
    setSaving(true);
    const h = ampm === "PM" ? (hours % 12) + 12 : hours % 12;
    const finalDate = new Date(selectedDate);
    finalDate.setHours(h, minutes);
    const isoString = finalDate.toISOString();

    const { error } = await supabase
      .from("training_request")
      .update({ proposed_date: isoString })
      .eq("id", requestId);

    setSaving(false);
    if (!error) { onUpdated(); onClose(); }
  };

  const today = new Date();

  // Build calendar grid
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40">
      <div className="w-[360px] h-full bg-white shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-[18px] font-bold text-gray-800">Change Proposed Date</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl font-bold">✕</button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">

          {/* Request ID + Requested At */}
          <div className="flex justify-between">
            <div>
              <p className="text-[11px] text-gray-400 font-semibold mb-1">Request ID</p>
              <p className="text-[14px] font-bold text-gray-800">{requestId.replace("RQ-0", "RQ - 0")}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-gray-400 font-semibold mb-1">Requested At</p>
              <p className="text-[14px] font-bold text-gray-800">{requestedAt}</p>
            </div>
          </div>

          {/* Date Input with calendar toggle */}
          <div>
            <p className="text-[12px] font-semibold text-gray-700 mb-2">Proposed Date</p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={formatDisplay(selectedDate, hours, minutes, ampm)}
                className="flex-1 border border-gray-300 rounded-[6px] px-3 py-2 text-[13px] text-gray-800 focus:outline-none cursor-pointer"
                onClick={() => setShowCalendar(v => !v)}
                />
              <button
                onClick={() => setShowCalendar(v => !v)}
                className="w-10 h-10 flex items-center justify-center bg-[#cf2031] rounded-[6px] text-white hover:bg-[#b01c2a] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </button>
            </div>

            {/* Calendar */}
            {showCalendar && (
              <div className="mt-2 border border-gray-200 rounded-[10px] overflow-hidden shadow-md">

                {/* Month navigation */}
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                  <button onClick={prevMonth} className="text-gray-500 hover:text-[#cf2031] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <span className="text-[14px] font-bold text-gray-800">
                    {FULL_MONTHS[viewMonth]} {viewYear}
                  </span>
                  <button onClick={nextMonth} className="text-gray-500 hover:text-[#cf2031] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 bg-white px-2">
                  {DAYS.map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 bg-white px-2 pb-2">
                  {cells.map((day, i) => {
                    if (!day) return <div key={`empty-${i}`} />;
                    const isSelected =
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === viewMonth &&
                      selectedDate.getFullYear() === viewYear;
                    const isToday =
                      today.getDate() === day &&
                      today.getMonth() === viewMonth &&
                      today.getFullYear() === viewYear;
                    return (
                      <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        className={`w-8 h-8 mx-auto rounded-full text-[13px] font-medium transition-colors
                          ${isSelected ? "bg-[#cf2031] text-white" : ""}
                          ${isToday && !isSelected ? "border-2 border-gray-300 text-gray-600" : ""}
                          ${!isSelected && !isToday ? "text-gray-700 hover:bg-gray-100" : ""}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Time picker */}
                <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
                  <span className="text-[13px] font-semibold text-[#cf2031]">Time</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-200 rounded-[6px] overflow-hidden">
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={String(hours).padStart(2, "0")}
                        onChange={(e) => setHours(Math.min(12, Math.max(1, Number(e.target.value))))}
                        className="w-10 text-center text-[13px] font-semibold text-gray-800 border-none outline-none py-1"
                      />
                      <span className="text-gray-400 text-[13px]">:</span>
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={String(minutes).padStart(2, "0")}
                        onChange={(e) => setMinutes(Math.min(59, Math.max(0, Number(e.target.value))))}
                        className="w-10 text-center text-[13px] font-semibold text-gray-800 border-none outline-none py-1"
                      />
                    </div>
                    <div className="flex rounded-[6px] overflow-hidden border border-gray-200">
                      <button
                        onClick={() => setAmpm("AM")}
                        className={`px-2 py-1 text-[12px] font-bold transition-colors ${ampm === "AM" ? "bg-[#cf2031] text-white" : "text-gray-500 hover:bg-gray-100"}`}
                      >AM</button>
                      <button
                        onClick={() => setAmpm("PM")}
                        className={`px-2 py-1 text-[12px] font-bold transition-colors ${ampm === "PM" ? "bg-[#cf2031] text-white" : "text-gray-500 hover:bg-gray-100"}`}
                      >PM</button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t flex gap-3">
          <button
            onClick={handleApply}
            disabled={saving}
            className="flex-1 py-3 bg-[#cf2031] text-white font-bold rounded-[8px] hover:bg-[#b01c2a] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Apply Changes"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-[8px] hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};