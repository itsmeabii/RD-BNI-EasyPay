import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase/Client";
import { TrainingRequest } from "@/hooks/useCustomTraining";

interface Training {
  id: number;
  title: string;
  code: string;
  description: string;
  key_topics: string;
  outcomes: string;
  price: number;
  thumbnail: string;
  category: string;
}

interface TrainingDetailModalProps {
  request: TrainingRequest;
  onClose: () => void;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;
}

export const TrainingDetailModal = ({ request, onClose }: TrainingDetailModalProps) => {
  const [training, setTraining] = useState<Training | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTraining = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("trainings")
        .select("*")
        .eq("category", request.category)
        .single();
      setTraining(data ?? null);
      setLoading(false);
    };
    fetchTraining();
  }, [request.category]);

  const title = training?.title ?? request.training;
  const description = training?.description ?? "No Description Available";
  const thumbnail = training?.thumbnail ?? null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40">
      <div className="w-[550px] h-full bg-white shadow-xl flex flex-col overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-[18px] font-bold text-gray-800">Training Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Loading...</div>
        ) : (
          <div className="flex-1 px-6 py-6 flex flex-col gap-5">

            {/* Thumbnail */}
            <div className="flex justify-center">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-[200px] h-[140px] object-cover rounded-[8px]"
                />
              ) : (
                <div className="w-[200px] h-[140px] bg-[#cf2031] rounded-[8px] flex items-center justify-center">
                  <span className="text-white font-bold text-[16px] text-center px-4">{title}</span>
                </div>
              )}
            </div>

            {/* Title + Request ID */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="text-[11px] text-gray-400 font-semibold mb-1">Training Title</p>
                <p className="text-[15px] font-bold text-[#cf2031]">{title}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-400 font-semibold mb-1">Request ID</p>
                <p className="text-[14px] font-bold text-gray-800">{request.id.replace("RQ-0", "RQ - 0")}</p>
              </div>
            </div>

            {/* Category */}
            <div>
              <p className="text-[11px] text-gray-400 font-semibold mb-1">Category</p>
              <p className="text-[14px] text-gray-800">{request.category || "—"}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-[11px] text-gray-400 font-semibold mb-1">Training Description</p>
              <p className="text-[13px] text-gray-700 leading-relaxed">{description}</p>
            </div>

            {/* Request Note */}
            {request.request_note && (
              <div>
                <p className="text-[11px] text-gray-400 font-semibold mb-1">Request Note</p>
                <p className="text-[13px] text-gray-700 leading-relaxed">{request.request_note}</p>
              </div>
            )}

            {/* LT Name */}
            <div>
              <p className="text-[11px] text-gray-400 font-semibold mb-1">Leadership Team Name</p>
              <p className="text-[14px] text-gray-800">{request.lt_name}</p>
            </div>

            {/* Chapter */}
            <div>
              <p className="text-[11px] text-gray-400 font-semibold mb-1">Chapter</p>
              <p className="text-[14px] text-gray-800">{request.chapter}</p>
            </div>

            {/* Dates footer */}
            <div className="mt-auto border border-gray-200 rounded-[8px] p-4 flex justify-between gap-2">
              <div>
                <p className="text-[11px] text-gray-400 font-semibold mb-1">Requested At</p>
                <p className="text-[13px] font-bold text-gray-800">{formatDate(request.requested_at)}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-semibold mb-1">Time Approved</p>
                <p className="text-[13px] font-bold text-gray-800">{formatDate(request.time_approved ?? "")}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-semibold mb-1">Proposed Date</p>
                <p className="text-[13px] font-bold text-gray-800">{formatDate(request.proposed_date)}</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};