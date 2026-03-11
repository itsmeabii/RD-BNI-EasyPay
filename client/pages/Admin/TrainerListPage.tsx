import { AddTrainerModal } from "@/components/Trainer/AddTrainerModal";
import { TrainerListTable } from "@/components/Trainer/TrainingListTable";
import { useState } from "react";
import { useRef } from "react";

export default function TrainerListPage() {
  const tableRef = useRef<{ refetch: () => void }>(null);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Trainer List</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-bni-red text-white font-bold px-5 py-2.5 rounded-lg hover:bg-red-700 transition"
        >
          Add Trainer
        </button>
      </div>

      <TrainerListTable ref={tableRef} />

      {showAdd && (
        <AddTrainerModal
          onClose={() => setShowAdd(false)}
          onAdd={(trainer) => {
            setShowAdd(false);
            tableRef.current?.refetch(); 
          }}
        />
      )}
    </div>
  );
}