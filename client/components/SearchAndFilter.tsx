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
  filters?: DropdownConfig[];
}

export const SearchAndFilters: FC<SearchAndFiltersProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
}) => {
  return (
    <div className="flex items-center gap-3">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
      {filters.map((filter, index) => (
        <Dropdown
          key={index}
          value={filter.value}
          onChange={filter.onChange}
          placeholder={filter.placeholder}
          width={filter.width}
          options={filter.options}
          scrollable={filter.scrollable}
        />
      ))}
    </div>
  );
};