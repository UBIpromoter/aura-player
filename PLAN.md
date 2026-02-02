# PLAN: Design Subproject

## Goal
Create a `/design` subproject inside Aura for visual experimentation, with a sync script to pull component code from the main app.

## Non-Goals
- No business logic in design project
- Not a full component library / Storybook
- No automatic back-sync (manual copy when ready)

## Acceptance Checks
- [x] `/design` folder created with its own structure
- [x] `playground.html` opens in browser, shows all UI components
- [x] Device switcher works (iPhone, Android, Tablet sizes)
- [x] Color palette editor allows live changes
- [x] `sync.sh` script pulls latest components from `index.html`
- [x] Minimal sample data (5 questions, 4 assessments)
- [x] Dark/light mode toggle

## Project Structure

```
/Aura
├── index.html              ← Production app (source of truth)
├── design/                 ← NEW: Design subproject
│   ├── README.md           ← How to use the design tools
│   ├── playground.html     ← Visual component playground
│   ├── sync.sh             ← Pull components from ../index.html
│   └── theme.js            ← Extracted color config (after running sync.sh)
├── app/                    ← Vite dev environment (existing)
└── ...
```

## Components Included

| Component | Status |
|-----------|--------|
| QuestionCard | ✅ |
| ConfidenceSegments | ✅ |
| BinaryButtons | ✅ |
| MCButtons | ✅ |
| NavBar | ✅ |
| PhoneFrame | ✅ |
| ProgressCircle | ✅ |
| CategoryChip | ✅ |
| AssessmentCard | ✅ |

---

**Status:** COMPLETE
