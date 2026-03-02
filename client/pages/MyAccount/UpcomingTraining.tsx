import { SearchAndFilters } from "./SearchAndFilter";

export default function UpcomingTraining() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-[#cf2031] text-3xl">
        Upcoming Trainings
      </h1>
      <SearchAndFilters />
    </div>
  );
}