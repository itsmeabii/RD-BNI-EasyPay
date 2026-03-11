import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { approveTrainer, fetchTrainers, rejectTrainer } from "@/lib/utils/TrainerUtils";
import { Trainer } from "@/types/TrainerTypes";
import { TrainerEditModal } from "@/components/Trainer/TrainerEditModal";
import { TrainerListSkeleton } from "./TrainerListSkeleton";

function AvailabilityBadge({ availability }: { availability: string | null }) {
  if (availability === "Fully Booked")
    return <span className="text-bni-red font-bold">Fully Booked</span>;
  if (availability === "Accepting Training")
    return <span className="text-green-500 font-bold">Accepting Training</span>;
  if (availability === "Pending")
    return <span className="text-gray-500 font-semibold">Pending</span>;
  return <span className="text-gray-400 font-semibold">Rejected</span>; 
}

function ActionCell({
  trainer,
  onApprove,
  onReject,
  onEdit,
}: {
  trainer: Trainer;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onEdit: (id: number) => void;
}) {
  if (trainer.availability === "Pending") {
    return (
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onReject(trainer.id)}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={() => onApprove(trainer.id)}
          className="w-8 h-8 rounded-full bg-bni-red flex items-center justify-center hover:bg-red-700 transition"
        >
          <Check className="w-4 h-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => onEdit(trainer.id)}
        className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition"
      >
        <Pencil className="w-4 h-4 text-bni-red" />
      </button>
    </div>
  );
}

export const TrainerListTable = forwardRef((_, ref) => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);

  async function loadTrainers() {
    setLoading(true);
    const data = await fetchTrainers();
    setTrainers(data);
    setLoading(false);
  }

  useImperativeHandle(ref, () => ({
    refetch: loadTrainers, 
  }));

  useEffect(() => {
    loadTrainers(); 
  }, []);

    async function handleApprove(id: number) {
        const success = await approveTrainer(id);
        if (success) {
            setTrainers((prev) =>
            prev.map((t) => t.id === id ? { ...t, availability: "Accepting Training" } : t)
            );
        }
    }

    async function handleReject(id: number) {
        const success = await rejectTrainer(id);
        if (success) {
            setTrainers((prev) =>
            prev.map((t) => t.id === id ? { ...t, availability: null } : t)
            );
        }
    }

  const filtered = trainers.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.trainerId.toLowerCase().includes(q) ||
      t.firstName.toLowerCase().includes(q) ||
      t.lastName.toLowerCase().includes(q) ||
      t.chapter.toLowerCase().includes(q) ||
      t.preferredCategory.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {loading ? (
        <TrainerListSkeleton />
      ) : (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-bni-red text-white">
                {["Trainer ID", "First Name", "Last Name", "Chapter", "Preferred Training", "Training Record", "Availability", "Action"].map((col) => (
                  <th key={col} className="px-4 py-3 font-semibold whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-gray-400">No trainers found.</td>
                </tr>
              )}
              {filtered.map((trainer, index) => (
                <tr key={trainer.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3">{trainer.trainerId}</td>
                  <td className="px-4 py-3">{trainer.firstName}</td>
                  <td className="px-4 py-3">{trainer.lastName}</td>
                  <td className="px-4 py-3">{trainer.chapter}</td>
                  <td className="px-4 py-3">{trainer.preferredCategory}</td>
                  <td className="px-4 py-3">
                    <button className="text-bni-red hover:underline">View Record</button>
                  </td>
                  <td className="px-4 py-3">
                    <AvailabilityBadge availability={trainer.availability} />
                  </td>
                  <td className="px-4 py-3">
                    <ActionCell
                      trainer={trainer}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onEdit={(id) => setEditingTrainer(trainers.find((t) => t.id === id) ?? null)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingTrainer && (
            <TrainerEditModal
              trainer={editingTrainer}
              onClose={() => setEditingTrainer(null)}
              onSave={(updated) => setTrainers((prev) =>
                prev.map((t) => t.id === updated.id ? updated : t)
              )}
              onDelete={(id) => setTrainers((prev) => prev.filter((t) => t.id !== id))}
            />
          )}
        </div>
      )}
    </div>
);
});