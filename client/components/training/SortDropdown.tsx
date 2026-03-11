import { useRef, useEffect } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { SortOrder } from "@/types/TrainingTypes";

interface SortDropdownProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const SortDropdown = ({
  sortOrder,
  onSortChange,
  isOpen,
  onToggle,
  onClose,
}: SortDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  //Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const SortIcon = () => {
    if (sortOrder === "newest") return <ArrowUp className="w-3 h-3" />;
    if (sortOrder === "oldest") return <ArrowDown className="w-3 h-3" />;
    return <ArrowUpDown className="w-3 h-3 opacity-70" />;
  };

  return (
    <div ref={ref} className="relative py-[18px] px-4 text-center">
      <button
        onClick={onToggle}
        className="text-white font-extrabold text-xs flex items-center justify-center gap-1 w-full hover:opacity-80 transition-opacity"
      >
        Training Date
        <SortIcon />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-left">
          <div
            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${sortOrder === "" ? "text-bni-red font-semibold" : "text-gray-700"}`}
            onClick={() => { onSortChange(""); onClose(); }}
          >
            Default
          </div>
          <div
            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${sortOrder === "newest" ? "text-bni-red font-semibold" : "text-gray-700"}`}
            onClick={() => { onSortChange("newest"); onClose(); }}
          >
            <ArrowUp className="w-3 h-3" /> Newest
          </div>
          <div
            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${sortOrder === "oldest" ? "text-bni-red font-semibold" : "text-gray-700"}`}
            onClick={() => { onSortChange("oldest"); onClose(); }}
          >
            <ArrowDown className="w-3 h-3" /> Oldest
          </div>
        </div>
      )}
    </div>
  );
};