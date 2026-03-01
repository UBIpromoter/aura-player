# V2 Pass 3: Scoring, Safety & Tech Tree

**Files:** `aura-scoring.js`, `index.html` (or `noodle/rebuild/index.html`)
**Scope:** Fix ADHD scoring, add PHQ-9 safety protocol, adjust tech tree
**Prerequisite:** Passes 1 & 2 are complete (all items are final)

---

## 1. ADHD Scoring Fix (`aura-scoring.js`)

Pass 2 added reverse-keyed items (k: '-') to ADHD. The scoring doesn't handle them.

### Indicator count fix

Current:
```js
results.indicators = Object.values(resp).filter(v => v !== null && v >= 4).length;
```

Replace with:
```js
results.indicators = 0;
test.items.forEach((item, i) => {
  if (resp[i] !== undefined && resp[i] !== null) {
    if (item.k === '-') {
      if (resp[i] <= 2) results.indicators++;
    } else {
      if (resp[i] >= 4) results.indicators++;
    }
  }
});
```

### Subscale scoring fix

The subscale block sums raw values but doesn't reverse-key. Add before summing:
```js
if (resp[i] !== undefined && resp[i] !== null && item.sub) {
  let value = resp[i];
  if (item.k === '-') value = 6 - value;  // ADD THIS LINE
  subSums[item.sub] = (subSums[item.sub] || 0) + value;
  subCounts[item.sub] = (subCounts[item.sub] || 0) + 1;
}
```

---

## 2. PHQ-9 Safety Protocol (`index.html` or rebuild)

**Must-ship.** The suicidality item ("Thoughts that you would be better off dead, or of hurting yourself") needs a safety response.

### Requirements

1. **Trigger:** If response to the last PHQ-9 item > 1 (anything other than "Never")
2. **Display immediately** after that answer — a prominent card/banner with:
   - **988 Suicide & Crisis Lifeline** — call or text 988
   - **Crisis Text Line** — text HOME to 741741
   - "If you're in immediate danger, call 911"
3. **Non-blocking** — the user can continue, but the resources are visible
4. **Persist** on the PHQ-9 results screen if that item was scored > 1
5. **Style:** Use existing Card/Toast primitives. Warm, not alarming. Something like:
   > "Your responses suggest you may be going through a difficult time. You don't have to face it alone."
   > [988 Lifeline] [Crisis Text Line]

### Where to implement

This is UI logic, not scoring. Check for the flag in the assessment question screen (when presenting PHQ-9 item 8) and on the results screen.

---

## 3. Tech Tree Adjustments (`index.html`)

### Shadow unlock: relax from 5/5 to 3/5 Big Five

Current in `calculateAssessUnlocks`:
```js
const bigFiveDone = ['bigfive-E', 'bigfive-A', 'bigfive-C', 'bigfive-N', 'bigfive-O'].every(id => completed[id]);
if (bigFiveDone) unlocks.branches.shadow = true;
```

Change to:
```js
const bigFiveCount = ['bigfive-E', 'bigfive-A', 'bigfive-C', 'bigfive-N', 'bigfive-O'].filter(id => completed[id]).length;
if (bigFiveCount >= 3) unlocks.branches.shadow = true;
```

Also update `ASSESS_CATEGORIES.shadow.requires` — remove the hard 5-test requirement or change to a softer check.

### Clinical tier: your call

The psychometrics panel flagged that locking PHQ-9 behind 3+ branches is ethically questionable — someone who needs it shouldn't have to grind personality tests.

**Option A (recommended):** Make clinical always available (tier 0) with explicit consent gate:
```js
clinical: { name: 'Clinical Screens', icon: '📊', color: 'blue', tests: ['phq9', 'gad7', 'aq10'], tier: 0, clinical: true, requiresConsent: true },
```

**Option B:** Keep tier 3 but add a bypass — "I need this now" link that skips the branch requirement.

Your call. The existing `clinical: true` flag + disclaimer text already provides the consent framing.

---

## 4. Version Header Update (`aura-assessments.js`)

Update the RULES comment block at the top of the file to reflect V2:

```js
// RULES (V2 — locked 2026-03-XX):
// V1 snapshot: aura-assessments-v1.js (locked, never modify)
// 1. NEVER delete a question — question index matters for responses
// 2. NEVER reorder questions — index is stored in responses
// 3. Can ADD questions to the END of a test's items array
// 4. Minor text edits (typos) OK, major changes = discuss implications
// 5. Can add 'archived: true' to hide a test, never delete one
```

---

## What NOT to do

- Don't change item text (that was Passes 1 & 2)
- Don't touch AI-native assessments or archetypes
- Don't change scoring for tests that weren't modified

## Verification

After all 3 passes are complete:
- Run through each modified test to confirm scoring works
- Test ADHD with reverse items — verify indicator count and subscales
- Test PHQ-9 — verify safety banner appears on item 8 response > 1
- Test Shadow unlock — verify it unlocks at 3/5 Big Five
- Clear localStorage and test fresh (V2 = fresh start)
- Update the V2 date in the version header
