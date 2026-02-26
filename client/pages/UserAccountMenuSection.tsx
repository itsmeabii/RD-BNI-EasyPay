import { Link } from "react-router-dom";

interface MenuItem {
  label: string;
  isActive?: boolean;
  isLink?: boolean;
  to?: string;
}

export const UserAccountMenuSection = (): JSX.Element => {
  // Updated items to include paths and isLink: true
  const menuItems: MenuItem[] = [
    { label: "Account Details", isLink: true, to: "/Journey" },
    { label: "Addresses", isLink: true, to: "/addresses" },
    { label: "Downloads", isLink: true, to: "/merchandise" },
    { label: "My Wallet", isLink: true, to: "/wallet" },
    { label: "Order History", isLink: true, to: "/order-history" },
    { label: "Trainer Application", isLink: true, to: "/trainer-application" },
    { label: "Upcoming Trainings", isLink: true, to: "/upcoming-trainings", isActive: true },
    { label: "Logout", isLink: true, to: "/logout" },
  ];

  const getTopPosition = (index: number): string => {
    const positions = [
      "75px",
      "119px",
      "162px",
      "203px",
      "246px",
      "286px",
      "326px",
      "369px",
    ];
    return positions[index];
  };

  return (
    <nav
      className="absolute top-[223px] left-[35px] w-[248px] h-[453px]"
      aria-label="User account menu"
    >
      <h2 className="absolute top-0 left-[7px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#817d7d] text-[10px] tracking-[0] leading-[normal] whitespace-nowrap">
        Menu
      </h2>

      <ul className="list-none p-0 m-0">
        {menuItems.map((item, index) => {
          const baseClasses =
            "absolute left-8 [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[17px] tracking-[0] leading-5 whitespace-nowrap";
          
          // Logic for colors based on isActive
          const linkColorClass = item.isActive
            ? "text-[#cf2031]"
            : "text-[#817e7e]";
          
          const topPosition = getTopPosition(index);

          // This block now handles all items since they all have isLink: true
          if (item.isLink && item.to) {
            return (
              <li
                key={item.label}
                style={{ top: topPosition }}
                className="absolute"
              >
                <Link
                  className={`${baseClasses} ${linkColorClass} w-[157px] block hover:opacity-80 transition-opacity`}
                  to={item.to}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          // Fallback for items without links (unchanged logic)
          const colorClass = item.isActive ? "text-[#cf2031]" : "text-[#817d7d]";
          return (
            <li
              key={item.label}
              className={`${baseClasses} ${colorClass}`}
              style={{ top: topPosition }}
            >
              {item.label}
            </li>
          );
        })}
      </ul>

      {/* Decorative elements kept exactly as they were */}
      <div
        className="absolute top-[45px] left-[214px] w-2.5 h-[403px]"
        role="presentation"
        aria-hidden="true"
      >
        <div className="absolute top-[17px] left-px w-2 h-[369px] bg-[#b3b3b3]" />
        <div className="absolute top-[22px] left-1 w-[3px] h-[109px] bg-[#d9d9d9] rounded-[5px]" />
      </div>

      <div
        className="absolute top-[18px] left-0 w-[230px] h-[435px] rounded-[5px] border border-solid border-[#817d7d]"
        role="presentation"
        aria-hidden="true"
      />
    </nav>
  );
};