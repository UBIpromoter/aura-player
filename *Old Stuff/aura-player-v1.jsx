import React, { useState, useEffect, useRef } from 'react';

// ============ DATA ============

const CATEGORIES = [
  { id: 'prediction', name: 'Predictions', icon: '🔮', description: 'Future events', color: 'violet' },
  { id: 'philosophy', name: 'Philosophy', icon: '🤔', description: 'Big questions', color: 'cyan' },
  { id: 'debate', name: 'Debates', icon: '⚔️', description: 'Contested topics', color: 'rose' },
  { id: 'opinion', name: 'Opinions', icon: '💭', description: 'Preferences', color: 'amber' },
  { id: 'evaluation', name: 'Evaluation', icon: '📋', description: 'Judge quality', color: 'emerald' },
  { id: 'logic', name: 'Logic', icon: '🧩', description: 'Reasoning', color: 'blue' },
];

const CONFIDENCE_LABELS = { 1: "Uncertain", 2: "Leaning", 3: "Confident", 4: "Certain" };

const COLOR_MAP = {
  violet: { bg: 'bg-violet-500', light: 'bg-violet-900/30', text: 'text-violet-400', hex: '#8b5cf6' },
  cyan: { bg: 'bg-cyan-500', light: 'bg-cyan-900/30', text: 'text-cyan-400', hex: '#06b6d4' },
  rose: { bg: 'bg-rose-500', light: 'bg-rose-900/30', text: 'text-rose-400', hex: '#f43f5e' },
  amber: { bg: 'bg-amber-500', light: 'bg-amber-900/30', text: 'text-amber-400', hex: '#f59e0b' },
  emerald: { bg: 'bg-emerald-500', light: 'bg-emerald-900/30', text: 'text-emerald-400', hex: '#10b981' },
  blue: { bg: 'bg-blue-500', light: 'bg-blue-900/30', text: 'text-blue-400', hex: '#3b82f6' },
};

