import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white px-4 md:px-[70px] py-4 md:py-5 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        {/* BNI Taguig logo block */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              {/* BNI red icon */}
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="38" rx="4" fill="#CF2031"/>
                <text x="5" y="26" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="800" fill="white">BNI</text>
              </svg>
              <div className="ml-1">
                <div className="text-[#CF2031] font-bold text-xs leading-none">TAGUIG</div>
                <div className="text-gray-500 text-[8px] leading-tight">Where your business takes off.</div>
              </div>
            </div>
          </div>
          {/* Vertical divider */}
          <div className="w-px h-10 bg-gray-300 mx-2" />
          {/* EASYPAY text */}
          <div className="flex items-baseline">
            <span className="font-black text-2xl md:text-3xl text-[#CF2031] tracking-tight">EASY</span>
            <span className="font-black text-2xl md:text-3xl text-gray-800 tracking-tight">PAY</span>
          </div>
        </div>
      </Link>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          to="/trainings"
          className="text-gray-900 font-semibold text-lg hover:text-[#CF2031] transition-colors"
        >
          Trainings
        </Link>
        <div className="flex items-center gap-1 cursor-pointer group">
          <Link
            to="/memberships"
            className="text-gray-900 font-semibold text-lg hover:text-[#CF2031] transition-colors"
          >
            Memberships
          </Link>
          <ChevronDown className="w-4 h-4 text-gray-700 group-hover:text-[#CF2031] transition-colors" />
        </div>
        <Link
          to="/"
          className="text-[#CF2031] font-semibold text-lg hover:opacity-80 transition-opacity"
        >
          Merchandise
        </Link>
      </nav>

      {/* Mobile hamburger */}
      <button className="md:hidden flex flex-col gap-1.5 p-2">
        <span className="w-6 h-0.5 bg-gray-800 block" />
        <span className="w-6 h-0.5 bg-gray-800 block" />
        <span className="w-6 h-0.5 bg-gray-800 block" />
      </button>
    </header>
  );
}
