# Aura Design System

## Visual Theme: Cosmic

Deep space aesthetic with galaxy swirls, dense starfields, and glowing borders on pure black.

### Background
- **Base:** Pure `bg-black`
- **Galaxies:** Multiple layered swirls using radial gradients with blur
  - Purple/violet dominant: `from-purple-600/20 via-indigo-500/12 to-transparent`
  - Blue accents: `from-blue-500/12 via-indigo-400/8 to-transparent`
  - Position off-screen edges, use `blur-3xl` and `blur-2xl`
- **Starfield:** 250-350 absolutely positioned dots
  - Size: `0.25px` to `1.8px`
  - Opacity: `0.2` to `0.8`
  - Colors: white (majority), purple `#e9d5ff`, blue `#bfdbfe`, amber `#fef3c7`
- **Bright Stars:** 6-10 larger anchor stars (`2-3px`) with higher opacity

### Cards
- **Border:** 1px gradient border using wrapper technique
  - Outer: `rounded-2xl p-[1px] bg-gradient-to-b from-{color}-500/70 via-{color}-600/50 to-{color}-700/30`
  - Glow: `shadow-xl shadow-{color}-500/35`
- **Interior:** Pure `bg-black` (no transparency, no blur)
- **Border radius:** `rounded-2xl` (cards), `rounded-xl` (smaller elements)

## Category Colors

| Category | Border Color | Text Color | Emoji |
|----------|--------------|------------|-------|
| Predict | amber | `text-amber-400` | ☀️ |
| Think | violet | `text-violet-400` | 🧠 |
| Judge | teal | `text-teal-400` | ⚖️ |
| Explore | fuchsia | `text-fuchsia-400` | 🌀 |

### Gradient Pattern
```
from-{color}-500/70 via-{color}-600/50 to-{color}-700/30
```

## Home Screen Layout

### Header
- Logo: Gradient circle `from-violet-400 to-purple-600` with inner ring
- Settings: Outline gear icon, `text-slate-600`

### Question of the Day
- Blue/violet gradient border
- Full width card
- Contains: colored dot, "Question of the Day" label, question text, "Tap to answer →"

### Category Selection
- **Layout:** 2x2 grid, `gap-3`
- **Cards:** Taller aspect ratio (`py-7 px-4`)
- **Content:** Large emoji (5xl), category name below
- **No subtitles** in grid view

## Text Hierarchy

| Element | Style |
|---------|-------|
| Section title | `text-xl font-bold text-white` |
| Card title | `text-lg font-medium text-white` |
| Category name | `font-semibold text-{color}-400` |
| Subtitle/meta | `text-sm text-slate-500` |
| CTA | `text-sm text-{color}-400` |

## Semantic Colors

**Binary Answers:** Yes = emerald, No = rose

**MC Options (A→E):** Blue `#3b82f6`, Teal `#14b8a6`, Green `#22c55e`, Pink `#ec4899`, Violet `#8b5cf6`

**Confidence Shades:** Each color has 4 shades (lighter = low conf, darker = high conf)

## Confidence System
- Levels 1-4: "Wild guess" → "Some doubt" → "Fairly sure" → "Very sure"
- Bar segments: high confidence LEFT, low confidence RIGHT
- Tap = quick answer (conf 2), Hold = set confidence (1-4)
- Glow/scale intensity increases with confidence

## Layout Constants
- Header: 44px, no visible border
- Progress row: 32px
- Evidence panel: 32px collapsed, 120px max expanded
- Answer zone: flex-1 overflow
- Grid gap: 12px (`gap-3`)
- Card padding: 20px (`p-5`) or 28px vertical (`py-7`)

## Animations
- Bar growth: `0.5s ease-out`
- List stagger: `0.05s` per item
- Fade slide: `0.3s ease-out`
- Star twinkle: optional subtle opacity animation

## Reference Mockups
- `mockup-26-grid-deeper.jsx` - Current home screen (2x2 grid)
- `mockup-21-deep-cosmos.jsx` - List layout variant
- `mockup-17-galaxy-swirl.jsx` - Galaxy background reference
