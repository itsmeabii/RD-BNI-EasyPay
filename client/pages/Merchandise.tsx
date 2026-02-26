import { useState } from "react";
import { Search, ShoppingCart, ChevronLeft, User } from "lucide-react";
import CartSidebar, { CartItem } from "@/components/CartSidebar";
import ProductCard, { Product } from "@/components/ProductCard";

const product = [
  {
    id: 1,
    name: "BNI Ladies' Scarf",
    price: 1100,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/585a34a93c9d2b4e7f5a1b3d6e8f9c0a2b4d6e8f?width=400",
    inStock: true,
    color: "Red",
    category: "Apparel",
  },
  {
    id: 2,
    name: "BNI Necktie w/ Pocket Square",
    price: 1650,
    image: null,
    inStock: false,
    color: "Red",
    category: "Apparel",
  },
  {
    id: 3,
    name: "BNI Cap",
    price: 375,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/c3b6742fc95ea7cfd457a9baafc8a920654b489f?width=400",
    inStock: true,
    color: "Red",
    category: "Accessories",
  },
  {
    id: 4,
    name: "BNI Mug",
    price: 450,
    image: null,
    inStock: true,
    color: "Red/White",
    category: "Souvenirs",
  },
];

const navItems = [
  { label: "Trainings", active: false },
  { label: "Memberships", active: false },
  { label: "Merchandise", active: true },
];

export default function Index() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = product.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Top Bar */}
      <div className="bg-[#8B0D12] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[50px] sm:h-[69px] flex items-center justify-between">
          <a
            href="https://bnitaguig.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back to BNI Taguig Website</span>
          </a>
          <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Login / Register</span>
          </div>
        </div>
      </div>

      {/* Header / Nav */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
            {/* Logo */}
            <div className="flex items-center gap-0 flex-shrink-0">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/d8989a6823edfcb2dc5a69bf9845044ab5544316?width=798"
                alt="BNI Taguig EasyPay"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                onError={(e) => {
                  // Fallback if image doesn't load
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const next = target.nextElementSibling as HTMLElement;
                  if (next) next.style.display = "flex";
                }}
              />
              {/* Fallback Logo (hidden by default) */}
              <div className="hidden items-center gap-2">
                <div className="bg-[#CF2031] rounded px-2 py-1">
                  <span className="text-white font-bold text-lg">BNi</span>
                  <div className="text-white text-[8px] font-medium">TAGUIG</div>
                </div>
                <div className="w-px h-10 bg-gray-300 mx-2" />
                <span className="text-[#CF2031] text-3xl font-black italic tracking-tight">
                  EASYPAY
                </span>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={`text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap transition-colors ${
                    item.active ? "text-[#B11A17]" : "text-black hover:text-[#B11A17]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {/* Cart Icon */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-black hover:text-[#B11A17] transition-colors ml-1"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#CF2031] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden py-10 sm:py-14 md:py-16">
        {/* Decorative arcs - left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 pointer-events-none select-none">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
            {[120, 95, 70, 48, 28].map((r, i) => (
              <circle
                key={i}
                cx="150"
                cy="150"
                r={r}
                stroke="#CF2031"
                strokeWidth="2"
                fill="none"
                opacity={0.12 + i * 0.08}
              />
            ))}
          </svg>
        </div>

        {/* Decorative arcs - right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none select-none">
          <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
            {[100, 78, 57, 38, 20].map((r, i) => (
              <circle
                key={i}
                cx="130"
                cy="130"
                r={r}
                stroke="#CF2031"
                strokeWidth="2"
                fill="none"
                opacity={0.08 + i * 0.06}
              />
            ))}
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-snug">
            Welcome to the BNI Taguig Merchandise Shop!
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-black max-w-3xl mx-auto">
            Explore our official merchandise designed to represent professionalism, connection, and success.
            Thank you for supporting BNI Taguig.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#CF2031] focus:border-[#CF2031]"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
