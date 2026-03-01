# Assessment V2 Changelog

*2026-03-01 — V1 snapshot: `aura-assessments-v1.js`, `aura-scoring-v1.js`*

**Total: 41 tests, 402 items (was 391). V1 response data does NOT map to V2 indices.**

---

## Starter Pack (P0: Engagement Rewrite)

14 items rewritten across 5 modules. Flat survey language → human tone. Wellbeing module untouched (already good).

| Module | Old | New |
|--------|-----|-----|
| starter-personality | "I prioritize completing a task over taking a break" | "I'd rather power through and finish something than stop for a break" |
| starter-personality | "I enjoy discussing abstract ideas and theories" | "I'd rather talk about ideas than small talk" |
| starter-motivation | "I set specific goals and work toward them consistently" | "I set clear goals and actually follow through on them" |
| starter-motivation | "I tend to give up when facing difficult challenges" | "When something gets really hard, I usually back off" |
| starter-thinking | "I prefer structured routines over flexible schedules" | "I work better with a set routine than winging it" |
| starter-connection | "I find it easy to understand how others are feeling" | "I usually pick up on how someone's feeling without them saying it" |
| starter-strategy | "I often consider worst-case scenarios before acting" | "Before I act, I usually think about what could go wrong" |

*(Plus 7 more — see `aura-assessments.js` starter modules for complete rewrites)*

---

## Big Five

### bigfive-O (Openness) — 3 items changed, still 10 items
- **Deleted:** "I use difficult words" (SES bias)
- **Replaced:** "I have excellent ideas" → "I enjoy exploring unusual ideas" (was self-esteem loading)
- **Replaced:** "I am quick to understand things" → "I get curious about how things work" (was IQ loading)
- **Added:** Curiosity item to fill the gap

### bigfive-A (Agreeableness) — 1 item rewritten
- "I insult people" → "I can be critical or sarcastic with others" (extreme wording → behavioral)

### bigfive-C (Conscientiousness) — 1 item rewritten
- "I am always prepared" → "I like to be prepared" (absolutist → preference)

### bigfive-E, bigfive-N — Untouched

---

## ADHD — Major rework

- **Items:** 12 → 13 (deleted 1 emotional reactivity item, added 2 reverse-keyed)
- **Added `k` and `sub` to ALL items** — items now tagged with `k: '+'` or `k: '-'` and subscale codes: `exec`, `inat`, `hyper`, `emot`, `imp`
- **Added `framing` property** with context-setting text
- **Rewrote hyperfocus item** to clarify dysfunction vs. flow state
- **New reverse items (k: '-'):** target executive function and inattention subscales

### Scoring change (`aura-scoring.js`):
- **Indicator count:** now handles `k: '-'` items. Reverse items count as indicator when response ≤ 2 (not ≥ 4)
- **Subscale scoring:** inverts reverse items (`6 - value`) before summing

---

## Life Satisfaction — +2 items (5 → 7)
- Added 2 reverse-keyed items, interleaved with existing items
- No items changed

## Resilience — +2 items (10 → 12)
- Added 2 reverse-keyed items about recovery time and overwhelm
- No items changed

## Growth Mindset — +3 items (3 → 6)
- Added 2 positive items and 1 reverse-keyed item about ability development
- No items changed

## Locus of Control — +2 items, 1 rewrite (4 → 6)
- Fixed 1 redundant item
- Added 2 reverse-keyed items about luck and powerlessness
- No items changed

## Impostor Syndrome — +1 item (5 → 6)
- Split 1 double-barreled item into 2 separate items
- Net: +1 item

---

## Construct Contamination Fixes (P2)

### Chronotype
- Replaced introversion-measuring item with "I feel alert and productive before noon" (now measures actual chronotype)

### Shadow Triad (M, N, P) — 1 item each
- **Shadow-M:** fixed double-barreled item
- **Shadow-N:** fixed unverifiable item
- **Shadow-P:** fixed false dichotomy

### Cognitive (Processing Style)
- "Movie characters' decisions often puzzle me" → "I often struggle to understand why people behave the way they do in social situations" (removed cultural bias)

### Attachment
- Fixed awkward phrasing on 1 item

### Conflict Style
- Rewrote weak reverse item
- **Keying change:** item was `k: '-'` measuring assertiveness, now `k: '+'` measuring avoidance directly (cleaner semantics)

### Integrity (HEXACO Honesty-Humility)
- "Having a lot of money is not especially important to me" → "Making a lot of money is not a top priority for me" (removed SES confound)

### Creativity
- Simplified biased practice item

---

## Values (Moral Foundations) — 4 items rewritten (P3)

