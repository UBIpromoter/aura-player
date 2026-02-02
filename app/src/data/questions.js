// ==================== QUESTIONS DATABASE ====================
// SYNC NOTE: This data should match index.html Q_RAW
// Full extraction will happen during complete migration
//
// RULES:
// 1. NEVER reuse an ID - always increment (current max: 455, next: 456+)
// 2. NEVER delete - set x:1 to archive instead
// 3. Minor edits (typos) OK, major changes = new question with new ID
//
// SCHEMA:
// { id, v (version), t (type: b=binary, m=multiple), c (category: p/r/j),
//   q (text), o (options array), e (evidence), x (archived if truthy) }
//
// CATEGORIES: p=prediction, r=reasoning, j=judgment

import { T, C, CAT_MAP, ev } from './constants';

export const BATCHES = { 1: { name: 'Original', date: '2025-01', count: 440 } };

// Sample of Q_RAW - full data in index.html (455 questions)
// This shows the structure; full sync during migration
export const Q_RAW = [
  { id:1, v:1, t:'b', c:'p', q:"Will Bitcoin exceed $150,000 before July 2026?", e:[ev('s','Current Price','$97,234'), ev('s','ATH','$108,786')] },
  { id:2, v:1, t:'m', c:'r', q:"Is a hot dog a sandwich?", o:["Yes, it's bread with filling","No, it's its own category","It's a taco (single folded bread)","Depends on regional definition"], e:[ev('n',null,'Merriam-Webster: sandwich = "two or more slices of bread with filling"')] },
  { id:3, v:1, t:'b', c:'p', q:"Will GPT-5 be released before September 2026?", e:[ev('s','GPT-4 Release','March 2023')] },
  { id:4, v:1, t:'m', c:'j', q:"Which animal would win in a fight?", o:["100 duck-sized horses","1 horse-sized duck","It depends on the terrain","They'd become friends"] },
  { id:7, v:1, t:'b', c:'r', q:"Is water wet?", e:[ev('n',null,'Wet = covered in water. Can water cover itself?')] },
  { id:9, v:1, t:'b', c:'p', q:"Will humans land on Mars before 2035?", e:[ev('s','SpaceX target','2029'), ev('s','NASA target','2040')] },
  // ... 449 more questions in index.html
];

// Expand to full format
export const QUESTIONS = Q_RAW.filter(q => !q.x).map(q => ({
  id: q.id,
  type: T[q.t],
  text: q.q,
  category: C[q.c],
  ...(q.o && { options: q.o }),
  ...(q.e && { preEvidence: q.e }),
  _v: q.v,
}));

export const getCategoryList = () => Object.values(CAT_MAP);

// Onboarding questions
export const ONBOARDING_QUESTIONS = [
  { id: 'onboard-1', text: "Which came first?", options: ["The chicken", "The egg"], type: 'binary' },
  { id: 'onboard-2', text: "Better pizza topping:", options: ["Pepperoni", "Pineapple"], type: 'binary' },
  { id: 'onboard-3', text: "In 10 years, most people will...", options: ["Still drive cars themselves", "Use self-driving cars"], type: 'binary' },
  { id: 'onboard-4', text: "Is a hot dog a sandwich?", options: ["Yes, obviously", "No way"], type: 'binary' },
  { id: 'onboard-5', text: "Will humans live on Mars in your lifetime?", options: ["Yes", "No"], type: 'binary' },
  { id: 'onboard-6', text: "Better superpower:", options: ["Flight", "Invisibility"], type: 'binary' },
  { id: 'onboard-7', text: "Coffee in the morning?", options: ["Can't function without it", "Don't need it"], type: 'binary' },
];
