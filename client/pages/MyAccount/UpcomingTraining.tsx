import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { SearchAndFilters } from "../../components/SearchAndFilter";

export default function UpcomingTraining() {
  const context = useOutletContext<{ setPageTitle?: (t: string) => void }>();

  useEffect(() => {
    context?.setPageTitle?.("Upcoming Trainings");
  }, []);

  return <SearchAndFilters />;
}