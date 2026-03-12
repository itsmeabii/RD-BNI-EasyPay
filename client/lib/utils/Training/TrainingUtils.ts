import { supabase } from "@/lib/supabase/Client";
import type { Training, TrainingCompletion, TrainingRow } from "@/types/TrainingTypes";

function mapTraining(row: TrainingRow): Training {
  return {
    id: row.id,
    title: row.title,
    code: row.code,
    description: row.description ?? "",
    keyTopics: row.key_topics ?? "",
    outcomes: row.outcomes ?? "",
    price: row.price,
    thumbnail: row.thumbnail ?? "",
    images: row.images ?? [],
    months: row.months ?? [],
    location: row.location ?? "",
    dates: (row.training_dates ?? []).map((d) => ({
      date: d.date,
      time: d.time,
    })),
    instructors: (row.training_instructors ?? []).map((i) => ({
      name: i.name,
      background: i.background ?? "",
      image: i.image ?? "",
    })),
  };
}

const TRAINING_SELECT = `
  *,
  training_dates ( date, time ),
  training_instructors ( name, background, image )
`;

export async function fetchTrainings(): Promise<Training[]> {
  const { data, error } = await supabase
    .from("trainings")
    .select(TRAINING_SELECT)
    .order("id", { ascending: true });

  if (error) {
    console.error("fetchTrainings:", error.message);
    return [];
  }

  return (data as TrainingRow[]).map(mapTraining);
}

export async function fetchTrainingById(id: number): Promise<Training | null> {
  const { data, error } = await supabase
    .from("trainings")
    .select(TRAINING_SELECT)
    .eq("id", id)
    .single();

  if (error) {
    console.error(`fetchTrainingById(${id}):`, error.message);
    return null;
  }

  return mapTraining(data as TrainingRow);
}

export async function fetchUserCompletions(userId: string): Promise<TrainingCompletion[]> {
  const { data, error } = await supabase
    .from("training_completions")
    .select("training_id, completed_at")
    .eq("user_id", userId);

  if (error) {
    console.error("fetchUserCompletions:", error.message);
    return [];
  }

  return data.map((row) => ({
    trainingId: row.training_id,
    completedAt: row.completed_at,
  }));
}