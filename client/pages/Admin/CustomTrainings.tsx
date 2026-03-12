import { useState, useMemo } from "react";
import { Pencil } from "lucide-react";
import { SearchAndFilters } from "@/components/SearchAndFilter";
import { CATEGORY_OPTIONS, CHAPTERS, MONTH_OPTIONS } from "@/constants/Training";
import { TrainingRequest, useCustomTrainings } from "@/hooks/useCustomTraining";
import { TrainerListModal } from "@/components/TrainerListModal";
import { ProposedDateModal } from "@/components/ProposedDateModal";
import { EditTrainerModal } from "@/components/EditTrainerModal";
import { TrainingDetailModal } from "@/components/TrainingDetailModal";
import { ManageRequestActions } from "@/components/ManageRequestActions";

const CHAPTER_OPTIONS = CHAPTERS.map((c) => ({ label: c, value: c }));

const TABLE_COLUMNS = [
  "Request ID", "Chapter", "Category", "Training",
  "No. of Attendees", "Proposed Date", "Trainer", "Manage Request",
];

const GRID_COLS = "100px 180px 70px 170px 130px 140px 190px 140px";

const FULL_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function formatProposedDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const month = FULL_MONTHS[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  return `${month} ${day}, ${year} ${hours}:${minutes}${ampm}`;
}

export default function CustomTrainings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [activeDateRequestId, setActiveDateRequestId] = useState<string | null>(null);
  const [activeDateRequest, setActiveDateRequest] = useState<TrainingRequest | null>(null);
  const [editTrainerRequestId, setEditTrainerRequestId] = useState<string | null>(null);
  const [viewTrainingRequest, setViewTrainingRequest] = useState<TrainingRequest | null>(null);

  const { trainings, isLoading, error, refetch } = useCustomTrainings();

  const filteredTrainings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return trainings.filter((t) => {
      const matchesCategory = !selectedCategory || t.category === selectedCategory;
      const matchesChapter  = !selectedChapter  || t.chapter  === selectedChapter;
      const matchesMonth    = !selectedMonth    || t.proposed_date.includes(selectedMonth);
      const matchesSearch   =
        !q ||
        t.training.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.chapter.toLowerCase().includes(q) ||
        t.lt_name.toLowerCase().includes(q);
      return matchesCategory && matchesChapter && matchesMonth && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedChapter, selectedMonth, trainings]);

  return (
    <div className="flex flex-col gap-4">
      <SearchAndFilters
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search for categories, chapter, request ID"
        dropdowns={[
          { value: selectedCategory, onChange: setSelectedCategory, placeholder: "Categories", width: "w-[140px]", options: CATEGORY_OPTIONS },
          { value: selectedChapter, onChange: setSelectedChapter, placeholder: "Chapter", width: "w-[120px]", options: CHAPTER_OPTIONS, scrollable: true },
          { value: selectedMonth, onChange: setSelectedMonth, placeholder: "Month", width: "w-[120px]", options: MONTH_OPTIONS, scrollable: true },
        ]}
      />

      <div className="w-full rounded-[8px] overflow-hidden border border-[#d9d9d9]">
        <div className="grid bg-[#cf2031]" style={{ gridTemplateColumns: GRID_COLS }}>
          {TABLE_COLUMNS.map((col) => (
            <div key={col} className="py-[14px] px-3 text-center text-white font-extrabold text-[11px] leading-tight">
              {col}
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="bg-white py-16 text-center text-gray-400 text-sm">Loading...</div>
        ) : error ? (
          <div className="bg-white py-16 text-center text-red-400 text-sm">{error}</div>
        ) : filteredTrainings.length === 0 ? (
          <div className="bg-white py-16 text-center text-gray-400 text-sm">No trainings match your search or filter.</div>
        ) : (
          filteredTrainings.map((t, index) => (
            <div
              key={t.id}
              className="grid bg-white items-center"
              style={{
                gridTemplateColumns: GRID_COLS,
                borderTop: index === 0 ? "none" : "1px solid #e5e7eb",
                minHeight: "70px",
              }}
            >
              <div className="px-2 text-xs text-center text-gray-600">{t.id}</div>
              <div className="px-2 text-[13px] text-center text-gray-800">{t.chapter}</div>
              <div className="px-2 text-[13px] text-center text-gray-800">{t.category}</div>
              <div className="px-2 text-[13px] text-center">
                <button
                  onClick={() => setViewTrainingRequest(t)}
                  className="text-[#cf2031] underline hover:opacity-75 font-medium text-[13px]"
                >
                  View Training
                </button>
              </div>
              <div className="px-2 text-[13px] text-center text-gray-800">{t.attendees}</div>

              {/* Proposed Date */}
              <div className="px-2 flex items-center gap-2 py-2">
                <div className="flex items-center gap-2 w-full justify-between">
                  <span className="text-[13px] text-gray-800 leading-tight flex-1 text-center">
                    {formatProposedDate(t.proposed_date)}
                  </span>
                  <button
                    onClick={() => { setActiveDateRequestId(t.id); setActiveDateRequest(t); }}
                    className="text-[#cf2031] hover:opacity-75 transition-opacity flex-shrink-0"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trainer */}
              <div className="px-2 flex items-center gap-2 py-2">
                {t.trainer ? (
                  <div className="flex items-center gap-2 w-full justify-between">
                    <span className="text-[13px] text-gray-800 leading-tight flex-1 text-center">{t.trainer}</span>
                    <button
                      onClick={() => setEditTrainerRequestId(t.id)}
                      className="text-[#cf2031] hover:opacity-75 transition-opacity flex-shrink-0"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveRequestId(t.id)}
                    className="flex items-center gap-1 text-[13px] text-[#cf2031] font-semibold hover:opacity-75 transition-opacity mx-auto"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#cf2031] text-white flex items-center justify-center text-[14px] leading-none">+</span>
                    Assign Trainer
                  </button>
                )}
              </div>

              {/* Manage Request */}
              <div className="px-2 text-center">
                <ManageRequestActions
                  requestId={t.id}
                  trainer={t.trainer}
                  status={t.status}
                  onUpdated={refetch}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {viewTrainingRequest && (
        <TrainingDetailModal
          request={viewTrainingRequest}
          onClose={() => setViewTrainingRequest(null)}
        />
      )}

      {activeRequestId && (
        <TrainerListModal
          requestId={activeRequestId}
          onClose={() => setActiveRequestId(null)}
          onAssigned={() => refetch()}
        />
      )}

      {activeDateRequestId && activeDateRequest && (
        <ProposedDateModal
          requestId={activeDateRequestId}
          requestedAt={activeDateRequest.requested_at}
          currentDate={activeDateRequest.proposed_date}
          onClose={() => { setActiveDateRequestId(null); setActiveDateRequest(null); }}
          onUpdated={() => refetch()}
        />
      )}

      {editTrainerRequestId && (
        <EditTrainerModal
          onEdit={() => { setActiveRequestId(editTrainerRequestId); setEditTrainerRequestId(null); }}
          onClose={() => setEditTrainerRequestId(null)}
        />
      )}
    </div>
  );
}