import { useState, useMemo } from "react";
import { TrainingListSection } from "../pages/MyAccount/TrainingListSection";
import {
  ALL_TRAININGS,
  CATEGORY_OPTIONS,
  DATE_SORT_OPTIONS,
} from "../data/AllTrainings";
import { SearchInput, Dropdown } from "../components/SearchControls";

export type SortOrder = "newest" | "oldest" | null;

export const SearchAndFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const filteredTrainings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let results = ALL_TRAININGS.filter((training) => {
      const matchesCategory =
        !selectedCategory || training.category === selectedCategory;

      const matchesSearch =
        !query ||
        training.trainingName.toLowerCase().includes(query) ||
        training.category.toLowerCase().includes(query) ||
        training.orderId.toLowerCase().includes(query);

      const trainingMonth = new Date(training.trainingDate).toLocaleString(
        "default",
        { month: "long" }
      );
      const matchesMonth = !selectedMonth || trainingMonth === selectedMonth;

      return matchesCategory && matchesSearch && matchesMonth;
    });

    if (sortOrder) {
      results = results.slice().sort((a, b) => {
        const dateA = new Date(a.trainingDate).getTime();
        const dateB = new Date(b.trainingDate).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
    }

    return results;
  }, [searchQuery, selectedCategory, selectedMonth, sortOrder]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for categories, training name, training ID"
        />

        <Dropdown
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Categories"
          width="w-[155px]"
          options={CATEGORY_OPTIONS}
        />

        <Dropdown
          value={selectedMonth}
          onChange={setSelectedMonth}
          placeholder="Date"
          width="w-[145px]"
          options={DATE_SORT_OPTIONS}
        />
      </div>

      <TrainingListSection
        trainings={filteredTrainings}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
    </div>
  );
};