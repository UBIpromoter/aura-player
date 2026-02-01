# Aura Reveal Assessments Spec

## Overview

Reveal mode assessments use validated, open-source instruments to build user profiles. Each assessment can be delivered as explicit (dedicated test) or embedded (items sprinkled in feed).

**Disclaimer (shown once):** "For fun and self-discovery, not medical advice."

---

## 1. Big Five Personality (IPIP-50)

**Source:** [International Personality Item Pool](https://ipip.ori.org/) - Public Domain

**What it measures:** Core personality traits
- **Extraversion (E):** Sociability, energy, assertiveness
- **Agreeableness (A):** Cooperation, trust, empathy
- **Conscientiousness (C):** Organization, dependability, discipline
- **Neuroticism (N):** Emotional instability, anxiety, moodiness
- **Openness (O):** Curiosity, creativity, openness to experience

**Structure:** 50 items (10 per trait), mix of + and - keyed

**Response Scale:** 5-point (Very Inaccurate → Very Accurate)

### Sample Items

| Trait | + Keyed | - Keyed |
|-------|---------|---------|
| **E** | "I am the life of the party" | "I don't talk a lot" |
| **A** | "I sympathize with others' feelings" | "I am not interested in other people's problems" |
| **C** | "I am always prepared" | "I leave my belongings around" |
| **N** | "I get stressed out easily" | "I am relaxed most of the time" |
| **O** | "I have a vivid imagination" | "I am not interested in abstract ideas" |

### Scoring
- Reverse score negative items
- Sum items per trait (10-50 range)
- Convert to percentile vs. population

### Aura Output
- Spider chart of 5 traits
- Percentile rankings
- Natural language summary: "You're highly open and agreeable, but lower on conscientiousness. You embrace new ideas and connect easily with others, though you may struggle with routine tasks."

### Delivery Options
- **Explicit:** Full 50-item assessment (~8 min)
- **Embedded:** 1-2 items per session, profile builds over time

---

## 2. ADHD Screener (ASRS-6)

**Source:** [WHO Adult ADHD Self-Report Scale](https://www.hcp.med.harvard.edu/ncs/asrs.php) - Free to use with citation

**What it measures:** ADHD symptom indicators in adults

**Structure:** 6 items (Part A screener)

**Response Scale:** 5-point frequency (Never → Very Often)

### The 6 Questions

1. How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?
2. How often do you have difficulty getting things in order when you have to do a task that requires organization?
3. How often do you have problems remembering appointments or obligations?
4. When you have a task that requires a lot of thought, how often do you avoid or delay getting started?
5. How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?
6. How often do you feel overly active and compelled to do things, like you were driven by a motor?

### Scoring
- Each item scored 0-4
- Shaded boxes indicate clinical significance (varies by item)
- 4+ shaded responses = "highly consistent with ADHD"

### Aura Output
- Score indicator (not diagnosis)
- Pattern description: "You show patterns common in people with attention differences, particularly around task completion and organization."
- Optional: Link to full 18-item version

### Delivery
- **Explicit:** Quick 6-item screen (~2 min)
- **Embedded:** Spread across sessions

---

## 3. Autism Traits (AQ-10)

**Source:** [Autism Research Centre, Cambridge](https://www.autismresearchcentre.com/tests/autism-spectrum-quotient-10-items-aq-10-adult/) - Baron-Cohen et al.

**What it measures:** Autism spectrum traits in adults

**Structure:** 10 items

**Response Scale:** 4-point (Definitely Agree → Definitely Disagree)

### The 10 Questions

1. I often notice small sounds when others do not
2. I usually concentrate more on the whole picture, rather than the small details
3. I find it easy to do more than one thing at once
4. If there is an interruption, I can switch back to what I was doing very quickly
5. I find it easy to 'read between the lines' when someone is talking to me
6. I know how to tell if someone listening to me is getting bored
7. When I'm reading a story I find it difficult to work out the characters' intentions
8. I like to collect information about categories of things
9. I find it easy to work out what someone is thinking or feeling just by looking at their face
10. I find it difficult to work out people's intentions

### Scoring
- Items 1, 7, 8, 10: Score 1 for Agree/Slightly Agree
- Items 2, 3, 4, 5, 6, 9: Score 1 for Disagree/Slightly Disagree
- Total: 0-10
- Score 6+ suggests further evaluation may be useful

### Aura Output
- Trait indicator (not diagnosis)
- Pattern description: "You show some traits common in neurodivergent thinkers, particularly around detail focus and social processing."
- Strength framing: "These patterns often correlate with deep focus ability and systematic thinking."

### Delivery
- **Explicit:** Quick 10-item screen (~3 min)
- **Embedded:** Spread across sessions

---

## 4. Attachment Style (ECR-R Based)

**Source:** Experiences in Close Relationships-Revised (Fraley et al.) - Academic use

**What it measures:** Relationship attachment patterns

**Dimensions:**
- **Anxiety:** Fear of abandonment, need for reassurance
- **Avoidance:** Discomfort with closeness, self-reliance

**Structure:** 12 items (shortened from 36)

**Response Scale:** 7-point (Strongly Disagree → Strongly Agree)

### Sample Items

**Anxiety dimension:**
- "I worry about being abandoned"
- "I need a lot of reassurance that I am loved"
- "I worry that romantic partners won't care about me as much as I care about them"

**Avoidance dimension:**
- "I prefer not to show a partner how I feel deep down"
- "I get uncomfortable when a romantic partner wants to be very close"
- "I find it difficult to allow myself to depend on romantic partners"

### Scoring
- Average anxiety items → Anxiety score
- Average avoidance items → Avoidance score
- Map to 4 styles:

| Style | Anxiety | Avoidance |
|-------|---------|-----------|
| **Secure** | Low | Low |
| **Anxious** | High | Low |
| **Avoidant** | Low | High |
| **Fearful** | High | High |

### Aura Output
- Attachment style label
- 2D plot (anxiety vs avoidance)
- Natural language: "You have an anxious attachment style. You deeply value connection but may worry about whether partners will stay. Understanding this can help you communicate needs more clearly."

### Delivery
- **Explicit:** 12-item assessment (~4 min)
- **Embedded:** Relationship questions over time

---

## 5. Risk Tolerance (Custom)

**Source:** Synthesized from financial/psychological risk measures

**What it measures:** Risk appetite across domains

**Domains:**
- Financial risk
- Social risk (reputation, relationships)
- Physical risk
- Career risk
- Ethical risk

**Structure:** 15 items (3 per domain)

**Response Scale:** 5-point likelihood (Very Unlikely → Very Likely)

### Sample Items

**Financial:**
- "Invest 20% of savings in a high-risk/high-reward opportunity"
- "Quit a stable job to start a business"

**Social:**
- "Share an unpopular opinion publicly"
- "Confront a friend about something bothering you"

**Physical:**
- "Try an extreme sport like skydiving"
- "Travel solo to an unfamiliar country"

### Scoring
- Score per domain (3-15)
- Overall risk tolerance (15-75)
- Domain comparison (risk profile)

### Aura Output
- Risk profile chart (by domain)
- Pattern insight: "You're a financial conservative but social risk-taker. You protect your money but readily speak your mind."

### Delivery
- **Explicit:** 15-item assessment (~5 min)
- **Embedded:** Mix into Predict questions

---

## AI Enhancement Layer

Beyond raw scores, AI analyzes patterns across assessments:

### Cross-Assessment Insights
- "Your high openness + low conscientiousness suggests creative potential with execution challenges"
- "Your anxious attachment + high social risk tolerance creates an interesting tension"

### Longitudinal Tracking
- "Your extraversion score has increased 12% over 6 months"
- "Your risk tolerance spiked after your job change"

### Comparative Analysis
- "You're more conscientious than 73% of users in your age group"
- "Your attachment style is common among people who also score high on neuroticism"

### Compatibility Modeling (Relationships)
- Combine attachment styles + personality + values
- Predict friction points: "You both avoid conflict but process emotions differently"

---

## Implementation Priority

| Assessment | Items | Time | Priority | Value |
|------------|-------|------|----------|-------|
| Big Five (IPIP-50) | 50 | 8 min | 1 | Foundation for everything |
| ADHD Screener (ASRS-6) | 6 | 2 min | 2 | High user interest |
| Autism Traits (AQ-10) | 10 | 3 min | 3 | Growing interest, destigmatized |
| Attachment Style | 12 | 4 min | 4 | Relationship insights |
| Risk Tolerance | 15 | 5 min | 5 | Cross-domain applicability |

---

## Future Assessments

- **Moral Foundations** (Haidt) - Political/ethical values
- **Love Languages** - Relationship preferences
- **Learning Style** - How you absorb information
- **Emotional Intelligence** - EQ dimensions
- **Grit Scale** - Perseverance/passion
- **Maximizer vs Satisficer** - Decision-making style
- **Chronotype** - Sleep/energy patterns

---

## Sources

- [IPIP - International Personality Item Pool](https://ipip.ori.org/)
- [WHO ASRS - Harvard](https://www.hcp.med.harvard.edu/ncs/asrs.php)
- [AQ-10 - Autism Research Centre](https://www.autismresearchcentre.com/tests/autism-spectrum-quotient-10-items-aq-10-adult/)
- [Embrace Autism - AQ Resources](https://embrace-autism.com/autism-spectrum-quotient/)
