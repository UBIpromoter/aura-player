import React from 'react';
import { CATEGORIES, CONFIDENCE_LABELS } from '../data/questions';

const ProfileScreen = ({
  darkMode,
  stats,
  responses,
  questions,
  onBack
}) => {
  const answeredQuestions = questions.filter(q => responses[q.id]);
  
  // Category breakdown
  const categoryStats = CATEGORIES.map(cat => {
    const catQuestions = answeredQuestions.filter(q => q.category === cat.id);
    return {
      ...cat,
      count: catQuestions.length
    };
  });
  
  // Confidence distribution
  const confidenceDistribution = [0, 0, 0, 0];
  Object.values(responses).forEach(r => {
    if (r.confidence >= 1 && r.confidence <= 4) {
      confidenceDistribution[r.confidence - 1]++;
    }
  });
  const totalResponses = Object.keys(responses).length;
  
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
          Profile
        </h1>
        <div className="w-12" />
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Stats overview */}
        <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🌀</div>
            <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Demo User
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stats.answered}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Answered
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stats.streak}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                🔥 Streak
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {questions.length - stats.answered}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Remaining
              </div>
            </div>
          </div>
        </div>
        
        {/* Category breakdown */}
        <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          <div className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Categories
          </div>
          <div className="space-y-2">
            {categoryStats.map(cat => {
              const total = questions.filter(q => q.category === cat.id).length;
              const percent = total > 0 ? Math.round((cat.count / total) * 100) : 0;
              
              return (
                <div key={cat.id} className="flex items-center gap-3">
                  <span className="text-lg">{cat.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {cat.name}
                      </span>
                      <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
                        {cat.count}/{total}
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-full rounded-full ${
                          cat.color === 'amber' ? 'bg-amber-500' :
                          cat.color === 'violet' ? 'bg-violet-500' :
                          'bg-teal-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Confidence distribution */}
        <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          <div className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Confidence Distribution
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map(level => {
              const count = confidenceDistribution[level - 1];
              const percent = totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0;
              
              return (
                <div key={level} className="flex items-center gap-3">
                  <span className={`text-xs w-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {CONFIDENCE_LABELS[level]}
                  </span>
                  <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full rounded-full bg-violet-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className={`text-xs w-8 text-right ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {percent}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Demo notice */}
        <div className={`text-xs text-center p-4 rounded-lg ${
          darkMode ? 'bg-gray-900 text-gray-500' : 'bg-gray-100 text-gray-500'
        }`}>
          Demo mode · Login to save your progress and see real community data
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
