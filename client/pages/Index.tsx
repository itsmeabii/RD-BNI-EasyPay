import ShoppingCartButton from "@/components/ShoppingCart";

export default function Index() {
  return (
    <div className="max-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="min-h-[500px] lg:min-h-[600px] relative overflow-hidden">
          {/* Decorative triangular SVG elements */}
          <svg
            className="absolute left-0 top-32 lg:top-24 z-20"
            width="112"
            height="90"
            viewBox="0 0 112 90"
            fill="#D9D9D9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M111.789 1.88001L1.26 87.6226L1.45617 2.17327L111.789 1.88001Z"
              fill="#D9D9D9"
            />
          </svg>
          <svg
            className="absolute left-28 top-0 lg:top-0 z-20"
            width="112"
            height="90"
            viewBox="0 0 112 90"
            fill="#D9D9D9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M111.789 1.88001L1.26 87.6226L1.45617 2.17327L111.789 1.88001Z"
              fill="#D9D9D9"
            />
          </svg>
          <svg
            className="absolute left-28 top-20 lg:top-24 z-20"
            width="112"
            height="90"
            viewBox="0 0 112 90"
            fill="#D9D9D9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M111.789 1.88001L1.26 87.6226L1.45617 2.17327L111.789 1.88001Z"
              fill="#D9D9D9"
            />
          </svg>

          {/* Main BNI 40 Years Image */}
          <div className="bg-bni-gray-200 relative flex items-center justify-center py-12 lg:py-16 px-4">
            <img
              src="/BNI-40-image.svg"
              alt="BNI - Cheers to 40 Years"
              className="w-full max-w-5xl h-auto object-contain z-30"
            />
            {/* Shopping Cart Button - positioned absolutely on larger screens */}
          </div>
        </section>
        <div className="bg-white py-6 lg:py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-center relative">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-center px-12 lg:px-0">
            2026 BNI Taguig Trainings and Workshops
          </h2>
          </div>
        </div>
        <ShoppingCartButton count={0} />
      </main>
  </div>
    
  );
}
