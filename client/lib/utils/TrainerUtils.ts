import { supabase } from "@/lib/supabase/Client";

export type Trainer = {
  id: number;
  name: string;
  chapter: string;
  preferredCategory: string;
  image: string;
};

export async function fetchTrainers(): Promise<Trainer[]> {
  const { data, error } = await supabase
    .from("trainers")
    .select("id, name, chapter, preferred_category, image")
    .order("id");

  if (error) {
    console.error("fetchTrainers:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    chapter: row.chapter ?? "",
    preferredCategory: row.preferred_category ?? "",
    image: row.image ?? "",
  }));
}

