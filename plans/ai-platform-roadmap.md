# Aura AI Platform Roadmap

*Operational plan. Sequenced by dependency, not ambition. Last updated: 2026-02-08*

See also: `monetization.md` (strategy, vision, revenue model)

---

## Constraint

The builder can't be good without prompt-to-personality data. Data comes from AIs taking assessments. So the sequence is forced — each phase feeds the next.

**Critical: nothing goes public until Aura is shippable.** The AI personality angle is easy to copy once visible. Competitors have more resources. Our advantage is having the product ready when the idea lands. Ship first, announce with the full package.

---

## Phase 1: AI Assessment Pipeline

*Foundation. Everything else sits on this.*

**Goal:** An AI can take the Aura assessment programmatically and receive a structured personality profile.

### Deliverables:
- [ ] Assessment format optimized for AI consumption (structured questions, clear scales, unambiguous instructions)
- [ ] JSON personality profile output (machine-readable, alongside the visual aura)
- [ ] API endpoint: submit answers → receive profile
- [ ] Validate: do AI results produce meaningful, differentiated profiles? (If every AI scores the same, the instrument needs calibration)

### In Progress:
- AI question format being developed (separate session, 2026-02-08)

### Definition of Done:
- 3+ different AIs produce meaningfully different personality profiles
- Profiles are stable on re-assessment (same AI, same result ± noise margin)
- JSON output contains all dimensions needed to reconstruct the aura visualization

---

## Phase 2: Cross-Model Baseline

*The "ChatGPT took the Aura test" moment. Distribution + data.*

### 2a: Internal Validation (pre-launch, stays dark)

**Goal:** Prove the instrument works on AIs. Calibrate. Build the content. Don't publish yet.

- [ ] Run assessment against 5-6 models: GPT-4o, Claude Opus, Gemini Pro, Grok, DeepSeek, Llama 3
- [ ] Generate aura profile card for each (same format humans get)
- [ ] Verify results are meaningful — do different AIs produce different profiles?
- [ ] Stability check — same AI, multiple runs, consistent results?
- [ ] Build comparison page (ready to go live, not live yet)
- [ ] Store baseline snapshots for future drift detection
- [ ] Write-up drafted: what surprised us, what the differences mean

**Done when:** We're confident the instrument differentiates AIs reliably and the content is loaded and waiting.

### 2b: Launch (coordinated with Aura product ship)

Everything goes live together — the product, the AI results, and the story. One moment.

- [ ] Aura product is shippable (handles traffic, polished, stable)
- [ ] Comparison page goes live
- [ ] Individual model aura cards released (each one shareable)
- [ ] Post the story. Tag the AI companies. Let communities react.
- [ ] Landing page ready to convert curious visitors into assessment-takers

### 2c: Depth (post-launch, based on traction)

- [ ] **Size comparisons** — Haiku vs Opus, Flash vs Pro
- [ ] **System prompt sensitivity** — same model, three prompts, three auras (teaser for the builder)
- [ ] **The personality map** — all AIs plotted on the same dimensional space
- [ ] Each piece is independent, publishable on its own, feeds ongoing distribution

---

## Phase 3: Builder MVP

*The product that turns Aura from a quiz into a tool.*

**Goal:** Visual interface where you tune personality dimensions with sliders and get a usable system prompt out.

### Deliverables:
- [ ] Slider UI for core personality dimensions (directness, warmth, humor, formality, creativity, caution, verbosity, etc.)
- [ ] Live aura preview — sliders move, constellation shifts in real time
- [ ] Prompt generation engine — translates slider positions into a system prompt
- [ ] "Try it" sandbox — paste the generated prompt into a chat, see how the AI behaves
- [ ] Save/load configurations (presets / modes)

### The Hard Problem:
Slider-to-prompt translation. V1 is heuristic: hand-crafted mapping from dimension values to prompt language. V2+ uses accumulated data from builder usage (prompt-to-personality pairs) to improve the mapping. The flywheel starts rough and gets better.

### Approach Options:
1. **Template-based** — predefined prompt fragments, slider positions select and weight them. Simple, predictable, limited ceiling.
2. **LLM-generated** — feed dimensions to an LLM, ask it to write the system prompt. Flexible, higher ceiling, less predictable.
3. **Hybrid** — template skeleton + LLM fills in nuance. Best of both.

*Decision needed before building. Recommend hybrid — predictable structure with adaptive detail.*

### Definition of Done:
- User can move sliders and get a working system prompt
- Prompt demonstrably changes AI behavior in the direction the sliders indicate
- At least 3 saveable presets per user
- Aura preview updates in real time

---

## Phase 4: Snapshot & Restore

*The insurance feature. "Your AI changed. Here's how. Here's the fix."*

**Goal:** Detect personality drift when models update, show users what changed, regenerate a prompt that restores what they had.

### Deliverables:
- [ ] Periodic re-assessment (manual or automated) with comparison to saved baseline
- [ ] Drift visualization — before/after aura, dimension-level changes highlighted
- [ ] Delta report — "Warmth decreased 20%, directness increased 15%, humor unchanged"
- [ ] One-click restore — generate a prompt that compensates for the drift
- [ ] Notification system — "Your AI's personality may have changed. Check your profile."

### Depends On:
- Phase 1 (structured profiles to compare)
- Phase 2 (baselines to compare against)
- Phase 3 (builder to generate restoration prompts)

### Definition of Done:
- Simulate a model update (different model or version), detect the personality shift
- Generated restoration prompt brings personality profile within 80% of the saved baseline
- User can see what changed and decide whether to restore or accept the new personality

---

## Phase 5+: Platform (Future, Not Scoped Yet)

- API for developers to embed assessments
- Open personality profile standard (portable, any AI can read)
- Domain-specific assessment tracks (leadership, creativity, relationships)
- AI-company partnerships (embed Aura as personality config layer)
- Grant applications (decentralized identity + AI personality alignment)

---

## What's NOT in scope yet

- Payment infrastructure (premature until Phase 2+ traction)
- Mobile app (web-first, responsive)
- Social features beyond basic sharing (compatibility, etc.)
- Model fine-tuning based on personality profiles (maybe never — prompt-based is more portable)

---

## Active Questions

| Question | Impacts | Status |
|----------|---------|--------|
| Which personality dimensions? | Phase 1, 3 | Depends on assessment work in progress |
| Builder approach (template vs LLM vs hybrid)? | Phase 3 | Recommend hybrid, decision pending |
| How to detect model updates automatically? | Phase 4 | Research needed — maybe monitor API version headers? |
| Hosting / infrastructure for API? | Phase 1+ | TBD — start simple (single server), scale when needed |
| Assessment pricing for API tier? | Phase 5 | Way too early |
