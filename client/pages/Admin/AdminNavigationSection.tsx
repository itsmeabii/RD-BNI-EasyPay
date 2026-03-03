import { NavLink } from "react-router-dom";
import { useState } from "react";

export const AdminNavigationSection = (): JSX.Element => {
  const [trainingsOpen, setTrainingsOpen] = useState(true);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block pl-8 pr-4 py-[14px] text-[17px] font-semibold ${
      isActive ? "text-[#cf2031] font-bold" : "text-[#817d7d]"
    }`;

  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block pl-4 py-[8px] text-[14px] font-semibold ${
      isActive ? "text-[#cf2031] font-bold" : "text-[#817d7d]"
    }`;

  return (
    <nav
      className="w-[248px] flex-shrink-0"
      role="navigation"
      aria-label="Admin navigation"
    >
      {/* "Menu" label */}
      <p className="text-[#817d7d] text-[10px] font-semibold mb-[6px] pl-[9px]">
        Menu
      </p>

      {/* Nav card */}
      <div className="w-[230px] rounded-[5px] border border-[#817d7d] bg-white">
        <NavLink to="/admin/AccountDetails" className={navLinkClass}>
          Account Details
        </NavLink>
        <NavLink to="/admin/Addresses" className={navLinkClass}>
          Addresses
        </NavLink>
        <NavLink to="/admin/Downloads" className={navLinkClass}>
          Downloads
        </NavLink>
        <NavLink to="/admin/MyWallet" className={navLinkClass}>
          My Wallet
        </NavLink>
        <NavLink to="/admin/OrderHistory" className={navLinkClass}>
          Order History
        </NavLink>

        {/* Trainings expandable */}
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
            <NavLink to="/admin/RegularTrainings" className={subLinkClass}>
              - Regular Trainings
            </NavLink>
            <NavLink to="/admin/CustomTrainings" className={subLinkClass}>
              - Custom Trainings
            </NavLink>
            <NavLink to="/admin/TrainingManagement" className={subLinkClass}>
              Training Management
            </NavLink>
          </div>
        )}

        <NavLink to="/admin/Logout" className={navLinkClass}>
          Logout
        </NavLink>
      </div>
    </nav>
  );
};