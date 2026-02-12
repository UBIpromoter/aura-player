# Aura Monetization Strategy

*Living document. Executive-owned. Last updated: 2026-02-11*

---

## Ethos

Aura descends from BrightID — open source, decentralized identity. That lineage is non-negotiable. The core framework, assessment engine, and personality model are **open**. Anyone can use, fork, build on.

**Goal: financial sustainability, not maximization.** Pay for itself, cover people and compute, scale without external funding pressure. Think Signal/Wikipedia/Mozilla, not Stripe/Slack.

## The Full Stack

The Aura app is the friendly top of a deep system:

| Layer | What | Who |
|-------|------|-----|
| **BrightID** | Unique identity verification | Adam's foundation |
| **Aura protocol** | Decentralized peer evaluation (any domain) | Adam's focus — Weighted SybilRank, evaluations, confidence ratings, teams |
| **Updraft** | Economic incentives + public ratification | Complement to Aura — prediction-market style |
| **Aura app** | Consumer entry point — questions, personality, AI | Philip's focus (built with Claude, ongoing since early 2026) |

The app serves three simultaneous purposes:
1. **Entertainment** — fun questions, personality tests, beautiful auras. People come for this.
2. **Calibration** — world questions measure accuracy/honesty on verifiable answers. Builds a track record.
3. **Talent identification** — finds people (and AIs) who are accurate, honest, thoughtful evaluators → feeds them into Aura protocol domains (human uniqueness, grant review, insurance, any evaluation work).

The personality assessment adds evaluator-quality signals: independence of thought, truth over agreeableness, conscientiousness. The AI track does the same for AI evaluators.

## Guiding Principle

**The free experience IS the growth engine.** The full assessment + aura visualization + shareable result must remain free, forever. Monetization layers on top of virality — never gates it.

---

## Tier Structure

### Free (Viral Engine)

- Full core assessment (all tracks)
- Aura visualization (living organism — full constellation)
- Shareable result card (screenshot-ready, embeddable)
- Basic personality summary

*This is the product people share. It stays complete and beautiful.*

### Premium (Depth Layer) — Target: $3-5/mo or $2-3 one-time per track

- **Detailed analysis** — full dimensional breakdown, what each spectrum means, what your combinations suggest. Free = the painting, premium = the essay.
- **Temporal tracking** — retake over time, see your aura shift. Sticky + retention.
- **Compatibility** — send to a friend, compare auras, see relationship dynamics. Viral AND converts.
- **Premium visualizations** — alternate render styles, high-res exports, unlockable constellation tiers.
- **Domain tracks** — leadership, creativity, relationships. Same engine, new lenses. Each track is a new product on existing rails.

### AI Personality Builder (Killer Feature)

The tool that turns Aura from a quiz into infrastructure:

- **Visual sliders** for personality dimensions — directness, humor, warmth, formality, creativity, caution, etc.
- **Live aura preview** — move a slider, watch the constellation shift in real time. You're sculpting personality visually.
- **System prompt generation** — Aura translates slider positions into a concrete system prompt. The output is actionable: paste into any AI.
- **Presets / modes** — save configurations. "Work mode," "Creative mode," "Comfort mode." Switch contexts, switch personality.
- **Before/after** — start from your AI's current assessment, tune from there. Or start from scratch.

The aura visualization becomes a **live preview of the prompt you're building.** Not writing English instructions and hoping — sculpting personality and watching it take shape.

*Pricing: basic builder free (open source ethos). Premium features: unlimited saved modes, advanced dimensions, temporal tracking of how your AI's personality evolves across versions.*

### API (Platform Layer) — usage-based pricing

- Developer access to assessment engine
- Embeddable assessments for other products
- Per-assessment pricing (Stripe-style)
- Open source core — API is the hosted convenience layer

### Evaluator Pipeline (B2B — the protocol play)

