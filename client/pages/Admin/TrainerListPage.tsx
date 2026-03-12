import { AddTrainerModal } from "@/components/Trainer/AddTrainerModal";
import { TrainerListTable } from "@/components/Trainer/TrainingListTable";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";

export default function TrainerListPage() {
  const tableRef = useRef<{ refetch: () => void }>(null);
  const [showAdd, setShowAdd] = useState(false);
  const context = useOutletContext<{ setPageTitle?: (t: string) => void }>();

  useEffect(() => {
    context?.setPageTitle?.("Trainer List");
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-end">
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
          onAdd={() => {
            setShowAdd(false);
            tableRef.current?.refetch();
          }}
        />
      )}
    </div>
  );
}