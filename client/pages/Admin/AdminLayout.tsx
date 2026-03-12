import { Outlet } from "react-router-dom";
import { UserNavigationSection } from "@/components/UserNavigationSection";
import { ADMIN_NAV_ITEMS } from "@/constants/routes";
import { useState } from "react";

export default function AdminLayout() {
   const [pageTitle, setPageTitle] = useState("");

  return (
    <div className="min-h-screen bg-white">      
      <div className="px-4 sm:px-6 lg:px-14 pt-6 pb-12">
        <div className="flex gap-6 items-start">
          <div className="flex flex-col gap-4 flex-shrink-04">
            {pageTitle && (
              <h1 className="text-[#CF2031] text-[30px] font-bold">{pageTitle}</h1>
            )}
             {/* Admin Sidebar */}
            <UserNavigationSection menu_items={ADMIN_NAV_ITEMS} />
          </div>
        
          {/* Page content */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <Outlet context={{ setPageTitle }} />
          </div>
        </div>
      </div>
    </div>
  );
}