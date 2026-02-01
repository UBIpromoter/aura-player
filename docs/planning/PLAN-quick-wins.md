# Aura Player Improvements Plan

## Kanban

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                             │
│   📋 BACKLOG              🔨 IN PROGRESS           ✅ DONE                                  │
│   ─────────────────       ─────────────────        ─────────────────                        │
│                                                                                             │
│   ┌───────────────┐                                ┌───────────────┐                        │
│   │ #4 Submit UI  │                                │ #1 Light Mode │                        │
│   │ ⚡ Medium      │                                │    Cleanup    │                        │
│   └───────────────┘                                └───────────────┘                        │
│                                                                                             │
│   ┌───────────────┐                                ┌───────────────┐                        │
│   │ #8 Rounded    │                                │ #2 QOTD       │                        │
│   │ Squares ⚡Quick│                                │    Condensing │                        │
│   └───────────────┘                                └───────────────┘                        │
│                                                                                             │
│   ┌───────────────┐                                ┌───────────────┐                        │
│   │ #10 Expansion │                                │ #3 Confidence │                        │
│   │ ⚡ Medium      │                                │    ★★★★       │                        │
│   └───────────────┘                                └───────────────┘                        │
│                                                                                             │
│   ┌───────────────┐                                ┌───────────────┐                        │
│   │ #11 Compare   │                                │ #5 Assessment │                        │
│   │ Users ⚡Large  │                                │    Glow       │                        │
│   └───────────────┘                                └───────────────┘                        │
│                                                                                             │
│   ┌───────────────┐                                ┌───────────────┐                        │
│   │ #14 Meta-     │                                │ #6 Mix Text   │                        │
│   │ Analysis⚡Large│                                │    Circles    │                        │
│   └───────────────┘                                └───────────────┘                        │
│                                                                                             │
│                                                    ┌───────────────┐                        │
│                                                    │ #7 Explain    │                        │
│                                                    │    Options    │                        │
│                                                    └───────────────┘                        │
│                                                                                             │
│                                                    ┌───────────────┐                        │
│                                                    │ #9 Nested     │                        │
│                                                    │    Levels 🆕  │                        │
│                                                    └───────────────┘                        │
│                                                                                             │
│                                                    ┌───────────────┐                        │
│                                                    │ #12 Hover     │                        │
│                                                    │    Effects    │                        │
│                                                    └───────────────┘                        │
│                                                                                             │
│                                                    ┌───────────────┐                        │
│                                                    │ #13 Spectrum  │                        │
│                                                    │    Scores     │                        │
│                                                    └───────────────┘                        │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Backlog Details

### #4 - Submit Confirmation UI ⚡ Medium
Checkmark and X buttons are small and awkward, hard to press on small phones.
- Needs prototyping - will show options for review

### #8 - Assessment Results: Rounded Squares ⚡ Quick
Distinguish completed results from in-progress assessments.
- **Results** (completed): Rounded corner squares
- **Progress** (in-progress): Glowing circles

### #10 - Expansion Behavior (Click Point Stability) ⚡ Medium
When clicking to expand, content jumps around unpredictably.
- Expand DOWN from click point
- Collapse UP toward click point
- Content above should NOT shift

### #11 - Comparison to Other Users ⚡ Large
Users can't see how their answers compare to others.
- Add "How you compare" section
- Show distribution of answers
- May need backend/data work

### #14 - Meta-Analysis at Top of Analysis Screen ⚡ Large
Meta-analysis buried, not prominent enough.
- Move summary to TOP of Analysis screen
- Show COLLAPSED initially
- Multi-level dropdown to dig deeper

---

## Done ✓

| # | Feature | Version |
|---|---------|---------|
| 1 | Light Mode Cleanup | vR, pre-CP-1 |
| 2 | QOTD Condensing | vR, pre-CP-1 |
| 3 | Confidence Stars (★★★★) | vR, pre-CP-1 |
| 5 | Assessment Glow Effect | vR, pre-CP-1 |
| 6 | Question Circles (Mix Text) | vR, CP-2 |
| 7 | Explain Button Options | vR, pre-CP-1 |
| 9 | Nested Assessment Levels (stacked rings) | vR, CP-3 |
| 12 | Hover/Hold Highlighting | vR, CP-2 |
| 13 | Visual Spectrum for Scores | vR, CP-1 |

---

## Details: Completed Items

### #1 - Light Mode Cleanup
- Fixed muddy/dark colors on category cards
- Added bright gradients (amber-100, violet-100, etc.)
- Fixed featured "Predict" card
- Added `getAssessColor()` helper with light mode variants

### #2 - Question of the Day Condensing
- Removed "Tap to answer" text
- Collapsed state: single line with 🌀 + text + ✓
- Reduced padding, extra small text, 2-line limit

### #3 - Confidence Indicator Icons
- Replaced diamond (◆) with stars (★★★★)
- Added `getStars()` helper

### #5 - Assessment Glow Effect
- 3-layer graduated shadows for natural fade

### #6 - Question Circles (Mix Text)
- Shows "Mix" instead of count number (capitalized in CP-2)

### #7 - Explain Button Options
- Before answering: 4 original options
- After answering: adds correction options

### #9 - Nested Assessment Levels
- Stacked overlapping rings for multi-level assessments
- New rings stack left-to-right, covering previous
- Solid opaque circles with inner glow
- Removed ugly level buttons
- Click card to open details

### #12 - Consistent Hover/Hold Highlighting
- Added `hover-glow` classes with inset box-shadow
- Fixed category expansion buttons
- Fixed single-test category buttons
- Fixed Analysis card headers
- Added hover to assessment answer options
- Added btn-feedback to question nav buttons
- Added hover effect to q-circles (scale + brightness)
- Color-matched hover effects throughout

### #13 - Visual Spectrum for Assessment Scores
- Two-color gradient bars with position markers
- Big Five: teal → violet
- Shadow Self: white → near-black (monochrome)
- Cognitive Style: slate → teal
- Risk Tolerance: blue → amber
- Avoided green/red (no good/bad perception)
