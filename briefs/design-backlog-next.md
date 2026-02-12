# Brief: Design Backlog — Next Builder Session

**Branch:** `feature/responsive-pass` at `f77d55b`
**Source of truth:** `DESIGN.md` (read it first, always)

---

## Priority 1: Responsive Button Sizing

**Impact: High — real users on mobile see this immediately.**

Assessment and verify screens look good on desktop but break at phone sizes. Large phones: buttons dinky with too much whitespace. Small phones: need to fit without cramping.

**What to do:**
- Audit all assessment screen types (binary, multi-choice, verify) at 375px, 430px, 768px+
- Button sizing, touch targets (min 44px), spacing, container max-widths
- Buttons should fill available width confidently — not float small in empty space
- The app already has `resp-h-lg`, `resp-max-w`, `resp-gap` utility classes (grep for them) — use and extend as needed
- Test both dark and light mode at each breakpoint

**Scope:** Assessment/verify question screens, answer options, action buttons. Don't change submit logic or dark/light styling. Don't touch assess picker or category screens (those were just redone).

**Philip's words:** "When I looked on my mobile, suddenly all the buttons look dinky on the screen with tons of space. And on the flip side, if someone's got a small screen, we need to make sure it fits."

---

## Priority 2: Path Choice — Glow Scales to Node Count

**Impact: Medium — visual integrity. New users see this on their first fork.**

The `AuraVisualization` canvas on the path choice screen glows the same intensity whether the user has 3 nodes or 30. A tiny new aura shouldn't radiate like a mature constellation.

**What to do:**
- In `PathChoiceScreen` (line ~5360), the `AuraVisualization` component renders at `size={240}`
- The glow intensity in the viz component needs to scale with node count — few nodes = dim, many nodes = bright
- Check the `AuraVisualization` component (line ~1468) for where glow/alpha is computed. Look for `BOOSTED` tier references and `haloScale`
- The viz already has tier-based glow (New/Regular/Power) — the fix may be as simple as ensuring a fresh user with minimal onboarding answers gets the dimmest tier
- Don't change the viz for other screens (profile, analysis) — only path choice context

**Philip's words:** "A little aura doesn't glow a lot. Only a big aura glows a lot." · "Scale to node count"

---

## Priority 3: Path Choice — Fork Visual Polish

**Impact: Low-medium — functional but bland.**

The two-button fork ("Reveal yourself" / "Explore the world") works correctly and has the right copy, but could look more interesting. The buttons were updated with emoji in `f77d55b` but the overall screen still feels plain.

**What to do:**
- Noodle first (`noodle/design/path-choice-polish/`). Try different visual treatments — maybe asymmetric sizing, illustration/icon work, card-style layout, or more dramatic gradient treatment
- The top section (viz + heading) is approved as-is — only touch the button area
- Show before/after

**Philip's words:** "Fork is good but not interesting looking"

---

## NOT for this session

| Item | Reason |
|------|--------|
| Profile viz | Philip deferred — "don't want to deal with 2 right now" |
| Multi-select instant submit | Needs Philip's design decision first — can't build without his call |
| Settings UX audit | Philip said "later" — waiting for more features to land |
| Welcome bloom | Was iterating but not converging — park until Philip brings it back |
| Assess ordering | Already shipped in `f77d55b` |

---

## Key files

| File | What |
|------|------|
| `index.html` | Production app (~12K lines, single-file React) |
| `DESIGN.md` | Living design backlog — check open items |
| `TOKENS.md` | Color/gradient tokens — check before visual work |
| `LESSONS.md` | Past mistakes — check when something feels familiar |
| `noodle/design/design-backlog-v2/` | Previous noodles for reference |
| `noodle/design/design-backlog-v4/` | Most recent noodles |

## Rules

- Read `CLAUDE.md` at project root + global `~/.claude/CLAUDE.md`
- Noodle before merging visual changes — Philip approves before production
- Check both dark and light mode
- `TH()` helper (line ~1412) maps tokens to dark/light Tailwind classes
- `COLOR_HEX` objects have `.rgb`, `.base`, `.light` properties
