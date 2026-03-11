import { useState } from "react";
import { AssignTrainerDrawer } from "@/components/Trainer/AssignTrainerDrawer";
import {TrainerListTable} from "../../components/Trainer/TrainingListTable";

export default function TrainerListPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-10">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-bni-red text-white font-bold px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Assign Trainer
      </button>

      <AssignTrainerDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAssign={(trainer) => {
          console.log("Assigned:", trainer);
          setIsOpen(false);
        }}
      />

      <TrainerListTable />
    </div>
  );
}