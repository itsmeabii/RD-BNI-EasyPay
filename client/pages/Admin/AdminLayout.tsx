import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AdminNavigationSection } from "./AdminNavigationSection";

const PAGE_TITLES: Record<string, string> = {
  "/admin/CustomTrainings": "Training > Custom Training Request",
  "/admin/RegularTrainings": "Training > Regular Trainings",
  "/admin/TrainerList": "Trainer List",
  "/admin/ViewRecords": "View Records",
  "/admin/AccountDetails": "Account Details",
  "/admin/Downloads": "Downloads",
  "/admin/OrderHistory": "Order History",
};

export default function AdminLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname];

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="px-4 sm:px-6 lg:px-14 pt-6 pb-12">

        {pageTitle && (
          <h1 className="text-[#cf2031] text-[22px] font-bold mb-4">
            {pageTitle}
          </h1>
        )}

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