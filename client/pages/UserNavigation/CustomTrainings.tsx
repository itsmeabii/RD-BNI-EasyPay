import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import {
  CATEGORY_OPTIONS,
  CHAPTER_OPTIONS,
  DATE_SORT_OPTIONS,
  type CustomTraining,
} from "../../data/AllTrainings";
import { useFilteredTrainings } from "../../hooks/useFilteredTrainings";
import { ConfirmModal, SuccessModal } from "./TrainerApplicationModals";

// Constants 

const TABLE_COLUMNS = [
  "Request ID",
  "Training Name",
  "Training",
  "Chapter",
  "Proposed Date / Time",
  "No. of Attendees",
  "Trainer Application",
] as const;

// ─── Dropdown ─────────────────────────────────────────────────────────────────

interface DropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  width?: string;
}

const Dropdown = ({
  value,
  onChange,
  options,
  placeholder,
  width = "w-36",
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative flex-shrink-0 ${width}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full h-10 bg-white rounded-lg border border-gray-300 px-3 gap-2 hover:border-gray-400 transition-colors"
      >
        <span className="flex-1 text-left font-semibold text-gray-500 text-sm select-none truncate">
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-11 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-y-auto max-h-56">
          <div
            className="p-2 text-sm text-gray-400 hover:bg-gray-50 cursor-pointer"
            onClick={() => { onChange(""); setOpen(false); }}
          >
            {placeholder}
          </div>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`p-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                value === opt.value
                  ? "text-[#cf2031] font-semibold"
                  : "text-gray-700"
              }`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Training Row 

interface TrainingRowProps {
  training: CustomTraining;
  isApplied: boolean;
  isFirst: boolean;
  onApply: (id: string) => void;
}

const TrainingRow = ({ training, isApplied, isFirst, onApply }: TrainingRowProps) => (
  <div
    className={`grid grid-cols-[110px_1fr_130px_110px_160px_130px_150px] bg-white items-center min-h-[60px] ${
      !isFirst && "border-t border-gray-200"
    }`}
  >
    <div className="p-3 text-xs text-center text-gray-500">{training.requestId}</div>
    <div className="p-3 text-sm text-center text-gray-800">{training.trainingName}</div>
    <div className="p-3 text-sm text-center">
      <Link
        to={`/training/${training.requestId}`}
        className="text-[#cf2031] underline hover:opacity-75 font-medium transition-opacity"
      >
        View Training
      </Link>
    </div>
    <div className="p-3 text-sm text-center text-gray-800">{training.chapter}</div>
    <div className="p-3 text-sm text-center text-gray-800">{training.proposedDate}</div>
    <div className="p-3 text-sm text-center text-gray-800">{training.noOfAttendees}</div>
    <div className="p-3 flex justify-center items-center">
      {isApplied ? (
        <span className="text-sm font-semibold text-green-600">Applied ✓</span>
      ) : (
        <button
          onClick={() => onApply(training.requestId)}
          className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-[#cf2031] transition-colors"
        >
          Apply
          <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold leading-none">
            +
          </span>
        </button>
      )}
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomTrainings() {
  const [searchQuery, setSearchQuery]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChapter, setSelectedChapter]   = useState("");
  const [selectedDate, setSelectedDate]         = useState("");
  const [appliedIds, setAppliedIds]             = useState<Set<string>>(new Set());
  const [pendingId, setPendingId]               = useState<string | null>(null);
  const [showSuccess, setShowSuccess]           = useState(false);

  const filteredTrainings = useFilteredTrainings(
    searchQuery,
    selectedCategory,
    selectedChapter,
    selectedDate
  );

  const handleApplyClick   = (id: string) => setPendingId(id);
  const handleCancel       = () => setPendingId(null);
  const handleSuccessClose = () => setShowSuccess(false);

  const handleConfirm = () => {
    if (pendingId) setAppliedIds((prev) => new Set(prev).add(pendingId));
    setPendingId(null);
    setShowSuccess(true);
  };

  return (
    <>
      {pendingId   && <ConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />}
      {showSuccess && <SuccessModal onClose={handleSuccessClose} />}

      <div className="flex flex-col gap-6">
        <h1 className="text-[#cf2031] text-2xl font-bold">Custom Trainings</h1>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 min-w-48 items-center h-10 bg-white rounded-lg border border-gray-300 px-4 gap-2 hover:border-gray-400 transition-colors">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for categories, chapter, registrant ID"
              className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder:text-gray-400 placeholder:italic"
              autoComplete="off"
            />
            <Search size={18} className="text-gray-400 flex-shrink-0" />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Dropdown value={selectedCategory} onChange={setSelectedCategory} placeholder="Categories" width="w-36" options={CATEGORY_OPTIONS} />
            <Dropdown value={selectedChapter}  onChange={setSelectedChapter}  placeholder="Chapter"    width="w-32" options={CHAPTER_OPTIONS} />
            <Dropdown value={selectedDate}     onChange={setSelectedDate}     placeholder="Date"       width="w-28" options={DATE_SORT_OPTIONS} />
          </div>
        </div>

        {/* Table — horizontal scroll on small screens */}
        <div className="w-full rounded-lg overflow-x-auto border border-gray-300">
          {/* Header */}
          <div className="grid grid-cols-[110px_1fr_130px_110px_160px_130px_150px] bg-[#cf2031] min-w-[900px]">
            {TABLE_COLUMNS.map((col) => (
              <div
                key={col}
                className="py-4 px-3 text-center text-white font-extrabold text-xs leading-tight"
              >
                {col}
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="min-w-[900px]">
            {filteredTrainings.length === 0 ? (
              <div className="bg-white py-16 text-center text-gray-400 text-sm">
                No trainings match your search or filter.
              </div>
            ) : (
              filteredTrainings.map((training, index) => (
                <TrainingRow
                  key={training.requestId}
                  training={training}
                  isApplied={appliedIds.has(training.requestId)}
                  isFirst={index === 0}
                  onApply={handleApplyClick}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}