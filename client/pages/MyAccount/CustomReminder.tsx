import React, { useState, useRef, useEffect, useCallback } from "react";

//Wheel Picker 

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
    // debounce snap
    const snap = () => {
      const snapped = snapToNearest(el.scrollTop);
      el.scrollTo({ top: snapped, behavior: "smooth" });
    };
    clearTimeout((el as any)._snapTimer);
    (el as any)._snapTimer = setTimeout(snap, 80);
  }, [snapToNearest]);

  // Touch / mouse drag support
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
      style={{
        position: "relative",
        width,
        height: containerHeight,
        overflow: "hidden",
        userSelect: "none",
        cursor: "grab",
      }}
    >
      {/* Highlight bar */}
      <div
        style={{
          position: "absolute",
          top: ITEM_HEIGHT * 2,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
          backgroundColor: "#f0f0f0",
          borderRadius: 8,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Fade top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT * 2,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Fade bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT * 2,
          background:
            "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          zIndex: 2,
          pointerEvents: "none",
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
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "scroll",
          scrollbarWidth: "none",
          paddingTop: ITEM_HEIGHT * 2,
          paddingBottom: ITEM_HEIGHT * 2,
          zIndex: 1,
          WebkitOverflowScrolling: "touch",
        }}
        className="hide-scrollbar"
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
              style={{
                height: ITEM_HEIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isSelected ? 18 : 16,
                fontWeight: isSelected ? 700 : 400,
                color: isSelected ? "#111" : "#aaa",
                transition: "color 0.15s, font-size 0.15s",
                cursor: "pointer",
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


const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Sidebar ─────────────────────────────────────────────────────────────────

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
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.25)",
          zIndex: 998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Sidebar panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: 390,
          height: "100vh",
          backgroundColor: "#fff",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
        }}
      >

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px 16px",
            borderBottom: "1px solid #f0f0f0",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#555",
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <CloseIcon />
            </button>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>
              Custom Reminders
            </span>
          </div>
          <button
            onClick={handleDone}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#2563eb",
              fontSize: 15,
              fontWeight: 600,
              padding: "4px 8px",
            }}
          >
            Done
          </button>
        </div>

        {/* Preview label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "20px 24px",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#111" }}>
            <CalendarIcon />
          </span>
          <span style={{ fontSize: 16, fontWeight: 500, color: "#111" }}>
            {numVal} {unitVal} before
          </span>
        </div>

        {/* Wheel Picker */}
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            borderBottom: "1px solid #e5e7eb",
            padding: "8px 24px",
            display: "flex",
            justifyContent: "center",
            gap: 0,
            flexShrink: 0,
          }}
        >
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
        <div style={{ padding: "8px 24px", flexShrink: 0 }}>
          {/* Notification row — active */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f0",
              color: "#111",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <BellIcon />
              <span style={{ fontSize: 15 }}>Notification</span>
            </span>
            <span style={{ color: "#111" }}>
              <CheckIcon />
            </span>
          </div>

          {/* Email row — inactive */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f0",
              color: "#aaa",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <EmailIcon />
              <span style={{ fontSize: 15 }}>Email</span>
            </span>
          </div>

          {/* Phone row — inactive */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px 0",
              color: "#aaa",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <PhoneIcon />
              <span style={{ fontSize: 15 }}>Phone</span>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}