import { ShoppingCart } from "lucide-react";

export interface Product {
  category: string;
  id: number;
  name: string;
  price: number;
  image: string | null;
  inStock: boolean;
  color?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="flex flex-col">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-100 rounded-sm overflow-hidden mb-3">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-[#CF2031] text-3xl md:text-4xl font-semibold italic text-center leading-tight">
              Out of<br />Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="text-center mb-2">
        <h3 className="text-sm md:text-base font-medium text-black">{product.name}</h3>
        <p className="text-sm text-black mt-1">₱{product.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => product.inStock && onAddToCart(product)}
        disabled={!product.inStock}
        className={`w-full py-2 px-4 rounded text-white text-sm font-medium transition-opacity ${
          product.inStock
            ? "bg-[#B11A17] hover:opacity-90 cursor-pointer"
            : "bg-[#B11A17] opacity-60 cursor-not-allowed"
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
}
