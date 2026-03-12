import { supabase } from "@/lib/supabase/Client";
import { Trainer } from "@/types/TrainerTypes";

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
