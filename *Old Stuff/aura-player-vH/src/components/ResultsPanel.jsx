import React from 'react';

const ResultsPanel = ({
  question,
  response,
  results,
  darkMode,
  isDemo = true
}) => {
  if (!results) return null;
  
  const { totalAnswers, distribution } = results;
  
  const renderBinaryResults = () => {
    const yesCount = distribution.yes || 0;
    const noCount = distribution.no || 0;
    const total = yesCount + noCount;
    const yesPercent = total > 0 ? Math.round((yesCount / total) * 100) : 50;
    const noPercent = 100 - yesPercent;
    
    return (
      <div className="space-y-2">
        {/* Yes bar */}
        <div className="flex items-center gap-2">
          <span className={`text-xs w-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Yes</span>
          <div className="flex-1 h-4 bg-gray-700/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${yesPercent}%` }}
            />
          </div>
          <span className={`text-xs w-10 text-right font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            {yesPercent}%
          </span>
        </div>
        
        {/* No bar */}
        <div className="flex items-center gap-2">
          <span className={`text-xs w-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No</span>
          <div className="flex-1 h-4 bg-gray-700/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${noPercent}%` }}
            />
          </div>
          <span className={`text-xs w-10 text-right font-medium ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>
            {noPercent}%
          </span>
        </div>
      </div>
    );
  };
  
  const renderMultipleResults = () => {
    const options = question.options || [];
    const total = Object.values(distribution).reduce((a, b) => a + b, 0);
    
    return (
      <div className="space-y-1.5">
        {options.map((option, index) => {
          const count = distribution[option] || 0;
          const percent = total > 0 ? Math.round((count / total) * 100) : 0;
          
          return (
            <div key={option} className="flex items-center gap-2">
              <span className={`text-xs w-6 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {String.fromCharCode(65 + index)}
              </span>
              <div className="flex-1 h-3 bg-gray-700/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className={`text-xs w-10 text-right font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {percent}%
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className={`mx-4 mb-4 p-3 rounded-xl ${
      darkMode ? 'bg-gray-900/50' : 'bg-white border border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Community Results
        </span>
        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          {totalAnswers} answers
        </span>
      </div>
      
      {question.type === 'binary' ? renderBinaryResults() : renderMultipleResults()}
      
      {isDemo && (
        <div className={`text-[10px] text-center mt-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          Demo results · Login to see real community data
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
