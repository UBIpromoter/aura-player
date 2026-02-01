import React, { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Aura Player vH
 * - Bottom-anchored answer buttons (thumb zone)
 * - Swipe navigation
 * - Slide-up undo bar
 */

// ==================== CONSTANTS ====================
const CATEGORIES = [
  { id: 'prediction', name: 'Predictions', icon: '🔮', color: 'amber' },
  { id: 'reasoning', name: 'Reasoning', icon: '🧠', color: 'violet' },
  { id: 'judgment', name: 'Judgment', icon: '⚖️', color: 'teal' },
];

const CONFIDENCE_LABELS = ['', 'Wild guess', 'Uncertain', 'Fairly sure', 'Very confident'];

const MC_COLORS = [
  { hex: '#3b82f6', name: 'blue', tailwind: 'blue' },
  { hex: '#14b8a6', name: 'teal', tailwind: 'teal' },
  { hex: '#22c55e', name: 'green', tailwind: 'green' },
  { hex: '#ec4899', name: 'pink', tailwind: 'pink' },
  { hex: '#8b5cf6', name: 'violet', tailwind: 'violet' },
];

// ==================== SAMPLE QUESTIONS ====================
const SAMPLE_QUESTIONS = [
  { id: 1, type: 'binary', text: "Will Bitcoin exceed $150,000 before July 2026?", category: "prediction", preEvidence: [{ type: 'stat', label: 'Current Price', value: '$97,234' }] },
  { id: 2, type: 'multiple', text: "Is a hot dog a sandwich?", category: "reasoning", options: ["Yes, it's bread with filling", "No, it's its own category", "It's a taco", "Depends on definition"] },
  { id: 3, type: 'binary', text: "Will GPT-5 be released before September 2026?", category: "prediction" },
  { id: 4, type: 'multiple', text: "Which animal would win in a fight?", category: "judgment", options: ["100 duck-sized horses", "1 horse-sized duck", "Depends on terrain", "They'd become friends"] },
  { id: 5, type: 'binary', text: "Is this research methodology sound? (n=50)", category: "judgment", preEvidence: [{ type: 'stat', label: 'Sample Size', value: 'n=50' }] },
  { id: 6, type: 'multiple', text: "What will be the dominant AI interface by 2030?", category: "prediction", options: ["Text chat", "Voice assistants", "AR/VR agents", "Brain-computer interfaces"] },
  { id: 7, type: 'binary', text: "Is water wet?", category: "reasoning" },
  { id: 8, type: 'binary', text: "Will humans land on Mars before 2035?", category: "prediction" },
  { id: 9, type: 'multiple', text: "Best programming language for beginners?", category: "judgment", options: ["Python", "JavaScript", "Scratch", "Natural language (AI)"] },
  { id: 10, type: 'binary', text: "Is a Pop-Tart a ravioli?", category: "reasoning" },
  { id: 11, type: 'binary', text: "Could an average person beat a goose in a fight?", category: "judgment" },
  { id: 12, type: 'multiple', text: "Most likely cause of human extinction?", category: "prediction", options: ["AI/technology", "Climate change", "Pandemic", "Nuclear war"] },
  { id: 13, type: 'binary', text: "Is free will an illusion?", category: "reasoning" },
  { id: 14, type: 'multiple', text: "What gives life meaning?", category: "reasoning", options: ["Relationships", "Achievement", "Pleasure", "Purpose"] },
  { id: 15, type: 'binary', text: "Should billionaires exist?", category: "judgment" },
  { id: 16, type: 'binary', text: "Is 17 a prime number?", category: "reasoning" },
  { id: 17, type: 'multiple', text: "What's the best decade for music?", category: "judgment", options: ["1970s", "1980s", "1990s", "2000s+"] },
  { id: 18, type: 'binary', text: "Is remote work better for society?", category: "judgment" },
  { id: 19, type: 'binary', text: "Will AGI exist by 2035?", category: "prediction" },
  { id: 20, type: 'multiple', text: "Most important skill for next decade?", category: "judgment", options: ["AI literacy", "Critical thinking", "Emotional intelligence", "Adaptability"] },
];

// ==================== HOOKS ====================

// Swipe detection hook
const useSwipe = (onSwipeLeft, onSwipeRight, threshold = 50) => {
  const touchStart = useRef(null);
  const touchEnd = useRef(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
    setIsSwiping(true);
  };

  const onTouchMove = (e) => {
    if (!touchStart.current) return;
    touchEnd.current = e.targetTouches[0].clientX;
    const offset = touchEnd.current - touchStart.current;
    setSwipeOffset(offset);
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) {
      setIsSwiping(false);
      setSwipeOffset(0);
      return;
    }

    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe && onSwipeLeft) onSwipeLeft();
    if (isRightSwipe && onSwipeRight) onSwipeRight();

    setIsSwiping(false);
    setSwipeOffset(0);
    touchStart.current = null;
    touchEnd.current = null;
  };

  return { onTouchStart, onTouchMove, onTouchEnd, swipeOffset, isSwiping };
};

