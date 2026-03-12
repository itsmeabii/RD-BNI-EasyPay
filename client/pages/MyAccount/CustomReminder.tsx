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

  const handleDone = () => {
    onDone(`${numVal} ${unitVal} before`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.25)",
          zIndex: 998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
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

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}