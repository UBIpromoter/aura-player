import React from 'react';

const NavBar = ({ 
  darkMode, 
  currentIndex, 
  totalQuestions, 
  onHome, 
  onSettings, 
  onProfile,
  stats,
  showStreak 
}) => {
  return (
    <div className={`flex items-center justify-between px-4 py-2 ${
      darkMode ? 'bg-gray-950/70 border-b border-white/5' : 'bg-white/70 border-b border-gray-200/50'
    } backdrop-blur-md`}>
      {/* Home/Logo */}
      <button 
        onClick={onHome}
        className="text-xl active:scale-90 transition-transform"
      >
        🌀
      </button>
      
      {/* Stats */}
      <button
        onClick={onProfile}
        className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors ${
          darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200'
        }`}
      >
        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {stats.answered} answered
        </span>
        {showStreak && stats.streak > 0 && (
          <span className="text-xs text-orange-400">🔥{stats.streak}</span>
        )}
        <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>›</span>
      </button>
      
      {/* Settings */}
      <button 
        onClick={onSettings}
        className={`text-xl active:scale-90 transition-transform ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
      >
        ☰
      </button>
    </div>
  );
};

export default NavBar;
