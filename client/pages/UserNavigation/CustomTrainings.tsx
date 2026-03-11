import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomTraining {
  requestId: string;
  trainingName: string;
  training: string;
  chapter: string;
  proposedDate: string;
  noOfAttendees: number;
}

// Mock Data 

const ALL_CUSTOM_TRAININGS: CustomTraining[] = [
  { requestId: "RQ-001", trainingName: "MSP Fundamentals",  training: "MSP", chapter: "All-Star", proposedDate: "03/19/2026", noOfAttendees: 20 },
  { requestId: "RQ-002", trainingName: "MSP Advanced",      training: "MSP", chapter: "All-Star", proposedDate: "03/19/2026", noOfAttendees: 20 },
  { requestId: "RQ-003", trainingName: "MSP Workshop",      training: "MSP", chapter: "All-Star", proposedDate: "06/20/2026", noOfAttendees: 20 },
  { requestId: "RQ-004", trainingName: "MSP Bootcamp",      training: "MSP", chapter: "All-Star", proposedDate: "07/22/2026", noOfAttendees: 20 },
  { requestId: "RQ-005", trainingName: "MSP Certification", training: "MSP", chapter: "All-Star", proposedDate: "11/22/2026", noOfAttendees: 20 },
];

// ─── Chevron Icon ─────────────────────────────────────────────────────────────

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#817d7d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 pointer-events-none">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Dropdown ─────────────────────────────────────────────────────────────────

interface DropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  width: string;
}

const Dropdown = ({ value, onChange, options, placeholder, width }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative flex-shrink-0 ${width}`}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center w-full h-[38px] bg-white rounded-[8px] border border-[#d9d9d9] px-3 gap-2"
      >
        <span className="flex-1 text-left font-semibold text-[#817d7d] text-[13px] select-none">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown />
      </button>

      {open && (
        <div className="absolute top-[42px] left-0 w-full bg-white border border-[#d9d9d9] rounded-[8px] shadow-lg z-50 overflow-hidden">
          <div
            className="px-3 py-2 text-sm text-[#817d7d] hover:bg-gray-100 cursor-pointer"
            onClick={() => { onChange(""); setOpen(false); }}
          >
            {placeholder}
          </div>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                value === opt.value ? "text-[#cf2031] font-semibold" : "text-gray-700"
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomTrainings() {
  const [searchQuery, setSearchQuery]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChapter, setSelectedChapter]   = useState("");
  const [selectedDate, setSelectedDate]         = useState("");
  const [appliedIds, setAppliedIds]             = useState<Set<string>>(new Set());

  const filteredTrainings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let results = ALL_CUSTOM_TRAININGS.filter((t) => {
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
      results = results.slice().sort(
        (a, b) => new Date(b.proposedDate).getTime() - new Date(a.proposedDate).getTime()
      );
    } else if (selectedDate === "oldest") {
      results = results.slice().sort(
        (a, b) => new Date(a.proposedDate).getTime() - new Date(b.proposedDate).getTime()
      );
    }

    return results;
  }, [searchQuery, selectedCategory, selectedChapter, selectedDate]);

  const handleApply = (requestId: string) => {
    setAppliedIds((prev) => new Set(prev).add(requestId));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[#cf2031] text-[22px] font-bold">Custom Trainings</h1>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center h-[38px] bg-white rounded-[8px] border border-[#d9d9d9] px-4 gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for categories, chapter, registrant ID"
            className="flex-1 bg-transparent border-none outline-none text-[#333] text-[13px] placeholder:text-[#817d7d] placeholder:italic"
            autoComplete="off"
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#817d7d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <Dropdown
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Categories"
          width="w-[140px]"
          options={[
            { label: "MSP", value: "MSP" },
            { label: "AWS", value: "AWS" },
            { label: "AMS", value: "AMS" },
          ]}
        />
        <Dropdown
          value={selectedChapter}
          onChange={setSelectedChapter}
          placeholder="Chapter"
          width="w-[120px]"
          options={[
            { label: "All-Star", value: "All-Star" },
            { label: "Rising",   value: "Rising"   },
          ]}
        />
        <Dropdown
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Date"
          width="w-[100px]"
          options={[
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
          ]}
        />
      </div>

      {/* Table */}
      <div className="w-full rounded-[8px] overflow-hidden" style={{ border: "1px solid #d9d9d9" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "110px 1fr 130px 110px 160px 130px 150px",
            backgroundColor: "#cf2031",
          }}
        >
          {[
            "Request ID",
            "Training Name",
            "Training",
            "Chapter",
            "Proposed Date / Time",
            "No. of Attendees",
            "Trainer Application",
          ].map((col) => (
            <div
              key={col}
              className="py-[14px] px-3 text-center text-white font-extrabold text-[11px] leading-tight"
            >
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {filteredTrainings.length === 0 ? (
          <div className="bg-white py-16 text-center text-gray-400 text-sm">
            No trainings match your search or filter.
          </div>
        ) : (
          filteredTrainings.map((t, index) => (
            <div
              key={t.requestId}
              style={{
                display: "grid",
                gridTemplateColumns: "110px 1fr 130px 110px 160px 130px 150px",
                backgroundColor: "#fff",
                borderTop: index === 0 ? "none" : "1px solid #e5e7eb",
                minHeight: "60px",
                alignItems: "center",
              }}
            >
              <div className="px-3 text-xs text-center text-gray-600">{t.requestId}</div>
              <div className="px-3 text-[13px] text-center text-gray-800">{t.trainingName}</div>
              <div className="px-3 text-[13px] text-center">
                <Link
                  to={`/training/${t.requestId}`}
                  className="text-[#cf2031] underline hover:opacity-75 font-medium"
                >
                  View Training
                </Link>
              </div>
              <div className="px-3 text-[13px] text-center text-gray-800">{t.chapter}</div>
              <div className="px-3 text-[13px] text-center text-gray-800">{t.proposedDate}</div>
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
                    <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[11px] font-bold leading-none">
                      +
                    </span>
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