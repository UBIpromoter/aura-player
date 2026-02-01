// Application constants: labels, colors, reasons

// Confidence levels (1-4)
export const CONFIDENCE_LABELS = { 
  1: "Uncertain", 
  2: "Leaning", 
  3: "Confident", 
  4: "Certain" 
};

// Reasons for flagging questions
export const FLAG_REASONS = [
  "Unclear question", 
  "Unanswerable", 
  "Duplicate", 
  "Biased/leading", 
  "Inappropriate", 
  "Other"
];

// Reasons for "Can't Answer"
export const CANT_ANSWER_REASONS = [
  "Not enough information", 
  "Question is ambiguous", 
  "Outside my expertise", 
  "Conflicting evidence", 
  "Question needs clarification"
];

// Color utility - maps color name to Tailwind classes and hex
export const COLOR_MAP = {
  amber: { 
    bg: 'bg-amber-500', 
    bgLight: 'bg-amber-900/20', 
    bgMed: 'bg-amber-900/40', 
    text: 'text-amber-400', 
    border: 'border-amber-500/30', 
    hex: '#f59e0b' 
  },
  cyan: { 
    bg: 'bg-cyan-500', 
    bgLight: 'bg-cyan-900/20', 
    bgMed: 'bg-cyan-900/40', 
    text: 'text-cyan-400', 
    border: 'border-cyan-500/30', 
    hex: '#06b6d4' 
  },
  rose: { 
    bg: 'bg-rose-500', 
    bgLight: 'bg-rose-900/20', 
    bgMed: 'bg-rose-900/40', 
    text: 'text-rose-400', 
    border: 'border-rose-500/30', 
    hex: '#f43f5e' 
  },
  pink: { 
    bg: 'bg-pink-500', 
    bgLight: 'bg-pink-900/20', 
    bgMed: 'bg-pink-900/40', 
    text: 'text-pink-400', 
    border: 'border-pink-500/30', 
    hex: '#ec4899' 
  },
  emerald: { 
    bg: 'bg-emerald-500', 
    bgLight: 'bg-emerald-900/20', 
    bgMed: 'bg-emerald-900/40', 
    text: 'text-emerald-400', 
    border: 'border-emerald-500/30', 
    hex: '#10b981' 
  },
  blue: { 
    bg: 'bg-blue-500', 
    bgLight: 'bg-blue-900/20', 
    bgMed: 'bg-blue-900/40', 
    text: 'text-blue-400', 
    border: 'border-blue-500/30', 
    hex: '#3b82f6' 
  },
  violet: { 
    bg: 'bg-violet-500', 
    bgLight: 'bg-violet-900/20', 
    bgMed: 'bg-violet-900/40', 
    text: 'text-violet-400', 
    border: 'border-violet-500/30', 
    hex: '#8b5cf6' 
  },
};

// User tiers
export const USER_TIERS = {
  ANONYMOUS: 'anonymous',
  NAMED: 'named',
  VERIFIED: 'verified'
};

// Question types
export const QUESTION_TYPES = {
  BINARY: 'binary',
  MULTIPLE: 'multiple'
};

// Question statuses
export const QUESTION_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  RESOLVED: 'resolved'
};

// Default QOTD reward points
export const DEFAULT_QOTD_REWARD = 25;

// Turk task debounce delay (ms)
export const TURK_DEBOUNCE_MS = 800;

// Max tips to show before auto-dismissing
export const MAX_TIP_SHOWS = 3;
