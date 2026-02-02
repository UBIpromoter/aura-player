// Theme helper function - returns appropriate Tailwind classes for dark/light mode
export const TH = (token, dark) => ({
  // Text colors
  'text-primary': dark ? 'text-white' : 'text-gray-900',
  'text-secondary': dark ? 'text-gray-300' : 'text-gray-700',
  'text-muted': dark ? 'text-gray-400' : 'text-gray-600',
  'text-subtle': dark ? 'text-gray-500' : 'text-gray-400',
  'text-faint': dark ? 'text-gray-600' : 'text-gray-400',
  'text-inverted': dark ? 'text-gray-900' : 'text-white',
  // Background colors
  'bg-main': dark ? 'bg-gray-950' : 'bg-gray-50',
  'bg-card': dark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200',
  'bg-card-shine': dark ? 'bg-gray-900 shine-card shine-gray' : 'bg-white border border-gray-200',
  'bg-elevated': dark ? 'bg-gray-800' : 'bg-gray-200',
  'bg-input': dark ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900 placeholder-gray-400',
  'bg-surface': dark ? 'bg-gray-900' : 'bg-white',
  'bg-overlay': dark ? 'bg-gray-900/50' : 'bg-gray-100',
  // Border colors
  'border-base': dark ? 'border-gray-800' : 'border-gray-200',
  'border-subtle': dark ? 'border-gray-700' : 'border-gray-300',
  // Interactive states
  'btn-secondary': dark ? 'bg-gray-800/60 text-gray-500 hover:bg-gray-700/60' : 'bg-gray-200 text-gray-500',
  'btn-ghost': dark ? 'text-gray-300 active:text-white' : 'text-gray-600 active:text-gray-900',
  // Status colors
  'text-emerald': dark ? 'text-emerald-400' : 'text-emerald-600',
  'text-rose': dark ? 'text-rose-400' : 'text-rose-600',
  'text-violet': dark ? 'text-violet-400' : 'text-violet-600',
  'text-sky': dark ? 'text-sky-300' : 'text-sky-500',
  'text-blue': dark ? 'text-blue-400' : 'text-blue-600',
  // Additional patterns
  'text-dim': dark ? 'text-gray-400' : 'text-gray-500',
  'text-bright': dark ? 'text-gray-100' : 'text-gray-900',
  'bg-card-simple': dark ? 'bg-gray-900' : 'bg-white border border-gray-200',
  'bg-inverted': dark ? 'bg-white' : 'bg-gray-900',
  'bg-disabled': dark ? 'bg-gray-800 text-gray-600' : 'bg-gray-200 text-gray-400',
  'chip-violet': dark ? 'bg-violet-900/30 text-violet-400' : 'bg-violet-100 text-violet-700',
}[token] || '');

// Confidence display helpers
export const CONFIDENCE_LABELS = { 1: "Hunch", 2: "Leaning", 3: "Firm", 4: "Certain" };
export const getStars = (count) => '★'.repeat(Math.min(Math.max(count, 1), 4));

// Multiple choice colors
export const MC_COLORS = [
  { hex: '#3b82f6', name: 'blue', shades: ['#93c5fd', '#60a5fa', '#3b82f6', '#2563eb'], rgb: '59, 130, 246' },
  { hex: '#8b5cf6', name: 'violet', shades: ['#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed'], rgb: '139, 92, 246' },
  { hex: '#14b8a6', name: 'teal', shades: ['#5eead4', '#2dd4bf', '#14b8a6', '#0d9488'], rgb: '20, 184, 166' },
  { hex: '#06b6d4', name: 'cyan', shades: ['#67e8f9', '#22d3ee', '#06b6d4', '#0891b2'], rgb: '6, 182, 212' },
  { hex: '#ec4899', name: 'pink', shades: ['#f9a8d4', '#f472b6', '#ec4899', '#db2777'], rgb: '236, 72, 153' },
];

// Category colors
export const CATEGORY_COLORS = {
  prediction: { dark: 'bg-amber-900/30 text-amber-400', light: 'bg-amber-100 text-amber-700' },
  reasoning: { dark: 'bg-violet-900/30 text-violet-400', light: 'bg-violet-100 text-violet-700' },
  judgment: { dark: 'bg-teal-900/30 text-teal-400', light: 'bg-teal-100 text-teal-700' },
};

export const GLOW_MAP = {
  prediction: 'glow-amber',
  reasoning: 'glow-violet',
  judgment: 'glow-teal'
};
