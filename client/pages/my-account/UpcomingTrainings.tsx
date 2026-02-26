import React, { useState, useRef, useEffect } from "react";

interface TrainingData {
  orderId: string;
  trainingName: string;
  trainingDate: string;
  reminder: string;
}

// --- Wheel Component for the Scrolling Effect ---
const WheelPicker = ({ items, onSelect, defaultValue }: { items: (string | number)[], onSelect: (val: any) => void, defaultValue: any }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40;

  useEffect(() => {
    const index = items.indexOf(defaultValue);
    if (index !== -1 && scrollRef.current) {
      scrollRef.current.scrollTop = index * itemHeight;
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollTop / itemHeight);
      onSelect(items[index]);
    }
  };

  return (
    <div style={{ position: "relative", height: `${itemHeight * 3}px`, width: "100%", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "40px", left: 0, right: 0, height: `${itemHeight}px`, backgroundColor: "#f3f4f6", borderRadius: "8px", zIndex: 0 }} />
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ 
          height: "100%", overflowY: "auto", scrollSnapType: "y mandatory", position: "relative", zIndex: 1, 
          padding: `${itemHeight}px 0`, scrollbarWidth: 'none', msOverflowStyle: 'none' 
        }}
      >
        {items.map((item, i) => (
          <div key={i} style={{ height: `${itemHeight}px`, display: "flex", alignItems: "center", justifyContent: "center", scrollSnapAlign: "center", fontSize: "16px" }}>
            {item}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40px", background: "linear-gradient(to bottom, white, transparent)", pointerEvents: "none", zIndex: 2 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40px", background: "linear-gradient(to top, white, transparent)", pointerEvents: "none", zIndex: 2 }} />
    </div>
  );
};

