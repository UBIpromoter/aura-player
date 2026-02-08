# Profile Redesign Consolidation Plan

## The Goal

Bring together all approved work from today's session and previous noodles into a cohesive profile experience.

---

## Inventory of Approved Work

### 1. Aura Visualization (TODAY - INTEGRATED)
**Source:** `noodle/2026-02-03-profile-redesign-v2/flow-demo.html`
**Status:** Integrated into production (needs sizing adjustment)

- Organic SVG blur glow (feGaussianBlur)
- Animated neurons with dynamic line following
- Stage-based progression (1-4)
- Dark + light mode support
- Uses production COLOR_HEX tokens

### 2. Archetypes System (INTEGRATED 2026-02-04)
**Source:** `noodle/2026-02-03-unified-profile/`
**Status:** ✅ Integrated into production

- 29 archetypes with patterns, descriptions, tips
- `calculateArchetype()` with weighted 70% threshold
- Archetype header on Analysis screen (name + tagline)
- Strengths/Watch-outs/Tips section on Analysis screen
- `generateInsights()` function for cross-pattern insights

### 3. Teaser/Profile Layout (TODAY - DEMO ONLY)
**Source:** `noodle/2026-02-03-profile-redesign-v2/flow-demo.html`
**Status:** Demo approved, not integrated

- HintCard component (color dot + text)
- Progressive hint reveal by stage
- Clean CTA button (slightly softer violet)
- Compact layout

### 4. Trait Spectrum Visualizations (UPGRADED)
**Source:** `noodle/2026-02-03-profile-redesign-v2/sliders.html` → Production
**Status:** Done (2026-02-04)

- Upgraded from thin rectangle marker to glowing circle dot
- Two modes: `compact={true}` (inline) and full (labels above)
- Thicker bar (h-3), 16px dot with glow
- Applied to:
  - TraitSpectrum component (results screens)
  - SpectrumBar component (analysis screen)
  - Expanded module view in assess-picker (new gradient progress bars)

### 5. Community Chart Highlighting (SHIPPED)
**Source:** Already in production
**Status:** Done

- Pill outline for user's answer
- Checkmark in confidence segment

---

## What Needs to Happen

### Phase 1: Aura Sizing Fix (QUICK)
- [x] Reduce aura container padding
- [x] Shrink visualization sizes (180-240 → 140-170)
- [x] Remove "Your unique pattern" text

### Phase 2: Archetype Integration ✅ DONE
Port from `unified-profile/archetypes.js`:
- [x] Add ARCHETYPES object to production (29 archetypes)
- [x] Add `calculateArchetype()` function (70% threshold matching)
- [x] Add `generateInsights()` function (cross-pattern insights)
- [x] Show archetype name below aura (header card with tagline)

### Phase 3: Profile Teaser Upgrade ✅ DONE
Replace current teaser with:
- [x] HintCard component added to production
- [x] Trait hints section on Analysis screen (derived from Quick Profile / Big Five / assessments)
- [x] Aura visualization (already integrated)
- [x] Progressive reveal tied to assessment progress (shows more hints as more assessments complete)

### Phase 4: Full Profile View ✅ DONE
Upgrade Analysis screen with:
- [x] Archetype header (name + tagline + secondary archetypes)
- [x] Strengths/Watch-outs/Tips section
- [x] Cross-pattern insights (existing getInsights + new generateInsights)
- [x] Keep existing trait spectrums
- [x] Keep existing assessment result cards

### Phase 5: Pattern Cleanup ✅ DONE
- [x] Audit: HintCard is distinct (colored dot + text), Insights are icon-based (emoji + text) - both kept
- [x] All colors from COLOR_HEX (violet, emerald, pink, cyan, amber, teal, indigo)
- [x] Components use inline dark/light mode checks (consistent with codebase pattern)
- [ ] Final test of dark + light modes (manual)

---

## Files to Touch

| File | Action |
|------|--------|
| `index.html` | Add archetypes, upgrade profile/analysis screens |
| `noodle/.../archetypes.js` | Source for archetype data (copy in) |
| `noodle/.../flow-demo.html` | Reference for teaser layout |
| `LESSONS.md` | Document final patterns chosen |

---

## Key Decisions Made

1. **Where does archetype name appear?**
   - ✅ Decision: Option B - Below aura in a colored header card with tagline

2. **Do we keep both screens?**
   - Current: `profile` (stats) + `assess-analysis` (personality)
   - Alternative: Merge into unified view?
   - → TBD

3. **HintCard vs InsightRow?**
   - Keep both (different purposes)
   - Merge into one pattern
   - → TBD

---

## Order of Operations

1. ~~Fix aura sizing~~ DONE
2. ~~Add archetypes + calculation to production~~ DONE (2026-02-04)
3. ~~Wire archetype display to analysis screen~~ DONE (2026-02-04)
4. ~~Upgrade teaser with HintCards~~ DONE (2026-02-04)
5. ~~Add archetype insights to profile~~ DONE (2026-02-04)
6. ~~Pattern audit + cleanup~~ DONE (2026-02-04)
7. Test both modes (manual)
8. Ship

---

## Reference Files

| What | File |
|------|------|
| Aura animation | `flow-demo.html` |
| Aura with themes | `aura-themed.html` |
| Archetypes data | `unified-profile/archetypes.js` |
| Profile layout | `unified-profile/demo.html` |
| Teaser layout | `flow-demo.html` |
