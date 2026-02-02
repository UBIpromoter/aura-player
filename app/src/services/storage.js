import { STORAGE_KEY, ASSESS_STORAGE_KEY } from '../data/constants';

// Default state structure
const DEFAULT_STATE = {
  answers: {},
  settings: {
    darkMode: true,
    showConfidence: true,
  },
  stats: {
    totalAnswered: 0,
    streak: 0,
    lastAnsweredDate: null,
  }
};

// Load state from localStorage
export const loadState = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return { ...DEFAULT_STATE, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error('[Aura] Failed to load state:', err);
  }
  return DEFAULT_STATE;
};

// Save state to localStorage
export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('[Aura] Failed to save state:', err);
  }
};

// Load assessment answers
export const loadAssessments = () => {
  try {
    const data = localStorage.getItem(ASSESS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('[Aura] Failed to load assessments:', err);
  }
  return {};
};

// Save assessment answers
export const saveAssessments = (assessments) => {
  try {
    localStorage.setItem(ASSESS_STORAGE_KEY, JSON.stringify(assessments));
  } catch (err) {
    console.error('[Aura] Failed to save assessments:', err);
  }
};

// Export all local data as JSON
export const exportUserData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return null;
  }
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `aura-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  return true;
};

// Import data from JSON string
export const importUserData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (data.answers && data.settings) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    }
    return false;
  } catch (err) {
    console.error('[Aura] Import error:', err);
    return false;
  }
};

// Clear all data
export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ASSESS_STORAGE_KEY);
};