// Sample questions (subset for demo - full 440 in production)
const QUESTIONS = [
  // Predictions
  { id: 1, type: 'binary', text: "Will Bitcoin exceed $150,000 before July 2026?", category: "prediction", preEvidence: [{ type: 'stat', label: 'Current', value: '$97,234' }] },
  { id: 2, type: 'binary', text: "Will GPT-5 be released before September 2026?", category: "prediction" },
  { id: 3, type: 'multiple', text: "What will be the dominant AI interface by 2030?", category: "prediction", options: ["Text chat", "Voice assistants", "AR/VR agents", "Brain-computer interfaces"] },
  { id: 4, type: 'binary', text: "Will humans land on Mars before 2035?", category: "prediction", preEvidence: [{ type: 'stat', label: 'SpaceX target', value: '2029' }] },
  { id: 5, type: 'multiple', text: "Which company will dominate AI by 2030?", category: "prediction", options: ["OpenAI", "Google/DeepMind", "Anthropic", "Meta", "Unknown startup"] },
  { id: 6, type: 'binary', text: "Will electric vehicles exceed 50% of US new car sales by 2030?", category: "prediction" },
  { id: 7, type: 'binary', text: "Will AGI exist by 2035?", category: "prediction" },
  { id: 8, type: 'multiple', text: "What will replace smartphones?", category: "prediction", options: ["AR glasses", "Neural interfaces", "Smart watches", "Nothing - phones evolve"] },

  // Philosophy
  { id: 10, type: 'binary', text: "Is free will an illusion?", category: "philosophy" },
  { id: 11, type: 'multiple', text: "What gives life meaning?", category: "philosophy", options: ["Relationships", "Achievement", "Pleasure", "Purpose", "Nothing inherent"] },
  { id: 12, type: 'binary', text: "Is mathematics discovered or invented?", category: "philosophy" },
  { id: 13, type: 'binary', text: "Can machines truly understand?", category: "philosophy" },
  { id: 14, type: 'multiple', text: "What is consciousness?", category: "philosophy", options: ["Brain processes", "Emergent property", "Fundamental force", "Illusion"] },
  { id: 15, type: 'binary', text: "Is privacy a fundamental right?", category: "philosophy" },
  { id: 16, type: 'binary', text: "Would you take a pill that makes you happy but delusional?", category: "philosophy" },
  { id: 17, type: 'multiple', text: "If you could live forever, would you?", category: "philosophy", options: ["Yes, unconditionally", "Yes, with exit option", "Only if others could too", "No"] },

  // Debates
  { id: 20, type: 'binary', text: "Should billionaires exist?", category: "debate" },
  { id: 21, type: 'binary', text: "Should college be free?", category: "debate" },
  { id: 22, type: 'multiple', text: "How should AI be regulated?", category: "debate", options: ["Strict government control", "Industry self-regulation", "International treaty", "Minimal regulation"] },
  { id: 23, type: 'binary', text: "Is universal basic income a good idea?", category: "debate" },
  { id: 24, type: 'binary', text: "Should voting be mandatory?", category: "debate" },
  { id: 25, type: 'multiple', text: "What's the right climate approach?", category: "debate", options: ["Carbon tax", "Regulations", "Green subsidies", "Nuclear expansion"] },
  { id: 26, type: 'binary', text: "Should assisted suicide be legal?", category: "debate" },
  { id: 27, type: 'binary', text: "Should hate speech be illegal?", category: "debate" },

  // Opinions
  { id: 30, type: 'binary', text: "Is working from home better than office?", category: "opinion" },
  { id: 31, type: 'multiple', text: "What's the best coffee preparation?", category: "opinion", options: ["Espresso", "Pour over", "French press", "Drip", "Cold brew"] },
  { id: 32, type: 'binary', text: "Is a college degree still worth it?", category: "opinion" },
  { id: 33, type: 'multiple', text: "What's more important in a job?", category: "opinion", options: ["Salary", "Work-life balance", "Interesting work", "Good colleagues"] },
  { id: 34, type: 'binary', text: "Is social media net negative for society?",  category: "opinion" },
  { id: 35, type: 'multiple', text: "What's the ideal vacation length?", category: "opinion", options: ["Long weekend", "One week", "Two weeks", "One month+"] },
  { id: 36, type: 'binary', text: "Is tipping culture a good thing?", category: "opinion" },
  { id: 37, type: 'binary', text: "Are video games a waste of time?", category: "opinion" },

  // Evaluation
  { id: 40, type: 'binary', text: "Is this headline misleading? 'Coffee drinkers live longer'", category: "evaluation", preEvidence: [{ type: 'note', text: 'Correlation study, no lifestyle controls' }] },
  { id: 41, type: 'multiple', text: "Rate this: 'Uber for dog walking'", category: "evaluation", options: ["Strong idea", "Competitive space", "Already exists", "Need more info"] },
  { id: 42, type: 'binary', text: "Is '90% of startups fail' meaningful?", category: "evaluation" },
  { id: 43, type: 'binary', text: "Is this valid? 'Most CEOs are tall, so height helps success'", category: "evaluation" },
  { id: 44, type: 'multiple', text: "Rate: Survey of 100 Twitter users about public opinion", category: "evaluation", options: ["Strong", "Acceptable", "Weak", "Flawed"] },
  { id: 45, type: 'binary', text: "Is 'I'm sorry you feel that way' a genuine apology?", category: "evaluation" },
  { id: 46, type: 'binary', text: "Is this a scam? 'Urgent: Verify your account or lose access'", category: "evaluation" },
  { id: 47, type: 'binary', text: "Is Wikipedia with 50 citations reliable?", category: "evaluation" },

  // Logic
  { id: 50, type: 'binary', text: "Is 847 + 256 greater than 1100?", category: "logic" },
  { id: 51, type: 'multiple', text: "What comes next: 2, 4, 8, 16, __?", category: "logic", options: ["24", "32", "20", "18"] },
  { id: 52, type: 'binary', text: "Is 17 a prime number?", category: "logic" },
  { id: 53, type: 'multiple', text: "What is √144?", category: "logic", options: ["10", "11", "12", "14"] },
  { id: 54, type: 'binary', text: "Is Australia larger than Europe?", category: "logic" },
  { id: 55, type: 'binary', text: "Is a tomato a fruit?", category: "logic" },
  { id: 56, type: 'multiple', text: "How many planets in our solar system?", category: "logic", options: ["7", "8", "9", "10"] },
  { id: 57, type: 'binary', text: "Can sound travel through a vacuum?", category: "logic" },
];