// Local storage hook
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// ==================== COMPONENTS ====================

// Phone Frame (desktop simulator)
const PhoneFrame = ({ children, darkMode = true }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div
        className="relative bg-[#1a1a1c] rounded-[55px] p-3 shadow-2xl"
        style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))' }}
      >
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-[100px] w-[3px] h-[28px] bg-[#2a2a2c] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[145px] w-[3px] h-[50px] bg-[#2a2a2c] rounded-l-sm" />
        <div className="absolute -right-[3px] top-[160px] w-[3px] h-[65px] bg-[#2a2a2c] rounded-r-sm" />

        {/* Screen */}
        <div
          className={`relative overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-gray-100'}`}
          style={{ width: 393, height: 852, borderRadius: 44 }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-30" />

          {/* Status bar */}
          <div className={`flex items-end justify-between px-8 pb-2 h-[54px] ${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-semibold relative z-20`}>
            <span>9:41</span>
            <div className="flex gap-1.5 items-center">
              <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11" fill="currentColor">
                <path d="M8.5 2.5a6 6 0 014.24 1.76.75.75 0 001.06-1.06A7.5 7.5 0 008.5 1a7.5 7.5 0 00-5.3 2.2.75.75 0 001.06 1.06A6 6 0 018.5 2.5z"/>
                <circle cx="8.5" cy="9" r="1.5"/>
              </svg>
              <div className="flex items-center">
                <div className={`w-[25px] h-[12px] border-[1.5px] ${darkMode ? 'border-white' : 'border-gray-900'} rounded-[3px] flex items-center p-[2px]`}>
                  <div className={`w-[17px] h-[7px] ${darkMode ? 'bg-white' : 'bg-gray-900'} rounded-[1px]`} />
                </div>
              </div>
            </div>
          </div>

          {children}

          {/* Home indicator */}
          <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] ${darkMode ? 'bg-white' : 'bg-gray-900'} rounded-full opacity-60`} />
        </div>
      </div>
    </div>
  );
};

// Confidence segments (fills as you tap)
const ConfidenceSegments = ({ level, color, active }) => {
  if (!active || level === 0) return null;

  const colors = {
    emerald: ['#d1fae5', '#6ee7b7', '#34d399', '#10b981'],
    rose: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e'],
    blue: ['#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6'],
    teal: ['#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6'],
    green: ['#bbf7d0', '#86efac', '#4ade80', '#22c55e'],
    pink: ['#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899'],
    violet: ['#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6'],
  };

  const shades = colors[color] || colors.violet;

  return (
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 z-0">
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className="w-2 h-2 rounded-full transition-all duration-150"
          style={{
            background: i <= level ? shades[i - 1] : 'rgba(255,255,255,0.2)',
            transform: i <= level ? 'scale(1.1)' : 'scale(0.8)',
            opacity: i <= level ? 1 : 0.3
          }}
        />
      ))}
    </div>
  );
};

// Evidence panel
const EvidencePanel = ({ preEvidence, expanded, onToggle, darkMode }) => {
  if (!preEvidence || preEvidence.length === 0) return null;

  return (
    <div className={`mt-2 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
      <button
        onClick={onToggle}
        className={`w-full px-3 py-2 flex items-center justify-between text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
      >
        <span>📊 Evidence</span>
        <span>{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <div className="px-3 pb-2 space-y-1">
          {preEvidence.map((ev, i) => (
            <div key={i} className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {ev.type === 'stat' && <span><strong>{ev.label}:</strong> {ev.value}</span>}
              {ev.type === 'note' && <span className="italic">{ev.text}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Slide-up Undo Bar
const UndoBar = ({ visible, answer, confidence, timeLeft, totalTime, onUndo, isBinary, options, darkMode }) => {
  if (!visible) return null;

  const getAnswerLabel = () => {
    if (isBinary) return answer === 0 ? 'YES' : 'NO';
    return options?.[answer] || `Option ${answer + 1}`;
  };

  const progress = timeLeft / totalTime;

  return (
    <div
      className={`absolute bottom-8 left-2 right-2 rounded-xl overflow-hidden z-50 transition-transform duration-300 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300 shadow-lg'
      }`}
      style={{ transform: visible ? 'translateY(0)' : 'translateY(100px)' }}
    >
      <button
        onClick={onUndo}
        className="w-full px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>↩</span>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {getAnswerLabel()}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
            ◆{confidence}
          </span>
        </div>
        <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          tap to undo
        </span>
      </button>
      {/* Progress bar */}
      <div className={`h-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <div
          className="h-full bg-violet-500 transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

// Binary answer chart
const BinaryChart = ({ evaluators, userResponse, darkMode }) => {
  const yesCount = evaluators.filter(e => e.answer === 0).length;
  const noCount = evaluators.filter(e => e.answer === 1).length;
  const total = evaluators.length;
  const yesPct = Math.round((yesCount / total) * 100);
  const noPct = 100 - yesPct;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className={`text-xs w-8 ${userResponse?.answer === 0 ? 'font-bold text-emerald-500' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Yes</span>
        <div className={`flex-1 h-4 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${yesPct}%` }} />
        </div>
        <span className={`text-xs w-8 text-right ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{yesPct}%</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs w-8 ${userResponse?.answer === 1 ? 'font-bold text-rose-500' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No</span>
        <div className={`flex-1 h-4 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${noPct}%` }} />
        </div>
        <span className={`text-xs w-8 text-right ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{noPct}%</span>
      </div>
    </div>
  );
};

// Generate fake community results
const generateCommunity = (questionId) => {
  const seed = questionId * 17;
  const count = 50 + (seed % 150);
  const evaluators = [];

  for (let i = 0; i < count; i++) {
    const answerSeed = (seed + i * 31) % 100;
    const confSeed = (seed + i * 41) % 100;
    evaluators.push({
      answer: answerSeed < 55 ? 0 : 1,
      confidence: 1 + Math.floor(confSeed / 25)
    });
  }

  return { evaluators };
};

// ==================== MAIN APP ====================
const AuraPlayerVH = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [screen, setScreen] = useState('home'); // home, question
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [evidenceExpanded, setEvidenceExpanded] = useState(false);

  // Answer state
  const [responses, setResponses] = useLocalStorage('aura-responses', {});
  const [tappedAnswer, setTappedAnswer] = useState(null);
  const [tapCount, setTapCount] = useState(0);

  // Undo state
  const [pendingSubmit, setPendingSubmit] = useState(null);
  const [undoTimeLeft, setUndoTimeLeft] = useState(0);
  const undoDelay = 2; // seconds
  const submitTimeoutRef = useRef(null);
  const tapTimeoutRef = useRef(null);

  // Settings
  const [requireConfirmation, setRequireConfirmation] = useState(false);

  // Get filtered questions
  const allQuestions = selectedCategory
    ? SAMPLE_QUESTIONS.filter(q => q.category === selectedCategory)
    : SAMPLE_QUESTIONS;

  const question = allQuestions[questionIndex];
  const isBinary = question?.type === 'binary';
  const options = question?.options || [];
  const allOptions = isBinary ? null : [...options, 'None of the above'];
  const existingResponse = question ? responses[question.id] : null;
  const existingCommunity = existingResponse ? generateCommunity(question.id) : null;

  // Stats
  const answeredCount = Object.keys(responses).length;

  // Swipe handlers
  const goNext = useCallback(() => {
    if (questionIndex < allQuestions.length - 1) {
      setQuestionIndex(i => i + 1);
      setEvidenceExpanded(false);
      setTappedAnswer(null);
      setTapCount(0);
    }
  }, [questionIndex, allQuestions.length]);

  const goPrev = useCallback(() => {
    if (questionIndex > 0) {
      setQuestionIndex(i => i - 1);
      setEvidenceExpanded(false);
      setTappedAnswer(null);
      setTapCount(0);
    }
  }, [questionIndex]);

  const { onTouchStart, onTouchMove, onTouchEnd, swipeOffset, isSwiping } = useSwipe(goNext, goPrev);

  // Undo countdown
  useEffect(() => {
    if (!pendingSubmit) {
      setUndoTimeLeft(0);
      return;
    }

    setUndoTimeLeft(undoDelay);
    const interval = setInterval(() => {
      setUndoTimeLeft(t => {
        if (t <= 0.1) {
          clearInterval(interval);
          return 0;
        }
        return t - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [pendingSubmit]);

  // Handle tap on answer
  const handleTap = (ans) => {
    if (existingResponse) return;

    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    let newTapCount;
    if (tappedAnswer === ans) {
      newTapCount = Math.min(tapCount + 1, 4);
      setTapCount(newTapCount);
    } else {
      newTapCount = 1;
      setTappedAnswer(ans);
      setTapCount(1);
    }

    // Auto-submit after delay
    if (!requireConfirmation) {
      tapTimeoutRef.current = setTimeout(() => {
        submitWithConfidence(ans, newTapCount);
      }, 500);
    }
  };

  // Submit answer
  const submitWithConfidence = (ans, conf) => {
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }

    const pending = {
      questionId: question.id,
      answer: ans,
      confidence: conf,
    };

    setTappedAnswer(null);
    setTapCount(0);
    setPendingSubmit(pending);

    submitTimeoutRef.current = setTimeout(() => {
      commitSubmit(pending);
    }, undoDelay * 1000);
  };

  // Commit after undo window
  const commitSubmit = (pending) => {
    if (!pending) return;

    const response = {
      answer: pending.answer,
      confidence: pending.confidence,
      timestamp: Date.now()
    };

    setResponses(prev => ({ ...prev, [pending.questionId]: response }));
    setPendingSubmit(null);

    // Auto-advance
    setTimeout(() => {
      if (questionIndex < allQuestions.length - 1) {
        setQuestionIndex(i => i + 1);
        setEvidenceExpanded(false);
      }
    }, 300);
  };

  // Cancel undo
  const cancelSubmit = () => {
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }
    if (pendingSubmit) {
      setTappedAnswer(pendingSubmit.answer);
      setTapCount(pendingSubmit.confidence);
    }
    setPendingSubmit(null);
  };

  // Reset demo
  const resetDemo = () => {
    setResponses({});
    setQuestionIndex(0);
    setScreen('home');
  };

  // ==================== RENDER ====================

  // Home screen
  if (screen === 'home') {
    return (
      <PhoneFrame darkMode={darkMode}>
        <div className={`flex-1 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ height: 'calc(100% - 54px - 20px)' }}>
          {/* Header */}
          <div className={`px-4 py-3 flex items-center justify-between border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌀</span>
              <span className="font-semibold text-lg">Aura</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Stats */}
          <div className={`px-4 py-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className={`text-center py-4 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <div className="text-3xl font-bold text-violet-500">{answeredCount}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>questions answered</div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 p-4 space-y-2">
            <div className={`text-xs font-medium uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Categories
            </div>

            {/* All questions */}
            <button
              onClick={() => { setSelectedCategory(null); setQuestionIndex(0); setScreen('question'); }}
              className={`w-full p-4 rounded-xl flex items-center gap-3 transition-colors ${
                darkMode ? 'bg-violet-900/30 hover:bg-violet-900/50' : 'bg-violet-100 hover:bg-violet-200'
              }`}
            >
              <span className="text-2xl">🎲</span>
              <div className="flex-1 text-left">
                <div className="font-medium">All Questions</div>
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  {SAMPLE_QUESTIONS.length} total · {SAMPLE_QUESTIONS.length - answeredCount} remaining
                </div>
              </div>
            </button>

            {CATEGORIES.map(cat => {
              const catQuestions = SAMPLE_QUESTIONS.filter(q => q.category === cat.id);
              const answered = catQuestions.filter(q => responses[q.id]).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setQuestionIndex(0); setScreen('question'); }}
                  className={`w-full p-4 rounded-xl flex items-center gap-3 transition-colors ${
                    darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{cat.name}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      {catQuestions.length} questions · {catQuestions.length - answered} remaining
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reset button */}
          <div className="p-4">
            <button
              onClick={resetDemo}
              className={`w-full py-2 rounded-lg text-sm ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Reset Demo
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Question screen
  if (screen === 'question' && question) {
    const categoryInfo = CATEGORIES.find(c => c.id === question.category);

    return (
      <PhoneFrame darkMode={darkMode}>
        <div
          className={`flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}
          style={{ height: 'calc(100% - 54px - 20px)' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Nav bar */}
          <div className={`h-11 flex-shrink-0 flex items-center gap-2 px-3 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <button onClick={() => setScreen('home')} className={darkMode ? 'text-gray-400' : 'text-gray-600'}>←</button>
            <span className="text-sm">{categoryInfo?.icon || '🎲'}</span>
            <span className={`text-xs flex-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {categoryInfo?.name || 'All'}
            </span>
            <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              {questionIndex + 1}/{allQuestions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className={`h-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <div
              className="h-full bg-violet-500 transition-all"
              style={{ width: `${((questionIndex + 1) / allQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question area (scrollable, takes remaining space above buttons) */}
          <div
            className={`flex-1 overflow-y-auto px-4 py-4 ${darkMode ? '' : 'bg-white'}`}
            style={{
              transform: isSwiping ? `translateX(${swipeOffset * 0.3}px)` : 'translateX(0)',
              opacity: isSwiping ? 1 - Math.abs(swipeOffset) / 300 : 1,
              transition: isSwiping ? 'none' : 'all 0.2s'
            }}
          >
            {/* Question text */}
            <h2 className={`text-lg font-medium leading-relaxed mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {question.text}
            </h2>

            {/* Evidence */}
            <EvidencePanel
              preEvidence={question.preEvidence}
              expanded={evidenceExpanded}
              onToggle={() => setEvidenceExpanded(!evidenceExpanded)}
              darkMode={darkMode}
            />

            {/* Answered state: show results */}
            {existingResponse && existingCommunity && (
              <div className={`mt-4 p-3 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`font-medium ${
                    isBinary
                      ? existingResponse.answer === 0 ? 'text-emerald-500' : 'text-rose-500'
                      : 'text-violet-500'
                  }`}>
                    {isBinary
                      ? (existingResponse.answer === 0 ? 'YES' : 'NO')
                      : allOptions[existingResponse.answer]
                    }
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    · {CONFIDENCE_LABELS[existingResponse.confidence]}
                  </span>
                </div>

                <div className={`text-xs mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Community ({existingCommunity.evaluators.length} responses)
                </div>

                {isBinary && (
                  <BinaryChart
                    evaluators={existingCommunity.evaluators}
                    userResponse={existingResponse}
                    darkMode={darkMode}
                  />
                )}
              </div>
            )}
          </div>

          {/* ANSWER BUTTONS - Fixed at bottom (thumb zone) */}
          {!existingResponse && !pendingSubmit && (
            <div className={`flex-shrink-0 p-4 border-t ${darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-white'}`}>
              {/* Binary buttons */}
              {isBinary && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {/* YES */}
                    <button
                      onClick={() => handleTap(0)}
                      className={`relative min-h-[72px] rounded-2xl font-bold text-xl transition-all overflow-hidden ${
                        tappedAnswer === 0
                          ? 'text-white ring-2 ring-emerald-400'
                          : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-emerald-50 text-emerald-600 border-2 border-emerald-200'
                      }`}
                      style={{
                        background: tappedAnswer === 0
                          ? `linear-gradient(135deg, ${tapCount >= 3 ? '#10b981' : '#059669'} 0%, ${tapCount >= 3 ? '#34d399' : '#10b981'} 100%)`
                          : undefined,
                        transform: tappedAnswer === 0 ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: tappedAnswer === 0 ? '0 4px 20px rgba(16,185,129,0.4)' : 'none'
                      }}
                    >
                      <ConfidenceSegments level={tapCount} color="emerald" active={tappedAnswer === 0} />
                      <span className="relative z-10">YES</span>
                      {tappedAnswer === 0 && tapCount > 0 && (
                        <span className="absolute top-2 right-2 text-sm font-bold bg-white/30 w-7 h-7 rounded-full flex items-center justify-center">
                          {tapCount}
                        </span>
                      )}
                    </button>

                    {/* NO */}
                    <button
                      onClick={() => handleTap(1)}
                      className={`relative min-h-[72px] rounded-2xl font-bold text-xl transition-all overflow-hidden ${
                        tappedAnswer === 1
                          ? 'text-white ring-2 ring-rose-400'
                          : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-rose-50 text-rose-600 border-2 border-rose-200'
                      }`}
                      style={{
                        background: tappedAnswer === 1
                          ? `linear-gradient(135deg, ${tapCount >= 3 ? '#f43f5e' : '#e11d48'} 0%, ${tapCount >= 3 ? '#fb7185' : '#f43f5e'} 100%)`
                          : undefined,
                        transform: tappedAnswer === 1 ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: tappedAnswer === 1 ? '0 4px 20px rgba(244,63,94,0.4)' : 'none'
                      }}
                    >
                      <ConfidenceSegments level={tapCount} color="rose" active={tappedAnswer === 1} />
                      <span className="relative z-10">NO</span>
                      {tappedAnswer === 1 && tapCount > 0 && (
                        <span className="absolute top-2 right-2 text-sm font-bold bg-white/30 w-7 h-7 rounded-full flex items-center justify-center">
                          {tapCount}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Confidence hint */}
                  <div className={`text-center text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                    {tappedAnswer !== null
                      ? `${CONFIDENCE_LABELS[tapCount]} · ${tapCount < 4 ? 'tap again +' : 'max'}`
                      : 'Tap to answer · Tap again to increase confidence'
                    }
                  </div>
                </div>
              )}

              {/* Multiple choice buttons */}
              {!isBinary && (
                <div className="space-y-2">
                  {allOptions.map((opt, i) => {
                    const isNone = i === allOptions.length - 1;
                    const isSelected = tappedAnswer === i;
                    const optColor = MC_COLORS[i % MC_COLORS.length];

                    if (isNone) {
                      return (
                        <button
                          key={i}
                          onClick={() => handleTap(i)}
                          className={`w-full min-h-[48px] py-3 px-4 rounded-xl text-left text-sm ${
                            darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          None of the above
                        </button>
                      );
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleTap(i)}
                        className={`w-full min-h-[52px] py-3 px-4 rounded-xl text-left text-sm transition-all relative overflow-hidden ${
                          isSelected
                            ? 'text-white ring-2'
                            : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700 border border-gray-200'
                        }`}
                        style={{
                          background: isSelected ? optColor.hex : undefined,
                          ringColor: isSelected ? optColor.hex : undefined,
                          transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                          boxShadow: isSelected ? `0 4px 15px ${optColor.hex}60` : 'none'
                        }}
                      >
                        <ConfidenceSegments level={tapCount} color={optColor.tailwind} active={isSelected} />
                        <span className="relative z-10">
                          <span className={`mr-2 ${isSelected ? 'text-white/70' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </span>
                        {isSelected && tapCount > 0 && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold bg-white/30 w-6 h-6 rounded-full flex items-center justify-center">
                            {tapCount}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {/* Confidence hint */}
                  <div className={`text-center text-xs pt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                    {tappedAnswer !== null
                      ? `${CONFIDENCE_LABELS[tapCount]} · ${tapCount < 4 ? 'tap again +' : 'max'}`
                      : 'Tap to answer'
                    }
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons when answered */}
          {existingResponse && (
            <div className={`flex-shrink-0 p-4 border-t ${darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-white'}`}>
              <div className="flex gap-3">
                <button
                  onClick={goPrev}
                  disabled={questionIndex === 0}
                  className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                    questionIndex === 0
                      ? darkMode ? 'bg-gray-800/50 text-gray-700' : 'bg-gray-100 text-gray-300'
                      : darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  ← Prev
                </button>
                <button
                  onClick={goNext}
                  disabled={questionIndex >= allQuestions.length - 1}
                  className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                    questionIndex >= allQuestions.length - 1
                      ? darkMode ? 'bg-gray-800/50 text-gray-700' : 'bg-gray-100 text-gray-300'
                      : 'bg-violet-600 text-white hover:bg-violet-500'
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Slide-up Undo Bar */}
          <UndoBar
            visible={!!pendingSubmit}
            answer={pendingSubmit?.answer}
            confidence={pendingSubmit?.confidence}
            timeLeft={undoTimeLeft}
            totalTime={undoDelay}
            onUndo={cancelSubmit}
            isBinary={isBinary}
            options={allOptions}
            darkMode={darkMode}
          />
        </div>
      </PhoneFrame>
    );
  }

  return null;
};

export default AuraPlayerVH;
