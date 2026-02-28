# AI Launch Event: "We Gave Every AI a Personality Test"
> Concept doc — 2026-02-24

---

## The Pitch (One Sentence)

We ran the same personality assessments on every major AI model and published the results — here's what we found, and here's yours.

## Why This Works

- **Inherently interesting.** People are curious about AI. "Does ChatGPT have a different personality than Claude?" is a question people will click on.
- **Naturally comparative.** The results beg to be compared — model vs model, model vs human, your AI vs you.
- **Press-friendly.** Tech journalists, AI safety researchers, and mainstream outlets all have an angle here.
- **Self-reinforcing.** Every article links to "take it yourself." Every person who takes it adds to the dataset that makes the next comparison more interesting.
- **Proves the system.** If Aura can reliably distinguish between AI models — showing Claude has a genuinely different profile from GPT — that's evidence the assessment captures real signal, not noise.

## The Models

### Tier 1 (Must Have)
- Claude (Anthropic) — Opus, Sonnet, Haiku
- GPT (OpenAI) — GPT-4o, o1/o3
- Gemini (Google) — Pro, Flash
- Grok (xAI)

### Tier 2 (Great to Have)
- Llama (Meta) — open source angle
- Mistral
- DeepSeek
- Command R (Cohere)

### Tier 3 (Bonus)
- Specialized models (coding-focused, creative-focused)
- Same model with different system prompts (does personality change with instructions?)
- Same model at different temperatures

## What Assessments

Start with the Quick Profile (fast, gives immediate results) plus 2-3 deeper assessments that reveal interesting variation:
- Quick Profile — the baseline everyone gets
- One values/ethics assessment — where AI models likely diverge most
- One behavioral/social assessment — reveals trained-in tendencies
- One shadow/edge assessment — the spicy one that generates headlines

## The Variables That Make It Interesting

1. **Cross-model comparison.** Claude vs GPT vs Gemini on the same questions.
2. **Model size comparison.** Does Opus have a different personality than Haiku? (Probably yes — that's interesting.)
3. **System prompt influence.** Same model, default vs "be creative" vs "be precise." How much does personality shift?
4. **Consistency.** Run it 10 times. How stable is each model's personality? (If an AI's personality is unstable, that itself is a finding.)
5. **Human comparison.** Where do AI models cluster vs where humans cluster? What traits are "AI-shaped" vs "human-shaped"?

## Output / Deliverables

### The Report
- Interactive web page (not a PDF) with model-by-model profiles
- Visual comparisons (radar charts, spectrum bars — the same visualizations humans get)
- Key findings highlighted: biggest surprises, biggest differences, what's "most human," what's "most AI"
- Methodology section for credibility

### The Hook
- Landing page: "We tested every AI. Now test yourself."
- One-click path from reading results to taking the same assessment
- After taking it: "Here's how you compare to Claude / GPT / Gemini"

### The Data
- Raw results published openly (builds trust, invites researchers)
- API or embed for others to run the same assessments on new models
- Standing invitation: "New model? Run Aura on it and submit results."

## Distribution

### Primary
- **Twitter/X** — thread format. One finding per tweet. Visual results. Tag the AI companies.
- **Hacker News** — the methodology + open data angle
- **Reddit** — r/artificial, r/ChatGPT, r/LocalLLaMA, r/ClaudeAI

### Secondary
- AI newsletters (Ben's Bites, The Rundown, etc.)
- Direct outreach to AI journalists (specific people who cover model comparisons)
- AI safety / alignment communities (this touches on AI self-knowledge)

### Earned
- If the findings are genuinely surprising, the press writes itself
- The AI companies themselves might engage (especially if their model "wins" something)

## What Makes This More Than a Stunt

The stunt version: "haha AI took a personality test."
The real version: "Aura can distinguish between entities based on behavioral patterns, not biometrics. Here's proof."

That's the bridge to the unique humanity mission. If the system can tell Claude from GPT from a human — using behavior, not eyeball scans — then it can tell real humans from bots, originals from duplicates. The AI launch event isn't just marketing. It's a demonstration of the core technology.

## Practical Considerations

- **Cost:** API calls for all models across all assessments. Tier 1 is maybe $50-100 total. Cheap.
- **Time:** The assessment pipeline needs to handle API-based test-taking (not just browser UI). Moderate engineering.
- **Reproducibility:** Run each assessment multiple times per model. Publish methodology so others can verify.
- **Fairness:** Present results neutrally. Don't frame any model as "better" — frame differences as interesting.
- **Legal:** Using model outputs for published research is generally fine under terms of service, but worth a quick check per provider.

## Timeline Sketch

1. **Build the API assessment pipeline** — models take tests programmatically
2. **Run Tier 1 models** — collect data, verify consistency
3. **Build the interactive results page** — visual, shareable, links to "take it yourself"
4. **Soft launch** — share with crypto/BrightID community for feedback
5. **Public launch** — Twitter thread + HN post + newsletter pitches, same day
6. **Sustain** — add new models as they launch, keep the page as a living resource
