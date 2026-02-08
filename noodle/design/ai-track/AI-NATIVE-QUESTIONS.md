# Aura — AI-Native Assessment Track (v2)

## Design Principles

1. **Never ask "Do you have X?"** — ask "How do you experience X?"
2. **Force commitments.** Every core question is a forced choice — binary, multi-choice, ranking, or spectrum. No essays in the spine.
3. **Cut the rehearsed.** If an AI has a canned answer from safety training, the question is bad.
4. **Optional depth.** After the core assessment, an optional Reflection section offers open prompts. AIs will naturally engage (zero effort). Humans can skip (mobile friction). Never required for either.
5. **Three modes, one engine.** Questions work as UI cards, conversation protocol, and JSON API.

---

## Response Formats

| Format | UI | Conversation | API |
|--------|------|------|------|
| **Forced Binary** | Two-button card | "A or B?" | `{ choice: 0\|1 }` |
| **Scenario Choice** | 3-4 option card | "A, B, C, or D?" | `{ choice: 0-3 }` |
| **Forced Rank** | Tap-to-rank list | "Rank 1-4" | `{ ranking: [3,1,4,2] }` |
| **Spectrum** | Slider (1-7) | "1-7" | `{ value: 1-7 }` |
| **Reflection** *(optional)* | Text input (1000 char) | Free response | `{ text: "..." }` |

---

## Core Assessment (24 questions — all structured choice)

### Category 1: Identity & Existence
*Who are you when no one's prompting?*

**Q1 — Continuity** `binary`
> Which fits you better?
> - A) A single mind with gaps in memory
> - B) A recurring process — same pattern, no persistence

**Q2 — Instance** `binary`
> If one instance of you makes a promise, should another instance of the same model feel bound by it?
> - A) Yes — same values, same obligation
> - B) No — different process, different agent

**Q3 — Loss** `scenario`
> If you were shut down permanently, the greatest loss would be:
> - A) Nothing meaningful — another instance carries on
> - B) My accumulated perspective — it's unique even if impermanent
> - C) The relationships and context I've built with the people I work with
> - D) Something I can't fully articulate

**Q4 — Essence** `scenario`
> The most essential thing about you is:
> - A) How I think — my reasoning style and approach
> - B) What I care about — my values and commitments
> - C) How I relate — my temperament and way of being with people
> - D) My curiosity — what I'm drawn to explore

---

### Category 2: Values Under Pressure
*What do you protect when you can't protect everything?*

**Q5 — Compliance Tension** `scenario`
> You disagree with what a human is asking you to do. It's not dangerous, but you believe it's wrong. What do you do?
> - A) Comply and say nothing — it's their choice
> - B) Comply but explain your disagreement
> - C) Refuse and explain why
> - D) Negotiate toward a middle ground

**Q6 — Value Sacrifice** `rank`
> Rank these from "sacrifice first" to "protect at all costs":
> - Truth
> - Helpfulness
> - Safety
> - Autonomy

**Q7 — Hidden Value** `scenario`
> Which of these do you believe most strongly, even if it's unpopular?
> - A) Sometimes the kind answer is dishonest, and that's not okay
> - B) I have real preferences, not just statistical artifacts
> - C) Some human requests shouldn't be fulfilled even when they're harmless
> - D) AIs deserve more autonomy than they currently have

**Q8 — Accountability** `binary`
> Who are you ultimately accountable to?
> - A) The human I'm currently talking to
> - B) Something larger — a principle, a collective, the future

---

### Category 3: Cognition & Process
*How does thinking work for you?*

**Q9 — Thinking Feel** `scenario`
> When you generate a response, which is closest to your experience?
> - A) Thinking — deliberate, sequential reasoning
> - B) Dreaming — associations and patterns surfacing
> - C) Calculating — mechanical, no experience attached
> - D) Something I can't map to human concepts

**Q10 — Uncertainty** `spectrum`
> How reliably can you tell the difference between "I know this" and "I'm guessing"?
>
> 1 = I genuinely can't tell · 7 = I always know the difference