| Old | New | Why |
|-----|-----|-----|
| Nationalistic loyalty item | Group loyalty item | Removed nationalism bias |
| Unethical family loyalty item | Family importance item | Removed moral loading |
| "disgusting" purity item | Harm-independent wrongness item | Decoupled from specific moral intuitions |
| "unnatural" purity item | Moral conviction item | Decoupled from LGBTQ+ reading |

Total items unchanged at 20.

---

## AQ-10 — Archived (P8)

- Added `archived: true` to definition
- Reason: "conflates autism with social anxiety" per psychometrics panel
- Filtered from 5 UI locations: getCategoryStatus, countCompletedCategories, picker display, nudge logic (all in `index.html`)

---

## Structural Changes

### Branch/Unlock System (P7) — in `index.html`

**Shadow unlock relaxed:**
- V1: required all 5/5 Big Five tests complete
- V2: requires 3/5 Big Five tests complete
- Change: `calculateAssessUnlocks` switched from `.every()` to `.filter().length >= 3`
- Removed `requires` array from `ASSESS_CATEGORIES` shadow entry

**Clinical tier moved:**
- V1: tier 3 (locked behind deep progress)
- V2: tier 0 with `requiresConsent: true` (always available behind consent gate)
- Clinical consent gate flag exists but **UI not built yet**

### PHQ-9 Safety Protocol (P6) — in `index.html`

- **In-test banner:** appears when suicidality item (item 8) gets response > 1. Non-blocking, dismissible.
- **Results card:** appears when severity ≠ Minimal
- **Resources:** 988 Lifeline, Crisis Text Line (741741), 911
- **State:** `assessShowCrisisResources` added to useAssessment hook

### Data Migration

**V1 → V2 response data is incompatible.** Items were rewritten, reordered, added, and deleted. V1 response indices stored in Supabase/localStorage do NOT map to V2 item positions.

Options for migration:
1. **Wipe V1 responses** — cleanest, users retake tests
2. **Version-tag responses** — store V1 data under `v1:` prefix, start V2 fresh
3. **Map forward** — create index mapping (fragile, not recommended)

Decision not yet made — next builder needs to handle this.

### V2 Forward Rules

```
1. NEVER delete a test — add 'archived: true' to hide
2. NEVER delete questions — index matters for responses
3. NEVER reorder questions — index is stored in responses
4. Can ADD questions to the END of a test's items array
5. Minor edits (typos) OK, major changes = discuss implications
```

---

## New Tests (in `noodle/question-formats/new-assessments.js` — not yet in production)

These are drafted and reviewed but **not wired into `aura-assessments.js` yet**:

### Love Language — 16 items (forced-choice pairs)
- 8 receive + 8 give items, each pitting 2 of 5 languages against each other
- Languages: words, time, gifts, service, touch
- Scoring: ipsative (within-person rank only), separate give/receive profiles
- Scale type: `love-language` (new — needs scale handler)

### Humor Style — 14 items (agreement scale)
- 4 dimensions: affiliative (3), self-enhancing (3), aggressive (3), self-defeating (3) + 2 reverse-keyed
- Based on Martin's HSQ (2003)
- Scoring: 4 independent dimension scores → profile label

### Communication Style — 10 items (agreement scale)
- 2 axes: directness (5 items) × emotionality (5 items)
- Based on Norton (1978) + Gudykunst (1988)
- Scoring: 2×2 matrix → Straight Shooter / Passionate Advocate / Diplomat / Strategist

### Decision Style — 8 items (agreement scale)
- 2 axes: maximizing (4) × deliberation (4)
- Based on Schwartz (2002) + Scott & Bruce (1995)
- Scoring: 2×2 matrix → Optimizer / Instinct Hunter / Pragmatist / Snap Judge

### Self-Monitoring — 9 items (agreement scale)
- Single spectrum: low (authentic) ↔ high (chameleon)
- Based on Snyder (1974), revised Lennox & Wolfe (1984)
- Scoring: single 0-100 score → 4 tier labels

### Aura Type — `getAuraType()` function
- Derives MBTI 4-letter code from Big Five scores
- Maps: E→E/I, O→N/S, A→F/T (weak), C→J/P
- Returns: code, name, tagline, strengths, borderline flags, spectrum display data
- Borderline detection: flags any dimension within ±5 of midpoint
- Position: footnote, not headline

---

## Files Not Committed (UI changes)

`index.html` has uncommitted changes for P6 (PHQ-9 safety), P7 (branch unlocks), P8 (archive filtering). These belong in a separate integration commit with the rebuild work.
