/**
 * API Service
 * 
 * Switches between mock API (for development) and real API (for production).
 * Change USE_REAL_API to true when backend is ready.
 */

import { mockApi } from './mockApi';

// Feature flag: Set to true when backend is ready
const USE_REAL_API = false;

// Base URL for production API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.aura.example.com';

/**
 * Real API implementation
 * TODO: Implement when backend is ready
 */
const realApi = {
  getQuestions: async (params) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/questions?${query}`);
    if (!response.ok) throw new Error('Failed to fetch questions');
    return response.json();
  },

  getQuestion: async (id) => {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`);
    if (!response.ok) throw new Error('Question not found');
    return response.json();
  },

  submitResponse: async (data) => {
    const response = await fetch(`${API_BASE_URL}/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to submit response');
    return response.json();
  },

  getQOTD: async () => {
    const response = await fetch(`${API_BASE_URL}/qotd`);
    if (!response.ok) throw new Error('Failed to fetch QOTD');
    return response.json();
  },

  getUser: async (deviceId) => {
    const response = await fetch(`${API_BASE_URL}/user/me`, {
      headers: { 'X-Device-ID': deviceId }
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  register: async (data) => {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to register');
    return response.json();
  },

  linkBrightId: async (data) => {
    const response = await fetch(`${API_BASE_URL}/user/link-brightid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to link BrightID');
    return response.json();
  },

  getLeaderboard: async (params) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/leaderboard?${query}`);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return response.json();
  }
};

// Export the appropriate API based on feature flag
export const api = USE_REAL_API ? realApi : mockApi;

// Also export the flag for debugging
export const isUsingRealApi = USE_REAL_API;

export default api;
