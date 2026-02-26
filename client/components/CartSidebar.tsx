import { X, Trash2 } from "lucide-react";
import { useState } from "react";
import { Product } from "./ProductCard";

export interface CartItem extends Product {
  color?: any;
  name: string;
  image: any;
  price: number;
  id: number;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const membershipSlides = [
  {
    id: 1,
    name: "New BNI Membership",
    price: "₱ 48,000 - ₱81,000",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/f1f28bfe69d15582a294ed533a54ffbf19f4ebda?width=140",
  },
  {
    id: 2,
    name: "BNI Renewal Membership",
    price: "₱ 38,000 - ₱70,000",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/f1f28bfe69d15582a294ed533a54ffbf19f4ebda?width=140",
  },
  {
    id: 3,
    name: "BNI Premium Membership",
    price: "₱ 65,000 - ₱95,000",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/f1f28bfe69d15582a294ed533a54ffbf19f4ebda?width=140",
  },
];

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartSidebarProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[440px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-8 pb-4">
          <h2 className="text-2xl font-bold text-black">My cart</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-black hover:opacity-70 transition-opacity"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mt-1">Add some items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id}>
                  <div className="flex items-start gap-3 py-3">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 rounded bg-gray-100 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black">{item.name}</p>
                      {item.color && (
                        <p className="text-sm font-semibold text-black">Color : {item.color}</p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2">
                        <div className="flex items-center rounded-lg bg-blue-50/70 px-1 gap-3">
                          <button
                            className="text-black font-semibold text-base w-7 h-6 flex items-center justify-center hover:opacity-70"
                            onClick={() =>
                              onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                          >
                            -
                          </button>
                          <div className="bg-white w-6 h-5 flex items-center justify-center">
                            <span className="text-xs text-black">{item.quantity}</span>
                          </div>
                          <button
                            className="text-black font-semibold text-base w-7 h-6 flex items-center justify-center hover:opacity-70"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price & Delete */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <span className="text-sm text-black whitespace-nowrap">
                        ₱ {(item.price * item.quantity).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-gray-300" />
                </div>
              ))}
            </div>
          )}

          {/* You Might Also Like */}
          <div className="mt-6 mb-4">
            <div className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50/50">
              {/* Header band */}
              <div className="bg-[#CF2031] px-4 py-2 text-center">
                <span className="text-white text-xs font-semibold tracking-wide">
                  YOU MIGHT ALSO LIKE:
                </span>
              </div>

              {/* Slide content */}
              <div className="flex items-center gap-3 p-3">
                <div className="flex-shrink-0 w-16 h-16 rounded bg-gray-200 overflow-hidden">
                  <img
                    src={membershipSlides[slideIndex].image}
                    alt={membershipSlides[slideIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-black">
                    {membershipSlides[slideIndex].name}
                  </p>
                  <p className="text-xs font-semibold text-black mt-1">
                    {membershipSlides[slideIndex].price}
                  </p>
                </div>
                <button className="flex-shrink-0 text-xs font-semibold text-black bg-gray-200 hover:bg-gray-300 transition-colors rounded px-3 py-1.5 whitespace-nowrap">
                  Select Options
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-1.5 pb-3">
                {membershipSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`rounded-full transition-all ${
                      i === slideIndex
                        ? "w-3 h-3 bg-blue-600"
                        : "w-2.5 h-2.5 bg-blue-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-300 mb-4" />
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-base text-black font-normal">
              Total ({totalCount} item{totalCount !== 1 ? "s" : ""}):
            </span>
            <span className="text-base font-bold text-black ml-1">
              ₱ {total.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button className="w-full bg-[#CF2031] hover:bg-[#B11A17] text-white text-base font-semibold py-4 rounded transition-colors">
            Checkout Now
          </button>
        </div>
      </div>
    </>
  );
}
