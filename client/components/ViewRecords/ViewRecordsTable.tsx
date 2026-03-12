import { useState, useEffect } from "react";
import { Search, ChevronDown, Trash2 } from "lucide-react";
import { fetchTrainerRecords } from "@/lib/utils/Trainer/TrainerUtils";
import { TrainingRecord } from "@/types/TrainerType";
import { ViewRecordsSkeleton } from "@/components/ViewRecords/ViewRecordsSkeleton";

function StatusBadge({ status }: { status: string }) {
  if (status === "Done")
    return <span className="text-bni-red font-bold">Done</span>;
  if (status === "Pending")
    return <span className="text-gray-500 font-semibold">Pending</span>;
  return <span className="text-gray-400 font-semibold">Cancelled</span>;
}

type ViewRecordsTableProps = {
  trainerId: number;
  trainerName?: string;
  trainerCode?: string;
};

export function ViewRecordsTable({ trainerId, trainerName, trainerCode }: ViewRecordsTableProps) {
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!trainerId) return;
    fetchTrainerRecords(trainerId).then((data) => {
      setRecords(data);
      setLoading(false);
    });
  }, [trainerId]);

  const filtered = records.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.requestId.toLowerCase().includes(q) ||
      r.trainingTitle.toLowerCase().includes(q) ||
      r.trainingCode.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table */}
      {loading ? (
        <ViewRecordsSkeleton />
      ) : (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-bni-red text-white">
                {["Request ID", "Proposed Date", "Training", "Category", "Training Record", "Status", "Action"].map((col) => (
                  <th key={col} className="px-4 py-3 font-semibold whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-gray-400">No records found.</td>
                </tr>
              )}
              {filtered.map((record, index) => (
                <tr key={record.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3">{record.requestId}</td>
                  <td className="px-4 py-3">{record.proposedDate}</td>
                  <td className="px-4 py-3">{record.trainingTitle}</td>
                  <td className="px-4 py-3">{record.trainingCode}</td>
                  <td className="px-4 py-3">
                    <button className="text-bni-red hover:underline">View more details</button>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="px-4 py-3">
                    <button className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition mx-auto">
                      <Trash2 className="w-4 h-4 text-bni-red" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}