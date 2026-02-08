// ==================== UNIFIED COLOR SYSTEM ====================
// Single source of truth for all Aura colors
//
// ADDING A NEW COLOR? Just add it here. Everything derives from this.
// ================================================================

// Hex values for each color (base 500 and lighter variant)
const COLOR_HEX = {
  violet:  { base: '#8b5cf6', light: '#a78bfa', rgb: '139, 92, 246' },
  blue:    { base: '#3b82f6', light: '#60a5fa', rgb: '59, 130, 246' },
  teal:    { base: '#14b8a6', light: '#2dd4bf', rgb: '20, 184, 166' },
  rose:    { base: '#f43f5e', light: '#fb7185', rgb: '244, 63, 94' },
  pink:    { base: '#d946ef', light: '#e879f9', rgb: '217, 70, 239', tw: 'fuchsia' }, // Uses Tailwind's fuchsia
  emerald: { base: '#10b981', light: '#34d399', rgb: '16, 185, 129' },
  slate:   { base: '#64748b', light: '#94a3b8', rgb: '100, 116, 139' },
  amber:   { base: '#f59e0b', light: '#fbbf24', rgb: '245, 158, 11' },
  indigo:  { base: '#6366f1', light: '#818cf8', rgb: '99, 102, 241' },
  cyan:    { base: '#06b6d4', light: '#67e8f9', rgb: '6, 182, 212' },
  gray:    { base: '#6b7280', light: '#9ca3af', rgb: '107, 114, 128' },
};

// Helper: get Tailwind color name (pink uses fuchsia)
const tw = (color) => COLOR_HEX[color]?.tw || color;

// ==================== DERIVED: ASSESS_C ====================
// Tailwind classes for assessment colors (dark and light mode variants)
const ASSESS_C = Object.fromEntries(
  Object.keys(COLOR_HEX).filter(c => c !== 'gray' && c !== 'cyan').map(color => {
    const t = tw(color);
    return [color, {
      bg: `bg-${t}-500`,
      text: `text-${t}-400`,
      textLight: `text-${t}-600`,
      light: `bg-${t}-500/20`,
      lightBg: `bg-${t}-100`,
      border: `border-${t}-500/30`,
      borderLight: `border-${t}-300`,
      grad: `from-${t}-600 to-${t}-500`,
    }];
  })
);

// ==================== DERIVED: PROGRESS_GRADIENTS ====================
// Hex gradients for SVG progress circles
const PROGRESS_GRADIENTS = Object.fromEntries(
  Object.entries(COLOR_HEX).map(([color, hex]) => [color, { from: hex.base, to: hex.light }])
);

// ==================== DERIVED: Assessment Likert Button Styles ====================
// 5 intensity levels for Likert scale buttons
const makeGradientStyles = () => Object.fromEntries(
  Object.keys(ASSESS_C).map(color => {
    const t = tw(color);
    return [color, [
      `bg-${t}-950/30 border-${t}-800/40`,
      `bg-${t}-950/50 border-${t}-700/50`,
      `bg-${t}-900/40 border-${t}-600/50`,
      `bg-${t}-900/60 border-${t}-500/60`,
      `bg-${t}-800/70 border-${t}-400/70`,
    ]];
  })
);

const makeSelectedStyles = () => Object.fromEntries(
  Object.keys(ASSESS_C).map(color => {
    const t = tw(color);
    return [color, `bg-${t}-600 ring-${t}-400 border-${t}-400`];
  })
);

const makePendingStyles = () => Object.fromEntries(
  Object.keys(ASSESS_C).map(color => {
    const t = tw(color);
    return [color, `bg-${t}-600 border-${t}-400`];
  })
);

const makeNumColors = () => Object.fromEntries(
  Object.keys(ASSESS_C).map(color => {
    const t = tw(color);
    return [color, `text-${t}-400/70`];
  })
);

// ==================== DERIVED: AnalysisCard colorStyles ====================
const makeAnalysisCardStyles = (darkMode) => Object.fromEntries(
  Object.keys(ASSESS_C).map(color => {
    const t = tw(color);
    return [color, {
      bg: darkMode ? `bg-${t}-900/20 border-${t}-500/30` : `bg-${t}-50 border-${t}-200`,
      text: `text-${t}-400`,
      bar: `bg-${t}-500`,
    }];
  })
);

// ==================== DERIVED: Celebration Glow Color ====================
const getCelebrationGlowColor = (colorName) => COLOR_HEX[colorName]?.base || COLOR_HEX.violet.base;

// ==================== MC_COLORS (Multiple Choice) ====================
const MC_COLORS = [
  { hex: COLOR_HEX.blue.base, name: 'blue', shades: ['#93c5fd', '#60a5fa', '#3b82f6', '#2563eb'], rgb: COLOR_HEX.blue.rgb },
  { hex: COLOR_HEX.violet.base, name: 'violet', shades: ['#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed'], rgb: COLOR_HEX.violet.rgb },
  { hex: COLOR_HEX.teal.base, name: 'teal', shades: ['#5eead4', '#2dd4bf', '#14b8a6', '#0d9488'], rgb: COLOR_HEX.teal.rgb },
  { hex: COLOR_HEX.cyan.base, name: 'cyan', shades: ['#67e8f9', '#22d3ee', '#06b6d4', '#0891b2'], rgb: COLOR_HEX.cyan.rgb },
  { hex: '#ec4899', name: 'pink', shades: ['#f9a8d4', '#f472b6', '#ec4899', '#db2777'], rgb: '236, 72, 153' },
];

// ==================== CATEGORY COLORS ====================
const CAT_COLORS = {
  prediction: 'amber',
  reasoning: 'violet',
  judgment: 'emerald',
};

const ASSESS_CAT_COLORS = {
  quickstart: 'blue',
  starter: 'indigo',
  personality: 'violet',
  character: 'emerald',
  shadow: 'slate',
  mind: 'blue',
  relationships: 'pink',
  behavior: 'amber',
};

// ==================== EXPORTS ====================
// In a module system these would be exports
// In the inline HTML, these are just available globally

/*
Usage after consolidation:

1. Replace scattered ASSESS_C definition with derived version above
2. Replace PROGRESS_GRADIENTS with derived version
3. In assess-question screen, use:
   const gradientStyles = makeGradientStyles();
   const selectedStyles = makeSelectedStyles();
   const pendingStyles = makePendingStyles();
   const numColors = makeNumColors();
4. In AnalysisCard, use:
   const colorStyles = makeAnalysisCardStyles(darkMode);
5. For celebration glow, use:
   getCelebrationGlowColor(assessCurrentTest.color)
   Instead of the long .includes() chain

CSS classes (.shine-*, .glow-*, .hover-glow-*) still need to stay in CSS
but they follow the same color names, so adding a color here means
adding corresponding CSS classes.
*/
