# Brief: What's Next — Post Intelligence Layers

## Where We Are

The single-player experience is functionally complete:
- 7 assessment categories, smart ordering, insight gating, post-completion flow
- Profile with archetype, spectrum bars, aura visualization that scales with depth
- Supabase auth + persistence + response capture
- Stamps, sharing, public profiles
- AI entity track (gating, N/A option, context notes, AI insights)
- All 17 Phase 1 feedback items shipped
- Code readability sprint done (Adam/Ali ready)
- DESIGN.md backlog nearly empty

**The app works.** The question is what makes it ship-ready vs. what it is now.

---

## Option A: Design System Legos (Phase 2 Modernization)

**What:** Define the visual component language from `plans/app-feedback-modernization.md` Phase 2. ActionButton, QuestionCard, Toast, ExpandableOverlay, SectionHeader, CommunityBar. Then apply across legacy screens (items 18-25).

**Why now:** With Adam/Ali joining, consistent components = faster collaboration. The current UI works but was built iteratively — some screens are polished (assessment flow, onboarding), others are functional but not cohesive (analysis dashboard, settings).

**Effort:** Medium-large. Macro design review first, then spec + build.

**Risk:** Could become a rabbit hole if scope isn't tight. The app already works — this is polish, not function.

---

## Option B: Shareable Result Card

**What:** The viral loop artifact from `plans/ship-spec.md`. A beautiful, screenshot-ready card showing your aura + key traits. Powers OG previews when links are shared. The thing someone posts to Instagram or texts to a friend.

**Why now:** Sharing exists (SharePicker, public profiles) but there's no visual artifact worth sharing. A link to a profile page isn't compelling. A gorgeous aura card is.

**Effort:** Medium. Design the card, render to canvas/SVG, generate OG meta.

**Risk:** OG image generation needs server-side rendering (Vercel function or similar) — may depend on Adam's infra.

---

## Option C: Cohesion Walk-Through (Phase 3)

**What:** Phone in hand, dark mode, walk every screen end-to-end. Flag anything that feels off. Then light mode. From `plans/app-feedback-modernization.md` Phase 3.

**Why now:** Lots of features have been added since the last full walkthrough. Things may have drifted visually or functionally. Catches bugs and inconsistencies before others see the app.

**Effort:** Small-medium. Mostly review + targeted fixes.

**Risk:** Low. This is quality assurance, not new development.

---

## Option D: Landing Page

**What:** The first thing someone sees. Not marketing — an invitation. "This is Aura. Discover yourself." Start button → entity gate → assessment.

**Why now:** Ship-blocking. Can't share the app without a front door.

**Effort:** Medium. Design + build. Needs to feel premium, not template-y.

**Risk:** Design-intensive. Could take multiple iterations to get right.

---

## Recommendation

**C then B.** Walk the app first — catch anything that drifted. Then build the result card — it's the highest-leverage shipping feature (gives people a reason to share). Landing page and design system Legos can follow, and Adam's infra decisions may clarify by then.

But Philip decides direction.
