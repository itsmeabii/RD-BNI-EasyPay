import { useState } from "react";
import { Search, ShoppingCart, ChevronLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

        {/* Welcome Banner with Background Graphics */}
        <div className="relative mb-12">
          {/* Left decorative graphic */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/585a34a93c99dcced92026388a0f58f15c865e38?width=642"
            alt=""
            className="absolute left-60 top-0 w-[321px] h-[160px] pointer-events-none opacity-80"
          />
          

          {/* Right decorative graphic */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/42269f5251381fbd4214ef6404bdef6b8a4bb433?width=310"
            alt=""
            className="absolute right-60 top-0 w-[155px] h-[220px] pointer-events-none opacity-80"
          />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl pt-9 lg:text-4xl font-bold text-black leading-snug">
            Welcome to the BNI Taguig Merchandise Shop!
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-black max-w-5xl mx-auto">
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
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
    
    <input
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full bg-[#F3F4F6] border-none rounded-lg py-3 pl-11 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
    />
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
