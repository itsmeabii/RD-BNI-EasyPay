import { Outlet } from "react-router-dom";
import { useState } from "react";
import { UserNavigationSection } from "../../components/UserNavigationSection";
import { MEMBER_NAV_ITEMS } from "@/constants/routes";
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
        <UserNavigationSection menu_items={MEMBER_NAV_ITEMS}/>

        {/* Page content */}
        <main className="flex-1 min-w-0">
          <Outlet context={{ setPageTitle }} />
        </main>
      </div>
    </div>
  );
}