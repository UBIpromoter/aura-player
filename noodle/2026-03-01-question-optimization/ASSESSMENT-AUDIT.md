# Aura Assessment Audit
**Date:** 2026-03-01

---

## WHAT WE HAVE (23 tests, 210 items)

| Test | Items | Grade | Verdict |
|------|-------|-------|---------|
| Quick Profile | 10 | B+ | Good gateway, minor tweaks |
| Starter: Personality | 9 | B+ | Solid |
| Starter: Motivation | 8 | B+ | Solid |
| Starter: Thinking | 8 | A- | Strong |
| Starter: Connection | 8 | B | Some invasive items |
| Starter: Strategy | 8 | A- | Strong |
| Big Five: E | 10 | A | Gold standard, keep as-is |
| Big Five: A | 10 | A- | Minor tweaks ("I insult people" → soften) |
| Big Five: C | 10 | A | Keep as-is |
| Big Five: N | 10 | B+ | Add sensitivity framing |
| Big Five: O | 10 | A- | "I use difficult words" → reframe |
| ADHD Screen | 6 | C | **TOO SHORT.** Needs 12+ items |
| Cognitive Style | 10 | C+ | **Covert autism screen.** Needs reverse items + framing |
| Attachment | 12 | B | Missing secure attachment. Needs framing |
| Risk Tolerance | 15 | C+ | **Mixes 4 constructs.** Split or clarify subscales |
| Integrity | 6 | B- | Conflates honesty + status-seeking |
| Shadow: Strategic Mind (M) | 6 | C+ | **All positive-keyed.** Major bias risk |
| Shadow: Self-Image (N) | 6 | C+ | **All positive-keyed.** Major bias risk |
| Shadow: Detachment (P) | 6 | C | **All positive-keyed.** Major bias risk |
| Chronotype | 6 | B+ | Clean, minor tweaks |
| Reasoning I | 12 | A | Solid progression |
| Reasoning II | 12 | A | Good difficulty ramp |
| Reasoning III | 12 | A | Expert level, well-done |

---

## WHAT'S WORKING WELL

1. **Tier structure is excellent.** Gateway → Starter → Full is a smart progression that doesn't overwhelm users. The unlock mechanic keeps people engaged.

2. **Big Five is gold standard.** 50 items, proper reverse keying, IPIP-based. This is the backbone and it's solid.

3. **Reasoning I-II-III is a standout.** Great difficulty ramp, engaging, and directly serves calibration/track record building. One of the best parts of the app.

4. **Starter Pack is well-designed.** Behavioral, relatable, covers personality/motivation/thinking/connection/strategy. Good onramp before clinical-grade tests.

5. **Chronotype is clean.** Simple, fun, practical. People love knowing if they're a morning person or night owl.

---

## WHAT NEEDS FIXING (Priority Order)

### P0: CRITICAL

**1. Shadow Self tests (M, N, P) — all positive-keyed**
Every single item in all 3 shadow tests points in the same direction. This means someone who just agrees with everything will score as a manipulative narcissistic psychopath. That's a broken measurement. Each test needs 2-3 reverse-keyed items added.

**2. ADHD Screen — 6 items is dangerously short**
Standard ADHD screeners are 12-18 items. At 6 items, this will produce unreliable results — false positives from anxious people, false negatives from inattentive-type ADHD. Missing key constructs: time blindness, emotional dysregulation, hyperfocus. Expand to 12+ items with subscales (inattention, hyperactivity, executive function).

**3. Cognitive Style — covert autism screen without naming it**
Items like "I take things literally, missing the subtext" and "I don't naturally sense when someone wants to end a conversation" are measuring autistic traits. No reverse items, no framing. Users could feel pathologized without understanding why. Needs: reverse items (big-picture thinking, intuition), honest framing ("cognitive processing style, no style is better"), and possibly renaming to "Processing Style" or "Sensory & Social Processing."

### P1: IMPORTANT

**4. Risk Tolerance — 4 constructs mashed together**
Financial risk, physical risk, social risk, and ethical risk are different things. Items 12-14 (bend rules, keep extra change, white lies) measure honesty, not risk. Either split into subscales or remove the ethical items and move them to Integrity.

**5. Attachment — missing secure attachment**
Only measures anxious (6 items) and avoidant (6 items). Someone who scores low on both gets... nothing. No positive "secure" indicators. Add 4-6 items: "I generally feel safe in close relationships," "I can ask for what I need without worry."

**6. Integrity — split identity crisis**
Items 0-1 measure honesty. Items 2-5 measure status-seeking/humility. The test name says "Integrity" but it's really two different things. Either rename to "Honesty & Humility" (HEXACO framing) or split into two tests.

### P2: NICE TO HAVE

**7. Connection module** — reword phone-checking item (dated), partner-contact item (assumes romantic partner)

**8. Big Five N & O** — add brief framing ("these measure normal emotional variation, not clinical conditions")

---

