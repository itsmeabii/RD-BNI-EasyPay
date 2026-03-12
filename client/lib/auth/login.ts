import { supabase } from "@/lib/supabase/Client"

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResult = {
  userName: string;
  email: string;
  role: string;
};

export async function LoginWithEmail({ email, password }: LoginPayload): Promise<LoginResult> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error("Invalid email or password. Please try again.");

  const user = data.user;
  const userName = user.user_metadata?.username ?? user.email ?? "";
  const role = user.user_metadata?.role ?? "";

  return { userName: userName, email: user.email ?? "", role: role };
}