import { Trainer } from "@/types/TrainerTypes";

export default function TrainerCard({
  trainer,
  selected,
  onClick,
}: {
  trainer: Trainer;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition shadow-md [box-shadow:0_4px_6px_-1px_rgba(0,0,0,0.3)] ${
        selected ? "border-bni-red bg-red-50" : "border-gray-200 hover:border-gray-300"
        }`}
    >
      <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
        {trainer.image ? (
          <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm font-bold">
            {trainer.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">{trainer.name}</p>
        <p className="text-xs text-gray-500">{trainer.chapter}</p>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-400">Preferred Category:</p>
        <p className="text-xs font-semibold text-gray-700">{trainer.preferredCategory}</p>
      </div>
    </div>
  );
}
