import { Link } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <>
      {/* Top Red Bar */}
      <div className="bg-bni-red h-[46px] px-4 md:px-[143px] flex items-end justify-end gap-6 md:gap-12">
        <div className="text-white text-[15px] font-medium">BNI International</div>
        <Link to="/login" className="flex items-center gap-2 h-5">
          <User className="w-5 h-5 text-white" />
          <span className="text-white text-[15px] font-medium">Account Login</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-[70px] py-4 gap-4">
        <Link to="/">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/ec1ad698b66aa756da364a855d1f681268df0380?width=700"
            alt="BNI Taguig EasyPay"
            className="w-[250px] md:w-[350px] h-auto"
          />
        </Link>

        <nav className="flex items-center gap-4 md:gap-8 text-[18px] md:text-[20px] font-bold">
          <Link to="/training" className="text-[#212121] hover:text-bni-red transition-colors">
            Training
          </Link>
          <Link to="/journey" className="text-bni-red">
            Journey
          </Link>
          <button className="flex items-center gap-1 text-[#212121] hover:text-bni-red transition-colors">
            <span>Membership</span>
            <ChevronDown className="w-5 h-5" />
          </button>
          <Link to="/merchandise" className="text-[#212121] hover:text-bni-red transition-colors">
            Merchandise
          </Link>
        </nav>
      </div>

      {/* Decorative polygon background - positioned absolutely on the page */}
      <svg
        className="fixed top-[100px] right-0 w-[150px] md:w-[203px] h-auto pointer-events-none z-0 opacity-50"
        viewBox="0 0 203 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M199.789 1.88013L89.26 87.6227L89.4561 2.17339L199.789 1.88013Z" fill="#D9D9D9" />
        <path d="M111.789 91.8801L1.25995 177.623L1.45612 92.1734L111.789 91.8801Z" fill="#D9D9D9" />
        <path d="M202.789 90.8801L92.26 176.623L92.4561 91.1734L202.789 90.8801Z" fill="#D9D9D9" />
      </svg>
    </>
  );
}
