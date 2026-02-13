# Design Direction

Living backlog from Dev Q&A. Items added when Philip answers. Removed when merged + shipped.

---

## Open

### Profile
- [x] **Stats lead, viz replaces guest image** — SHIPPED: AuraVisualization replaces letter initial (64px, overflow:visible for glow bleed). Top trait label below name (archetype name or "High Openness" etc). Level/XP already inline from prior cleanup.

### Path Choice
- [ ] **Fork is right, better copy/framing** — two-button fork is correct but looks bland. Direction: better copy and framing, not visual drama or effects. Try different metaphors in the text. **Deprioritized** — leave for now
  > "Fork is good but not interesting looking" · "Better copy/framing" · "Leave for now"
- [x] **Aura glow scales to node count** — SHIPPED: `depthGlow` factor in AuraVisualization. 0 nodes = 0.08 (seed), 1-2 = dim, 3-5 = moderate, 6+ = full. Affects glowRadius and glowIntensity.

### Assess Picker
- [x] **Light mode low contrast** — MERGED: solid white cards, stronger borders (0.10 vs 0.06), hero card solid bg
- [x] **Smart category ordering** — SHIPPED: static order + Layer 2 dynamic reordering. In-progress categories float to top. Hero card prefers what you already started. Everything stays visible and tappable. Insight gating (2+ categories for Analysis).
  > Architecture note: categories may eventually have sub-assessments with intra-category dependencies. Not building now, but logic should accommodate it.

### Assessment Flow
- [x] **Continue to next test after completion** — SHIPPED: 2 recommended next assessments after completing a category. Primary = full gradient CTA button, secondary = soft color-wash card. "What's next" header. ResultCard header dimmed so CTAs win visual hierarchy. Shadow Self slate color boosted to purple-slate for visibility.
  > "We should probably offer them the chance to continue right on to the next test." · "Offer 2"
- [x] **Celebration glow clipping** — FIXED: replaced `blur-3xl` div (584px visual footprint on 393px screen) with 320px radial gradient. Same `celebrate-glow` entrance animation, no pixels outside the box to clip. Root cause documented in Constraints below.
- [x] **Multi-select resolution** — SHIPPED: Sequential yes/no tested and rejected (tedious, broke flow — "are they a family member? are they a neighbor?" felt annoying). Solution: eliminated multi-select where possible, remaining multi-answer questions use radio buttons for distinct visual difference. Radio buttons make it obvious this is a different interaction type. Sticking with this.
  > "Sequential yes/no really didn't work. It was annoying. Radio buttons have a distinct visual difference in the flow. It's more obvious to the user."
- [x] **Responsive: fix now — buttons dinky on phones** — SHIPPED: responsive pass across assessment screens (`bce0c59`). Touch targets, spacing, scrollbar cleanup.

### Verify
- [x] **General quality sweep** — SHIPPED: verify flow overhaul (`22a6423`). Toggle switches, aggressive single-select conversion, softened copy, two-line button layout, combined verdict screen, dev shortcuts.
- [x] **URGENT: Remove gold shimmer ring on multi-choice answers** — DONE: removed ring-2, ring-offset, ring-{color}-400 from assess answer buttons. Selected answers show filled bg + border only.
- [x] **Undo toast: move from top-of-screen to answer row** — DONE: moved to overlay answer button area. Assess screen toast moved to bottom. Awaiting Philip review.

### Verify
- [ ] **Verdict question language refinement** — current: "One real person, one account here?" Works for now but revisit. Core concept: confirm this is a real human's one legitimate account in the system. Consider per-path variations (vouch vs investigate vs analyze). See brainstorm options 6, 7, 10, 11, 15 from session.
  > "I want them to confirm that they think this is a human's one unique appropriate account to be using in the system"

### Settings
- [ ] **UX audit later** — looks fine, but ensure right order, right items, easy to use. Revisit when more features land
  > "Fine for now" · "Make sure it's all in the right order and the right things are there and it's easy to use"

### Assess Picker
- [x] **Profile icon glow clipping** — FIXED: tightened boxShadow from 26px to 18px extent. Fits within header padding now. See Constraints below for root cause.

### Closed (no action needed)
- ~~Ghost buttons~~ — discoverable enough as-is

---

## Constraints

Hard-won rules. Check these before designing visual effects.

### No CSS effects that paint outside the box near overflow-hidden
Every screen root has `overflow-hidden` (for scroll containment and phone-frame corner rounding). CSS `filter: blur()`, large `box-shadow`, and `transform: scale()` all render pixels beyond the element's layout box. Those pixels get hard-clipped — straight vertical/horizontal cut lines.

**Safe alternatives:**
- `radial-gradient` or `linear-gradient` backgrounds — painted within the box, can't clip
- SVG `<radialGradient>` fills — contained within the SVG viewport
- Small `box-shadow` that fits within parent padding (keep spread+blur < available margin)
- `background-image` with gradient — same as above, stays in-box

**Unsafe (will clip near edges):**
- `filter: blur()` on any element — visual footprint = element size + ~3x blur radius per side
- Large `box-shadow` spread near container edges
- `transform: scale() > 1` on elements near edges

**Rule of thumb:** if the effect needs to extend past the element's box to look right, it will clip. Redesign the effect to stay within bounds.

---

## Done
_Moved here on merge. Cleaned out periodically._

- **MC Questions — gray default** — already shipped in production (useState('gray'), inline toggle exists)
- **Assess Picker — light mode contrast** — solid white cards, border-black/[0.10], hero bg-white
- **Categories — 2-across grid** — merged to production (grid-cols-2, centered icon+text, all sections)
- **Binary glow — center of question** — merged to production (removed marginTop: -5% offset)
- **QotD — banner cleanup** — merged to production (removed day, slimmed timer to "Xh left", removed +25)
- **Settings — collapsible keyboard shortcuts** — merged to production (click-to-expand)
- **Welcome — bloom animation** — shipped: mature organism replaces emoji, bloom-in + breathing (`6487fce`)
- **Smart category ordering** — static order + Layer 2 dynamic reordering (in-progress floats, hero prefers active, insight gating)
- **Responsive buttons** — responsive pass across assessment screens (`bce0c59`)
- **Verify quality sweep** — flow overhaul: toggles, softened copy, verdict screen, dev shortcuts (`22a6423`)
