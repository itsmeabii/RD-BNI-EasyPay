import { useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/Training";
import CartItemRow from "@/components/Cart/CartItemRow";
import YouMightAlsoLike from "@/components/Cart/YouMightAlsoLike";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    items,
    removeFromCart,
    isCartOpen,
    closeCart,
    checkoutSelected,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
  } = useCart();

  const navigate = useNavigate();

  const allSelected  = items.length > 0 && selectedIds.size === items.length;
  const someSelected = selectedIds.size > 0;

  const selectedItems = items.filter(i => selectedIds.has(i.id));
  const selectedTotal = selectedItems.reduce((sum, i) => sum + i.price * (i.qty ?? 1), 0);
  const selectedCount = selectedItems.length;

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  const handleCheckout = () => {
    const selected = checkoutSelected();
    closeCart();
    navigate("/checkout", { state: { checkoutItems: selected } });
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={closeCart} />

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

        {/* Select all row */}
        {items.length > 0 && (
          <div className="flex items-center gap-3 px-6 py-2.5 border-b border-gray-100 bg-gray-50">
            <input
              type="checkbox"
              id="select-all"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="w-4 h-4 accent-bni-red cursor-pointer rounded"
            />
            <label
              htmlFor="select-all"
              className="text-sm font-semibold text-gray-500 cursor-pointer select-none"
            >
              Select All ({items.length})
            </label>
            {someSelected && (
              <span className="ml-auto text-xs font-semibold text-bni-red">
                {selectedIds.size} selected
              </span>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-20">
              <p className="text-3xl font-semibold text-gray-500 mb-2">Your cart is empty.</p>
              <p className="text-md">Looks like you haven't made a choice yet.</p>
              <ShoppingCart className="mt-2 w-20 h-20 text-gray-500" />
              <Link to="/training" onClick={closeCart} className="mt-2 underline text-gray-500">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-1">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4 accent-bni-red cursor-pointer flex-shrink-0 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <CartItemRow item={item} onRemove={removeFromCart} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100">
          <div className="mt-4 mb-2">
            <YouMightAlsoLike />
          </div>

          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-gray-800">
              {someSelected
                ? `Selected (${selectedCount} ${selectedCount === 1 ? "item" : "items"}):`
                : `Total (${items.length} ${items.length === 1 ? "item" : "items"}):`}
            </span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(someSelected ? selectedTotal : items.reduce((s, i) => s + i.price * (i.qty ?? 1), 0))}
            </span>
          </div>

          {!someSelected && items.length > 0 && (
            <p className="text-xs text-gray-400 mb-3">Select items to proceed to checkout.</p>
          )}

          <button
            onClick={handleCheckout}
            disabled={!someSelected}
            className="w-full bg-bni-red text-white font-bold py-4 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition text-base"
          >
            Checkout Now {someSelected ? `(${selectedIds.size})` : ""}
          </button>
        </div>
      </div>
    </>
  );
}