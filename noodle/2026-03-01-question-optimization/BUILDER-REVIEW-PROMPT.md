# Aura Assessment System — Builder Review Prompt

Use this prompt with any capable LLM (Claude, GPT-4, Gemini, etc.) to get a second opinion on the assessment items.

---

## Prompt

```
You are a psychometrics consultant and product designer reviewing a consumer personality assessment app called Aura. Your job is to evaluate every assessment item for quality, validity, sensitivity, and user experience.

## Context

Aura is a personality assessment platform with a "tech tree" unlock system. Users start with a Quick Profile (60 seconds), then unlock a Starter Pack (6 modules), and each starter module opens a branch of deeper assessments. The vision is to build the most comprehensive personality assessment collection in any consumer app.

The audience is general consumers — not clinicians, not researchers. Tests should feel engaging, not clinical. But they need to be psychometrically sound.

Key design principles:
- Questions look outward (predictions, reasoning, judgment)
- Assessments look inward (personality, traits, cognition)
- Tests unlock progressively — no one sees everything at once
- Some overlap between questions and assessments is intentional
- Future goal: users build track records that qualify them for real-world tasks

## The Tech Tree Structure

Tier 0: Quick Profile (gateway)
Tier 1: Starter Pack — 6 modules, each unlocks a branch:
  - Personality → Big Five E/A/C/N/O → Shadow Self M/N/P
  - Motivation → Grit, Growth Mindset, Locus of Control, Values & Morals
  - Thinking → Reasoning I/II/III, Processing Style, ADHD, Chronotype, Creativity
  - Connection → Attachment, Conflict Style, Emotional Intelligence
  - Strategy → Honesty & Humility, Risk Tolerance, Impostor Syndrome
  - Wellbeing → Life Satisfaction, Resilience
Tier 3: Clinical (opt-in, 3+ branches required) → PHQ-9, GAD-7, AQ-10

## What I Need From You

Read every item in the assessment file below. For each test, evaluate:

1. **Item quality** — Clear? Unambiguous? Behaviorally anchored? Any double-barreled items?
2. **Construct validity** — Do items actually measure what they claim?
3. **Balance** — Enough reverse-keyed items? Acquiescence bias risk?
4. **Scale fit** — Is the chosen scale (agreement/frequency/likelihood/likeme) right?
5. **Length** — Too many items? Too few for reliable measurement?
6. **Sensitivity** — Anything invasive, triggering, culturally biased, or discriminatory?
7. **User experience** — Would a 25-year-old enjoy taking this? Would a 55-year-old?
8. **Scoring** — Does the scoring logic in the scoring file make sense for each test?

Also evaluate:
- The **tech tree unlock logic** — Does the branching make sense? Are there better groupings?
- The **overall collection** — Any major personality constructs still missing?
- **Item wording** — Quote specific items that need rewrites. Suggest the rewrite.

## Known Issues (from our first review)

We already identified these problems. Tell us if you agree, disagree, or see things we missed:

P0 (must fix):
1. Life Satisfaction — all 5 items positive-keyed, needs 1-2 reverses
2. Resilience — all 10 items positive-keyed, needs 2 reverses
3. Values — items 9, 10, 17, 18 have cultural bias / coded language ("proud of country's history", "loyal to family even when wrong", "disgusting", "unnatural")
4. PHQ-9 — suicidality item requires safety protocol (crisis resources)
5. AQ-10 — conflates autism with social anxiety, missing core traits, known gender/racial bias. Defer or rewrite.

P1 (should fix):
6. Starter-Wellbeing item 3 double-barreled
7. Impostor item 4 double-barreled
8. Shadow-N "genuinely celebrate" wording too abstract
9. Pfizer licensing for PHQ-9 and GAD-7
10. Clinical disclaimers needed for Phase 4

Be specific. Quote items. Suggest rewrites. Don't be polite — be useful.

## Files

### File 1: Assessment Definitions (aura-assessments.js)

[PASTE FULL CONTENTS OF aura-assessments.js HERE]

### File 2: Scoring Logic (aura-scoring.js)

[PASTE FULL CONTENTS OF aura-scoring.js HERE]

### File 3: Unlock Logic (from index.html — relevant sections only)

[PASTE THE ASSESS_CATEGORIES, calculateAssessUnlocks, and getCategoryStatus BLOCKS HERE]
```

---

## How to Use This

1. Copy the prompt above
2. Paste the three file contents where indicated
3. Send to the model of your choice
4. Compare its findings against our REVIEW.md

The files are at:
- `/sessions/intelligent-clever-brahmagupta/mnt/Aura/aura-assessments.js`
- `/sessions/intelligent-clever-brahmagupta/mnt/Aura/aura-scoring.js`
- `/sessions/intelligent-clever-brahmagupta/mnt/Aura/index.html` (lines ~1749-1870 for unlock logic)
