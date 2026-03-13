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
    availability: row.availability ?? null,
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
  const { error } = await supabase
    .from("trainer_training_records")
    .update({ archived: true })
    .eq("id", id);
  
  if (error) {
    console.error("archiveTrainerRecord:", error.message);
    return false;
  }
  return true;
}

export async function assignTrainerToRequest(
  requestId: string,
  trainerId: number,
  trainerName: string
): Promise<void> {

  // 1. Update training_request with trainer_id and trainer name
  const { data: request, error: updateRequestError } = await supabase
    .from("training_request")
    .update({ 
      trainer_id: trainerId,
      trainer: trainerName 
    })
    .eq("id", requestId)
    .select()
    .single();

  if (updateRequestError) throw updateRequestError;

  // 2. Upsert into trainer_training_records
  const { error: recordError } = await supabase
    .from("trainer_training_records")
    .upsert({
      trainer_id: trainerId,
      request_id: requestId,
      training_id: null,
      training_type: "custom",
      status: request.status,
      proposed_date: request.proposed_date,
      archived: false,
    }, {
      onConflict: "request_id, trainer_id",
    });

  if (recordError) throw recordError;
}

export async function addTrainer(form: {
  firstName: string;
  lastName: string;
  chapter: string;
  preferredCategory: string;
}): Promise<Trainer | null> {
  const { data, error } = await supabase
    .from("trainers")
    .insert({
      first_name: form.firstName,
      last_name: form.lastName,
      chapter: form.chapter,
      preferred_category: form.preferredCategory,
      availability: "Pending",
      image: "",
    })
    .select()
    .single();

  if (error) {
    console.error("addTrainer:", error.message);
    return null;
  }

  return {
    id: data.id,
    trainerId: `TR-${String(data.id).padStart(3, '0')}`, 
    firstName: data.first_name,
    lastName: data.last_name,
    chapter: data.chapter,
    preferredCategory: data.preferred_category,
    availability: data.availability,
    image: data.image ?? "",
  };
}

export async function approveTrainer(id: number): Promise<boolean> {
  const { error } = await supabase
    .from("trainers")
    .update({ availability: "Accepting Training" })
    .eq("id", id);

  if (error) {
    console.error("approveTrainer:", error.message);
    return false;
  }
  return true;
}

export async function rejectTrainer(id: number): Promise<boolean> {
  const { error } = await supabase
    .from("trainers")
    .update({ availability: null }) 
    .eq("id", id);

  if (error) {
    console.error("rejectTrainer:", error.message);
    return false;
  }
  return true;
}

export async function updateTrainer(id: number, data: Partial<{
  firstName: string;
  lastName: string;
  chapter: string;
  preferredCategory: string;
  availability: string;
  image: string;
}>): Promise<boolean> {
  const { error } = await supabase
    .from("trainers")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      chapter: data.chapter,
      preferred_category: data.preferredCategory,
      availability: data.availability,
      image: data.image,
    })
    .eq("id", id);

  if (error) {
    console.error("updateTrainer:", error.message);
    return false;
  }
  return true;
}

export async function deleteTrainer(id: number): Promise<boolean> {
  const { error } = await supabase
    .from("trainers")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteTrainer:", error.message);
    return false;
  }
  return true;
}


export async function fetchTrainingThumbnail(trainingTitle: string): Promise<string> {
  const { data } = await supabase
    .from("trainings")
    .select("thumbnail")
    .eq("title", trainingTitle.trim())
    .maybeSingle();

  return data?.thumbnail ?? "";
}

export async function fetchChapters(): Promise<string[]> {
  const { data } = await supabase
    .from("chapters")
    .select("name")
    .order("name");

  return data ? data.map((c: { name: string }) => c.name) : [];
}