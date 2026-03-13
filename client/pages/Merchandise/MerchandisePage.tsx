import { useState, useEffect, useMemo } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { fetchMerchandise } from "@/lib/utils/Merchandise/MerchandiseUtils";
import { Merchandise, MerchandiseCategory } from "@/types/MerchandiseTypes";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils/Formatter";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/constants/Merchandise";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import { MerchandiseCard } from "@/components/Merchandise/MerchandiseCard";
import MerchandiseSkeleton from "@/components/Merchandise/MerchandiseSkeleton";

type CategoryFilter = typeof CATEGORIES[number];

export default function MerchandisePage() {
  const [items, setItems] = useState<Merchandise[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

    useEffect(() => {
        
        fetchMerchandise().then((data) => {
            console.log("data:", data);
            setItems(data);
            setLoading(false);
        });
    }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div
        className="relative text-center px-6 py-10 overflow-hidden"
        style={{ backgroundImage: "url('/merchandise-background.svg')", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "80%" }}
        >
            <div className="relative z-10">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                Welcome to the BNI Taguig Merchandise Shop!
                </h1>
                <p className="text-base text-gray-black mt-2 max-w-xl mx-auto">
                Explore our official merchandise designed to represent professionalism, connection, and success.
                Thank you for supporting BNI Taguig.
                </p>
            </div>
        </div>

      {/* Controls */}
      <div className="max-w-6xl mx-auto w-full px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-bni-red"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-3 text-sm">
          {CATEGORIES.map((cat, i) => (
            <div key={cat} className="flex items-center gap-3">
              <button
                onClick={() => setActiveCategory(cat)}
                className={`transition text-base ${
                  activeCategory === cat
                    ? "text-bni-red font-bold"
                    : "text-black hover:text-bni-red"
                }`}
              >
                {cat}
              </button>
              {i < CATEGORIES.length - 1 && (
                <span className="text-black">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto w-full px-6 pb-20 flex-1">
        {loading ? (
          <MerchandiseSkeleton />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-gray-400">
            <ShoppingCart className="w-10 h-10 mb-3" />
            <p className="text-sm">No merchandise found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <MerchandiseCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      <ShoppingCartButton />
      <Footer />
    </div>
  );
}