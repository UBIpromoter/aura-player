import React from 'react';

const LaunchScreen = ({ onDemo, onLogin, darkMode }) => {
  return (
    <div className={`flex-1 flex flex-col items-center justify-center p-8 ${
      darkMode ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
      {/* Logo */}
      <div className="text-6xl mb-4">🌀</div>
      <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Aura
      </h1>
      <p className={`text-sm mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Answer questions with confidence
      </p>
      
      {/* Buttons */}
      <div className="w-full max-w-xs space-y-3">
        <button
          onClick={onLogin}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
            darkMode 
              ? 'bg-white text-gray-900 hover:bg-gray-100' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          Login / Sign Up
        </button>
        
        <button
          onClick={onDemo}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
            darkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Try Demo
        </button>
      </div>
      
      {/* Demo note */}
      <p className={`text-xs mt-6 text-center max-w-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
        Demo answers aren't saved to community.
        <br />
        Login to contribute real data.
      </p>
    </div>
  );
};

export default LaunchScreen;
