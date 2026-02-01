import React, { useState, useEffect } from 'react';
import { CONFIDENCE_LABELS } from '../data/questions';

const UndoBar = ({
  darkMode,
  undoDelay,
  onUndo,
  answer,
  confidence
}) => {
  const [countdown, setCountdown] = useState(undoDelay);
  
  useEffect(() => {
    setCountdown(undoDelay);
    const interval = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 0.1));
    }, 100);
    
    return () => clearInterval(interval);
  }, [undoDelay, answer, confidence]);
  
  const progress = countdown / undoDelay;
  
  const answerText = typeof answer === 'boolean' 
    ? (answer ? 'Yes' : 'No') 
    : answer;
  
  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 transform transition-transform duration-300 ${
        darkMode ? 'bg-amber-900/90' : 'bg-amber-100/90'
      } backdrop-blur-sm`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Undo button */}
        <button 
          onClick={onUndo}
          className={`font-medium text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}
        >
          ↩ UNDO
        </button>
        
        {/* Answer preview */}
        <div className={`text-xs ${darkMode ? 'text-amber-400/70' : 'text-amber-600/70'}`}>
          {answerText} · {CONFIDENCE_LABELS[confidence]}
        </div>
        
        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className={`w-20 h-2 rounded-full overflow-hidden ${
            darkMode ? 'bg-black/20' : 'bg-amber-200'
          }`}>
            <div 
              className="h-full bg-amber-500 transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className={`text-xs tabular-nums w-8 ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
            {countdown.toFixed(1)}s
          </span>
        </div>
      </div>
    </div>
  );
};

export default UndoBar;
