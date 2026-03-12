import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  // Wait for auth to resolve before redirecting
  if (isLoading) return null;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Logged in → render the child route
  return <Outlet />;
}