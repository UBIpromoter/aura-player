// Demo mode storage utilities
const STORAGE_KEY = 'aura-demo';

const getInitialState = () => ({
  answers: {},      // { [questionId]: { choice, confidence, timestamp, timeSpentMs } }
  skipped: [],      // [questionId, ...]
  saved: [],        // [questionId, ...]
  viewed: [],       // [questionId, ...]
  settings: {
    darkMode: null, // null = use system preference
    undoDelay: 2,
    requireConfirmation: false,
    showStreak: true,
  },
  stats: {
    answered: 0,
    streak: 0,
    lastAnswerDate: null,
  }
});

export const demoStorage = {
  get: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // Merge with defaults to handle new fields
        return { ...getInitialState(), ...parsed };
      }
    } catch (e) {
      console.error('Error reading demo storage:', e);
    }
    return getInitialState();
  },
  
  set: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error writing demo storage:', e);
    }
  },
  
  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing demo storage:', e);
    }
  },
  
  // Convenience methods
  saveAnswer: (questionId, choice, confidence, timeSpentMs = 0) => {
    const data = demoStorage.get();
    data.answers[questionId] = {
      choice,
      confidence,
      timestamp: Date.now(),
      timeSpentMs
    };
    data.stats.answered = Object.keys(data.answers).length;
    
    // Update streak
    const today = new Date().toDateString();
    if (data.stats.lastAnswerDate === today) {
      // Same day, keep streak
    } else {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (data.stats.lastAnswerDate === yesterday) {
        data.stats.streak += 1;
      } else {
        data.stats.streak = 1;
      }
      data.stats.lastAnswerDate = today;
    }
    
    // Remove from skipped if it was there
    data.skipped = data.skipped.filter(id => id !== questionId);
    
    demoStorage.set(data);
    return data;
  },
  
  skipQuestion: (questionId) => {
    const data = demoStorage.get();
    if (!data.skipped.includes(questionId) && !data.answers[questionId]) {
      data.skipped.push(questionId);
      demoStorage.set(data);
    }
    return data;
  },
  
  saveQuestion: (questionId) => {
    const data = demoStorage.get();
    if (!data.saved.includes(questionId)) {
      data.saved.push(questionId);
      demoStorage.set(data);
    }
    return data;
  },
  
  unsaveQuestion: (questionId) => {
    const data = demoStorage.get();
    data.saved = data.saved.filter(id => id !== questionId);
    demoStorage.set(data);
    return data;
  },
  
  markViewed: (questionId) => {
    const data = demoStorage.get();
    if (!data.viewed.includes(questionId)) {
      data.viewed.push(questionId);
      demoStorage.set(data);
    }
    return data;
  },
  
  updateSettings: (settings) => {
    const data = demoStorage.get();
    data.settings = { ...data.settings, ...settings };
    demoStorage.set(data);
    return data;
  },
  
  getSettings: () => {
    return demoStorage.get().settings;
  }
};

// Dark mode preference helper
export const getInitialDarkMode = () => {
  const settings = demoStorage.getSettings();
  if (settings.darkMode !== null) return settings.darkMode;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default demoStorage;
