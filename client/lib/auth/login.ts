import { supabase } from "@/lib/supabase/Client"
import { AuthUser } from "@/context/AuthContext";

type LoginPayload = {
  email: string;
  password: string;
};

export async function LoginWithEmail({ email, password }: LoginPayload): Promise<AuthUser> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error("Invalid email or password. Please try again.");

  const user = data.user;
  const userName = user.user_metadata?.username ?? user.email ?? "";
  const role = user.user_metadata?.role ?? "";

  return { id: user.id, email: user.email ?? "", userName: userName, role: role };
}