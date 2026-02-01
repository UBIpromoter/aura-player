# Aura Player vG Handoff

## Files
- `aura-player-vG.jsx` - source (5400+ lines)
- `aura-player.jsx` - render copy
- `DESIGN-THESIS.md` - design system reference

## What's Done
- Full dark/light mode theming
- Welcome screen with mode toggle
- Categories screen with track badges
- Question screen (binary + MC)
- Tap/hold confidence input (1-4)
- Undo delay system (0-3s)
- Confidence bar charts (high LEFT, low RIGHT)
- History, Profile, Settings screens
- Evidence panel
- Flag system (question + self-error)

## What Needs Work

**Light Mode Gaps:**
- Nav bar user hover: line ~59 `hover:bg-gray-800/50` hardcoded
- ErrorFlagModal: no darkMode prop
- CantAnswerModal: no darkMode prop
- NoneOptionModal: no darkMode prop
- Turk/Tasks screens: not reviewed

**Missing Features:**
- Loading states
- Screen transitions
- Empty state illustrations
- localStorage persistence
- System theme detection

## Key Code Patterns

```jsx
// Screen wrapper
<div className={`flex-1 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}>

// Card
<div className={`rounded-lg p-3 ${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>

// Pass darkMode to all components
<BinaryChart darkMode={darkMode} ... />
<EvidencePanel darkMode={darkMode} ... />
<FlagModal darkMode={darkMode} ... />
```

## Constants
- MC_COLORS: 5 colors × 4 shades
- CONFIDENCE_LABELS: ["Wild guess", "Some doubt", "Fairly sure", "Very sure"]
- Layout: 44px header, 32px progress, flex-1 content
