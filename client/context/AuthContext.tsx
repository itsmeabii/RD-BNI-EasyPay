import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/Client";
import { subscribeToAuthChanges } from "@/lib/auth/AuthListener";

export type AuthUser = {
  id: string;
  email: string;
  userName: string;
  role: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          userName: session.user.user_metadata?.username ?? "",
          role: session.user.user_metadata?.role ?? "",
        });
      }
      setIsLoading(false);
    });

    const subscription = subscribeToAuthChanges(setUser, setIsLoading);

    return () => {
      subscription.unsubscribe();
    };
  }, []);
    
    const logout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout failed:", error);
        return;
      }

      setUser(null);
      window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}