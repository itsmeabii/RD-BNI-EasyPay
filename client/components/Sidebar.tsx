import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Account Details", path: "/account" },
  { label: "Addresses", path: "/addresses" },
  { label: "Downloads", path: "/downloads" },
  { label: "My Wallet", path: "/wallet" },
  { label: "Order History", path: "/orders" },
  { label: "Training Request", path: "/" },
  { label: "Logout", path: "/logout" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-[230px] shrink-0">
      <p className="text-[#817E7E] text-xs font-semibold mb-0 px-1">Menu</p>
      <div className="border border-[#817E7E] rounded-[5px] bg-white overflow-hidden">
        <nav className="py-4">
          {menuItems.map((item) => {
            const isTrainingRequest = item.label === "Training Request";
            const isActive = isTrainingRequest || location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`block px-6 py-3 text-[17px] font-semibold font-inter transition-colors hover:text-[#CF2031] ${
                  isActive
                    ? "text-[#CF2031] font-bold"
                    : "text-[#817E7E]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
