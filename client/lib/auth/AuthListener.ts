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
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (_event, session) => {

      if (!session?.user) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const user = session.user;

      setUser({
        id: user.id,
        email: user.email ?? "",
        userName: user.user_metadata?.username ?? "",
        role: user.user_metadata?.role ?? "",
      });

      setIsLoading(false);
    }
  );

  return subscription;
}