import { useState, useMemo, useEffect } from "react";
import { trainings, MONTHS, formatPrice } from "@/data/Training";
import TrainingCard from "@/components/TrainingCard";
import SearchButton from "@/components/SearchBox";
import FilterDropdown, { FilterStatus } from "@/components/TrainingFilter";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import Patterns from "@/components/patterns";
import { Search } from "lucide-react";

export default function TrainingPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterMonths, setFilterMonths] = useState<string[]>([]);
  const [cartIds, setCartIds] = useState<number[]>([]);
  const location = useLocation();

  // Filter logic
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return trainings.filter((t) => {
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);

      const matchStatus =
        filterStatus === "all"
          ? true
          : filterStatus === "completed"
          ? t.completed
          : !t.completed;

      const matchMonth =
        filterMonths.length === 0 ? true : filterMonths.includes(t.month);

      return matchSearch && matchStatus && matchMonth;
    });
  }, [search, filterStatus, filterMonths]);

  // Group filtered results by month, preserving calendar order
  const grouped = useMemo(() => {
    const map: Record<string, typeof trainings> = {};
    filtered.forEach((t) => {
      if (!map[t.month]) map[t.month] = [];
      map[t.month].push(t);
    });
    return map;
  }, [filtered]);

  // Helpers
  const handleAddToCart = (id: number) => {
    setCartIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const clearFilters = () => {
    setFilterStatus("all");
    setFilterMonths([]);
  };

  const activeFilterPills = [
    filterStatus === "completed" && "Completed",
    filterStatus === "upcoming" && "Upcoming",
    ...filterMonths,
  ].filter(Boolean) as string[];

  useEffect(() => {
    if (location.pathname === "/training") {
      document.getElementById("training-section")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div>
      <div className="relative z-10 text-center px-6 pt-10 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 ">
          2026 BNI Taguig Trainings and Workshops
        </h1>

        {/* Search + Filter row */}
         <div className="flex gap-3 max-w-3xl mx-auto items-center z-10">
          <SearchButton value={search} onChange={setSearch} />
          <FilterDropdown
            filterStatus={filterStatus}
            filterMonths={filterMonths}
            onStatusChange={setFilterStatus}
            onMonthsChange={setFilterMonths}
            onClear={clearFilters}
          />
        </div>
        
        {/* Active filter pills */}
        {activeFilterPills.length > 0 && (
          <div className="flex gap-2 justify-center mt-3">
            {activeFilterPills.map((f) => (
              <span
                key={f}
                className="bg-red-50 text-bni-red text-xs font-semibold px-3 py-1 rounded-full border border-red-200"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Result count */}
        <p className="mt-3 text-xs text-gray-400">
          Showing{" "}
          <span className="text-gray-700 font-semibold">{filtered.length}</span>{" "}
          of {trainings.length} trainings
        </p>
      </div>

      {/* Training Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="items-center text-center py-20 text-gray-500">
            <div className="mb-4 flex justify-center"><Search/></div>
            <p className="text-lg font-semibold text-gray-600 mb-1">
              No trainings found
            </p>
            <p className="text-sm">Try searching with other keywords.</p>
          </div>
        ) : (
          MONTHS.filter((m) => grouped[m]).map((month) => (
            <section key={month} className="mb-12">
              <h2 className="text-xl font-bold text-gray-500 mb-4">
                {month}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {grouped[month].map((t) => (
                  <TrainingCard
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    description={t.description}
                    price={formatPrice(t.price)}
                    image={t.image}
                    status={t.completed ? "Completed" : null}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

    <Footer />

    </div>
  );
}