interface CartButtonProps {
  count: number;
}

export default function CartButton({ count }: CartButtonProps) {
  return (
    <button
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#CF2031] rounded-full flex items-center justify-center shadow-lg hover:bg-[#b51c2b] transition-colors z-50"
      aria-label="View cart"
    >
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-[#CF2031] text-xs font-bold rounded-full flex items-center justify-center border border-[#CF2031]">
          {count}
        </span>
      )}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 10a4 4 0 01-8 0"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
