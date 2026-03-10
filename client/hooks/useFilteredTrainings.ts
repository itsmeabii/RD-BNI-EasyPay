import { useMemo } from "react";
import { ALL_CUSTOM_TRAININGS } from "../data/AllTrainings";

export const useFilteredTrainings = (
  searchQuery: string,
  selectedCategory: string,
  selectedChapter: string,
  selectedDate: string
) =>
  useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return ALL_CUSTOM_TRAININGS.filter((t) => {
      const matchesCategory = !selectedCategory || t.training === selectedCategory;
      const matchesChapter  = !selectedChapter  || t.chapter  === selectedChapter;
      const matchesSearch   =
        !q ||
        t.trainingName.toLowerCase().includes(q) ||
        t.training.toLowerCase().includes(q) ||
        t.requestId.toLowerCase().includes(q) ||
        t.chapter.toLowerCase().includes(q);

      const trainingMonth = new Date(t.proposedDate).toLocaleString("default", { month: "long" });
      const matchesMonth  = !selectedDate || trainingMonth === selectedDate;

      return matchesCategory && matchesChapter && matchesSearch && matchesMonth;
    });
  }, [searchQuery, selectedCategory, selectedChapter, selectedDate]);