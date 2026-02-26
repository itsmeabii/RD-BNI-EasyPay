import { useState } from "react";
import TopBar from "@/components/TopBar";
import CartButtonHeader from "@/components/CartButtonHeader";
import CartButton from "@/components/CartButton";

const productImages = [
  "https://api.builder.io/api/v1/image/assets/TEMP/174c8636f5231a73dffdc27d79090efcc0893dad?width=872",
  "https://api.builder.io/api/v1/image/assets/TEMP/a055ee9ebd1ac0a58c52c0cd6657d11c1db17867?width=174",
  "https://api.builder.io/api/v1/image/assets/TEMP/174c8636f5231a73dffdc27d79090efcc0893dad?width=872",
];

const colors = [
  { name: "Red", value: "#CF2031" },
  { name: "Black", value: "#2E1D1F" },
  { name: "Green", value: "#1BA811" },
  { name: "Blue", value: "#2767DE" },
];

function StarRating({ rating, total }: { rating: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 1L12.39 6.26L18 7.27L14 11.14L14.76 17L10 14.27L5.24 17L6 11.14L2 7.27L7.61 6.26L10 1Z"
              fill={star <= rating ? "#CF2031" : "none"}
              stroke={star <= rating ? "#CF2031" : "#D1D5DB"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
      <span className="text-gray-500 text-sm">{total} Reviews</span>
    </div>
  );
}

export default function Index() {
  const [selectedColor, setSelectedColor] = useState("Red");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + quantity);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-[Inter,sans-serif]">
      <TopBar />
      <CartButtonHeader />

      {/* Main content */}
      <main className="flex-1 px-4 md:px-[70px] py-8 md:py-12">
        <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Product Images */}
          <div className="w-full md:w-[436px] shrink-0">
            {/* Main image area */}
            <div className="relative bg-white rounded-lg overflow-hidden flex items-center justify-center min-h-[260px] md:min-h-[380px]">
              {/* BNI Taguig watermark overlay */}
              <div className="absolute top-4 right-4 flex flex-col items-center pointer-events-none select-none opacity-60">
                <span className="font-black text-2xl text-[#CF2031] tracking-widest leading-none">BNI</span>
                <span className="font-bold text-xs text-gray-700 tracking-[0.3em] leading-none mt-0.5">TAGUIG</span>
              </div>
              <img
                src={productImages[selectedImage]}
                alt="BNI Cap"
                className="w-full object-contain max-h-[380px]"
              />
            </div>

            {/* Thumbnail images */}
            <div className="flex gap-3 mt-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-[100px] h-[91px] rounded-[7px] overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-[#CF2031]"
                      : "border-transparent"
                  } bg-[#CF2031]`}
                >
                  <img
                    src={img}
                    alt={`BNI Cap view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              BNI Cap
            </h1>

            <p className="text-[#CF2031] text-xl font-semibold mb-3">
              ₱ 375.00
            </p>

            <div className="mb-5">
              <StarRating rating={3} total={120} />
            </div>

            {/* Color */}
            <div className="mb-5">
              <p className="font-bold text-gray-900 text-base mb-2">
                COLOR:{" "}
                <span className="font-bold">{selectedColor}</span>
              </p>
              <div className="flex items-center gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`w-7 h-7 rounded-full transition-all ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                        : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Stock */}
            <div className="mb-5">
              <p className="font-bold text-gray-900 text-base mb-1">STOCK:</p>
              <p className="text-gray-600 text-base">50 pcs.</p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="font-bold text-gray-900 text-base mb-1">
                DESCRIPTION:
              </p>
              <p className="text-gray-600 text-sm italic leading-relaxed max-w-md">
                The Red BNI Cap is made from durable, breathable fabric and
                features a neatly embroidered BNI logo. Its clean design and
                vibrant red color make it ideal for official events, trainings,
                and everyday use.
              </p>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3">
              {/* Quantity control */}
              <div className="flex items-center rounded-[10px] bg-[#D9D9D9] h-[53px] overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-[53px] h-full flex items-center justify-center text-[#766567] font-semibold text-lg hover:bg-[#ccc] transition-colors"
                >
                  -
                </button>
                <div className="w-px h-8 bg-[#C7C6C6]" />
                <span className="w-[55px] text-center text-[#766567] font-semibold text-base select-none">
                  {quantity}
                </span>
                <div className="w-px h-8 bg-[#C7C6C6]" />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-[53px] h-full flex items-center justify-center text-[#766567] font-semibold text-lg hover:bg-[#ccc] transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="h-[53px] px-8 bg-[#CF2031] text-white font-semibold text-[15px] rounded-[10px] hover:bg-[#b51c2b] transition-colors whitespace-nowrap"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>

      <CartButton count={cartCount} />
    </div>
  );
}
