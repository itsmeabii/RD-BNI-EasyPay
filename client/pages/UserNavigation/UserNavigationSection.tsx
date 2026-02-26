import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
//import polygon6 from "./polygon-6.svg";
//import polygon7 from "./polygon-7.svg";

interface NavigationItem {
  id: string;
  label: string;
  isActive: boolean;
}

export const UserNavigationSection = (): JSX.Element => {
  const navigationItems: NavigationItem[] = [
    { id: "account-details", label: "Account Details", isActive: false },
    { id: "addresses", label: "Addresses", isActive: false },
    { id: "downloads", label: "Downloads", isActive: false },
    { id: "my-wallet", label: "My Wallet", isActive: false },
    { id: "order-history", label: "Order History", isActive: false },
    {
      id: "trainer-application",
      label: "Trainer Application",
      isActive: false,
    },
    { id: "upcoming-trainings", label: "Upcoming Trainings", isActive: true },
    { id: "logout", label: "Logout", isActive: false },
  ];

  const [activeItem, setActiveItem] = useState<string>("upcoming-trainings");

  const handleNavigation = (itemId: string) => {
    setActiveItem(itemId);
  };

  return (
    <nav
      className="absolute top-[220px] left-[30px] w-[248px] h-[452px]"
      role="navigation"
      aria-label="User account navigation"
    >
      <div className="absolute top-[17px] left-0 w-[230px] h-[435px] rounded-[5px] border border-solid border-[#817d7d]" />

      <div className="absolute top-0 left-[9px] w-7 [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#817d7d] text-[10px] tracking-[0] leading-[normal]">
        Menu
      </div>

      <ul className="list-none m-0 p-0">
        <li className="absolute top-[65px] left-8">
          <button
            onClick={() => handleNavigation("account-details")}
            className={`w-[131px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[17px] tracking-[0] leading-5 whitespace-nowrap text-left bg-transparent border-0 cursor-pointer p-0 ${
              activeItem === "account-details"
                ? "text-[#cf2031]"
                : "text-[#817d7d]"
            }`}
            aria-current={activeItem === "account-details" ? "page" : undefined}
          >
            Account Details
          </button>
        </li>

        <li className="absolute top-[109px] left-8">
          <button
            onClick={() => handleNavigation("addresses")}
            className={`w-[88px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[17px] tracking-[0] leading-5 whitespace-nowrap text-left bg-transparent border-0 cursor-pointer p-0 ${
              activeItem === "addresses" ? "text-[#cf2031]" : "text-[#817d7d]"
            }`}
            aria-current={activeItem === "addresses" ? "page" : undefined}
          >
            Addresses
          </button>
        </li>

        <li className="absolute top-[153px] left-8">
          <button
            onClick={() => handleNavigation("downloads")}
            className={`w-[92px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[17px] tracking-[0] leading-5 whitespace-nowrap text-left bg-transparent border-0 cursor-pointer p-0 ${
              activeItem === "downloads" ? "text-[#cf2031]" : "text-[#817d7d]"
            }`}
            aria-current={activeItem === "downloads" ? "page" : undefined}
          >
            Downloads
          </button>
        </li>

        <li className="absolute top-[193px] left-8">
          <button
            onClick={() => handleNavigation("my-wallet")}
            className={`w-[81px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[17px] tracking-[0] leading-5 whitespace-nowrap text-left bg-transparent border-0 cursor-pointer p-0 ${
              activeItem === "my-wallet" ? "text-[#cf2031]" : "text-[#817d7d]"
            }`}
            aria-current={activeItem === "my-wallet" ? "page" : undefined}
          >
            My Wallet
          </button>
        </li>

        <li className="absolute top-[234px] left-8">
          <button
            onClick={() => handleNavigation("order-history")}
            className={`w-28 [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[17px] leading-5 whitespace-nowrap tracking-[0] text-left bg-transparent border-0 cursor-pointer p-0 ${
              activeItem === "order-history"
                ? "text-[#cf2031]"
                : "text-[#817d7d]"
            }`}
            aria-current={activeItem === "order-history" ? "page" : undefined}
          >
            Order History
          </button>
        </li>

        <li className="absolute top-[277px] left-8">
          <button
            onClick={() => handleNavigation("trainer-application")}
            className={`w-[157px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[17px] tracking-[0] leading-5 whitespace-nowrap text-left bg-transparent border-0 cursor-pointer p-0 ${
              activeItem === "trainer-application"
                ? "text-[#cf2031]"
                : "text-[#817e7e]"
            }`}
            aria-current={
              activeItem === "trainer-application" ? "page" : undefined
            }
          >
            Trainer Application
          </button>
        </li>

        <li className="absolute top-80 left-8">
          <button
            onClick={() => handleNavigation("upcoming-trainings")}
            className={`w-[167px] [font-family:'Inter-Bold',Helvetica] font-bold text-[17px] tracking-[0] leading-5 whitespace-nowrap text-left bg-transparent border-0 cursor-pointer p-0 ${
              activeItem === "upcoming-trainings"
                ? "text-[#cf2031]"
                : "text-[#817d7d]"
            }`}
            aria-current={
              activeItem === "upcoming-trainings" ? "page" : undefined
            }
          >
            Upcoming Trainings
          </button>
        </li>

        <li className="absolute top-[363px] left-8">
          <button
            onClick={() => handleNavigation("logout")}
            className={`w-[157px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[17px] tracking-[0] leading-5 whitespace-nowrap text-left bg-transparent border-0 cursor-pointer p-0 ${
              activeItem === "logout" ? "text-[#cf2031]" : "text-[#817e7e]"
            }`}
            aria-label="Logout from account"
          >
            Logout
          </button>
        </li>
      </ul>

      <div
        className="absolute top-10 left-[215px] w-2.5 h-[409px]"
        role="presentation"
        aria-hidden="true"
      >
        <div className="absolute top-[17px] left-px w-2 h-[374px] bg-[#b3b3b3]" />

        <div className="absolute top-[22px] left-1 w-[3px] h-[111px] bg-[#d9d9d9] rounded-[5px]" />

        <img
          className="top-0.5 absolute left-px w-[7px] h-[9px]"
          alt=""
          //src={polygon6}
          role="presentation"
        />

        <img
          className="top-[397px] absolute left-px w-[7px] h-[9px]"
          alt=""
          //src={polygon7}
          role="presentation"
        />
      </div>
    </nav>
  );
};
