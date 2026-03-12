import { supabase } from "@/lib/supabase/Client";

export async function GetUser() {
  const { data: { session } } = await supabase.auth.getSession(); 

  if (!session?.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, first_name, role, email")
    .eq("id", session.user.id)
    .single();

  return {
    id: session.user.id,
    userName: profile?.username,
    firstName: profile?.first_name,
    email: session.user.email,
    role: profile?.role,
  };
}