export const TrainingListSection = (): JSX.Element => {
  const tableWidth = "1050px";
  const rowPositions = ["80px", "148px", "223px", "313px", "393px"];
  const rowTopPositions = [77, 146, 225, 315, 392];

  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [isCustomReminderOpen, setIsCustomReminderOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // States to track wheel selection
  const [tempVal, setTempVal] = useState(30);
  const [tempUnit, setTempUnit] = useState("minutes");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [trainingData, setTrainingData] = useState<TrainingData[]>([
    { orderId: "RQ-001", trainingName: "Business Strategy & Planning", trainingDate: "February 22, 2026", reminder: "1 week before" },
    { orderId: "RQ-002", trainingName: "Sales Techniques That Close Deals", trainingDate: "February 22, 2026", reminder: "No reminder" },
    { orderId: "RQ-003", trainingName: "Entrepreneurship Fundamentals", trainingDate: "February 22, 2026", reminder: "1 week before" },
    { orderId: "RQ-004", trainingName: "Entrepreneurship Fundamentals", trainingDate: "February 22, 2026", reminder: "1 week before" },
    { orderId: "RQ-005", trainingName: "Entrepreneurship Fundamentals", trainingDate: "February 22, 2026", reminder: "1 week before" },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="absolute top-[311px] left-[272px] h-[443px]" style={{ width: tableWidth }}>
      <div className="absolute top-0 left-0 h-[441px] bg-white rounded-[10px] border border-solid border-black" style={{ width: tableWidth }} />
      <header className="absolute top-0 left-0 h-[54px] bg-[#cf2031] rounded-[10px_10px_0px_0px]" style={{ width: tableWidth }} />

      <div className="absolute top-[18px] left-0 w-[131px] font-extrabold text-white text-xs text-center">Order ID</div>
      <div className="absolute top-[19px] left-[153px] w-[135px] font-extrabold text-white text-xs text-center">Training Name</div>
      <div className="absolute top-[21px] left-[370px] w-[150px] font-extrabold text-white text-xs text-center">Training Date</div>
      <div className="absolute top-[19px] left-[559px] w-[200px] font-extrabold text-white text-xs text-center">Reminders</div>
      <div className="absolute top-[18px] left-[817px] w-[200px] font-extrabold text-white text-xs text-center">Action</div>

      {trainingData.map((training, index) => (
        <div key={index}>
          <button
            className="absolute w-[139px] h-[25px] flex bg-[#cf2031] rounded"
            style={{ top: rowPositions[index], left: "850px" }}
            onClick={() => setOpenDropdownIndex(openDropdownIndex === index ? null : index)}
          >
            <span className="absolute top-1 left-0 w-[139px] font-bold text-white text-[15px] text-center">Set Reminders</span>
          </button>

          {openDropdownIndex === index && (
            <div
              ref={dropdownRef}
              className="absolute w-[139px] bg-white border border-gray-300 rounded shadow-md z-50"
              style={{ top: `calc(${rowPositions[index]} + 25px)`, left: "850px" }}
            >
              {["No reminder", "1 day before", "1 week before"].map((option) => (
                <div
                  key={option}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    const updated = [...trainingData];
                    updated[index].reminder = option;
                    setTrainingData(updated);
                    setOpenDropdownIndex(null);
                  }}
                >
                  {option}
                </div>
              ))}
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm font-bold border-t"
                onClick={() => {
                  setSelectedIndex(index);
                  setIsCustomReminderOpen(true);
                  setOpenDropdownIndex(null);
                }}
              >
                Custom
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Columns Data Rendering */}
      {trainingData.map((training, index) => (
        <React.Fragment key={index}>
          <div className="absolute font-normal text-black text-[15px] text-center" style={{ top: rowPositions[index], left: "585px", width: "150px" }}>
            {training.reminder}
          </div>
          <div className="absolute font-normal text-[#212121] text-xs text-center" style={{ top: `${rowTopPositions[index]}px`, left: "0px", width: "131px" }}>
            {training.orderId}
          </div>
          <div className="absolute left-[142px] w-[158px] flex items-center justify-center text-black text-[15px] text-center" style={{ top: `${rowTopPositions[index] - 5}px`, height: "60px" }}>
            {training.trainingName}
          </div>
          <time className="absolute left-[375px] text-black text-[15px] underline" style={{ top: `${rowTopPositions[index]}px` }}>
            {training.trainingDate}
          </time>
        </React.Fragment>
      ))}

      {/* --- CUSTOM REMINDER SIDEBAR --- */}
      {isCustomReminderOpen && (
        <>
          <div onClick={() => setIsCustomReminderOpen(false)} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.3)", zIndex: 998 }} />
          <div style={{ position: "fixed", top: 0, right: 0, width: "420px", height: "100vh", backgroundColor: "#ffffff", zIndex: 999, padding: "24px", display: "flex", flexDirection: "column" }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Custom Reminders</h3>
              <button 
                className="text-blue-500 font-semibold"
                onClick={() => {
                  if (selectedIndex !== null) {
                    const updated = [...trainingData];
                    updated[selectedIndex].reminder = `${tempVal} ${tempUnit} before`;
                    setTrainingData(updated);
                  }
                  setIsCustomReminderOpen(false);
                }}
              >
                Done
              </button>
            </div>

            <div className="flex items-center gap-3 mb-8 text-gray-700">
              <img 
                src="/images/Calendar.svg"
                alt="Calendar Icon" 
                style={{ width: "24px", height: "24px", objectFit: "contain" }} 
                />
              <span className="text-lg font-medium">{tempVal} {tempUnit} before</span>
            </div>

            <div className="flex border-y py-4">
              <WheelPicker 
                items={Array.from({ length: 60 }, (_, i) => i + 1)} 
                defaultValue={tempVal}
                onSelect={setTempVal} 
              />
              <WheelPicker 
                items={["minutes", "hours", "days", "weeks"]} 
                defaultValue={tempUnit}
                onSelect={setTempUnit} 
              />
            </div>
            
            <div className="mt-6 space-y-4">
              {/* Notification - Active */}
              <div className="flex justify-between items-center py-2 border-b">
                <span className="flex items-center gap-3">
                  <img 
                    src="pages/images/notifications.svg" 
                    alt="Notification" 
                    style={{ width: "22px", height: "22px" }} 
                  />
                  <span className="text-[15px]">Notification</span>
                </span>
                <span className="text-blue-500 font-bold text-lg">✓</span>
              </div>

              {/* Email - Inactive */}
              <div className="flex justify-between items-center py-2 border-b text-gray-400">
                <span className="flex items-center gap-3">
                  <img 
                    src="pages/images/mark_email_unread.svg" 
                    alt="Email" 
                    style={{ width: "22px", height: "22px" }} 
                  />
                  <span className="text-[15px]">Email</span>
                </span>
              </div>

              {/* Phone - Inactive */}
              <div className="flex justify-between items-center py-2 border-b text-gray-400">
                <span className="flex items-center gap-3">
                  <img 
                    src="pages/images/Phone.svg" 
                    alt="Phone" 
                    style={{ width: "22px", height: "22px" }} 
                  />
                  <span className="text-[15px]">Phone</span>
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};