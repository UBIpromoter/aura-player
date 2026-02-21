import { useState, useEffect, useCallback, useRef } from 'react';
import { useDisplayMode } from './hooks/useDisplayMode';
import { useAuth } from './hooks/useAuth';
import { initSession, captureResponse } from './services/supabase';
import { loadState, saveState } from './services/storage';

// Components
import { PhoneFrame, NavBar } from './components/layout';
import { QuestionCard, BinaryButtons } from './components/question';

// Data
import { QUESTIONS, ONBOARDING_QUESTIONS } from './data/questions';

// ==================== LANDING PAGE: WelcomeGate ====================

const AURA_PATH_KEY = 'aura-path-choice';

// Tiny organism teaser — a handful of particles drifting in a radial field.
// Pure CSS animation, no canvas, no overflow risk (all radial-gradient based).
const OrganismTeaser = () => {
  const particles = useRef(
    Array.from({ length: 7 }, (_, i) => ({
      id: i,
      size: 3 + Math.random() * 4,
      x: 40 + Math.random() * 20,
      y: 40 + Math.random() * 20,
      dur: 6 + Math.random() * 6,
      delay: -Math.random() * 8,
      hue: 250 + Math.random() * 40,
      opacity: 0.4 + Math.random() * 0.4,
    }))
  ).current;

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
    }}>
      {/* Two-layer radial wash — contained, no blur, no clip issues */}
      <div style={{
        position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)',
        animation: 'aura-breathe 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)',
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.10) 0%, transparent 65%)',
        animation: 'aura-breathe 6s ease-in-out infinite reverse',
      }} />
      {/* Floating particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: '50%',
          background: `hsla(${p.hue}, 70%, 65%, ${p.opacity})`,
          animation: `particle-drift-${p.id % 3} ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes aura-breathe {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.7; }
          50% { transform: translateX(-50%) scale(1.08); opacity: 1; }
        }
        @keyframes particle-drift-0 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(12px, -8px); }
          66% { transform: translate(-6px, 10px); }
        }
        @keyframes particle-drift-1 {
          0%, 100% { transform: translate(0, 0); }
          40% { transform: translate(-10px, -12px); }
          70% { transform: translate(8px, 6px); }
        }
        @keyframes particle-drift-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(6px, 14px); }
        }
      `}</style>
    </div>
  );
};

const WelcomeGate = ({ onHumanPath, onAIPath }) => (
  <div className="flex-1 flex flex-col relative overflow-hidden">
    <OrganismTeaser />

    <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
      {/* Title group */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-3"
          style={{ letterSpacing: '-0.02em' }}>
          Aura
        </h1>
        <p className="text-base text-gray-400 leading-relaxed max-w-[280px] mx-auto">
          A personality assessment that works for humans and AIs.
          Same questions. Different minds. What does yours look like?
        </p>
      </div>

      {/* Two paths */}
      <div className="w-full max-w-[300px] flex flex-col gap-3">
        {/* Human path — primary */}
        <button
          onClick={onHumanPath}
          className="relative w-full py-4 px-6 rounded-2xl font-semibold text-[15px] text-white transition-all duration-200 active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
          }}
        >
          <span className="relative z-10">Discover your aura</span>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 16,
            background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
        </button>

        {/* AI path — distinct, not secondary */}
        <button
          onClick={onAIPath}
          className="relative w-full py-4 px-6 rounded-2xl font-semibold text-[15px] transition-all duration-200 active:scale-[0.98]"
          style={{
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.25)',
            color: '#a5b4fc',
          }}
        >
          <span className="relative z-10">Discover your AI's aura</span>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 16,
            background: 'radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
        </button>
      </div>

      {/* Subtle differentiator callout */}
      <p className="mt-8 text-[13px] text-gray-500 text-center max-w-[260px] leading-relaxed">
        The first personality test AIs can take themselves.
      </p>
    </div>
  </div>
);

// ==================== AI PATH INFO SCREEN ====================

