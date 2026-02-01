import React from 'react';

const SettingsScreen = ({
  darkMode,
  setDarkMode,
  undoDelay,
  setUndoDelay,
  showStreak,
  setShowStreak,
  onBack,
  onReset
}) => {
  return (
    <div className={`flex-1 flex flex-col overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${
        darkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <button 
          onClick={onBack}
          className={`text-sm ${darkMode ? 'text-violet-400' : 'text-violet-600'}`}
        >
          ← Back
        </button>
        <h1 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h1>
        <div className="w-12" />
      </div>
      
      {/* Settings list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Dark Mode */}
        <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Theme
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                {darkMode ? 'Dark mode' : 'Light mode'}
              </div>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                darkMode ? 'bg-violet-600' : 'bg-gray-200'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform flex items-center justify-center text-sm ${
                darkMode ? 'translate-x-7' : 'translate-x-1'
              }`}>
                {darkMode ? '🌙' : '☀️'}
              </div>
            </button>
          </div>
        </div>
        
        {/* Undo Delay */}
        <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Undo Delay
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Time to cancel answer
              </div>
            </div>
            <span className={`font-bold ${darkMode ? 'text-violet-400' : 'text-violet-600'}`}>
              {undoDelay === 0 ? 'Off' : `${undoDelay}s`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="0.5"
            value={undoDelay}
            onChange={(e) => setUndoDelay(parseFloat(e.target.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-violet-500 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          />
          <div className={`flex justify-between text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            <span>Off</span>
            <span>1s</span>
            <span>2s</span>
            <span>3s</span>
          </div>
        </div>
        
        {/* Streak Counter */}
        <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Streak Counter
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Show 🔥 during play
              </div>
            </div>
            <button
              onClick={() => setShowStreak(!showStreak)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                showStreak ? 'bg-violet-600' : darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                showStreak ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
        
        {/* Keyboard Shortcuts */}
        <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          <div className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Keyboard Shortcuts
          </div>
          <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'} space-y-1`}>
            <div className="flex justify-between">
              <span>Yes / No</span>
              <span className="font-mono">Y N</span>
            </div>
            <div className="flex justify-between">
              <span>MC options</span>
              <span className="font-mono">A B C D E</span>
            </div>
            <div className="flex justify-between">
              <span>Navigate</span>
              <span className="font-mono">← →</span>
            </div>
            <div className="flex justify-between">
              <span>Skip / Save</span>
              <span className="font-mono">S M</span>
            </div>
            <div className="flex justify-between">
              <span>Undo</span>
              <span className="font-mono">Esc</span>
            </div>
          </div>
        </div>
        
        {/* Reset Demo */}
        <button
          onClick={onReset}
          className={`w-full py-3 rounded-lg text-sm font-medium ${
            darkMode 
              ? 'bg-rose-900/30 text-rose-400 hover:bg-rose-900/50' 
              : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
          }`}
        >
          Reset Demo Data
        </button>
        
        {/* Version */}
        <div className={`text-xs text-center ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          Aura Player vH
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
