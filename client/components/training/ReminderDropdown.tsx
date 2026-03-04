import React from "react";

interface ReminderDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const ReminderDropdown = ({ options, onSelect }: ReminderDropdownProps) => {
  return (
    <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg z-50 top-[40px] left-1/2 -translate-x-1/2 w-[140px]">
      {options.map((option) => (
        <div
          key={option}
          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default ReminderDropdown;