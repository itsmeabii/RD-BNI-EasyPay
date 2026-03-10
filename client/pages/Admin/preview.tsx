import { useState } from "react";
import { TrainerListDrawer } from "@/pages/Admin/TrainerList";

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

      <TrainerListDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAssign={(trainer) => {
          console.log("Assigned:", trainer);
          setIsOpen(false);
        }}
      />
    </div>
  );
}