## WHAT'S MISSING (Gap Analysis)

Cross-referencing Aura's 23 tests against the full landscape of validated personality assessments worldwide. Organized by how important each gap is for Aura's mission.

### TIER 1 GAPS — Should definitely add

| Assessment | What it measures | Why Aura needs it | Items | Public domain? |
|-----------|-----------------|-------------------|-------|---------------|
| **Values (Schwartz PVQ or Moral Foundations)** | What matters to you — care, fairness, loyalty, authority, purity, achievement, power, security | HUGE gap. Values drive decisions more than personality. Directly relevant to future opinion/review work. Users want to know what they stand for. | 20-30 | MFQ: yes. PVQ: research use |
| **Emotional Intelligence** | Perceiving, understanding, managing emotions in self and others | Popular demand. Complements Big Five (which measures traits, not abilities). Could be Aura's most shareable result. | 10-15 (custom) | Ability-based EI is proprietary but self-report versions are doable |
| **Grit / Perseverance** | Passion + persistence toward long-term goals | 8-item validated scale exists (Grit-S). Public domain. Quick win. Highly engaging — people want to know their grit score. | 8 | Yes (Duckworth) |
| **Life Satisfaction (SWLS)** | Global life satisfaction | 5 items, extensively validated, public domain. Gives users a wellbeing baseline. Fast to add, high signal. | 5 | Yes |
| **Locus of Control** | Do you believe you control your outcomes, or does the world control you? | Foundational personality construct missing entirely. 4-item validated version exists (IE-4). Directly relevant to predictions (internal LOC people are better calibrated). | 4 | Yes |
| **Resilience (CD-RISC)** | Ability to bounce back from adversity | 10-item version exists. Public domain. Everyone wants to know how resilient they are. Complements Big Five N. | 10 | Yes |

### TIER 2 GAPS — Strong candidates

