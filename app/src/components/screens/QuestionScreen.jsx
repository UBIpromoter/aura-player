// Main question answering screen
// TODO: Extract full implementation from index.html

import { QuestionCard } from '../question/QuestionCard';
import { BinaryButtons } from '../question/BinaryButtons';
import { MCButtons } from '../question/MCButtons';

export const QuestionScreen = ({ question, onAnswer, darkMode }) => {
  if (!question) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">No more questions!</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <QuestionCard question={question} darkMode={darkMode} />
      {question.type === 'binary' ? (
        <BinaryButtons onAnswer={onAnswer} />
      ) : (
        <MCButtons options={question.options} onAnswer={onAnswer} />
      )}
    </div>
  );
};

export default QuestionScreen;
