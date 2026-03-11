import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ReminderDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const ReminderDropdown = ({ options, onSelect, buttonRef }: ReminderDropdownProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = options.length * 36;
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUp = spaceBelow < dropdownHeight + 8;

      setPosition({
        top: openUp ? rect.top - dropdownHeight - 4 : rect.bottom + 4,
        left: rect.left + rect.width / 2,
      });
    }
  }, [buttonRef, options]);

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        transform: "translateX(-50%)",
        width: 140,
        zIndex: 9999,
      }}
      className="bg-white border border-gray-200 rounded-md shadow-lg">
      {options.map((option) => (
        <div
          key={option}
          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>,
    document.body
  );
};
export default ReminderDropdown;