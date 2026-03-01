# Heads Up: Assessment V2 Rethink (parallel work stream)

## What's happening

A separate work stream has been rewriting the entire assessment system. This is happening in the production files (`aura-assessments.js`, `aura-scoring.js`, `index.html`) while you've been working on the rebuild at `noodle/rebuild/index.html`. The work is ~95% complete but not yet committed.

**You don't need to change code right now.** This is context for what's coming.

---

## What changed

### Scale: 23 tests → 41+ tests, ~210 items → 700+ items

### Structure: Branch-aware tech tree

The old progression was linear. The new one branches:

```
Quick Profile (always available)
  ↓
Starter Pack (6 modules, unlocked after QP)
  ├─ starter-personality → Big Five + Shadow
  ├─ starter-motivation  → Grit, Growth Mindset, Locus of Control, Values
  ├─ starter-thinking    → Processing Style, ADHD, Creativity, Chronotype, Reasoning
  ├─ starter-connection  → Attachment, Conflict Style, Emotional Intelligence
  ├─ starter-strategy    → Honesty & Humility, Impostor Syndrome
  └─ starter-wellbeing   → Life Satisfaction, Resilience

Clinical (PHQ-9, GAD-7) — always available, behind consent gate
Shadow — requires 3/5 Big Five complete
```

### Item quality pass

- ~40 items rewritten for conversational tone (clinical → human)
- Reverse-keyed items added to every previously all-positive test (acquiescence bias fix)
- Cultural bias remediation on Values test (MFQ items reframed)
- Double-barreled items split
- ADHD expanded 6 → 13 items with 4 subscales

### Scoring changes

- New subscale scoring (ADHD, Grit, Values, Conflict, EI, Honesty & Humility)
- Reverse-key handling (`k: '-'` → `6 - value` before summing)
- Attachment now 3-dimensional (added secure dimension)
- Clinical tests (PHQ-9, GAD-7) with severity bands

### Safety

- PHQ-9 item 8 (suicidality) triggers non-blocking crisis banner
- Crisis resources: 988 Lifeline, Crisis Text Line, 911
- Clinical tests behind explicit consent screen

---

## What this means for the rebuild

The rebuild imports `aura-assessments.js` and `aura-scoring.js` via `<script>` tags, so the data changes flow in automatically. But the UI will need updates:

1. **Assess picker** — currently shows a flat list. Will need to show 6 branches with locked/unlocked state. 41 tests won't fit the current layout.

2. **Unlock logic** — `calculateAssessUnlocks` is being rewritten in production `index.html`. The rebuild has its own version that will need to be replaced with the branch-aware logic.

3. **Results screens** — need to handle subscale data (e.g., ADHD shows inattention/executive/hyperactivity/impulsivity breakdown, not just a single score).

4. **Clinical consent gate** — new screen/modal before PHQ-9 and GAD-7.

5. **PHQ-9 safety banner** — new component, non-blocking, appears on specific scoring threshold.

6. **Data migration** — V2 item indices don't map to V1. Users will need localStorage cleared. The rebuild should handle this gracefully (detect version mismatch → reset).

---

## What NOT to do

- Don't start implementing any of this yet. The assessment work isn't committed.
- Don't modify `aura-assessments.js` or `aura-scoring.js` — they're being actively edited in another window.
- Don't change the rebuild's assess picker, results, or unlock logic preemptively.

When the assessment V2 is committed, we'll write a focused brief for integrating it into the rebuild. For now, just be aware it's coming — the rebuild's Phase 7 polish work on assess screens may need revisiting.
