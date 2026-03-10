// src/pages/TrainingPage.tsx

import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import type { Training, TrainingCompletion } from "@/types/TrainingTypes";
import { fetchTrainings, fetchUserCompletions } from "@/lib/utils/Training/TrainingUtils";
import { formatPrice } from "@/lib/utils/Formatter";
import { MONTHS, TRAINING_MESSAGES } from "@/constants/Training";
import { GetUser } from "@/lib/auth/GetUser";

import TrainingCard from "@/components/TrainingCard";
import SearchButton from "@/components/SearchBox";
import FilterDropdown, { FilterStatus } from "@/components/TrainingFilter";
import Footer from "@/components/Footer";

export default function TrainingPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [completions, setCompletions] = useState<TrainingCompletion[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterMonths, setFilterMonths] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const load = async () => {
      const [data, user] = await Promise.all([
        fetchTrainings(),
        GetUser(),
      ]);

      setTrainings(data);

      if (user?.id) {
        const userCompletions = await fetchUserCompletions(user.id);
        setCompletions(userCompletions);
      }

      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    if (location.pathname === "/training") {
      document.getElementById("training-section")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  // Set of completed training IDs for fast lookup
  const completedIds = useMemo(
    () => new Set(completions.map((c) => c.trainingId)),
    [completions]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return trainings.filter((t) => {
      const isCompleted = completedIds.has(t.id);

      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);

      const matchStatus =
        filterStatus === "all" ? true
        : filterStatus === "completed" ? isCompleted
        : !isCompleted;

      const matchMonth =
        filterMonths.length === 0 ? true : t.months.some((m) => filterMonths.includes(m));

      return matchSearch && matchStatus && matchMonth;
    });
  }, [trainings, completedIds, search, filterStatus, filterMonths]);

  const grouped = useMemo(() => {
    const map: Record<string, Training[]> = {};
    filtered.forEach((t) => {
      t.months.forEach((m) => {
        if (!map[m]) map[m] = [];
        map[m].push(t);
      });
    });
    return map;
  }, [filtered]);

  const clearFilters = () => {
    setFilterStatus("all");
    setFilterMonths([]);
  };

  const activeFilterPills = [
    filterStatus === "completed" && "Completed",
    filterStatus === "upcoming" && "Upcoming",
    ...filterMonths,
  ].filter(Boolean) as string[];

  return (
    <div>
      <div className="relative z-10 text-center px-6 pt-10 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          {TRAINING_MESSAGES.pageTitle}
        </h1>

        <div className="flex gap-3 max-w-3xl mx-auto items-center">
          <SearchButton value={search} onChange={setSearch} />
          <FilterDropdown
            filterStatus={filterStatus}
            filterMonths={filterMonths}
            onStatusChange={setFilterStatus}
            onMonthsChange={setFilterMonths}
            onClear={clearFilters}
          />
        </div>

        {activeFilterPills.length > 0 && (
          <div className="flex gap-2 justify-center mt-3">
            {activeFilterPills.map((filter) => (
              <span
                key={filter}
                className="bg-red-50 text-bni-red text-xs font-semibold px-3 py-1 rounded-full border border-red-200"
              >
                {filter}
              </span>
            ))}
          </div>
        )}

        {!loading && (
          <p className="mt-3 text-xs text-gray-400">
            Showing{" "}
            <span className="text-gray-700 font-semibold">{filtered.length}</span>{" "}
            of {trainings.length} trainings
          </p>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Loader2 className="animate-spin mb-3 w-8 h-8" />
            <p className="text-sm">{TRAINING_MESSAGES.loading}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20 text-gray-500">
            <Search className="mb-4" />
            <p className="text-lg font-semibold text-gray-600 mb-1">
              {TRAINING_MESSAGES.noResults}
            </p>
            <p className="text-sm">{TRAINING_MESSAGES.noResultsHint}</p>
          </div>
        ) : (
          MONTHS.filter((m) => grouped[m]).map((month) => (
            <section key={month} className="mb-12">
              <h2 className="text-xl font-bold text-gray-500 mb-4">{month}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-start justify-items-center">
                {grouped[month].map((t) => (
                  <TrainingCard
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    description={t.description}
                    price={formatPrice(t.price)}
                    image={t.thumbnail}
                    status={completedIds.has(t.id) ? "Completed" : null}
                    onAddToCart={() => {}}
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