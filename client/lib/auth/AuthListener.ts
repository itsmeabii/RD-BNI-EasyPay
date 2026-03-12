import { supabase } from "@/lib/supabase/Client";

type AuthUser = {
  id: string;
  email: string;
  userName: string;
  role: string;
};

export function subscribeToAuthChanges(
  setUser: (user: AuthUser | null) => void,
  setIsLoading: (value: boolean) => void
) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (_event === "INITIAL_SESSION") return;
    
    if (_event === "SIGNED_OUT") {
      setUser(null);
      return;
    }

    if (_event === "SIGNED_IN" && session?.user) {
      const { data: { user } } = await supabase.auth.getUser(); 
      console.log("SIGNED_IN user_metadata:", user?.user_metadata);
      console.log("SIGNED_IN session user_metadata:", session.user.user_metadata);
      setUser({
        id: user!.id,
        email: user!.email ?? "",
        userName: user!.user_metadata?.username ?? "",
        role: user!.user_metadata?.role ?? "",
      });
    }
  });

  return subscription;
}