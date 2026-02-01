// Re-export all data modules
// Usage: import { SAMPLE_QUESTIONS, CATEGORIES, ... } from './data'

export { DEVICES } from './devices';
export { CATEGORIES } from './categories';
export { 
  CONFIDENCE_LABELS, 
  FLAG_REASONS, 
  CANT_ANSWER_REASONS, 
  COLOR_MAP,
  USER_TIERS,
  QUESTION_TYPES,
  QUESTION_STATUS,
  DEFAULT_QOTD_REWARD,
  TURK_DEBOUNCE_MS,
  MAX_TIP_SHOWS
} from './constants';
export { QOTD_POOL, getRandomQOTD } from './qotd';
export { TURK_TYPES, TURK_TASKS } from './turk';
export { SAMPLE_QUESTIONS } from './questions';
