import { useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/Training";
import CartItemRow from "@/components/Cart/CartItemRow";
import YouMightAlsoLike from "@/components/Cart/YouMightAlsoLike";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, removeFromCart, clearCart, totalCount, totalPrice, isCartOpen, closeCart } =
    useCart();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">My cart</h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-800 transition"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-20">
              <p className="text-3xl font-semibold text-gray-500 mb-2">Your cart is empty.</p>
              <p className="text-md">Looks like you haven't made a choice yet.</p>
              <ShoppingCart className="mt-2 w-20 h-20 text-gray-500"/>
              <Link to="/training" onClick={closeCart} className="mt-2 underline text-gray-500">Shop Now
              </Link>
            </div>
          ) : (
            <>
              {/* Cart items list */}
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100">
            {/* You might also like */}
            <div className="mt-4 mb-2">
            <YouMightAlsoLike />
            </div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-800">
                Total ({totalCount} {totalCount === 1 ? "item" : "items"}):
                </span>
                <span className="text-lg font-bold text-gray-900">
                {formatPrice(totalPrice)}
                </span>
            </div>
            <button 
                disabled={items.length <= 0}
                className="w-full bg-bni-red text-white font-bold py-4 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition text-base">
                Checkout Now
            </button>
        </div>  
      </div>
    </>
  );
}