The app generates a pool of calibrated evaluators with track records. Organizations that need evaluation work done pay for access:
- **Grant programs** — who should receive funding? (Updraft integration)
- **Identity verification** — is this a unique human? (BrightID/Aura protocol)
- **Insurance claims** — peer review of claims
- **Content moderation** — human + AI evaluator pools
- **Any domain** that needs honest, accurate evaluation by vetted participants

This is the monetization layer Adam's protocol was always heading toward. The app is the recruitment + calibration engine.

### Sustainability Revenue (not extraction)

- **Hosted service** — the polished version with builder UI, viz, tracking. Low price, high volume.
- **API usage-based** — developers/AI companies pay per-assessment. Covers compute at scale.
- **Evaluator pipeline** — organizations pay for access to vetted evaluators (B2B).
- **Grants / sponsorship** — decentralized identity + AI personality = grant-friendly (Ethereum Foundation, AI safety orgs, digital identity initiatives).
- **Aura protocol fees** — teams register via smart contract, fees pay node operators and evaluators.
- **No VC-scale extraction.** Revenue covers costs + contributors + infrastructure. Grows with usage, not with funding rounds.

---

## AI Strategy

### Two distinct plays:

**1. AIs as test-takers (marketing play, not revenue)**
- Let AIs take Aura for free
- The story is the product: "GPT took the Aura test" = press, curiosity, traffic
- Shareable AI aura cards → humans discover the product
- Cost: minimal. Value: distribution.

**2. AIs as customers / API consumers (revenue play, Phase 3)**
- Developers embedding Aura assessments in AI products
- AI assistants offering personality assessment as a feature
- Usage-based billing, standard API model
- Requires brand recognition first — nobody licenses an engine they haven't heard of

### AI-Readiness Requirements

- [ ] Assessment format optimized for non-human takers (structured input, clear scales — *in progress, separate window*)
- [ ] API endpoint for programmatic assessment submission
- [ ] Machine-readable result format (JSON personality profile alongside visual)
- [ ] Result card generation from API (so AI-referred users still see the visual)
- [ ] Rate limiting + API key management
- [ ] Documentation for developers / AI integration guides

---

## Phasing

### Phase 1: Free + Viral (now → traction)
- Everything free. Full assessment, full visualization.
- Optimize for sharing, embedding, virality.
- Build the detailed analysis layer but give it away — it's what you'll eventually gate.
- **Design the seams** — the natural boundaries between free and paid — even if they're invisible to users right now.

### Phase 2: Freemium (traction → revenue)
- Gate the depth layer behind premium.
- Core stays free forever.
- Price for volume, not exclusivity. Impulse pricing.
- Compatibility feature drives both conversion AND viral loops.

### Phase 3: Platform (brand → scale)
- API access for developers.
- White-label assessments.
- Domain-specific track marketplace.
- AI integration partnerships.

---

## The Bigger Idea: Aura as AI Calibration Layer

Beyond "AIs take the test" — Aura becomes the way humans **see, understand, and shape** their AI's personality.

### The Vision

1. **Visibility** — Your AI takes Aura. You see its personality as an aura, not as settings or sliders. Legible, beautiful, intuitive. You can *see* what your AI actually is.

2. **Tuning** — Adjust dimensions, watch the aura shift in real time. "More direct, less cautious." The visualization IS the feedback loop. No guessing what a slider does — you see the personality change.

3. **Modes / Characters** — Multiple personality profiles for different contexts. Work mode (focused, direct), creative mode (exploratory, divergent), comfort mode (warm, patient). Each has its own aura. Switch based on headspace, project, or mood.

### Why This Matters

- Humans currently have no legible way to understand their AI's personality. System prompts are invisible. Settings are cryptic. Aura makes it visible.
- "Personalized AI" is the promise of every AI company. None of them have a personality *framework*. Aura could be that framework.
- The consumer product ("what's MY aura?") becomes the top of the funnel. The real product: **Aura is the standard visual language for AI personality.**

### The Insurance Use Case (Strongest Emotional Hook)

