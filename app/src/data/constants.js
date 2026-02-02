// ==================== CORE CONSTANTS ====================
// Categories, types, and helper functions

export const CAT_MAP = {
  p: { id: 'prediction', name: 'Predictions', icon: '🔮', color: 'amber' },
  r: { id: 'reasoning', name: 'Reasoning', icon: '🧠', color: 'violet' },
  j: { id: 'judgment', name: 'Judgment', icon: '⚖️', color: 'emerald' },
};

export const T = { b: 'binary', m: 'multiple' };
export const C = Object.fromEntries(Object.entries(CAT_MAP).map(([k, v]) => [k, v.id]));

// Evidence helper
export const ev = (t, l, v) => ({
  type: t === 's' ? 'stat' : 'note',
  ...(l && { label: l }),
  ...(t === 's' ? { value: v } : { text: v })
});

// Assessment scale labels (used in snapshots)
export const SCALE_LABELS = {
  likeme: ['Not at all', 'A little', 'Somewhat', 'Very much', 'Extremely'],
  agreement: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
  frequency: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
  likelihood: ['Very unlikely', 'Unlikely', 'Neutral', 'Likely', 'Very likely']
};

// Confidence labels
export const CONFIDENCE_LABELS = ['Hunch', 'Leaning', 'Firm', 'Certain'];

// Assessment scales (full definition)
export const ASSESS_SCALES = {
  frequency: [
    { v: 1, l: 'Never' }, { v: 2, l: 'Rarely' }, { v: 3, l: 'Sometimes' },
    { v: 4, l: 'Often' }, { v: 5, l: 'Always' },
  ],
  agreement: [
    { v: 1, l: 'Strongly Disagree' }, { v: 2, l: 'Disagree' }, { v: 3, l: 'Neutral' },
    { v: 4, l: 'Agree' }, { v: 5, l: 'Strongly Agree' },
  ],
  likeme: [
    { v: 1, l: 'Not like me' }, { v: 2, l: 'A little unlike me' }, { v: 3, l: 'Neutral' },
    { v: 4, l: 'A little like me' }, { v: 5, l: 'Very like me' },
  ],
  likelihood: [
    { v: 1, l: 'Never would' }, { v: 2, l: 'Unlikely' }, { v: 3, l: 'Maybe' },
    { v: 4, l: 'Likely' }, { v: 5, l: 'Definitely' },
  ],
  iq: null, // Custom options per question
};

// Assessment color configuration
export const ASSESS_C = {
  violet: { bg: 'bg-violet-500', text: 'text-violet-400', textLight: 'text-violet-600', light: 'bg-violet-500/20', lightBg: 'bg-violet-100', border: 'border-violet-500/30', borderLight: 'border-violet-300', grad: 'from-violet-600 to-violet-500' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-400', textLight: 'text-blue-600', light: 'bg-blue-500/20', lightBg: 'bg-blue-100', border: 'border-blue-500/30', borderLight: 'border-blue-300', grad: 'from-blue-600 to-blue-500' },
  teal: { bg: 'bg-teal-500', text: 'text-teal-400', textLight: 'text-teal-600', light: 'bg-teal-500/20', lightBg: 'bg-teal-100', border: 'border-teal-500/30', borderLight: 'border-teal-300', grad: 'from-teal-600 to-teal-500' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-400', textLight: 'text-rose-600', light: 'bg-rose-500/20', lightBg: 'bg-rose-100', border: 'border-rose-500/30', borderLight: 'border-rose-300', grad: 'from-rose-600 to-rose-500' },
  pink: { bg: 'bg-fuchsia-500', text: 'text-fuchsia-400', textLight: 'text-fuchsia-600', light: 'bg-fuchsia-500/20', lightBg: 'bg-fuchsia-100', border: 'border-fuchsia-500/30', borderLight: 'border-fuchsia-300', grad: 'from-fuchsia-600 to-fuchsia-500' },
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', textLight: 'text-emerald-600', light: 'bg-emerald-500/20', lightBg: 'bg-emerald-100', border: 'border-emerald-500/30', borderLight: 'border-emerald-300', grad: 'from-emerald-600 to-emerald-500' },
  slate: { bg: 'bg-slate-500', text: 'text-slate-400', textLight: 'text-slate-600', light: 'bg-slate-500/20', lightBg: 'bg-slate-100', border: 'border-slate-500/30', borderLight: 'border-slate-300', grad: 'from-slate-600 to-slate-500' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-400', textLight: 'text-amber-600', light: 'bg-amber-500/20', lightBg: 'bg-amber-100', border: 'border-amber-500/30', borderLight: 'border-amber-300', grad: 'from-amber-600 to-amber-500' },
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-400', textLight: 'text-indigo-600', light: 'bg-indigo-500/20', lightBg: 'bg-indigo-100', border: 'border-indigo-500/30', borderLight: 'border-indigo-300', grad: 'from-indigo-600 to-indigo-500' },
};

export const getAssessColor = (color, darkMode) => {
  const c = ASSESS_C[color];
  return {
    ...c,
    text: darkMode ? c.text : c.textLight,
    light: darkMode ? c.light : c.lightBg,
    border: darkMode ? c.border : c.borderLight
  };
};

// Storage keys
export const STORAGE_KEY = 'aura-demo-vI';
export const ASSESS_STORAGE_KEY = 'aura-assessments-v1';
