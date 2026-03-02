import { useSearchParams, useNavigate } from "react-router-dom";
import { WORKSHOP_SERIES } from "@/data/Journey";

const PIN_COLORS = [
  "#CF2031",
  "#E8734A",
  "#4A90D9",
  "#5BAD6F",
  "#7B5EA7",
  "#D94FAB",
  "#E8A020",
  "#3ABFBF",
];

const PIN_POSITIONS = [
  { left: "13%", top: "30%" }, 
  { left: "25%", top: "50%" }, 
  { left: "40%", top: "75%" },  
  { left: "55%", top: "50%" },  
  { left: "70%", top: "21%" },  
  { left: "80%", top: "60%" },
];

function TreasurePin({
  number,
  color,
  label,
  left,
  top,
  onClick,
}: {
  number: number;
  color: string;
  label: string;
  left: string;
  top: string;
  onClick: () => void;
}) {
  return (
    <div
      className="absolute flex items-start gap-1.5"
      style={{ left, top, transform: "translate(-50%, -100%)" }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <svg
          width="32"
          height="43"
          viewBox="0 0 28 38"
          fill="none"
          className="drop-shadow-lg transition-all"
        >
          <path
            d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 24 14 24S28 23.333 28 14C28 6.268 21.732 0 14 0z"
            fill={color}
          />
          <circle cx="14" cy="14" r="6" fill="rgba(255,255,255,0.3)" />
          <text x="14" y="18" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            {number}
          </text>
        </svg>
      </div>

      <div className="mt-1">
        <p
          className="text-[10px] md:text-[12px] font-bold leading-tight max-w-[120px] uppercase"
          style={{
            color,
            textShadow: "0 1px 3px rgba(255,255,255,0.9)",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export default function SuccessTreasureMap() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const monthParam = searchParams.get("month") ?? "";

  return (
    <div className="px-4 md:px-20 bg-white min-h-screen py-8">

      <div className="w-full aspect-[16/9] md:aspect-[1073/598] relative rounded-lg overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/56747f665c7ffb39e050d8f6bcf34d3cda136a5e?width=2127')",
          }}
        />

        {/* BNI Logo */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/ae73058432eb4af3969aac6ab283cae135b1c6f5?width=304"
          alt="BNI Taguig"
          className="absolute top-[3%] left-[2%] w-[10%] max-w-[152px] h-auto"
        />

        {/* Title */}
        <h1
          className="absolute top-[3%] left-1/2 -translate-x-1/2 text-[clamp(14px,3.5vw,46px)] font-black text-black whitespace-nowrap tracking-wide"
          style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
        >
          SUCCESS MAP
        </h1>

        {/* Dashed path */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 560"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M 100 200 C 300 340, 330 600, 500 420 S 600 280, 700 157 S 1000 347, 800 348 S 700 224,"
            fill="none"
            stroke="#777"
            strokeWidth="4"
            strokeDasharray="14 9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* All training pins */}
        {WORKSHOP_SERIES.map((training, i) => (
          <TreasurePin
            key={training.id}
            number={i + 1}
            color={PIN_COLORS[i % PIN_COLORS.length]}
            label={`${training.title}`}
            left={PIN_POSITIONS[i % PIN_POSITIONS.length].left}
            top={PIN_POSITIONS[i % PIN_POSITIONS.length].top}
            onClick={() => navigate(`/success-treasure-map/${training.id}?month=${monthParam}`)}
          />
        ))}
      </div>
    </div>
  );
}