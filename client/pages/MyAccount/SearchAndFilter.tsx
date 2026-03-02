import { useState, useMemo, useRef, useEffect } from "react";
import { TrainingListSection } from "./TrainingListSection";
import { ALL_TRAININGS } from "../../data/AllTrainings";

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#817d7d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 pointer-events-none">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface DropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  width: string;
}

const Dropdown = ({ value, onChange, options, placeholder, width }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative flex-shrink-0 ${width}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center w-full h-[46px] bg-white rounded-[8px] border border-[#d9d9d9] px-4 gap-2"
      >
        <span className="flex-1 text-left font-semibold text-[#817d7d] text-[14px] select-none">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown />
      </button>

      {open && (
        <div className="absolute top-[50px] left-0 w-full bg-white border border-[#d9d9d9] rounded-[8px] shadow-lg z-50 overflow-hidden">
          <div
            className="px-4 py-2 text-sm text-[#817d7d] hover:bg-gray-100 cursor-pointer"
            onClick={() => { onChange(""); setOpen(false); }}
          >
            {placeholder}
          </div>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${value === opt.value ? "text-[#cf2031] font-semibold" : "text-gray-700"}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SearchAndFilters = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredTrainings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let results = ALL_TRAININGS.filter((t) => {
      const matchesCategory = !selectedCategory || t.category === selectedCategory;
      const matchesSearch =
        !q ||
        t.trainingName.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.orderId.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (selectedDate === "newest") {
      results = results.slice().sort(
        (a, b) => new Date(b.trainingDate).getTime() - new Date(a.trainingDate).getTime()
      );
    } else if (selectedDate === "oldest") {
      results = results.slice().sort(
        (a, b) => new Date(a.trainingDate).getTime() - new Date(b.trainingDate).getTime()
      );
    }

    return results;
  }, [searchQuery, selectedCategory, selectedDate]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3">

        {/* Search Box */}
        <div className="flex flex-1 items-center h-[46px] bg-white rounded-[8px] border border-[#d9d9d9] shadow-[inset_0px_2px_4px_rgba(0,0,0,0.08)] px-4 gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for categories, training name, registrant ID"
            className="flex-1 bg-transparent border-none outline-none text-[#333] text-[15px] placeholder:text-[#817d7d] placeholder:italic"
            autoComplete="off"
          />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#817d7d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Categories Dropdown */}
        <Dropdown
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Categories"
          width="w-[155px]"
          options={[
            { label: "AWS", value: "AWS" },
            { label: "AMS", value: "AMS" },
            { label: "MSP", value: "MSP" },
          ]}
        />

        {/* Date Dropdown */}
        <Dropdown
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Date"
          width="w-[105px]"
          options={[
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
          ]}
        />

      </div>

      <TrainingListSection trainings={filteredTrainings} />
    </div>
  );
};