import { supabase } from "@/lib/supabase/Client";
import type { CartItem } from "@/context/CartContext";

export async function loadCartFromDB(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("loadCartFromDB:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.item_id,          
    title: row.title,
    price: row.price,
    thumbnail: row.thumbnail ?? "",
    qty: row.qty,
    selectedDate: row.selected_date ?? undefined,
    selectedTime: row.selected_time ?? undefined,
  }));
}

export async function upsertCartItem(
  userId: string,
  item: CartItem,
  itemType: "training" | "membership" 
): Promise<void> {
  const { error } = await supabase.from("cart_items").upsert(
    {
      user_id: userId,
      item_id: item.id,              
      item_type: itemType,          
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
      qty: item.qty ?? 1,
      selected_date: item.selectedDate ?? null,
      selected_time: item.selectedTime ?? null,
    },
    { onConflict: "user_id,item_id" } 
  );

  if (error) console.error("upsertCartItem:", error.message);
}

export async function deleteCartItem(userId: string, itemId: number): Promise<void> {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("item_id", itemId);          

  if (error) console.error("deleteCartItem:", error.message);
}

export async function clearCartFromDB(userId: string): Promise<void> {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (error) console.error("clearCartFromDB:", error.message);
}