People have already felt this loss. ChatGPT updated its model — users lost the personality they'd bonded with. Anger, grief, petitions. Sam Altman had to restore the old model for paid users. This will happen again with every major update from every company.

**Aura solves it:**
1. You find an AI you love → Aura captures its personality profile (a snapshot)
2. Model updates, personality drifts → Aura detects the change, shows you what shifted
3. Builder regenerates a prompt that restores what you had → your AI comes back

This is personality insurance. Not a quiz — protection for a relationship people care about.

### The Democratization Angle

Power users build personality calibration by hand (system prompts, protocol files, detailed instructions). Most people will never do this. Aura gives everyone the *output* of that work through a visual interface: sliders instead of prose, auras instead of config files. The protocol experience, democratized.

### What This Changes About Monetization

- **Consumer freemium** — still the growth engine (human self-assessment)
- **AI calibration (premium)** — see your AI's profile, tune it, manage multiple modes. This is the high-value feature layer.
- **B2B/API (platform)** — AI companies embed Aura as their personality configuration UI. Not just assessment-as-a-service, but personality-visualization-as-infrastructure.

### Requirements (beyond current AI-readiness list)

- [ ] Tuning interface — adjust personality dimensions, see aura update live
- [ ] Multi-profile management — save/switch between personality modes
- [ ] Integration protocol — how an AI product reads an Aura profile and applies it
- [ ] Before/after visualization — show the impact of tuning changes
- [ ] Profile export — portable personality config an AI can ingest

---

## Open Questions

- **Pricing model:** subscription vs one-time unlock vs per-track? Each has trade-offs for retention and perceived value.
- **Free tier ceiling:** how much analysis is "enough to be curious" without being "so much they don't need more"? This is the critical design decision.
- **AI assessment fidelity:** do AI results mean the same thing as human results, or do they need a separate framework? Philosophical + practical.
- **Compatibility feature:** is this premium-only or does a basic version stay free (to drive viral invites)?
- **Platform risk:** if Aura becomes an API, does the consumer product become a demo for the engine? Is that okay?
- **AI calibration UX:** is tuning a premium-only feature, or does basic tuning stay free to drive adoption of the framework?
- **Profile portability:** open standard (aligned with BrightID ethos). Format TBD — JSON personality profile that any AI can ingest.
- **Multi-mode pricing:** per-profile? Unlimited profiles at a tier? Modes as a premium feature entirely?

---

## Data Flywheel (The Real Moat)

Aura's core advantage isn't code (it's open source) — it's **the dataset**.

### What we accumulate:

1. **Largest AI personality dataset** — every AI that takes Aura builds the cross-model personality map. How GPT differs from Claude differs from Gemini, across versions, over time. Nobody has this.

2. **Prompt-to-personality pairs** — builder usage generates (system prompt → personality profile) pairs. This is training data for the builder itself. "This instruction shifts directness by +2." Empirically derived, improves with scale.

3. **Version drift tracking** — model updates change personality. Aura can detect and show that. "GPT-4's warmth dropped 15% in the January update." Valuable to users AND to AI companies.

4. **Cross-model benchmarks** — "Here's every major AI on the Aura framework." Gets cited, linked, referenced. Free distribution.

### The flywheel:

More assessments → better prompt-to-personality mapping → better builder → more builder usage → more data → repeat.

### Note on model internals:

Weights are inaccessible (proprietary) or illegible (no clean mapping from parameters to traits). Doesn't matter. Personality assessment has never required access to internals — for humans or AIs. Measure behavior, not machinery.

---

## Competitive Context

*TODO: Research pricing and tier structures of:*
- 16Personalities (freemium, detailed reports paid)
- Enneagram Institute ($12/report)
- CliftonStrengths ($20-50/assessment)
- Crystal (API + B2B)
- Human Design apps

---

## Notes

- Assessment question format for AI consumption being developed in parallel session (2026-02-08)
- Organism visualization complexity could map naturally to free/paid visualization tiers (richer organisms as more assessments are completed)
- The visualization is the moat — it's what makes Aura shareable where other tests aren't
