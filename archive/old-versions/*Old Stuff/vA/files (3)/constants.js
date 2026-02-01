// Aura Player - Constants

export const CONFIDENCE_LABELS = {
  1: { label: 'Low', description: 'Just guessing' },
  2: { label: 'Medium', description: 'Somewhat confident' },
  3: { label: 'High', description: 'Pretty sure' },
  4: { label: 'Very High', description: 'Certain' },
};

export const CONFIDENCE_COLORS = {
  1: 'bg-violet-900/60',
  2: 'bg-violet-700/70',
  3: 'bg-violet-500/80',
  4: 'bg-violet-400',
};

export const ANSWER_COLORS = {
  yes: 'violet',
  no: 'gray',
};

export const DEVICES = {
  'iphone-15-pro': {
    name: 'iPhone 15 Pro',
    width: 393,
    height: 852,
    screenRadius: 44,
    frameRadius: 55,
    framePadding: 12,
    notchType: 'island',
    islandWidth: 126,
    islandHeight: 37,
  },
  'iphone-15-pro-max': {
    name: 'iPhone 15 Pro Max',
    width: 430,
    height: 932,
    screenRadius: 48,
    frameRadius: 60,
    framePadding: 14,
    notchType: 'island',
    islandWidth: 126,
    islandHeight: 37,
  },
  'iphone-14': {
    name: 'iPhone 14',
    width: 390,
    height: 844,
    screenRadius: 44,
    frameRadius: 55,
    framePadding: 12,
    notchType: 'notch',
    notchWidth: 160,
    notchHeight: 34,
  },
  'iphone-se': {
    name: 'iPhone SE',
    width: 375,
    height: 667,
    screenRadius: 0,
    frameRadius: 40,
    framePadding: 14,
    notchType: 'none',
    hasHomeButton: true,
  },
  'pixel-8': {
    name: 'Pixel 8',
    width: 412,
    height: 915,
    screenRadius: 40,
    frameRadius: 48,
    framePadding: 10,
    notchType: 'punch',
    punchSize: 24,
  },
  'galaxy-s24': {
    name: 'Galaxy S24',
    width: 412,
    height: 915,
    screenRadius: 36,
    frameRadius: 44,
    framePadding: 8,
    notchType: 'punch',
    punchSize: 20,
  },
};

export const DEFAULT_DEVICE = 'iphone-15-pro';

export const APP_CONFIG = {
  appName: 'Aura Player',
  version: 'a1.6',
  defaultConfidence: 2,
  turkDebounceMs: 800,
  qotdReward: 25,
};
