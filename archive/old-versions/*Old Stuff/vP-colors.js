// vP Color Scheme - Multiple Choice Options A→E
// Order: blue, violet, teal, cyan, pink

export const MC_COLORS = [
  '#3b82f6', // A - blue
  '#8b5cf6', // B - violet
  '#14b8a6', // C - teal
  '#06b6d4', // D - cyan
  '#ec4899', // E - pink
];

// Confidence shades (levels 1→4, light→dark)
export const CONF_SHADES = {
  blue:   ['#93c5fd', '#60a5fa', '#3b82f6', '#2563eb'], // A
  violet: ['#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed'], // B
  teal:   ['#5eead4', '#2dd4bf', '#14b8a6', '#0d9488'], // C
  cyan:   ['#67e8f9', '#22d3ee', '#06b6d4', '#0891b2'], // D
  pink:   ['#f9a8d4', '#f472b6', '#ec4899', '#db2777'], // E
};

// Ring colors for selected state
export const RING_COLORS = [
  'ring-blue-400',   // A
  'ring-violet-400', // B
  'ring-teal-400',   // C
  'ring-cyan-400',   // D
  'ring-pink-400',   // E
];

// Tailwind class names by option index
export const TAILWIND_COLORS = [
  { bg: 'bg-blue-500',   text: 'text-blue-500',   border: 'border-blue-500' },   // A
  { bg: 'bg-violet-500', text: 'text-violet-500', border: 'border-violet-500' }, // B
  { bg: 'bg-teal-500',   text: 'text-teal-500',   border: 'border-teal-500' },   // C
  { bg: 'bg-cyan-500',   text: 'text-cyan-500',   border: 'border-cyan-500' },   // D
  { bg: 'bg-pink-500',   text: 'text-pink-500',   border: 'border-pink-500' },   // E
];

// Gradient backgrounds for active/selected buttons
export const GRADIENTS = [
  'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)', // A - blue
  'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)', // B - violet
  'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)', // C - teal
  'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)', // D - cyan
  'linear-gradient(135deg, #db2777 0%, #ec4899 50%, #f472b6 100%)', // E - pink
];
