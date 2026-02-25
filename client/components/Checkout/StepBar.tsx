import {STEPS} from "@/data/Checkout";

export default function StepBar({ current }: { current: number }) {
  return (
    <div className="flex justify-center items-center py-4 font-sans">
      {STEPS.map(([n, label], i) => {
        const done = current > +n;
        const active = current === +n;
        return (
          <div key={n} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm transition-all duration-300
                  ${done || active ? "bg-bni-red text-white" : "bg-gray-200 text-gray-400"}
                  ${active ? "ring-4 ring-bni-red/20" : ""}
                `}
              >
                {done ? "✓" : n}
              </div>
              <span
                className={`text-sm ${active ? "font-bold text-bni-red" : done ? "font-medium text-gray-600" : "font-medium text-gray-300"}`}
              >
                {label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2.5 rounded-full transition-colors duration-300
                  ${current > i + 1 ? "bg-bni-red" : "bg-gray-200"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}