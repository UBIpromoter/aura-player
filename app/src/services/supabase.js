import { createClient } from '@supabase/supabase-js';
import { SCALE_LABELS, CONFIDENCE_LABELS } from '../data/constants';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://tzhmhlllblhfvtqmmsuu.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_5qNssH06WHWBYSKDVGGrHg_m4MOC7su';

export const auraDB = createClient(SUPABASE_URL, SUPABASE_KEY);

// Session management
let AURA_SESSION_ID = null;
let AURA_USER_EMAIL = null;

export const initSession = () => {
  const stored = sessionStorage.getItem('aura-session-id');
  if (stored) {
    AURA_SESSION_ID = stored;
  } else {
    const id = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('aura-session-id', id);
    AURA_SESSION_ID = id;
  }
  console.log('[Aura] Session ID:', AURA_SESSION_ID);
  return AURA_SESSION_ID;
};

export const getSessionId = () => AURA_SESSION_ID;
export const getUserEmail = () => AURA_USER_EMAIL;
export const setUserEmail = (email) => { AURA_USER_EMAIL = email; };

// Capture response to Supabase with snapshot
export const captureResponse = async (questionId, answer, confidence, question) => {
  const response = {
    session_id: AURA_SESSION_ID,
    question_id: questionId,
    answer: answer,
    confidence: confidence,
    email: AURA_USER_EMAIL,
    snapshot: question ? {
      q: question.text,
      a: question.type === 'binary' ? (answer ? 'Yes' : 'No') : (question.options?.[answer] || String(answer)),
      t: question.type,
      c: question.category,
      v: question._v
    } : null
  };

  const { error } = await auraDB.from('responses').insert(response);

  if (error) {
    console.error('[Aura] Capture failed:', error);
  } else {
    console.log('[Aura] Response captured:', response);
  }
};

// Capture assessment response with snapshot
export const captureAssessResponse = async (testId, questionIndex, answer, test) => {
  const item = test?.items?.[questionIndex];

  const response = {
    session_id: AURA_SESSION_ID,
    question_id: -(questionIndex + 1),
    answer: answer,
    confidence: 0,
    email: AURA_USER_EMAIL,
    test_id: testId,
    snapshot: test && item ? {
      test: testId,
      name: test.name,
      q: item.q,
      a: SCALE_LABELS[test.scale]?.[answer - 1] || String(answer),
      idx: questionIndex
    } : null
  };

  const { error } = await auraDB.from('responses').insert(response);

  if (error) {
    console.error('[Aura] Assessment capture failed:', error);
  } else {
    console.log('[Aura] Assessment captured:', testId, 'q' + questionIndex, '=', answer);
  }
};

// Export user data in AI-friendly format
export const exportForAI = async (email) => {
  const { data: responses, error } = await auraDB.from('responses')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[Aura] Export failed:', error);
    return null;
  }

  const questions = responses
    .filter(r => r.question_id > 0)
    .map(r => ({
      question: r.snapshot?.q || `Question #${r.question_id}`,
      answer: r.snapshot?.a || String(r.answer),
      confidence: CONFIDENCE_LABELS[r.confidence - 1] || r.confidence,
      category: r.snapshot?.c || 'unknown',
      type: r.snapshot?.t || 'unknown',
      answered_at: r.created_at
    }));

  const assessments = {};
  responses.filter(r => r.test_id).forEach(r => {
    if (!assessments[r.test_id]) {
      assessments[r.test_id] = { name: r.snapshot?.name || r.test_id, items: [] };
    }
    assessments[r.test_id].items.push({
      question: r.snapshot?.q || `Item #${Math.abs(r.question_id)}`,
      answer: r.snapshot?.a || String(r.answer)
    });
  });

  return {
    user: email,
    exported_at: new Date().toISOString(),
    summary: {
      total_questions: questions.length,
      total_assessments: Object.keys(assessments).length
    },
    questions,
    assessments
  };
};