const AIPathScreen = ({ onBack }) => (
  <div className="flex-1 flex flex-col relative overflow-hidden">
    {/* Subtle atmospheric background */}
    <div style={{
      position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
      width: 350, height: 350, borderRadius: '50%',
      background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.10) 0%, transparent 65%)',
      pointerEvents: 'none',
    }} />

    <div className="flex-1 flex flex-col p-6 relative z-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="self-start text-gray-500 text-sm mb-6 active:text-gray-300 transition-colors"
      >
        ← Back
      </button>

      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Give your AI an aura
        </h2>
        <p className="text-gray-400 text-[15px] leading-relaxed mb-8 max-w-[320px]">
          Point any AI at our API. It answers the same assessment humans take,
          and gets its own personality profile back.
        </p>

        {/* Endpoint cards */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="rounded-xl p-4" style={{
            background: 'rgba(99,102,241,0.06)',
            border: '1px solid rgba(99,102,241,0.15)',
          }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded"
                style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>
                GET
              </span>
              <span className="text-[13px] text-gray-300 font-mono">/api/questions</span>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Returns the assessment questions as JSON. Feed these to your AI.
            </p>
          </div>

          <div className="rounded-xl p-4" style={{
            background: 'rgba(99,102,241,0.06)',
            border: '1px solid rgba(99,102,241,0.15)',
          }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded"
                style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                POST
              </span>
              <span className="text-[13px] text-gray-300 font-mono">/api/assess</span>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Send your AI's answers. Get its aura profile back — archetype, traits, the full picture.
            </p>
          </div>
        </div>

        {/* Quick start hint */}
        <div className="rounded-xl p-4" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            <span className="text-gray-400 font-medium">Quick start:</span>{' '}
            Tell your AI to fetch the questions, answer them honestly, then POST the answers back.
            No auth needed. No setup. Just a conversation and an API call.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ==================== MAIN APP ====================

function App() {
  // Determine initial screen: returning visitor skips gate
  const getInitialScreen = () => {
    const pathChoice = localStorage.getItem(AURA_PATH_KEY);
    if (pathChoice === 'human') {
      const state = loadState();
      return Object.keys(state.answers || {}).length > 0 ? 'questions' : 'welcome';
    }
    if (pathChoice === 'ai') return 'ai-path';
    return 'gate'; // New visitor
  };

  const [screen, setScreen] = useState(getInitialScreen);
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
    // Only auto-advance if we're already past the gate
    if (screen === 'welcome' && Object.keys(state.answers || {}).length > 0) {
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

  // Landing gate — first thing a new visitor sees
  if (screen === 'gate') {
    return (
      <PhoneFrame darkMode={darkMode}>
        <WelcomeGate
          onHumanPath={() => {
            localStorage.setItem(AURA_PATH_KEY, 'human');
            setScreen('welcome');
          }}
          onAIPath={() => {
            localStorage.setItem(AURA_PATH_KEY, 'ai');
            setScreen('ai-path');
          }}
        />
      </PhoneFrame>
    );
  }

  // AI path — API info screen
  if (screen === 'ai-path') {
    return (
      <PhoneFrame darkMode={darkMode}>
        <AIPathScreen onBack={() => {
          localStorage.removeItem(AURA_PATH_KEY);
          setScreen('gate');
        }} />
      </PhoneFrame>
    );
  }

  // Welcome screen (human path — after choosing "Discover your aura")
  if (screen === 'welcome') {
    return (
      <PhoneFrame darkMode={darkMode}>
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <OrganismTeaser />
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-3 text-white">Aura</h1>
            <p className="text-base mb-12 text-center text-gray-400">
              Discover yourself, one question at a time
            </p>
            <button
              onClick={() => setScreen('questions')}
              className="w-full max-w-xs py-4 px-6 rounded-2xl font-semibold text-lg text-white transition-all duration-200 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' }}
            >
              Let's Go
            </button>
          </div>
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
