import { supabase } from "@/lib/supabase/Client";

export async function GetUser() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, first_name')
    .eq('id', user.id)
    .single();

  return {
    userName: profile?.username, 
    firstName: profile?.first_name,
    email: user.email,
  };
}