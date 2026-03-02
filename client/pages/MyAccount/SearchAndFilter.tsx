import { useState, useMemo } from "react";
import { TrainingListSection, TrainingData } from "./TrainingListSection";

const ChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#817d7d"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0 pointer-events-none"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ── All training data lives here so filtering is always in sync ──────────────
const ALL_TRAININGS: TrainingData[] = [
  {
    orderId: "RQ-001",
    trainingName: "Business Strategy & Planning",
    trainingDate: "February 22, 2026",
    reminder: "1 week before",
    category: "AWS",
  },
  {
    orderId: "RQ-002",
    trainingName: "Sales Techniques That Close Deals",
    trainingDate: "February 22, 2026",
    reminder: "No reminder",
    category: "AMS",
  },
  {
    orderId: "RQ-003",
    trainingName: "Entrepreneurship Fundamentals",
    trainingDate: "February 22, 2026",
    reminder: "1 week before",
    category: "AWS",
  },
  {
    orderId: "RQ-004",
    trainingName: "Entrepreneurship Fundamentals",
    trainingDate: "February 22, 2026",
    reminder: "1 week before",
    category: "MSP",
  },
  {
    orderId: "RQ-005",
    trainingName: "Entrepreneurship Fundamentals",
    trainingDate: "February 22, 2026",
    reminder: "1 week before",
    category: "AWS",
  },
];

export const SearchAndFilters = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // ── Filtering happens here, immediately on every keystroke ───────────────
  const filteredTrainings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_TRAININGS.filter((t) => {
      const matchesCategory =
        !selectedCategory || t.category === selectedCategory;
      const matchesSearch =
        !q ||
        t.trainingName.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.orderId.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* ── Search & Filter Bar ─────────────────────────────────────── */}
      <div className="flex items-center gap-3">

        {/* Search Box */}
        <div className="flex flex-1 items-center h-[46px] bg-white rounded-[8px] border border-[#d9d9d9] shadow-[inset_0px_2px_4px_rgba(0,0,0,0.08)] px-4 gap-2">
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for categories, training name, registrant ID"
            className="flex-1 bg-transparent border-none outline-none text-[#333] text-[15px] placeholder:text-[#817d7d] placeholder:italic placeholder:not-italic"
            style={{ textAlign: "left", direction: "ltr" }}
            autoComplete="off"
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#817d7d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0 opacity-60"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Categories Dropdown */}
        <div className="relative flex items-center h-[46px] w-[155px] bg-white rounded-[8px] border border-[#d9d9d9] px-4 flex-shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Select category"
          >
            <option value="">Categories</option>
            <option value="AWS">AWS</option>
            <option value="AMS">AMS</option>
            <option value="MSP">MSP</option>
          </select>
          <span className="flex-1 font-semibold text-[#817d7d] text-[14px] pointer-events-none select-none">
            {selectedCategory || "Categories"}
          </span>
          <ChevronDown />
        </div>

        {/* Date Dropdown */}
        <div className="relative flex items-center h-[46px] w-[105px] bg-white rounded-[8px] border border-[#d9d9d9] px-4 flex-shrink-0">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Select date"
          >
            <option value="">Date</option>
            <option value="newest">Newst</option>
            <option value="oldest">Oldest</option>
          </select>
          <span className="flex-1 font-semibold text-[#817d7d] text-[14px] pointer-events-none select-none">
            {selectedDate === "today"
              ? "Today"
              : selectedDate === "week"
              ? "This Week"
              : selectedDate === "month"
              ? "This Month"
              : "Date"}
          </span>
          <ChevronDown />
        </div>

      </div>

      {/* ── Training Table — receives already-filtered data ─────────── */}
      <TrainingListSection trainings={filteredTrainings} />

    </div>
  );
};