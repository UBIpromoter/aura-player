# AuraMap

The visual fingerprint of who you are.

---

## What It Is

AuraMap is the system that turns answers into a living constellation. Two pieces work together:

1. **The Mapping** — how questions connect to visual elements
2. **The Rendering** — how answers change what you see

You can't separate them. The map IS the visualization. When someone looks at your AuraMap, they're seeing your answers expressed as light, color, shape, and motion.

---

## The Two Layers

### Layer 1: Questions Create the Map (Structure)

Every question in Aura connects to a node in the constellation. The question doesn't just collect data — it *creates territory* on the map.

**Primary Neurons (5)**
The backbone. Five core nodes that represent broad personality dimensions. Each is driven by two onboarding questions — one controls color, one controls position.

| Primary | Color Question | Position Question | Color A | Color B |
|---------|---------------|-------------------|---------|---------|
| 0 — Identity | "Which came first?" | "Better pizza topping" | Violet | Blue |
| 1 — Drive | "Is a hot dog a sandwich?" | "Dogs or cats?" | Indigo | Rose |
| 2 — Connection | "Humans on Mars by 2050?" | "Self-driving in 2035?" | Pink | Teal |
| 3 — Values | "Better superpower" | "Will AI replace jobs?" | Emerald | Amber |
| 4 — Mind | "Coffee in the morning?" | "Is water wet?" | Cyan | Violet |

**Companion Nodes (10)**
Two per primary. They orbit their parent, inherit its color, and create the visual cluster that makes each primary feel like a *region* rather than a point.

**Satellite Nodes (5)**
One per primary, positioned between the primary and the center. They appear after 6+ answers, creating depth — the constellation has a foreground and a background.

**Assessment Nodes (variable)**
Each completed assessment adds 3-5 new nodes. These are placed near their *affinity primaries* — the 2-3 core dimensions that assessment semantically relates to. Completing a Personality assessment adds nodes near Primary 0 (Identity) and Primary 2 (Connection). Completing a Motivation assessment adds nodes near Primary 1 (Drive) and Primary 3 (Values).

### Layer 2: Answers Affect the Map (Appearance)

Every answer changes what you see. The system is designed so that *any* answer makes the map more interesting — there are no wrong moves.

**Color**
Each primary has two possible colors based on the color question's answer. Option A = first color, Option B = second color. Unanswered primaries show a dim gray blend of both possible colors — a ghost of what they could become.

**Position**
The position question shifts each primary's angular placement around the center. Option A pushes it one direction, Option B the other. Combined with the color answer, every primary has 4 possible base positions — and the global answer hash rotates the entire constellation so even identical answer patterns at different questions produce different layouts.

**Proximity**
Connected primaries with the *same* answer value attract each other (closer, stronger spring). Different answers push them apart (weaker spring, longer rest length). This means your answer pattern creates a unique gravitational signature — clusters of agreement, gaps of divergence.

**Size & Glow**
Answered nodes are larger (r=12) with full glow halos (45px). Unanswered nodes are smaller (r=6) with minimal glow (24px). The visual weight tells you at a glance how much of the map is "filled in."

**Alpha (Visibility)**
Answered = fully opaque. Unanswered = 45% opacity. Assessment nodes = 85% when completed, invisible when not. The constellation literally materializes as you answer.

---

## The Entity Gate

The first question — "Do you have a biological body?" — splits the map into two fundamentally different visual languages:

