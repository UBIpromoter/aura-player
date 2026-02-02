// ==================== ASSESSMENTS DATA ====================
// SYNC NOTE: This data should match index.html ASSESS_TESTS
//
// RULES:
// 1. NEVER delete a test - add 'archived: true' to hide
// 2. NEVER delete questions within a test - index matters for responses
// 3. NEVER reorder questions - index is stored in responses
// 4. Can ADD questions to the END of a test's items array

import { ASSESS_SCALES, ASSESS_C, getAssessColor } from './constants';

// Re-export for convenience
export { ASSESS_SCALES, ASSESS_C, getAssessColor };

// Full ASSESS_TESTS structure - sample showing key tests
// Complete data in index.html
export const ASSESS_TESTS = {
  // Big Five - Extraversion
  'bigfive-E': {
    name: 'Extraversion', icon: '🎉', color: 'violet', scale: 'likeme', parent: 'bigfive', trait: 'E',
    description: 'How you engage with the social world',
    items: [
      { q: "I am the life of the party", t: 'E', k: '+' },
      { q: "I feel comfortable around people", t: 'E', k: '+' },
      { q: "I start conversations", t: 'E', k: '+' },
      { q: "I talk to many different people at parties", t: 'E', k: '+' },
      { q: "I don't mind being the center of attention", t: 'E', k: '+' },
      { q: "I don't talk a lot", t: 'E', k: '-' },
      { q: "I keep in the background", t: 'E', k: '-' },
      { q: "I have little to say", t: 'E', k: '-' },
      { q: "I don't like to draw attention to myself", t: 'E', k: '-' },
      { q: "I am quiet around strangers", t: 'E', k: '-' },
    ]
  },

  // Big Five - Agreeableness
  'bigfive-A': {
    name: 'Agreeableness', icon: '🤝', color: 'violet', scale: 'likeme', parent: 'bigfive', trait: 'A',
    description: 'How you relate to others',
    items: [
      { q: "I sympathize with others' feelings", t: 'A', k: '+' },
      { q: "I am interested in people", t: 'A', k: '+' },
      { q: "I take time out for others", t: 'A', k: '+' },
      { q: "I feel others' emotions", t: 'A', k: '+' },
      { q: "I make people feel at ease", t: 'A', k: '+' },
      { q: "I am not really interested in others", t: 'A', k: '-' },
      { q: "I insult people", t: 'A', k: '-' },
      { q: "I am not interested in other people's problems", t: 'A', k: '-' },
      { q: "I feel little concern for others", t: 'A', k: '-' },
      { q: "I am hard to get to know", t: 'A', k: '-' },
    ]
  },

  // Big Five - Conscientiousness
  'bigfive-C': {
    name: 'Conscientiousness', icon: '📋', color: 'violet', scale: 'likeme', parent: 'bigfive', trait: 'C',
    description: 'How you approach tasks and goals',
    items: [
      { q: "I am always prepared", t: 'C', k: '+' },
      { q: "I pay attention to details", t: 'C', k: '+' },
      { q: "I get chores done right away", t: 'C', k: '+' },
      { q: "I like order", t: 'C', k: '+' },
      { q: "I follow a schedule", t: 'C', k: '+' },
      { q: "I leave my belongings around", t: 'C', k: '-' },
      { q: "I make a mess of things", t: 'C', k: '-' },
      { q: "I forget to put things back", t: 'C', k: '-' },
      { q: "I shirk my duties", t: 'C', k: '-' },
      { q: "I neglect my responsibilities", t: 'C', k: '-' },
    ]
  },

  // Big Five - Neuroticism
  'bigfive-N': {
    name: 'Emotional Range', icon: '🌊', color: 'violet', scale: 'likeme', parent: 'bigfive', trait: 'N',
    description: 'How you experience emotions',
    items: [
      { q: "I get stressed out easily", t: 'N', k: '+' },
      { q: "I worry about things", t: 'N', k: '+' },
      { q: "I am easily disturbed", t: 'N', k: '+' },
      { q: "I get upset easily", t: 'N', k: '+' },
      { q: "I change my mood a lot", t: 'N', k: '+' },
      { q: "I am relaxed most of the time", t: 'N', k: '-' },
      { q: "I seldom feel blue", t: 'N', k: '-' },
      { q: "I am not easily bothered by things", t: 'N', k: '-' },
      { q: "I rarely get irritated", t: 'N', k: '-' },
      { q: "I keep my emotions under control", t: 'N', k: '-' },
    ]
  },

  // Big Five - Openness
  'bigfive-O': {
    name: 'Openness', icon: '🎨', color: 'violet', scale: 'likeme', parent: 'bigfive', trait: 'O',
    description: 'How you explore ideas and experiences',
    items: [
      { q: "I have a vivid imagination", t: 'O', k: '+' },
      { q: "I have excellent ideas", t: 'O', k: '+' },
      { q: "I am quick to understand things", t: 'O', k: '+' },
      { q: "I use difficult words", t: 'O', k: '+' },
      { q: "I spend time reflecting on things", t: 'O', k: '+' },
      { q: "I am not interested in abstract ideas", t: 'O', k: '-' },
      { q: "I do not have a good imagination", t: 'O', k: '-' },
      { q: "I have difficulty understanding abstract ideas", t: 'O', k: '-' },
      { q: "I am not interested in theoretical discussions", t: 'O', k: '-' },
      { q: "I avoid philosophical discussions", t: 'O', k: '-' },
    ]
  },

  // ADHD Screen
  adhd: {
    name: 'ADHD Screen', icon: '⚡', color: 'blue', scale: 'frequency',
    items: [
      { q: "I have trouble wrapping up final details once the hard parts are done" },
      { q: "I have difficulty getting organized for tasks" },
      { q: "I have problems remembering appointments" },
      { q: "I avoid or delay starting tasks that require thought" },
      { q: "I fidget when I have to sit for a long time" },
      { q: "I feel driven by a motor, overly active" },
    ]
  },

  // Reasoning (IQ-style)
  reasoning: {
    name: 'Reasoning', icon: '🧠', color: 'blue', scale: 'iq',
    description: 'Logic, patterns, and problem-solving',
    items: [
      { q: "Hot is to Cold as Up is to:", o: ['Down', 'High', 'Sky', 'Left'], a: 0 },
      { q: "Book is to Reading as Fork is to:", o: ['Kitchen', 'Eating', 'Metal', 'Spoon'], a: 1 },
      { q: "Painter is to Brush as Writer is to:", o: ['Book', 'Pen', 'Story', 'Paper'], a: 1 },
      { q: "Fish is to School as Wolf is to:", o: ['Den', 'Pack', 'Forest', 'Hunt'], a: 1 },
      { q: "What comes next? 2, 4, 8, 16, __", o: ['24', '32', '20', '18'], a: 1 },
      { q: "What comes next? 3, 6, 9, 12, __", o: ['14', '16', '15', '18'], a: 2 },
      { q: "What comes next? 1, 1, 2, 3, 5, __", o: ['7', '8', '6', '9'], a: 1 },
      { q: "What comes next? 81, 27, 9, 3, __", o: ['0', '1', '2', '6'], a: 1 },
      { q: "All roses are flowers. Some flowers fade quickly. Therefore:", o: ['All roses fade quickly', 'Some roses may fade quickly', 'No roses fade quickly', 'Roses are not flowers'], a: 1 },
      { q: "If all Bloops are Razzies and all Razzies are Lazzies, then:", o: ['All Lazzies are Bloops', 'All Bloops are Lazzies', 'Some Lazzies are Bloops', 'No Bloops are Lazzies'], a: 1 },
      { q: "Tom is taller than Sam. Sam is taller than Pete. Who is shortest?", o: ['Tom', 'Sam', 'Pete', 'Cannot determine'], a: 2 },
      { q: "🔴🔵🔴🔵🔴 — What comes next?", o: ['🔴', '🔵', '🟢', '🟡'], a: 1 },
    ]
  },

  // Additional tests are in index.html:
  // - cognitive, attachment, risk, integrity
  // - shadow-M, shadow-N, shadow-P
  // - chronotype
  // - reasoning-2, reasoning-3
  // - starter-personality, starter-motivation, starter-thinking, starter-connection, starter-strategy
};

