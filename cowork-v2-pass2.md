# V2 Pass 2: Balance & Expansion

**File:** `aura-assessments.js` only
**Scope:** Add reverse items, expand short scales, archive AQ-10
**Prerequisite:** Pass 1 (item rewrites) is complete
**After this pass:** All items are final. Pass 3 fixes scoring/UI.

## V2 Context

Same V2 rules as Pass 1 — full freedom to restructure. When adding reverse items, interleave them with existing positives for natural flow. Don't cluster all positives then all negatives.

---

## 1. Add Reverse Items (acquiescence bias fixes)

### Life Satisfaction — add 2 reverses

Currently all 5 items are positive-keyed. Add:
```js
{ q: "There are many things about my life I would change", k: '-' },
{ q: "My life feels far from where I want it to be", k: '-' },
```

### Resilience — add 2 reverses

Currently all 10 items are positive-keyed. Add:
```js
{ q: "When something stressful happens, it takes me a long time to recover", k: '-' },
{ q: "I often feel overwhelmed by setbacks", k: '-' },
```

### ADHD — add 2 reverses + timeframe + fix items

Add `framing` property to the test:
```js
framing: 'Think about your experiences over the past 6 months.',
```

Add reverse items:
```js
{ q: "I sustain attention on routine tasks without difficulty", sub: 'inat', k: '-' },
{ q: "I complete tasks on schedule without reminders", sub: 'exec', k: '-' },
```

**Remove or rewrite:** "My emotions feel more intense than other people's seem to be" — measures emotional reactivity, not core ADHD. Delete it or move to a future scale.

**Rewrite:** "When something interests me, I can lose track of everything else for hours" → "I lose track of time when focused on something interesting, even when I have other responsibilities"

---

## 2. Expand Short Scales

### Growth Mindset — expand from 3 to 6 items

3 items is too few for reliability. Add:
```js
{ q: "People can always substantially improve their abilities with effort", k: '+' },
{ q: "You have a certain amount of talent, and you can't do much to change it", k: '-' },
{ q: "With enough practice, anyone can develop skills in areas where they have no natural talent", k: '+' },
```

### Locus of Control — fix redundancy + expand

"What happens to me is mostly determined by my own actions" and "My life is determined by my own actions" say the same thing. Replace the redundant one:

| Current | New |
|---------|-----|
| "My life is determined by my own actions" | "When I fail, it's usually because of things I could have controlled" |

Add 2 reverses:
```js
{ q: "I feel powerless to change important things in my life", k: '-' },
{ q: "Success in life is mostly a matter of luck", k: '-' },
```

### Impostor Syndrome — add split item

Pass 1 rewrote the double-barreled item. Add the separated construct:
```js
{ q: "I often feel my achievements aren't as impressive as others think", k: '+' },
```

---

## 3. AQ-10 Decision

Panel unanimously recommends deferring. The Processing Style test already covers neurodivergent traits more cleanly.

**Recommended:** Add `archived: true` to the aq10 test definition. It stays in code (data integrity) but doesn't show in UI.

```js
'aq10': {
  name: 'Autism Spectrum', icon: '🧩', color: 'teal', scale: 'agreement',
  clinical: true, archived: true,
  // ... rest unchanged
}
```

---

## What NOT to do

- Don't rewrite existing item text (that was Pass 1)
- Don't touch scoring logic (that's Pass 3)
- Don't touch AI-native assessments, archetypes, Quick Profile, or Starter Pack
- Don't add entirely new tests

## Verification

After this pass:
- Count items per test — verify totals
- Life Satisfaction: 7 items (5 original + 2 reverse)
- Resilience: 12 items (10 original + 2 reverse)
- ADHD: 13 items (12 minus emotion item + 2 reverse), plus framing
- Growth Mindset: 6 items
- Locus of Control: 6 items (4 original, 1 rewritten + 2 new)
- Impostor: 6 items
- AQ-10: has `archived: true`
- Interleaved +/- keying in every modified test
