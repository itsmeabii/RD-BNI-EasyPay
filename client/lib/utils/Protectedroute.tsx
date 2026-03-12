import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isMemberRoute = location.pathname.startsWith("/my-account");

  if (isAdminRoute && user.role !== "admin")
    return <Navigate to="/my-account/AccountDetails" replace />;

  if (isMemberRoute && user.role === "admin")
    return <Navigate to="/admin" replace />;

  return <Outlet />;
}