import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/Client";

export interface Trainer {
  id: number;
  trainer_id: string;
  first_name: string;
  last_name: string;
  chapter: string;
  preferred_category: string;
  image: string;
  availability: string | null;
}

export const useTrainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("trainers")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setTrainers(data ?? []);
      }
      setIsLoading(false);
    };

    fetchTrainers();
  }, []);

  return { trainers, isLoading, error };
};