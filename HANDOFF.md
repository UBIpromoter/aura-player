# Aura Handoff Memo
**Date:** 2026-02-02
**Session:** Data Architecture + Vite Scaffold

---

## What Was Done

### Phase 1: Response Enrichment (COMPLETE)

**Problem:** Responses only stored `question_id` + `answer`. If questions change, old responses lose meaning.

**Solution:** Added `snapshot` JSONB column that captures full context at answer time.

**Files Changed:**
- `index.html` lines 820-844: `captureResponse()` now includes snapshot
- `index.html` lines 847-880: `captureAssessResponse()` now includes snapshot
- `index.html` lines 899-942: New `exportForAI()` function

**Snapshot Schema:**
```javascript
// Regular questions (~150-200 bytes)
{ q: "Is water wet?", a: "Yes", t: "binary", c: "reasoning", v: 1 }

// Assessments (~200-250 bytes)
{ test: "bigfive-E", name: "Extraversion", q: "I am the life of the party", a: "Very much", idx: 0 }
```

**Verification:** Answer a question → check Supabase `responses` table → `snapshot` column populated ✓

---

### Phase 2: Vite Project Scaffold (COMPLETE)

**Purpose:** Enable parallel development and future migration from monolithic index.html.

**Location:** `/Users/philipsilva/Code/Aura/app/`

**Structure:**
```
app/
├── package.json          # React 18 + Vite + Tailwind + Supabase
├── vite.config.js
├── index.html            # Vite entry
└── src/
    ├── main.jsx
    ├── App.jsx           # Working demo app
    ├── styles/index.css  # Tailwind base
    ├── utils/
    │   └── theme.js      # TH helper, colors, confidence labels
    ├── data/
    │   ├── constants.js  # CAT_MAP, scales, colors
    │   ├── questions.js  # Q_RAW structure (sample)
    │   └── assessments.js # ASSESS_TESTS structure (sample)
    ├── services/
    │   ├── supabase.js   # DB client + capture functions with snapshots
    │   └── storage.js    # localStorage helpers
    ├── hooks/
    │   ├── useSwipe.js
    │   ├── useDisplayMode.js
    │   └── useAuth.js
    └── components/
        ├── layout/
        │   ├── PhoneFrame.jsx  ← EXTRACTED (full)
        │   └── NavBar.jsx      ← EXTRACTED (full)
        ├── question/
        │   ├── QuestionCard.jsx       ← EXTRACTED (full)
        │   ├── BinaryButtons.jsx      ← EXTRACTED (full)
        │   ├── ConfidenceSegments.jsx ← EXTRACTED (full)
        │   └── MCButtons.jsx          ← Placeholder
        ├── screens/           ← Placeholders
        ├── assessment/        ← Placeholders
        ├── charts/            ← Placeholders
        └── modals/            ← Placeholders
```

**Test:** `cd app && npm run dev` → Opens localhost:3000 with working PhoneFrame + question flow

---

## Current State

### What's Working (index.html - Production)
- Full app with all features
- Responses now capture snapshots to Supabase
- New progressive onboarding flow (10 questions)
- Path choice screen (Reveal vs Explore)
- Gamification foundation (XP, levels, titles)

### What's Working (app/ - Development)
- Vite + React + Tailwind builds successfully
- PhoneFrame, NavBar, QuestionCard, BinaryButtons extracted
- Supabase integration with snapshot capture
- Basic question answering flow

---

## Next Steps

### Immediate (Before Next Session)
- [ ] Commit current index.html changes (onboarding, gamification, snapshots)
- [ ] Verify snapshots appearing in Supabase for both questions and assessments

### Short Term (Component Extraction)
Priority order for parallel development:

| Priority | Component | Complexity | Enables |
|----------|-----------|------------|---------|
| 1 | MCButtons | Medium | Full question answering |
| 2 | CategoryScreen | High | Navigation |
| 3 | AssessmentScreen | High | Assessment flow |
| 4 | Charts (Binary, MC) | Medium | Results display |
| 5 | Modals | Low | Level up, save progress |

### Medium Term (Full Migration)
1. Sync full Q_RAW (455 questions) to `app/src/data/questions.js`
2. Sync full ASSESS_TESTS to `app/src/data/assessments.js`
3. Extract remaining screens (Settings, Profile, Results)
4. Wire up full navigation/routing
5. A/B test app/ vs index.html

### Content Flexibility (Safe Changes)
Now that snapshots exist, these are SAFE:
- Add new questions (new IDs)
- Edit question text (snapshot has original)
- Reorder questions (snapshot has text)
- Add new assessment tests
- Add items to END of assessment tests

Still NEVER do:
- Delete assessment items (index corruption)
- Reorder assessment items
- Reuse question IDs

---

## Key Files Reference

| What | Location |
|------|----------|
| captureResponse() | index.html:820 |
| captureAssessResponse() | index.html:847 |
| exportForAI() | index.html:899 |
| ONBOARDING_QUESTIONS | index.html:787 |
| OnboardingFlow | index.html:2501 |
| PathChoiceScreen | index.html:2725 |
| Gamification (XP, levels) | index.html:1995 |
| Vite app entry | app/src/main.jsx |
| Extracted components | app/src/components/ |

---

## Commands

```bash
# Test production app
open index.html  # or serve locally

# Test Vite app
cd app && npm run dev

# Build Vite app
cd app && npm run build

# Export user data for AI
# In browser console on production app:
exportForAI('user@email.com').then(console.log)
```

---

## Questions for Next Session

1. **Migration strategy:** Gradual component swap or big-bang cutover?
2. **Data sync:** Auto-sync Q_RAW/ASSESS_TESTS or manual copy?
3. **Routing:** React Router or keep simple state-based?
4. **Testing:** Add Jest/Vitest for components?