**Human (circles + curves)**
- Nodes are circles with radial glow
- Connections curve organically (quadratic bezier with drift)
- High drift amplitude (nodes wander freely)
- Warm background (#060712)
- Stronger repulsion between nodes (5500) — spread out, exploratory

**AI (diamonds + triangles + grid)**
- Primary nodes are diamonds (standard) or triangles (sensitive dimensions)
- Connections are straight lines
- Minimal drift amplitude (nodes hold position)
- Cool background (#020810)
- Rotating hexagonal grid scaffold
- Lower repulsion (3500) — tighter, more structured

This isn't cosmetic. It reflects a real design principle: the map should feel like what it represents.

---

## The Force Engine

The constellation is alive. A force-directed simulation runs every frame:

- **Springs** pull connected nodes toward their rest length
- **Repulsion** pushes all visible nodes apart (prevents overlap)
- **Center gravity** keeps the constellation from drifting off-canvas
- **Damping** prevents infinite oscillation
- **Velocity caps** prevent explosive motion

When an answer changes, the affected primary gets a velocity *kick* toward its new seed position. The force sim smoothly transitions the entire constellation — companions follow their parent, assessment nodes rebalance near their affinity primaries, the whole graph breathes into its new shape.

This is what makes the map feel organic. It's not a diagram — it's an organism.

---

## Current State (v12)

**What works:**
- Every unique answer combination produces a visually distinct constellation
- Force-directed layout creates natural, organic clustering
- Assessment nodes integrate into the existing structure via affinity springs
- Entity gate creates two fundamentally different visual experiences
- Ghost nodes (unanswered) give the map structure even before you answer
- Canvas rendering with DPR awareness — sharp at any size
- Scales from 100px (profile thumbnail) to 280px (analysis hero) to 600px (playground)

**What's limited:**

1. **Binary answers = limited variety.** 10 binary questions = 1,024 possible base constellations. That's enough to feel unique in small groups but not at scale. Need more bits of variation.

2. **Onboarding questions are arbitrary.** "Is a hot dog a sandwich?" doesn't meaningfully measure Drive. The questions are fun icebreakers, but the mapping to personality dimensions is random. The map would be more meaningful if these questions actually correlated with what they claim to measure.

3. **Assessment answers don't affect appearance.** Completing an assessment adds nodes (presence), but the actual Likert-scale responses (1-5) don't influence color, size, or position. A person who scores 5/5 on Extraversion looks identical to someone who scores 1/5 — both just have "Personality" nodes present. This is the single biggest gap.

4. **No sharing mechanism.** The map exists only in your browser. No export, no snapshot, no embed.

5. **Always dark canvas.** Works great in dark mode. In light mode, the dark canvas with rounded corners looks intentional but isn't integrated.

---

## Where This Goes

### Phase 1: Meaningful Mapping

Replace the fun icebreakers with onboarding questions that actually measure something. The 5 primaries should map to real personality dimensions:

| Primary | Dimension | Sample Questions |
|---------|-----------|-----------------|
| 0 | Self-Perception | "How do others usually see you?" / "When you picture your best self..." |
| 1 | Drive & Motivation | "What gets you out of bed?" / "When a project gets hard..." |
| 2 | Connection Style | "In a group, you tend to..." / "When a friend is hurting..." |
| 3 | Values & Principles | "When rules conflict with kindness..." / "What matters most in a leader?" |
| 4 | Thinking Style | "When solving a problem..." / "Gut feeling or evidence?" |

Keep them binary (two options) for speed. But make them *diagnostic* — each answer should genuinely split people into two groups that differ on that dimension. The fun can come from the framing, not the irrelevance.

The entity gate stays. It's the most meaningful binary in the app.

### Phase 2: Assessment Depth

This is the big unlock. When someone completes an assessment, their *scores* should change the map:

**Node color blending:** A high Extraversion score shifts the Personality cluster toward warm colors. Low Extraversion shifts toward cool. The assessment result literally colors the map.

**Node size from score magnitude:** Extreme scores (very high or very low) make nodes larger. Moderate scores keep them small. People with strong traits have visually dominant regions.

**Connection strength from score correlation:** If two assessment dimensions correlate in your scores (e.g., high Extraversion + high Agreeableness), the connection between their affinity primaries strengthens. Your map reveals your trait relationships, not just your trait levels.

**Glow intensity from confidence:** The confidence voting system (which Aura already has) should feed into glow. High-confidence answers make their nodes glow brighter. The map shows not just who you are but how sure you are.

This is where the "answer more to see more" loop becomes irresistible. Each assessment doesn't just add nodes — it *transforms* existing ones. Your map becomes richer, more colorful, more detailed. You can see the difference between "3 assessments" and "15 assessments" at a glance.

### Phase 3: Fingerprint Uniqueness

With Phase 2 in place, the combinatorial space explodes:

- 10 binary onboarding answers = 1,024 base layouts
- 23 assessments x 5-point Likert scales x 6-12 questions each = effectively infinite color/size variation
- Entity gate doubles everything
- Force simulation means layouts with the same inputs still drift into slightly different stable states

At this point, no two maps should look alike. The probability of two people having identical maps should be astronomically low — like actual fingerprints.

### Phase 4: Social & Sharing

This is where AuraMap becomes a growth engine.

**Static export:** Render the current canvas state as a PNG. Include the person's archetype name as a subtle watermark. Shareable to social media, messaging, profiles.

**Animated embed:** An `<iframe>` or web component that renders a live, breathing constellation. For profile pages, portfolios, dating apps. The map is alive, not a screenshot.

**Comparison view:** Two maps side by side. Show a "similarity score" computed from answer overlap and trait correlation. "How similar are we?" becomes a social mechanic.

**Progressive reveal as social proof:** When someone shares their map and it has 20 assessment nodes glowing, that's visible status. It says "I've done the work." It makes the viewer want their map to look that rich. The answer-more loop becomes social.

**Map evolution timeline:** Show how your map changed over time. First visit = 5 dim ghost nodes. After onboarding = colored primaries. After first assessment = first cluster. After deep-dive = full constellation. This timeline IS the product story.

---

## The Core Insight

The map should make people feel two things:

1. **"That's me."** The constellation should feel personal. Not because you understand the mechanics, but because the colors, clustering, and motion resonate with your sense of self. It should feel *right* in a way you can't fully explain.

2. **"I want more."** Every unanswered dimension is a ghost node — visible but dim. Every uncompleted assessment is territory you haven't explored. The map makes the invisible visible: here's what you know about yourself, here's what you haven't discovered yet.

The questions build the map. The answers paint it. The assessments deepen it. Sharing spreads it. And the empty spaces pull you back in.

---

## File Reference

| Path | What |
|------|------|
| `index.html` — `AuraVisualization` | Production component (v12, canvas-based) |
| `noodle/design/aura-viz-anatomy/playground-v12.html` | Standalone playground with test harness |
| `noodle/design/aura-map/AURA-MAP.md` | This document |

## Lineage

playground v1-v4: Static SVG experiments
playground v5: Entity-gated shapes (circle/diamond/triangle)
playground v6: Atmospheric glow + orbital drift
playground v7: Constellation marriage (companions + satellites)
playground v8: Assessment simulation with tier toggles
playground v9-v11: Force-directed experiments
playground v12: Force-directed organism — merged to production 2026-02-07