// QOTD Pool
const QOTD_POOL = [
  { text: 'Should AI systems identify themselves when interacting with humans?', sponsor: { name: 'AI Safety Institute', avatar: '🏛️' }, distribution: { yes: [142, 287, 412, 389], no: [98, 156, 201, 162] } },
  { text: 'Is universal basic income inevitable as automation increases?', sponsor: { name: 'Future of Work', avatar: '🤖' }, distribution: { yes: [198, 312, 287, 245], no: [156, 234, 189, 167] } },
  { text: 'Will humans establish a permanent Mars colony by 2050?', sponsor: { name: 'Space Society', avatar: '🚀' }, distribution: { yes: [123, 198, 234, 167], no: [234, 312, 289, 256] } },
  { text: 'Should gene editing for disease prevention be allowed?', sponsor: { name: 'Bioethics Council', avatar: '🧬' }, distribution: { yes: [212, 334, 378, 312], no: [98, 156, 178, 145] } },
  { text: 'Will AGI be achieved by 2035?', sponsor: { name: 'AI Research', avatar: '🧠' }, distribution: { yes: [145, 212, 234, 189], no: [178, 267, 289, 245] } },
];

// ============ UTILITY ============

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const generateDistribution = () => {
  const yes = [1, 2, 3, 4].map(() => Math.floor(Math.random() * 400) + 50);
  const no = [1, 2, 3, 4].map(() => Math.floor(Math.random() * 400) + 50);
  return { yes, no };
};

const generateMCDistribution = (optionCount) => {
  return Array(optionCount).fill(0).map(() =>
    [1, 2, 3, 4].map(() => Math.floor(Math.random() * 200) + 20)
  );
};

// ============ COMPONENTS ============

// Confidence bar indicator
const ConfidenceBar = ({ level, color = 'violet', active = true }) => {
  const shades = ['opacity-30', 'opacity-50', 'opacity-70', 'opacity-100'];
  return (
    <div className="flex gap-0.5 h-1.5 mt-2">
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className={`flex-1 rounded-full transition-all duration-150 ${
            active && level >= i ? `${COLOR_MAP[color].bg} ${shades[i-1]}` : 'bg-gray-700'
          }`}
        />
      ))}
    </div>
  );
};

