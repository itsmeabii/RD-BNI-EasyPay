import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import {
  CATEGORY_OPTIONS, CHAPTER_OPTIONS, DATE_SORT_OPTIONS,
  type CustomTraining,
} from "../../data/AllTrainings";
import { useFilteredTrainings } from "../../hooks/useFilteredTrainings";
import { ConfirmModal, SuccessModal } from "./TrainerApplicationModals";
import { formatDate, parseDate } from "../../helper/AdminCustomTrainings";
import { SearchInput, Dropdown } from "../../components/SearchControls";

const GRID = "grid-cols-[100px_1fr_110px_110px_110px_180px_120px_150px]";
const COLUMNS = [
  "Request ID", "Training Name", "Training", "Categories",
  "Chapter", "Proposed Date / Time", "No. of Attendees", "Trainer Application",
] as const;
const SORTABLE_COL = "Proposed Date / Time";

// ─── Training Row ─────────────────────────────────────────────────────────────

const TrainingRow = ({
  training, isApplied, isFirst, onApply,
}: {
  training: CustomTraining;
  isApplied: boolean;
  isFirst: boolean;
  onApply: (id: string) => void;
}) => (
  <div className={`grid ${GRID} bg-white items-center min-h-[60px] ${!isFirst && "border-t border-gray-200"}`}>
    <div className="p-3 text-xs text-center text-gray-500">{training.requestId}</div>
    <div className="p-3 text-sm text-center text-gray-800">{training.trainingName}</div>
    <div className="p-3 text-sm text-center">
      <Link to={`/training/${training.requestId}`} className="text-[#cf2031] underline hover:opacity-75 font-medium transition-opacity">
        View Training
      </Link>
    </div>
    <div className="p-3 text-sm text-center text-gray-800">{training.training}</div>
    <div className="p-3 text-sm text-center text-gray-800">{training.chapter}</div>
    <div className="p-3 text-sm text-center text-gray-800">{formatDate(training.proposedDate)}</div>
    <div className="p-3 text-sm text-center text-gray-800">{training.noOfAttendees}</div>
    <div className="p-3 flex justify-center items-center">
      {isApplied
        ? <span className="text-sm font-semibold text-green-600">Applied ✓</span>
        : (
          <button onClick={() => onApply(training.requestId)} className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-[#cf2031] transition-colors">
            Apply
            <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">+</span>
          </button>
        )}
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

type SortDir = "asc" | "desc" | null;

export default function CustomTrainings() {
  const [searchQuery, setSearchQuery]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChapter, setSelectedChapter]   = useState("");
  const [selectedDate, setSelectedDate]         = useState("");
  const [appliedIds, setAppliedIds]             = useState<Set<string>>(new Set());
  const [pendingId, setPendingId]               = useState<string | null>(null);
  const [showSuccess, setShowSuccess]           = useState(false);
  const [sortDir, setSortDir]                   = useState<SortDir>(null);

  const filtered = useFilteredTrainings(searchQuery, selectedCategory, selectedChapter, selectedDate);

  const trainings = [...filtered].sort((a, b) => {
    if (!sortDir) return 0;
    const diff = parseDate(a.proposedDate) - parseDate(b.proposedDate);
    return sortDir === "asc" ? diff : -diff;
  });

  const handleConfirm = () => {
    if (pendingId) setAppliedIds((prev) => new Set(prev).add(pendingId));
    setPendingId(null);
    setShowSuccess(true);
  };

  return (
    <>
      {pendingId   && <ConfirmModal onConfirm={handleConfirm} onCancel={() => setPendingId(null)} />}
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}

      <div className="flex flex-col gap-6">
        <h1 className="text-[#cf2031] text-2xl font-bold">Custom Trainings</h1>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for categories, chapter, registrant ID"
          />
          <div className="flex items-center gap-3 flex-wrap">
            <Dropdown value={selectedCategory} onChange={setSelectedCategory} placeholder="Categories" width="w-36"  options={CATEGORY_OPTIONS} />
            <Dropdown value={selectedChapter}  onChange={setSelectedChapter}  placeholder="Chapter"    width="w-32"  options={CHAPTER_OPTIONS} />
            <Dropdown value={selectedDate}     onChange={setSelectedDate}     placeholder="Date"       width="w-28"  options={DATE_SORT_OPTIONS} />
          </div>
        </div>

        {/* Table */}
        <div className="w-full rounded-lg overflow-x-auto border border-gray-300">
          <div className={`grid ${GRID} bg-[#cf2031] min-w-[1000px]`}>
            {COLUMNS.map((col) => {
              const sortable = col === SORTABLE_COL;
              return (
                <div
                  key={col}
                  onClick={sortable ? () => setSortDir((p) => p === null ? "asc" : p === "asc" ? "desc" : null) : undefined}
                  className={`py-4 px-3 text-center text-white font-extrabold text-xs leading-tight ${sortable ? "cursor-pointer hover:bg-[#b01c2a] transition-colors select-none" : ""}`}
                >
                  {col}
                  {sortable && <span className="ml-1">{sortDir === "asc" ? "↑" : sortDir === "desc" ? "↓" : "↑↓"}</span>}
                </div>
              );
            })}
          </div>

          <div className="min-w-[1000px]">
            {trainings.length === 0
              ? <div className="bg-white py-16 text-center text-gray-400 text-sm">No trainings match your search or filter.</div>
              : trainings.map((t, i) => (
                  <TrainingRow
                    key={t.requestId}
                    training={t}
                    isApplied={appliedIds.has(t.requestId)}
                    isFirst={i === 0}
                    onApply={setPendingId}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}