// Assessment categories
export const ASSESS_CATEGORIES = {
  starter: { name: 'Starter Pack', icon: '🚀', color: 'indigo', tests: ['starter-personality', 'starter-motivation', 'starter-thinking', 'starter-connection', 'starter-strategy'] },
  personality: { name: 'Personality', icon: '🎭', color: 'violet', tests: ['bigfive-E', 'bigfive-A', 'bigfive-C', 'bigfive-N', 'bigfive-O'] },
  character: { name: 'Character', icon: '💎', color: 'emerald', tests: ['integrity'] },
  shadow: { name: 'Shadow Self', icon: '🌑', color: 'slate', tests: ['shadow-M', 'shadow-N', 'shadow-P'] },
  mind: { name: 'Mind', icon: '🧠', color: 'blue', tests: ['adhd', 'cognitive', 'chronotype', 'reasoning', 'reasoning-2', 'reasoning-3'] },
  relationships: { name: 'Relationships', icon: '💚', color: 'pink', tests: ['attachment'] },
  behavior: { name: 'Behavior', icon: '🎲', color: 'amber', tests: ['risk'] },
};

export const ASSESS_TRAITS = {
  E: 'Extraversion',
  A: 'Agreeableness',
  C: 'Conscientiousness',
  N: 'Neuroticism',
  O: 'Openness'
};
