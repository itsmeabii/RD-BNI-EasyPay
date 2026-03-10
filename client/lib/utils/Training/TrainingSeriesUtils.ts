import { supabase } from "@/lib/supabase/Client";
import { OverallProgress, ProgramProgress, TrainingSeriesItem, WorkshopGroupProps } from "@/types/JourneyTypes";
import { useEffect, useState } from "react";

export function useWorkshopGroups() {
  const [groups, setGroups] = useState<WorkshopGroupProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGroups() {
      setLoading(true);

      const { data, error } = await supabase
        .from("training_series")
        .select(`
          id,
          title,
          trainings (
            id,
            title,
            description
          )
        `)
        .order("id");

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const result: WorkshopGroupProps[] = data.map((series) => ({
        groupTitle: series.title,
        items: (series.trainings ?? []).map((t: any) => ({
          title: t.title,
          description: t.description ?? undefined,
        })),
      }));

      setGroups(result);
      setLoading(false);
    }

    fetchGroups();
  }, []);

  return { groups, loading, error };
}

export async function fetchTrainingSeries(): Promise<TrainingSeriesItem[]> {
  const { data, error } = await supabase
    .from("training_series")
    .select("id, title, description, learning_objectives, who_is_this_for") // 👈 add missing fields
    .order("id", { ascending: true });

  if (error) {
    console.error("fetchTrainingSeries:", error.message);
    return [];
  }

  return data;
}

export async function fetchTrainingSeriesById(id: number): Promise<TrainingSeriesItem | null> {
  const { data, error } = await supabase
    .from("training_series")
    .select("id, title, description, learning_objectives, who_is_this_for")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`fetchTrainingSeriesById(${id}):`, error.message);
    return null;
  }

  return data;
}

export async function fetchProgramProgress(userId: string): Promise<{
  overall: OverallProgress;
  programs: ProgramProgress[];}> {
    
  const { data, error } = await supabase
    .from("user_training_progress")
    .select(`
      training_id,
      status,
      trainings (
        id,
        series_id,
        training_series ( id, title )
      )
    `)
    .eq("user_id", userId)
    .eq("status", "completed");

  if (error) {
    console.error("fetchProgramProgress:", error.message);
    return { overall: { starsCompleted: 0, totalStars: 50 }, programs: [] };
  }

  // Group by series
  const seriesMap = new Map<number, { title: string; count: number }>();
  data.forEach((row: any) => {
    const series = row.trainings?.training_series;
    if (!series) return;
    if (!seriesMap.has(series.id)) {
      seriesMap.set(series.id, { title: series.title, count: 0 });
    }
    seriesMap.get(series.id)!.count++;
  });

  const programs: ProgramProgress[] = Array.from(seriesMap.entries()).map(
    ([id, { title, count }]) => ({
      id,
      title,
      starsCompleted: count,
      totalStars: 10,
    })
  );

  const totalCompleted = programs.reduce((sum, p) => sum + p.starsCompleted, 0);

  return {
    overall: { starsCompleted: totalCompleted, totalStars: 50 },
    programs,
  };
}