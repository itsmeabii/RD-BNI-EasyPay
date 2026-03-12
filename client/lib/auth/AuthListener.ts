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
    if (_event === "SIGNED_OUT") {
      setUser(null);
      return;
    }

    if (_event === "SIGNED_IN") {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, first_name, email, role")
        .eq("id", session!.user.id)
        .single();

      setUser({
        id: session!.user.id,
        email: session!.user.email ?? "",
        userName: profile?.username ?? "",
        role: profile?.role ?? "",
      });
    }
  });

  return subscription;
}