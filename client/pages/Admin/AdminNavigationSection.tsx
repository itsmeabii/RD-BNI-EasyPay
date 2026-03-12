import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ADMIN_NAV_ITEMS, ADMIN_PATHS } from "../../constants/routes";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block pl-8 pr-4 py-[14px] text-[17px] font-semibold ${
    isActive ? "text-[#cf2031] font-bold" : "text-[#817d7d]"
  }`;

const subLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block pl-4 py-[8px] text-[14px] font-semibold ${
    isActive ? "text-[#cf2031] font-bold" : "text-[#817d7d]"
  }`;

export const AdminNavigationSection = (): JSX.Element => {
  const [trainingsOpen, setTrainingsOpen] = useState(true);

  return (
    <nav
      className="w-[248px] flex-shrink-0"
      role="navigation"
      aria-label="Admin navigation"
    >
      <p className="text-[#817d7d] text-[10px] font-semibold mb-[6px] pl-[9px]">
        Menu
      </p>

      <div className="w-[230px] rounded-[5px] border border-[#817d7d] bg-white">
        {ADMIN_NAV_ITEMS.filter(item => item.label !== "View Records" && item.label !== "Logout").map((item) => (
          <NavLink key={item.to} to={item.to} className={navLinkClass}>
            {item.label}
          </NavLink>
        ))}

        <button
          onClick={() => setTrainingsOpen((p) => !p)}
          className={`w-full text-left pl-8 pr-4 py-[14px] text-[17px] font-semibold transition-colors ${
            trainingsOpen ? "text-[#cf2031]" : "text-[#817d7d]"
          }`}
        >
          Trainings
        </button>

        {trainingsOpen && (
          <div className="ml-8 border-l-2 border-[#cf2031] mb-2">
            <NavLink to={ADMIN_PATHS.REGULAR_TRAININGS} className={subLinkClass}>- Regular Trainings</NavLink>
            <NavLink to={ADMIN_PATHS.CUSTOM_TRAININGS} className={subLinkClass}>- Custom Trainings</NavLink>
          </div>
        )}

        <NavLink to={ADMIN_PATHS.VIEW_RECORDS} className={navLinkClass}>View Records</NavLink>
        <NavLink to={ADMIN_PATHS.LOGOUT} className={navLinkClass}>Logout</NavLink>
      </div>
    </nav>
  );
};