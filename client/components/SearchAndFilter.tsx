import React, { FC, useState, useMemo } from "react";
import { TrainingListSection } from "../pages/MyAccount/TrainingListSection";
import { CATEGORY_OPTIONS, MONTH_OPTIONS, SortOrder } from "../data/AllTrainings";
import { SearchInput, Dropdown } from "../components/SearchControls";
import { useTrainings } from "../hooks/useTrainings";

export const SearchAndFilters: FC = () => {
  const { trainings, loading } = useTrainings();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("");
  const filteredTrainings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let results = trainings.filter((training) => {
      const matchesCategory = !selectedCategory || training.category === selectedCategory;
      const matchesMonth = !selectedMonth || training.trainingDate.includes(selectedMonth);
      const matchesSearch =
        !query ||
        training.trainingName.toLowerCase().includes(query) ||
        training.category.toLowerCase().includes(query) ||
        training.orderId.toLowerCase().includes(query);

      return matchesCategory && matchesMonth && matchesSearch;
    });

    if (sortOrder) {
      results = results.slice().sort((a, b) => {
        const dateA = new Date(a.trainingDate).getTime();
        const dateB = new Date(b.trainingDate).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
    }

    return results;
  }, [searchQuery, selectedCategory, selectedMonth, sortOrder, trainings]);

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
          placeholder="Month"
          scrollable
          width="w-[130px]"
          options={MONTH_OPTIONS}
        />
      </div>

      {loading ? (
        <div className="bg-white rounded-[8px] border border-gray-300 py-16 text-center text-gray-400 text-sm">
          Loading trainings...
        </div>
      ) : (
        <TrainingListSection
          trainings={filteredTrainings}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      )}
    </div>
  );
};