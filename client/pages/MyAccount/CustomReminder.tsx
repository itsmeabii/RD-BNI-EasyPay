import React, { useState, useRef, useEffect, useCallback } from "react";

// Wheel Picker
interface WheelPickerProps<T extends string | number> {
  items: T[];
  value: T;
  onChange: (val: T) => void;
  width?: number;
}

function WheelPicker<T extends string | number>({
  items,
  value,
  onChange,
  width = 120,
}: WheelPickerProps<T>) {
  const ITEM_HEIGHT = 44;
  const VISIBLE = 5; // total rows visible
  const containerHeight = ITEM_HEIGHT * VISIBLE;

  const listRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);

  const selectedIndex = items.indexOf(value);

  // Sync scroll position when value changes externally
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const target = selectedIndex * ITEM_HEIGHT;
    if (Math.abs(el.scrollTop - target) > 2) {
      el.scrollTop = target;
    }
  }, [selectedIndex]);

  const snapToNearest = useCallback(
    (scrollTop: number) => {
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      if (items[clamped] !== value) onChange(items[clamped]);
      return clamped * ITEM_HEIGHT;
    },
    [items, value, onChange]
  );

  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el || isDragging.current) return;
    const snap = () => {
      const snapped = snapToNearest(el.scrollTop);
      el.scrollTo({ top: snapped, behavior: "smooth" });
    };
    clearTimeout((el as any)._snapTimer);
    (el as any)._snapTimer = setTimeout(snap, 80);
  }, [snapToNearest]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startScroll.current = listRef.current?.scrollTop ?? 0;
    listRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !listRef.current) return;
    const delta = startY.current - e.clientY;
    listRef.current.scrollTop = startScroll.current + delta;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current || !listRef.current) return;
    isDragging.current = false;
    const snapped = snapToNearest(listRef.current.scrollTop);
    listRef.current.scrollTo({ top: snapped, behavior: "smooth" });
  };

  return (
    <div
      className={`relative overflow-hidden select-none cursor-grab`}
      style={{ width, height: containerHeight }}
    >
      {/* Highlight bar */}
      <div className="absolute left-0 right-0 z-0 pointer-events-none bg-gray-200 rounded-md" 
           style={{ top: ITEM_HEIGHT * 2, height: ITEM_HEIGHT }} />

      {/* Fade top */}
      <div
        className="absolute left-0 right-0 z-20 pointer-events-none"
        style={{
          top: 0,
          height: ITEM_HEIGHT * 2,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Fade bottom */}
      <div
        className="absolute left-0 right-0 z-20 pointer-events-none"
        style={{
          bottom: 0,
          height: ITEM_HEIGHT * 2,
          background:
            "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Scrollable list */}
      <div
        ref={listRef}
        onScroll={handleScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="absolute inset-0 overflow-y-scroll scrollbar-hide z-10 pt-20 pb-20"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((item, i) => {
          const isSelected = i === selectedIndex;
          return (
            <div
              key={String(item)}
              onClick={() => {
                onChange(item);
                listRef.current?.scrollTo({
                  top: i * ITEM_HEIGHT,
                  behavior: "smooth",
                });
              }}
              className={`flex items-center justify-center cursor-pointer transition-all`}
              style={{
                height: ITEM_HEIGHT,
                fontSize: isSelected ? 18 : 16,
                fontWeight: isSelected ? 700 : 400,
                color: isSelected ? "#111" : "#aaa",
              }}
            >
              {String(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- ICONS --- //

const BellIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// --- SIDEBAR --- //

interface CustomReminderSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onDone: (label: string) => void;
}

const NUMBER_ITEMS = Array.from({ length: 60 }, (_, i) => i + 1);
const UNIT_ITEMS = ["minutes", "hours", "days", "weeks"] as const;
type UnitType = (typeof UNIT_ITEMS)[number];

export default function CustomReminderSidebar({
  isOpen,
  onClose,
  onDone,
}: CustomReminderSidebarProps) {
  const [numVal, setNumVal] = useState<number>(30);
  const [unitVal, setUnitVal] = useState<UnitType>("minutes");

  const handleDone = () => {
    onDone(`${numVal} ${unitVal} before`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-25 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 998 }}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-[390px] bg-white z-999 flex flex-col shadow-lg transition-transform duration-300`}
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="p-1 text-gray-600" onClick={onClose}>
              <CloseIcon />
            </button>
            <span className="text-lg font-bold text-gray-900">
              Custom Reminders
            </span>
          </div>
          <button
            className="text-blue-600 font-semibold text-sm p-1"
            onClick={handleDone}
          >
            Done
          </button>
        </div>

        {/* Preview label */}
        <div className="flex items-center gap-3 px-6 py-5 flex-shrink-0">
          <CalendarIcon />
          <span className="text-gray-900 text-base font-medium">{numVal} {unitVal} before</span>
        </div>

        {/* Wheel Picker */}
        <div className="flex justify-center gap-0 px-6 py-2 border-t border-b border-gray-200 flex-shrink-0">
          <WheelPicker
            items={NUMBER_ITEMS}
            value={numVal}
            onChange={(v) => setNumVal(v as number)}
            width={160}
          />
          <WheelPicker
            items={[...UNIT_ITEMS]}
            value={unitVal}
            onChange={(v) => setUnitVal(v as UnitType)}
            width={160}
          />
        </div>

        {/* Notification options */}
        <div className="px-6 flex-shrink-0">
          {/* Notification row — active */}
          <div className="flex justify-between items-center py-4 border-b border-gray-200 text-gray-900">
            <span className="flex items-center gap-3 text-base">
              <BellIcon />
              Notification
            </span>
            <CheckIcon />
          </div>

          {/* Email row — inactive */}
          <div className="flex items-center py-4 border-b border-gray-200 text-gray-400 gap-3 text-base">
            <EmailIcon />
            Email
          </div>

          {/* Phone row — inactive */}
          <div className="flex items-center py-4 text-gray-400 gap-3 text-base">
            <PhoneIcon />
            Phone
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}