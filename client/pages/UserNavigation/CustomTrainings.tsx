import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SearchAndFilters } from "@/constants/SearchAndFilter";
import { formatDateLong, parseDate } from "@/lib/utils/Formatter";
import { CUSTOM_TRAINING_TABLE_COLUMNS, CATEGORY_OPTIONS } from "@/constants/Training";
import type { CustomTraining } from "@/types/TrainingTypes";

const CHAPTER_OPTIONS = [
  { label: "All-Star", value: "All-Star" },
  { label: "Rising", value: "Rising" },
];

const DATE_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function CustomTrainings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [trainings] = useState<CustomTraining[]>([]);

  const filteredTrainings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let results = trainings.filter((t) => {
      const matchesCategory = !selectedCategory || t.training === selectedCategory;
      const matchesChapter  = !selectedChapter  || t.chapter  === selectedChapter;
      const matchesSearch   =
        !q ||
        t.trainingName.toLowerCase().includes(q) ||
        t.training.toLowerCase().includes(q) ||
        t.requestId.toLowerCase().includes(q) ||
        t.chapter.toLowerCase().includes(q);
      return matchesCategory && matchesChapter && matchesSearch;
    });

    if (selectedDate === "newest") {
      results = results.slice().sort((a, b) => parseDate(b.proposedDate) - parseDate(a.proposedDate));
    } else if (selectedDate === "oldest") {
      results = results.slice().sort((a, b) => parseDate(a.proposedDate) - parseDate(b.proposedDate));
    }

    return results;
  }, [searchQuery, selectedCategory, selectedChapter, selectedDate, trainings]);

  const handleApply = (requestId: string) => {
    setAppliedIds((prev) => new Set(prev).add(requestId));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[#cf2031] text-[22px] font-bold">Custom Trainings</h1>

      <SearchAndFilters
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search for categories, chapter, registrant ID"
        dropdowns={[
          {
            value: selectedCategory,
            onChange: setSelectedCategory,
            placeholder: "Categories",
            width: "w-[140px]",
            options: CATEGORY_OPTIONS,
          },
          {
            value: selectedChapter,
            onChange: setSelectedChapter,
            placeholder: "Chapter",
            width: "w-[120px]",
            options: CHAPTER_OPTIONS,
          },
          {
            value: selectedDate,
            onChange: setSelectedDate,
            placeholder: "Date",
            width: "w-[100px]",
            options: DATE_OPTIONS,
          },
        ]}
      />

      <div className="w-full rounded-[8px] overflow-hidden border border-[#d9d9d9]">
        <div className="grid bg-[#cf2031]" style={{ gridTemplateColumns: "110px 1fr 130px 110px 160px 130px 150px" }}>
          {CUSTOM_TRAINING_TABLE_COLUMNS.map((col) => (
            <div key={col} className="py-[14px] px-3 text-center text-white font-extrabold text-[11px] leading-tight">
              {col}
            </div>
          ))}
        </div>

        {filteredTrainings.length === 0 ? (
          <div className="bg-white py-16 text-center text-gray-400 text-sm">
            No trainings match your search or filter.
          </div>
        ) : (
          filteredTrainings.map((t, index) => (
            <div
              key={t.requestId}
              className="grid bg-white items-center"
              style={{
                gridTemplateColumns: "110px 1fr 130px 110px 160px 130px 150px",
                borderTop: index === 0 ? "none" : "1px solid #e5e7eb",
                minHeight: "60px",
              }}
            >
              <div className="px-3 text-xs text-center text-gray-600">{t.requestId}</div>
              <div className="px-3 text-[13px] text-center text-gray-800">{t.trainingName}</div>
              <div className="px-3 text-[13px] text-center">
                <Link to={`/training/${t.requestId}`} className="text-[#cf2031] underline hover:opacity-75 font-medium">
                  View Training
                </Link>
              </div>
              <div className="px-3 text-[13px] text-center text-gray-800">{t.chapter}</div>
              <div className="px-3 text-[13px] text-center text-gray-800">{formatDateLong(t.proposedDate)}</div>
              <div className="px-3 text-[13px] text-center text-gray-800">{t.noOfAttendees}</div>
              <div className="px-3 flex justify-center items-center">
                {appliedIds.has(t.requestId) ? (
                  <span className="text-[13px] font-semibold text-green-600">Applied ✓</span>
                ) : (
                  <button
                    onClick={() => handleApply(t.requestId)}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-gray-700 hover:text-[#cf2031] transition-colors"
                  >
                    Apply
                    <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[11px] font-bold leading-none">+</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}