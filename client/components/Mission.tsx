import { Link } from "react-router-dom";

export function Mission() {
  return (
    <div className="w-full max-w-[1062px] flex flex-col gap-[6px]">
      <h2 className="text-[28px] md:text-[35px] font-semibold text-black">
        Mission:
      </h2>

      <div className="w-full h-[101px] relative border border-[#848484] bg-bni-lightgray shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)]">
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <p className="text-center text-[16px] md:text-[20px] font-semibold italic">
            <span className="text-bni-gray">Please </span>
            <Link to="/login" className="text-bni-red hover:underline">
              Login
            </Link>
            <span className="text-bni-gray"> or </span>
            <Link to="/signup" className="text-bni-red hover:underline">
              Sign Up
            </Link>
            <span className="text-bni-gray"> with your BNI Account to see Mission Map</span>
          </p>
        </div>
      </div>
    </div>
  );
}
