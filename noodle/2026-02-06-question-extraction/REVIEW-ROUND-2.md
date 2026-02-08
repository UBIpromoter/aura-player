# Aura Content Review — Round 2

You reviewed our content in Round 1. Six models participated (ChatGPT, Grok, Gemini, Claude Opus, Claude Sonnet, Claude Haiku). We've synthesized all the feedback into decisions and an action plan. Now we need your help refining the specifics.

This document has three parts:
1. **What we heard** — the consensus from Round 1
2. **What we've decided** — product calls we've made
3. **What we need from you now** — specific Round 2 asks

---

## Part 1: What We Heard

### Universal Agreement (6/6 reviewers)

- **Front-load fun.** The first 20 questions must be curated — debate bait, absurdist humor, shareable hypotheticals. Never serve in database order.
- **Judgment at 55% is too heavy.** 225/411 questions. Creates "opinion polling" fatigue. Target ~35-40%.
- **Playlist-style pacing.** Never serve heavy questions back-to-back. Interleave light and deep.

### Strong Agreement (4-5/6)

- **Archive the "rate this" / stats block** (~40 questions, Q191-215 and Q401-425). Reads like a critical thinking exam.
- **De-duplicate.** "Is a hot dog a sandwich?" appears 3 times. "Is water wet?" appears twice.
- **Add 20-30 new fun questions** — low-stakes, high-passion spicy takes and "would you rather" scenarios.
- **Diversify predictions beyond tech/crypto/AI** — too narrow for a general audience.
- **The confidence slider is underutilized** — it's a powerful personality signal that should be surfaced to users.
- **Predictions need a freshness/expiry system** for date-bound questions.

### The One Big Debate: Shadow Self

- 4 reviewers said soften the Dark Triad framing to reduce defensiveness
- 1 reviewer (Gemini) said promote it — "Unlock your Villain Era" is a stronger hook than hiding it in Tier 2
- We sided with Gemini. More on that below.

---

## Part 2: What We've Decided

### Decision 1: Shadow Self = Lean In

We're promoting Shadow Self, not softening it. It's opt-in content — people fascinated by it will seek it out, people who aren't won't be forced into it, and people who answer honestly will just get a clean result that reflects who they are. The self-awareness is the reward.

**We will:**
- Tease Shadow Self earlier in the unlock flow
- Frame it as intriguing: "Everyone has strategies they don't talk about. This isn't about good or bad — it's about what you do when nobody's watching."
- Keep the items direct — no watering down

### Decision 2: Archive ~50 Questions

We're trimming from 411 active to ~350-360. A tighter library that's consistently engaging beats a larger one with dead patches.

