// Aura Player - Question Data
// Extracted from vG for clean component architecture

export const CATEGORIES = [
  { id: 'prediction', name: 'Predictions', icon: '🔮', color: 'amber' },
  { id: 'reasoning', name: 'Reasoning', icon: '🧠', color: 'violet' },
  { id: 'judgment', name: 'Judgment', icon: '⚖️', color: 'teal' },
];

// MC option colors - 5 distinct colors with 4 confidence shades each (light→dark)
export const MC_COLORS = [
  { hex: '#3b82f6', name: 'blue', tailwind: 'blue', shades: ['#93c5fd', '#60a5fa', '#3b82f6', '#1e40af'] },
  { hex: '#14b8a6', name: 'teal', tailwind: 'teal', shades: ['#5eead4', '#2dd4bf', '#14b8a6', '#0f766e'] },
  { hex: '#22c55e', name: 'green', tailwind: 'green', shades: ['#86efac', '#4ade80', '#22c55e', '#15803d'] },
  { hex: '#ec4899', name: 'pink', tailwind: 'pink', shades: ['#f9a8d4', '#f472b6', '#ec4899', '#be185d'] },
  { hex: '#8b5cf6', name: 'violet', tailwind: 'violet', shades: ['#c4b5fd', '#a78bfa', '#8b5cf6', '#6d28d9'] },
];

export const CONFIDENCE_LABELS = { 
  1: "Hunch", 
  2: "Leaning", 
  3: "Firm", 
  4: "Certain" 
};

