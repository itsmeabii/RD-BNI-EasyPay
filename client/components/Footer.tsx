import { ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-6 lg:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-center px-12 lg:px-0">
          2026 BNI Taguig Trainings and Workshops
        </h2>

        {/* Shopping Cart Button - positioned absolutely on larger screens */}
        <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-bni-red text-white rounded-full p-3 lg:p-4 hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
          <span className="absolute -top-1 -right-1 bg-white text-bni-red rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs font-bold">
            0
          </span>
        </button>
      </div>
    </footer>
  );
}
