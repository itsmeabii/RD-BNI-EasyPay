import { useState } from "react";
import { TRAINING_TABLE_COLUMNS, SortOrder } from "../../data/AllTrainings";
import { SortDropdown } from "./SortDropdown";

interface TrainingTableHeaderProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

export const TrainingTableHeader = ({ sortOrder, onSortChange }: TrainingTableHeaderProps) => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  return (
    <div className="grid grid-cols-[130px_1fr_180px_110px_160px_170px] bg-[#cf2031] rounded-t-[8px]">
      {TRAINING_TABLE_COLUMNS.map((col) =>
        col === "Training Date" ? (
          <SortDropdown
            key={col}
            sortOrder={sortOrder}
            onSortChange={onSortChange}
            isOpen={sortDropdownOpen}
            onToggle={() => setSortDropdownOpen((prev) => !prev)}
            onClose={() => setSortDropdownOpen(false)}
          />
        ) : (
          <div key={col} className="py-[18px] px-4 text-center text-white font-extrabold text-xs">
            {col}
          </div>
        )
      )}
    </div>
  );
};