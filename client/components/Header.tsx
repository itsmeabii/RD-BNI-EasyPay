import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  className?: string;

}

export default function Header({ className }: HeaderProps) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <header>
      {/* Top Red Bar */}
      <div className="bg-bni-red h-[60px] lg:h-[77px] flex items-center justify-between px-4 sm:px-6 lg:px-16">
        <Link
          to="/"
          className="flex items-center gap-2 text-white text-xs sm:text-sm lg:text-[15px] hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="hidden sm:inline">Back to BNI Taguig Website</span>
          <span className="sm:hidden">Back</span>
        </Link>
        {user ? (
          <div className="flex items-center gap-2 text-white text-xs sm:text-sm lg:text-[15px]">
            <User className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">{user.userName}</span>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 text-white text-xs sm:text-sm lg:text-[15px] hover:opacity-90 transition-opacity"
          >
            <User className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">Login / Register</span>
            <span className="sm:hidden">Login</span>
          </Link>
        )}
      </div>

      {/* White Navigation Bar */}
      <div className="bg-white h-[90px] lg:h-[130px] flex items-center justify-between px-4 sm:px-6 lg:px-14">
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ec1ad698b66aa756da364a855d1f681268df0380?width=700"
            alt="BNI Taguig EasyPay"
            className="h-8 sm:h-10 lg:h-12 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6 lg:gap-12">
          <Link
            to="/training#top"
            className={`text-sm sm:text-lg lg:text-xl font-bold hover:text-bni-red transition-colors ${
              location.pathname === "/training" ? "text-bni-red" : "text-black"
            }`}
          >
            Training
          </Link>
          <Link
            to="/journey"
            className={`text-sm sm:text-lg lg:text-xl font-bold hover:text-bni-red transition-colors ${
              location.pathname === "/journey" ? "text-bni-red" : "text-black"
            }`}
          >
            Journey
          </Link>
          <div className="relative group">
            <button
              className={`flex items-center gap-1 text-sm sm:text-lg lg:text-xl font-bold hover:text-bni-red transition-colors ${
                location.pathname.startsWith("/membership") ? "text-bni-red" : "text-black"
              }`}
            >
              Membership
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 border-t-4 border-bni-red bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <Link to="/membership" className="block px-4 py-2.5 text-md hover:bg-red-50 hover:text-bni-red transition">Membership</Link>
              <Link to="/membership/renewal" className="block px-4 py-2.5 text-md hover:bg-red-50 hover:text-bni-red transition">Renewal</Link>
              <Link to="/membership/late-fee" className="block px-4 py-2.5 text-md hover:bg-red-50 hover:text-bni-red transition">Late Fee</Link>
              <Link to="/membership/admin-fee" className="block px-4 py-2.5 text-md hover:bg-red-50 hover:text-bni-red transition">Admin Fee</Link>
            </div>
        </div>
          <Link
            to="/merchandise"
            className={`text-sm sm:text-lg lg:text-xl font-bold hover:text-bni-red transition-colors ${
              location.pathname === "/merchandise" ? "text-bni-red" : "text-black"
            }`}
          >
            Merchandise
          </Link>
        </nav>
      </div>
    </header>
  );
}