import React, { FC, useState, useMemo } from "react";
import { TrainingListSection } from "../pages/MyAccount/TrainingListSection";
import {
  ALL_TRAININGS,
  CATEGORY_OPTIONS,
  DATE_SORT_OPTIONS,
  SortOrder,
} from "../data/AllTrainings";
import { SearchInput, Dropdown } from "../components/SearchControls";

export const SearchAndFilters: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState<SortOrder>("");

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

      return matchesCategory && matchesSearch;
    });

    if (selectedDate) {
      results = results.slice().sort((a, b) => {
        const dateA = new Date(a.trainingDate).getTime();
        const dateB = new Date(b.trainingDate).getTime();

        return selectedDate === "newest"
          ? dateB - dateA
          : dateA - dateB;
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