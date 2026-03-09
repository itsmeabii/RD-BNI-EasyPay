import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [membershipOpen, setMembershipOpen] = useState(false);

  return (
    <div className="w-full bg-white h-[77px] flex items-center justify-between px-6 shadow-sm relative z-50">
      {/* Logo */}
      <Link to="/">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/4128db2292c0e71798f213f33cc54b27cb481ccb?width=700"
          alt="BNI Taguig EasyPay"
          className="h-12 w-auto object-contain"
        />
      </Link>

      {/* Nav Menu */}
      <nav className="flex items-center gap-8">
        <Link
          to="/"
          className="text-[#212121] font-inter text-xl font-bold hover:text-[#CF2031] transition-colors"
        >
          Training
        </Link>

        <div className="relative">
          <button
            className="flex items-center gap-1 text-[#212121] font-inter text-xl font-bold hover:text-[#CF2031] transition-colors"
            onClick={() => setMembershipOpen((v) => !v)}
          >
            Membership
            <ChevronDown className="w-5 h-5" />
          </button>
          {membershipOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/membership"
                className="block px-4 py-2 text-sm text-[#212121] hover:bg-gray-50"
                onClick={() => setMembershipOpen(false)}
              >
                Membership Plans
              </Link>
              <Link
                to="/membership"
                className="block px-4 py-2 text-sm text-[#212121] hover:bg-gray-50"
                onClick={() => setMembershipOpen(false)}
              >
                My Membership
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/merchandise"
          className="text-[#212121] font-inter text-xl font-bold hover:text-[#CF2031] transition-colors"
        >
          Merchandise
        </Link>
      </nav>
    </div>
  );
}
