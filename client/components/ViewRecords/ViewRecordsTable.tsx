import { useState, useEffect } from "react";
import { Archive } from "lucide-react";
import { fetchTrainerRecords, archiveTrainerRecord } from "@/lib/utils/Trainer/TrainerUtils";
import { TrainingRecord } from "@/types/TrainerType";
import { ViewRecordsSkeleton } from "@/components/ViewRecords/ViewRecordsSkeleton";
import { VIEW_RECORDS_COLUMNS } from "@/constants/Records";
import { ViewRecordTrainingDetail } from "./ViewRecordTrainingDetail";
import { SearchAndFilters } from "@/components/SearchAndFilter";
import { MONTHS } from "@/constants/Training";

function StatusBadge({ status }: { status: string }) {
  if (status === "Done")
    return <span className="text-bni-red font-bold">Done</span>;
  if (status === "Pending")
    return <span className="text-gray-500 font-semibold">Pending</span>;
  return <span className="text-gray-400 font-semibold">Cancelled</span>;
}

type ViewRecordsTableProps = {
  trainerId: number;
};

export function ViewRecordsTable({ trainerId }: ViewRecordsTableProps) {
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<TrainingRecord | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    if (!trainerId) return;
    fetchTrainerRecords(trainerId).then((data) => {
      setRecords(data);
      setLoading(false);
    });
  }, [trainerId]);

  const filtered = records.filter((r) => {
    const q = search.toLowerCase();
    const matchesSearch =
      (r.requestId ?? "").toLowerCase().includes(q) ||
      (r.trainingTitle ?? "").toLowerCase().includes(q) ||
      (r.trainingCode ?? "").toLowerCase().includes(q) ||
      (r.status ?? "").toLowerCase().includes(q);

    const matchesCategory = selectedCategory ? r.trainingCode === selectedCategory : true;
    const matchesType = selectedType ? r.trainingType === selectedType : true;
    const matchesMonth = selectedMonth
      ? new Date(r.proposedDate).toLocaleString("default", { month: "long" }) === selectedMonth
      : true;

    return matchesSearch && matchesCategory && matchesType && matchesMonth;
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <SearchAndFilters
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search records..."
        filters={[
          {
            value: selectedCategory,
            onChange: setSelectedCategory,
            placeholder: "Category",
            width: "w-[150px]",
            options: [...new Set(records.map((r) => r.trainingCode))].filter(Boolean).map((c) => ({ label: c, value: c })),
          },
          {
            value: selectedType,
            onChange: setSelectedType,
            placeholder: "Type",
            width: "w-[130px]",
            options: [
              { label: "Regular", value: "regular" },
              { label: "Custom", value: "custom" },
            ],
          },
          {
            value: selectedMonth,
            onChange: setSelectedMonth,
            placeholder: "Month",
            width: "w-[130px]",
            options: MONTHS.map((m) => ({ label: m, value: m })),
            scrollable: true,
          },
        ]}
      />

      {loading ? (
        <ViewRecordsSkeleton />
      ) : (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-bni-red text-white">
                {VIEW_RECORDS_COLUMNS.map((col) => (
                  <th key={col} className="px-4 py-3 font-semibold whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-gray-400">No records found.</td>
                </tr>
              )}
              {filtered.map((record, index) => (
                <tr key={record.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3">
                    {record.trainingType === "custom" ? record.requestId : `TR-${String(record.trainingId).padStart(3, '0')}`}
                  </td>
                  <td className="px-4 py-3">
                    <span>
                      {record.trainingType === "custom" ? "Custom" : "Regular"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{record.proposedDate}</td>
                  <td className="px-4 py-3">{record.trainingTitle}</td>
                  <td className="px-4 py-3">{record.trainingCode}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="text-bni-red hover:underline"
                    >
                      View more details
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={async () => {
                        const success = await archiveTrainerRecord(record.id);
                        if (success) {
                          setRecords((prev) => prev.filter((r) => r.id !== record.id));
                        }
                      }}
                      className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition mx-auto"
                    >
                      <Archive className="w-5 h-5 text-bni-red" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedRecord && (
            <ViewRecordTrainingDetail
              record={selectedRecord}
              onClose={() => setSelectedRecord(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}