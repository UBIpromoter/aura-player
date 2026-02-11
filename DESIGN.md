# Design Direction

Living backlog from Dev Q&A. Items added when Philip answers. Removed when merged + shipped.

---

## Open

### Welcome
- [ ] **Bloom: breathing, above tagline, ~20%** — aura viz replaces logo. Positioned above the tagline in the logo area. Medium-sized (~20% of screen). Continuously alive with subtle breathing — **calm resting pace, 2-3 sec cycle**. Animated bloom on load, then stays gently alive.
  > "Mini bloom animation" · "Medium — fills ~20%" · "Breathing (alive)" · "Above tagline" · "Calm resting (2-3s)"

### Profile
- [ ] **Stats lead, viz replaces guest image** — level bar + top trait up top. Viz takes over guest image slot at **current guest image size**, **contained circle with glow bleeding out** (not fully unbounded, but glow escapes the boundary). Trait label medium prominence — clear but not showy. Move level/XP elsewhere to simplify the whole top section
  > "Stats lead" · "Mix — level bar + top trait" · "Viz should take over the profile guest image, incorporate level and XP elsewhere so we can simplify the whole top"
  > "Contained but with glow bleeding out" · "Medium — clear but not showy" · "Current guest image size"

### Path Choice
- [ ] **Fork is right, better copy/framing** — two-button fork is correct but looks bland. Direction: better copy and framing, not visual drama or effects. Try different metaphors in the text. **Deprioritized** — leave for now
  > "Fork is good but not interesting looking" · "Better copy/framing" · "Leave for now"
- [ ] **Aura glow scales to node count** — tiny starting aura glows way too much. Glow proportional to node count. Few nodes = dim. Big constellation = big glow. Brand new user gets a **tiny seed glow** (promise of growth) — not completely dark, not bright
  > "A little aura doesn't glow a lot. Only a big aura glows a lot." · "Scale to node count" · "Tiny seed glow (promise of growth)"

### Assess Picker
- [x] **Light mode low contrast** — MERGED: solid white cards, stronger borders (0.10 vs 0.06), hero card solid bg
- [ ] **Smart category ordering** — hero card + full list ordered by what's best for the user. Three factors: enjoyment, journey-ideal, data-useful. Everything stays visible and tappable — ordering is recommendation, not restriction. Gates stay for hard dependencies (tier system). **Approved static order:** Quick Profile → Starter Pack → Personality → Relationships → Character → Behavior → Mind → Shadow Self. Arc: light → personal → deep → provocative
  > "We should have that top card and the whole ordered list be based on what we think would be ideal for the user"
  > "That person that wants to jump right down to Shadow Self is welcome to. It's just at the bottom of the list."
  > Architecture note: categories may eventually have sub-assessments with intra-category dependencies. Not building now, but logic should accommodate it.

### Assessment Flow
- [ ] **Continue to next test after completion** — when user finishes a test and sees results, **offer 2 recommended next assessments** instead of just "Done". Smooth flow into the next assessment with choice
  > "We should probably offer them the chance to continue right on to the next test." · "Offer 2"
- [ ] **DECIDED: Multi-select → sequential yes/no** — replace all multi-select questions with sequential single-trait screens. One trait per screen, one tap, auto-advance. Identical rhythm to single-answer questions. Three response options: **Yes / No / Not Sure**. "Not Sure" captures uncertainty vs. negative signal — critical for verification data quality. Panel-reviewed 4/4 models, strong consensus. Implementation: progress indicator ("3 of 5"), smooth transitions (trait label stays, options refresh), consider swipe gestures (Yes right, No left). One interaction pattern across both self-assessment and verification
  > "We either need to have all the questions be instant submittal, or almost all of them." · Panel consensus: sequential yes/no wins on cognitive load, flow consistency, data quality, and fatigue. "Not Sure" is the killer feature for verification.
- [ ] **Responsive: fix now — buttons dinky on phones** — assessment screens look good on desktop but buttons undersized on large phones with too much whitespace. Small screens cramped. **Priority: fix now**, blocks showing Aura on phones. Target: **full range** (small Android to large iPhone)
  > "Fix now — it looks bad on phones" · "Full range (small Android to large iPhone)"

### Verify
- [ ] **General quality sweep** — invest in polish alongside core features. No specific items flagged — general quality pass across verify screens
  > "Polish verify now" · "Keep balanced" · "General quality sweep"
- [x] **URGENT: Remove gold shimmer ring on multi-choice answers** — DONE: removed ring-2, ring-offset, ring-{color}-400 from assess answer buttons. Selected answers show filled bg + border only.
- [x] **Undo toast: move from top-of-screen to answer row** — DONE: moved to overlay answer button area. Assess screen toast moved to bottom. Awaiting Philip review.

### Settings
- [ ] **UX audit later** — looks fine, but ensure right order, right items, easy to use. Revisit when more features land
  > "Fine for now" · "Make sure it's all in the right order and the right things are there and it's easy to use"

### Closed (no action needed)
- ~~Ghost buttons~~ — discoverable enough as-is

---

## Done
_Moved here on merge. Cleaned out periodically._

- **MC Questions — gray default** — already shipped in production (useState('gray'), inline toggle exists)
- **Assess Picker — light mode contrast** — solid white cards, border-black/[0.10], hero bg-white
- **Categories — 2-across grid** — merged to production (grid-cols-2, centered icon+text, all sections)
- **Binary glow — center of question** — merged to production (removed marginTop: -5% offset)
- **QotD — banner cleanup** — merged to production (removed day, slimmed timer to "Xh left", removed +25)
- **Settings — collapsible keyboard shortcuts** — merged to production (click-to-expand)
- **Welcome — bloom animation** — noodled (v2 noodle), iterating
