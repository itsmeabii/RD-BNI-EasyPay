import { supabase } from "@/lib/supabase/Client";
import { Merchandise, MerchandiseReview } from "@/types/MerchandiseTypes";

function mapMerchandise(row: any): Merchandise {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    price: row.price,
    thumbnail: row.thumbnail ?? "",
    category: row.category ?? "",
    inStock: row.in_stock,
    stock: row.stock ?? 0,
    images: row.images ?? [],
    colors: row.colors ?? [],
  };
}

export async function fetchMerchandise(): Promise<Merchandise[]> {
  const { data, error } = await supabase
    .from("merchandise")
    .select("*")
    .order("id");

  if (error) {
    console.error("fetchMerchandise:", error.message);
    return [];
  }

  return data.map(mapMerchandise);
}

export async function fetchMerchandiseById(id: number): Promise<Merchandise | null> {
  const { data, error } = await supabase
    .from("merchandise")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("fetchMerchandiseById:", error.message);
    return null;
  }

  return mapMerchandise(data);
}

export async function fetchMerchandiseReviews(merchandiseId: number): Promise<MerchandiseReview[]> {
  const { data, error } = await supabase
    .from("merchandise_reviews")
    .select("*")
    .eq("merchandise_id", merchandiseId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("fetchMerchandiseReviews:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    merchandiseId: row.merchandise_id,
    userId: row.user_id,
    rating: row.rating,
    comment: row.comment ?? "",
    createdAt: row.created_at,
  }));
}