import { Outlet } from "react-router-dom";
import { UserNavigationSection } from "@/components/UserNavigationSection";
import { ADMIN_NAV_ITEMS } from "@/constants/routes";
import { useState } from "react";

export default function AdminLayout() {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="px-4 sm:px-6 lg:px-14 pt-6 pb-12">

        {pageTitle && (
          <h1 className="text-[#CF2031] text-[22px] font-bold mb-4">
            {pageTitle}
          </h1>
        )}

        <div className="flex gap-6 items-start">
          <UserNavigationSection menu_items={ADMIN_NAV_ITEMS} />
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <Outlet context={{ setPageTitle }} />
          </div>
        </div>
      </div>
    </div>
  );
}