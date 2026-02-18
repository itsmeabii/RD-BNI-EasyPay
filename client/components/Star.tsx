interface StarProps {
  filled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Star({ filled = false, size = "lg" }: StarProps) {
  const config = {
    sm: {
      className: "w-8 h-8",
      viewBox: "0 0 32 32",
      path: "M16.0001 2.66675L20.1201 11.0134L29.3334 12.3601L22.6667 18.8534L24.2401 28.0267L16.0001 23.6934L7.76008 28.0267L9.33342 18.8534L2.66675 12.3601L11.8801 11.0134L16.0001 2.66675Z",
      strokeWidth: 3,
      rectSize: { width: 32, height: 32 },
    },
    md: {
      className: "w-12 h-12",
      viewBox: "0 0 32 32",
      path: "M16.0001 2.66675L20.1201 11.0134L29.3334 12.3601L22.6667 18.8534L24.2401 28.0267L16.0001 23.6934L7.76008 28.0267L9.33342 18.8534L2.66675 12.3601L11.8801 11.0134L16.0001 2.66675Z",
      strokeWidth: 3,
      rectSize: { width: 32, height: 32 },
    },
    lg: {
      className: "w-[55px] h-[50px]",
      viewBox: "0 0 55 50",
      path: "M27.4999 4.16675L34.5812 17.2084L50.4166 19.3126L38.9582 29.4584L41.6624 43.7917L27.4999 37.0209L13.3374 43.7917L16.0416 29.4584L4.58325 19.3126L20.4187 17.2084L27.4999 4.16675Z",
      strokeWidth: 4,
      rectSize: { width: 55, height: 50 },
    },
  };

  const { className, viewBox, path, strokeWidth, rectSize } = config[size];

  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {filled && <rect width={rectSize.width} height={rectSize.height} fill="#FFD900" />}
      <path
        d={path}
        stroke="#1E1E1E"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
