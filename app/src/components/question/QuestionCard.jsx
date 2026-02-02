// Question card with category badge and evidence section
import { TH, CATEGORY_COLORS, GLOW_MAP } from '../../utils/theme';
import { CAT_MAP } from '../../data/constants';

const CATEGORIES = Object.values(CAT_MAP);

export const QuestionCard = ({ question, darkMode, evidenceExpanded, onToggleEvidence }) => {
  const category = CATEGORIES.find(c => c.id === question.category);
  const hasEvidence = question.preEvidence && question.preEvidence.length > 0;

  const categoryColors = {
    prediction: darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700',
    reasoning: darkMode ? 'bg-violet-900/30 text-violet-400' : 'bg-violet-100 text-violet-700',
    judgment: darkMode ? 'bg-teal-900/30 text-teal-400' : 'bg-teal-100 text-teal-700',
  };

  const glowMap = { prediction: 'glow-amber', reasoning: 'glow-violet', judgment: 'glow-teal' };
  const cardGlow = darkMode && question.category ? glowMap[question.category] || '' : '';

  return (
    <div className={`space-y-2 ${cardGlow ? `p-4 rounded-2xl ${cardGlow}` : ''}`}>
      {/* Category badge */}
      {category && (
        <div className="flex justify-center">
          <span className={`px-2 py-0.5 rounded-full text-sm font-medium ${categoryColors[question.category]}`}>
            {category.icon} {category.name}
          </span>
        </div>
      )}

      {/* Question text */}
      <h2 className={`question-text text-center font-medium ${TH('text-primary', darkMode)}`}>
        {question.text}
      </h2>

      {/* Evidence section */}
      {hasEvidence && (
        <div className={`rounded-xl overflow-hidden ${
          darkMode
            ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/80'
            : 'bg-white border border-gray-200 shadow-sm'
        }`}>
          <button
            onClick={onToggleEvidence}
            className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
              darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${
                darkMode ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-600'
              }`}>
                📊
              </span>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Evidence <span className={`ml-1 ${TH('text-subtle', darkMode)}`}>
                  ({question.preEvidence.length})
                </span>
              </span>
            </span>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform duration-200 ${
              darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
            } ${evidenceExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {evidenceExpanded && (
            <div className="px-4 pb-4 space-y-3">
              {question.preEvidence.map((item, i) => (
                <div key={i} className={`rounded-lg p-3 ${darkMode ? 'bg-gray-800/60' : 'bg-gray-50'}`}>
                  {item.type === 'stat' ? (
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${TH('text-muted', darkMode)}`}>{item.label}</span>
                      <span className={`text-sm font-semibold px-2 py-0.5 rounded ${
                        darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <span className={`text-lg leading-none ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>"</span>
                      <span className={`text-sm italic ${TH('text-muted', darkMode)}`}>{item.text}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
