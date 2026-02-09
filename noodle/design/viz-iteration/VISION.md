# Aura Visualization — Design Vision

## The Organism

The aura is a living organism made of connections. The identity isn't the points — it's what exists between them. Nodes are small interior anchors. The web of connections IS the living thing.

## Growth

The organism grows over time as the user answers questions and completes assessments. Each response drops new nodes into the field. New connections form. The web gets denser. The design must be beautiful at every stage.

### Node Hierarchy (from playground-v12)

1. **5 Primaries** — the core identity. Each driven by 2 onboarding questions (one controls color, one controls position). These are the skeleton.
2. **10 Companions** — 2 per primary, orbit nearby. Flesh on the bones.
3. **5 Satellites** — between primaries and center. Structural bridges.
4. **Assessment nodes** — drop in as assessments are completed. 3-5 nodes per assessment, positioned near their affinity primaries.

### Assessment System

11 assessments across 2 tiers. Each has affinities to specific primaries — when completed, its nodes settle near those primaries, densifying that region.

**Tier 1 (Starter):** Personality, Motivation, Thinking, Connection, Strategy
**Tier 2 (Deep):** Big Five, Character, Shadow, Mind, Relationships, Behavior

### Growth Stages

- **Onboarding only (5 primaries + companions):** A young organism. Sparse web, but the connections are visible. The shape is forming.
- **Tier 1 assessments dropping in:** The organism gains density. New clusters appear near their affinity primaries. The web starts to feel like tissue.
- **Tier 2 assessments complete:** Full organism. Dense mesh, rich connections, clear boundary. 40-60+ nodes, all interconnected.

### Physics

Not static positions — actual force simulation. Springs along edges (weighted by answer similarity), repulsion between all nodes, center gravity. The organism physically settles into shape. When a new assessment drops nodes, the whole thing reorganizes — you watch it find its new equilibrium.

### Edge Weighting

Connection strength changes based on answers. Same answer on two connected primaries = stronger attraction = closer spacing. Different answers = weaker spring = more spread. Your answers literally shape the topology.

## Boundary

The organism has a soft outer membrane. It glows outward — that's the aura's light. The interior is dark and quiet. Glow is emission, not illumination.

**Biological (human):** Has a membrane. Contained, bounded, finite. There's an inside and an outside. "I am here, inside this shape."

**Non-biological (AI):** No membrane. The web extends and fades at the edges. Unbounded, distributed. The identity is the pattern, not a contained entity. "I am this pattern, wherever it reaches."

Same traits, same connections, different mode of existence. This is the most visible visual fork from the entity gate.

## Alive

The interior wiggles, breathes, shifts. Watch it for an hour and it's rearranged. The pieces work in concert — coordinated organic movement, not random jitter.

Three timescales of motion:
1. **Micro (seconds):** gentle drift on individual connections and nodes
2. **Meso (minutes):** slow reshaping, orbital drift, tidal breathing
3. **Macro (hour+):** the whole organism has rearranged — it evolves

## Cohesion

Everything connects to at least two other things. No stragglers. No isolated points near the edge. One shape, one organism. The denser the connections, the more it feels like tissue rather than a graph.

## What It's NOT

- Blindingly bright
- Additive blending making overlaps white
- Atmospheric nebula clouds radiating from nodes
- Points as the visual focus
- Scattered or sparse
- Geometric or rigid

## Rendering Principles

- **Normal compositing only.** No `lighter` / additive blending.
- **Connections are the visual star.** Two-pass rendering: thick soft line underneath + thin sharp line on top. This creates structural glow from the web itself.
- **Nodes are de-emphasized.** Small (r=2-4), solid fill, minimal or no halo.
- **Boundary glow is soft.** Multiple passes at increasing size with decreasing alpha. Outward only.
- **Interior is dark.** The organism's body is defined by its structure, not by brightness.
- **Color comes from trait colors** blended along connections, not from atmospheric pools.

## Entity Differentiation (already in v12)

Human and AI already have different connection patterns (`HUMAN_CONNS` vs `AI_CONNS`) and position layouts (`HUMAN_POS` vs `AI_POS`). The membrane/boundary visual fork builds on top of this existing structural fork.

## References

- `noodle/2026-02-03-profile-redesign-v2/aura-themed.html` — SVG blurred ellipses, cohesion, dark interior, soft atmospheric color
- `noodle/design/aura-viz-anatomy/playground.html` — Star Map mode: two-pass connections, pulse, structure, movement, tiny node halos (max alpha 0.12)
- `noodle/design/aura-viz-anatomy/playground-v12.html` — **The mapping engine.** NEURON_MAP, ASSESS_MAP, force simulation, node hierarchy, edge weighting, entity differentiation. This is the data model the visual design sits on top of.
