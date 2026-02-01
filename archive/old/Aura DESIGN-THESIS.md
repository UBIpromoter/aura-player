# Aura Design System

## Theme
All elements use `darkMode` variable. Pass as prop to components.

| Element | Dark | Light |
|---------|------|-------|
| Text primary | `text-white` | `text-gray-900` |
| Text secondary | `text-gray-400` | `text-gray-500` |
| Text muted | `text-gray-500` | `text-gray-400` |
| Background | `bg-gray-950` | `bg-gray-50` |
| Card | `bg-gray-900` | `bg-white border border-gray-200` |
| Input/Track | `bg-gray-800` | `bg-gray-200` |
| Border | `border-gray-800` | `border-gray-200` |
| Hover | `hover:bg-gray-800/50` | `hover:bg-gray-100` |

## Colors

**Binary:** Yes = emerald, No = rose

**MC Options (A→E):** Blue `#3b82f6`, Teal `#14b8a6`, Green `#22c55e`, Pink `#ec4899`, Violet `#8b5cf6`

**Confidence Shades:** Each color has 4 shades (light→dark for levels 1→4)

**Categories:** prediction=amber, reasoning=violet, judgment=teal

## Confidence
- Levels 1-4: "Wild guess" → "Some doubt" → "Fairly sure" → "Very sure"
- Bar segments: high confidence LEFT, low confidence RIGHT
- Tap = quick answer (conf 2), Hold = set confidence (1-4)
- Glow/scale intensity increases with confidence

## Layout
- Header: 44px, border-b
- Progress row: 32px
- Evidence panel: 32px collapsed, 120px max expanded
- Answer zone: flex-1 overflow

## Interactions
- Undo delay: 0-3s configurable
- Answer lock: no changes after submit
- Flags: question issues + self-reported errors

## Animations
- Bar growth: 0.5s ease-out
- List stagger: 0.05s per item
- Fade slide: 0.3s ease-out
