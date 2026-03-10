import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { TrainingData, TRAINING_TABLE_HEADERS } from "../../data/AllTrainings";
import TrainingRow from "../../components/training/TrainingRow";
import CustomReminderSidebar from "./CustomReminder";
import { SortOrder } from "../../components/SearchAndFilter";

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

  const reminderOptions = [
    "1 week before",
    "1 day before",
    "1 hour before",
    "Custom",
  ];

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

  const handleSortClick = () => {
    onSortChange(
      sortOrder === null ? "newest" : sortOrder === "newest" ? "oldest" : null
    );
  };

  const SortIcon = sortOrder === "newest"
    ? ArrowDown
    : sortOrder === "oldest"
    ? ArrowUp
    : ArrowUpDown;

  return (
    <>
      <div className="w-full rounded-[8px] overflow-hidden border border-gray-300">
        {/* Header */}
        <div className="grid grid-cols-[130px_1fr_180px_110px_160px_170px] bg-[#cf2031]">
          {TRAINING_TABLE_HEADERS.map((col) => (
            <div
              key={col}
              className="py-[18px] px-4 text-center text-white font-extrabold text-xs"
            >
              {col === "Training Date" ? (
                <button
                  onClick={handleSortClick}
                  className="flex items-center justify-center gap-1 w-full text-white font-extrabold text-xs"
                  title={
                    sortOrder === null
                      ? "Sort by date"
                      : sortOrder === "newest"
                      ? "Showing newest first"
                      : "Showing oldest first"
                  }
                >
                  Training Date
                  <SortIcon size={13} />
                </button>
              ) : (
                col
              )}
            </div>
          ))}
        </div>

        {/* Body */}
        {trainings.length === 0 ? (
          <div className="bg-white py-16 text-center text-gray-400 text-sm">
            No trainings match your search or filter.
          </div>
        ) : (
          trainings.map((training) => (
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
            />
          ))
        )}
      </div>

      <CustomReminderSidebar
        isOpen={customSidebarOpen}
        onClose={() => { setCustomSidebarOpen(false); setActiveOrderId(null); }}
        onDone={handleCustomDone}
      />
    </>
  );
};