import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Trainer, TrainerListDrawerProps } from "@/types/TrainerTypes";
import TrainerCard from "@/components/Trainer/TrainerCard";
import { fetchTrainers } from "@/lib/utils/TrainerUtils";

export function AssignTrainerDrawer({ isOpen, onClose, onAssign }: TrainerListDrawerProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        setLoading(true);
        fetchTrainers().then((data) => {
            setTrainers(data);
            setLoading(false);
        });
    }, [isOpen]);

    if (!isOpen) return null;

    const selectedTrainer = trainers.find((t) => t.id === selectedId) ?? null;

    function handleAssign() {
        if (!selectedTrainer) return;
        onAssign(selectedTrainer); 
        setSelectedId(null);       
        onClose();               
    }

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Trainer List</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Trainer list */}
                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
                    {loading && (
                        <p className="text-sm text-gray-400 text-center">Loading trainers...</p>
                    )}
                    {!loading && trainers.length === 0 && (
                        <p className="text-sm text-gray-400 text-center">No trainers available.</p>
                    )}
                    {!loading && trainers.map((trainer) => (
                        <TrainerCard
                            key={trainer.id}
                            trainer={trainer}
                            selected={selectedId === trainer.id}
                            onClick={() => setSelectedId(
                                selectedId === trainer.id ? null : trainer.id
                            )}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t">
                    <button
                        onClick={handleAssign}
                        disabled={!selectedId}
                        className="w-full bg-bni-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Assign Trainer
                    </button>
                </div>
            </div>
        </>
    );
}