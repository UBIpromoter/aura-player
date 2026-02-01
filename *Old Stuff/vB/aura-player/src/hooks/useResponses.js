import { useCallback, useMemo } from 'react';
import { useLocalStorage, generateUUID, getDeviceId } from './useLocalStorage';

/**
 * Responses data hook
 * 
 * Manages user responses with local-first approach:
 * - All responses stored in localStorage immediately
 * - Marked as synced: false until server confirms
 * - Syncs to server when online (for named/verified users)
 * 
 * @returns {Object} Responses state and methods
 */
export function useResponses() {
  const [responses, setResponses] = useLocalStorage('aura_responses', {});
  const deviceId = getDeviceId();

  /**
   * Submit a response
   * In production: POST /responses
   * 
   * @param {string} questionId
   * @param {number} answer - Index of selected option
   * @param {number} confidence - 1-4
   * @param {number} timeTakenMs - Time to answer in ms
   */
  const submit = useCallback((questionId, answer, confidence, timeTakenMs = 0) => {
    const response = {
      id: generateUUID(),
      question_id: questionId,
      user_id: null, // Set when user is named/verified
      device_id: deviceId,
      answer,
      confidence,
      time_taken_ms: timeTakenMs,
      timestamp: Date.now(),
      synced: false
    };

    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }));

    // TODO: In production, also POST to server
    // try {
    //   const result = await api.post('/responses', response);
    //   setResponses(prev => ({
    //     ...prev,
    //     [questionId]: { ...prev[questionId], synced: true }
    //   }));
    //   return result.distribution;
    // } catch (err) {
    //   // Keep local, will retry later
    //   console.warn('Failed to sync response:', err);
    // }

    return response;
  }, [deviceId, setResponses]);

  /**
   * Update an existing response
   */
  const update = useCallback((questionId, updates) => {
    setResponses(prev => {
      if (!prev[questionId]) return prev;
      return {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          ...updates,
          synced: false // Mark as needing sync
        }
      };
    });
  }, [setResponses]);

  /**
   * Remove a response
   */
  const remove = useCallback((questionId) => {
    setResponses(prev => {
      const { [questionId]: _, ...rest } = prev;
      return rest;
    });
  }, [setResponses]);

  /**
   * Get response for a specific question
   */
  const getForQuestion = useCallback((questionId) => {
    return responses[questionId] || null;
  }, [responses]);

  /**
   * Check if question has been answered
   */
  const hasAnswered = useCallback((questionId) => {
    return !!responses[questionId];
  }, [responses]);

  /**
   * Get all responses as array
   */
  const allResponses = useMemo(() => {
    return Object.values(responses);
  }, [responses]);

  /**
   * Count of pending (unsynced) responses
   */
  const pendingCount = useMemo(() => {
    return allResponses.filter(r => !r.synced).length;
  }, [allResponses]);

  /**
   * Sync all pending responses to server
   * In production: Batch POST or individual POSTs
   */
  const syncToServer = useCallback(async () => {
    const pending = allResponses.filter(r => !r.synced);
    if (pending.length === 0) return;

    // TODO: Implement actual sync
    // for (const response of pending) {
    //   try {
    //     await api.post('/responses', response);
    //     setResponses(prev => ({
    //       ...prev,
    //       [response.question_id]: { ...prev[response.question_id], synced: true }
    //     }));
    //   } catch (err) {
    //     console.warn('Failed to sync response:', err);
    //   }
    // }

    console.log(`Would sync ${pending.length} responses to server`);
  }, [allResponses]);

  /**
   * Get responses by category (requires question data)
   */
  const getByCategory = useCallback((questions, categoryId) => {
    const categoryQuestionIds = new Set(
      questions.filter(q => q.category === categoryId).map(q => q.id)
    );
    return allResponses.filter(r => categoryQuestionIds.has(r.question_id));
  }, [allResponses]);

  /**
   * Calculate stats
   */
  const stats = useMemo(() => {
    return {
      total: allResponses.length,
      pending: pendingCount,
      synced: allResponses.length - pendingCount,
      byConfidence: {
        1: allResponses.filter(r => r.confidence === 1).length,
        2: allResponses.filter(r => r.confidence === 2).length,
        3: allResponses.filter(r => r.confidence === 3).length,
        4: allResponses.filter(r => r.confidence === 4).length,
      }
    };
  }, [allResponses, pendingCount]);

  return {
    responses,
    allResponses,
    pendingCount,
    stats,
    submit,
    update,
    remove,
    getForQuestion,
    hasAnswered,
    syncToServer,
    getByCategory
  };
}

export default useResponses;
