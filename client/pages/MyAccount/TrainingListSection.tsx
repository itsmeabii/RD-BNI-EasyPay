import { useState } from "react";
import { TrainingData } from "../../data/AllTrainings";
import TrainingRow from "../../components/training/TrainingRow";
import CustomReminderSidebar from "./CustomReminder";

interface TrainingListSectionProps {
  trainings: TrainingData[];
}

export const TrainingListSection = ({ trainings }: TrainingListSectionProps) => {
  const [openReminder, setOpenReminder] = useState<string | null>(null);
  const [customSidebarOpen, setCustomSidebarOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [reminderOverrides, setReminderOverrides] = useState<Record<string, string>>({});

  const reminderOptions = ["1 week before", "1 day before", "1 hour before", "Custom"];

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

  return (
    <>
      <div className="w-full rounded-[8px] overflow-hidden border border-gray-300">
        {/* Header */}
        <div className="grid grid-cols-[130px_1fr_180px_110px_160px_170px] bg-[#cf2031]">
          {["Order ID", "Training Name", "Training Date", "Categories", "Reminders", "Action"].map(
            (col) => (
              <div key={col} className="py-[18px] px-4 text-center text-white font-extrabold text-xs">
                {col}
              </div>
            )
          )}
        </div>

        {/* Body */}
        {trainings.length === 0 ? (
          <div className="bg-white py-16 text-center text-gray-400 text-sm">
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
            />
          ))
        )}
      </div>

      {/* Custom Sidebar */}
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