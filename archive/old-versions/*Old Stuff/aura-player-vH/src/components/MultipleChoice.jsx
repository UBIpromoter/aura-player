import React from 'react';
import { MC_COLORS, CONFIDENCE_LABELS } from '../data/questions';

const MultipleChoice = ({
  options,
  darkMode,
  selectedAnswer,
  tapCount,
  isAnswered,
  currentResponse,
  onTap,
  onSubmit,
  pendingSubmit
}) => {
  const getOptionStyle = (option, index) => {
    const color = MC_COLORS[index % MC_COLORS.length];
    const isSelected = selectedAnswer === option;
    const isPending = pendingSubmit?.answer === option;
    const wasAnswered = currentResponse?.choice === option;
    
    if (wasAnswered || isPending) {
      const confidence = currentResponse?.confidence || pendingSubmit?.confidence || 2;
      return {
        backgroundColor: color.shades[confidence - 1],
        color: 'white',
        borderColor: 'transparent'
      };
    }
    
    if (isSelected) {
      const intensity = Math.min(tapCount - 1, 3);
      return {
        backgroundColor: color.shades[intensity] + '40',
        color: darkMode ? 'white' : color.hex,
        borderColor: color.hex
      };
    }
    
    if (isAnswered) {
      return {
        backgroundColor: darkMode ? 'rgb(31, 41, 55)' : 'rgb(243, 244, 246)',
        color: darkMode ? 'rgb(107, 114, 128)' : 'rgb(156, 163, 175)',
        borderColor: 'transparent'
      };
    }
    
    return {
      backgroundColor: darkMode ? 'rgb(31, 41, 55)' : 'rgb(243, 244, 246)',
      color: darkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
      borderColor: 'transparent'
    };
  };
  
  const handleTap = (option) => {
    if (isAnswered || pendingSubmit) return;
    onTap(option);
  };
  
  const selectedColor = selectedAnswer 
    ? MC_COLORS[options.indexOf(selectedAnswer) % MC_COLORS.length] 
    : null;
  
  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="space-y-2">
        {options.map((option, index) => {
          const style = getOptionStyle(option, index);
          const letter = String.fromCharCode(65 + index); // A, B, C, D, E
          
          return (
            <button
              key={option}
              onClick={() => handleTap(option)}
              disabled={isAnswered || pendingSubmit}
              className="w-full py-3 px-4 rounded-xl text-left transition-all active:scale-[0.98] border-2"
              style={style}
            >
              <span className="font-medium mr-2">{letter}.</span>
              <span>{option}</span>
            </button>
          );
        })}
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
                className="w-12 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: tapCount >= level 
                    ? selectedColor?.hex 
                    : darkMode ? 'rgb(55, 65, 81)' : 'rgb(209, 213, 219)'
                }}
              />
            ))}
          </div>
          
          <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {CONFIDENCE_LABELS[tapCount] || CONFIDENCE_LABELS[1]}
          </div>
          
          {/* Submit button */}
          <button
            onClick={() => onSubmit(selectedAnswer, tapCount)}
            className="px-6 py-2 rounded-lg font-medium transition-all text-white"
            style={{ backgroundColor: selectedColor?.hex }}
          >
            Submit
          </button>
        </div>
      )}
      
      {/* Show answer state */}
      {isAnswered && currentResponse && !pendingSubmit && (
        <div className="text-center">
          <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            You answered: <span className="font-medium">{currentResponse.choice}</span>
            {' · '}
            {CONFIDENCE_LABELS[currentResponse.confidence]}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
