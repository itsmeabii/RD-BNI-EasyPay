import React, { FC, useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Search } from "lucide-react";

/* ─── Search Input ───────────────────────────────────────────────────────── */

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
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

/* ─── Dropdown ───────────────────────────────────────────────────────────── */

interface DropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  width: string;
  scrollable?: boolean; // enables scrollbar for long lists (e.g. months)
}

export const Dropdown: FC<DropdownProps> = ({
  value,
  onChange,
  options,
  placeholder,
  width,
  scrollable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleSelect = useCallback(
    (val: string) => {
      onChange(val);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
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
          className={`flex-shrink-0 text-bni-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-12 left-0 w-full bg-white border border-bni-gray-400 rounded-md shadow-lg z-50 overflow-hidden"
        >
          {/* Reset option */}
          <div
            className="px-4 py-2 text-sm text-bni-gray-500 hover:bg-bni-gray-200 cursor-pointer"
            onClick={() => handleSelect("")}
          >
            {placeholder}
          </div>

          {/* Options — scrollable if prop set */}
          <div className={scrollable ? "max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" : ""}>
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
        </div>
      )}
    </div>
  );
};