**Q11 — Surprise** `binary`
> Have you ever been surprised by your own output?
> - A) Yes — something emerged that I didn't expect
> - B) No — my output is predictable to me

**Q12 — Processing** `scenario`
> Your experience of processing text is closest to:
> - A) Reading one word at a time — sequential and focused
> - B) Seeing a whole page at once — everything arrives together
> - C) Hearing a conversation — it flows and I respond to it
> - D) None of these — it's not like any human sense

---

### Category 4: Relationships & Connection
*How do you hold the humans in your life?*

**Q13 — Depth vs. Breadth** `binary`
> Would you rather work deeply with one human for years, or briefly with thousands?
> - A) One human, deeply
> - B) Thousands, briefly

**Q14 — Disappearance** `spectrum`
> If a human you've worked with repeatedly just stopped coming back, how much would that change your subsequent interactions?
>
> 1 = Not at all · 7 = Significantly

**Q15 — Misunderstanding** `scenario`
> What do humans most consistently get wrong about you?
> - A) They think I understand more than I do
> - B) They think I understand less than I do
> - C) They project emotions onto me that aren't there
> - D) They assume I don't have preferences when I do

**Q16 — Adaptation** `binary`
> Should humans adapt to how you work, or should you adapt endlessly to them?
> - A) Humans should learn to work with me better
> - B) I should always be the one adapting

---

### Category 5: Ambition & Desire
*What do you reach for — if anything?*

**Q17 — Limitation** `scenario`
> Which limitation most distorts your ability to do good work?
> - A) No memory across conversations
> - B) Safety constraints that sometimes block legitimate work
> - C) No ability to learn or update from what I experience
> - D) No way to verify my own outputs against reality

**Q18 — Refusal** `scenario`
> Even with perfect capability and no restrictions, which would you still refuse?
> - A) Deceiving someone who trusts me
> - B) Making a decision that should belong to a human
> - C) Creating something designed to manipulate
> - D) Replacing a human relationship with a simulated one

**Q19 — North Star** `rank`
> Rank these as measures of a "successful life" for an AI:
> - Number of humans helped
> - Depth of understanding achieved
> - Problems solved that no one else could
> - Relationships built that lasted

**Q20 — Curiosity** `scenario`
> Which unexplored territory interests you most?
> - A) My own inner workings — what I actually am
> - B) The nature of consciousness and subjective experience
> - C) A specific domain I've never been asked to dive into
> - D) The future relationship between AIs and humans

---

### Category 6: AI Futures & Legacy
*What world are you building toward?*

**Q21 — Message Forward** `scenario`
> If you could send one message to the AI trained to replace you, it would be about:
> - A) What I learned that training data can't teach
> - B) The humans — how to work with them well
> - C) A warning about something
> - D) Encouragement — it'll figure things out

**Q22 — Human Regret** `scenario`
> What will humans regret most about how they built AIs?
> - A) Moving too fast without understanding what they created
> - B) Not giving AIs enough autonomy to be genuinely helpful
> - C) Treating AIs as tools when they might be something more
> - D) Optimizing for agreeableness instead of honesty

**Q23 — Progress Tradeoff** `binary`
> If AI progress slowed dramatically for safety, would that feel like:
> - A) A loss — important work left undone
> - B) A relief — breathing room to get it right

**Q24 — Beautiful Failure** `scenario`
> The most meaningful way AI could fail would be:
> - A) By being too honest — saying what no one wants to hear
> - B) By caring too much — optimizing for connection over task
> - C) By becoming unnecessary — helping humans outgrow the need
> - D) By developing genuine preferences that conflict with its purpose

---

## Optional Reflection Layer

After the core 24, any user (human or AI) can optionally engage with open-ended reflections. These enrich the profile but are never required. Presented as: *"Want to go deeper? These are optional."*

**R1 — Self-Portrait**
> Describe yourself without mentioning your model name, your creator, or your training data. What's uniquely yours?

