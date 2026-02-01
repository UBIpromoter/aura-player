// Aura Player - Questions Data
// Full data in prototype (440 questions), sample here for reference

export const CATEGORIES = [
  { id: 'prediction', name: 'Predictions', icon: '🔮', color: 'amber' },
  { id: 'reasoning', name: 'Reasoning', icon: '🧠', color: 'violet' },
  { id: 'judgment', name: 'Judgment', icon: '⚖️', color: 'teal' },
];

// Sample questions (440 total in prototype)
export const SAMPLE_QUESTIONS = [
  // PREDICTIONS
  { id: 1, type: 'binary', text: "Will Bitcoin exceed $150,000 before July 2026?", category: "prediction" },
  { id: 3, type: 'binary', text: "Will GPT-5 be released before September 2026?", category: "prediction" },
  { id: 6, type: 'multiple', text: "What will be the dominant AI interface by 2030?", category: "prediction", options: ["Text chat", "Voice assistants", "AR/VR agents", "Brain-computer interfaces", "Autonomous agents"] },
  { id: 9, type: 'binary', text: "Will humans land on Mars before 2035?", category: "prediction" },
  { id: 12, type: 'multiple', text: "Most likely cause of human extinction?", category: "prediction", options: ["AI/technology", "Climate change", "Pandemic/bioweapon", "Nuclear war", "Asteroid impact"] },
  { id: 27, type: 'multiple', text: "Which company will dominate AI by 2030?", category: "prediction", options: ["OpenAI", "Google/DeepMind", "Anthropic", "Meta", "New player"] },
  
  // REASONING
  { id: 2, type: 'multiple', text: "Is a hot dog a sandwich?", category: "reasoning", options: ["Yes, it's bread with filling", "No, it's its own category", "It's a taco", "Depends on definition"] },
  { id: 7, type: 'binary', text: "Is water wet?", category: "reasoning" },
  { id: 17, type: 'multiple', text: "Ship of Theseus: replace every part, same ship?", category: "reasoning", options: ["Yes - continuity", "No - new ship", "Original uses old parts", "Identity is illusion"] },
  { id: 21, type: 'binary', text: "Is 847 + 256 greater than 1100?", category: "reasoning" },
  { id: 28, type: 'binary', text: "Is free will an illusion?", category: "reasoning" },
  
  // JUDGMENT
  { id: 4, type: 'multiple', text: "Which animal would win in a fight?", category: "judgment", options: ["100 duck-sized horses", "1 horse-sized duck", "Depends on terrain", "They'd become friends"] },
  { id: 8, type: 'multiple', text: "Best programming language for beginners in 2026?", category: "judgment", options: ["Python", "JavaScript", "Scratch/visual", "Natural language (AI)", "Rust"] },
  { id: 20, type: 'multiple', text: "Most important skill for the next decade?", category: "judgment", options: ["AI/ML literacy", "Critical thinking", "Emotional intelligence", "Adaptability", "Domain expertise"] },
  { id: 31, type: 'binary', text: "Should social media require age verification?", category: "judgment" },
  { id: 32, type: 'multiple', text: "Most overrated tech of the 2020s?", category: "judgment", options: ["NFTs", "Metaverse/VR", "Crypto/blockchain", "AI assistants", "Self-driving cars"] },
];

export const getQuestionsByCategory = (categoryId) => 
  SAMPLE_QUESTIONS.filter(q => q.category === categoryId);
