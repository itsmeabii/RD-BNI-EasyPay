import { Outlet } from "react-router-dom";
import { AdminNavigationSection } from "./AdminNavigationSection";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="px-4 sm:px-6 lg:px-14 pt-6 pb-12">
        <div className="flex gap-6 items-start">
          <AdminNavigationSection />
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}