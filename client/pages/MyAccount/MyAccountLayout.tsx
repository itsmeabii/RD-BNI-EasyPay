import { Outlet } from "react-router-dom";
import { UserNavigationSection } from "../UserNavigation/UserNavigationSection";

export default function MyAccountLayout() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] px-8 py-8">
      <div className="flex gap-6 items-start">

        {/* Sidebar — renders once, never moves between pages */}
        <UserNavigationSection />

        {/* Page content swaps here */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
}