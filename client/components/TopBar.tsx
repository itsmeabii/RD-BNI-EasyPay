export default function TopBar() {
  return (
    <div className="w-full bg-[#CF2031] px-4 md:px-[70px] py-0 h-[52px] md:h-[69px] flex items-center justify-between">
      <a
        href="https://bnitaguig.com"
        className="flex items-center gap-2 text-white text-sm font-medium hover:opacity-80 transition-opacity"
      >
        <svg
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M9 1L1 9L9 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Back to BNI Taguig Website</span>
      </a>
      <span className="text-white text-sm font-medium">Welcome, Arabela</span>
    </div>
  );
}
