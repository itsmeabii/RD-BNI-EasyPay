import { useMemo } from "react";
import { MONTHS } from "@/constants/Training";

export const useFilteredTrainings = (
  trainings: any[],
  searchQuery: string,
  selectedCategory: string,
  selectedChapter: string,
  selectedMonth: string
) =>
  useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return trainings.filter((t) => {
      const matchesCategory = !selectedCategory || t.category === selectedCategory;
      const matchesChapter  = !selectedChapter ||
        t.chapter.trim().toLowerCase() === selectedChapter.trim().toLowerCase();
      const matchesMonth = !selectedMonth || (() => {
        if (!t.proposed_date) return false;
        return MONTHS[new Date(t.proposed_date).getMonth()] === selectedMonth;
      })();
      const matchesSearch =
        !q ||
        t.training.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.chapter.toLowerCase().includes(q) ||
        t.lt_name.toLowerCase().includes(q);

      return matchesCategory && matchesChapter && matchesMonth && matchesSearch;
    });
  }, [trainings, searchQuery, selectedCategory, selectedChapter, selectedMonth]);