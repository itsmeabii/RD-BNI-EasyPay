import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const workshopImages = [
  "https://api.builder.io/api/v1/image/assets/TEMP/8bc2c9ba1b2e28d3873a474399e704b92aaff888?width=2090",
  "https://api.builder.io/api/v1/image/assets/TEMP/8bc2c9ba1b2e28d3873a474399e704b92aaff888?width=2090",
  "https://api.builder.io/api/v1/image/assets/TEMP/8bc2c9ba1b2e28d3873a474399e704b92aaff888?width=2090",
  "https://api.builder.io/api/v1/image/assets/TEMP/8bc2c9ba1b2e28d3873a474399e704b92aaff888?width=2090",
  "https://api.builder.io/api/v1/image/assets/TEMP/8bc2c9ba1b2e28d3873a474399e704b92aaff888?width=2090",
  "https://api.builder.io/api/v1/image/assets/TEMP/8bc2c9ba1b2e28d3873a474399e704b92aaff888?width=2090",
];

const instructors = [
  {
    name: "Darwin Cheng",
    background:
      "He specializes in training members on core networking strategies, referral generation, and practical skills to maximize their BNI membership and business growth.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ae0579b9c924889d11014479f83664a0e2df0aed?width=254",
  },
  {
    name: "Darwin Cheng",
    background:
      "He specializes in training members on core networking strategies, referral generation, and practical skills to maximize their BNI membership and business growth.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ae0579b9c924889d11014479f83664a0e2df0aed?width=254",
  },
];

const dateOptions = [
  "December 15, 2025",
  "January 10, 2026",
  "February 14, 2026",
];

export default function Training() {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const userName = "Jane Doe";

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? workshopImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === workshopImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow py-8 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Image Carousel */}
            <div className="flex-shrink-0 lg:w-[420px] xl:w-[480px]">
              <div className="relative flex items-center">
                {/* Decorative triangles */}
                <div className="hidden lg:block absolute -left-14 top-10 z-10 pointer-events-none">
                  <svg width="112" height="90" viewBox="0 0 112 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M111.789 1.88001L1.26 87.6226L1.45617 2.17327L111.789 1.88001Z" fill="#D9D9D9" />
                  </svg>
                </div>
                <div className="hidden lg:block absolute -left-12 top-24 z-10 pointer-events-none">
                  <svg width="112" height="90" viewBox="0 0 112 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M111.789 1.88001L1.26 87.6226L1.45617 2.17327L111.789 1.88001Z" fill="#D9D9D9" />
                  </svg>
                </div>

                {/* Main Image */}
                <div className="relative w-full overflow-hidden">
                  {/* Prev Button */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full p-1.5 shadow hover:bg-opacity-100 transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>

                  <img
                    src={workshopImages[currentImage]}
                    alt="ASWS Presentation Skills workshop"
                    className="w-full h-[280px] sm:h-[340px] lg:h-[380px] object-cover"
                  />

                  {/* Next Button */}
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full p-1.5 shadow hover:bg-opacity-100 transition"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {workshopImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`flex-shrink-0 w-14 h-12 sm:w-16 sm:h-14 overflow-hidden border-2 transition ${
                      currentImage === idx ? "border-bni-red" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover brightness-0"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Workshop Details */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3">
                ASWS Presentation Skills
              </h1>

              {/* Price + Status */}
              <div className="flex items-center gap-4 mb-5">
                <span className="text-xl sm:text-2xl font-semibold text-gray-700">₱0.00</span>
                <span className="text-base sm:text-lg font-semibold text-green-600">
                  Completed Last 12-15-2025
                </span>
              </div>

              {/* Descriptions */}
              <div className="space-y-3 mb-5 text-sm sm:text-base text-gray-800">
                <p>Short Description of the workshop</p>
                <p>The key topics or skills participants will learn</p>
                <p>
                  What participants will achieve after completing the workshop, such as practical
                  skills, certificates, or real-world applications
                </p>
              </div>

              {/* Select Date */}
              <div className="flex items-center gap-3 mb-6">
                <label className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">
                  Select Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-1 max-w-xs border border-gray-400 rounded px-3 py-2 text-sm text-gray-500 focus:outline-none focus:border-bni-red appearance-none bg-white"
                >
                  <option value="" disabled>
                    Choose an Option
                  </option>
                  {dateOptions.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>

              {/* Instructor Cards */}
              <div className="flex gap-4 overflow-x-auto pb-3 mb-6">
                {instructors.map((instructor, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 flex gap-3 border border-gray-200 bg-gray-50 p-3 rounded w-[280px] sm:w-[320px] lg:w-[340px]"
                  >
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-20 h-24 sm:w-24 sm:h-28 object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 mb-1">
                        <span className="font-bold">Name of Instuctor:</span>{" "}
                        {instructor.name}
                      </p>
                      <p className="text-sm font-bold text-gray-800 mb-1">Brief Background:</p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {instructor.background}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-bni-red text-white px-6 py-2.5 rounded font-semibold text-sm sm:text-base hover:opacity-90 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-gray-700 text-white px-6 py-2.5 rounded font-semibold text-sm sm:text-base hover:opacity-90 transition"
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Cart Button */}
      <button className="fixed bottom-6 right-6 z-50 bg-bni-red text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:opacity-90 transition">
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-white text-bni-red rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-bni-red">
          {cartCount}
        </span>
      </button>

      <Footer />
    </div>
  );
}
