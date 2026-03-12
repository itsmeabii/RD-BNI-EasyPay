import { Outlet } from "react-router-dom";
import { useState } from "react";
import { UserNavigationSection } from "../UserNavigation/UserNavigationSection";

// Map each route to a page title
const PAGE_TITLES: Record<string, string> = {
  "/my-account/AccountDetails": "Account Details",
  "/my-account/Addresses": "Addresses",
  "/my-account/Downloads": "Downloads",
  "/my-account/Logout": "Logout",
  "/my-account/MyWallet": "My Wallet",
  "/my-account/OrderHistory": "Order History",
  "/my-account/TrainerApplication": "Trainer Application",
  "/my-account/UpcomingTraining": "Upcoming Trainings",
};

export default function MyAccountLayout() {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <div className="min-h-screen bg-[#f4f4f4] px-8 py-8 flex flex-col gap-4">

      {/* Title — above everything including the Menu label and sidebar */}
      {pageTitle && (
        <h1 className="text-[#CF2031] text-[30px] font-bold">{pageTitle}</h1>
      )}

      <div className="flex gap-6 items-start">
        {/* Sidebar */}
        <UserNavigationSection />

        {/* Page content */}
        <main className="flex-1 min-w-0">
          <Outlet context={{ setPageTitle }} />
        </main>
      </div>

    </div>
  );
}