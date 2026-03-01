# Assessment Item Review — Consolidated Report
Date: 2026-03-01
Reviewed: 41 tests, 391 items

## Summary Verdict

### PASS (No Changes Needed)
- **Grit** (8 items) — Excellent balance (4+/4-), faithful to Grit-S, no issues
- **Emotional Intelligence** (12 items) — Strong 4-dimension structure, good reverse keying (3/12), clean
- **Conflict Style** (12 items) — TKI well-adapted, 2 good cross-cutting reverses, excellent
- **Creativity** (10 items) — 4 clear subcategories, 2 reverse items, behaviorally concrete
- **Locus of Control** (4 items) — Clean IE-4 adaptation, minor wordiness on item 4
- **Growth Mindset** (3 items) — Faithful to Dweck, but only 3 items = borderline reliability. Consider expanding to 5.
- **GAD-7** (7 items) — Faithful adaptation. Needs Pfizer license check + follow-up resources.

### REVISE (Fixable Issues)
- **Life Satisfaction** (5 items) — ALL items positive-keyed. Add 1-2 reverse items.
- **Resilience** (10 items) — ALL items positive-keyed. Add 2 reverse items.
- **Starter-Wellbeing** (8 items) — Item 3 double-barreled (comparing + feeling behind). Only 3/8 reverse-keyed.
- **Impostor** (5 items) — Item 4 double-barreled ("downplay because I don't think..."). Split it.
- **Values/MFQ** (20 items) — Balance is excellent (10+/10-), BUT:
  - Item 9 ("proud of country's history") assumes positive national history
  - Item 10 ("loyal to family even when wrong") may endorse toxic loyalty
  - Items 17-18 use coded language ("disgusting", "unnatural") — discriminatory risk
  - Consider rewriting Purity foundation items or deferring Purity entirely

### REVISE — Phase 1 Fixes
- **Integrity/Honesty & Humility** — Item "return extra change" is hypothetical (high social desirability). Item "honest and disliked" is false dichotomy. Add 1 reverse-keyed item.
- **Shadow-M** — Item "lose an argument" extreme framing. Rewrite: "I avoid underhanded tactics even if they'd help."
- **Shadow-N** — Item "genuinely celebrate" is wordy/abstract. Simplify: "When someone else succeeds, I feel happy for them."
- **Shadow-P** — Item "emotions affect me, even when I wish they didn't" is double-barreled. Minor but could simplify.
- **ADHD** — Item "emotions feel more intense than others'" uses comparative judgment. Rewrite to avoid estimating others' states. Item "lose track of everything" reads too positive for hyperfocus — add disruption framing.
- **Cognitive/Processing Style** — Item "gut feelings" is vague. Add specificity.
- **Attachment** — Item "ask for what I need without excessive worry" is double-barreled. Secure items good but may attract social desirability.

### CONDITIONAL / DEFER
- **PHQ-9** (9 items) — Faithful to validated instrument BUT:
  - Item 9 (suicidality) REQUIRES safety protocol (crisis line, resources)
  - Needs Pfizer license check
  - Do NOT launch without safety protocol
- **AQ-10** (10 items) — MAJOR CONCERNS:
  - Item 10 ("new situations make me anxious") measures anxiety, not autism
  - Items 5, 6, 9 conflate autism with social difficulty (false positives from social anxiety)
  - Missing core autism traits: special interests, repetitive behaviors, sensory seeking
  - Known gender/racial bias in AQ-10
  - RECOMMENDATION: Defer to later phase or substantially rewrite

## Code Review Findings

### Unlock Logic
- `calculateAssessUnlocks` correctly maps each starter to its branch
- Shadow correctly requires all Big Five
- Clinical requires 3+ branches
- Backward-compatible `calculateAssessTier` wrapper preserved

### Scoring
- All new tests have scoring branches in `calculateAssessResults`
- Reverse keying (6 - value) correctly applied
- Subscale calculations correct
- Attachment updated for 3-dimension scoring (anx, av, sec)
- ADHD subscale scoring added for expanded items
- Cognitive now uses `calculateScaleScore` (handles k: '-')

### Edge Cases Noted
- `getCategoryStatus` correctly checks both tier AND branch access
- `requires` field (Shadow needing Big Five) is checked in status function
- Existing user data backward-compatible (items only appended, never deleted/reordered)

## Action Items (Priority Order)

### P0 — Must Fix Before Launch
1. Add safety protocol for PHQ-9 suicidality item (crisis resources)
2. Add 1-2 reverse items to Life Satisfaction
3. Add 2 reverse items to Resilience
4. Rewrite Values items 9, 10, 17, 18 (cultural bias / coded language)
5. Decide: defer AQ-10 or substantially rewrite

### P1 — Should Fix
6. Fix double-barreled items: Starter-Wellbeing #3, Impostor #4, Attachment secure #2
7. Rewrite Integrity "return extra change" (hypothetical → behavioral)
8. Simplify Shadow-N "genuinely celebrate" wording
9. Verify Pfizer licensing for PHQ-9 and GAD-7
10. Add clinical disclaimers and resource links for all Phase 4 tests

### P2 — Nice to Have
11. Expand Growth Mindset from 3 to 5 items (reliability)
12. Soften Grit item 6 "never give up" → "rarely give up"
13. Add cultural context notes to Attachment and Processing Style
14. Add 1 reverse-keyed item to Integrity
15. Reframe ADHD hyperfocus item to emphasize disruption
