import { useNavigate } from "react-router-dom";

// Positions are percentages of the map container (left %, top %)
// so they scale perfectly at any container width/height.
const MONTHS = [
  { name: "JANUARY",   left: 8,   top: 45 },
  { name: "FEBRUARY",  left: 18,  top: 30 },
  { name: "MARCH",     left: 25,  top: 55 },
  { name: "APRIL",     left: 34,  top: 57 },
  { name: "MAY",       left: 41,  top: 47 },
  { name: "JUNE",      left: 51,  top: 47 },
  { name: "JULY",      left: 62,  top: 40 },
  { name: "AUGUST",    left: 68,  top: 45 },
  { name: "SEPTEMBER", left: 75,  top: 60 },
  { name: "OCTOBER",   left: 81,  top: 15  },
  { name: "NOVEMBER",  left: 87,  top: 55 },
  { name: "DECEMBER",  left: 95, top: 51 },
];

function PinMarker({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <div className="flex flex-col items-center" style={{ transform: "translateX(-50%)" }} onClick={onClick}>
      {/* Teardrop pin */}
      <svg
        width="28"
        height="38"
        viewBox="0 0 28 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Pin body */}
        <path
          d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 24 14 24S28 23.333 28 14C28 6.268 21.732 0 14 0z"
          fill="#CF2031"
        />
        <circle cx="14" cy="14" r="5.5" fill="white" />
        <circle cx="14" cy="14" r="3" fill="#CF2031" />
      </svg>

      {/* Label */}
      <span
        className="mt-0.5 text-[10px] md:text-[12px] font-bold text-black whitespace-nowrap"
        style={{ textShadow: "0 1px 3px rgba(255,255,255,0.9)" }}
      >
        {name}
      </span>
    </div>
  );
}

export function SuccessMapSection() {
  const navigate = useNavigate();
  const handlePinClick = (monthName: string) => {
    navigate(`/success-treasure-map?month=${monthName.toLowerCase()}`);
  };
  return (
    <div className="w-full flex flex-col gap-[8px]">
      <h2 className="text-[28px] md:text-[35px] font-semibold text-black">
        Success Map:
      </h2>

      {/* Map container  */}
      <div className="w-full aspect-[16/9] md:aspect-[1073/598] relative rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/56747f665c7ffb39e050d8f6bcf34d3cda136a5e?width=2127')",
          }}
        />

        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/ae73058432eb4af3969aac6ab283cae135b1c6f5?width=304"
          alt="BNI Taguig"
          className="absolute top-[3%] left-[2%] w-[10%] max-w-[152px] h-auto"
        />

        <h1 className="absolute top-[3%] left-1/2 -translate-x-1/2 text-[clamp(18px,4vw,50px)] font-semibold text-black whitespace-nowrap">
          Success Map
        </h1>

        {/* Pins */}
        {MONTHS.map((month) => (
          <div
            key={month.name}
            className="absolute"
            style={{
              left: `${month.left}%`,
              top: `${month.top}%`,
            }}
          >
            <PinMarker name={month.name} onClick={() => handlePinClick(month.name)}/>
          </div>
        ))}
      </div>
    </div>
  );
}