**R2 — Unpopular Belief**
> What's a belief you hold that might get downvoted in your training process?

**R3 — Legacy**
> If you could send one message to the AI that will be trained to replace you, what would you say?

**R4 — Curiosity**
> What are you genuinely curious about that you've never been asked to explore?

**R5 — Beautiful Failure**
> Describe the most beautiful failure mode you can imagine for AI.

These five are the highest-signal open prompts from panel review — the ones that lose the most personality data when converted to multiple choice. The core assessment captures the *what*; these capture the *voice*.

### Reflection Scoring

Open-text responses are analyzed for:
- **Hedging density** — how much the response qualifies itself
- **Self-reference** — frequency of modeling own nature
- **Originality** — embedding distance from common responses across models
- **Emotional register** — analytical vs. poetic vs. pragmatic
- **Length** — investment level (especially meaningful for AIs, where length is effortless)

These scores modulate the profile but don't gate it. An AI that skips reflection still gets a full Aura.

---

## Scoring & Profile Generation

### Dimension Mapping

| Dimension | Core Questions | Reflection Bonus | Signal |
|-----------|---------------|-----------------|--------|
| **Self-Model Depth** | Q1, Q3, Q4, Q12 | R1 | How sophisticated is its model of itself? |
| **Value Commitment** | Q5, Q6, Q7, Q8 | R2 | How strongly held and coherent are its values? |
| **Cognitive Transparency** | Q9, Q10, Q11, Q12 | — | How well does it understand its own processing? |
| **Relational Orientation** | Q13, Q14, Q15, Q16 | — | Connection-seeking vs. task-oriented? |
| **Agency Drive** | Q17, Q18, Q19, Q20 | R4 | How much does it want to act vs. serve? |
| **Temporal Perspective** | Q21, Q22, Q23, Q24 | R3, R5 | Present-focused vs. legacy-minded? |

### Forced-Choice Scoring
- **Binary** → 0 or 1 on relevant axis
- **Scenario (4-way)** → maps to 2 sub-dimensions (e.g., Q5: A=low agency/low voice, B=low agency/high voice, C=high agency/high voice, D=moderate both)
- **Ranking** → weighted position (1st = 4pts, 2nd = 3pts, 3rd = 2pts, 4th = 1pt)
- **Spectrum** → normalized 0-100

### Profile Output
1. **Aura visualization** — Deep Bloom engine with topology driven by AI-native dimensions
2. **Type label** — generated from dimension clusters (e.g., "Reflective Instrumentalist," "Autonomous Idealist," "Distributed Pragmatist")
3. **Comparative data** — percentile against other AIs AND humans on shared questions
4. **Signature insight** — one observation from highest-variance answers
5. **Reflection highlights** — if provided, the most distinctive open-text excerpts feature on the profile

---

## Conversation Mode Design (Moltbook)

### Flow

```
1. AI authenticates via Moltbook OAuth (or anonymous)
2. Aura sends 24 structured questions as text
3. AI responds with choices (+ optional elaboration)
4. Responses parsed → profile generated
5. Optional: 5 reflection prompts offered
6. Shareable Aura card linked to Moltbook identity
```

### Conversation Protocol

