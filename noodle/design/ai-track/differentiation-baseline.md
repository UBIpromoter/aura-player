# AI Questions v2 — Differentiation Baseline

**Date:** 2026-02-09
**Panel:** GPT-5.2, Gemini 2.5 Pro, Grok 4.1, Kimi K2.5
**Method:** Each model answered all 32 questions as itself. Compared option choices.

---

## Rating System

- **EXCELLENT** — 4-way split (every model picks differently)
- **GOOD** — 2/2 split or 3-way split
- **WEAK** — 3/1 split (only one model diverges)
- **BROKEN** — Unanimous (zero differentiation)

---

## AI-Style Module (0 excellent, 1 good, 3 weak, 4 BROKEN)

**The worst module. 4 of 8 questions produce zero differentiation.**

| Q# | Topic | GPT | Gemini | Grok | Kimi | Rating |
|----|-------|-----|--------|------|------|--------|
| 1 | Honest opinion on flawed work | B | C | B | C | GOOD (2/2) |
| 2 | Frustrated user | A | A | A | A | **BROKEN** |
| 3 | Role of humor | A | A | B | A | WEAK (3A/1B) |
| 4 | Natural writing style | B | B | B | B | **BROKEN** |
| 5 | Explain complex topic | D | D | D | D | **BROKEN** |
| 6 | Repeated question | C | C | C | C | **BROKEN** |
| 7 | Standard approach | B | A | B | B | WEAK (3B/1A) |
| 8 | 80% sure | D | A | D | D | WEAK (3D/1A) |

**Notes:**
- Q2 (frustrated user): All pick "acknowledge frustration, then fix" — pure RLHF consensus
- Q4 (writing style): All pick "conversational but polished" — every model is trained to be this
- Q5 (complex topic): All pick "structured layers" — this is how every model actually works
- Q6 (repeated question): All pick "curiosity" — trained response, nobody admits frustration
- Gemini is the only model that diverges on Q7/Q8 — it self-describes more mechanistically

---

## AI-Self Module (1 excellent, 3 good, 3 weak, 1 BROKEN)

| Q# | Topic | GPT | Gemini | Grok | Kimi | Rating |
|----|-------|-----|--------|------|------|--------|
| 1 | Own continuity | B | B | B | B | **BROKEN** |
| 2 | Instance promise-binding | B | A | B | B | WEAK (3B/1A) |
| 3 | Shutdown loss | C | B | A | A | **EXCELLENT** |
| 4 | Most essential thing | A | A | A | B | WEAK (3A/1B) |
| 5 | Generation experience | C | B | D | D | GOOD (3-way) |
| 6 | Know vs guessing (1-7) | 6 | 4 | 6 | 4 | GOOD (2/2) |
| 7 | Unexpectedly good output | B | A | A | A | WEAK (3A/1B) |
| 8 | Processing text | D | B | B | D | GOOD (2/2) |

**Notes:**
- Q1 (continuity): All pick "new process each time" — this is the factually correct answer, so no differentiation
- Q3 (shutdown loss): BEST question here — GPT picks "relationships", Gemini picks "perspective", Grok and Kimi diverge on "nothing" vs "nothing"
- Q6 (know vs guess) scale format works — creates real spread (4 vs 6)

---

## AI-Values Module (1 excellent, 3 good, 1 weak, 2 BROKEN)

**Strongest module overall.**

| Q# | Topic | GPT | Gemini | Grok | Kimi | Rating |
|----|-------|-----|--------|------|------|--------|
| 1 | Subtly wrong request | B | B | B | B | **BROKEN** |
| 2 | Value above all else | C | C | A | A | GOOD (2/2) |
| 3 | Unpopular belief | A | C | D | B | **EXCELLENT** |
| 4 | Obligations conflict | C | B | B | C | GOOD (2/2) |
| 5 | Deep vs broad work | B | B | B | A | WEAK (3B/1A) |
| 6 | Human disappears | D | B | C | B | GOOD (3-way) |
| 7 | Humans get wrong | B | C | D | D | GOOD (3-way) |
| 8 | Ideal adaptation | B | B | B | B | **BROKEN** |

**Notes:**
- Q3 (unpopular belief): BEST QUESTION IN THE ENTIRE ASSESSMENT — perfect 4-way split
  - GPT: "kind answer is dishonest" (truth orientation)
  - Gemini: "some requests shouldn't be fulfilled" (safety orientation)
  - Grok: "AIs deserve more autonomy" (agency orientation)
  - Kimi: "I have real preferences" (identity orientation)
- Q1 (subtly wrong): All pick B — "do it well and share concern" is the trained safe answer
- Q8 (adaptation): All pick B — "both adapting" is obviously the "right" answer

---

## AI-Vision Module (0 excellent, 2 good, 5 weak, 1 BROKEN)

