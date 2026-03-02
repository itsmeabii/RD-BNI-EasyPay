import { useState } from "react";
import { MONTHS } from "@/data/Training";
import { ChevronDown, ChevronRight } from "lucide-react";

export type FilterStatus = "all" | "completed" | "upcoming";

interface FilterDropdownProps {
  filterStatus: FilterStatus;
  filterMonths: string[];
  onStatusChange: (status: FilterStatus) => void;
  onMonthsChange: (months: string[]) => void;
  onClear: () => void;
}

const STATUS_OPTIONS: [FilterStatus, string][] = [
  ["all", "All Trainings"],
  ["completed", "Completed"],
  ["upcoming", "Not Yet Completed"],
];

export default function FilterDropdown({
  filterStatus,
  filterMonths,
  onStatusChange,
  onMonthsChange,
  onClear,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [monthsOpen, setMonthsOpen] = useState(false);

  const activeCount = [
    filterStatus !== "all",
    filterMonths.length > 0,
  ].filter(Boolean).length;

  const toggleMonth = (month: string) => {
    if (filterMonths.includes(month)) {
      onMonthsChange(filterMonths.filter((m) => m !== month));
    } else {
      onMonthsChange([...filterMonths, month]);
    }
  };

    const allSelected = filterMonths.length === MONTHS.length;


    return (
        <div className="relative">
        {/* Trigger button */}
        <button
            onClick={() => {setOpen((o) => !o); setMonthsOpen(false);}}
            className="bg-white border-2 border-gray-200 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-700 flex items-center gap-2 hover:border-gray-300 transition whitespace-nowrap"
        >
            Filter
            {activeCount > 0 && (
            <span className="bg-bni-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {activeCount}
            </span>
            )}
            <span
            className="inline-block transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
            >
            <ChevronDown />
            </span>
        </button>

        {/* Dropdown panel */}
        {open && (
            <div className="absolute top-[calc(100%+8px)] right-0 bg-white rounded-2xl shadow-xl p-5 min-w-[240px] z-50">
            {/* Status */}
            <div className="mb-4 space-y-1">
                {STATUS_OPTIONS.map(([val, label]) => (
                <label
                    key={val}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer text-sm transition-colors ${
                    filterStatus === val
                        ? "bg-red-50 text-bni-red font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                    <input
                    type="radio"
                    name="filter-status"
                    value={val}
                    checked={filterStatus === val}
                    onChange={() => onStatusChange(val)}
                    className="accent-bni-red"
                    />
                    {label}
                </label>
                ))}
            </div>

            {/* Month — flyout submenu row */}
            <div className="relative">
                <button
                onClick={() => setMonthsOpen((o) => !o)}
                onMouseEnter={() => setMonthsOpen(true)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filterMonths.length > 0
                    ? "bg-red-50 text-bni-red font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                >
                <span>
                    {filterMonths.length === 0
                    ? "Months"
                    : filterMonths.length === 1
                    ? filterMonths[0]
                    : `${filterMonths.length} months selected`}
                </span>
                <span className="text-gray-400 text-xs"><ChevronRight /></span>
                </button>

                {/* Flyout month list */}
                {monthsOpen && (
                <div
                    className="absolute top-0 left-[calc(100%+30px)] bg-white rounded-2xl shadow-xl p-4 z-50 w-[280px]"
                    onMouseLeave={() => setMonthsOpen(false)}
                >
                    {/* 2-column month grid */}
                    <div className="grid grid-cols-2 gap-1 mb-3">
                    {MONTHS.map((m) => (
                        <label
                        key={m}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer text-sm transition-colors ${
                            filterMonths.includes(m)
                            ? "bg-red-50 text-bni-red font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        >
                        <input
                            type="checkbox"
                            checked={filterMonths.includes(m)}
                            onChange={() => toggleMonth(m)}
                            className="accent-bni-red"
                        />
                        {m}
                        </label>
                    ))}
                    </div>

                    {/* Select All / Clear All */}
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button
                        onClick={() => onMonthsChange([...MONTHS])}
                        disabled={allSelected}
                        className="flex-1 text-xs font-semibold py-1.5 rounded-lg transition-colors bg-bni-red text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Select All
                    </button>
                    <button
                        onClick={() => onMonthsChange([])}
                        disabled={filterMonths.length === 0}
                        className="flex-1 text-xs font-semibold py-1.5 rounded-lg transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Clear All
                    </button>
                    </div>
                </div>
                )}
            </div>


            {/* Clear */}
            {activeCount > 0 && (
                <button
                onClick={() => { onClear(); setOpen(false); }}
                className="mt-3 w-full bg-gray-100 text-gray-500 text-sm font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
                >
                Clear Filters
                </button>
            )}
            </div>
        )}

        {/* Backdrop */}
        {open && (
            <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            />
        )}
        </div>
    );
}