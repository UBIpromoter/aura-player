# Design Direction

Living backlog from Dev Q&A. Items added when Philip answers. Removed when merged + shipped.

---

## Open

### Welcome
- [ ] **Mini bloom animation ~20% of screen** — aura viz replaces current logo. Medium-sized animated bloom that settles. Not icon-tiny, not dominant — fills roughly 20% of the welcome screen
  > "Mini bloom animation" · "Medium — fills ~20%"

### Profile
- [ ] **Stats lead, viz replaces guest image** — level bar + top trait up top. Viz takes over guest image slot. Move level/XP elsewhere to simplify the whole top section
  > "Stats lead" · "Mix — level bar + top trait" · "Viz should take over the profile guest image, incorporate level and XP elsewhere so we can simplify the whole top"

### Path Choice
- [ ] **Fork is right, visuals need work** — two-button fork is correct but looks bland. Try different framing and copy
- [ ] **Aura glow scales to node count** — tiny starting aura glows way too much. Glow should be proportional to how many nodes exist. Few nodes = dim. Big constellation = big glow
  > "Fork is good but not interesting looking" · "A little aura doesn't glow a lot. Only a big aura glows a lot." · "Scale to node count"

### Assess Picker
- [x] **Light mode low contrast** — MERGED: solid white cards, stronger borders (0.10 vs 0.06), hero card solid bg
- [ ] **Smart category ordering** — hero card + full list should be ordered by what's best for the user, not hardcoded. Three factors: what they'd enjoy, what's ideal for their journey, what gives us the most useful data to provide good insights back. Everything stays visible and tappable — ordering is recommendation, not restriction. Gates stay for hard dependencies (tier system). Recommended static order as starting point: Quick Profile → Starter Pack → Personality → Relationships → Character → Behavior → Mind → Shadow Self. Arc: light → personal → deep → provocative. Shadow Self last because it lands better when we already know them well.
  > "We should have that top card and the whole ordered list be based on what we think would be ideal for the user, what they would enjoy, and what we would find most useful to know from them to be able to provide good information back."
  > "That person that wants to jump right down to Shadow Self is welcome to. It's just at the bottom of the list."
  > Architecture note: categories may eventually have sub-assessments with intra-category dependencies (e.g. reasoning level 2 requires level 1). Not building now, but logic should accommodate it.

### Verify
- [ ] **Polish now, balanced** — invest in polish alongside core features, not after
  > "Polish verify now" · "Keep balanced"
- [x] **URGENT: Remove gold shimmer ring on multi-choice answers** — DONE: removed ring-2, ring-offset, ring-{color}-400 from assess answer buttons. Selected answers show filled bg + border only.
- [x] **Undo toast: move from top-of-screen to answer row** — DONE: moved to overlay answer button area. Assess screen toast moved to bottom. Awaiting Philip review.
- [ ] **Responsive: buttons dinky on large mobile, cramped on small** — assessment screens look good on desktop but buttons are undersized on large phones with too much whitespace. Small screens need to fit satisfyingly. Sizing/spacing/touch-target sweep needed
  > "When I looked on my mobile, suddenly all the buttons look dinky on the screen with tons of space. And on the flip side, if someone's got a small screen, we need to make sure it fits."
- [ ] **DESIGN DECISION: Instant submit vs confirm on multi-select** — single-answer auto-progresses (good). Multi-select requires continue button (breaks flow). Proposal: "pick N" with auto-advance on Nth tap + "none of these" single-tap escape. Needs design decision before building
  > "When there's a single answer, they click it and it auto-progresses. But if we're having them click multiple things, they have to click a continue button. That flow is not great. Maybe we could change it so on some screens you pick two, but it's instant submit. If we were offering two, you also need 'none of these.'"

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
