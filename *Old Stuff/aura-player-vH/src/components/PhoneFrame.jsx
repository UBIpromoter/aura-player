import React from 'react';

const PhoneFrame = ({ 
  children, 
  darkMode = true, 
  onHome, 
  onSettings, 
  onProfile,
  userInfo = null,
  showNav = true,
  showStreak = true
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Phone shell */}
      <div 
        className="relative bg-[#1a1a1c] rounded-[55px] p-3 shadow-2xl"
        style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))' }}
      >
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-[100px] w-[3px] h-[28px] bg-[#2a2a2c] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[145px] w-[3px] h-[50px] bg-[#2a2a2c] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[205px] w-[3px] h-[50px] bg-[#2a2a2c] rounded-l-sm" />
        <div className="absolute -right-[3px] top-[160px] w-[3px] h-[65px] bg-[#2a2a2c] rounded-r-sm" />
        
        {/* Screen */}
        <div 
          className={`relative overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-gray-100'}`}
          style={{ width: 393, height: 852, borderRadius: 44 }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-30" />
          
          {/* Status bar */}
          <div className={`flex items-end justify-between px-8 pb-2 h-[54px] ${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-semibold relative z-20`}>
            <span>9:41</span>
            <div className="flex gap-1.5 items-center">
              {/* Signal */}
              <svg className="w-[18px] h-[12px]" viewBox="0 0 18 12" fill="currentColor">
                <path d="M1 4a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 01-1 1H2a1 1 0 01-1-1V4zM6 3a1 1 0 011-1h1a1 1 0 011 1v5a1 1 0 01-1 1H7a1 1 0 01-1-1V3zM11 2a1 1 0 011-1h1a1 1 0 011 1v6a1 1 0 01-1 1h-1a1 1 0 01-1-1V2z"/>
              </svg>
              {/* WiFi */}
              <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11" fill="currentColor">
                <path d="M8.5 2.5a6 6 0 014.24 1.76.75.75 0 001.06-1.06A7.5 7.5 0 008.5 1a7.5 7.5 0 00-5.3 2.2.75.75 0 001.06 1.06A6 6 0 018.5 2.5z"/>
                <path d="M8.5 5.5a3 3 0 012.12.88.75.75 0 001.06-1.06 4.5 4.5 0 00-6.36 0 .75.75 0 001.06 1.06A3 3 0 018.5 5.5z"/>
                <circle cx="8.5" cy="9" r="1.5"/>
              </svg>
              {/* Battery */}
              <div className="flex items-center">
                <div className={`w-[25px] h-[12px] border-[1.5px] ${darkMode ? 'border-white' : 'border-gray-900'} rounded-[3px] flex items-center p-[2px]`}>
                  <div className={`w-[17px] h-[7px] ${darkMode ? 'bg-white' : 'bg-gray-900'} rounded-[1px]`} />
                </div>
                <div className={`w-[1.5px] h-[5px] ${darkMode ? 'bg-white' : 'bg-gray-900'} ml-[1px] rounded-r-sm`} />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex flex-col h-[calc(100%-54px-34px)] overflow-hidden">
            {children}
          </div>
          
          {/* Home indicator */}
          <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] ${darkMode ? 'bg-white' : 'bg-gray-900'} rounded-full opacity-60`} />
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
