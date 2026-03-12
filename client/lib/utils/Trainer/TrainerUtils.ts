import { supabase } from "@/lib/supabase/Client";
import { Trainer, TrainingRecord } from "@/types/TrainerType";

export async function fetchTrainers(): Promise<Trainer[]> {
  const { data, error } = await supabase
    .from("trainers")
    .select("id, first_name, last_name, chapter, preferred_category, availability, image")
    .order("id");

  if (error) {
    console.error("fetchTrainers:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    trainerId: `TR-${String(row.id).padStart(3, '0')}`, 
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
    .from("trainer_training_records")
    .select(`
      id,
      request_id,
      trainer_id,
      training_id,
      proposed_date,
      status,
      training_type,
      created_at,
      trainings (
        title,
        code,
        description,
        thumbnail
      )
    `)
    .eq("trainer_id", trainerId)
    .eq("archived", false)
    .order("proposed_date", { ascending: false });

  if (error) {
    console.error("fetchTrainerRecords:", error.message);
    return [];
  }

  return data.map((row: any) => ({
    id: row.id,
    requestId: row.request_id ?? null,
    trainerId: row.trainer_id,
    trainingId: row.training_id ?? null,
    trainingTitle: row.trainings?.title ?? "",
    trainingCode: row.trainings?.code ?? "",
    trainingDescription: row.trainings?.description ?? "",
    trainingThumbnail: row.trainings?.thumbnail ?? "",
    proposedDate: row.proposed_date ?? "",
    status: row.status ?? "",
    createdAt: row.created_at ?? "",
    trainingType: row.training_type ?? "regular",
    chapter: "",
    ltName: "",
    requestedAt: "",
    timeApproved: "",
  }));
}

export async function archiveTrainerRecord(id: number): Promise<boolean> {
  const { data, error } = await supabase
    .from("trainer_training_records")
    .update({ archived: true })
    .eq("id", id);
  
  if (error) {
    console.error("archiveTrainerRecord:", error.message);
    return false;
  }
  return true;
}