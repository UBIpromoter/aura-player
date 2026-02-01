import React from 'react';
import { CATEGORIES } from '../data/questions';

const QuestionCard = ({ 
  question, 
  darkMode, 
  evidenceExpanded, 
  onToggleEvidence 
}) => {
  const category = CATEGORIES.find(c => c.id === question.category);
  const hasEvidence = question.preEvidence && question.preEvidence.length > 0;
  
  const categoryColors = {
    prediction: darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700',
    reasoning: darkMode ? 'bg-violet-900/30 text-violet-400' : 'bg-violet-100 text-violet-700',
    judgment: darkMode ? 'bg-teal-900/30 text-teal-400' : 'bg-teal-100 text-teal-700',
  };
  
  return (
    <div className="space-y-3">
      {/* Category badge */}
      {category && (
        <div className="flex justify-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[question.category]}`}>
            {category.icon} {category.name}
          </span>
        </div>
      )}
      
      {/* Question text */}
      <h2 className={`question-text text-center font-medium leading-relaxed ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {question.text}
      </h2>
      
      {/* Evidence panel */}
      {hasEvidence && (
        <div className={`rounded-lg overflow-hidden ${
          darkMode ? 'bg-gray-900/50' : 'bg-white border border-gray-200'
        }`}>
          <button
            onClick={onToggleEvidence}
            className={`w-full px-3 py-2 flex items-center justify-between text-xs ${
              darkMode 
                ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <span>📊 Evidence ({question.preEvidence.length})</span>
            <span>{evidenceExpanded ? '−' : '+'}</span>
          </button>
          
          {evidenceExpanded && (
            <div className="px-3 pb-2 space-y-1">
              {question.preEvidence.map((item, i) => (
                <EvidenceItem key={i} item={item} darkMode={darkMode} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const EvidenceItem = ({ item, darkMode }) => {
  if (item.type === 'stat') {
    return (
      <div className={`flex justify-between text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <span>{item.label}</span>
        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</span>
      </div>
    );
  }
  
  if (item.type === 'note') {
    return (
      <div className={`text-xs italic ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        "{item.text}"
      </div>
    );
  }
  
  return null;
};

export default QuestionCard;
