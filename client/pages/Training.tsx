import { TrainingListSection } from "./TrainingListSection";
import { UserNavigationSection } from "./UserNavigation/UserNavigationSection";
import React, { useState } from 'react';

export const UpcomingTrainings = (): JSX.Element => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Data for the dropdowns - Removed Chapter
  const dropdownData = {
    Categories: ["AWS", "MSS", "MSP", "ASWS"],
    Date: ["Newest", "Oldest"]
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="w-full min-w-[1280px] min-h-screen relative bg-[#f4f4f4]">
      
      {/* 1. NAVIGATION LAYER */}
      <div className="absolute top-[-140px] relative z-30">
        <UserNavigationSection />
      </div>

      {/* 2. CONTENT LAYER */}
      <main className="relative z-10">
        <h1 className="absolute top-[20px] left-[30px] font-bold text-[#cf2031] text-3xl">
          Upcoming Trainings
        </h1>

        {/* SEARCH & FILTERS ROW */}
        <div className="absolute top-[95px] left-[335px] flex items-center gap-4">
          
          {/* Search Bar Container */}
          <div className="relative w-[770px] h-[53px]">
            <div className="absolute inset-0 bg-white rounded-[10px] border border-[#d9d9d9] shadow-[inset_0px_4px_4px_#00000040]" />
            <input
              id="search-input"
              type="search"
              placeholder="Search for categories, registrant ID"
              className="absolute top-3 w-full px-6 bg-transparent italic text-[#817d7d] text-lg outline-none"
            />
            <img
              className="absolute top-[11px] right-4 w-[30px] h-[30px]"
              src="pages/images/Search.svg"
              alt="Search Icon"
            />
          </div>

          {/* Categories Dropdown - Chapter removed from the array below */}
          {["Categories"].map((label) => (
            <div key={label} className="relative">
              <button 
                onClick={() => toggleDropdown(label)}
                className="flex items-center justify-between w-[140px] h-[53px] px-4 bg-white border border-[#d9d9d9] rounded-[10px] text-[#817d7d]"
              >
                <span>{label}</span>
                <svg className={`w-4 h-4 transform transition-transform ${openDropdown === label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Options Menu */}
              {openDropdown === label && (
                <div className="absolute top-[58px] left-0 w-full bg-white border border-[#d9d9d9] rounded-[10px] shadow-lg z-50 py-2">
                  {dropdownData[label as keyof typeof dropdownData].map((opt) => (
                    <div key={opt} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#817d7d] text-sm">
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* ISOLATED DATE DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('Date')}
              className="flex items-center justify-between w-[100px] h-[53px] px-4 bg-white border border-[#d9d9d9] rounded-[10px] text-[#817d7d]"
            >
              <span>Date</span>
              <svg className={`w-4 h-4 transform transition-transform ${openDropdown === 'Date' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Date Options Menu */}
            {openDropdown === 'Date' && (
              <div className="absolute top-[58px] left-0 w-full bg-white border border-[#d9d9d9] rounded-[10px] shadow-lg z-50 py-2">
                {dropdownData.Date.map((opt) => (
                  <div key={opt} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#817d7d] text-sm whitespace-nowrap">
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="absolute top-[-140px] left-[59px] w-[calc(100%-100px)]">
          <TrainingListSection />
        </div>
      </main>
    </div>
  );
};