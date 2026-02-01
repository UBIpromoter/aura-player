# Aura Design Skill

## Triggers
Use when building UI for: Aura app, prediction markets, voting interfaces, confidence-based inputs, survey/polling apps.

## Theme System
All elements use `darkMode` prop/variable.

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

## Semantic Colors
- **Yes/Positive:** emerald-400 (dark) / emerald-600 (light)
- **No/Negative:** rose-400 (dark) / rose-600 (light)
- **MC Options A→E:** `#3b82f6` `#14b8a6` `#22c55e` `#ec4899` `#8b5cf6`
- **Categories:** prediction=amber, reasoning=violet, judgment=teal

## Confidence System
Levels 1→4: "Wild guess" → "Some doubt" → "Fairly sure" → "Very sure"
- Each color has 4 shades (lighter=low conf, darker=high conf)
- Bar charts: high confidence LEFT, low RIGHT
- Input: Tap=quick (conf 2), Hold=adjust (1-4)
- Visual: glow/scale intensity increases with confidence

## Layout Constants
- Header: 44px h, border-b
- Progress row: 32px h
- Evidence panel: 32px collapsed, 120px max
- Answer zone: flex-1 overflow-y-auto

## Animations
- Bar growth: `0.5s ease-out`
- List stagger: `0.05s` per item
- Fade slide: `0.3s ease-out`

## References
- `references/components.md` - Card, button, input patterns
- `references/patterns.md` - Answer bars, progress, confidence viz
- `references/icons.md` - Emoji conventions
