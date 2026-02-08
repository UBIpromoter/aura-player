# Aura Question & Assessment Data Extraction

Complete extraction of all question and assessment content from Aura, a personality assessment app. Extracted for multi-model review and improvement.

## What's Here

| File | Contents | Format |
|------|----------|--------|
| `questions.json` | 455 Q_RAW questions (411 active, 44 archived) | JSON |
| `assessments.json` | 23 assessment tests, 210 total items | JSON |
| `onboarding.json` | 10 onboarding questions | JSON |
| `questions-readable.md` | All active questions in readable markdown | Markdown |
| `assessments-readable.md` | All assessments in readable markdown | Markdown |
| `extract.js` | Script that generated these from `index.html` | Node.js |

## Quick Stats

### Q_RAW (World Questions)
Users answer these with binary Yes/No or multiple choice, plus a 4-level confidence slider (Hunch → Leaning → Firm → Certain).

| Category | Active | Description |
|----------|--------|-------------|
| Prediction (p) | 84 | Future events, tech trends, economics |
| Reasoning (r) | 102 | Philosophy, logic, definitions |
| Judgment (j) | 225 | Opinions, preferences, critical evaluation |
| **Total active** | **411** | |
| Archived (x:1) | 44 | Hidden, never deleted |

**Types:** 257 binary, 154 multiple choice

### Assessments (Self-Discovery)
Structured psychological assessments with Likert scales.

| Tier | Category | Tests | Items | Scale |
|------|----------|-------|-------|-------|
| 0 | Quick Profile | 1 | 10 | likeme |
| 1 | Starter Pack (5 modules) | 5 | 41 | likeme |
| 2 | Big Five Personality | 5 | 50 | likeme |
| 2 | Character (Integrity) | 1 | 6 | agreement |
| 2 | Shadow Self (Dark Triad) | 3 | 18 | agreement |
| 2 | Mind (ADHD, Cognitive, Chronotype) | 3 | 22 | mixed |
| 2 | Mind (Reasoning I-III) | 3 | 36 | iq |
| 2 | Relationships (Attachment) | 1 | 12 | agreement |
| 2 | Behavior (Risk) | 1 | 15 | likelihood |
| | **Total** | **23** | **210** | |

### Onboarding
10 fun binary questions (chicken/egg, pizza toppings, etc.) to build momentum before real content.

## Data Rules (Critical)

### Questions (Q_RAW)
1. **NEVER reuse an ID** — always increment (next: 456+)
2. **NEVER delete** — set `archived: true` instead
3. Minor edits (typos) OK, major changes = new question with new ID

### Assessments (ASSESS_TESTS)
1. **NEVER delete a test** — add `archived: true` to hide
2. **NEVER delete questions within a test** — index matters for stored responses
3. **NEVER reorder questions** — index is stored in responses
4. Can **ADD** questions to the **END** of a test's items array
5. Minor edits (typos) OK, major changes = discuss implications

## Schemas

### Q_RAW Question
```json
{
  "id": 1,
  "type": "binary",
  "category": "prediction",
  "question": "Will Bitcoin exceed $150,000 before July 2026?",
  "evidence": [
    { "type": "stat", "label": "Current Price", "value": "$97,234" },
    { "type": "stat", "label": "ATH", "value": "$108,786" }
  ]
}
```
```json
{
  "id": 2,
  "type": "multiple",
  "category": "reasoning",
  "question": "Is a hot dog a sandwich?",
  "options": ["Yes, it's bread with filling", "No, it's its own category", "It's a taco", "Depends on definition"],
  "evidence": [{ "type": "note", "text": "Merriam-Webster: sandwich = ..." }]
}
```

### Assessment Item (Likert)
```json
{
  "index": 0,
  "question": "I am the life of the party",
  "trait": "E",
  "keying": "positive"
}
```
- `keying`: `positive` (agree = higher score), `reverse` (agree = lower score), `tradeoff` (forced choice between two poles)
- `construct`: dimension being measured (e.g., `extraversion`, `achievement`)
- `dimension`: subscale (e.g., `anxious` vs `avoidant` for attachment)

### Assessment Item (IQ/Reasoning)
```json
{
  "index": 0,
  "question": "Hot is to Cold as Up is to:",
  "options": ["Down", "High", "Sky", "Left"],
  "correctAnswer": 0
}
```

## Response Scales
| Scale | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| likeme | Not like me | A little unlike me | Neutral | A little like me | Very like me |
| agreement | Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree |
| frequency | Never | Rarely | Sometimes | Often | Always |
| likelihood | Never would | Unlikely | Maybe | Likely | Definitely |
| iq | (Custom multiple choice with correct answer) | | | | |

## Tier Unlock System
- **Tier 0:** Quick Profile always available (gateway)
- **Tier 1:** Complete Quick Profile → unlocks Starter Pack (5 modules)
- **Tier 2:** Complete all 5 Starter modules → unlocks everything else

## How to Use This for Review

### For improving Q_RAW questions:
- Are the questions engaging, clear, and well-worded?
- Do the multiple choice options cover the full range of reasonable answers?
- Are there duplicate or near-duplicate questions?
- Is the balance across categories good? (Judgment is 55% of active questions)
- Are predictions still timely and interesting?
- Do evidence snippets add value?
- Which questions feel too trivial, too controversial, or poorly designed?

### For improving assessments:
- Are the items psychometrically sound? (face validity, clarity, balance of keying)
- Do the items cover the construct adequately?
- Are any items too similar to each other within a test?
- Is the language accessible but precise?
- Are the Starter Pack items good behavioral proxies for their constructs?
- Are the reasoning questions at appropriate difficulty levels per tier?