**Archiving:**
- ~30 from the "rate this" / credibility / methodology block (keeping Q201, Q203, Q206, Q405, Q408 — the ones with social/workplace humor)
- ~15-20 lifestyle preference questions that feel like market research (home temperature, commute time, morning routine length, best way to save money, what matters in a car, vacation frequency, etc.)
- Duplicates (Q2, Q7, Q452 — keeping originals in Onboarding)
- Q5 (deepfake methodology — too academic for question #5)

### Decision 3: Add New Content (IDs 456+)

We're adding questions in these categories:
- **Spicy Takes:** Red Sox vs Yankees, ketchup vs mayo on fries, more pronunciation debates (crayon, aunt, etc.), microwave fish at work, double-dipping, tipping at coffee shops
- **Would You Rather / Scenarios:** Biggest content gap identified by multiple reviewers
- **Diversified Predictions:** Pop culture, social norms, health, sports, lifestyle
- **Fun Philosophy:** Middle ground between meme debates and existentialism
- **Pineapple pizza reword:** Q444 changes from binary "Does pineapple belong on pizza?" to MC "Is pineapple a valid pizza topping?" with a "sometimes" option

### Decision 4: System Improvements (Later)

These are queued but not the focus of this round:
- Confidence slider surfaced as "Confidence Profile" and "Hot Takes"
- Assessment renaming (ADHD Screen → Focus & Organization Style, etc.)
- Serving algorithm with temperature-lane pacing
- Narrative bridge between world questions and assessments
- Big Five broken into 5 named mini-tests

---

## Part 3: What We Need From You (Round 2)

### Ask 1: Review Our Archive List

Here are the specific questions we plan to archive. Tell us:
- Are we archiving anything that's actually good and should stay?
- Are there questions we're keeping that should also be archived?
- Any concerns with this cut?

**Archiving (set `archived: true` — never deleted, IDs preserved):**

*"Rate This" / Credibility Block:*
Q191, Q193, Q194, Q196, Q197, Q205, Q207, Q210, Q211, Q212, Q213, Q214, Q215, Q401, Q404, Q409, Q411, Q412, Q413, Q414, Q416, Q417, Q419, Q421, Q422, Q424

*Lifestyle Preferences:*
Q185, Q187, Q189, Q363, Q371, Q387, Q391, Q393, Q395, Q397, Q399

*Duplicates / Stale:*
Q2 (hot dog — duplicate of Onboarding), Q5 (methodology — too academic), Q7 (water wet — duplicate of Onboarding), Q452 (hot dog — duplicate of Onboarding)

*Keeping from those blocks (the ones with personality signal or humor):*
Q201 ("I'm sorry you feel that way"), Q203 (job posting red flags), Q206 (rate this dating profile), Q405 ("I'm sorry but you misunderstood me"), Q408 ("We're like a family here")

### Ask 2: Write Us 25 New Questions

We need new questions for IDs 456-480. Write them in this format:

```
ID. Question text *(type: binary or multiple)*
  A. Option 1
  B. Option 2
  C. Option 3
  D. Option 4
> Evidence snippet (optional — for predictions and surprising facts)
Category: prediction / reasoning / judgment
```

**What we want:**
- 5 Spicy Takes (low-stakes, high-passion cultural debates — think toilet paper direction, pronunciation wars, food opinions)
- 5 "Would You Rather" / Scenario questions (forced tradeoffs that reveal personality)
- 5 Diversified Predictions (NOT tech/AI/crypto — give us pop culture, social norms, health, sports, lifestyle)
- 5 Fun Philosophy (deeper than memes, lighter than existentialism — "dinner party questions")
- 5 Wild Cards (surprise us — whatever you think is missing)

**Quality bar:** Every question should pass this test — would someone smile, pause, or want to debate their answer with a friend? If it feels like a survey, a quiz, or homework, it's wrong.

### Ask 3: Review Our "First 50" Serving Pool

These are the questions we'd tag for new users' first session. The algorithm draws from this pool to create a curated first experience.

**Proposed First-Serve Pool:**

*Absurdist / Debate Bait:*
Q4 (duck-sized horses), Q10 (Pop-Tart ravioli), Q11 (beat a goose), Q16 (Batman vs Superman), Q34 (cereal soup), Q441 (toilet paper), Q444 (pineapple — reworded), Q446 (ketchup on hot dog), Q449 (Kit Kat eating method), Q453 (Oreo eating method)

*Deep But Accessible:*
Q81 (teleporter identity), Q90 (happy pill), Q91 (live forever), Q108 (know your death date), Q170 (ghosting okay?)

*Predictions That Pop:*
Q9 (Mars landing), Q52 (social platform 2030), Q55 (Twitter/X future), Q69 (extraterrestrial life), Q76 (what replaces smartphones)

*Spicy Judgment:*
Q116 (should billionaires exist), Q174 (recline airplane seat), Q377 (best pizza topping), Q374 (early vs on time)

Plus some of the new 456+ questions once written.

**Tell us:**
- Would this pool hook you in the first session?
- What's missing? What would you swap out?
- Is the mix right? (Currently ~10 absurdist, 5 deep, 5 predictions, 4 spicy judgment)
- What's the single best question to serve FIRST?

### Ask 4: Shadow Self Framing

We've decided to lean into Shadow Self rather than soften it. Help us get the framing right.

**Current state:**
- 3 subscales: Strategic Mind (Machiavellianism), Self-Image (Narcissism), Detachment (Psychopathy)
- 18 items total, agreement scale (Strongly Disagree → Strongly Agree)
- Currently locked behind Tier 2

**We want:**
- A compelling 1-2 sentence intro that makes people WANT to take this test without being clickbait
- Feedback on the subscale names — are "Strategic Mind," "Self-Image," and "Detachment" the right balance of intriguing and honest?
- Should we rename "Shadow Self" itself? Options on the table: Shadow Self, Dark Mirror, The Unfiltered You, Hidden Playbook, or suggest your own
- How should results be framed? Not as diagnosis, but as insight. What tone?

### Ask 5: Anything We Missed?

After seeing our decisions and action plan:
- What did we get wrong?
- What are we underweighting?
- What would YOU prioritize differently?
- Any blind spots in our approach?

---

## Reference: Data Rules (Same as Round 1)

These constraints are non-negotiable:

### Questions (Q_RAW)
1. **NEVER reuse an ID** — always increment (next available: 456+)
2. **NEVER delete** — set `archived: true` instead
3. Minor edits (typos, rewording) OK. Major changes = new question with new ID.

### Assessments
1. **NEVER delete a test** — archive to hide
2. **NEVER delete or reorder questions within a test** — index is stored in user responses
3. Can **ADD** questions to the **END** of a test's items array
4. Minor edits OK. Major changes = discuss implications.

---

## Reference: Current Content Stats

| | Before | After Archive | Change |
|---|---|---|---|
| Active world questions | 411 | ~370 | -41 |
| Predictions | 84 | 84 | — |
| Reasoning | 102 | 101 | -1 |
| Judgment | 225 | ~185 | -40 |
| New questions (TBD) | — | +25 | +25 |
| **Projected total** | **411** | **~395** | |

| | Count |
|---|---|
| Assessment tests | 23 |
| Assessment items | 210 |
| Onboarding questions | 10 |

---

*Thanks for Round 1. Let's make this content something people can't stop answering.*
