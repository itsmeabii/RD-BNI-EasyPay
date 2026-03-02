import { useState } from "react";
import CustomReminderSidebar from "./CustomReminder";

export interface TrainingData {
  orderId: string;
  trainingName: string;
  trainingDate: string;
  reminder: string;
  category: "AWS" | "AMS" | "MSP";
}

interface TrainingListSectionProps {
  trainings: TrainingData[];
}

export const TrainingListSection = ({
  trainings: initialTrainings,
}: TrainingListSectionProps): JSX.Element => {
  // Local state only for reminder updates — search/filter is handled by parent
  const [reminderMap, setReminderMap] = useState<Record<string, string>>({});
  const [openReminder, setOpenReminder] = useState<string | null>(null);
  const [customSidebarOpen, setCustomSidebarOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  const reminderOptions = [
    "1 week before",
    "1 day before",
    "1 hour before",
    "Custom",
  ];

  const getReminderLabel = (t: TrainingData) =>
    reminderMap[t.orderId] ?? t.reminder;

  const handleSelectOption = (orderId: string, option: string) => {
    if (option === "Custom") {
      setActiveOrderId(orderId);
      setCustomSidebarOpen(true);
      setOpenReminder(null);
    } else {
      setReminderMap((prev) => ({ ...prev, [orderId]: option }));
      setOpenReminder(null);
    }
  };

  const handleCustomDone = (label: string) => {
    if (activeOrderId) {
      setReminderMap((prev) => ({ ...prev, [activeOrderId]: label }));
    }
    setCustomSidebarOpen(false);
    setActiveOrderId(null);
  };

  const COLS = "130px 1fr 180px 110px 160px 170px";

  return (
    <>
      <div
        className="w-full rounded-[8px] overflow-visible"
        style={{ border: "1px solid #d9d9d9" }}
      >
        {/* Header */}
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: COLS,
            backgroundColor: "#cf2031",
            borderRadius: "8px 8px 0 0",
          }}
        >
          {["Order ID", "Training Name", "Training Date", "Categories", "Reminders", "Action"].map(
            (col) => (
              <div
                key={col}
                className="py-[18px] px-4 text-center text-white font-extrabold text-xs"
              >
                {col}
              </div>
            )
          )}
        </div>

        {/* Rows */}
        {initialTrainings.length === 0 ? (
          <div className="bg-white py-16 text-center text-gray-400 text-sm rounded-b-[8px]">
            No trainings match your search or filter.
          </div>
        ) : (
          initialTrainings.map((training, index) => (
            <div
              key={training.orderId}
              style={{
                display: "grid",
                gridTemplateColumns: COLS,
                backgroundColor: "#fff",
                borderTop: index === 0 ? "none" : "1px solid #e5e7eb",
                minHeight: "68px",
                alignItems: "center",
                borderRadius:
                  index === initialTrainings.length - 1
                    ? "0 0 8px 8px"
                    : undefined,
              }}
            >
              {/* Order ID */}
              <div className="px-4 text-xs text-center text-gray-600">
                {training.orderId}
              </div>

              {/* Training Name */}
              <div className="px-4 text-[14px] text-center text-gray-800">
                {training.trainingName}
              </div>

              {/* Training Date */}
              <div className="px-4 text-[14px] text-center text-gray-800 underline whitespace-nowrap">
                {training.trainingDate}
              </div>

              {/* Category */}
              <div className="px-4 text-[14px] text-center text-gray-800 font-medium">
                {training.category}
              </div>

              {/* Reminder */}
              <div className="px-4 text-[14px] text-center text-gray-800">
                {getReminderLabel(training)}
              </div>

              {/* Action */}
              <div className="px-4 flex justify-center relative">
                <button
                  onClick={() =>
                    setOpenReminder(
                      openReminder === training.orderId
                        ? null
                        : training.orderId
                    )
                  }
                  className="w-[130px] h-[34px] bg-[#cf2031] rounded-[6px] text-white text-sm font-bold hover:bg-[#b51c2b] transition-colors"
                >
                  Set Reminders
                </button>

                {openReminder === training.orderId && (
                  <div
                    className="absolute bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    style={{
                      top: "40px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "140px",
                    }}
                  >
                    {reminderOptions.map((option) => (
                      <div
                        key={option}
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleSelectOption(training.orderId, option)
                        }
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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