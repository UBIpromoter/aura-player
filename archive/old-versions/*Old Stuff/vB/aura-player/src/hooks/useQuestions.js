import { useState, useCallback, useMemo } from 'react';
import { SAMPLE_QUESTIONS } from '../data/questions';
import { getRandomQOTD } from '../data/qotd';

/**
 * Fisher-Yates shuffle
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Questions data hook
 * 
 * Currently uses static data. In production, fetches from API.
 * 
 * @returns {Object} Questions state and methods
 */
export function useQuestions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qotd, setQOTD] = useState(getRandomQOTD);

  // All questions (shuffled once on mount)
  const [questions] = useState(() => shuffleArray(SAMPLE_QUESTIONS));

  /**
   * Get questions by category
   * In production: GET /questions?category=X
   */
  const getByCategory = useCallback((categoryId) => {
    return questions.filter(q => q.category === categoryId);
  }, [questions]);

  /**
   * Fetch questions by category (async for API compatibility)
   * In production: GET /questions?category=X
   */
  const fetchByCategory = useCallback(async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with API call
      // const response = await api.get(`/questions?category=${categoryId}`);
      // return response.questions;
      
      // For now, return filtered static data
      const filtered = questions.filter(q => q.category === categoryId);
      setLoading(false);
      return filtered;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [questions]);

  /**
   * Get single question by ID
   * In production: GET /questions/:id
   */
  const getQuestion = useCallback((id) => {
    return questions.find(q => q.id === id) || null;
  }, [questions]);

  /**
   * Get current QOTD
   * In production: GET /qotd
   */
  const getQOTD = useCallback(async () => {
    setLoading(true);
    try {
      // TODO: Replace with API call
      // const response = await api.get('/qotd');
      // setQOTD(response);
      // return response;
      
      setLoading(false);
      return qotd;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [qotd]);

  /**
   * Reset QOTD (demo mode only)
   */
  const resetQOTD = useCallback(() => {
    setQOTD(getRandomQOTD());
  }, []);

  /**
   * Count questions by category
   */
  const countByCategory = useMemo(() => {
    const counts = {};
    questions.forEach(q => {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  }, [questions]);

  return {
    questions,
    loading,
    error,
    qotd,
    getByCategory,
    fetchByCategory,
    getQuestion,
    getQOTD,
    resetQOTD,
    countByCategory
  };
}

export default useQuestions;
