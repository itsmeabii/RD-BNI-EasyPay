import { useState, useRef, useEffect } from "react";
import { TrainingData, TRAINING_TABLE_COLUMNS, SortOrder } from "../../data/AllTrainings";
import TrainingRow from "../../components/training/TrainingRow";
import CustomReminderSidebar from "./CustomReminder";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface TrainingListSectionProps {
  trainings: TrainingData[];
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

export const TrainingListSection = ({
  trainings,
  sortOrder,
  onSortChange,
}: TrainingListSectionProps) => {
  const [openReminder, setOpenReminder] = useState<string | null>(null);
  const [customSidebarOpen, setCustomSidebarOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [reminderOverrides, setReminderOverrides] = useState<Record<string, string>>({});
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const reminderOptions = ["1 week before", "1 day before", "1 hour before", "Custom"];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectOption = (orderId: string, option: string) => {
    if (option === "Custom") {
      setActiveOrderId(orderId);
      setCustomSidebarOpen(true);
      setOpenReminder(null);
    } else {
      setReminderOverrides((prev) => ({ ...prev, [orderId]: option }));
      setOpenReminder(null);
    }
  };

  const handleCustomDone = (label: string) => {
    if (activeOrderId) {
      setReminderOverrides((prev) => ({ ...prev, [activeOrderId]: label }));
    }
    setCustomSidebarOpen(false);
    setActiveOrderId(null);
  };

  const SortIcon = () => {
    if (sortOrder === "newest") return <ArrowUp className="w-3 h-3 inline ml-1" />;
    if (sortOrder === "oldest") return <ArrowDown className="w-3 h-3 inline ml-1" />;
    return <ArrowUpDown className="w-3 h-3 inline ml-1 opacity-70" />;
  };

  return (
    <>
      {/* overflow-visible so reminder dropdowns in lower rows are not clipped */}
      <div className="w-full rounded-[8px] border border-gray-300 overflow-visible">

        {/* Header — rounded top corners only */}
        <div className="grid grid-cols-[130px_1fr_180px_110px_160px_170px] bg-[#cf2031] rounded-t-[8px]">
          {TRAINING_TABLE_COLUMNS.map((col) =>
            col === "Training Date" ? (
              <div key={col} ref={sortRef} className="relative py-[18px] px-4 text-center">
                <button
                  onClick={() => setSortDropdownOpen((prev) => !prev)}
                  className="text-white font-extrabold text-xs flex items-center justify-center gap-1 w-full hover:opacity-80 transition-opacity"
                >
                  {col}
                  <SortIcon />
                </button>
                {sortDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-left">
                    <div
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${sortOrder === "" ? "text-bni-red font-semibold" : "text-gray-700"}`}
                      onClick={() => { onSortChange(""); setSortDropdownOpen(false); }}
                    >
                      Default
                    </div>
                    <div
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${sortOrder === "newest" ? "text-bni-red font-semibold" : "text-gray-700"}`}
                      onClick={() => { onSortChange("newest"); setSortDropdownOpen(false); }}
                    >
                      <ArrowUp className="w-3 h-3" /> Newest
                    </div>
                    <div
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${sortOrder === "oldest" ? "text-bni-red font-semibold" : "text-gray-700"}`}
                      onClick={() => { onSortChange("oldest"); setSortDropdownOpen(false); }}
                    >
                      <ArrowDown className="w-3 h-3" /> Oldest
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div key={col} className="py-[18px] px-4 text-center text-white font-extrabold text-xs">
                {col}
              </div>
            )
          )}
        </div>

        {/* Body */}
        {trainings.length === 0 ? (
          <div className="bg-white py-16 text-center text-gray-400 text-sm rounded-b-[8px]">
            No trainings match your search or filter.
          </div>
        ) : (
          trainings.map((training, index) => (
            <TrainingRow
              key={training.orderId}
              training={training}
              isOpen={openReminder === training.orderId}
              reminderOptions={reminderOptions}
              reminderValue={reminderOverrides[training.orderId] ?? training.reminder}
              onOpenDropdown={() =>
                setOpenReminder(openReminder === training.orderId ? null : training.orderId)
              }
              onSelectOption={handleSelectOption}
              isLast={index === trainings.length - 1}
            />
          ))
        )}
      </div>

      <CustomReminderSidebar
        isOpen={customSidebarOpen}
        onClose={() => {
          setCustomSidebarOpen(false);
          setActiveOrderId(null);
        }}
        onDone={handleCustomDone}
      />
    </>
  );
};