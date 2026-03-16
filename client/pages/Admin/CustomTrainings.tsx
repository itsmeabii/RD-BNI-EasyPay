import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Pencil } from "lucide-react";
import { SearchAndFilters } from "@/components/SearchAndFilter";
import {
  CATEGORY_OPTIONS,
  CHAPTERS,
  MONTH_OPTIONS,
  CUSTOM_TRAINING_ADMIN_TABLE_COLUMNS,
  CUSTOM_TRAINING_GRID_COLS,
} from "@/constants/Training";
import { TrainingRequest, useCustomTrainings } from "@/hooks/useCustomTraining";
import { AssignTrainerDrawer } from "@/components/Trainer/AssignTrainerDrawer";
import { ProposedDateModal } from "@/components/CustomTraining/ProposedDateModal";
import { EditTrainerModal } from "@/components/CustomTraining/EditTrainerModal";
import { ViewRecordTrainingDetail } from "@/components/ViewRecords/ViewRecordTrainingDetail";
import { ManageRequestActions } from "@/components/CustomTraining/ManageRequestActions";
import { formatProposedDate } from "@/lib/utils/Formatter";
import { useFilteredTrainings } from "@/hooks/useFilteredTrainings";

const CHAPTER_OPTIONS = CHAPTERS.map((c) => ({ label: c, value: c }));

export default function CustomTrainings() {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (t: string) => void }>();

  useEffect(() => {
    setPageTitle("Training > Custom Training Request");
  }, []);

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

  const filteredTrainings = useFilteredTrainings(
    trainings,
    searchQuery,
    selectedCategory,
    selectedChapter,
    selectedMonth
  );

  return (
    <div className="flex flex-col gap-4">
      <SearchAndFilters
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search for categories, chapter, request ID"
        filters={[
          { value: selectedCategory, onChange: setSelectedCategory, placeholder: "Categories", width: "w-[140px]", options: CATEGORY_OPTIONS },
          { value: selectedChapter, onChange: setSelectedChapter, placeholder: "Chapter", width: "w-[120px]", options: CHAPTER_OPTIONS, scrollable: true },
          { value: selectedMonth, onChange: setSelectedMonth, placeholder: "Month", width: "w-[120px]", options: MONTH_OPTIONS, scrollable: true },
        ]}
      />

      <div className="w-full rounded-[8px] overflow-x-auto border border-[#d9d9d9]">
        <div className="min-w-[900px]">
          <div className="grid bg-[#cf2031]" style={{ gridTemplateColumns: CUSTOM_TRAINING_GRID_COLS }}>
            {CUSTOM_TRAINING_ADMIN_TABLE_COLUMNS.map((col) => (
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
                  gridTemplateColumns: CUSTOM_TRAINING_GRID_COLS,
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
              <div className="flex items-center gap-1 w-full justify-between">
                {t.trainer ? (
                  <>
                    <span className="text-[13px] text-gray-800 leading-tight flex-1 text-center">{t.trainer}</span>
                    {t.status !== "Rejected" && t.status !== "Cancelled" && (
                      <button
                        onClick={() => setEditTrainerRequestId(t.id)}
                        className="text-[#cf2031] hover:opacity-75 transition-opacity flex-shrink-0"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
                  </>
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
            </div>

                {/* Manage Request */}
                <div className="px-2 text-center flex items-center justify-center">
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
      </div>

{viewTrainingRequest && (
  <ViewRecordTrainingDetail
    record={{
      id: 0,
      trainingTitle: viewTrainingRequest.training,
      trainingCode: viewTrainingRequest.category,
      trainingType: "custom",
      requestId: viewTrainingRequest.id,
      trainingId: null,
      ltName: viewTrainingRequest.lt_name,
      chapter: viewTrainingRequest.chapter,
      requestedAt: viewTrainingRequest.requested_at,
      createdAt: viewTrainingRequest.requested_at,
      timeApproved: "—",
      proposedDate: viewTrainingRequest.proposed_date ?? "—",
      trainingThumbnail: "",
      trainingDescription: "",
      status: viewTrainingRequest.status,
      trainerId: 0,
    }}
    onClose={() => setViewTrainingRequest(null)}
  />
)}

      {activeRequestId && (
        <AssignTrainerDrawer
          isOpen={!!activeRequestId}
          requestId={activeRequestId}
          onClose={() => setActiveRequestId(null)}
          onAssign={() => {}}
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
          onEdit={() => { 
            setActiveRequestId(editTrainerRequestId); 
            setEditTrainerRequestId(null); 
          }}
          onClose={() => setEditTrainerRequestId(null)}
        />
      )}
    </div>
  );
}