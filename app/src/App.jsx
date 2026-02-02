import { useState, useEffect, useCallback } from 'react';
import { useDisplayMode } from './hooks/useDisplayMode';
import { useAuth } from './hooks/useAuth';
import { initSession, captureResponse } from './services/supabase';
import { loadState, saveState } from './services/storage';

// Components
import { PhoneFrame, NavBar } from './components/layout';
import { QuestionCard, BinaryButtons } from './components/question';

// Data
import { QUESTIONS, ONBOARDING_QUESTIONS } from './data/questions';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [tappedAnswer, setTappedAnswer] = useState(null);
  const [tapCount, setTapCount] = useState(0);
  const [evidenceExpanded, setEvidenceExpanded] = useState(false);
  const [answers, setAnswers] = useState({});

  const { darkMode, toggleDarkMode } = useDisplayMode();
  const { user, loading } = useAuth();

  useEffect(() => {
    initSession();
    const state = loadState();
    setAnswers(state.answers || {});
    if (Object.keys(state.answers || {}).length > 0) {
      setScreen('questions');
    }
  }, []);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const stats = { answered: Object.keys(answers).length, streak: 0 };

  const handleTap = useCallback((answer) => {
    if (tappedAnswer === answer) {
      // Same button - increase confidence
      setTapCount(prev => Math.min(prev + 1, 4));
    } else {
      // Different button - switch
      setTappedAnswer(answer);
      setTapCount(1);
    }

    // Auto-submit after tap
    setTimeout(() => {
      if (currentQuestion) {
        const newAnswers = {
          ...answers,
          [currentQuestion.id]: { answer, confidence: tapCount + 1, timestamp: Date.now() }
        };
        setAnswers(newAnswers);
        saveState({ ...loadState(), answers: newAnswers });

        // Capture to Supabase
        captureResponse(currentQuestion.id, answer, tapCount + 1, currentQuestion);

        // Next question
        setCurrentQuestionIndex(prev => prev + 1);
        setTappedAnswer(null);
        setTapCount(0);
        setEvidenceExpanded(false);
      }
    }, 300);
  }, [tappedAnswer, tapCount, currentQuestion, answers]);

  if (loading) {
    return (
      <PhoneFrame darkMode={darkMode}>
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500" />
        </div>
      </PhoneFrame>
    );
  }

  // Welcome screen
  if (screen === 'welcome') {
    return (
      <PhoneFrame darkMode={darkMode}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-6xl mb-6">🌀</div>
          <h1 className="text-3xl font-bold mb-3 text-white">Aura</h1>
          <p className="text-base mb-12 text-center text-gray-400">
            Discover yourself, one question at a time
          </p>
          <button
            onClick={() => setScreen('questions')}
            className="w-full max-w-xs py-4 px-6 rounded-xl font-semibold text-lg bg-violet-600 text-white hover:bg-violet-500 transition-colors"
          >
            Let's Go
          </button>
        </div>
      </PhoneFrame>
    );
  }

  // Questions screen
  return (
    <PhoneFrame darkMode={darkMode}>
      <NavBar
        darkMode={darkMode}
        stats={stats}
        onHome={() => setScreen('welcome')}
        onSettings={toggleDarkMode}
        onProfile={() => {}}
        isLoggedIn={!!user}
      />

      <div className="flex-1 flex flex-col p-4 overflow-auto">
        {currentQuestion ? (
          <>
            <div className="flex-1 flex flex-col justify-center">
              <QuestionCard
                question={currentQuestion}
                darkMode={darkMode}
                evidenceExpanded={evidenceExpanded}
                onToggleEvidence={() => setEvidenceExpanded(!evidenceExpanded)}
              />
            </div>

            <div className="mt-4">
              <BinaryButtons
                darkMode={darkMode}
                tappedAnswer={tappedAnswer}
                tapCount={tapCount}
                isAnswered={false}
                currentResponse={null}
                onTap={handleTap}
                requireConfirmation={false}
              />
            </div>

            <div className="text-center mt-4 text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {QUESTIONS.length}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">All Done!</h2>
            <p className="text-gray-400">You've answered all available questions.</p>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setAnswers({});
                saveState({ ...loadState(), answers: {} });
              }}
              className="mt-6 px-6 py-3 bg-violet-600 text-white rounded-xl"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

export default App;
