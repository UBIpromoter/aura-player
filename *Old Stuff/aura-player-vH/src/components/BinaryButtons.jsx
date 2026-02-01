import React from 'react';
import { CONFIDENCE_LABELS } from '../data/questions';

const BinaryButtons = ({
  darkMode,
  selectedAnswer,
  tapCount,
  isAnswered,
  currentResponse,
  onTap,
  onSubmit,
  pendingSubmit
}) => {
  const getButtonStyle = (answer) => {
    const isSelected = selectedAnswer === answer;
    const isPending = pendingSubmit?.answer === answer;
    const wasAnswered = currentResponse?.choice === answer;
    
    if (wasAnswered || isPending) {
      const confidence = currentResponse?.confidence || pendingSubmit?.confidence || 2;
      if (answer === true) {
        return `bg-emerald-${400 + confidence * 100} text-white`;
      } else {
        return `bg-rose-${400 + confidence * 100} text-white`;
      }
    }
    
    if (isSelected) {
      const intensity = Math.min(tapCount, 4);
      if (answer === true) {
        return `bg-emerald-${300 + intensity * 100}/80 text-white ring-2 ring-emerald-400`;
      } else {
        return `bg-rose-${300 + intensity * 100}/80 text-white ring-2 ring-rose-400`;
      }
    }
    
    if (isAnswered) {
      return darkMode 
        ? 'bg-gray-800/50 text-gray-600' 
        : 'bg-gray-100 text-gray-400';
    }
    
    return darkMode
      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };
  
  const handleTap = (answer) => {
    if (isAnswered || pendingSubmit) return;
    onTap(answer);
  };
  
  return (
    <div className="space-y-4">
      {/* Button row */}
      <div className="flex gap-4">
        <button
          onClick={() => handleTap(true)}
          disabled={isAnswered || pendingSubmit}
          className={`flex-1 py-4 rounded-xl text-lg font-semibold transition-all active:scale-95 ${getButtonStyle(true)}`}
        >
          YES
        </button>
        <button
          onClick={() => handleTap(false)}
          disabled={isAnswered || pendingSubmit}
          className={`flex-1 py-4 rounded-xl text-lg font-semibold transition-all active:scale-95 ${getButtonStyle(false)}`}
        >
          NO
        </button>
      </div>
      
      {/* Confidence indicator when selecting */}
      {selectedAnswer !== null && !isAnswered && !pendingSubmit && (
        <div className="text-center space-y-2">
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Tap again to increase confidence
          </div>
          
          {/* Confidence segments */}
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-12 h-2 rounded-full transition-all ${
                  tapCount >= level
                    ? selectedAnswer === true
                      ? 'bg-emerald-500'
                      : 'bg-rose-500'
                    : darkMode
                      ? 'bg-gray-700'
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {CONFIDENCE_LABELS[tapCount] || CONFIDENCE_LABELS[1]}
          </div>
          
          {/* Submit button */}
          <button
            onClick={() => onSubmit(selectedAnswer, tapCount)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedAnswer === true
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-rose-600 hover:bg-rose-500 text-white'
            }`}
          >
            Submit
          </button>
        </div>
      )}
      
      {/* Show answer state */}
      {isAnswered && currentResponse && !pendingSubmit && (
        <div className="text-center">
          <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            You answered: <span className="font-medium">{currentResponse.choice ? 'Yes' : 'No'}</span>
            {' · '}
            {CONFIDENCE_LABELS[currentResponse.confidence]}
          </div>
        </div>
      )}
    </div>
  );
};

export default BinaryButtons;
