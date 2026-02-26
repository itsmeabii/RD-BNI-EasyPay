import { Trash2 } from "lucide-react";
import { CartItem } from "@/context/CartContext";
import { formatPrice } from "@/data/Training";

interface CartItemRowProps {
  item: CartItem;
  onRemove: (id: number) => void;
}

export default function CartItemRow({ item, onRemove }: CartItemRowProps) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-none">
      {/* Thumbnail */}
      <img
        src={item.thumbnail}
        alt={item.title}
        width={80}
        height={80}
        className="w-20 h-20 object-cover rounded flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-snug mb-1">
          {item.title}
          {item.selectedDate && (
            <span className="font-normal text-gray-600">
              {" "}- {item.selectedDate}
              {item.selectedTime && `; ${item.selectedTime}`}
            </span>
          )}
        </p>
        <p className="text-sm font-semibold text-gray-800">
          {formatPrice(item.price)}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        className="text-gray-400 hover:text-bni-red transition flex-shrink-0 mt-1"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}