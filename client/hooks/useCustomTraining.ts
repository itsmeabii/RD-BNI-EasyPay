import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/Client";

export interface TrainingRequest {
  id: string;
  lt_name: string;
  category: string;
  training: string;
  training_de: string;
  chapter: string;
  proposed_date: string;
  attendees: number;
  trainer: string | null;
  status: string;
  request_note: string;
  requested_at: string;
  time_approved: string | null;
  created_at: string;
}

export const useCustomTrainings = () => {
  const [trainings, setTrainings] = useState<TrainingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainings = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("training_request")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setTrainings(data ?? []);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  return { trainings, isLoading, error, refetch: fetchTrainings };
};