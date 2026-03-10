import { supabase } from "@/lib/supabase/Client";

type AuthUser = {
  id: string;
  email: string;
  userName: string;
};

export function subscribeToAuthChanges(
  setUser: (user: AuthUser | null) => void,
  setIsLoading: (value: boolean) => void 
) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, first_name")
          .eq("id", session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          userName: profile?.username ?? "",
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    }
  );

  return subscription;
}