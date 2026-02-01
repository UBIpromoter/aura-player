# Aura Player vC - Handoff Document

**Version:** 0.3 (vC)  
**Date:** January 25, 2026  
**File:** `aura-player-vC.jsx`  
**Lines:** 4,889

---

## Overview

Aura Player is an interactive React prototype for a mobile polling/prediction app. Users answer questions across categories, set confidence levels, and see community results. The app demonstrates tap/hold gestures, undo mechanics, and rich data visualization.

---

## Key Features

### Question Answering
- **Binary questions** (Yes/No) with tap-to-answer, hold-for-confidence
- **Multiple choice** (up to 5 options) with same gesture system
- **"Can't answer"** option with reason selection
- **1-second undo window** - tap anywhere to cancel before submission
- **Confidence levels** (1-4): Uncertain → Somewhat → Confident → Certain

### Screens
| Screen | Purpose |
|--------|---------|
| Welcome | Demo splash with one-click entry |
| Categories | Main menu with category cards, QOTD, progress |
| Question | Core answering interface |
| QOTD | Daily featured question with sponsor |
| History | Review past answers with filters |
| Profile | User stats and accuracy charts |
| Turk | Micro-task system (verify, categorize, etc.) |
| Settings | Dark mode, streaks, gesture hints |

### Data Visualization
- **BinaryChart** - Center-outward confidence bars (Yes/No)
- **MultipleChoiceChart** - Per-option colored bars with confidence segments
- **Pollster-style spread indicators** on results

---

## Layout System

### Fixed Zone Architecture (Question Screen)

```
┌─────────────────────────────┐
│ HEADER          h-[44px]    │  flex-shrink-0
├─────────────────────────────┤
│ PROGRESS BAR    h-[32px]    │  flex-shrink-0
├─────────────────────────────┤
│ QUESTION        h-[60px]    │  flex-shrink-0, line-clamp-2
├─────────────────────────────┤
│ EVIDENCE        h-[32px]    │  flex-shrink-0 (collapsed)
├─────────────────────────────┤
│ ANSWER ZONE     flex-1      │  overflow-y-auto
└─────────────────────────────┘
```

### Critical CSS Pattern
```jsx
// CORRECT - height is guaranteed
<div className="h-[44px] flex-shrink-0 flex items-center">

// WRONG - can shrink in flex context
<div className="h-[44px] flex items-center">

// WRONG - variable height from padding
<div className="py-2 flex items-center">
```

### Standardized Headers
All screen headers use `h-[44px] flex-shrink-0` for visual consistency.

---

## Color System

### MC Option Colors (5-color palette)
```javascript
const MC_COLORS = [
  { hex: '#3b82f6', name: 'blue' },    // A
  { hex: '#14b8a6', name: 'teal' },    // B
  { hex: '#22c55e', name: 'green' },   // C
  { hex: '#ec4899', name: 'pink' },    // D
  { hex: '#8b5cf6', name: 'violet' },  // E
]
```

### Binary Colors
- **Yes:** Emerald (`#34d399` / `emerald-400`)
- **No:** Rose (`#fb7185` / `rose-400`)
- **Can't answer:** Slate (`#64748b` / `slate-500`)

### Confidence Gradients
Each color has 4 opacity levels for confidence visualization (30%, 50%, 75%, 100%).

---

## Interaction Patterns

### Tap vs Hold
- **Quick tap** → Submit with default confidence (level 2)
- **Hold 300ms** → Open confidence selector ring
- **Release on ring segment** → Submit with selected confidence

### Undo Window
- 1-second delay before submission commits
- Full-screen invisible overlay captures taps
- Progress bar shows remaining time
- Tap anywhere to cancel

### Navigation
- **← Arrow** → Back to previous screen
- **Home button** → Categories
- **Double-click home** → Reset QOTD (demo feature)
- **◀ ▶ Arrows** → Navigate between questions in track

---

## State Management

### Key State Variables
```javascript
screen          // Current screen name
responses       // {questionId: {answer, confidence}}
communityResults // {questionId: {evaluators: [...]}}
qotdResponse    // User's daily question answer
pendingSubmit   // Undo window state
evidenceExpanded // Evidence panel toggle
```

### Demo Mode
`loadDemoData()` pre-fills:
- 200 answered questions
- Community results for all questions
- User teams for team-specific evidence

---

## File Structure

### Components (inline)
- `PhoneFrame` - iPhone 15 Pro chrome (393×852px)
- `EvidencePanel` - Collapsible evidence display
- `BinaryChart` - Yes/No results visualization
- `MultipleChoiceChart` - MC results visualization
- `ConfidenceSelector` - Ring-based confidence picker
- `FlagModal`, `CantAnswerModal`, `NoneOptionModal`

### Data (inline)
- `CATEGORIES` - 6 prediction categories
- `QUESTIONS` - 440 questions across categories
- `TURK_TASKS` - Micro-task definitions
- `QOTD_DATA` - Daily question with distribution

---

## Known Limitations

1. **No persistence** - All state resets on reload
2. **Demo data only** - No real backend
3. **Single user** - No multi-user or auth
4. **Fixed phone size** - Optimized for iPhone 15 Pro dimensions

---

## Quality Checks

### Layout Verification Script
```bash
bash check_layout.sh aura-player-vC.jsx
```

Checks for:
- Fixed heights missing `flex-shrink-0`
- Question text missing `line-clamp`
- Headers using `py-*` instead of `h-[44px]`
- `flex-1` containers without overflow control

### Visual Test Cases
1. Short question (< 1 line) → Zones don't collapse
2. Long question (2+ lines) → Truncates properly
3. Navigate questions → Answer buttons stay fixed
4. Evidence toggle → Doesn't shift answer zone

---

## Files Included

| File | Purpose |
|------|---------|
| `aura-player-vC.jsx` | Main React component |
| `LAYOUT_STANDARDS.md` | Layout rules documentation |
| `check_layout.sh` | Automated layout checker |
| `aura-player-vC-handoff.md` | This document |

---

## Next Steps (Suggested)

1. **Backend integration** - Replace demo data with API calls
2. **Auth system** - User accounts and persistence
3. **Real community data** - Live polling results
4. **Push notifications** - QOTD reminders
5. **Leaderboards** - Accuracy rankings
6. **Resolution system** - Outcome verification for predictions

---

## Contact

Built iteratively through conversation. See project knowledge for full context and decision history.
