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

export async function fetchTrainings(): Promise<string[]> {
  const { data, error } = await supabase
    .from("trainings")
    .select("title")
    .order("title");

  if (error) {
    console.error("fetchTrainings:", error.message);
    return [];
  }

  return data.map((row: { title: string }) => row.title);
}

export async function submitTrainerApplication(form: {
  firstName: string;
  lastName: string;
  chapter: string;
  training: string;
  description: string;
  file: File;
}): Promise<{ success: boolean; error?: string }> {
  const fileExt = form.file.name.split(".").pop();
  const fileName = `${Date.now()}_${form.firstName}_${form.lastName}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("trainer_pictures")
    .upload(fileName, form.file, { upsert: false });

  if (uploadError) {
    console.error("submitTrainerApplication upload:", uploadError.message);
    return { success: false, error: "Failed to upload picture. Please try again." };
  }

  const { data: urlData } = supabase.storage
    .from("trainer_pictures")
    .getPublicUrl(fileName);

  const pictureUrl = urlData?.publicUrl ?? "—";

  const { error: insertError } = await supabase
    .from("trainer_application")
    .insert({
      first_name: form.firstName,
      last_name: form.lastName,
      chapter: form.chapter,
      training: form.training,
      description: form.description,
      picture_url: pictureUrl,
    });

  if (insertError) {
    console.error("submitTrainerApplication insert:", insertError.message);
    return { success: false, error: "Failed to submit application. Please try again." };
  }

  return { success: true };
}

export async function assignTrainerToRequest(
  requestId: string,
  trainerId: number,
  trainerName: string
): Promise<void> {
  const { error } = await supabase
    .from("training_request")
    .update({ trainer: trainerName, status: "Approved" })
    .eq("id", requestId);

  if (error) {
    console.error("assignTrainerToRequest:", error.message);
    throw new Error(error.message);
  }
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
      availability: "Accepting Training",
      image: "",
    })
    .select("id, first_name, last_name, chapter, preferred_category, availability, image")
    .single();

  if (error) {
    console.error("addTrainer:", error.message);
    return null;
  }

  return {
    id: data.id,
    trainerId: `TR-${String(data.id).padStart(3, "0")}`,
    firstName: data.first_name ?? "",
    lastName: data.last_name ?? "",
    chapter: data.chapter ?? "",
    preferredCategory: data.preferred_category ?? "",
    availability: data.availability ?? null,
    image: data.image ?? "",
  };
}

export async function updateTrainer(
  id: number,
  form: {
    firstName: string;
    lastName: string;
    chapter: string;
    preferredCategory: string;
    availability: string;
    image: string;
  }
): Promise<boolean> {
  const { error } = await supabase
    .from("trainers")
    .update({
      first_name: form.firstName,
      last_name: form.lastName,
      chapter: form.chapter,
      preferred_category: form.preferredCategory,
      availability: form.availability,
      image: form.image,
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
    .update({ availability: "Rejected" })
    .eq("id", id);

  if (error) {
    console.error("rejectTrainer:", error.message);
    return false;
  }
  return true;
}