| Assessment | What it measures | Why consider it | Items | Public domain? |
|-----------|-----------------|----------------|-------|---------------|
| **Growth Mindset** | Belief that abilities can be developed | 3-item validated scale. Public domain. Trendy, engaging, and correlates with learning behavior. | 3 | Yes |
| **Impostor Syndrome** | Feelings of fraudulence despite evidence of competence | Extremely relatable, especially to high-achievers (Aura's likely audience). 3-item short version exists (IPSS-3). | 3-12 | Yes |
| **Conflict Resolution Style** | Competing, collaborating, compromising, avoiding, accommodating | Relationship-focused users would love this. Complements attachment. TKI is proprietary but concept is public. | 10-15 (custom) | Concept: yes. TKI: proprietary |
| **Creativity** | Divergent thinking, originality, flexibility | Not well-served by current tests. Openness touches it but isn't the same. Could be engaging with creative prompts. | 8-12 (custom) | Torrance is proprietary but self-report creativity scales exist |
| **Depression/Anxiety screening (PHQ-9 + GAD-7)** | Depression and anxiety severity | Public domain, gold standard, 16 items total. BUT: clinical territory. Needs very careful framing and disclaimers. Consider making optional/hidden behind "Mental Health" category. | 16 | Yes |

### TIER 3 GAPS — Worth considering later

| Assessment | What it measures | Notes |
|-----------|-----------------|-------|
| **Love Languages** | How you give/receive love | Pop psychology, mixed validation. But VERY popular. Could be a "fun" assessment. |
| **Character Strengths (VIA)** | 24 strengths across 6 virtues | Proprietary but concept is public. Long (240 items full). Could do short custom version. |
| **Communication Style** | Analytical/Driver/Expressive/Amiable | Business-focused but broadly applicable. |
| **Decision-Making Style** | Maximizer vs. satisficer | Schwartz scale. Short. Interesting for prediction-makers. |
| **Need for Cognition** | How much you enjoy thinking | Directly relevant to who engages deeply with Aura. Meta-assessment. |
| **Autism Spectrum (AQ-10)** | Autistic traits | Currently measured covertly by Cognitive Style. If keeping that test, be transparent. If adding AQ-10, replace Cognitive Style. |

---

## RECOMMENDED NEW TIER STRUCTURE

Current tiers work well. Proposed additions fit naturally:

### Tier 0: Gateway (unchanged)
- Quick Profile (10 items)

### Tier 1: Starter Pack (add 1 module)
- Personality (9)
- Motivation (8)
- Thinking (8)
- Connection (8)
- Strategy (8)
- **NEW: Values (8-10)** — "What matters to you?" Quick values screen covering care, fairness, achievement, security.

### Tier 2: Full Assessments (add new category)
**Personality** (existing)
- Big Five E, A, C, N, O (50 items)

**Character** (existing + expanded)
- Integrity → rename to Honesty & Humility (expand to 10 items)
- **NEW: Grit** (8 items)
- **NEW: Growth Mindset** (3 items)

**Shadow Self** (existing, fixed)
- Strategic Mind, Self-Image, Detachment (18 items, add reverse keying)

**Mind** (existing + expanded)
- ADHD Screen (expand to 12 items)
- Cognitive Style (fix: add reverse items, rename)
- Chronotype (6 items)
- Reasoning I, II, III (36 items)
- **NEW: Locus of Control** (4 items)
- **NEW: Creativity** (8-10 items)

**Relationships** (existing + expanded)
- Attachment (12 items, add secure items → 16)
- **NEW: Conflict Style** (10-12 items)

**Behavior** (existing, fixed)
- Risk Tolerance (fix: split into subscales or clean up)

**NEW: Wellbeing** (new category)
- **Life Satisfaction** (5 items)
- **Resilience** (10 items)
- **Impostor Syndrome** (3-7 items)

**NEW: Values & Ethics** (new category)
- **Moral Foundations** (15-20 items — Care, Fairness, Loyalty, Authority, Purity)
- **Schwartz Values** (15-20 items — or combine with Moral Foundations into one "Values" test)

**NEW: Emotional Intelligence** (new category)
- **EI Self-Report** (10-15 items — perceiving, understanding, managing emotions)

### Tier 3: Advanced / Opt-in (NEW TIER — sensitive/clinical content)
- Depression Screen (PHQ-9, 9 items)
- Anxiety Screen (GAD-7, 7 items)
- Autism Spectrum (AQ-10, 10 items)

This tier would be clearly labeled: "These are clinical screening tools. They are not diagnoses. They help you understand patterns that a professional can evaluate."

---

## THE MATH

**Current:** 23 tests, 210 items
**After fixes:** Same tests, ~240 items (expanding short tests)
**After additions:** ~35 tests, ~360 items
**After Tier 3 (optional):** ~38 tests, ~386 items

That's roughly 2x the current size. But with tiered unlocking, users never see it all at once. Gateway is still 2 minutes. Starter Pack is still 5 sessions. Full assessments unlock gradually over weeks/months.

---

## COMPETITIVE POSITIONING

With these additions, Aura would cover:

| Construct | Covered? | Competitor comparison |
|-----------|----------|----------------------|
| Big Five | ✅ Already | Same as 16Personalities, better than most |
| Dark Triad | ✅ Already (needs fixing) | Unique — most apps avoid this |
| Attachment | ✅ Already (needs expanding) | Same as most relationship apps |
| ADHD | ✅ Already (needs expanding) | Basic — clinical apps do better |
| Reasoning/IQ | ✅ Already | Unique differentiator |
| Chronotype | ✅ Already | Fun feature most don't have |
| Values/Morals | ❌ → ✅ | Would be unique in consumer space |
| Emotional Intelligence | ❌ → ✅ | High demand, few do it well |
| Grit/Resilience | ❌ → ✅ | Trendy, high engagement |
| Life Satisfaction | ❌ → ✅ | Wellbeing baseline — unique |
| Locus of Control | ❌ → ✅ | Classic construct, rarely in consumer apps |
| Conflict Style | ❌ → ✅ | Complements attachment nicely |
| Impostor Syndrome | ❌ → ✅ | Extremely relatable to target audience |
| Growth Mindset | ❌ → ✅ | Quick win, 3 items |
| Depression/Anxiety | ❌ → ✅ (Tier 3) | Clinical grade, opt-in only |

**No consumer app currently combines all of these.** That's the moat.

---

## ACTION PLAN

### Phase 1: Fix what's broken (1-2 sessions)
1. Add reverse items to Shadow M, N, P
2. Expand ADHD to 12+ items
3. Fix Cognitive Style (reverse items, framing, rename)
4. Add secure attachment items

### Phase 2: Quick wins (2-3 sessions)
5. Add Life Satisfaction (5 items, public domain, drop-in)
6. Add Grit (8 items, public domain, drop-in)
7. Add Growth Mindset (3 items, public domain, drop-in)
8. Add Locus of Control (4 items, public domain, drop-in)
9. Add Impostor Syndrome (3-7 items, public domain)

### Phase 3: New constructs (3-5 sessions)
10. Design Values/Moral Foundations test
11. Design Emotional Intelligence self-report
12. Design Conflict Resolution Style test
13. Design Resilience test
14. Design Creativity test

### Phase 4: Clinical tier (future)
15. Add PHQ-9, GAD-7, AQ-10 as opt-in Tier 3
16. Add clinical disclaimers and framing
17. Consider professional review of clinical content

---

## SUMMARY

**What we're doing well:** Tier structure, Big Five, Reasoning, Starter Pack, Chronotype.

**What we're not doing well:** Shadow Self bias, ADHD too short, Cognitive Style covert screening, Risk mixing constructs.

**What we should add (highest impact):** Values, Emotional Intelligence, Grit, Life Satisfaction, Locus of Control, Resilience.

**The vision:** No consumer app combines validated personality + values + wellbeing + reasoning + dark traits + clinical screens in a tiered progressive system. That's what Aura can be.
