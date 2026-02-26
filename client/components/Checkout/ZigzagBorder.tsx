export default function ZigzagBorder() {
  return (
    <div className="absolute bottom-[-16px] left-0 right-0 width h-[18px] pointer-events-none">
      <svg viewBox="0 0 300 18" preserveAspectRatio="none" className="w-full h-full block -scale-y-100">
        <path
          d="M0 0 L15 18 L30 0 L45 18 L60 0 L75 18 L90 0 L105 18 L120 0 L135 18 L150 0 L165 18 L180 0 L195 18 L210 0 L225 18 L240 0 L255 18 L270 0 L285 18 L300 0 L300 18 L0 18 Z"
          fill="#C8102E"
        />
      </svg>
    </div>
  );
}