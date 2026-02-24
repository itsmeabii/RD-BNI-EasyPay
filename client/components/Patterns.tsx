interface PatternsProps {
  first: string;
  second: string;
  third: string;
  fill?: string;
}

const Triangle = ({ className, fill = "#D9D9D9" }: { className: string; fill?: string }) => (
  <svg
    className={`pointer-events-none ${className}`}
    width="112"
    height="90"
    viewBox="0 0 112 90"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M111.789 1.88001L1.26 87.6226L1.45617 2.17327L111.789 1.88001Z"
      fill={fill}
    />
  </svg>
);

export default function Patterns({ first, second, third, fill }: PatternsProps) {
  return (
    <>
      <Triangle className={first} fill={fill} />
      <Triangle className={second} fill={fill} />
      <Triangle className={third} fill={fill} />
    </>
  );
}