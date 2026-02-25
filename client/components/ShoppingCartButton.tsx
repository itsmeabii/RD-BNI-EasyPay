import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function ShoppingCartButton() {
  const {totalCount, openCart, isCartOpen} = useCart();
  if (isCartOpen) return null;
  return (
    <button 
    onClick={openCart}
    className="fixed right-10 bottom-0 -translate-y-1/2 bg-bni-red text-white rounded-full p-3 lg:p-4 hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center">
      <ShoppingCart className="w-5 h-5 lg:w-8 lg:h-8" />
      {totalCount >= 0 && (
        <span className="fixed -top-1 -left-1 bg-bni-red text-bni-white rounded-full w-4 h-4xs lg:w-6 lg:h-6 flex items-center justify-center text-xs font-bold">
          {totalCount}
        </span>
      )}
    </button>
  );
}