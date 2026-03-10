import { Outlet, useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] ?? "My Account";

  return (
    <div className="min-h-screen bg-[#f4f4f4] px-8 py-8">

      {/* Title — above everything including the sidebar */}
      <h1 className="font-bold text-[#cf2031] text-3xl mb-6">
        {title}
      </h1>

      {/* Sidebar + content side by side */}
      <div className="flex gap-6 items-start">
        <UserNavigationSection />
        <main className="flex-1 min-w-0 mt-[25px]">
          <Outlet />
        </main>
      </div>

    </div>
  );
}