# Aura Handoff Memo
**Date:** 2026-02-02
**Session:** Progressive Assessment Unlock System

---

## What Was Done This Session

### Progressive Assessment Unlock System (COMPLETE)

**Goal:** Create a Quick Profile test as gateway to Reveal, with progressive unlocking of deeper assessments.

**User Flow:**
```
First time clicking "Reveal" from path-choice
              ↓
      Quick Profile (10 questions)
      "Who are you in 2 minutes?"
              ↓
      Fun result + "You've unlocked Starter Pack!"
              ↓
      assess-picker shows: Starter Pack only
              ↓
      Complete Starter Pack → All branches unlock
      (Personality, Mind, Shadow, etc.)
```

**Changes Made:**

1. **Added Quick Profile test** (`index.html:1855`)
   - 10 questions (2 per Big Five trait + 2 bonus)
   - Rose color, ✨ icon, tier: 0
   - ~90 second completion time

2. **Added tier system to ASSESS_CATEGORIES** (`index.html:1905`)
   - quickstart: tier 0 (always available)
   - starter: tier 1 (after Quick Profile)
   - all others: tier 2 (after Starter Pack)

3. **Added tier calculation function** (`index.html:1921`)
   - `calculateAssessTier(completed)` → 0, 1, or 2

4. **Filtered assess-picker by tier** (`index.html:6001`)
   - Only shows categories where tier <= currentTier

5. **Added unlock celebration** (`index.html:5376, 6363`)
   - Shows "Starter Pack Unlocked!" or "All Branches Unlocked!"
   - Rose/amber gradient, 🔓 icon

6. **Gated Reveal entry** (`index.html:5194`)
   - First click → goes directly to Quick Profile
   - After completion → goes to assess-picker

7. **Quick Profile results** (`index.html:6577`)
   - Simple personality snapshot in 2-3 sentences
   - "Ready for more?" CTA to Starter Pack

**App Scaffold Updates:**
- `app/src/data/assessments.js` - Added quick-profile + tier system
- `app/src/hooks/useAssessmentTier.js` - New hook for tier calculation

### Analysis Screen Tier Filtering (COMPLETE)

**Goal:** Hide tier 2 content in Analysis until user completes Starter Pack.

**Changes Made:**

1. **Quick Profile results card** (`index.html:7307`)
   - Shows personality snapshot at top of Analysis
   - CTA button to continue to Starter Pack if tier < 2

2. **Starter Pack section in Analysis** (`index.html:7327`)
   - Shows 5 module cards with progress/completion status
   - Only visible when tier >= 1

3. **Tier 2 content filtering** (`index.html:7368`)
   - Big Five, Shadow Self, individual assessments wrapped in `currentTier >= 2` check
   - Shows locked teasers (grayed out cards) for tier < 2

4. **Locked teaser cards** (`index.html:7697`)
   - Personality, Mind, Shadow Self teasers with 🔒 lock icon
   - "Complete Starter Pack to unlock" message
   - Encouraging "More awaits" card at bottom

5. **Analysis button gating** (`index.html:5965`)
   - Already gated: only clickable after Quick Profile complete
   - Grayed out with `cursor-not-allowed` when locked

---

## Previous Session Work

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
