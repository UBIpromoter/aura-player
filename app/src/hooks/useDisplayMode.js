import { useState, useEffect, useCallback } from 'react';
import { loadState, saveState } from '../services/storage';

export const useDisplayMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const state = loadState();
    return state.settings?.darkMode ?? true;
  });

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newValue = !prev;
      const state = loadState();
      saveState({
        ...state,
        settings: { ...state.settings, darkMode: newValue }
      });
      return newValue;
    });
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
};

export default useDisplayMode;
