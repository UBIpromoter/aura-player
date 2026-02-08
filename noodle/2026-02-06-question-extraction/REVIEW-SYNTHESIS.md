# Aura Content Review — 6-Model Synthesis & Action Plan

**Reviewers:** ChatGPT, Grok, Gemini, Claude Haiku, Claude Opus, Claude Sonnet
**Date:** 2026-02-06
**Status:** Draft — awaiting Philip's direction on priorities

---

## The Verdict

All six reviewers agree: the raw content is strong and the foundation is solid. The problems are **pacing, balance, and packaging** — not quality of the underlying material.

> "A tighter 350-question library that's consistently engaging beats a 411-question library where users hit dead patches." — Opus

> "7/10 content quality, 5/10 engagement optimization. Potential: 9/10." — Sonnet

> "Implementing the top 3-4 would push it firmly into 'can't stop answering' territory." — Grok

---

## Universal Agreement (6/6 reviewers)

These are not debatable. Every model flagged them independently:

1. **Front-load fun.** The first 20 questions after onboarding must be curated — debate bait, absurdist humor, shareable hypotheticals. Never serve in database order.

2. **Judgment at 55% is too heavy.** 225 of 411 questions are Judgment. It creates monotony and "opinion polling" fatigue. Target ~35-40% exposure, especially early.

3. **Playlist-style pacing.** Never serve heavy questions back-to-back. Interleave: Light → Medium → Light → Deep → Light. Philosophy after pizza toppings hits differently than philosophy after philosophy.

---

## Strong Agreement (4-5/6 reviewers)

4. **Archive the "rate this" / stats / methodology block.** Q191-215 and Q401-425 (~40 questions) read like a critical thinking exam. Keep 5-7 of the best (Q201 "I'm sorry you feel that way," Q203 job posting red flags, Q408 "we're like a family here"). Archive the rest.

5. **De-duplicate.** "Is a hot dog a sandwich?" appears in Onboarding, Q2, AND Q452. "Is water wet?" in Onboarding and Q7. Keep in Onboarding, archive duplicates.

6. **Add new fun/absurdist/spicy questions.** Multiple reviewers called for 10-30 new questions (IDs 456+) in the "low-stakes, high-passion" category.

7. **Diversify predictions beyond tech/crypto/AI.** Current 84 predictions skew heavily toward tech-forward audience. Add pop culture, social norms, health, sports, lifestyle predictions.

8. **Exploit the confidence slider.** It's the hidden superpower — transforms every question into meta-cognitive data. Surface "Confidence Profile" insights to users. "Certain" answers become "Hot Takes."

9. **Predictions need freshness/expiry system.** Add time-sensitive tags, review quarterly, auto-flag as dates pass.

---

## Product Decisions Made

These were debated across reviewers. Philip's calls:

### Shadow Self: LEAN IN (Gemini's instinct)

> ChatGPT/Grok/Haiku/Sonnet said soften. Gemini said promote. **Philip agrees with Gemini.**

Shadow Self is opt-in content. People fascinated by it will seek it out. People who aren't won't be forced into it. People who aren't "shadowy" will answer honestly, get a clean result, and learn something about themselves anyway. The self-awareness IS the reward.

**Action:** Don't hide Shadow Self in Tier 2. Tease it early. Frame it as intriguing, not accusatory. "Unlock your Villain Era" energy. Consider early access or teaser.

### Pineapple Pizza: Reword

Q444 "Does pineapple belong on pizza?" is currently binary — but many people like it sometimes.

**Action:** Change to multiple choice: "Is pineapple a valid pizza topping?" with options like:
- A. Absolutely — Hawaiian pizza is great
- B. Sometimes, in the right combination
- C. Never — fruit doesn't belong on pizza
- D. I don't care enough to have an opinion

---

## Action Plan

### TIER 1: DO IMMEDIATELY (Highest Impact)

#### 1A. Curate the "First 50" Serving Pool

Tag 50 questions as `first-serve` candidates. These should be the questions most likely to make someone smile, pause, or want to tell a friend. The algorithm draws from this pool for new users' first session.

