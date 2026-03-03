import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Bell, 
  Mail, 
  Phone, 
  Calendar, 
  X, 
  Check 
} from "lucide-react";

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
  const VISIBLE = 5; 
  const containerHeight = ITEM_HEIGHT * VISIBLE; // 220px

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
      className={`relative overflow-hidden select-none cursor-grab w-[${width}px] h-[${containerHeight}px]`}
    >
      {/* Highlight bar */}
      <div className={`absolute left-0 right-0 z-0 pointer-events-none bg-gray-100 rounded-md top-[${ITEM_HEIGHT * 2}px] h-[${ITEM_HEIGHT}px]`} />

      {/* Fade Overlays */}
      <div className="absolute inset-x-0 top-0 z-20 pointer-events-none h-20 bg-gradient-to-b from-white via-white/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none h-20 bg-gradient-to-t from-white via-white/80 to-transparent" />

      {/* Scrollable list */}
      <div
        ref={listRef}
        onScroll={handleScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="absolute inset-0 overflow-y-scroll scrollbar-none z-10 pt-20 pb-20 touch-pan-y"
      >
        {items.map((item, i) => {
          const isSelected = i === selectedIndex;
          return (
            <div
              key={String(item)}
              onClick={() => {
                onChange(item);
                listRef.current?.scrollTo({ top: i * ITEM_HEIGHT, behavior: "smooth" });
              }}
              className={`flex items-center justify-center cursor-pointer transition-all h-[${ITEM_HEIGHT}px] ${
                isSelected ? "text-lg font-bold text-gray-900" : "text-base font-normal text-gray-400"
              }`}
            >
              {String(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/25 transition-opacity duration-300 z-[998] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-[390px] bg-white z-[999] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button 
              className="p-1 hover:bg-gray-100 rounded-full transition-colors" 
              onClick={onClose}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="text-lg font-bold text-gray-900">Custom Reminders</h2>
          </div>
          <button
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm px-2 py-1"
            onClick={() => onDone(`${numVal} ${unitVal} before`)}
          >
            Done
          </button>
        </div>

        {/* Preview label */}
        <div className="flex items-center gap-3 px-6 py-5 bg-gray-50/50">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900 text-base font-medium">
            {numVal} {unitVal} before
          </span>
        </div>

        {/* Wheel Picker Container */}
        <div className="flex justify-center gap-4 px-6 py-4 border-y border-gray-100">
          <WheelPicker
            items={NUMBER_ITEMS}
            value={numVal}
            onChange={(v) => setNumVal(v as number)}
            width={120}
          />
          <WheelPicker
            items={[...UNIT_ITEMS]}
            value={unitVal}
            onChange={(v) => setUnitVal(v as UnitType)}
            width={120}
          />
        </div>

        {/* Notification options */}
        <div className="px-6 py-2">
          {/* Active Option */}
          <div className="flex justify-between items-center py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 text-gray-900">
              <Bell className="w-5 h-5" />
              <span className="text-base font-medium">Notification</span>
            </div>
            <Check className="w-5 h-5 text-blue-600 stroke-[3]" />
          </div>

          {/* Inactive Options */}
          <div className="flex items-center gap-3 py-4 border-b border-gray-100 text-gray-400 group cursor-not-allowed">
            <Mail className="w-5 h-5" />
            <span className="text-base">Email</span>
          </div>

          <div className="flex items-center gap-3 py-4 text-gray-400 cursor-not-allowed">
            <Phone className="w-5 h-5" />
            <span className="text-base">Phone</span>
          </div>
        </div>
      </div>
    </>
  );
}