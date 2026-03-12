import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ADMIN_PATHS } from "@/constants/routes";

export const AdminNavigationSection = (): JSX.Element => {
  const { logout } = useAuth();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (label: string) => {
    setOpenSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block pl-8 pr-4 py-[10px] text-[17px] font-semibold ${
      isActive ? "text-[#cf2031] font-bold" : "text-[#817d7d]"
    }`;

  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block pl-4 py-[8px] text-[14px] font-semibold ${
      isActive ? "text-[#cf2031] font-bold" : "text-[#817d7d]"
    }`;

  const menuItems = [
    { label: "Account Details", to: ADMIN_PATHS.ACCOUNT_DETAILS },
    { label: "Addresses", to: ADMIN_PATHS.ADDRESSES },
    { label: "Downloads", to: ADMIN_PATHS.DOWNLOADS },
    { label: "My Wallet", to: ADMIN_PATHS.MY_WALLET },
    { label: "Order History", to: ADMIN_PATHS.ORDER_HISTORY },
    { label: "Trainer List", to: ADMIN_PATHS.TRAINER_LIST },
    {
      label: "Trainings",
      children: [
        { label: "Regular Trainings", to: ADMIN_PATHS.REGULAR_TRAININGS },
        { label: "Custom Trainings", to: ADMIN_PATHS.CUSTOM_TRAININGS },
      ],
    },
    { label: "View Records", to: ADMIN_PATHS.VIEW_RECORDS },
  ];

  return (
    <nav className="w-[248px] flex-shrink-0" role="navigation">
      <p className="text-[#817d7d] text-[10px] font-semibold mb-[6px] pl-[9px]">Menu</p>
      <div className="w-[230px] rounded-[5px] border border-[#817d7d] bg-white">
        {menuItems.map((item) =>
          item.children ? (
            <div key={item.label}>
              <button
                onClick={() => toggleSection(item.label)}
                className={`w-full text-left pl-8 pr-4 py-[14px] text-[17px] font-semibold transition-colors ${
                  openSections.includes(item.label) ? "text-[#cf2031]" : "text-[#817d7d]"
                }`}
              >
                {item.label}
              </button>
              {openSections.includes(item.label) && (
                <div className="ml-8 border-l-2 border-[#cf2031] mb-2">
                  {item.children.map((child) => (
                    <NavLink key={child.to} to={child.to} className={subLinkClass}>
                      - {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink key={item.to} to={item.to!} className={navLinkClass}>
              {item.label}
            </NavLink>
          )
        )}

        <button
          onClick={logout}
          className="block w-full text-left pl-8 pr-4 py-[14px] text-[17px] font-semibold text-[#817d7d] hover:text-[#cf2031] transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};