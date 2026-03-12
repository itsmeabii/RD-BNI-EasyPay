import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/Client";
import type { TrainingData } from "@/types/TrainingTypes";

export function useTrainings() {
  const [trainings, setTrainings] = useState<TrainingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainings = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("upcoming_trainings")
        .select("*")
        .order("training_date", { ascending: true });

      if (error) {
        console.error("Error fetching trainings:", error);
      } else {
        const mapped: TrainingData[] = (data ?? []).map((row) => ({
          orderId: row.order_ID,
          trainingName: row.training_name,
          trainingDate: row.training_date,
          reminder: row.reminder ?? "No reminder",
          category: row.category as TrainingData["category"],
        }));
        setTrainings(mapped);
      }

      setLoading(false);
    };

    fetchTrainings();
  }, []);

  return { trainings, loading };
}