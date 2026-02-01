// Aura Player - API Service
// Flip USE_REAL_API to switch between mock and real backend

import { SAMPLE_QUESTIONS, getQuestionsByCategory } from '../data/questions';
import { getRandomQOTD, getTodaysQOTD } from '../data/qotd';
import { getAvailableTasks } from '../data/turk';

// ============================================
// CONFIGURATION
// ============================================

const USE_REAL_API = false;  // <-- Flip this when backend is ready
const API_BASE = '/api';

// ============================================
// REAL API IMPLEMENTATION
// ============================================

const realApi = {
  // Questions
  async getQuestions({ category, limit = 20, offset = 0 }) {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    params.set('limit', String(limit));
    params.set('offset', String(offset));
    
    const res = await fetch(`${API_BASE}/questions?${params}`);
    return res.json();
  },
  
  async getQuestion(id) {
    const res = await fetch(`${API_BASE}/questions/${id}`);
    return res.json();
  },
  
  // QOTD
  async getQOTD() {
    const res = await fetch(`${API_BASE}/qotd`);
    return res.json();
  },
  
  // Responses
  async submitResponse({ questionId, answer, confidence, timeTakenMs, deviceId }) {
    const res = await fetch(`${API_BASE}/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, answer, confidence, timeTakenMs, deviceId }),
    });
    return res.json();
  },
  
  // User
  async getUser(deviceId) {
    const res = await fetch(`${API_BASE}/user/me`, {
      headers: { 'X-Device-ID': deviceId },
    });
    return res.json();
  },
  
  async register({ username, deviceId }) {
    const res = await fetch(`${API_BASE}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, deviceId }),
    });
    return res.json();
  },
  
  async linkBrightId({ brightIdPublicKey, signature, timestamp }) {
    const res = await fetch(`${API_BASE}/user/link-brightid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brightIdPublicKey, signature, timestamp }),
    });
    return res.json();
  },
  
  // Turk
  async getTurkTasks(userRating) {
    const res = await fetch(`${API_BASE}/turk/tasks?rating=${userRating}`);
    return res.json();
  },
};

// ============================================
// MOCK API IMPLEMENTATION
// ============================================

const mockApi = {
  async getQuestions({ category, limit = 20, offset = 0 }) {
    await delay(100); // Simulate network
    
    const filtered = category 
      ? getQuestionsByCategory(category)
      : SAMPLE_QUESTIONS;
    
    return {
      questions: filtered.slice(offset, offset + limit),
      total: filtered.length,
      hasMore: offset + limit < filtered.length,
    };
  },
  
  async getQuestion(id) {
    await delay(50);
    return SAMPLE_QUESTIONS.find(q => q.id === id) || null;
  },
  
  async getQOTD() {
    await delay(50);
    return getTodaysQOTD();
  },
  
  async submitResponse({ questionId, answer, confidence }) {
    await delay(100);
    
    // Generate fake distribution
    const makeDist = () => [
      Math.floor(Math.random() * 100) + 50,
      Math.floor(Math.random() * 150) + 100,
      Math.floor(Math.random() * 200) + 150,
      Math.floor(Math.random() * 100) + 50,
    ];
    
    return {
      success: true,
      points: 10,
      distribution: {
        0: makeDist(),
        1: makeDist(),
      },
    };
  },
  
  async getUser(deviceId) {
    await delay(50);
    const stored = localStorage.getItem('aura_user');
    if (stored) return JSON.parse(stored);
    
    return {
      id: deviceId,
      deviceId,
      username: null,
      brightId: null,
      auraLevel: 0,
      tier: 'anonymous',
      stats: { totalAnswered: 0, currentStreak: 0, longestStreak: 0, points: 0 },
    };
  },
  
  async register({ username, deviceId }) {
    await delay(100);
    const user = {
      id: `user-${Date.now()}`,
      deviceId,
      username,
      brightId: null,
      auraLevel: 0,
      tier: 'named',
      stats: { totalAnswered: 0, currentStreak: 0, longestStreak: 0, points: 0 },
    };
    localStorage.setItem('aura_user', JSON.stringify(user));
    return { success: true, user, responsesLinked: 0 };
  },
  
  async linkBrightId() {
    await delay(100);
    return { success: true, tier: 'brightid', auraLevel: 0 };
  },
  
  async getTurkTasks(userRating = 0) {
    await delay(50);
    return { tasks: getAvailableTasks(userRating) };
  },
};

// ============================================
// HELPERS
// ============================================

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// EXPORT
// ============================================

export const api = USE_REAL_API ? realApi : mockApi;
export { USE_REAL_API };
