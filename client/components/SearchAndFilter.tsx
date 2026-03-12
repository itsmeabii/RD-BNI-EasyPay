import { FC } from "react";
import { SearchInput, Dropdown } from "./SearchControls";

interface FilterOption {
  label: string;
  value: string;
}

interface DropdownConfig {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  width: string;
  options: FilterOption[];
  scrollable?: boolean;
}

interface SearchAndFiltersProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder?: string;
  dropdowns?: DropdownConfig[];
}

export const SearchAndFilters: FC<SearchAndFiltersProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  dropdowns = [],
}) => {
  return (
    <div className="flex items-center gap-3">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
      {dropdowns.map((dropdown, index) => (
        <Dropdown
          key={index}
          value={dropdown.value}
          onChange={dropdown.onChange}
          placeholder={dropdown.placeholder}
          width={dropdown.width}
          options={dropdown.options}
          scrollable={dropdown.scrollable}
        />
      ))}
    </div>
  );
};