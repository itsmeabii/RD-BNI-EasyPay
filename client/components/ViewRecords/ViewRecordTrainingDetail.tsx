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

        <div className="flex-1 overflow-y-auto flex flex-col gap-6">
          {record.trainingThumbnail && (
            <div className="flex justify-center pt-6">
              <img
                src={record.trainingThumbnail}
                alt={record.trainingTitle}
                className="w-50 h-50 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="flex flex-col gap-4 border-t border-gray-200 pt-4 px-6">
            {/* Program Title + ID */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-black font-semibold">Program Title</p>
                <p className="text-bni-red font-bold">{record.trainingTitle}</p>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <p className="text-sm text-black font-semibold">
                  {record.trainingType === "custom" ? "Request ID" : "Training ID"}
                </p>
                <p className="text-sm text-black">
                  {record.trainingType === "custom"
                    ? record.requestId
                    : `TR-${String(record.trainingId).padStart(3, '0')}`}
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <p className="text-sm text-black font-semibold">Category</p>
              <p className="text-sm text-black">{record.trainingCode}</p>
            </div>

            {/* Description */}
            {record.trainingDescription && (
              <div className="flex flex-col gap-1">
                <p className="text-sm text-black font-semibold">Description</p>
                <p className="text-sm text-black">{record.trainingDescription}</p>
              </div>
            )}

            {/* Leadership Team Name - only for custom */}
            {record.trainingType === "custom" && record.ltName && (
              <div className="flex flex-col gap-1">
                <p className="text-sm text-black font-semibold">Leadership Team Name</p>
                <p className="text-sm text-black">{record.ltName}</p>
              </div>
            )}

            {/* Chapter - only if has data */}
            {record.chapter && (
              <div className="flex flex-col gap-1">
                <p className="text-sm text-black font-semibold">Chapter</p>
                <p className="text-sm text-black">{record.chapter}</p>
              </div>
            )}

            {/* Footer dates */}
            <div className="grid grid-cols-3 gap-3 border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-black">Requested At</p>
                <p className="text-xs font-semibold text-black">{record.createdAt || "—"}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-black">Time Approved</p>
                <p className="text-xs font-semibold text-black">{record.timeApproved || "—"}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-black">Proposed Date</p>
                <p className="text-xs font-semibold text-black">{record.proposedDate || "—"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}