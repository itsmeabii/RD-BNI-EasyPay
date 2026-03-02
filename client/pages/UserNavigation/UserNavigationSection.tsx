import { NavLink } from "react-router-dom";

export const UserNavigationSection = (): JSX.Element => {
  const navItems = [
    { label: "Account Details", to: "/my-account/AccountDetails" },
    { label: "Addresses", to: "/my-account/Addresses" },
    { label: "Downloads", to: "/my-account/Downloads" },
    { label: "My Wallet", to: "/my-account/MyWallet" },
    { label: "Order History", to: "/my-account/OrderHistory" },
    { label: "Trainer Application", to: "/my-account/TrainerApplication" },
    { label: "Upcoming Trainings", to: "/my-account/UpcomingTraining" },
    { label: "Logout", to: "/my-account/Logout" },
  ];

  return (
    <nav
      className="w-[248px] flex-shrink-0"
      role="navigation"
      aria-label="User account navigation"
    >
      {/* "Menu" label */}
      <p className="text-[#817d7d] text-[10px] font-semibold mb-[6px] pl-[9px]">
        Menu
      </p>

      {/* Nav card */}
      <div className="w-[230px] rounded-[5px] border border-[#817d7d] bg-white">
        {navItems.map((item) => (
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