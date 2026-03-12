import { useState } from "react";
import { useTrainers, Trainer } from "@/hooks/useTrainer";
import { supabase } from "@/lib/supabase/Client";

interface TrainerListModalProps {
  requestId: string;
  onClose: () => void;
  onAssigned: () => void;
}

export const TrainerListModal = ({ requestId, onClose, onAssigned }: TrainerListModalProps) => {
  const { trainers, isLoading, error } = useTrainers();
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [assigning, setAssigning] = useState(false);

  const handleAssign = async () => {
    if (!selectedTrainer) return;
    setAssigning(true);

    const { error } = await supabase
      .from("training_request")
      .update({ trainer: `${selectedTrainer.first_name} ${selectedTrainer.last_name}`})
      .eq("id", requestId);

    setAssigning(false);
    if (!error) {
      onAssigned();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40">
      <div className="w-[340px] h-full bg-white shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-[18px] font-bold text-gray-800">Trainer List</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl font-bold">✕</button>
        </div>

        {/* Trainer List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {isLoading ? (
            <p className="text-center text-gray-400 text-sm mt-8">Loading trainers...</p>
          ) : error ? (
            <p className="text-center text-red-400 text-sm mt-8">{error}</p>
          ) : (
            trainers.map((trainer) => (
              <button
                key={trainer.id}
                onClick={() => setSelectedTrainer(trainer)}
                className={`flex items-center gap-4 p-3 rounded-[8px] border text-left transition-colors ${
                  selectedTrainer?.id === trainer.id
                    ? "border-[#cf2031] bg-red-50"
                    : "border-gray-200 hover:border-[#cf2031]"
                }`}
              >
                <img
                  src={trainer.image === "EMPTY" ? "/trainer.svg" : trainer.image}
                  alt={`${trainer.first_name} ${trainer.last_name}`}
                  className="w-12 h-12 rounded-full object-cover bg-gray-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-800">
                    {trainer.first_name} {trainer.last_name}
                  </p>
                  <p className="text-[11px] text-gray-500">{trainer.chapter}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-gray-400">Preferred Category:</p>
                  <p className="text-[10px] font-semibold text-gray-700">{trainer.preferred_category}</p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t">
          <button
            onClick={handleAssign}
            disabled={!selectedTrainer || assigning}
            className="w-full py-3 bg-[#cf2031] text-white font-bold rounded-[8px] hover:bg-[#b01c2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {assigning ? "Assigning..." : "Assign Trainer"}
          </button>
        </div>

      </div>
    </div>
  );
};