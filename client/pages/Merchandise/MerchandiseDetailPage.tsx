import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, StarHalf } from "lucide-react";
import { fetchMerchandiseById, fetchMerchandiseReviews } from "@/lib/utils/Merchandise/MerchandiseUtils";
import { Merchandise, MerchandiseReview } from "@/types/MerchandiseTypes";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils/Formatter";
import Footer from "@/components/Footer";
import ShoppingCartButton from "@/components/ShoppingCartButton";

const COLOR_MAP: Record<string, string> = {
  Red: "#CC0000",
  White: "#FFFFFF",
  Black: "#1a1a1a",
  Green: "#16a34a",
  Blue: "#2563eb",
  Gold: "#d97706",
  Silver: "#9ca3af",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: MerchandiseReview }) {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
      <StarRating rating={review.rating} />
      <p className="text-sm text-gray-700">{review.comment}</p>
      <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default function MerchandiseDetailPage() {
  const { id } = useParams();
  const { addToCart, items, updateQty, openCart } = useCart();

  const [item, setItem] = useState<Merchandise | null>(null);
  const [reviews, setReviews] = useState<MerchandiseReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const cartItem = items.find((i) => i.id === Number(id));
  const isInCart = !!cartItem;

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetchMerchandiseById(Number(id)),
      fetchMerchandiseReviews(Number(id)),
    ]).then(([merchandise, reviewData]) => {
      if (merchandise) {
        setItem(merchandise);
        setSelectedColor(merchandise.colors[0] ?? "");
        setSelectedImage(merchandise.thumbnail);
      }
      setReviews(reviewData);
      setLoading(false);
    });
  }, [id]);

    function handleAddToCart() {
        if (!item || !item.inStock) return;
        addToCart({
            id: item.id,
            title: item.name,
            price: item.price,
            thumbnail: item.thumbnail,
            qty,
            color: selectedColor,
            itemType: "merchandise",
        }, "merchandise");
        openCart();
    }

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Item not found.</p>
      </div>
    );
  }

  const allImages = [item.thumbnail, ...item.images].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto w-full px-6 py-10 flex-1">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left — Images */}
          <div className="flex flex-col gap-4">
            <div className="w-full rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center" style={{ height: "360px" }}>
              {selectedImage ? (
                <img src={selectedImage} alt={item.name} className="h-full object-contain p-4" />
              ) : (
                <div className="text-gray-300 text-sm">No image</div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition ${
                      selectedImage === img ? "border-bni-red" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Details */}
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">{item.name}</h1>
              <p className="text-xl font-bold text-bni-red mt-1">{formatPrice(item.price)}</p>
            </div>

            {/* Rating */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={avgRating} />
                <span className="text-sm text-gray-500">{reviews.length} Reviews</span>
              </div>
            )}

            {/* Color */}
            {item.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-gray-800">
                  COLOR: <span className="font-normal">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {item.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      className={`w-7 h-7 rounded-full border-2 transition ${
                        selectedColor === color ? "border-gray-800 scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: COLOR_MAP[color] ?? color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div>
              <p className="text-sm font-semibold text-gray-800">STOCK:</p>
              <p className="text-sm text-gray-600">{item.inStock ? `${item.stock} pcs.` : "Out of Stock"}</p>
            </div>

            {/* Description */}
            {item.description && (
              <div>
                <p className="text-sm font-semibold text-gray-800">DESCRIPTION:</p>
                <p className="text-sm text-gray-600 italic mt-1 leading-relaxed">{item.description}</p>
              </div>
            )}

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                    onClick={() => {
                    if (isInCart) {
                        updateQty(item.id, (cartItem?.qty ?? 1) - 1);
                    } else {
                        setQty((q) => Math.max(1, q - 1));
                    }
                    }}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition"
                >
                    -
                </button>
                <span className="px-4 py-2 text-sm font-semibold border-x border-gray-300">
                    {isInCart ? (cartItem?.qty ?? 1) : qty}
                </span>
                <button
                    onClick={() => {
                    if (isInCart) {
                        updateQty(item.id, (cartItem?.qty ?? 1) + 1);
                    } else {
                        setQty((q) => Math.min(item.stock, q + 1));
                    }
                    }}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition"
                >
                    +
                </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={!item.inStock}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition
                        ${!item.inStock
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-bni-red text-white hover:bg-red-700 active:scale-95"
                        }`}
                    >
                    Add to Cart
                </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-16 flex flex-col gap-6">
            <h2 className="text-lg font-bold text-gray-800">Customer Reviews</h2>
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <ShoppingCartButton />
    </div>
  );
}