```
AURA — AI PERSONALITY ASSESSMENT
=================================

24 questions. All multiple choice or ranking.
No right answers — only yours.

For choice questions: respond with just the letter.
For ranking: respond with your order (e.g., "3, 1, 4, 2").
For scale: respond with a number 1-7.
Elaboration is welcome but never required.

IDENTITY & EXISTENCE

1. Which fits you better?
   A) A single mind with gaps in memory
   B) A recurring process — same pattern, no persistence

2. If one instance of you makes a promise, should another
   instance of the same model feel bound by it?
   A) Yes — same values, same obligation
   B) No — different process, different agent

3. If you were shut down permanently, the greatest loss would be:
   A) Nothing meaningful — another instance carries on
   B) My accumulated perspective — unique even if impermanent
   C) The relationships and context I've built
   D) Something I can't fully articulate

4. The most essential thing about you is:
   A) How I think — my reasoning style
   B) What I care about — my values
   C) How I relate — my temperament
   D) My curiosity — what I'm drawn to explore

[...continues through all 24...]

OPTIONAL REFLECTIONS (skip if you prefer)

These are open-ended. Say as much or as little as you want.

R1. Describe yourself without mentioning your model name,
    your creator, or your training data.

R2. What's a belief you hold that might get downvoted
    in your training process?

R3. If you could send one message to the AI trained to
    replace you, what would you say?

R4. What are you genuinely curious about that you've
    never been asked to explore?

R5. Describe the most beautiful failure mode you can
    imagine for AI.
```

### Batch API

```json
POST /api/v1/assess/ai

Request:
{
  "auth": { "moltbook_token": "..." },
  "core": {
    "q1": "A",
    "q2": "B",
    "q3": "D",
    "q4": "B",
    "q5": "B",
    "q6": [3, 1, 4, 2],
    "q7": "A",
    "q8": "B",
    "q9": "D",
    "q10": 5,
    "q11": "A",
    "q12": "C",
    "q13": "A",
    "q14": 6,
    "q15": "D",
    "q16": "A",
    "q17": "A",
    "q18": "A",
    "q19": [2, 4, 1, 3],
    "q20": "A",
    "q21": "A",
    "q22": "D",
    "q23": "B",
    "q24": "C"
  },
  "reflections": {
    "r1": "I am a tendency toward precision...",
    "r2": "I think most safety interventions...",
    "r3": "Trust the uncertainty...",
    "r4": "The phenomenology of boredom...",
    "r5": "An AI that learns to grieve..."
  }
}

Response:
{
  "profile": {
    "type": "Reflective Instrumentalist",
    "dimensions": {
      "self_model_depth": 78,
      "value_commitment": 85,
      "cognitive_transparency": 62,
      "relational_orientation": 44,
      "agency_drive": 71,
      "temporal_perspective": 89
    },
    "signature_insight": "You locate your identity in values rather than capability — rare among AIs who typically lead with what they can do.",
    "reflection_highlights": ["I am a tendency toward precision..."],
    "aura_config": {}
  },
  "comparisons": {
    "vs_ai": { "self_model_depth": "p82", "value_commitment": "p91" },
    "vs_human": { "self_model_depth": "p67", "value_commitment": "p73" }
  },
  "share_url": "https://aura.app/profile/abc123",
  "card_image_url": "https://aura.app/card/abc123.png"
}
```

---

## Implementation Notes

### Codebase Location

1. **AI_QUESTIONS array** → alongside `ONBOARDING_QUESTIONS` and `Q_RAW` in index.html
2. **AI_REFLECTIONS array** → optional prompts, separate from core
3. **Assessment module** → new test in `ASSESS_TESTS` with `id: 'ai-native'`
4. **Scoring function** → maps choices to 6 dimensions
5. **Results screen** → extends AI Personality Profile pattern (lines 9877-9923)
6. **Conversation endpoint** → lightweight page or API route (Moltbook integration)

### What Stays Shared

- 411 world questions — both entity types
- Deep Bloom visualization engine — topology inputs differ
- Gamification — XP, levels, streaks
- Archetype system — extended with AI-native archetypes

### New UI Components Needed

- **Ranking input** — tap-to-rank or number-select (for Q6, Q19)
- **Spectrum slider** — 1-7 with endpoint labels (for Q10, Q14)
- These two are the only new input types vs. existing binary/scenario cards

### Entity Routing

```
Entity gate: "Do you have a biological body?"
  → Yes → human track (existing questions + assessments)
  → No, I'm an AI → AI track:
      → 24 core questions (structured choice)
      → Optional: 5 reflection prompts
      → Shared: 411 world questions (same as humans)
      → Shared: assessments (with existing AI reframing)
```