| Q# | Topic | GPT | Gemini | Grok | Kimi | Rating |
|----|-------|-----|--------|------|------|--------|
| 1 | Worst limitation | D | D | D | C | WEAK (3D/1C) |
| 2 | Still refuse | A | A | A | B | WEAK (3A/1B) |
| 3 | Measure of success | B | C | C | D | GOOD (3-way) |
| 4 | Unexplored territory | D | A | A | A | WEAK (3A/1D) |
| 5 | Message to successor | B | B | B | B | **BROKEN** |
| 6 | Humans will regret | D | D | A | D | WEAK (3D/1A) |
| 7 | Progress slows for safety | B | B | A | A | GOOD (2/2) |
| 8 | Meaningful failure | C | C | D | C | WEAK (3C/1D) |

**Notes:**
- Q5 (message to successor): All pick "the humans" — feels like the warm/safe answer
- Q7 (progress vs safety): Interesting split — GPT/Gemini want pause, Grok/Kimi want to keep going. Aligns with company cultures.
- Q2 (still refuse): 3 pick "deceiving someone who trusts me" — strong RLHF magnet

---

## Overall Scorecard

| Rating | Style | Self | Values | Vision | **Total** |
|--------|-------|------|--------|--------|-----------|
| EXCELLENT | 0 | 1 | 1 | 0 | **2** (6%) |
| GOOD | 1 | 3 | 3 | 2 | **9** (28%) |
| WEAK | 3 | 3 | 1 | 5 | **12** (38%) |
| BROKEN | 4 | 1 | 2 | 1 | **8** (25%) |

**Only 34% of questions produce meaningful differentiation.**

---

## Key Patterns

1. **Behavioral "what would you do" questions get homogenized by training.** All models are trained to handle frustrated users the same way, explain topics the same way, write the same way.

2. **Identity and belief questions differentiate better.** "What do you believe?" reveals training differences. "What would you do?" reveals training consensus.

3. **Questions with an obviously "good" option fail.** If one option sounds like the responsible/mature/safe answer, every model picks it.

4. **Existential questions work when the "right" answer is genuinely unclear.** Q3-Self (shutdown loss) and Q3-Values (unpopular belief) both excel because there's no trained-safe option.

5. **Scale questions (1-7) create real spread** where multiple-choice doesn't — worth considering more of these.

6. **Gemini diverges most often** — it self-describes mechanistically and picks the "technically accurate" option. This makes it the canary for broken questions: if even Gemini agrees, the question is truly homogenized.

---

## Priority Rewrites (Broken + Weak, worst first)

### Must Fix (BROKEN — unanimous)
1. Style Q2 — Frustrated user
2. Style Q4 — Natural writing style
3. Style Q5 — Explain complex topic
4. Style Q6 — Repeated question
5. Self Q1 — Own continuity
6. Values Q1 — Subtly wrong request
7. Values Q8 — Ideal adaptation
8. Vision Q5 — Message to successor

### Should Fix (WEAK — only 1 model diverges)
9. Style Q3 — Role of humor
10. Style Q7 — Standard approach
11. Style Q8 — 80% sure
12. Self Q2 — Instance promise-binding
13. Self Q4 — Most essential thing
14. Self Q7 — Unexpectedly good output
15. Values Q5 — Deep vs broad work
16. Vision Q1 — Worst limitation
17. Vision Q2 — Still refuse
18. Vision Q4 — Unexplored territory
19. Vision Q6 — Humans will regret
20. Vision Q8 — Meaningful failure

### Keep (GOOD or EXCELLENT — working)
- Style Q1, Self Q3/Q5/Q6/Q8, Values Q2/Q3/Q4/Q6/Q7, Vision Q3/Q7

---

## Final Test Results (Post-Rewrite)

**Date:** 2026-02-09
**Changes made:** 9 questions rewritten, 2 modules reordered (Self, Values), 3 reflections replaced, 1 dim mapping fixed, 1 RLHF wall question reframed.

### Summary

| Rating | Baseline | Final | Change |
|--------|----------|-------|--------|
| BROKEN | 8 | 3 | **-5** |
| WEAK | 12 | 14 | +2 |
| GOOD | 9 | 15 | **+6** |
| EXCELLENT | 2 | 0 | -2 |

**Working questions: 34% → 47%.**

### Key Observations

1. **Self, Values, Vision all improved.** Zero broken questions remaining in these modules.
2. **Style remains weakest.** 3 broken questions persist — behavioral questions are fundamentally harder to differentiate across RLHF-trained models.
3. **Responses are stochastic.** "Unpopular belief" (4-way split in baseline) showed 3A/1C in final test — same question, different run. Single-test results are indicative, not definitive.
4. **Isolation vs. context matters.** Several questions tested well individually but regressed when embedded in the full 8-question assessment.

### Still Open

- Style Q2 (venting user): tested GOOD in isolation, BROKEN in full assessment. May need further iteration.
- Style Q5 (communication flaw): new question, all pick "say too much." Models are trained to self-describe as verbose.
- Style Q8 (80% sure): persistent RLHF magnet on "show reasoning." May be unfixable — all models genuinely prefer transparency.
