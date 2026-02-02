// Assessment picker and progress screen
// TODO: Extract full implementation from index.html

import { ASSESS_TESTS, ASSESS_CATEGORIES } from '../../data/assessments';

export const AssessmentScreen = ({ onSelectTest, darkMode }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-6">Assessments</h2>

      {Object.entries(ASSESS_CATEGORIES).map(([catId, cat]) => (
        <div key={catId} className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            {cat.icon} {cat.name}
          </h3>
          <div className="space-y-2">
            {cat.tests.filter(testId => ASSESS_TESTS[testId]).map(testId => {
              const test = ASSESS_TESTS[testId];
              return (
                <button
                  key={testId}
                  onClick={() => onSelectTest(testId)}
                  className="w-full p-4 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-colors"
                >
                  <span className="text-xl mr-2">{test.icon}</span>
                  <span className="text-white">{test.name}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {test.items?.length || 0} items
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssessmentScreen;
