import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDisplayMode } from './hooks/useDisplayMode';
import { useSwipe } from './hooks/useSwipe';
import { demoStorage, getInitialDarkMode } from './utils/storage';
import { QUESTIONS, CATEGORIES, MC_COLORS, CONFIDENCE_LABELS, shuffleArray, generateFakeResults } from './data/questions';

// Components
import PhoneFrame from './components/PhoneFrame';
import NavBar from './components/NavBar';
import QuestionCard from './components/QuestionCard';
import BinaryButtons from './components/BinaryButtons';
import MultipleChoice from './components/MultipleChoice';
import UndoBar from './components/UndoBar';
import ResultsPanel from './components/ResultsPanel';
import LaunchScreen from './components/LaunchScreen';
import SettingsScreen from './components/SettingsScreen';
import ProfileScreen from './components/ProfileScreen';

function App() {
  const displayMode = useDisplayMode();
  
  // Shuffled questions
  const [questions] = useState(() => shuffleArray(QUESTIONS));
  
  // Core state
  const [screen, setScreen] = useState('launch'); // 'launch', 'question', 'settings', 'profile'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  
  // Answer state
  const [responses, setResponses] = useState(() => demoStorage.get().answers);
  const [skipped, setSkipped] = useState(() => new Set(demoStorage.get().skipped));
  const [saved, setSaved] = useState(() => new Set(demoStorage.get().saved));
  
  // Settings
  const [undoDelay, setUndoDelay] = useState(() => demoStorage.getSettings().undoDelay);
  const [showStreak, setShowStreak] = useState(() => demoStorage.getSettings().showStreak);
  
  // Stats
  const [stats, setStats] = useState(() => demoStorage.get().stats);
  
  // UI state
  const [pendingSubmit, setPendingSubmit] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [tapCount, setTapCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [evidenceExpanded, setEvidenceExpanded] = useState(false);
  
  // Refs
  const submitTimeoutRef = useRef(null);
  const questionStartTime = useRef(Date.now());
  
  // Current question
  const currentQuestion = questions[currentIndex];
  const currentResponse = currentQuestion ? responses[currentQuestion.id] : null;
  const isAnswered = !!currentResponse;
  
  // Persist dark mode
  useEffect(() => {
    demoStorage.updateSettings({ darkMode });
  }, [darkMode]);
  
  // Navigation
  const goToNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      // If unanswered, mark as skipped
      if (!isAnswered && currentQuestion) {
        const newSkipped = new Set(skipped);
        newSkipped.add(currentQuestion.id);
        setSkipped(newSkipped);
        demoStorage.skipQuestion(currentQuestion.id);
      }
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTapCount(0);
      setShowResults(false);
      setEvidenceExpanded(false);
      questionStartTime.current = Date.now();
    }
  }, [currentIndex, questions.length, isAnswered, currentQuestion, skipped]);
  
  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setTapCount(0);
      setShowResults(false);
      setEvidenceExpanded(false);
      questionStartTime.current = Date.now();
    }
  }, [currentIndex]);
  
  // Swipe handlers
  const { handlers: swipeHandlers } = useSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
    enabled: screen === 'question' && !pendingSubmit
  });
  
  // Handle tap on answer
  const handleAnswerTap = (answer) => {
    if (isAnswered || pendingSubmit) return;
    
    if (selectedAnswer === answer && tapCount < 4) {
      setTapCount(prev => prev + 1);
    } else {
      setSelectedAnswer(answer);
      setTapCount(1);
    }
  };
  
  // Submit with confidence
  const submitAnswer = (answer, confidence) => {
    if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current);
    
    const timeSpent = Date.now() - questionStartTime.current;
    setPendingSubmit({ answer, confidence, timeSpent });
    
    if (undoDelay === 0) {
      finalizeSubmit(answer, confidence, timeSpent);
    } else {
      submitTimeoutRef.current = setTimeout(() => {
        finalizeSubmit(answer, confidence, timeSpent);
      }, undoDelay * 1000);
    }
  };
  
  const finalizeSubmit = (answer, confidence, timeSpent) => {
    const newData = demoStorage.saveAnswer(currentQuestion.id, answer, confidence, timeSpent);
    setResponses(newData.answers);
    setStats(newData.stats);
    setPendingSubmit(null);
    setShowResults(true);
  };
  
  // Undo
  const handleUndo = () => {
    if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current);
    setPendingSubmit(null);
    setSelectedAnswer(null);
    setTapCount(0);
  };
  
  // Toggle save
  const toggleSave = () => {
    if (!currentQuestion) return;
    const newSaved = new Set(saved);
    if (newSaved.has(currentQuestion.id)) {
      newSaved.delete(currentQuestion.id);
      demoStorage.unsaveQuestion(currentQuestion.id);
    } else {
      newSaved.add(currentQuestion.id);
      demoStorage.saveQuestion(currentQuestion.id);
    }
    setSaved(newSaved);
  };
  
  // Demo mode start
  const startDemo = () => {
    setScreen('question');
  };
  
  // Reset demo
  const resetDemo = () => {
    demoStorage.clear();
    setResponses({});
    setSkipped(new Set());
    setSaved(new Set());
    setStats({ answered: 0, streak: 0, lastAnswerDate: null });
    setCurrentIndex(0);
    setScreen('launch');
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (screen !== 'question') return;
      
      const key = e.key.toLowerCase();
      
      if (key === 'escape' && pendingSubmit) {
        handleUndo();
        return;
      }
      
      if (isAnswered || pendingSubmit) return;
      
      if (currentQuestion?.type === 'binary') {
        if (key === 'y') handleAnswerTap(true);
        if (key === 'n') handleAnswerTap(false);
      } else {
        const optionKeys = ['a', 'b', 'c', 'd', 'e'];
        const idx = optionKeys.indexOf(key);
        if (idx >= 0 && currentQuestion?.options?.[idx]) {
          handleAnswerTap(currentQuestion.options[idx]);
        }
      }
      
      if (key === 'arrowleft') goToPrev();
      if (key === 'arrowright') goToNext();
      if (key === 's') goToNext(); // Skip
      if (key === 'm') toggleSave(); // Save/bookmark
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, currentQuestion, isAnswered, pendingSubmit, goToNext, goToPrev]);
  
  // Render content based on screen
  const renderContent = () => {
    if (screen === 'launch') {
      return <LaunchScreen onDemo={startDemo} onLogin={() => {}} darkMode={darkMode} />;
    }
    
    if (screen === 'settings') {
      return (
        <SettingsScreen
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          undoDelay={undoDelay}
          setUndoDelay={(val) => {
            setUndoDelay(val);
            demoStorage.updateSettings({ undoDelay: val });
          }}
          showStreak={showStreak}
          setShowStreak={(val) => {
            setShowStreak(val);
            demoStorage.updateSettings({ showStreak: val });
          }}
          onBack={() => setScreen('question')}
          onReset={resetDemo}
        />
      );
    }
    
    if (screen === 'profile') {
      return (
        <ProfileScreen
          darkMode={darkMode}
          stats={stats}
          responses={responses}
          questions={questions}
          onBack={() => setScreen('question')}
        />
      );
    }
    
    // Question screen
    if (!currentQuestion) {
      return (
        <div className={`flex-1 flex items-center justify-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="text-center p-8">
            <div className="text-4xl mb-4">🎉</div>
            <div className="text-xl font-medium mb-2">All done!</div>
            <div className="text-sm text-gray-500">You've answered all questions</div>
          </div>
        </div>
      );
    }
    
    const fakeResults = generateFakeResults(currentQuestion);
    const isSaved = saved.has(currentQuestion.id);
    
    return (
      <div className="flex-1 flex flex-col overflow-hidden" {...swipeHandlers}>
        {/* Question area - upper portion */}
        <div className="flex-shrink-0 px-4 pt-4">
          <QuestionCard
            question={currentQuestion}
            darkMode={darkMode}
            evidenceExpanded={evidenceExpanded}
            onToggleEvidence={() => setEvidenceExpanded(!evidenceExpanded)}
          />
        </div>
        
        {/* Answer area - thumb zone */}
        <div className="flex-1 flex flex-col justify-center px-4 pb-4">
          {currentQuestion.type === 'binary' ? (
            <BinaryButtons
              darkMode={darkMode}
              selectedAnswer={selectedAnswer}
              tapCount={tapCount}
              isAnswered={isAnswered}
              currentResponse={currentResponse}
              onTap={handleAnswerTap}
              onSubmit={submitAnswer}
              pendingSubmit={pendingSubmit}
            />
          ) : (
            <MultipleChoice
              options={currentQuestion.options}
              darkMode={darkMode}
              selectedAnswer={selectedAnswer}
              tapCount={tapCount}
              isAnswered={isAnswered}
              currentResponse={currentResponse}
              onTap={handleAnswerTap}
              onSubmit={submitAnswer}
              pendingSubmit={pendingSubmit}
            />
          )}
          
          {/* Secondary actions */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`text-sm ${currentIndex === 0 ? 'opacity-30' : 'opacity-70 hover:opacity-100'} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              ← prev
            </button>
            <button
              onClick={goToNext}
              className={`text-sm opacity-70 hover:opacity-100 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              skip
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === questions.length - 1}
              className={`text-sm ${currentIndex === questions.length - 1 ? 'opacity-30' : 'opacity-70 hover:opacity-100'} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              next →
            </button>
          </div>
          
          <button
            onClick={toggleSave}
            className={`text-sm mt-2 mx-auto ${isSaved ? 'text-amber-500' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}
          >
            {isSaved ? '★ saved' : '☆ save for later'}
          </button>
        </div>
        
        {/* Results panel (shows after answer) */}
        {(isAnswered || showResults) && !pendingSubmit && (
          <ResultsPanel
            question={currentQuestion}
            response={currentResponse}
            results={fakeResults}
            darkMode={darkMode}
            isDemo={true}
          />
        )}
        
        {/* Undo bar */}
        {pendingSubmit && (
          <UndoBar
            darkMode={darkMode}
            undoDelay={undoDelay}
            onUndo={handleUndo}
            answer={pendingSubmit.answer}
            confidence={pendingSubmit.confidence}
          />
        )}
      </div>
    );
  };
  
  // Wrap in PhoneFrame for desktop, or render directly for mobile
  if (displayMode === 'desktop') {
    return (
      <PhoneFrame
        darkMode={darkMode}
        onHome={() => setScreen('question')}
        onSettings={() => setScreen('settings')}
        onProfile={() => setScreen('profile')}
        userInfo={screen !== 'launch' ? { answered: stats.answered, streak: stats.streak } : null}
        showNav={screen !== 'launch'}
        showStreak={showStreak}
      >
        <div className={`flex-1 flex flex-col overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
          {screen !== 'launch' && screen !== 'settings' && screen !== 'profile' && (
            <NavBar
              darkMode={darkMode}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              onHome={() => setScreen('question')}
              onSettings={() => setScreen('settings')}
              onProfile={() => setScreen('profile')}
              stats={stats}
              showStreak={showStreak}
            />
          )}
          {renderContent()}
        </div>
      </PhoneFrame>
    );
  }
  
  // Mobile: full screen, native layout
  return (
    <div className={`h-full flex flex-col safe-all ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {screen !== 'launch' && screen !== 'settings' && screen !== 'profile' && (
        <div className="safe-top">
          <NavBar
            darkMode={darkMode}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onHome={() => setScreen('question')}
            onSettings={() => setScreen('settings')}
            onProfile={() => setScreen('profile')}
            stats={stats}
            showStreak={showStreak}
          />
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
      <div className="safe-bottom" />
    </div>
  );
}

export default App;
