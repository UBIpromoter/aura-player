# V2 Pass 1: Item Rewrites (Language & Construct Fixes)

**File:** `aura-assessments.js` only
**Scope:** Rewrite existing items for better language, engagement, and construct validity
**After this pass:** All item TEXT is final. Pass 2 adds new items. Pass 3 fixes scoring/UI.

## V1 → V2 Context

This is a clean V2 cut. V1 is archived at `aura-assessments-v1.js`. You have full freedom: rewrite, delete, reorder items. No index-preservation constraint. Once V2 is locked after all 3 passes, the no-delete/no-reorder rule comes back.

---

## Part A: Starter Pack (the funnel — most important)

The Quick Profile is fun. The Starter Pack is the conversion bridge, and right now it reads like a survey. A language review (Gemini) flagged ~12 items as boring or clinical.

**Principles:**
- Every item should make someone go "huh, do I?" — not "ugh, another checkbox"
- More trade-off items (bump from 1 to 2-3 per module)
- Consider 1-2 scenario items per module
- Wellbeing module is the benchmark — no flags there. Match that energy.

### Starter-Personality

| Current | Problem | Rewrite |
|---------|---------|---------|
| "I finish tasks even when they become repetitive or boring" | Textbook (2/5) | "I'll grind through a boring task just to get it done" |
| "I prioritize my own needs over the feelings of people around me" | Clinical (1/5) | "When a decision comes down to it, my own needs have to come first" |
| "I stay quiet when I am in a room full of strangers" | Flat (3/5) | "In a room full of strangers, I'm more of a listener than a talker" |

### Starter-Motivation

| Current | Problem | Rewrite |
|---------|---------|---------|
| "I set daily targets to track my progress toward a goal" | Corporate (2/5) | "I break my goals down into small, daily checkboxes" |
| "I prioritize completing a task over taking a break" | Robotic (2/5) | "I'd rather power through and finish something than stop for a break" |
| "I avoid investments where there is a chance of losing money" | Financial planner (2/5) | "When it comes to money, I hate the idea of losing even a little" |
| "I work on projects where I make all the decisions" | Dry (3/5) | "I do my best work when I'm the one calling the shots" |
| "I let other people lead the way in group settings" | Passive (3/5) | "In a group, I'm more comfortable letting someone else take charge" |

### Starter-Thinking

| Current | Problem | Rewrite |
|---------|---------|---------|
| "I search for more data after I have found an answer" | Robot (2/5) | "Even after I find an answer, I keep digging for more information" |
| "I lose track of my original goal while working" | Dry (2/5) | "I start one thing and end up down a completely different rabbit hole" |
| "I work in a noisy room without losing focus" | Clunky | "Noise doesn't break my concentration" |
| "I finish a task faster than others expect me to" | Awkward | "I tend to get things done ahead of schedule" |

### Starter-Connection

| Current | Problem | Rewrite |
|---------|---------|---------|
| "I let others hold my phone or laptop without watching them" | Stilted | "I don't mind when friends borrow my phone" |
| "I stay calm when I do not see my partner for days" | Stiff | "I'm comfortable going a few days without seeing my partner" |

### Starter-Strategy

| Current | Problem | Rewrite |
|---------|---------|---------|
| "I visualize the next three steps before taking the first" | Self-help jargon | "I like to think a few steps ahead before I act" |
| "I prioritize winning over playing the game fairly" | Formal | "For me, winning is more important than playing fair" |

### Starter-Wellbeing

No changes needed. This is the benchmark.

---

## Part B: Deeper Assessment Rewrites

### Big Five — Openness (bigfive-O)

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I have excellent ideas" | Replace | "I enjoy exploring unusual ideas" | Loads on self-esteem, not Openness |
| "I am quick to understand things" | Replace | "I enjoy thinking about abstract ideas" | Loads on intelligence |
| "I use difficult words" | **Delete** | — | SES/class bias, unfixable |

That leaves O at 9 items. Add one:
```js
{ q: "I'm often curious about the deeper meaning of things", t: 'O', k: '+' },
```

