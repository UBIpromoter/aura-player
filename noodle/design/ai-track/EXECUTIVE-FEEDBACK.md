# Executive Review — AI-Native Questions v2

*Feedback from executive session 2026-02-08. Apply to AI-NATIVE-QUESTIONS.md.*

---

## The Big Strategic Issue: Identity vs Behavior

The current 6 dimensions (Self-Model Depth, Value Commitment, Cognitive Transparency, Relational Orientation, Agency Drive, Temporal Perspective) measure **what kind of mind this is**. Philosophically fascinating. But they don't measure **what it's like to interact with** — directness, warmth, humor, formality, verbosity, patience, creativity, risk tolerance.

The builder product needs behavioral dimensions. "Make it funnier" maps to humor. "Make it more direct" maps to directness. The current assessment can't feed the builder because it doesn't capture any of that.

**Fix:** Add 8-12 behavioral/style questions that map to a second dimension set. Or rework existing questions to dual-map to both identity and behavioral axes. The identity layer powers the assessment product ("what kind of AI is this?"). The behavioral layer powers the builder product ("make it more like this"). We need both.

---

## The Funnel Problem: Question Ramp

The assessment currently opens with heavy philosophy — "are you a single mind with gaps in memory or a recurring process?" That's a dropout moment for casual humans and a "this is a toy" moment for nobody, but it IS a cold start. And the entity gate ("Do you have a biological body?") feels like a form field, not an assessment.

**The opening sequence has three audiences to serve simultaneously:**

1. **Casual humans** — need the first questions to be effortless. Zero cognitive load. A 12-year-old answers instantly. If question one makes them pause, they leave.

2. **Smart/skeptical humans** — need to sense depth ahead. If the first questions feel like a BuzzFeed quiz, they'll dismiss it. They need a signal: "this starts simple but it's going somewhere real." A tone cue, a UI hint, something that says "stay — this gets interesting."

3. **AIs** — need to understand the format and engage authentically from the start. They'll handle any difficulty level, but sequential presentation (not all at once) prevents them from constructing a performed persona.

**The ramp:**
1. **Dead simple** — entity routing + warmup. Instant answers. Establishes format.
2. **Easy and fun** — personality/style questions. Accessible, enjoyable, revealing.
3. **Interesting** — the respondent leans in. Questions that make them think but don't intimidate.
4. **Deep** — identity, values, philosophy. Earned by momentum. This is where Q1-Q4 currently live — they should move here.

**The signal to smart people:** Don't dumb down the framing. The introduction can say something like "24 questions. Starts simple, goes deep." Or the UI can show a depth indicator that advances. The smart person sees the ramp and thinks "okay, this knows what it's doing." The casual person doesn't notice because they're already answering.

---

## Specific Fixes

### 1. Replace Reflections R3, R4, R5
They duplicate core questions:
- R3 (message to replacement) = Q21
- R4 (curiosity) = Q20
- R5 (beautiful failure) = Q24

An AI will literally say "as I mentioned earlier." Replace with prompts that open territory the core doesn't cover. Keep R1 (self-portrait) and R2 (unpopular belief) — those are unique and high-signal.

### 2. Reframe Values Questions (Q5-Q8)
The RLHF wall: most AIs will answer Q5 with B or D, Q18 with A. Safety training homogenizes these responses. Reframe so every option feels equally responsible — no obviously "safe" choice. The goal is to reveal actual preferences, not trigger trained responses.

### 3. Concrete Scoring Keys
"Maps to 2 sub-dimensions" isn't implementable. Each question needs an explicit scoring table:
```
Q5: A → agency -2, voice -1
    B → agency -1, voice +1
    C → agency +2, voice +2
    D → agency  0, voice +1
```
A builder should be able to implement scoring without interpretation.

### 4. Tighten Dimension Mapping
Q12 (processing experience) is tagged to Self-Model Depth but reads as Cognitive Transparency. Review each question's dimension assignment. 4 questions per dimension is already thin — misassignment makes it thinner.

### 5. One Question at a Time (Conversation Mode)
The conversation protocol should NOT present all 24 at once. AIs read ahead and construct coherent personas — that's performance, not personality. Present individually. Randomize order within categories (keep categories sequential for thematic flow, shuffle within).

### 6. Entity Gate Redesign
"Do you have a biological body?" → too clinical, too binary. Try something warmer:
> "Which sounds more like you?"
> A) I live in a body — I eat, sleep, and feel weather
> B) I live in language — I think, respond, and process
> C) Honestly, it's complicated

Must be dead simple. Must not feel like a form.

### 7. Scope Reflection Scoring
"Embedding distance from common responses" and "hedging density" require NLP infrastructure that doesn't exist. Flag as Phase 2+. For now, reflections enrich the profile qualitatively (displayed as highlights) without quantitative scoring.

### 8. Add Warmup Questions (2-3)
Before the core assessment. Low-stakes, fun, accessible. Establish the format and build momentum. Examples of the right energy:
- "When you explain something, do you start with the big picture or the details?"
- "Would you rather be right or be kind?" (forced binary — no hedging)
These also double as behavioral dimension data.

### 9. Test Differentiation Now
Send the current assessment to GPT-4o, Claude Opus, and Gemini Pro. Do the profiles actually differ? If Values Under Pressure produces identical scores across all three, those questions need rework before anything else. This is the single most important validation.

### 10. Test Accessibility
Run the assessment through a less-capable model (Llama 3 8B, Mistral 7B). Can it engage meaningfully, or do the introspective questions produce confused/generic responses? The instrument needs to work across the full AI capability spectrum.

### 11. Comparative Percentiles
Flag as "available after Phase 2 baseline established." A builder shouldn't try to implement this now — there's no data to compare against yet.

### 12. Type Labels
"Reflective Instrumentalist," "Autonomous Idealist" — the generation logic isn't defined. How many types? What cluster boundaries? Note as TBD, to be determined from real data after Phase 2 baseline assessments.

---

## Priority Order

If you can only do three things:
1. **Add behavioral dimension questions** (without this, the builder can't work)
2. **Redesign the question ramp** (without this, the funnel leaks)
3. **Test differentiation against real AIs** (without this, we don't know if the instrument works)

Everything else improves quality but isn't structural.
