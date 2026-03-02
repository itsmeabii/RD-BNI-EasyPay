import React, { FC, useState, useMemo, useRef, useEffect, useCallback } from "react";
import { TrainingListSection } from "../pages/MyAccount/TrainingListSection";
import {
  ALL_TRAININGS,
  CATEGORY_OPTIONS,
  DATE_SORT_OPTIONS,
  SortOrder,
} from "../data/AllTrainings";
import { ChevronDown, Search } from "lucide-react";

/* Types */
interface DropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  width: string;
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/* Search Input Component */
const SearchInput: FC<SearchInputProps> = ({ value, onChange, placeholder }) => (
  <div className="flex flex-1 items-center h-11 bg-white rounded-md border border-bni-gray-400 shadow-inner px-4 gap-2">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 bg-transparent border-none outline-none text-[#333] text-sm placeholder:text-bni-gray-500 placeholder:italic"
      autoComplete="off"
    />
    <Search size={20} className="flex-shrink-0 text-bni-gray-500 opacity-60" />
  </div>
);

/* Dropdown Component */
const Dropdown: FC<DropdownProps> = ({ value, onChange, options, placeholder, width }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleSelect = useCallback((val: string) => { onChange(val); setIsOpen(false); }, [onChange]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={dropdownRef} className={`relative flex-shrink-0 ${width}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center w-full h-11 bg-white rounded-md border border-bni-gray-400 px-4 gap-2"
      >
        <span className="flex-1 text-left font-semibold text-bni-gray-500 text-sm select-none">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`flex-shrink-0 text-bni-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-11 left-0 w-full bg-white border border-bni-gray-400 rounded-md shadow-lg z-50 overflow-hidden"
        >
          <div
            className="px-4 py-2 text-sm text-bni-gray-500 hover:bg-bni-gray-200 cursor-pointer"
            onClick={() => handleSelect("")}
          >
            {placeholder}
          </div>
          {options.map((opt) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-bni-gray-200 ${
                value === opt.value ? "text-bni-red font-semibold" : "text-gray-700"
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* Main Component */
export const SearchAndFilters: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState<SortOrder>("");

  const filteredTrainings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let results = ALL_TRAININGS.filter((training) => {
      const matchesCategory = !selectedCategory || training.category === selectedCategory;
      const matchesSearch =
        !query ||
        training.trainingName.toLowerCase().includes(query) ||
        training.category.toLowerCase().includes(query) ||
        training.orderId.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    if (selectedDate) {
      results = results.slice().sort((a, b) => {
        const dateA = new Date(a.trainingDate).getTime();
        const dateB = new Date(b.trainingDate).getTime();
        return selectedDate === "newest" ? dateB - dateA : dateA - dateB;
      });
    }

    return results;
  }, [searchQuery, selectedCategory, selectedDate]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for categories, training name, registrant ID"
        />
        <Dropdown
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Categories"
          width="w-[155px]"
          options={CATEGORY_OPTIONS}
        />
        <Dropdown
          value={selectedDate}
          onChange={(val) => setSelectedDate(val as SortOrder)}
          placeholder="Date"
          width="w-[105px]"
          options={DATE_SORT_OPTIONS}
        />
      </div>
      <TrainingListSection trainings={filteredTrainings} />
    </div>
  );
};