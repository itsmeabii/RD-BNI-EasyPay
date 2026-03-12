import { X } from "lucide-react";
import { TrainingRecord } from "@/types/TrainerType";

type TrainingDetailsDrawerProps = {
  record: TrainingRecord;
  onClose: () => void;
};

export function ViewRecordTrainingDetail({ record, onClose }: TrainingDetailsDrawerProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[49]" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-[615px] bg-white shadow-xl z-[50] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Training Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
          {record.trainingThumbnail && (
            <div className="flex justify-center">
              <img
                src={record.trainingThumbnail}
                alt={record.trainingTitle}
                className="w-48 h-40 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 font-semibold">Program Title</p>
                <p className="text-bni-red font-bold">{record.trainingTitle}</p>
              </div>
              {record.requestId && (
                <div className="flex flex-col gap-1 text-right">
                  <p className="text-xs text-gray-500 font-semibold">Request ID</p>
                  <p className="text-sm text-gray-700">{record.requestId}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-500 font-semibold">Category</p>
              <p className="text-sm text-gray-700">{record.trainingCode}</p>
            </div>

            {record.trainingDescription && (
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 font-semibold">Description</p>
                <p className="text-sm text-gray-700">{record.trainingDescription}</p>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-500 font-semibold">Status</p>
              <p className="text-sm text-gray-700">{record.status}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400">Requested At</p>
              <p className="text-xs font-semibold text-gray-700">{record.createdAt || "—"}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400">Time Approved</p>
              <p className="text-xs font-semibold text-gray-700">—</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400">Proposed Date</p>
              <p className="text-xs font-semibold text-gray-700">{record.proposedDate || "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}