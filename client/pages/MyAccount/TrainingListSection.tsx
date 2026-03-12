import { useState } from "react";
import type { TrainingData, SortOrder } from "@/types/TrainingTypes";
import TrainingRow from "../../components/training/TrainingRow";
import CustomReminderSidebar from "./CustomReminder";
import { TrainingTableHeader } from "../../components/training/TrainingTableHeader";
import { useReminders } from "../../hooks/useReminders";

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
  const { reminderOverrides, saveReminder, setReminder } = useReminders(trainings);
  const [openReminder, setOpenReminder] = useState<string | null>(null);
  const [customSidebarOpen, setCustomSidebarOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  const reminderOptions = ["1 week before", "1 day before", "1 hour before", "Custom"];

  const handleSelectOption = (orderId: string, option: string) => {
    if (option === "Custom") {
      setActiveOrderId(orderId);
      setCustomSidebarOpen(true);
      setOpenReminder(null);
    } else {
      setReminder(orderId, option);
      setOpenReminder(null);
      saveReminder(orderId, option, "preset");
    }
  };

  const handleCustomDone = (label: string) => {
    if (activeOrderId) {
      setReminder(activeOrderId, label);
      const match = label.match(/^(\d+)\s+(\w+)\s+before$/);
      const customNumber = match ? parseInt(match[1]) : undefined;
      const customUnit = match ? match[2] : undefined;
      saveReminder(activeOrderId, label, "custom", customNumber, customUnit);
    }
    setCustomSidebarOpen(false);
    setActiveOrderId(null);
  };

  return (
    <>
      <div className="w-full rounded-[8px] border border-gray-300 overflow-visible">
        <TrainingTableHeader sortOrder={sortOrder} onSortChange={onSortChange} />

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
        onClose={() => { setCustomSidebarOpen(false); setActiveOrderId(null); }}
        onDone={handleCustomDone}
      />
    </>
  );
};