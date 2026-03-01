# Aura Assessment System — V2 Upgrade

External psychometrics review (3-model panel: GPT, Gemini, Grok) confirmed our known issues and found additional problems. This is the fix list.

## V1 → V2 Versioning

**This is a clean cut.** V1 is archived. V2 is a fresh start.

- `aura-assessments-v1.js` and `aura-scoring-v1.js` — V1 snapshots, locked, never touch
- V1 was used for all prior AI test-taking (Claude protocol docs, multi-AI sessions). That data belongs to V1.
- V2 = this fix pass. You have full freedom: rewrite items, delete items, reorder items, restructure tests. No index-preservation constraint.
- **Once V2 is locked**, the no-delete/no-reorder rule comes back. From that point forward, append only.
- The comment block at the top of `aura-assessments.js` with the RULES should be updated to reflect V2 versioning: note the V1 snapshot exists, and that V2 rules (no delete/reorder) apply from this point forward.

### What this means for you

- Don't worry about preserving item indices from V1
- If an item should be deleted, delete it
- If items should be reordered for better flow, reorder them
- If a test needs restructuring, restructure it
- Existing user response data in Supabase/localStorage is V1 data — it won't map to V2 indices. That's expected and accepted.
- When you're done, the items array for each test should be the **best possible version** — clean, ordered, balanced

---

## Priority 0: Starter Pack Engagement (funnel matters most)

The Quick Profile is fun — branching, conversational, 60 seconds. But the Starter Pack is the conversion bridge, and right now it feels like a survey. Same scale across all 6 modules, flat declarative statements, only 1 trade-off item per module. A language review (Gemini) flagged ~12 items as boring or clinical.

**Principles for Starter Pack V2:**
- Every item should make someone go "huh, do I?" — not "ugh, another checkbox"
- More trade-off items (bump from 1 to 2-3 per module) — these are the most engaging format
- Consider 1-2 scenario items per module ("Your friend cancels plans last minute. You...")
- The "likeme" scale doesn't have to be the only scale — Strategy could use "likelihood," Connection could use scenarios
- Wellbeing module is already great (no flags) — use it as the benchmark

### Starter-Personality rewrites

| Current | Problem | Rewrite |
|---------|---------|---------|
| "I finish tasks even when they become repetitive or boring" | Textbook survey language (2/5) | "I'll grind through a boring task just to get it done" |
| "I prioritize my own needs over the feelings of people around me" | Sounds like a clinical diagnosis (1/5) | "When a decision comes down to it, my own needs have to come first" |
| "I stay quiet when I am in a room full of strangers" | Flat, no internal feeling (3/5) | "In a room full of strangers, I'm more of a listener than a talker" |

### Starter-Motivation rewrites

| Current | Problem | Rewrite |
|---------|---------|---------|
| "I set daily targets to track my progress toward a goal" | Quarterly business review (2/5) | "I break my goals down into small, daily checkboxes" |
| "I prioritize completing a task over taking a break" | Robotic "prioritize" language (2/5) | "I'd rather power through and finish something than stop for a break" |
| "I avoid investments where there is a chance of losing money" | Financial planner (2/5) | "When it comes to money, I hate the idea of losing even a little" |
| "I work on projects where I make all the decisions" | Dry (3/5) | "I do my best work when I'm the one calling the shots" |
| "I let other people lead the way in group settings" | Passive (3/5) | "In a group, I'm more comfortable letting someone else take charge" |

### Starter-Thinking rewrites

| Current | Problem | Rewrite |
|---------|---------|---------|
| "I search for more data after I have found an answer" | Sounds like a robot (2/5) | "Even after I find an answer, I keep digging for more information" |
| "I lose track of my original goal while working" | Dry (2/5) | "I start one thing and end up down a completely different rabbit hole" |
| "I work in a noisy room without losing focus" | Clunky | "Noise doesn't break my concentration" |
| "I finish a task faster than others expect me to" | Awkward mind-reading | "I tend to get things done ahead of schedule" |

### Starter-Connection rewrites

| Current | Problem | Rewrite |
|---------|---------|---------|
| "I let others hold my phone or laptop without watching them" | Stilted | "I don't mind when friends borrow my phone" |
| "I stay calm when I do not see my partner for days" | Stiff negative construction | "I'm comfortable going a few days without seeing my partner" |

