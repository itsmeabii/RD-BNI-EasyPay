export default function RedButton({ children, onClick, full }: {
  children: React.ReactNode;
  onClick: () => void;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-bni-red hover:bg-bni-red/90 text-white font-bold rounded-xl py-3.5 px-5 text-sm tracking-wide transition-colors cursor-pointer
        ${full ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}