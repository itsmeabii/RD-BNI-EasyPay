import React from "react";
import { TrainingData } from "../../data/AllTrainings";
import ReminderDropdown from "./ReminderDropdown";

interface TrainingRowProps {
  training: TrainingData;
  isOpen: boolean;
  reminderOptions: string[];
  reminderValue: string;
  onOpenDropdown: () => void;
  onSelectOption: (orderId: string, option: string) => void;
  isLast?: boolean;
}

const TrainingRow = ({
  training,
  isOpen,
  reminderOptions,
  reminderValue,
  onOpenDropdown,
  onSelectOption,
  isLast,
}: TrainingRowProps) => {
  return (
    <div
      className={`grid grid-cols-[130px_1fr_180px_110px_160px_170px] bg-white border-t border-gray-200 min-h-[68px] items-center ${
        isLast ? "rounded-b-[8px]" : ""
      }`}
    >
      <div className="px-4 text-xs text-center text-gray-600">{training.orderId}</div>
      <div className="px-4 text-[14px] text-center text-gray-800">{training.trainingName}</div>
      <div className="px-4 text-[14px] text-center text-gray-800 underline whitespace-nowrap">
        {training.trainingDate}
      </div>
      <div className="px-4 text-[14px] text-center text-gray-800 font-medium">
        {training.category}
      </div>
      <div className="px-4 text-[14px] text-center text-gray-800">{reminderValue}</div>
      <div className="px-4 flex justify-center relative">
        <button
          onClick={onOpenDropdown}
          className="w-[130px] h-[34px] bg-[#cf2031] rounded-[6px] text-white text-sm font-bold hover:bg-[#b51c2b] transition-colors"
        >
          Set Reminders
        </button>
        {isOpen && (
          <ReminderDropdown
            options={reminderOptions}
            onSelect={(option) => onSelectOption(training.orderId, option)}
          />
        )}
      </div>
    </div>
  );
};

export default TrainingRow;