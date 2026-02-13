# Design Direction

Living backlog from Dev Q&A. Items added when Philip answers. Removed when merged + shipped.

---

## Open

### Path Choice
- [ ] **Fork is right, better copy/framing** — two-button fork is correct but looks bland. Direction: better copy and framing, not visual drama or effects. Try different metaphors in the text. **Deprioritized** — leave for now
  > "Fork is good but not interesting looking" · "Better copy/framing" · "Leave for now"

### Verify
- [ ] **Verdict question language refinement** — current: "One real person, one account here?" Works for now but revisit. Core concept: confirm this is a real human's one legitimate account in the system. Consider per-path variations (vouch vs investigate vs analyze). See brainstorm options 6, 7, 10, 11, 15 from session.
  > "I want them to confirm that they think this is a human's one unique appropriate account to be using in the system"

### Settings
- [ ] **UX audit later** — looks fine, but ensure right order, right items, easy to use. Revisit when more features land
  > "Fine for now" · "Make sure it's all in the right order and the right things are there and it's easy to use"

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

- **Intelligence Layer 3** — glow scaling (depthGlow), viz avatar on profile, celebration glow fix (radial gradient), picker icon glow fix (`85440e2`)
- **Intelligence Layer 2** — insight gating, profile depth, dynamic category reordering (`2348b7b`)
- **Stats lead, viz replaces guest image** — AuraVisualization replaces letter initial, top trait label, level/XP inline
- **Aura glow scales to node count** — depthGlow factor: 0=seed, 1-2=dim, 3-5=moderate, 6+=full
- **Celebration glow clipping** — radial gradient replaces blur-3xl. Root cause: DESIGN.md Constraints section
- **Profile icon glow clipping** — tightened boxShadow to fit header bounds
- **Continue to next test** — 2 recommended next assessments after completion
- **Multi-select resolution** — radio buttons for distinct visual
- **Responsive buttons** — responsive pass across assessment screens (`bce0c59`)
- **Verify quality sweep** — flow overhaul: toggles, softened copy, verdict screen (`22a6423`)
- **Undo toast** — moved to answer row overlay
- **Gold shimmer ring removed** — selected answers show filled bg + border only
- **Smart category ordering** — static order + dynamic reordering (in-progress floats, hero prefers active)
- **Light mode contrast** — solid white cards, stronger borders, hero bg
- **Welcome bloom animation** — mature organism, bloom-in + breathing (`6487fce`)
- **MC Questions — gray default** — shipped
- **Categories — 2-across grid** — shipped
- **Binary glow — center of question** — shipped
- **QotD — banner cleanup** — shipped
- **Settings — collapsible keyboard shortcuts** — shipped
