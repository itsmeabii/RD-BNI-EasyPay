export default function Hero() {
  return (
    <section className="bg-bni-gray min-h-[500px] lg:min-h-[600px] relative overflow-hidden">
      {/* Decorative triangular SVG elements */}
      <svg
        className="absolute left-0 top-32 lg:top-24 opacity-50"
        width="112"
        height="90"
        viewBox="0 0 112 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M111.789 1.88001L1.26 87.6226L1.45617 2.17327L111.789 1.88001Z"
          fill="#D9D9D9"
        />
      </svg>
      <svg
        className="absolute left-28 top-0 lg:top-0 opacity-50"
        width="112"
        height="90"
        viewBox="0 0 112 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M111.789 1.88001L1.26 87.6226L1.45617 2.17327L111.789 1.88001Z"
          fill="#D9D9D9"
        />
      </svg>
      <svg
        className="absolute left-28 top-20 lg:top-24 opacity-50"
        width="112"
        height="90"
        viewBox="0 0 112 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M111.789 1.88001L1.26 87.6226L1.45617 2.17327L111.789 1.88001Z"
          fill="#D9D9D9"
        />
      </svg>
      <svg
        className="absolute right-0 bottom-0 opacity-50"
        width="136"
        height="125"
        viewBox="0 0 136 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M135.789 2.27889L1.52735 122.747L2.03995 3.04456L135.789 2.27889Z"
          fill="#D9D9D9"
        />
      </svg>

      {/* Main BNI 40 Years Image */}
      <div className="relative z-10 flex items-center justify-center py-12 lg:py-16 px-4">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/8bc2c9ba1b2e28d3873a474399e704b92aaff888?width=2090"
          alt="BNI - Cheers to 40 Years"
          className="w-full max-w-5xl h-auto object-contain"
        />
      </div>

      {/* Small decorative image in bottom right */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/ae0579b9c924889d11014479f83664a0e2df0aed?width=254"
        alt=""
        className="absolute right-0 bottom-0 w-32 h-auto z-20"
      />
    </section>
  );
}
