# Organism Viz — Open Items

*Branch: `feature/organism-viz` (commit `ef4b1ad`)*
*Last updated: 2026-02-09*

---

## Shipped

- [x] Blob primaries with 6 interior patterns (chromatin, constellation, vesicles, axon tree, membrane folds, synaptic)
- [x] Convex hull membrane bubble with 8-pass Chaikin smoothing
- [x] All organism content clipped to membrane in human mode
- [x] Tissue connections, energy pulses, neural network
- [x] Dark-field-strength rendering in both light and dark modes
- [x] Transparent canvas — organism floats in page, no container box
- [x] Data wiring: onboarding answers → trait values, assessment count → stage (Seed/Young/Growing/Full)
- [x] LOD: interiors + neural network skip at size < 200
- [x] Integrated into production index.html, replacing Deep Bloom constellation

## Open

- [ ] **Organism evolution design** — Stage progression should visually mature the primaries, not just add more nodes. Levers: shape complexity (blob harmonic count/amplitude), interior detail (pattern density), color saturation (muted → vivid ramp), edge definition (soft/diffuse → structured), accent bleed (secondary colors emerge later). See session transcript for full Seed→Young→Growing→Full spec.
- [ ] **AI mode organism** — Currently minimal (no membrane, basic fade). Needs its own visual identity. Production had hex grid background + diamond/triangle shapes.
- [ ] **In-app glow tuning** — Glow intensity designed for standalone prototype may need adjustment in the context of the app's darker/lighter backgrounds and surrounding UI.
- [ ] **Profile thumbnail polish (100px)** — At this size interiors are skipped. Verify the blob + membrane reads well as a tiny thumbnail in the personality card.
- [ ] **Light mode refinement** — Dark field vignette was removed for transparent canvas. Light mode may need subtle treatment so organism contrast holds against light backgrounds.
- [ ] **Assessment node integration** — Production had 11 assessment types spawning nodes at specific ring positions with affinity blending. Organism viz has no concept of this yet — assessments currently only affect stage.
