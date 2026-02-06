# TOKENS — Aura Design System

> **Rule:** Not listed = not allowed. Propose additions, wait for approval.

---

## Brand

| Token | Value | Notes |
|-------|-------|-------|
| App Name | Aura Player | Sometimes just "Aura" |
| Tagline | Discover yourself, one question at a time | Welcome screen |
| Theme Color | `#030712` (gray-950) | Meta tag, backgrounds |

---

## Color Palette

These are the **only** colors. Using anything else requires adding it here first.

### Assessment Colors (ASSESS_C)
| Name | Tailwind | Hex | Used For |
|------|----------|-----|----------|
| violet | violet-500 | `#8b5cf6` | Primary accent, onboarding |
| blue | blue-500 | `#3b82f6` | Quick Profile, Mind category |
| teal | teal-500 | `#14b8a6` | Chill/laid-back profiles |
| rose | rose-500 | `#f43f5e` | Errors, "No" responses |
| pink/fuchsia | fuchsia-500 | `#d946ef` | Relationships, energetic profiles |
| emerald | emerald-500 | `#10b981` | Success, "Yes" responses, Character |
| amber | amber-500 | `#f59e0b` | Behavior category |
| slate | slate-500 | `#64748b` | Shadow Self, neutral |
| indigo | indigo-500 | `#6366f1` | Starter Pack |
| cyan | cyan-500 | `#06b6d4` | Accent |

### Category → Color Mapping
| Category | Color | Icon |
|----------|-------|------|
| Quick Profile | blue | ✨ |
| Starter Pack | indigo | 🚀 |
| Personality | violet | 🎭 |
| Character | emerald | 💎 |
| Shadow Self | slate | 🌑 |
| Mind | blue | 🧠 |
| Relationships | pink | 💚 |
| Behavior | amber | 🎲 |

### Binary Response Colors
| Response | Light Shades | Dark Shades |
|----------|-------------|-------------|
| Yes/True | `#a7f3d0 → #10b981` | emerald spectrum |
| No/False | `#fecaca → #f43f5e` | rose spectrum |

### Backgrounds
| Context | Dark Mode | Light Mode |
|---------|-----------|------------|
| Main BG | `#030712` (gray-950) | `#f9fafb` (gray-50) |
| Card BG | `#1f2937` (gray-800) | `#ffffff` |
| Phone Frame | `#1a1a1c` | — |

---

## Gradients

Progress rings and completion states use these exact gradients:

```javascript
const PROGRESS_GRADIENTS = {
  violet: { from: '#8b5cf6', to: '#a78bfa' },
  blue: { from: '#3b82f6', to: '#60a5fa' },
  teal: { from: '#14b8a6', to: '#2dd4bf' },
  rose: { from: '#f43f5e', to: '#fb7185' },
  pink: { from: '#d946ef', to: '#e879f9' },
  emerald: { from: '#10b981', to: '#34d399' },
  amber: { from: '#f59e0b', to: '#fbbf24' },
  gray: { from: '#6b7280', to: '#9ca3af' },
  slate: { from: '#64748b', to: '#94a3b8' },
  indigo: { from: '#6366f1', to: '#818cf8' },
};
```

---

## Typography

| Element | Size | Notes |
|---------|------|-------|
| Question text | `clamp(20px, 6vw, 28px)` | `.question-text` class |
| Body | System default | Tailwind defaults |
| Line height | 1.35 | Questions |

---

## Spacing & Layout

| Token | Value | Notes |
|-------|-------|-------|
| Safe area insets | CSS env() | `--sat`, `--sar`, `--sab`, `--sal` |
| Card border radius | Varies | Phone frame: `55px`, cards: `xl` |
| Phone frame padding | `12px` (p-3) | Outer wrapper |

---

## Animation

| Name | Duration | Easing | Purpose |
|------|----------|--------|---------|
| fadeSlideIn | — | ease | Card entrance |
| slideUp | — | ease | Bottom sheets |
| shimmer-pulse | 3s | ease-in-out | Hover glow |
| fill/shrink | — | linear | Progress bars |

---

## Locked Dependencies

| Package | Version | Why Locked |
|---------|---------|------------|
| react | 18.x | CDN, stable |
| react-dom | 18.x | Matches React |
| @supabase/supabase-js | 2.x | Auth flow depends on this API |
| tailwindcss | CDN (latest) | JIT mode via cdn.tailwindcss.com |
| @babel/standalone | CDN | JSX transform |

### CDN URLs (exact)
```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

---

## Adding New Tokens

1. **Propose** the addition with:
   - Token name
   - Value
   - Where it will be used
   - Why existing tokens don't work

2. **Wait** for approval

3. **Update** this file first, then use the token

This prevents drift. Every color, every dependency — it lives here or it doesn't exist.

---

## Color Update Checklist

When adding/changing a color, update ALL of these locations.
Use Cmd+F with the search terms below — they don't drift when code is added.

1. **ASSESS_C** — search: `const ASSESS_C` — base color config
2. **PROGRESS_GRADIENTS** — search: `const PROGRESS_GRADIENTS` — gradient hex values
3. **CSS .hover-glow-{color}** — search: `.hover-glow-amber` — hover effects (in `<style>`)
4. **CSS .shine-{color}** — search: `.shine-blue` — card shine effects (in `<style>`)
5. **ASSESS_STYLES** — search: `const ASSESS_STYLES` — gradientStyles, selectedStyles, pendingStyles
6. **AnalysisCard colorStyles** — search: `const AnalysisCard` — colorStyles inside the component
7. **Completion celebration glow** — search: `Completion Celebration` — COLOR_HEX[color] gradient

Miss one = broken UI somewhere.