export const QUESTIONS = [
  // ========== PREDICTIONS ==========
  { id: 1, type: 'binary', text: "Will Bitcoin exceed $150,000 before July 2026?", category: "prediction", preEvidence: [{ type: 'stat', label: 'Current Price', value: '$97,234' }, { type: 'stat', label: 'ATH', value: '$108,786' }] },
  { id: 3, type: 'binary', text: "Will GPT-5 be released before September 2026?", category: "prediction", preEvidence: [{ type: 'stat', label: 'GPT-4 Release', value: 'March 2023' }] },
  { id: 6, type: 'multiple', text: "What will be the dominant AI interface by 2030?", category: "prediction", options: ["Text chat", "Voice assistants", "AR/VR agents", "Brain-computer interfaces", "Autonomous agents"] },
  { id: 9, type: 'binary', text: "Will humans land on Mars before 2035?", category: "prediction", preEvidence: [{ type: 'stat', label: 'SpaceX target', value: '2029' }, { type: 'stat', label: 'NASA target', value: '2040' }] },
  { id: 12, type: 'multiple', text: "Most likely cause of human extinction?", category: "prediction", options: ["AI/technology", "Climate change", "Pandemic/bioweapon", "Nuclear war", "Asteroid impact"] },
  { id: 13, type: 'binary', text: "Will Taylor Swift announce retirement before 2030?", category: "prediction" },
  { id: 15, type: 'binary', text: "Will lab-grown meat achieve price parity by 2028?", category: "prediction", preEvidence: [{ type: 'stat', label: '2013 cost', value: '$330,000/burger' }, { type: 'stat', label: '2025 cost', value: '$6/burger' }] },
  { id: 18, type: 'binary', text: "Will any AI pass an 8-hour Turing test by 2027?", category: "prediction" },
  { id: 26, type: 'binary', text: "Will electric vehicles exceed 50% of US new car sales by 2030?", category: "prediction", preEvidence: [{ type: 'stat', label: '2024 US EV share', value: '~9%' }] },
  { id: 27, type: 'multiple', text: "Which company will dominate AI by 2030?", category: "prediction", options: ["OpenAI", "Google/DeepMind", "Anthropic", "Meta", "A company that doesn't exist yet"] },
  { id: 30, type: 'binary', text: "Will remote work remain dominant in tech by 2030?", category: "prediction" },
  { id: 33, type: 'binary', text: "Will quantum computers break current encryption by 2035?", category: "prediction" },
  { id: 39, type: 'binary', text: "Will a woman be elected US President by 2032?", category: "prediction" },
  { id: 41, type: 'binary', text: "Will China's GDP surpass the US by 2035?", category: "prediction", preEvidence: [{ type: 'stat', label: 'US GDP (2024)', value: '$28.8T' }, { type: 'stat', label: 'China GDP (2024)', value: '$18.5T' }] },
  { id: 42, type: 'binary', text: "Will commercial fusion power be operational by 2040?", category: "prediction" },
  
  // ========== REASONING ==========
  { id: 2, type: 'multiple', text: "Is a hot dog a sandwich?", category: "reasoning", options: ["Yes, it's bread with filling", "No, it's its own category", "It's a taco (single folded bread)", "Depends on regional definition"], preEvidence: [{ type: 'note', text: 'Merriam-Webster: sandwich = "two or more slices of bread with filling"' }] },
  { id: 7, type: 'binary', text: "Is water wet?", category: "reasoning", preEvidence: [{ type: 'note', text: 'Wet = covered in water. Can water cover itself?' }] },
  { id: 10, type: 'multiple', text: "Is a Pop-Tart a ravioli?", category: "reasoning", options: ["Yes - filling enclosed in carb wrapper", "No - ravioli must be savory", "No - ravioli must be pasta", "It's actually a dumpling"] },
  { id: 17, type: 'multiple', text: "Ship of Theseus: replace every part, same ship?", category: "reasoning", options: ["Yes - continuity of identity", "No - it's a new ship", "The original uses old parts", "Identity is an illusion"] },
  { id: 19, type: 'binary', text: "Is the simulation hypothesis likely?", category: "reasoning", preEvidence: [{ type: 'note', text: "Bostrom's trilemma argument" }] },
  { id: 21, type: 'binary', text: "Is 847 + 256 greater than 1100?", category: "reasoning" },
  { id: 22, type: 'multiple', text: "What color results from mixing red + blue?", category: "reasoning", options: ["Green", "Purple", "Orange", "Brown"] },
  { id: 23, type: 'binary', text: "Does 'rhythm' contain a vowel (a,e,i,o,u)?", category: "reasoning" },
  { id: 24, type: 'multiple', text: "What comes next: 2, 4, 8, 16, __?", category: "reasoning", options: ["24", "32", "20", "18"] },
  { id: 25, type: 'binary', text: "Is Australia larger than Europe (by land area)?", category: "reasoning" },
  { id: 28, type: 'binary', text: "Is free will an illusion?", category: "reasoning" },
  { id: 34, type: 'binary', text: "Is cereal a soup?", category: "reasoning" },
  { id: 36, type: 'binary', text: "Is 17 a prime number?", category: "reasoning" },
  { id: 37, type: 'multiple', text: "What is √144?", category: "reasoning", options: ["10", "11", "12", "14"] },
  { id: 38, type: 'binary', text: "Is the Pacific Ocean the largest ocean?", category: "reasoning" },
  { id: 81, type: 'binary', text: "Can a teleporter that destroys and recreates you preserve your identity?", category: "reasoning" },
  { id: 82, type: 'multiple', text: "What makes an action morally right?", category: "reasoning", options: ["Consequences (utilitarianism)", "Intent (deontology)", "Character (virtue ethics)", "Social contract", "Nothing objective"] },
  { id: 83, type: 'binary', text: "Is it ethical to create sentient AI?", category: "reasoning" },
  { id: 85, type: 'multiple', text: "What is the nature of consciousness?", category: "reasoning", options: ["Physical brain processes", "Emergent property", "Fundamental like mass/charge", "Illusion", "Unknowable"] },
  { id: 86, type: 'binary', text: "Is mathematics discovered (not invented)?", category: "reasoning" },
  
  // ========== JUDGMENT ==========
  { id: 4, type: 'multiple', text: "Which animal would win in a fight?", category: "judgment", options: ["100 duck-sized horses", "1 horse-sized duck", "It depends on the terrain", "They'd become friends"] },
  { id: 5, type: 'binary', text: "Is this research methodology sound? (Deepfake detection, n=50)", category: "judgment", preEvidence: [{ type: 'stat', label: 'Sample Size', value: 'n=50' }, { type: 'stat', label: 'Claimed Accuracy', value: '95%' }] },
  { id: 8, type: 'multiple', text: "Best programming language for beginners in 2026?", category: "judgment", options: ["Python", "JavaScript", "Scratch/visual coding", "Natural language (AI-assisted)", "Rust"] },
  { id: 11, type: 'binary', text: "Could an average person beat a goose in a fight?", category: "judgment", preEvidence: [{ type: 'stat', label: 'Avg goose weight', value: '8-14 lbs' }] },
  { id: 14, type: 'multiple', text: "What should happen to daylight saving time?", category: "judgment", options: ["Keep switching twice a year", "Permanent daylight time", "Permanent standard time", "Let each state decide"] },
  { id: 16, type: 'binary', text: "Could Batman beat Superman (no prep, no kryptonite)?", category: "judgment" },
  { id: 20, type: 'multiple', text: "Most important skill for the next decade?", category: "judgment", options: ["AI/ML literacy", "Critical thinking", "Emotional intelligence", "Adaptability", "Domain expertise"] },
  { id: 29, type: 'multiple', text: "What's the most ethical diet?", category: "judgment", options: ["Vegan", "Vegetarian", "Pescatarian", "Local/sustainable omnivore", "Lab-grown meat when available"] },
  { id: 31, type: 'binary', text: "Should social media require age verification?", category: "judgment" },
  { id: 32, type: 'multiple', text: "Most overrated tech of the 2020s?", category: "judgment", options: ["NFTs", "Metaverse/VR", "Crypto/blockchain", "AI assistants", "Self-driving cars"] },
  { id: 35, type: 'multiple', text: "Best way to make friends as an adult?", category: "judgment", options: ["Hobbies/clubs", "Through work", "Apps (Bumble BFF, etc.)", "Neighbors/community", "Accept loneliness"] },
  { id: 40, type: 'multiple', text: "What age should you be allowed to vote?", category: "judgment", options: ["16", "18", "21", "25", "Any age"] },
  { id: 116, type: 'binary', text: "Should billionaires exist?", category: "judgment" },
  { id: 117, type: 'multiple', text: "What's the best economic system?", category: "judgment", options: ["Capitalism", "Socialism", "Mixed economy", "Something new", "Depends on context"] },
  { id: 118, type: 'binary', text: "Should college be free?", category: "judgment" },
  { id: 120, type: 'multiple', text: "How should AI be regulated?", category: "judgment", options: ["Strict government control", "Industry self-regulation", "International treaty", "Minimal regulation", "Case-by-case basis"] },
  { id: 122, type: 'binary', text: "Is the death penalty ever justified?", category: "judgment" },
  { id: 124, type: 'binary', text: "Should drugs be decriminalized?", category: "judgment" },
  { id: 125, type: 'binary', text: "Is universal basic income a good idea?", category: "judgment" },
  { id: 321, type: 'binary', text: "Should AI-generated art be allowed in art competitions?", category: "judgment" },
];

// Shuffle helper
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate fake community results for demo mode
export const generateFakeResults = (question) => {
  const seed = question.id;
  const random = (n) => ((seed * 9301 + 49297) % 233280) / 233280 * n;
  
  if (question.type === 'binary') {
    const yesBase = 30 + random(40);
    const total = 50 + Math.floor(random(200));
    return {
      totalAnswers: total,
      distribution: {
        yes: Math.round(total * yesBase / 100),
        no: Math.round(total * (100 - yesBase) / 100),
      }
    };
  } else {
    const options = question.options || [];
    const total = 50 + Math.floor(random(200));
    const distribution = {};
    let remaining = total;
    options.forEach((opt, i) => {
      if (i === options.length - 1) {
        distribution[opt] = remaining;
      } else {
        const count = Math.floor(remaining * (0.1 + random(0.5)));
        distribution[opt] = count;
        remaining -= count;
      }
    });
    return { totalAnswers: total, distribution };
  }
};
