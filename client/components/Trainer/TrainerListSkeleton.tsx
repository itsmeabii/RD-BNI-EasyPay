// src/components/Trainer/TrainerListSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function TrainerListSkeleton() {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="bg-bni-red text-white">
            {["Trainer ID", "First Name", "Last Name", "Chapter", "Preferred Training", "Training Record", "Availability", "Action"].map((col) => (
              <th key={col} className="px-4 py-3 font-semibold whitespace-nowrap">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {Array.from({ length: 8 }).map((_, j) => (
                <td key={j} className="px-4 py-3">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}