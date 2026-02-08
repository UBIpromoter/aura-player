import React, { useState } from 'react';

const ASSESSMENTS = [
  { id: 'bigfive', name: 'Big Five Personality', icon: '🎭', items: 50, time: '8 min', color: 'violet', desc: 'Core personality traits' },
  { id: 'adhd', name: 'ADHD Screen', icon: '⚡', items: 6, time: '2 min', color: 'amber', desc: 'Attention patterns' },
  { id: 'autism', name: 'Cognitive Style', icon: '🧩', items: 10, time: '3 min', color: 'teal', desc: 'How you process information' },
  { id: 'attachment', name: 'Attachment Style', icon: '💝', items: 12, time: '4 min', color: 'rose', desc: 'Relationship patterns' },
  { id: 'risk', name: 'Risk Tolerance', icon: '🎲', items: 15, time: '5 min', color: 'emerald', desc: 'Where you take chances' },
];

const SAMPLE_QUESTIONS = {
  bigfive: [
    { text: "I am the life of the party", trait: 'Extraversion' },
    { text: "I sympathize with others' feelings", trait: 'Agreeableness' },
    { text: "I am always prepared", trait: 'Conscientiousness' },
  ],
  adhd: [
    { text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?" },
    { text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?" },
  ],
  autism: [
    { text: "I notice things others seem to miss—small changes, background sounds, subtle patterns" },
    { text: "Switching between tasks quickly feels uncomfortable or draining" },
  ],
  attachment: [
    { text: "When I don't hear from someone I care about, I tend to assume something is wrong" },
    { text: "I feel most comfortable when I don't have to depend on anyone" },
  ],
  risk: [
    { text: "Invest 20% of savings in a high-risk/high-reward opportunity" },
    { text: "Share an unpopular opinion publicly" },
  ],
};

const SCALE_LABELS = {
  bigfive: ['Very Inaccurate', 'Inaccurate', 'Neutral', 'Accurate', 'Very Accurate'],
  adhd: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
  autism: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
  attachment: ['1', '2', '3', '4', '5', '6', '7'],
  risk: ['Very Unlikely', 'Unlikely', 'Maybe', 'Likely', 'Very Likely'],
};

const SAMPLE_RESULTS = {
  bigfive: {
    scores: { Openness: 78, Conscientiousness: 45, Extraversion: 62, Agreeableness: 71, Neuroticism: 38 },
    summary: "You're highly open and agreeable—curious about ideas and empathetic toward others. Moderate extraversion means you enjoy socializing but value alone time. Lower conscientiousness suggests flexibility over rigid planning."
  },
  adhd: {
    score: 4,
    summary: "You show patterns common in people with attention differences, particularly around task completion and organization. This isn't a diagnosis—consider talking to a professional if these patterns affect your daily life."
  },
  autism: {
    score: 6,
    summary: "Your cognitive style aligns with neurodivergent patterns. You likely notice details others miss, prefer systematic thinking, and may find social cues less intuitive. These traits often correlate with deep focus ability and precision."
  },
  attachment: {
    style: 'Anxious',
    anxiety: 5.2,
    avoidance: 2.8,
    summary: "You value deep connection and are attuned to relationship dynamics—sometimes hyperattuned. You may seek reassurance more than others. Knowing this helps you communicate needs without spiraling."
  },
  risk: {
    scores: { Financial: 35, Social: 72, Physical: 48, Career: 65, Ethical: 28 },
    summary: "You're a financial conservative but social risk-taker. You protect your money but readily speak your mind. High career risk tolerance suggests you'd bet on yourself professionally."
  }
};

export default function RevealAssessmentMockup() {
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState('picker'); // picker, question, results
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const bg = darkMode ? 'bg-gray-950' : 'bg-gray-50';
  const text = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-500';
  const card = darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200';
  const border = darkMode ? 'border-gray-800' : 'border-gray-200';

  const startAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setView('question');
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const nextQuestion = () => {
    const questions = SAMPLE_QUESTIONS[selectedAssessment.id];
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setView('results');
    }
  };

  // Assessment Picker View
  const AssessmentPicker = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`h-[44px] flex items-center justify-between px-4 border-b ${border}`}>
        <span className={`font-medium ${text}`}>🪞 Reveal</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Subtitle */}
      <div className="px-4 pt-4 pb-2">
        <p className={`text-sm ${textSecondary}`}>Learn about yourself</p>
      </div>

      {/* Disclaimer */}
      <div className={`mx-4 mb-4 px-3 py-2 rounded-lg text-xs ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-500'}`}>
        For fun and self-discovery, not medical advice
      </div>

      {/* Assessment List */}
      <div className="flex-1 overflow-auto px-4 space-y-3">
        {ASSESSMENTS.map((a) => (
          <button
            key={a.id}
            onClick={() => startAssessment(a)}
            className={`w-full p-4 rounded-xl text-left transition-all ${card} hover:ring-2 hover:ring-${a.color}-500/50`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1">
                <div className={`font-medium ${text}`}>{a.name}</div>
                <div className={`text-sm ${textSecondary}`}>{a.desc}</div>
                <div className={`text-xs mt-2 ${textSecondary}`}>
                  {a.items} questions · {a.time}
                </div>
              </div>
              <span className={textSecondary}>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Question View
  const QuestionView = () => {
    const questions = SAMPLE_QUESTIONS[selectedAssessment.id];
    const question = questions[questionIndex];
    const scale = SCALE_LABELS[selectedAssessment.id];
    const progress = ((questionIndex + 1) / selectedAssessment.items) * 100;

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`h-[44px] flex items-center gap-3 px-4 border-b ${border}`}>
          <button onClick={() => setView('picker')} className={textSecondary}>←</button>
          <span className={`font-medium flex-1 ${text}`}>{selectedAssessment.name}</span>
          <span className={`text-xs ${textSecondary}`}>{questionIndex + 1}/{selectedAssessment.items}</span>
        </div>

        {/* Progress Bar */}
        <div className={`h-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div
            className="h-full bg-violet-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8">
          {question.trait && (
            <div className={`text-xs mb-2 ${textSecondary}`}>{question.trait}</div>
          )}
          <h2 className={`text-lg font-medium leading-relaxed ${text}`}>
            {question.text}
          </h2>
        </div>

        {/* Scale */}
        <div className="px-4 pb-6">
          <div className="flex flex-col gap-2">
            {scale.map((label, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full py-3 px-4 rounded-xl text-left transition-all ${
                  selectedAnswer === i
                    ? 'bg-violet-600 text-white ring-2 ring-violet-400'
                    : card
                } ${text}`}
              >
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextQuestion}
            disabled={selectedAnswer === null}
            className={`w-full mt-4 py-3 rounded-xl font-medium transition-all ${
              selectedAnswer !== null
                ? 'bg-violet-600 text-white'
                : darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-200 text-gray-400'
            }`}
          >
            {questionIndex < questions.length - 1 ? 'Next' : 'See Results'}
          </button>
        </div>
      </div>
    );
  };

  // Results View
  const ResultsView = () => {
    const results = SAMPLE_RESULTS[selectedAssessment.id];

    const TraitBar = ({ label, value, color = 'violet' }) => (
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className={textSecondary}>{label}</span>
          <span className={text}>{value}%</span>
        </div>
        <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div
            className={`h-full rounded-full bg-${color}-500`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`h-[44px] flex items-center gap-3 px-4 border-b ${border}`}>
          <button onClick={() => setView('picker')} className={textSecondary}>←</button>
          <span className={`font-medium flex-1 ${text}`}>Your Results</span>
          <button className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
            Share
          </button>
        </div>

        {/* Results Content */}
        <div className="flex-1 overflow-auto p-4 space-y-6">
          {/* Assessment Title */}
          <div className="text-center py-4">
            <span className="text-4xl mb-2 block">{selectedAssessment.icon}</span>
            <h2 className={`text-xl font-bold ${text}`}>{selectedAssessment.name}</h2>
          </div>

          {/* Big Five Results */}
          {selectedAssessment.id === 'bigfive' && (
            <div className={`p-4 rounded-xl ${card}`}>
              <h3 className={`font-medium mb-4 ${text}`}>Your Traits</h3>
              <div className="space-y-4">
                {Object.entries(results.scores).map(([trait, score]) => (
                  <TraitBar key={trait} label={trait} value={score} />
                ))}
              </div>
            </div>
          )}

          {/* ADHD Results */}
          {selectedAssessment.id === 'adhd' && (
            <div className={`p-4 rounded-xl ${card}`}>
              <div className="text-center mb-4">
                <div className={`text-5xl font-bold ${text}`}>{results.score}/6</div>
                <div className={`text-sm mt-1 ${textSecondary}`}>indicators present</div>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-amber-500/10' : 'bg-amber-50'}`}>
                <span className="text-amber-500 text-sm">
                  {results.score >= 4 ? 'Patterns consistent with ADHD' : 'Below screening threshold'}
                </span>
              </div>
            </div>
          )}

          {/* Autism Results */}
          {selectedAssessment.id === 'autism' && (
            <div className={`p-4 rounded-xl ${card}`}>
              <div className="text-center mb-4">
                <div className={`text-5xl font-bold ${text}`}>{results.score}/10</div>
                <div className={`text-sm mt-1 ${textSecondary}`}>neurodivergent indicators</div>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-teal-500/10' : 'bg-teal-50'}`}>
                <span className="text-teal-500 text-sm">Strong systematic thinking patterns</span>
              </div>
            </div>
          )}

          {/* Attachment Results */}
          {selectedAssessment.id === 'attachment' && (
            <div className={`p-4 rounded-xl ${card}`}>
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold ${text}`}>{results.style}</div>
                <div className={`text-sm mt-1 ${textSecondary}`}>attachment style</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold text-rose-400`}>{results.anxiety.toFixed(1)}</div>
                  <div className={`text-xs ${textSecondary}`}>Anxiety</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-blue-400`}>{results.avoidance.toFixed(1)}</div>
                  <div className={`text-xs ${textSecondary}`}>Avoidance</div>
                </div>
              </div>
            </div>
          )}

          {/* Risk Results */}
          {selectedAssessment.id === 'risk' && (
            <div className={`p-4 rounded-xl ${card}`}>
              <h3 className={`font-medium mb-4 ${text}`}>Risk Profile</h3>
              <div className="space-y-4">
                {Object.entries(results.scores).map(([domain, score]) => (
                  <TraitBar key={domain} label={domain} value={score} color="emerald" />
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className={`p-4 rounded-xl ${card}`}>
            <h3 className={`font-medium mb-2 ${text}`}>What This Means</h3>
            <p className={`text-sm leading-relaxed ${textSecondary}`}>
              {results.summary}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-2 pb-4">
            <button className="w-full py-3 bg-violet-600 text-white rounded-xl font-medium">
              Explore Deeper Insights
            </button>
            <button
              onClick={() => setView('picker')}
              className={`w-full py-3 rounded-xl font-medium ${card} ${text}`}
            >
              Take Another Assessment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full max-w-md mx-auto h-[700px] ${bg} ${text} rounded-2xl overflow-hidden shadow-2xl`}>
      {view === 'picker' && <AssessmentPicker />}
      {view === 'question' && <QuestionView />}
      {view === 'results' && <ResultsView />}
    </div>
  );
}
