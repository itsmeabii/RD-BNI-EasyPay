import { Outlet } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AdminNavigationSection } from "./AdminNavigationSection";

export default function AdminLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Top Section (Optional: add user info here using the 'user' variable) */}
      
      <div className="px-4 sm:px-6 lg:px-14 pt-6 pb-12">
        <div className="flex gap-6 items-start">
          {/* Admin Sidebar */}
          <AdminNavigationSection />

          {/* Page content - This is where nested routes like CustomTrainings will appear */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}