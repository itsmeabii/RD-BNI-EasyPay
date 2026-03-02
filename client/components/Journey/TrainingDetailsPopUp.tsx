import { WorkshopEvent } from "@/data/Journey";
import { Training } from "@/data/Training";
import { Star, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart, CartItem } from "@/context/CartContext";

type DetailsPopupProps = {
  training: Training;
  event: WorkshopEvent;
  onClose: () => void;
};

export default function TrainingDetailsPopUp({ training, event, onClose }: DetailsPopupProps) {
  const navigate = useNavigate();
  const { addToCart, checkoutSingle } = useCart();
  const firstDate = training.dates[0]?.date ?? "TBD";
  const year = firstDate !== "TBD" ? new Date(firstDate).getFullYear() : "";
  const firstTime = training.dates[0]?.time ?? "";
  const today = new Date();
  const trainingDate = firstDate !== "TBD" ? new Date(firstDate) : null;

  const derivedStatus = training.completed
    ? "Done"
    : trainingDate && trainingDate.getTime() === today.getTime()
    ? "Ongoing"
    : trainingDate && trainingDate < today
    ? "Missed"
    : "Pending";

  const isOngoingOrDone = derivedStatus === "Ongoing" || derivedStatus === "Done";

  const cartItem: CartItem = {
  id: training.id,
  title: training.title,
  price: training.price,
  thumbnail: training.thumbnail,
  selectedDate: firstDate,
  selectedTime: firstTime,
};

  const handleAddToCart = () => {
    addToCart(cartItem);
  };

  const handleCheckoutNow = () => {
    checkoutSingle(cartItem);
    navigate("/checkout");
  };

  return (
    <div
      className="bg-white/85 rounded-md rounded-tl-3xl shadow-2xl w-[260px] max-h-[80%] overflow-y-auto border-b-4 border-bni-red"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative flex items-center justify-center px-4 py-3 border-b border-gray-100">
        <span className="text-xl font-bold text-bni-red">Details</span>
        <button onClick={onClose} className="absolute right-4 text-gray-400 hover:text-gray-600 transition">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 py-3 space-y-3">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Program</p>
          <p className="text-sm font-bold text-bni-red leading-snug">{training.title} ({training.code})</p>
          {year && <p className="text-sm font-bold text-bni-red">{year}</p>}
        </div>

        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Date</p>
          <p className="text-sm text-gray-700">{firstDate}</p>
        </div>

        <div className="flex gap-0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-gray-300" />
          ))}
        </div>

        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Status</p>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            derivedStatus === "Done" ? "bg-green-100 text-green-700"
            : derivedStatus === "Ongoing" ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-500"
          }`}>
            {derivedStatus}
          </span>
          {isOngoingOrDone && (
            <p className="text-[9px] text-gray-400 mt-1.5 leading-tight">
              Ongoing & Done trainings cannot be added to cart.
            </p>
          )}
        </div>

        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Description</p>
          <p className="text-xs text-gray-600 leading-snug line-clamp-4">{training.description}</p>
        </div>
      </div>

      {!isOngoingOrDone && (
        <div className="flex gap-2 px-2 pb-4 pt-1">
          <button
            onClick={handleAddToCart}
            className="flex-1 text-xs font-semibold border bg-bni-red border-bni-red text-bni-white rounded px-3 py-1.5 hover:bg-[#a93226] transition"
          >
            Add to Cart
          </button>
          <button
            onClick={handleCheckoutNow}
            className="flex-1 text-xs font-semibold bg-bni-red text-white rounded px-3 py-1 hover:bg-[#a93226] transition"
          >
            Checkout Now
          </button>
        </div>
      )}
    </div>
  );
}