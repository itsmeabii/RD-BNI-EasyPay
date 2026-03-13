import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils/Formatter";
import { Merchandise } from "@/types/MerchandiseTypes";
import { useNavigate } from "react-router-dom";

export function MerchandiseCard({ item }: { item: Merchandise }) {
  const { addToCart, openCart } = useCart();
  const navigate = useNavigate();

  function handleAddToCart() {
    if (!item.inStock) return;
    addToCart({
      id: item.id,
      title: item.name,
      price: item.price,
      thumbnail: item.thumbnail,
      qty: 1,
      color: "",
      itemType: "merchandise",
    }, "merchandise");
    openCart();
  }

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/merchandise/${item.id}`)}
    >
      <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        {/* Image */}
        <div
          className="relative bg-gray-50 overflow-hidden flex items-center justify-center mx-auto w-full"
          style={{ height: "226px", maxWidth: "249px" }}
        >
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
              No image
            </div>
          )}

          {!item.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
              <span className="text-bni-red font-extrabold italic text-xl rotate-[-12deg] drop-shadow-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 px-4 py-3">
          <p className="text-sm font-bold text-gray-800 text-center leading-tight">{item.name}</p>
          <p className="text-sm text-bni-red font-semibold text-center">{formatPrice(item.price)}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={!item.inStock}
            className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-150
              ${!item.inStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-bni-red text-white hover:bg-red-700 active:scale-95"
              }`}
          >
            {!item.inStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}