// Distribution bar for results
const DistributionBar = ({ distribution, userAnswer, userConfidence, type = 'binary', options = [] }) => {
  if (type === 'binary') {
    const yesTotal = distribution.yes.reduce((a, b) => a + b, 0);
    const noTotal = distribution.no.reduce((a, b) => a + b, 0);
    const total = yesTotal + noTotal;
    const yesPct = Math.round((yesTotal / total) * 100);
    const noPct = 100 - yesPct;

    return (
      <div className="space-y-3">
        {/* Yes bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className={`${userAnswer === 0 ? 'text-emerald-400 font-medium' : 'text-gray-400'}`}>
              Yes {userAnswer === 0 && '•'}
            </span>
            <span className="text-gray-500">{yesPct}%</span>
          </div>
          <div className={`h-8 bg-gray-800 rounded-lg overflow-hidden ${userAnswer === 0 ? 'ring-2 ring-emerald-500/50' : ''}`}>
            <div className="h-full flex" style={{ width: `${yesPct}%` }}>
              {distribution.yes.map((count, i) => {
                const segPct = yesTotal > 0 ? (count / yesTotal) * 100 : 0;
                return <div key={i} className="h-full bg-emerald-500" style={{ width: `${segPct}%`, opacity: 0.4 + (i * 0.2) }} />;
              })}
            </div>
          </div>
        </div>
        {/* No bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className={`${userAnswer === 1 ? 'text-rose-400 font-medium' : 'text-gray-400'}`}>
              No {userAnswer === 1 && '•'}
            </span>
            <span className="text-gray-500">{noPct}%</span>
          </div>
          <div className={`h-8 bg-gray-800 rounded-lg overflow-hidden ${userAnswer === 1 ? 'ring-2 ring-rose-500/50' : ''}`}>
            <div className="h-full flex" style={{ width: `${noPct}%` }}>
              {distribution.no.map((count, i) => {
                const segPct = noTotal > 0 ? (count / noTotal) * 100 : 0;
                return <div key={i} className="h-full bg-rose-500" style={{ width: `${segPct}%`, opacity: 0.4 + (i * 0.2) }} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Multiple choice
  const totals = distribution.map(d => d.reduce((a, b) => a + b, 0));
  const maxTotal = Math.max(...totals);

  return (
    <div className="space-y-2">
      {options.map((opt, idx) => {
        const total = totals[idx];
        const pct = maxTotal > 0 ? Math.round((total / totals.reduce((a, b) => a + b, 0)) * 100) : 0;
        const barWidth = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
        const isUser = userAnswer === idx;

        return (
          <div key={idx}>
            <div className="flex justify-between text-xs mb-1">
              <span className={`truncate flex-1 mr-2 ${isUser ? 'text-violet-400 font-medium' : 'text-gray-400'}`}>
                {opt} {isUser && '•'}
              </span>
              <span className="text-gray-500">{pct}%</span>
            </div>
            <div className={`h-6 bg-gray-800 rounded overflow-hidden ${isUser ? 'ring-2 ring-violet-500/50' : ''}`}>
              <div className="h-full flex" style={{ width: `${barWidth}%` }}>
                {distribution[idx].map((count, i) => {
                  const segPct = total > 0 ? (count / total) * 100 : 0;
                  return <div key={i} className="h-full bg-violet-500" style={{ width: `${segPct}%`, opacity: 0.4 + (i * 0.2) }} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Answer button with hold-to-confirm
const AnswerButton = ({ label, color, onSubmit, disabled, isHolding, holdProgress, tapCount }) => {
  const bgColor = color === 'emerald' ? 'bg-emerald-600' : color === 'rose' ? 'bg-rose-600' : 'bg-violet-600';
  const holdColor = color === 'emerald' ? 'bg-emerald-400' : color === 'rose' ? 'bg-rose-400' : 'bg-violet-400';

  return (
    <button
      disabled={disabled}
      className={`relative flex-1 py-4 rounded-xl font-medium text-white transition-all overflow-hidden
        ${disabled ? 'opacity-50' : 'active:scale-[0.98]'} ${bgColor}`}
    >
      {/* Hold progress fill */}
      {isHolding && (
        <div
          className={`absolute inset-0 ${holdColor} transition-all`}
          style={{ width: `${holdProgress * 100}%` }}
        />
      )}

      {/* Tap count indicator */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        <span>{label}</span>
        {tapCount > 0 && (
          <span className="flex gap-0.5">
            {[1, 2, 3, 4].map(i => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${tapCount >= i ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </span>
        )}
      </div>
    </button>
  );
};

// MC Option button
const MCOption = ({ label, index, onSubmit, disabled, isHolding, holdProgress, tapCount, isSelected }) => {
  return (
    <button
      disabled={disabled}
      className={`relative w-full py-3 px-4 rounded-xl text-left transition-all overflow-hidden
        ${disabled ? 'opacity-50' : 'active:scale-[0.99]'}
        ${isSelected ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-200'}`}
    >
      {isHolding && (
        <div className="absolute inset-0 bg-violet-400 transition-all" style={{ width: `${holdProgress * 100}%` }} />
      )}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-sm">{label}</span>
        {tapCount > 0 && isSelected && (
          <span className="flex gap-0.5">
            {[1, 2, 3, 4].map(i => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${tapCount >= i ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </span>
        )}
      </div>
    </button>
  );
};

// Question card
const QuestionCard = ({ question, onAnswer, response, distribution, category }) => {
  const [tapCount, setTapCount] = useState(0);
  const [tappedAnswer, setTappedAnswer] = useState(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const [holdingAnswer, setHoldingAnswer] = useState(null);
  const [pendingSubmit, setPendingSubmit] = useState(null);

  const holdStartRef = useRef(null);
  const holdIntervalRef = useRef(null);
  const tapTimeoutRef = useRef(null);
  const submitTimeoutRef = useRef(null);

  const catInfo = CATEGORIES.find(c => c.id === question.category) || CATEGORIES[0];
  const colorKey = catInfo.color;

  // Reset state when question changes
  useEffect(() => {
    setTapCount(0);
    setTappedAnswer(null);
    setHoldProgress(0);
    setHoldingAnswer(null);
    setPendingSubmit(null);
  }, [question.id]);

  const handleTouchStart = (answer) => {
    if (response) return;

    clearTimeout(tapTimeoutRef.current);

    holdStartRef.current = Date.now();
    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartRef.current;
      if (elapsed > 150) {
        setHoldingAnswer(answer);
        setHoldProgress(Math.min((elapsed - 150) / 1200, 1));
      }
    }, 16);

    if (tappedAnswer === answer && tapCount < 4) {
      setTapCount(prev => prev + 1);
    } else {
      setTappedAnswer(answer);
      setTapCount(1);
    }
  };

  const handleTouchEnd = (answer) => {
    if (response) return;

    clearInterval(holdIntervalRef.current);

    const wasHolding = holdingAnswer !== null && holdProgress > 0.1;
    const holdConf = Math.min(4, Math.floor(holdProgress * 4) + 1);

    if (wasHolding) {
      setHoldingAnswer(null);
      setHoldProgress(0);
      submitWithConfidence(answer, holdConf);
    } else {
      tapTimeoutRef.current = setTimeout(() => {
        if (tapCount > 0 && tappedAnswer === answer) {
          submitWithConfidence(answer, tapCount);
        }
      }, 400);
    }
  };

  const handleTouchCancel = () => {
    clearInterval(holdIntervalRef.current);
    setHoldingAnswer(null);
    setHoldProgress(0);
  };

  const submitWithConfidence = (answer, confidence) => {
    clearTimeout(submitTimeoutRef.current);
    setPendingSubmit({ answer, confidence });

    submitTimeoutRef.current = setTimeout(() => {
      onAnswer(answer, confidence);
      setPendingSubmit(null);
      setTappedAnswer(null);
      setTapCount(0);
    }, 800);
  };

  const cancelSubmit = () => {
    clearTimeout(submitTimeoutRef.current);
    setPendingSubmit(null);
    setTappedAnswer(null);
    setTapCount(0);
  };

  const isBinary = question.type === 'binary';
  const options = isBinary ? ['Yes', 'No'] : question.options;

  return (
    <div className="flex flex-col h-full">
      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${COLOR_MAP[colorKey].light} ${COLOR_MAP[colorKey].text}`}>
          {catInfo.icon} {catInfo.name}
        </span>
        <span className="text-xs text-gray-500">#{question.id}</span>
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold text-white mb-4 leading-relaxed">
        {question.text}
      </h2>

      {/* Evidence */}
      {question.preEvidence && (
        <div className="mb-4 space-y-1">
          {question.preEvidence.map((ev, i) => (
            <div key={i} className="flex justify-between text-xs px-3 py-2 bg-gray-800/50 rounded-lg">
              {ev.type === 'stat' && <><span className="text-gray-500">{ev.label}</span><span className="text-white">{ev.value}</span></>}
              {ev.type === 'note' && <span className="text-gray-400">💡 {ev.text}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Pending submit overlay */}
      {pendingSubmit && (
        <div className="mb-4 p-3 bg-gray-800 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-sm text-white">
              {isBinary ? (pendingSubmit.answer === 0 ? 'Yes' : 'No') : options[pendingSubmit.answer]}
            </div>
            <div className="text-xs text-gray-400">{CONFIDENCE_LABELS[pendingSubmit.confidence]}</div>
          </div>
          <button onClick={cancelSubmit} className="px-3 py-1 text-sm text-rose-400 bg-rose-900/30 rounded-lg">
            Undo
          </button>
        </div>
      )}

      {/* Results */}
      {response && distribution && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2 flex justify-between">
            <span>Community Results</span>
            <span>Your answer: {CONFIDENCE_LABELS[response.confidence]}</span>
          </div>
          <DistributionBar
            distribution={distribution}
            userAnswer={response.answer}
            userConfidence={response.confidence}
            type={question.type}
            options={options}
          />
        </div>
      )}

      {/* Answer buttons */}
      {!response && !pendingSubmit && (
        <div className={`${isBinary ? 'flex gap-3' : 'space-y-2'}`}>
          {isBinary ? (
            <>
              <div
                className="flex-1"
                onTouchStart={() => handleTouchStart(0)}
                onTouchEnd={() => handleTouchEnd(0)}
                onTouchCancel={handleTouchCancel}
                onMouseDown={() => handleTouchStart(0)}
                onMouseUp={() => handleTouchEnd(0)}
                onMouseLeave={handleTouchCancel}
              >
                <AnswerButton
                  label="Yes"
                  color="emerald"
                  isHolding={holdingAnswer === 0}
                  holdProgress={holdingAnswer === 0 ? holdProgress : 0}
                  tapCount={tappedAnswer === 0 ? tapCount : 0}
                />
              </div>
              <div
                className="flex-1"
                onTouchStart={() => handleTouchStart(1)}
                onTouchEnd={() => handleTouchEnd(1)}
                onTouchCancel={handleTouchCancel}
                onMouseDown={() => handleTouchStart(1)}
                onMouseUp={() => handleTouchEnd(1)}
                onMouseLeave={handleTouchCancel}
              >
                <AnswerButton
                  label="No"
                  color="rose"
                  isHolding={holdingAnswer === 1}
                  holdProgress={holdingAnswer === 1 ? holdProgress : 0}
                  tapCount={tappedAnswer === 1 ? tapCount : 0}
                />
              </div>
            </>
          ) : (
            options.map((opt, idx) => (
              <div
                key={idx}
                onTouchStart={() => handleTouchStart(idx)}
                onTouchEnd={() => handleTouchEnd(idx)}
                onTouchCancel={handleTouchCancel}
                onMouseDown={() => handleTouchStart(idx)}
                onMouseUp={() => handleTouchEnd(idx)}
                onMouseLeave={handleTouchCancel}
              >
                <MCOption
                  label={opt}
                  index={idx}
                  isHolding={holdingAnswer === idx}
                  holdProgress={holdingAnswer === idx ? holdProgress : 0}
                  tapCount={tappedAnswer === idx ? tapCount : 0}
                  isSelected={tappedAnswer === idx}
                />
              </div>
            ))
          )}
        </div>
      )}

      {/* Hint */}
      {!response && !pendingSubmit && (
        <p className="text-center text-xs text-gray-600 mt-3">
          Tap = uncertain • Multi-tap or hold = more confident
        </p>
      )}
    </div>
  );
};

// QOTD Card
const QOTDCard = ({ qotd, response, onAnswer, onDismiss }) => {
  const [tapCount, setTapCount] = useState(0);
  const [tappedAnswer, setTappedAnswer] = useState(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const [holdingAnswer, setHoldingAnswer] = useState(null);

  const holdStartRef = useRef(null);
  const holdIntervalRef = useRef(null);
  const tapTimeoutRef = useRef(null);

  const yesTotal = qotd.distribution.yes.reduce((a, b) => a + b, 0);
  const noTotal = qotd.distribution.no.reduce((a, b) => a + b, 0);
  const total = yesTotal + noTotal;

  const handleTouchStart = (answer) => {
    if (response) return;
    clearTimeout(tapTimeoutRef.current);

    holdStartRef.current = Date.now();
    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartRef.current;
      if (elapsed > 150) {
        setHoldingAnswer(answer);
        setHoldProgress(Math.min((elapsed - 150) / 1200, 1));
      }
    }, 16);

    if (tappedAnswer === answer && tapCount < 4) {
      setTapCount(prev => prev + 1);
    } else {
      setTappedAnswer(answer);
      setTapCount(1);
    }
  };

  const handleTouchEnd = (answer) => {
    if (response) return;
    clearInterval(holdIntervalRef.current);

    const wasHolding = holdingAnswer !== null && holdProgress > 0.1;
    const holdConf = Math.min(4, Math.floor(holdProgress * 4) + 1);

    if (wasHolding) {
      setHoldingAnswer(null);
      setHoldProgress(0);
      onAnswer(answer, holdConf);
    } else {
      tapTimeoutRef.current = setTimeout(() => {
        if (tapCount > 0 && tappedAnswer === answer) {
          onAnswer(answer, tapCount);
        }
      }, 400);
    }
  };

  const handleTouchCancel = () => {
    clearInterval(holdIntervalRef.current);
    setHoldingAnswer(null);
    setHoldProgress(0);
  };

  return (
    <div className="bg-gradient-to-br from-violet-900/50 to-purple-900/50 rounded-2xl p-4 border border-violet-500/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{qotd.sponsor.avatar}</span>
          <div>
            <div className="text-xs text-violet-300">Question of the Day</div>
            <div className="text-xs text-gray-500">{qotd.sponsor.name}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-violet-400">+{qotd.reward} pts</div>
          <div className="text-xs text-gray-500">{total.toLocaleString()} votes</div>
        </div>
      </div>

      {/* Question */}
      <p className="text-white font-medium mb-4">{qotd.text}</p>

      {/* Results or Buttons */}
      {response ? (
        <div className="space-y-2">
          <DistributionBar
            distribution={qotd.distribution}
            userAnswer={response.answer}
            userConfidence={response.confidence}
            type="binary"
          />
          <button onClick={onDismiss} className="w-full py-2 text-sm text-gray-400">
            Continue →
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <div
            className="flex-1"
            onTouchStart={() => handleTouchStart(0)}
            onTouchEnd={() => handleTouchEnd(0)}
            onTouchCancel={handleTouchCancel}
            onMouseDown={() => handleTouchStart(0)}
            onMouseUp={() => handleTouchEnd(0)}
            onMouseLeave={handleTouchCancel}
          >
            <AnswerButton
              label="Yes"
              color="emerald"
              isHolding={holdingAnswer === 0}
              holdProgress={holdingAnswer === 0 ? holdProgress : 0}
              tapCount={tappedAnswer === 0 ? tapCount : 0}
            />
          </div>
          <div
            className="flex-1"
            onTouchStart={() => handleTouchStart(1)}
            onTouchEnd={() => handleTouchEnd(1)}
            onTouchCancel={handleTouchCancel}
            onMouseDown={() => handleTouchStart(1)}
            onMouseUp={() => handleTouchEnd(1)}
            onMouseLeave={handleTouchCancel}
          >
            <AnswerButton
              label="No"
              color="rose"
              isHolding={holdingAnswer === 1}
              holdProgress={holdingAnswer === 1 ? holdProgress : 0}
              tapCount={tappedAnswer === 1 ? tapCount : 0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Stats bar
const StatsBar = ({ answered, streak, points }) => (
  <div className="flex justify-around py-3 bg-gray-900/50 rounded-xl mb-4">
    <div className="text-center">
      <div className="text-xl font-bold text-white">{answered}</div>
      <div className="text-xs text-gray-500">Answered</div>
    </div>
    <div className="text-center">
      <div className="text-xl font-bold text-amber-400">{streak}🔥</div>
      <div className="text-xs text-gray-500">Streak</div>
    </div>
    <div className="text-center">
      <div className="text-xl font-bold text-violet-400">{points}</div>
      <div className="text-xs text-gray-500">Points</div>
    </div>
  </div>
);

// ============ MAIN APP ============

export default function AuraPlayer() {
  const [screen, setScreen] = useState('home'); // home, category, play
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [distributions, setDistributions] = useState({});
  const [qotd, setQotd] = useState(null);
  const [qotdResponse, setQotdResponse] = useState(null);
  const [qotdDismissed, setQotdDismissed] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Initialize
  useEffect(() => {
    // Random QOTD
    const q = QOTD_POOL[Math.floor(Math.random() * QOTD_POOL.length)];
    setQotd({ ...q, reward: 25 });

    // Shuffle questions
    setShuffledQuestions(shuffle(QUESTIONS));
  }, []);

  // Stats
  const answeredCount = Object.keys(responses).length + (qotdResponse ? 1 : 0);
  const streak = Math.min(answeredCount, 7); // Simple streak for demo
  const points = answeredCount * 10 + (qotdResponse ? 25 : 0);

  // Get filtered questions for category
  const getQuestionsForCategory = (catId) => {
    return shuffledQuestions.filter(q => q.category === catId && !responses[q.id]);
  };

  const currentQuestions = selectedCategory ? getQuestionsForCategory(selectedCategory) : [];
  const currentQuestion = currentQuestions[questionIndex];

  // Handle answer
  const handleAnswer = (questionId, answer, confidence) => {
    const question = QUESTIONS.find(q => q.id === questionId);

    // Generate mock distribution
    let dist;
    if (question.type === 'binary') {
      dist = generateDistribution();
    } else {
      dist = generateMCDistribution(question.options.length);
    }

    setDistributions(prev => ({ ...prev, [questionId]: dist }));
    setResponses(prev => ({ ...prev, [questionId]: { answer, confidence } }));
  };

  // Handle QOTD answer
  const handleQotdAnswer = (answer, confidence) => {
    setQotdResponse({ answer, confidence });
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (questionIndex < currentQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // No more questions in category
      setScreen('home');
      setSelectedCategory(null);
      setQuestionIndex(0);
    }
  };

  // Select category
  const selectCategory = (catId) => {
    setSelectedCategory(catId);
    setQuestionIndex(0);
    setScreen('play');
  };

  // ============ SCREENS ============

  // Home screen
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌀</span>
            <span className="text-xl font-bold">Aura</span>
          </div>
          <button className="p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <StatsBar answered={answeredCount} streak={streak} points={points} />

        {/* QOTD */}
        {qotd && !qotdDismissed && (
          <div className="mb-6">
            <QOTDCard
              qotd={qotd}
              response={qotdResponse}
              onAnswer={handleQotdAnswer}
              onDismiss={() => setQotdDismissed(true)}
            />
          </div>
        )}

        {/* Categories */}
        <h3 className="text-sm font-medium text-gray-400 mb-3">Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(cat => {
            const remaining = getQuestionsForCategory(cat.id).length;
            const colorClasses = COLOR_MAP[cat.color];

            return (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                disabled={remaining === 0}
                className={`p-4 rounded-xl text-left transition-all ${colorClasses.light} ${remaining === 0 ? 'opacity-40' : 'active:scale-[0.98]'}`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className={`font-medium mt-1 ${colorClasses.text}`}>{cat.name}</div>
                <div className="text-xs text-gray-500">{remaining} remaining</div>
              </button>
            );
          })}
        </div>

        {/* Random play button */}
        <button
          onClick={() => {
            const allRemaining = shuffledQuestions.filter(q => !responses[q.id]);
            if (allRemaining.length > 0) {
              setShuffledQuestions(shuffle(allRemaining));
              setSelectedCategory('random');
              setQuestionIndex(0);
              setScreen('play');
            }
          }}
          className="w-full mt-4 py-3 bg-violet-600 rounded-xl font-medium active:scale-[0.99]"
        >
          🎲 Random Questions
        </button>
      </div>
    );
  }

  // Play screen
  if (screen === 'play') {
    const questions = selectedCategory === 'random'
      ? shuffledQuestions.filter(q => !responses[q.id])
      : currentQuestions;
    const question = questions[questionIndex];

    if (!question) {
      return (
        <div className="min-h-screen bg-gray-950 text-white p-4 flex flex-col items-center justify-center">
          <span className="text-4xl mb-4">🎉</span>
          <h2 className="text-xl font-bold mb-2">All done!</h2>
          <p className="text-gray-400 mb-6">No more questions in this category</p>
          <button
            onClick={() => { setScreen('home'); setSelectedCategory(null); }}
            className="px-6 py-3 bg-violet-600 rounded-xl"
          >
            Back to Home
          </button>
        </div>
      );
    }

    const response = responses[question.id];
    const distribution = distributions[question.id];

    return (
      <div className="min-h-screen bg-gray-950 text-white p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => { setScreen('home'); setSelectedCategory(null); }} className="p-2 -ml-2 text-gray-400">
            ← Back
          </button>
          <span className="text-sm text-gray-500">
            {questionIndex + 1} / {questions.length}
          </span>
          <button className="p-2 text-gray-400">⋯</button>
        </div>

        {/* Question card */}
        <div className="flex-1 flex flex-col">
          <QuestionCard
            question={question}
            response={response}
            distribution={distribution}
            onAnswer={(answer, confidence) => handleAnswer(question.id, answer, confidence)}
          />
        </div>

        {/* Navigation */}
        {response && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-800">
            <button
              onClick={() => setQuestionIndex(Math.max(0, questionIndex - 1))}
              disabled={questionIndex === 0}
              className="flex-1 py-3 bg-gray-800 rounded-xl disabled:opacity-30"
            >
              ← Previous
            </button>
            <button
              onClick={nextQuestion}
              className="flex-1 py-3 bg-violet-600 rounded-xl font-medium"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
