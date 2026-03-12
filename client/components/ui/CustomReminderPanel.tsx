import { Bell, Mail, Phone, Calendar, X, Check } from "lucide-react";
import { WheelPicker } from "@/components/ui/WheelPicker";

const NUMBER_ITEMS = Array.from({ length: 60 }, (_, i) => i + 1);
const UNIT_ITEMS = ["minutes", "hours", "days", "weeks"] as const;
export type UnitType = (typeof UNIT_ITEMS)[number];

interface CustomReminderPanelProps {
  numVal: number;
  unitVal: UnitType;
  onNumChange: (val: number) => void;
  onUnitChange: (val: UnitType) => void;
  onClose: () => void;
  onDone: () => void;
}

export function CustomReminderPanel({
  numVal,
  unitVal,
  onNumChange,
  onUnitChange,
  onClose,
  onDone,
}: CustomReminderPanelProps) {
  return (
    <div className="fixed top-0 right-0 h-screen w-full max-w-[390px] bg-white z-[999] flex flex-col shadow-2xl overflow-hidden">
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
          onClick={onDone}
        >
          Done
        </button>
      </div>

      {/* Preview */}
      <div className="flex items-center gap-3 px-6 py-5 bg-gray-50/50">
        <Calendar className="w-5 h-5 text-gray-600" />
        <span className="text-gray-900 text-base font-medium">
          {numVal} {unitVal} before
        </span>
      </div>

      {/* Wheel Pickers */}
      <div className="flex justify-center items-center gap-10 px-6 py-4 border-y border-gray-100">
        <WheelPicker
          items={NUMBER_ITEMS}
          value={numVal}
          onChange={(v) => onNumChange(v as number)}
        />
        {/* Divider between pickers */}
        <div className="w-px h-10 bg-gray-200" />
        <WheelPicker
          items={[...UNIT_ITEMS]}
          value={unitVal}
          onChange={(v) => onUnitChange(v as UnitType)}
        />
      </div>

      {/* Notification options */}
      <div className="px-6 py-2">
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 text-gray-900">
            <Bell className="w-5 h-5" />
            <span className="text-base font-medium">Notification</span>
          </div>
          <Check className="w-5 h-5 text-blue-600 stroke-[3]" />
        </div>

        <div className="flex items-center gap-3 py-4 border-b border-gray-100 text-gray-400 cursor-not-allowed">
          <Mail className="w-5 h-5" />
          <span className="text-base">Email</span>
        </div>

        <div className="flex items-center gap-3 py-4 text-gray-400 cursor-not-allowed">
          <Phone className="w-5 h-5" />
          <span className="text-base">Phone</span>
        </div>
      </div>
    </div>
  );
}