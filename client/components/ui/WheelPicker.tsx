import React, { useRef, useEffect, useCallback } from "react";

interface WheelPickerProps<T extends string | number> {
  items: T[];
  value: T;
  onChange: (val: T) => void;
}

export function WheelPicker<T extends string | number>({
  items,
  value,
  onChange,
}: WheelPickerProps<T>) {
  const ITEM_HEIGHT = 44;

  const listRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);

  const selectedIndex = items.indexOf(value);

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
    listRef.current.scrollTop = startScroll.current + (startY.current - e.clientY);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current || !listRef.current) return;
    isDragging.current = false;
    const snapped = snapToNearest(listRef.current.scrollTop);
    listRef.current.scrollTo({ top: snapped, behavior: "smooth" });
  };

  return (
    // container: w-[120px] h-[220px] (44 * 5)
    <div className="relative overflow-hidden select-none cursor-grab w-[120px] h-[220px]">

      {/* Highlight bar for selected row: top-[88px] h-[44px] (ITEM_HEIGHT * 2) */}
      <div className="absolute left-0 right-0 top-[88px] h-[44px] z-0 pointer-events-none bg-gray-100 rounded-md" />

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 z-20 pointer-events-none h-20 bg-gradient-to-b from-white via-white/80 to-transparent" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none h-20 bg-gradient-to-t from-white via-white/80 to-transparent" />

      {/* Scrollable list: pt-[88px] pb-[88px] to center first/last items */}
      <div
        ref={listRef}
        onScroll={handleScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="absolute inset-0 overflow-y-scroll scrollbar-none z-10 pt-[88px] pb-[88px] touch-pan-y"
      >
        {items.map((item, i) => (
          <div
            key={String(item)}
            onClick={() => {
              onChange(item);
              listRef.current?.scrollTo({ top: i * ITEM_HEIGHT, behavior: "smooth" });
            }}
            className={`flex items-center justify-center cursor-pointer transition-all h-[44px] ${
              i === selectedIndex
                ? "text-lg font-bold text-gray-900"
                : "text-base font-normal text-gray-400"
            }`}
          >
            {String(item)}
          </div>
        ))}
      </div>
    </div>
  );
}