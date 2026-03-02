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
  trainings,
}: TrainingListSectionProps): JSX.Element => {
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
      <div className="w-full rounded-[8px] overflow-hidden" style={{ border: "1px solid #d9d9d9" }}>
        {/* Header */}
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "130px 1fr 180px 110px 160px 170px",
            backgroundColor: "#cf2031",
          }}
        >
          {["Order ID", "Training Name", "Training Date", "Categories", "Reminders", "Action"].map((col) => (
            <div key={col} className="py-[18px] px-4 text-center text-white font-extrabold text-xs">
              {col}
            </div>
          ))}
        </div>

        {/* Body — renders directly from trainings prop, no local copy */}
        {trainings.length === 0 ? (
          <div className="bg-white py-16 text-center text-gray-400 text-sm">
            No trainings match your search or filter.
          </div>
        ) : (
          trainings.map((training, index) => (
            <div
              key={training.orderId}
              style={{
                display: "grid",
                gridTemplateColumns: "130px 1fr 180px 110px 160px 170px",
                backgroundColor: "#fff",
                borderTop: index === 0 ? "none" : "1px solid #e5e7eb",
                minHeight: "68px",
                alignItems: "center",
              }}
            >
              <div className="px-4 text-xs text-center text-gray-600">{training.orderId}</div>
              <div className="px-4 text-[14px] text-center text-gray-800">{training.trainingName}</div>
              <div className="px-4 text-[14px] text-center text-gray-800 underline whitespace-nowrap">{training.trainingDate}</div>
              <div className="px-4 text-[14px] text-center text-gray-800 font-medium">{training.category}</div>
              <div className="px-4 text-[14px] text-center text-gray-800">
                {reminderOverrides[training.orderId] ?? training.reminder}
              </div>

              <div className="px-4 flex justify-center relative">
                <button
                  onClick={() => setOpenReminder(openReminder === training.orderId ? null : training.orderId)}
                  className="w-[130px] h-[34px] bg-[#cf2031] rounded-[6px] text-white text-sm font-bold hover:bg-[#b51c2b] transition-colors"
                >
                  Set Reminders
                </button>

                {openReminder === training.orderId && (
                  <div
                    className="absolute bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    style={{ top: "40px", left: "50%", transform: "translateX(-50%)", width: "140px" }}
                  >
                    {reminderOptions.map((option) => (
                      <div
                        key={option}
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectOption(training.orderId, option)}
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
        onClose={() => { setCustomSidebarOpen(false); setActiveOrderId(null); }}
        onDone={handleCustomDone}
      />
    </>
  );
};