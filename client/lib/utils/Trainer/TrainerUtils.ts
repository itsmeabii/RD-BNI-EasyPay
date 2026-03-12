import { supabase } from "@/lib/supabase/Client";
import { Trainer, TrainingRecord } from "@/types/TrainerType";

export async function fetchTrainers(): Promise<Trainer[]> {
  const { data, error } = await supabase
    .from("trainers")
    .select("id, trainer_id, first_name, last_name, chapter, preferred_category, availability, image")
    .order("id");

  if (error) {
    console.error("fetchTrainers:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    trainerId: row.trainer_id ?? "",
    firstName: row.first_name ?? "",
    lastName: row.last_name ?? "",
    chapter: row.chapter ?? "",
    preferredCategory: row.preferred_category ?? "",
    availability: row.availability ??  null,
    image: row.image ?? "",
  }));
}
export async function fetchTrainerRecords(trainerId: number): Promise<TrainingRecord[]> {
  const { data, error } = await supabase
    .from("trainings")
    .select(`
      id,
      request_id,
      trainer_id,
      training_id,
      proposed_date,
      status,
      trainings (
        title,
        code
      )
    `)
    .eq("trainer_id", trainerId)
    .order("proposed_date", { ascending: false });

  if (error) {
    console.error("fetchTrainerRecords:", error.message);
    return [];
  }

  return data.map((row: any) => ({
    id: row.id,
    requestId: row.request_id,
    trainerId: row.trainer_id,
    trainingId: row.training_id,
    trainingTitle: row.trainings?.title ?? "",
    trainingCode: row.trainings?.code ?? "",
    proposedDate: row.proposed_date,
    status: row.status,
  }));
}