### Big Five — Agreeableness (bigfive-A)

| Current | New | Why |
|---------|-----|-----|
| "I insult people" | "I can be critical or sarcastic with others" | Social desirability ceiling |

### Big Five — Conscientiousness (bigfive-C)

| Current | New | Why |
|---------|-----|-----|
| "I am always prepared" | "I like to be prepared" | "Always" = absolute |

### Chronotype

| Current | New | Why |
|---------|-----|-----|
| "I'm usually the first one ready to leave social events" | "I feel alert and productive before noon" | Measures introversion, not chronotype |

### Shadow-M (Strategic Mind)

| Current | New | Why |
|---------|-----|-----|
| "Long-term planning beats short-term honesty" | "Sometimes it's better to be careful with your words than to be completely open" | Double-barreled. Gemini caught panel's version as HR-speak. |

### Shadow-N (Self-Image)

| Current | New | Why |
|---------|-----|-----|
| "I genuinely celebrate other people's achievements without comparing" | "I can celebrate others' achievements without comparing them to my own" | "Genuinely" unverifiable |

### Shadow-P (Cold Focus)

| Current | New | Why |
|---------|-----|-----|
| "I make decisions based on logic, not feelings" | "When making difficult decisions, I prioritize logic over emotional considerations" | False dichotomy |

### Processing Style (cognitive)

| Current | New | Why |
|---------|-----|-----|
| "Movie characters' decisions often puzzle me" | "I often struggle to understand why people behave the way they do in social situations" | Cultural bias |

### Attachment

| Current | New | Why |
|---------|-----|-----|
| "I push for closeness in ways that feel desperate after" | "I sometimes push for closeness and later worry I came across as too needy" | Awkward phrasing |

### Impostor Syndrome

| Current | New | Why |
|---------|-----|-----|
| "I downplay my achievements because I don't think they're that impressive" | "I downplay my achievements when talking to others" | Double-barreled |

### Conflict Style

| Current | New | Why |
|---------|-----|-----|
| "I rarely avoid a confrontation when something matters to me" | "Even when an issue matters to me, I sometimes avoid bringing it up" | Measures assertiveness, not avoidance |

### Honesty & Humility

| Current | New | Why |
|---------|-----|-----|
| "Having a lot of money is not especially important to me" | "Making a lot of money is not a top priority for me" | SES-confounded. Gemini: "Accumulating wealth" was stilted. |

### Creativity

| Current | New | Why |
|---------|-----|-----|
| "I regularly make or build things outside of work" | "I regularly do creative things" | Biased against parents. Gemini: "engage in creative activities" was academic. |

---

## Part C: Values & Morals (cultural bias)

| Sub | Current | New | Why |
|-----|---------|-----|-----|
| loyal | "I am proud of my country's history" | "I feel strong loyalty toward the groups I belong to" | Nationalistic |
| loyal | "People should be loyal to their family members, even when they have done something wrong" | "Family loyalty is very important to me, even in difficult situations" | Promotes unethical loyalty |
| pure | "People should not do things that are disgusting, even if no one is harmed" | "Some actions feel wrong to me even if no one appears to be directly harmed" | "Disgusting" culturally variable |
| pure | "I would call some acts wrong on the grounds that they are unnatural" | "I believe some behaviors are morally wrong even if they are widely accepted" | Loaded, anti-LGBTQ+ reading |

**Optional:** Values at 20 items is long. Consider culling to 3 per foundation (15 total). Your call.

---

## What NOT to do in this pass

- Don't add new items (that's Pass 2)
- Don't touch scoring logic (that's Pass 3)
- Don't touch AI-native assessments, archetypes, or Quick Profile
- Don't change scoring scales (agreement/frequency/etc.)

## What you CAN do

- Delete weak items, reorder for flow, interleave +/- keying
- V2 freedom — make each test the best possible version

## Verification

After this pass: every existing item should read well, measure what it claims, and feel human. Read through the full Starter Pack out loud — if any item sounds like a survey, rewrite it.