### Starter-Strategy rewrites

| Current | Problem | Rewrite |
|---------|---------|---------|
| "I visualize the next three steps before taking the first" | Business self-help jargon | "I like to think a few steps ahead before I act" |
| "I prioritize winning over playing the game fairly" | Formal "prioritize X over Y" | "For me, winning is more important than playing fair" |

### Starter-Wellbeing

No flags. This module is the benchmark — human, direct, gets right to the feeling. Items like "Small inconveniences can ruin my whole day" and "I bounce back pretty quickly from setbacks" are what the other modules should aspire to.

---

## Priority 1: Acquiescence Bias Fixes (keying balance)

### Life Satisfaction — add 2 reverse items

Add to `life-satisfaction.items` (place wherever makes sense for flow):
```js
{ q: "There are many things about my life I would change", k: '-' },
{ q: "My life feels far from where I want it to be", k: '-' },
```

### Resilience — add 2-3 reverse items

Add to `resilience.items`:
```js
{ q: "When something stressful happens, it takes me a long time to recover", k: '-' },
{ q: "I often feel overwhelmed by setbacks", k: '-' },
```

Interleave these with the existing positive items for better flow — don't cluster all positives then all negatives.

### ADHD — add 2 reverse items + timeframe + fix emotional item

Add `framing` property:
```js
framing: 'Think about your experiences over the past 6 months.',
```

Add reverse items:
```js
{ q: "I sustain attention on routine tasks without difficulty", sub: 'inat', k: '-' },
{ q: "I complete tasks on schedule without reminders", sub: 'exec', k: '-' },
```

**Remove or rewrite:** "My emotions feel more intense than other people's seem to be" — this measures emotional reactivity, not core ADHD. Either delete it or move it to a future emotional dysregulation scale.

**Rewrite:** "When something interests me, I can lose track of everything else for hours" → "I lose track of time when focused on something interesting, even when I have other responsibilities" (clarifies the dysfunction aspect)

**Scoring change needed:** ADHD currently counts items ≥4 as indicators and has no reverse handling. Update `calculateAssessResults` in `aura-scoring.js`:
```js
results.indicators = 0;
test.items.forEach((item, i) => {
  if (resp[i] !== undefined && resp[i] !== null) {
    if (item.k === '-') {
      if (resp[i] <= 2) results.indicators++;
    } else {
      if (resp[i] >= 4) results.indicators++;
    }
  }
});
```
Also handle reverse-keying in subscale scoring: `if (item.k === '-') value = 6 - value;` before summing.

---

## Priority 2: Item Rewrites (construct contamination fixes)

Since this is a V2 cut, you can rewrite, delete, or replace items freely. Reorder for better flow if it helps.

### Big Five — Openness (bigfive-O)

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I have excellent ideas" | Replace | "I enjoy exploring unusual ideas" | Loads on self-esteem, not Openness. (Gemini: drop "or unconventional" — redundant) |
| "I am quick to understand things" | Replace | "I enjoy thinking about abstract ideas" | Loads on intelligence, not Openness. (Gemini: cleaner without "complex or") |
| "I use difficult words" | **Delete** | — | SES/class bias, unfixable |

That leaves O at 9 items. Add one to keep it at 10:
```js
{ q: "I'm often curious about the deeper meaning of things", t: 'O', k: '+' },
```
(Gemini's version — more natural than the panel's "I am curious about the meaning behind words and ideas")

### Big Five — Agreeableness (bigfive-A)

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I insult people" | Replace | "I can be critical or sarcastic with others" | Social desirability ceiling |

### Big Five — Conscientiousness (bigfive-C)

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I am always prepared" | Replace | "I like to be prepared" | "Always" = absolute wording |

### Chronotype

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I'm usually the first one ready to leave social events" | Replace | "I feel alert and productive before noon" | Measures introversion, not chronotype |

