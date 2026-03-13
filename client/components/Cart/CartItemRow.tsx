import { Trash2 } from "lucide-react";
import { CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils/Formatter";
import { useCart } from "@/context/CartContext";

interface CartItemRowProps {
  item: CartItem;
  onRemove: (id: number) => void;
}

export default function CartItemRow({ item, onRemove }: CartItemRowProps) {
  const { updateQty } = useCart();
  const isMerchandise = item.itemType === "merchandise";

  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-none">
      {/* Thumbnail */}
      <img
        src={item.thumbnail}
        alt={item.title}
        width={80}
        height={80}
        className="w-20 h-20 object-contain rounded flex-shrink-0"
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

        {/* Color */}
        {item.color && (
          <p className="text-xs text-gray-500 mb-1">Color: {item.color}</p>
        )}

        <p className="text-sm font-semibold text-gray-800">
          {formatPrice(item.price)}
        </p>

        {/* Qty controls - merchandise only */}
        {isMerchandise && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => updateQty(item.id, (item.qty ?? 1) - 1)}
              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition text-sm"
            >
              -
            </button>
            <span className="text-sm font-semibold w-4 text-center">{item.qty ?? 1}</span>
            <button
              onClick={() => updateQty(item.id, (item.qty ?? 1) + 1)}
              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition text-sm"
            >
              +
            </button>
          </div>
        )}
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