**Suggested pool (drawn from all 6 reviewers' picks):**

*Absurdist/Debate Bait:*
- Q2: Is a hot dog a sandwich? (keep here OR onboarding, not both)
- Q4: 100 duck-sized horses vs 1 horse-sized duck
- Q10: Is a Pop-Tart a ravioli?
- Q11: Could an average person beat a goose in a fight?
- Q16: Batman vs Superman (no prep, no kryptonite)
- Q34: Is cereal a soup?
- Q441: Toilet paper direction
- Q444: Pineapple on pizza (reworded to MC)
- Q446: Ketchup on a hot dog
- Q449: How do you eat a Kit Kat?
- Q453: How do you eat Oreos?

*Deep But Accessible:*
- Q81: Teleporter identity preservation
- Q90: Happy pill but delusional
- Q91: Would you live forever?
- Q108: Would you want to know your death date?
- Q170: Is ghosting okay after a few dates?

*Predictions That Pop:*
- Q9: Will humans land on Mars before 2035?
- Q52: Which social platform will dominate in 2030?
- Q55: What happens to Twitter/X by 2030?
- Q69: Discover extraterrestrial life by 2050?
- Q76: What will replace smartphones?

*Spicy Judgment:*
- Q116: Should billionaires exist?
- Q174: Is it okay to recline your airplane seat?
- Q377: Best pizza topping
- Q374: Better to be early or on time?

#### 1B. Archive ~50 Low-Energy Questions

These are the questions that multiple reviewers independently flagged as energy killers. Archive them (never delete — set `archived: true`).

**"Rate This" / Stats Block (archive ~30 of 40):**
Keep: Q201, Q203, Q206, Q405, Q408 (the ones with social/workplace humor)
Archive: Q191, Q193, Q194, Q196, Q197, Q205, Q207, Q210-215, Q401, Q404, Q409, Q411-414, Q416-417, Q419, Q421-422, Q424

**Lifestyle Preferences (archive ~15-20):**
Archive: Q371 (home temperature), Q185 (sleep amount), Q187 (workout time), Q189 (commute time), Q363 (family dinner frequency), Q387 (screen time), Q391 (morning routine length), Q393 (best way to save money), Q395 (what matters in a car), Q397 (best networking approach), Q399 (vacation frequency)

**Stale/Academic (archive ~5-10):**
Archive: Q5 (deepfake methodology — too academic), Q7 (water wet — duplicate of onboarding + tired), Q452 (hot dog — duplicate of Q2)

**Target:** ~411 active → ~350-360 active. Tighter, more consistently engaging.

#### 1C. Fix Duplicates

| Keep | Archive | Question |
|------|---------|----------|
| Onboarding | Q2, Q452 | Is a hot dog a sandwich? |
| Onboarding | Q7 | Is water wet? |

Review for near-duplicates: Q373 (best time to exercise) vs Q187 (best time to work out), Q309/Q12/Q272 (existential threat variations).

---

### TIER 2: DO SOON (High Impact, Requires New Content)

#### 2A. Add 20-30 New Questions (IDs 456+)

**Spicy Takes / Debate Bait:**
- Red Sox or Yankees? (sports tribalism)
- Ketchup or mayo on french fries?
- More pronunciation debates: crayon, aunt, caramel (already have GIF, pecan, data)
- Is cereal a valid dinner?
- Is it acceptable to microwave fish in a shared office?
- Is it worse to be 10 minutes late or 30 minutes early?
- Can men and women be "just friends"?
- Is it rude to not finish food someone cooked for you?
- Should you tip at coffee shops?
- Is double-dipping chips acceptable?

**"Would You Rather" / Scenario Questions (biggest content gap per Opus):**
- Would you rather always know when someone is lying, or always get away with lying?
- You find a wallet with $500 and an ID. No cameras. What do you do?
- Would you rather be famous for something you didn't do, or unknown for something incredible?
- Would you rather have 10 years of peak adventure or 40 years of comfortable routine?
- If you could read minds but couldn't turn it off, would you want to?

**Diversified Predictions:**
- Will a video game gross more than the highest-grossing movie by 2030?
- Will mental health days be legally required in the US by 2030?
- Will more Americans live alone than with a partner by 2035?
- Will remote work be more or less common in 2030 than today?
- Will any current slang word appear in the dictionary by 2030?

**Fun Philosophy (middle tier between memes and existentialism):**
- Is it better to be a small fish in a big pond or a big fish in a small pond?
- Would you rather be the funniest person in the room or the smartest?
- Is it better to be respected or liked?
- Do you think people are fundamentally good? (Gemini suggested as onboarding bridge)

#### 2B. Add Evidence Snippets to 50+ More Questions

Currently only 24/411 have evidence. Every prediction should have context. Add to:
- All remaining predictions (current stats, timelines, context)
- Controversial reasoning questions ("Famous thinkers disagree on this")
- Surprising judgments (poll data showing how divided people are)

Example: Q116 "Should billionaires exist?" → Add: "US billionaire wealth: $5.2T | Median US net worth: $192k"

#### 2C. Reword Q444 (Pineapple Pizza)

**Current:** "Does pineapple belong on pizza?" *(binary)*
**New:** "Is pineapple a valid pizza topping?" *(multiple choice)*
- A. Absolutely — Hawaiian pizza is great
- B. Sometimes, in the right combination
- C. Never — fruit doesn't belong on pizza
- D. I don't care enough to have an opinion

---

### TIER 3: SYSTEM & ASSESSMENT IMPROVEMENTS

#### 3A. Confidence Slider Enhancements

- Surface a "Confidence Profile" insight early: "You're certain on 70% of your answers — you trust your judgment"
- "Certain" answers on predictions become "Hot Takes" in the user's profile
- Show calibration: "You hedge more on emotional questions than factual ones"
- Social comparison: "You're more confident than 80% of users on this topic"

#### 3B. Shadow Self Promotion

- Tease Shadow Self early in the unlock flow, not buried in Tier 2
- Frame as intriguing: "Everyone has strategies they don't talk about"
- Consider "Unlock your Villain Era" or "Discover your Dark Side" positioning
- Add a reassuring but compelling intro: "This isn't about good or bad — it's about what you do when nobody's watching"

#### 3C. Assessment Naming & Framing

Multiple reviewers flagged clinical names as engagement killers:

| Current | Proposed | Why |
|---------|----------|-----|
| ADHD Screen | Focus & Organization Style | Clinical labels scare people away |
| Cognitive Style | Pattern Recognition & Detail Sensitivity | Undersells what's actually interesting |
| IQ / Reasoning | Logic Style / Problem Solving Archetype | Nobody wants to feel stupid |
| Shadow Self → Detachment | Cool Under Pressure / Emotional Armor | Less clinical |

#### 3D. Assessment-to-Question Bridge

The tonal shift between fun world questions and Likert-scale assessments is abrupt (Opus). Add a narrative transition:

> "The questions asked about the world. Now let's ask about YOU."

Frame assessment unlocks as leveling up, not switching apps.

#### 3E. Big Five Restructuring

Gemini: Break the 50-item Big Five into 5 named mini-tests for dopamine hits every 10 items:
- "Social Battery Test" (Extraversion)
- "The Peacekeeper" (Agreeableness)
- "Chaos Coordinator" (Conscientiousness)
- "The Worry Meter" (Neuroticism)
- "The Explorer" (Openness)

Opus alternative: Keep Big Five structure, but append 2-3 Aura-styled behavioral items to each dimension that feel more vivid than standard IPIP.

#### 3F. Serving Algorithm Rules

Build pacing logic:
- **Temperature lanes:** Light → Medium → Light → Deep → Light
- **Category rotation:** Never serve 3+ Judgment questions in a row
- **Philosophy spacing:** Max 2 philosophical questions per 10-question window
- **Prediction freshness:** Auto-flag questions with dates < 3 months out

#### 3G. Unlock Model (Sonnet's suggestion)

Consider Netflix-style progressive reveal instead of showing all 17 Tier 2 tests at once:
- Show 3-5 assessments at a time
- Unlock new ones as you complete them
- Order by engagement potential: Shadow Self and Risk Tolerance early, Big Five later

---

### TIER 4: FUTURE CONSIDERATIONS

These came up in reviews but are larger product decisions:

- **Viral loop UX:** "Share your answer" button, "Compare with a friend," "X% of people got this wrong" reveals (Sonnet)
- **Identity exploration questions:** "What would you do if money wasn't a factor?" — discovery prompts, not just measurement (Sonnet)
- **Confidence-calibrated knowledge traps:** Un-archive or add questions where most people are confidently wrong — Venus temperature, Everest height, Sahara desert (Opus)
- **Early micro-rewards:** "You're trending toward ___" after 5-8 answers (ChatGPT, Grok)
- **Scoring transparency:** Badges/archetypes after each completed assessment, not just at the end (Gemini)
- **Scale consistency UX:** Visual cue when switching between Likert scales (agreement vs frequency vs likelihood) to prevent data errors (Opus)

---

## Appendix: Reviewer Agreement Matrix

| Theme | Chat | Grok | Gemini | Haiku | Opus | Sonnet |
|-------|------|------|--------|-------|------|--------|
| Front-load fun / curate first 20 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Judgment 55% is too heavy | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Playlist-style pacing | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Archive "rate this" / stats block | — | — | ✓ | ✓ | ✓ | ✓ |
| De-duplicate (hot dog etc.) | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| Add new fun/absurdist questions | — | ✓ | ✓ | ✓ | ✓ | ✓ |
| Diversify predictions beyond tech | — | — | ✓ | ✓ | ✓ | ✓ |
| Confidence slider underutilized | — | — | ✓ | ✓ | ✓ | ✓ |
| Shadow Self tone | Soften | Soften | **Promote** | Soften | Frame | Soften |
| Predictions need freshness/expiry | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| Evidence snippets on more Qs | ✓ | ✓ | — | — | — | ✓ |
| Rename clinical assessments | — | — | ✓ | ✓ | — | — |
| Break Big Five into mini-tests | — | — | ✓ | — | Augment | — |
| Netflix unlock model | — | — | — | — | — | ✓ |
| Add scenario / "would you rather" | — | — | — | — | ✓ | ✓ |
| Viral loop / share UX | — | — | — | — | — | ✓ |
| Replace onboarding with Quick Profile | — | — | — | — | — | ✓ |
| Assessment-to-question bridge | — | — | — | — | ✓ | — |

---

## What This Doesn't Cover

This synthesis is about **content quality and engagement**. It does not address:
- UI/UX implementation details
- Backend serving algorithm architecture
- Scoring/psychometric model changes
- Data migration mechanics

Those are separate workstreams that would follow from the content decisions made here.
