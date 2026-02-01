// Aura Player - Responses Hook
// Handles submitting and retrieving user responses

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'aura_responses';

export function useResponses(deviceId) {
  // responses: Map of questionId -> { answer, confidence, timeTakenMs, synced, createdAt }
  const [responses, setResponses] = useState({});
  const [pendingSync, setPendingSync] = useState([]);
  
  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setResponses(parsed);
      
      // Find unsynced responses
      const pending = Object.entries(parsed)
        .filter(([_, r]) => !r.synced)
        .map(([qId, r]) => ({ questionId: qId, ...r }));
      setPendingSync(pending);
    }
  }, []);
  
  // Save to localStorage whenever responses change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
  }, [responses]);
  
  // Submit a response
  const submit = useCallback(async (questionId, answer, confidence, timeTakenMs) => {
    const response = {
      answer,
      confidence,
      timeTakenMs,
      deviceId,
      createdAt: new Date().toISOString(),
      synced: false, // Will be true after server confirms
    };
    
    setResponses(prev => ({
      ...prev,
      [questionId]: response,
    }));
    
    setPendingSync(prev => [...prev, { questionId, ...response }]);
    
    // TODO: POST /responses
    // On success: mark as synced, return distribution
    // On failure: leave in pendingSync for retry
    
    // For now, mock the response
    return {
      success: true,
      points: 10,
      distribution: null, // Backend will return this
    };
  }, [deviceId]);
  
  // Get response for a specific question
  const getForQuestion = useCallback((questionId) => {
    return responses[questionId] || null;
  }, [responses]);
  
  // Sync pending responses to server
  const syncToServer = useCallback(async () => {
    if (pendingSync.length === 0) return;
    
    // TODO: Batch POST to /responses/sync
    // For each response:
    // - POST /responses
    // - On success, mark as synced
    // - On failure, keep in pending
    
    console.log(`Syncing ${pendingSync.length} responses...`);
    
    // Mock: mark all as synced
    setResponses(prev => {
      const updated = { ...prev };
      pendingSync.forEach(({ questionId }) => {
        if (updated[questionId]) {
          updated[questionId].synced = true;
        }
      });
      return updated;
    });
    
    setPendingSync([]);
  }, [pendingSync]);
  
  // Auto-sync when online
  useEffect(() => {
    const handleOnline = () => {
      if (pendingSync.length > 0) {
        syncToServer();
      }
    };
    
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [pendingSync, syncToServer]);
  
  return {
    responses,
    pendingSync,
    submit,
    getForQuestion,
    syncToServer,
  };
}
