import { useState } from "react";
import { CustomReminderPanel, UnitType } from "@/components/ui/CustomReminderPanel";

interface CustomReminderSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onDone: (label: string) => void;
}

export default function CustomReminderSidebar({
  isOpen,
  onClose,
  onDone,
}: CustomReminderSidebarProps) {
  const [numVal, setNumVal] = useState<number>(30);
  const [unitVal, setUnitVal] = useState<UnitType>("minutes");

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/25 transition-opacity duration-300 z-[998] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in wrapper */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-[390px] overflow-hidden transition-transform duration-300 ease-in-out z-[999] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <CustomReminderPanel
          numVal={numVal}
          unitVal={unitVal}
          onNumChange={setNumVal}
          onUnitChange={setUnitVal}
          onClose={onClose}
          onDone={() => onDone(`${numVal} ${unitVal} before`)}
        />
      </div>
    </>
  );
}