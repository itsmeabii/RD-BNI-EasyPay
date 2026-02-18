function MonthMarker({ month, style }: { month: string; style?: React.CSSProperties }) {
  return (
    <div className="flex flex-col items-center gap-1 absolute" style={style}>
      <svg width="45" height="70" viewBox="0 0 45 70" fill="none">
        <path
          d="M22.26 2.555C22.369 0.513 25.131 0.513 25.24 2.555L27.94 38.555C28.03 40.118 26.799 41.413 25.234 41.413H22.266C20.701 41.413 19.47 40.118 19.56 38.555L22.26 2.555Z"
          fill="#CF2031"
          stroke="#1E1E1E"
          strokeWidth="2"
        />
        <circle cx="22.5" cy="50" r="8" fill="#CF2031" stroke="#1E1E1E" strokeWidth="2" />
      </svg>
      <div className="text-black font-hammersmith text-[12px] md:text-[15px] whitespace-nowrap text-center">
        {month}
      </div>
    </div>
  );
}

export function SuccessMap() {
  const months = [
    { name: "JANUARY", left: "0px", top: "154px" },
    { name: "FEBRUARY", left: "108px", top: "49px" },
    { name: "MARCH", left: "179px", top: "123px" },
    { name: "APRIL", left: "249px", top: "144px" },
    { name: "MAY", left: "321px", top: "89px" },
    { name: "JUNE", left: "391px", top: "82px" },
    { name: "JULY", left: "460px", top: "77px" },
    { name: "AUGUST", left: "531px", top: "91px" },
    { name: "SEPTEMBER", left: "607px", top: "141px" },
    { name: "OCTOBER", left: "690px", top: "10px" },
    { name: "NOVEMBER", left: "763px", top: "139px" },
    { name: "DECEMBER", left: "833px", top: "87px" },
  ];

  return (
    <div className="w-full max-w-[1063px] flex flex-col gap-[8px]">
      <h2 className="text-[28px] md:text-[35px] font-semibold text-black">
        Success Map:
      </h2>

      <div className="w-full h-[400px] md:h-[598px] relative rounded-lg overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/56747f665c7ffb39e050d8f6bcf34d3cda136a5e?width=2127')",
          }}
        />

        {/* Content overlay */}
        <div className="absolute inset-0 p-4 md:p-[23px_25px]">
          {/* BNI Logo */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ae73058432eb4af3969aac6ab283cae135b1c6f5?width=304"
            alt="BNI Taguig"
            className="w-[100px] md:w-[152px] h-auto mb-4"
          />

          {/* Success Map Title */}
          <div className="absolute top-[80px] md:top-[90px] left-1/2 -translate-x-1/2 w-full text-center">
            <h1 className="text-[32px] md:text-[50px] font-hammersmith text-black">
              Success Map
            </h1>
          </div>

          {/* Month Markers - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block relative w-full h-[306px] mt-[150px]">
            {months.map((month) => (
              <MonthMarker
                key={month.name}
                month={month.name}
                style={{ left: month.left, top: month.top }}
              />
            ))}
          </div>

          {/* Mobile: Simple month list */}
          <div className="lg:hidden mt-[120px] grid grid-cols-3 gap-4 text-center">
            {months.map((month) => (
              <div key={month.name} className="text-black font-hammersmith text-sm">
                {month.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
