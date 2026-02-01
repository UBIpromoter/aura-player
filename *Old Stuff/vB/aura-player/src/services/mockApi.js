/**
 * Mock API for development
 * 
 * Returns static data to simulate backend responses.
 * Used when USE_REAL_API = false
 */

import { SAMPLE_QUESTIONS } from '../data/questions';
import { getRandomQOTD } from '../data/qotd';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate fake community distribution for a question
 */
const generateDistribution = (questionType, optionCount = 2) => {
  const distribution = {};
  const count = questionType === 'binary' ? 2 : optionCount;
  
  for (let i = 0; i < count; i++) {
    distribution[i] = [
      Math.floor(Math.random() * 100) + 20,  // conf 1
      Math.floor(Math.random() * 200) + 50,  // conf 2
      Math.floor(Math.random() * 300) + 100, // conf 3
      Math.floor(Math.random() * 200) + 50,  // conf 4
    ];
  }
  
  return distribution;
};

export const mockApi = {
  /**
   * GET /questions
   */
  getQuestions: async ({ category, limit = 20, offset = 0 } = {}) => {
    await delay(200);
    
    let questions = [...SAMPLE_QUESTIONS];
    
    if (category) {
      questions = questions.filter(q => q.category === category);
    }
    
    const total = questions.length;
    questions = questions.slice(offset, offset + limit);
    
    return {
      questions: questions.map(q => ({
        ...q,
        responseCount: Math.floor(Math.random() * 1000) + 100,
        userResponse: null
      })),
      total,
      hasMore: offset + limit < total
    };
  },

  /**
   * GET /questions/:id
   */
  getQuestion: async (id) => {
    await delay(100);
    
    const question = SAMPLE_QUESTIONS.find(q => q.id === id);
    if (!question) {
      throw new Error('Question not found');
    }
    
    return {
      ...question,
      responseCount: Math.floor(Math.random() * 1000) + 100,
      userResponse: null,
      distribution: null // Only revealed after answering
    };
  },

  /**
   * POST /responses
   */
  submitResponse: async ({ questionId, answer, confidence, timeTakenMs, deviceId }) => {
    await delay(150);
    
    const question = SAMPLE_QUESTIONS.find(q => q.id === questionId);
    const optionCount = question?.options?.length || 2;
    
    return {
      success: true,
      points: 10,
      distribution: generateDistribution(question?.type || 'binary', optionCount)
    };
  },

  /**
   * GET /qotd
   */
  getQOTD: async () => {
    await delay(100);
    return getRandomQOTD();
  },

  /**
   * GET /user/me
   */
  getUser: async (deviceId) => {
    await delay(100);
    
    // Return mock user based on localStorage or create new
    return {
      id: deviceId,
      username: null,
      brightId: null,
      auraLevel: 0,
      stats: {
        totalAnswered: 0,
        currentStreak: 0,
        longestStreak: 0,
        points: 0
      },
      tier: 'anonymous'
    };
  },

  /**
   * POST /user/register
   */
  register: async ({ username, deviceId }) => {
    await delay(200);
    
    return {
      success: true,
      user: {
        id: deviceId,
        username,
        tier: 'named'
      },
      responsesLinked: Math.floor(Math.random() * 50)
    };
  },

  /**
   * POST /user/link-brightid
   */
  linkBrightId: async ({ deviceId, brightIdPublicKey, signature }) => {
    await delay(300);
    
    return {
      success: true,
      tier: 'verified',
      auraLevel: Math.floor(Math.random() * 3) + 1
    };
  },

  /**
   * GET /leaderboard
   */
  getLeaderboard: async ({ limit = 10 } = {}) => {
    await delay(150);
    
    const names = ['Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery', 'Parker'];
    
    return {
      leaders: names.slice(0, limit).map((name, i) => ({
        rank: i + 1,
        username: name + Math.floor(Math.random() * 100),
        points: 10000 - (i * 500) + Math.floor(Math.random() * 200),
        streak: Math.floor(Math.random() * 30),
        verified: Math.random() > 0.5
      }))
    };
  }
};

export default mockApi;