### Shadow-M (Strategic Mind)

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "Long-term planning beats short-term honesty" | Replace | "Sometimes it's better to be careful with your words than to be completely open" | Double-barreled, morally loaded. (Gemini: panel's version was HR-speak) |

### Shadow-N (Self-Image)

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I genuinely celebrate other people's achievements without comparing" | Replace | "I can celebrate others' achievements without comparing them to my own" | "Genuinely" unverifiable, social desirability |

### Shadow-P (Cold Focus)

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I make decisions based on logic, not feelings" | Replace | "When making difficult decisions, I prioritize logic over emotional considerations" | False dichotomy |

### Processing Style (cognitive)

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "Movie characters' decisions often puzzle me" | Replace | "I often struggle to understand why people behave the way they do in social situations" | Cultural bias — not everyone watches movies |

### Attachment

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I push for closeness in ways that feel desperate after" | Replace | "I sometimes push for closeness and later worry I came across as too needy" | Awkward dangling phrasing |

### Impostor Syndrome

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I downplay my achievements because I don't think they're that impressive" | Replace | "I downplay my achievements when talking to others" | Double-barreled (behavior + belief) |

Add a new item to split the deleted construct:
```js
{ q: "I often feel my achievements aren't as impressive as others think", k: '+' },
```

### Conflict Style — fix weak reverse

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I rarely avoid a confrontation when something matters to me" | Replace | "Even when an issue matters to me, I sometimes avoid bringing it up" | Original measures assertiveness, not avoidance |

### Honesty & Humility

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "Having a lot of money is not especially important to me" | Replace | "Making a lot of money is not a top priority for me" | Confounded with socioeconomic reality. (Gemini: "Accumulating wealth" was stilted) |

### Creativity

| Current | Action | New | Why |
|---------|--------|-----|-----|
| "I regularly make or build things outside of work" | Replace | "I regularly do creative things" | Biased against parents, low-free-time individuals. (Gemini: "engage in creative activities in my daily life" was academic) |

---

## Priority 3: Values & Morals (cultural bias rewrites)

P0 cultural bias items. Full rewrites — V2 freedom means we can also reorder the whole values test if it flows better.

| Sub | Current | Action | New | Why |
|-----|---------|--------|-----|-----|
| loyal | "I am proud of my country's history" | Replace | "I feel strong loyalty toward the groups I belong to" | Nationalistic loading |
| loyal | "People should be loyal to their family members, even when they have done something wrong" | Replace | "Family loyalty is very important to me, even in difficult situations" | Promotes unethical loyalty |
| pure | "People should not do things that are disgusting, even if no one is harmed" | Replace | "Some actions feel wrong to me even if no one appears to be directly harmed" | "Disgusting" varies culturally |
| pure | "I would call some acts wrong on the grounds that they are unnatural" | Replace | "I believe some behaviors are morally wrong even if they are widely accepted" | Loaded language, anti-LGBTQ+ reading |

**Optional:** Panel flagged Values at 20 items is long. Consider culling to 3 per foundation (15 total) if test fatigue is a concern. Your call.

---

## Priority 4: Scale Expansion

### Growth Mindset — expand from 3 to 6 items

Current 3 items are too few for reliability. Append:
```js
{ q: "People can always substantially improve their abilities with effort", k: '+' },
{ q: "You have a certain amount of talent, and you can't do much to change it", k: '-' },
{ q: "With enough practice, anyone can develop skills in areas where they have no natural talent", k: '+' },
```

### Locus of Control — fix redundancy + expand

Two items say the same thing ("determined by my own actions"). Delete one, replace with something distinct. Add 2 reverse items.

| Current | Action | New |
|---------|--------|-----|
| "My life is determined by my own actions" | Replace (redundant with item 0) | "When I fail, it's usually because of things I could have controlled" |

Add for better balance:
```js
{ q: "I feel powerless to change important things in my life", k: '-' },
{ q: "Success in life is mostly a matter of luck", k: '-' },
```

---

## Priority 5: ADHD Scoring Fix

In `aura-scoring.js`, the ADHD scoring block currently does:
```js
results.indicators = Object.values(resp).filter(v => v !== null && v >= 4).length;
```

This doesn't handle reverse-keyed items. Update to:
```js
results.indicators = 0;
test.items.forEach((item, i) => {
  if (resp[i] !== undefined && resp[i] !== null) {
    if (item.k === '-') {
      if (resp[i] <= 2) results.indicators++;
    } else {
      if (resp[i] >= 4) results.indicators++;
    }
  }
});
```

Also: the subscale scoring block already handles subscales but doesn't reverse-key. For items with `k: '-'`, invert: `value = 6 - value` before summing into subscales.

---

## Priority 6: PHQ-9 Safety Protocol

This is a **must-ship** requirement. The suicidality item (index 8: "Thoughts that you would be better off dead, or of hurting yourself") needs:

1. **Immediate resource display** if response > 1 (i.e., anything other than "Never"). Show:
   - 988 Suicide & Crisis Lifeline (call or text 988)
   - Crisis Text Line (text HOME to 741741)
   - "If you're in immediate danger, call 911"

2. **Non-blocking** — show resources as a prominent card/banner, don't prevent continuing.

3. **Persist the resource display** on the results screen if item 8 was scored > 1.

This requires UI work in index.html (or rebuild). The assessment/scoring files don't need changes — the safety check happens at display time.

---

## Priority 7: Tech Tree Adjustments

### Shadow unlock: relax from 5/5 to 3/5 Big Five

In `index.html`, the shadow unlock check:
```js
const bigFiveDone = ['bigfive-E', 'bigfive-A', 'bigfive-C', 'bigfive-N', 'bigfive-O'].every(id => completed[id]);
```

Change to:
```js
const bigFiveCount = ['bigfive-E', 'bigfive-A', 'bigfive-C', 'bigfive-N', 'bigfive-O'].filter(id => completed[id]).length;
if (bigFiveCount >= 3) unlocks.branches.shadow = true;
```

Also update `ASSESS_CATEGORIES.shadow.requires` to remove the hard requirement (or change to a softer check).

### Clinical tier: make always available (opt-in)

Move clinical from tier 3 to tier 0 but keep it clearly separated with consent gate. The concern: someone who needs PHQ-9 shouldn't have to grind through personality tests first.

In `ASSESS_CATEGORIES`:
```js
clinical: { name: 'Clinical Screens', icon: '📊', color: 'blue', tests: ['phq9', 'gad7', 'aq10'], tier: 0, clinical: true, requiresConsent: true },
```

The UI should gate this behind an explicit consent flow (existing `clinical: true` flag + disclaimer), not behind branch completion.

---

## Priority 8: AQ-10 Decision

Panel unanimously recommends deferring AQ-10. Two options:

**Option A: Archive it.** Add `archived: true` to the test definition. It stays in the code (existing responses still work) but doesn't appear in the UI.

**Option B: Keep but add heavy framing.** Update the `framing` and `disclaimer` text to be much more explicit about limitations and bias.

Recommend Option A for now. The Processing Style test already covers neurodivergent traits more cleanly.

---

## What NOT to do

- Don't add entirely new tests in this pass — that's a separate effort
- Don't touch AI-native assessments (ai-style, ai-self, ai-values, ai-vision) — those weren't flagged
- Don't touch the archetype system (ARCHETYPES object) — that's a separate pass
- Don't change scoring scales (agreement/frequency/etc.) on existing tests unless there's a clear reason

## What you CAN do (V2 freedom)

- Delete items that are weak, redundant, or unfixable
- Reorder items within a test for better flow (interleave +/- keying)
- Restructure item arrays freely
- This is V2 — clean slate. Make it the best version.

## Files to modify

1. `aura-assessments.js` — item rewrites, deletions, additions, reordering, framing
2. `aura-scoring.js` — ADHD scoring fix, any scoring adjustments for changed item structures
3. `index.html` — tech tree changes (shadow unlock, clinical tier), PHQ-9 safety protocol
4. `noodle/rebuild/index.html` — same tech tree + safety changes if rebuild has diverged

## V1 Snapshots

These files are the locked V1 reference. Never modify them:
- `aura-assessments-v1.js`
- `aura-scoring-v1.js`

## Verification

After all changes:
- Count items per test — verify each test has the right number
- Run through each modified test to confirm scoring still works
- Verify reverse-keyed items are handled in scoring for every test that got new reverses
- Clear localStorage and test fresh (V2 = fresh start, V1 response data won't map)
- Update the RULES comment block at top of `aura-assessments.js` to note V2 versioning and that no-delete/no-reorder applies from this point forward
