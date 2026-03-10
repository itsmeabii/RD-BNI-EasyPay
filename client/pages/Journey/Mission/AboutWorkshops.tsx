import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { WorkshopItem, WorkshopGroupProps } from "@/types/JourneyTypes";
import { useWorkshopGroups } from "@/lib/utils/Training/TrainingSeriesUtils"; 

function AccordionItem({ item }: { item: WorkshopItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
      >
        <span>{item.title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
        )}
      </button>

      {isOpen && item.description && (
        <div className="px-4 py-3 text-sm text-gray-600 border-t border-gray-200 bg-white">
          {item.description}
        </div>
      )}
    </div>
  );
}

function WorkshopGroup({ group }: { group: WorkshopGroupProps }) {
  return (
    <div className="flex flex-col gap-0">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        {group.groupTitle}
      </h3>
      <div className="flex flex-col">
        {group.items.map((item, i) => (
          <AccordionItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export function AboutWorkshops() {
  const { groups, loading, error } = useWorkshopGroups(); // 👈 fetch from Supabase

  return (
    <div className="w-full flex flex-col gap-5">
      <h2 className="text-[28px] md:text-[35px] font-semibold text-black">
        About the Workshops:
      </h2>

      {loading && <p className="text-sm text-gray-400">Loading workshops...</p>}
      {error && <p className="text-sm text-red-500">Failed to load: {error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-6">
          {groups.map((group, i) => (
            <WorkshopGroup key={i} group={group} /> // 👈 use groups from hook
          ))}
        </div>
      )}
    </div>
  );
}