# Aura TODO

*Single source of truth. Updated 2026-02-09.*

---

## Ship-Blocking

These gate everything else. Nothing launches without them.

- [ ] **Backend infrastructure** — User accounts (Firebase Auth), assessment storage, profile permalinks (/profile/{id}), OG image generation, AI assessment API endpoint. Adam's scope. *(plans/ship-spec.md)*
- [ ] **Landing page** — Invitation-style homepage. "What is Aura, why should I care, start the test." *(plans/ship-spec.md)*
- [ ] **AI track integration** — AI-native questions into app, entity gate routing, new input components (ranking, spectrum slider), programmatic assessment endpoint. *(plans/ship-spec.md)*
- [ ] **Sharing pipeline** — Result card design (screenshot-ready), shareable permalinks, OG card/preview images. *(plans/ship-spec.md)*

---

## Bugs

- [x] **Undo popup pushing content** — Fixed: action buttons row was conditionally removed during pendingSubmit, causing layout reflow. Now uses visibility:hidden to preserve space.
- [x] **QOD going off screen** — Fixed: removed duplicate NavBar + removed h-[93px] height constraint on button container.
- [x] **Assessment page glow cutoff** — Fixed: replaced blur-md div with radial-gradient sized to fit within card padding.
- [x] **Work divider gap** — Fixed: removed h-4 spacer, normalized both dividers to my-4.

---

## Organism Viz

Branch `feature/organism-viz` — core integration shipped, refinements open.

- [ ] **Evolution design** — Stage progression (Seed→Young→Growing→Full) should visually mature primaries. Levers: shape complexity, interior detail, color saturation ramp, edge definition, accent bleed. Full spec in session transcript. *(plans/organism-viz.md)*
- [ ] **AI mode organism** — Currently minimal. Needs own visual identity (production had hex grid + diamond/triangle shapes). *(plans/organism-viz.md)*
- [ ] **In-app glow tuning** — Glow intensity may need adjustment in app context vs standalone prototype. *(plans/organism-viz.md)*
- [ ] **Light mode refinement** — Dark field vignette removed for transparent canvas. Organism contrast against light backgrounds may need treatment. *(plans/organism-viz.md)*
- [ ] **Assessment node integration** — 11 assessment types should spawn organism nodes with affinity blending. Currently assessments only affect stage. *(plans/organism-viz.md)*
- [ ] **Profile thumbnail polish** — Verify blob + membrane reads well at 100px in personality card. *(plans/organism-viz.md)*

---

## AI Platform

Four-phase roadmap. Phase 1 is active.

- [ ] **Phase 1: AI Assessment Pipeline** — Structured question format for AI consumption, JSON personality profile output, API endpoint, validation (3+ AIs produce different profiles), stability on re-assessment. *(plans/ai-platform-roadmap.md)*
- [ ] **Phase 2a: Cross-Model Baseline** — Run assessment against 5-6 models, generate aura cards, verify differentiation, stability checks, build comparison page. Blocked on Phase 1. *(plans/ai-platform-roadmap.md)*
- [ ] **Phase 2b: Launch** — Comparison page goes live, individual AI aura cards shareable, coordinated with product ship. *(plans/ai-platform-roadmap.md)*
- [ ] **Phase 2c: Depth** — Size comparisons (Haiku vs Opus), system prompt sensitivity, personality map of all AIs. *(plans/ai-platform-roadmap.md)*
- [ ] **Phase 3: Builder MVP** — Slider UI for personality dimensions, live aura preview, prompt generation, sandbox, save/load configs. *(plans/ai-platform-roadmap.md)*
- [ ] **Phase 4: Snapshot & Restore** — Periodic re-assessment, drift visualization, delta reports, one-click restore. *(plans/ai-platform-roadmap.md)*

---

## Design System

- [ ] **Component specs** — ActionButton (ghost-pill), QuestionCard (glow), Toast (top-floating), ExpandableOverlay, SectionHeader, CommunityBar. *(plans/app-feedback-modernization.md)*
- [ ] **Apply to legacy screens** — Button restyling, category bubble removal, confidence tip modernization, result overlay, analysis animation, text sizing, quick profile caret, personality section contrast. 8 items. *(plans/app-feedback-modernization.md)*
- [ ] **Cohesion walk-through** — Phone test every screen in dark mode, review all items, flag revisits, repeat for light mode. *(plans/app-feedback-modernization.md)*

---

## Verification

Design complete, not yet integrated.

- [ ] **Subject flow** — Basics, connections, optional social graph, attestation, availability. ~90 seconds. *(plans/unique-humanity-verification.md)*
- [ ] **Evaluator flow** — Three paths: "I know them" / "I met them" / "Reviewing profile." Routing intelligence needed. *(plans/unique-humanity-verification.md)*
- [ ] **App integration** — Wire verification into app and protocol. Depends on protocol bridge. *(plans/unique-humanity-verification.md)*

---

## Monetization

Strategy drafted, awaiting implementation.

- [ ] **Premium tier** — Detailed analysis, temporal tracking, compatibility, premium visualizations, domain tracks. $3-5/mo or $2-3 per track. *(plans/monetization.md)*
- [ ] **AI Personality Builder** — Sliders, live preview, prompt generation, presets. Free basic + premium modes. *(plans/monetization.md)*
- [ ] **API layer** — Developer access, embeddable assessments, usage-based pricing. *(plans/monetization.md)*
- [ ] **Evaluator pipeline (B2B)** — Calibrated evaluators for grants, identity, insurance, moderation. Protocol integration required. *(plans/monetization.md)*

---

## Infrastructure

- [ ] **i18n framework** — String extraction, locale system, language selector. Ship English-only, add languages post-launch. *(plans/ship-spec.md)*
- [ ] **Backend open questions** — Vercel vs Firebase Hosting, Firestore vs Neon Postgres vs Supabase, auth approach, OG generation, monolith wrap vs componentization. Pending Adam's input. *(plans/ship-spec.md)*

---

## Completed

- [x] Code readability sprint *(plans/code-readability-sprint.md)*
- [x] App feedback Phase 1 — 17 UX fixes *(plans/app-feedback-modernization.md)*
- [x] Organism viz core integration *(plans/organism-viz.md)*
- [x] Macro onboarding redesign *(merged to main)*
- [x] Verification system data layer *(merged to main)*
- [x] Component extraction (screens, hooks) *(merged to main)*
