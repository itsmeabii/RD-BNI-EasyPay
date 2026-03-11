import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/Client";

type AuthUser = {
  id: string;
  email: string;
  userName: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  console.log("AuthContext mounted");
  
  supabase.auth.getSession().then(({ data: { session } }) => {
    console.log("getSession result:", session);
    
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email ?? "",
        userName: session.user.user_metadata?.username ?? "",
      });
    }
    
    setIsLoading(false);
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      console.log("onAuthStateChange:", _event, session);
    }
  );

  return () => subscription.unsubscribe();
}, []);

  const login = (user: AuthUser) => setUser(user);
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}