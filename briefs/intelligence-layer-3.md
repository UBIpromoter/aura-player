# Brief: Intelligence Layer 3 — Profile Evolution + Visual Polish

**Priority: High — next build**

## What Shipped (Layer 2)

All four Layer 2 items are live:
- `getCategoryStatus()` helper — pure function, extracts inline logic
- Dynamic category reordering — in-progress floats to top, hero prefers active
- Insight gating — 2+ categories required for full analysis
- Profile Depth bar — inline in user card (merged during profile cleanup)

## What to Build

### 1. Aura Glow Scales to Node Count

**Source:** DESIGN.md — Philip's exact words: "A little aura doesn't glow a lot. Only a big aura glows a lot. Scale to node count. Tiny seed glow (promise of growth)."

The `AuraVisualization` component currently renders the same glow intensity regardless of how many assessments are completed. Fix:

- Count completed assessment nodes (each test = 1 node)
- **0 nodes:** no glow, just the seed shape
- **1-2 nodes:** tiny seed glow — dim, tight radius, promise of growth
- **3-5 nodes:** moderate glow, medium radius
- **6+ nodes:** full glow, wide radius, the aura "breathes"
- Glow parameters: `blur`, `opacity`, `spread` all scale with node count
- Affects: profile avatar, path choice screen, analysis dashboard, anywhere AuraVisualization renders

**Key files:**
- `AuraVisualization` component (search for `const AuraVisualization`)
- Profile screen avatar `getAuraStyle()` (~line 9414)

### 2. Stats-Lead Profile with Viz Avatar

**Source:** DESIGN.md — "Stats lead. Viz replaces guest image. Level bar + top trait up top. Viz takes over the profile guest image slot at current guest image size. Contained circle with glow bleeding out."

The profile user card currently has a gradient circle with a letter initial. Replace it:

- **Avatar slot** (`w-16 h-16` circle) becomes a mini `AuraVisualization` — contained within the circle boundary, but glow bleeds out past the edge
- If no assessments completed: keep the letter initial with a seed glow ring
- If assessments exist: render the actual aura viz at 64px, `overflow: visible` so glow escapes
- **Top trait label** below the name — e.g. "High Openness" or archetype primary trait. Medium prominence, `text-xs`, color-matched to the trait's assessment color
- **Level/XP** already moved to the inline stat line (done in profile cleanup)

**Key files:**
- ProfileScreen user card section (~line 9462)
- `AuraVisualization` component
- `calculateArchetype()` for trait data

### 3. Celebration Glow Clipping Fix

**Source:** DESIGN.md — "The glow is being cut off on the two sides. It has like straight vertical cutoff lines."

The completion celebration animation uses `blur-3xl` which gets hard-clipped by ancestor `overflow-hidden` on the scroll container. Options:

- **Option A:** Render celebration overlay outside the overflow chain using a portal or absolute positioning on the screen root (above the scroll container)
- **Option B:** Replace CSS blur glow with an SVG radial gradient or box-shadow approach that doesn't need overflow:visible
- **Option C:** Temporarily remove `overflow-hidden` from ancestors during celebration (add back after animation)

Recommend Option A — cleanest separation.

**Key files:**
- Completion celebration render (search for `celebrate-glow`, `celebrate-pulse`)
- AssessQuestionScreen scroll container with `overflow-hidden`
- Dev panel "Celeb" button toggles celebration for testing

## What NOT to Build

- No trait scoring engine — existing archetype system handles this
- No new screens — modifies existing profile + assessment flow
- No backend changes — all client-side
- No changes to assessment data or question flow
- No changes to stamp/sharing system (just shipped)

## Build Order

1. **Aura glow scaling** — standalone, affects one component, testable immediately
2. **Celebration clipping fix** — standalone, dev panel has test button
3. **Viz avatar on profile** — depends on glow scaling being right first

## Verification

- Check glow at 0, 1, 3, 6+ completed assessments
- Dark + light mode for all changes
- Profile screen: avatar glow shouldn't clip or overflow into adjacent elements awkwardly
- Celebration: glow should be smooth and circular, no hard edges
- Path choice screen: aura should reflect actual progress

## Reference

- `DESIGN.md` — open items with Philip's exact quotes
- `TOKENS.md` — check before any color work
