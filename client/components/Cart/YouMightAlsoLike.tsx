import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trainings } from "@/data/Training";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/Training";

export default function YouMightAlsoLike() {
  const { items } = useCart();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show trainings not already in cart
  const suggestions = trainings.filter(
    (t) => !items.some((i) => i.id === t.id)
  );

  if (suggestions.length === 0) return null;

  const suggestion = suggestions[currentIndex % suggestions.length];

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-bni-red text-white text-xs font-bold text-center py-2 tracking-widest">
        YOU MIGHT ALSO LIKE:
      </div>

      {/* Suggestion card */}
      <div className="flex items-center gap-3 p-3">
        <img
          src={suggestion.thumbnail}
          alt={suggestion.title}
          width={64}
          height={64}
          className="w-16 h-16 object-cover rounded flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-snug mb-1 truncate">
            {suggestion.title}
          </p>
          <p className="text-xs text-gray-600">{formatPrice(suggestion.price)}</p>
        </div>
        <button
          onClick={() => { navigate(`/training/${suggestion.id}`); }}
          className="text-xs font-semibold text-bni-red border border-bni-red rounded px-3 py-1.5 hover:bg-red-50 transition whitespace-nowrap flex-shrink-0"
        >
          Select Options
        </button>
      </div>

      {/* Pagination dots */}
      {suggestions.length > 1 && (
        <div className="flex justify-center gap-1.5 pb-3">
          {suggestions.slice(0, Math.min(suggestions.length, 5)).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex % suggestions.length
                  ? "bg-bni-red"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}