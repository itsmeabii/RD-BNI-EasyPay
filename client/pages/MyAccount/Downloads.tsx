import { useState } from "react";
import { SearchAndFilters } from "@/components/SearchAndFilter";
import { MONTH_OPTIONS } from "@/constants/Training";


export default function Downloads() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  return (
    <div className="w-full min-w-[1280px] min-h-screen relative bg-[#f4f4f4]">
      <main className="px-4 py-6">
        <h1 className="text-4xl font-bold text-black mb-4">Downloads</h1>

        <div className="max-w-5xl">
          <SearchAndFilters
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search downloads..."
            filters={[
              {
                value: selectedMonth,
                onChange: setSelectedMonth,
                placeholder: "Month",
                width: "w-[140px]",
                options: MONTH_OPTIONS,
                scrollable: true,
              },
            ]}
          />
        </div>

        <div className="mt-6 text-center text-gray-600">
          Downloads will appear here soon.
        </div>
      </main>
    </div>
  );
}