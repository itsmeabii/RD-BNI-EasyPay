import { NavLink } from "react-router-dom";
import { LT_NAV_ITEMS } from "../../constants/routes";

export const UserNavigationSection = (): JSX.Element => {
  return (
    <nav
      className="w-[248px] flex-shrink-0"
      role="navigation"
      aria-label="User account navigation"
    >
      <p className="text-[#817d7d] text-[10px] font-semibold mb-[6px] pl-[9px]">
        Menu
      </p>

      <div className="w-[230px] rounded-[5px] border border-[#817d7d] bg-white">
        {LT_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block pl-8 pr-4 py-[14px] text-[17px] font-semibold ${
                isActive ? "text-[#cf2031] font-bold" : "text-[#817d7d]"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};