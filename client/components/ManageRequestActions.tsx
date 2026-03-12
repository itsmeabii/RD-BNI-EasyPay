import { Check, X } from "lucide-react";
import { supabase } from "@/lib/supabase/Client";

interface ManageRequestActionsProps {
  requestId: string;
  trainer: string | null;
  status: string;
  onUpdated: () => void;
}

export const ManageRequestActions = ({
  requestId,
  trainer,
  status,
  onUpdated,
}: ManageRequestActionsProps) => {
  if (!trainer) {
    return <span className="text-gray-400 text-[13px]">Pending</span>;
  }

  if (status === "Approved") {
    return <span className="text-green-600 text-[13px] font-semibold">Approved</span>;
  }

  if (status === "Rejected") {
    return <span className="text-red-500 text-[13px] font-semibold">Rejected</span>;
  }

  const handleReject = async () => {
    await supabase
      .from("training_request")
      .update({ status: "Rejected" })
      .eq("id", requestId);
    onUpdated();
  };

  const handleApprove = async () => {
    await supabase
      .from("training_request")
      .update({ status: "Approved", time_approved: new Date().toISOString() })
      .eq("id", requestId);
    onUpdated();
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={handleReject}
        className="w-7 h-7 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={handleApprove}
        className="w-7 h-7 rounded-full bg-[#cf2031] hover:bg-[#b01c2a] flex items-center justify-center transition-colors"
      >
        <Check className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};