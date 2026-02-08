# Screen Component Migration Plan

> Mockup: `/design/screen-atlas.html`
> Production: `/index.html`
> Date: 2025-02-05

---

## 1. ScreenQotD (Question of the Day)

### Current (Production) — Lines 7008-7146

The production QotD screen reuses the **full Q&A machinery**:
- Navigation bar with back/forward arrows and a progress bar (line 7043-7049)
- QotD badge row with sun emoji, "Question of the Day" label, day count, countdown timer, and +XP reward (lines 7052-7057)
- **Unanswered state:** Uses `QuestionCard` component (same as regular questions), `BinaryButtons` or `MCButtons` with full confidence-tap system (multi-tap to increase confidence), sponsor line, fixed bottom bar with answer buttons (lines 7096-7145)
- **Answered state:** Shows question text, "Your answer" summary with confidence label, `CommunityResultsRows` with full confidence-segmented bars, sponsor (lines 7060-7093)
- Blue glow radial gradient background (lines 7023-7027)

### Target (Mockup) — Lines 1218-1252

Drastically simplified:
- **No navigation bar** at all
- Thin top badge: "Question of the Day" + "Day 12" only (no timer, no XP, no sun emoji)
- **Question centered** in flex-1 area, just `text-base font-medium` text
- **Two large buttons** at bottom: "YES" (emerald tint) and "NO" (rose tint), side-by-side, `h-[48px]`, no confidence tapping
- Subtle blue radial gradient background
- No sponsor, no results view, no community results

### Delta

| Change | Detail |
|--------|--------|
| Remove nav bar | Delete the back/forward + progress bar row (lines 7043-7049) |
| Simplify badge row | Remove sun emoji, timer, XP reward. Keep "Question of the Day" + day number |
| Replace answer mechanism | Remove BinaryButtons/MCButtons/confidence-tap system. Replace with two simple YES/NO buttons |
| Remove answered view complexity | After answering, either transition away or show minimal feedback (not full community results) |
| Center question | Question should be centered vertically, not inside a QuestionCard component |
| Remove sponsor | Remove sponsor display entirely |
| Simplify state | Remove `qotdTappedAnswer`, `qotdTapCount`, `submitQotdAnswer` — just two buttons with direct submit |

### Complexity: **L**

This is a significant rearchitecture. The production QotD reuses the entire Q&A component stack. The mockup is a standalone simple screen.

### Dependencies

- `handleQotdTap`, `submitQotdAnswer`, `qotdTappedAnswer`, `qotdTapCount` state management (lines 5923-5939) — simplify or remove
- `CategoryScreen` QotD card (lines 5046-5075) — may need updates to match new simplified flow
- `qotdDistributionToEvaluators` (line 1688) — still needed if results are shown elsewhere
- Keyboard shortcut handler references QotD (lines 6307-6315) — update

### Risk: **Medium-High**

- QotD currently handles both binary AND multiple-choice questions from `QOTD_POOL`. The mockup only shows binary YES/NO. Need to decide: drop MC from QotD, or build MC variant too?
- Community results are shown post-answer in production. Removing them changes the reward loop. Consider keeping a minimal results view post-answer.
- State wiring is tangled with the main App component (lines 5912-5939). Careful extraction needed.

---

## 2. ScreenResults (Confidence Bars)

### Current (Production) — Lines 1485-1534 (`renderConfidenceBar`) + Lines 3631-3692 (`ConfidenceBar`)

Production has **two** confidence bar implementations:

1. **`renderConfidenceBar`** (line 1488): Returns a flex row of colored segments. Has checkmark in user's segment and a `boxShadow` inset highlight with matching border-radius. Used by `CommunityResultsRows`, `FullResultsPanel`, `AnsweredQuestionView`.

2. **`ConfidenceBar`** component (line 3633): Full row with label, percentage, and bar. User's row gets a `border border-current` pill around the label. User's confidence segment gets `border: 3px solid white, borderRadius: 12px`. **No checkmark** inside segments.

Key differences between the two:
- `renderConfidenceBar` already has the checkmark pattern
- `ConfidenceBar` only highlights via border, no checkmark

### Target (Mockup) — Lines 739-818

The mockup's `ScreenResults`:
- User's answer label ("Yes") gets a rounded border pill highlight (`px-1 py-0.5 rounded-full border`)
- Checkmark (`&#10003;`) inside the user's confidence segment, `text-[7px] font-black`
- Segment border overlay with `inset 0 0 0 1.5px` box-shadow matching highlight color
- Highlight color: white in dark mode, `#6b7280` in light mode
- Segments ordered high-confidence first (index 3,2,1,0 mapped to colors[0-3])
- Empty space gets dashed border

### Delta

| Change | Detail |
|--------|--------|
| `ConfidenceBar` needs checkmark | Add checkmark to user segment in `ConfidenceBar` component (lines 3665-3681) |
| Unify implementations | Both `renderConfidenceBar` and `ConfidenceBar` should match the mockup pattern |
| User row label styling | Already has `font-bold px-1.5 py-0.5 rounded-full border` — matches mockup |
| Highlight overlay | `renderConfidenceBar` uses `inset 0 0 0 3px` — mockup uses `1.5px`. Adjust thickness |
| Check color logic | Both have dark/light check color logic. Verify they match mockup's `getCheckColor` |

### Complexity: **S**

The production `renderConfidenceBar` already implements 90% of the mockup's pattern. The `ConfidenceBar` component just needs the checkmark added and border thickness adjusted.

### Dependencies

- `ConfidenceBar` used by `ResultChart` (line 4398), `BinaryChart`, `MultipleChoiceChart`, `MiniCommunityResults`
- `renderConfidenceBar` used in 6 places (lines 4593, 4647, 4922, 9522, 9545, 9605)
- Changing either affects all results displays across the app

### Risk: **Low**

Both implementations are close to the mockup. The main risk is visual regression in the many places these components are used. Test all results views after changes.

---

## 3. ScreenAssessmentResults (Dual-Color Trait Spectrums)

### Current (Production) — Lines 7893-7937 (`TraitSpectrum`) + Lines 3591-3614 (`SpectrumBar`)

Production has **two** spectrum bar implementations:

1. **`SpectrumBar`** (line 3592): Uses `spectrumColors` lookup by `testId`. Each test has `{ left, right, leftLabel, rightLabel }`. Renders a gradient bar from `left` to `right` color with a white dot marker. **Same color family** for both ends (e.g., `bigfive-E` uses `#6366f1` indigo to `#f59e0b` amber).

2. **`TraitSpectrum`** (line 7893): Defined inside the results render. Has full and compact modes. Uses `PROGRESS_GRADIENTS[color]` which maps to a **single-color gradient** (e.g., `violet: { from: '#8b5cf6', to: '#a78bfa' }`). This means both ends are shades of the same color.

The `spectrumColors` definition (lines 3572-3589) already has **dual-color pairs**:
```
bigfive-E: #6366f1 (indigo) -> #f59e0b (amber) — Reserved -> Outgoing
bigfive-A: #3b82f6 (blue) -> #ec4899 (pink) — Direct -> Empathetic
bigfive-C: #8b5cf6 (violet) -> #10b981 (emerald) — Flexible -> Organized
bigfive-N: #06b6d4 (cyan) -> #f97316 (orange) — Steady -> Sensitive
bigfive-O: #64748b (slate) -> #a855f7 (purple) — Practical -> Curious
```

But `TraitSpectrum` doesn't use `spectrumColors` — it uses `PROGRESS_GRADIENTS[color]` which is **single-color**.

### Target (Mockup) — Lines 1036-1098

The mockup's `ScreenAssessmentResults`:
- Each trait has explicit dual-color pairs: `colorL` and `colorR`
- Gradient bar: `linear-gradient(to right, ${colorL}, ${colorR})`
- White dot marker positioned at score percentage
- Label endpoints colored to match their side: left label gets `colorL`, right label gets `colorR`
- Examples:
  - Extraversion: blue (#3b82f6) to amber (#f59e0b)
  - Agreeableness: violet (#8b5cf6) to emerald (#10b981)
  - Conscientiousness: rose (#f43f5e) to teal (#14b8a6)
  - Neuroticism: emerald (#10b981) to amber (#f59e0b)
  - Openness: indigo (#6366f1) to cyan (#06b6d4)

### Delta

| Change | Detail |
|--------|--------|
| `TraitSpectrum` needs dual colors | Switch from `PROGRESS_GRADIENTS[color]` to explicit `colorL`/`colorR` props or use `spectrumColors[testId]` |
| Color the endpoint labels | Labels currently use `text-gray-500`. Mockup colors each label to match its side of the spectrum |
| Unify with `SpectrumBar` | `SpectrumBar` already uses `spectrumColors` and renders dual-color gradients correctly. `TraitSpectrum` should match |
| Update Quick Profile results | Quick Profile results (lines 7949-8028) currently show text description, not spectrum bars. Mockup shows 5 trait spectrums with dual-color pattern |
| Assessment completion view | The header card with gradient background + emoji + title needs to match mockup (lines 1067-1073) |

### Complexity: **M**

The infrastructure (`spectrumColors`) already exists. The main work is:
1. Refactor `TraitSpectrum` to accept dual colors or look up `spectrumColors`
2. Update all call sites to pass the right color data
3. Add colored endpoint labels
4. Add Quick Profile spectrum view (currently only shows text)

### Dependencies

- `TraitSpectrum` used in: Big Five results (line 8037+), Shadow results (line 8091+), Starter Pack results (line 8188)
- `SpectrumBar` used in: Assessment picker standalone tests (line 7364+)
- `spectrumColors` (lines 3572-3589) — color pairs already defined, may need Neuroticism pair updated
- Quick Profile results section (lines 7949-8028) needs trait spectrum bars added
- Analysis screen (line 8356+) also uses these patterns

### Risk: **Medium**

- The mockup's trait colors don't fully match `spectrumColors` in production (e.g., Neuroticism: mockup uses emerald->amber, production uses cyan->orange). Need to reconcile.
- Quick Profile currently doesn't calculate per-trait scores in a way compatible with spectrum bars — the `getTraitDescription` function (line 7951) calculates `traitScores` but doesn't expose them for spectrum rendering. Needs refactoring.
- Starter Pack modules use `PROGRESS_GRADIENTS` (single-color). They may or may not get dual-color treatment.

---

## 4. ScreenProfile / ScreenQuickProfile (Dual-Color Spectrums in Profile)

### Current (Production) — Lines 6767-6926

The production profile screen contains:
- Avatar with dynamic aura glow (lines 6816-6829)
- Personality section card with `AuraVisualization` (lines 6832-6870) — links to Analysis
- Activity stats: Answered, Avg Conf, Assessments (lines 6872-6905)
- Confidence distribution bar (lines 6892-6903) using violet gradient shades
- Quick action buttons: Assessments + History (lines 6907-6923)

**No trait spectrum bars appear in the profile.** The personality section is just a name/tagline card that links to the Analysis screen.

### Target (Mockup) — Lines 1141-1216

The mockup's `ScreenProfile`:
- Smaller, more compact avatar section (lines 1154-1165)
- Personality card with aura glow visualization (lines 1167-1194) — same pattern as production
- Activity stats: Answered, Avg Conf, Tests (lines 1196-1212) — same pattern
- **No trait spectrum bars in the profile itself**

Actually, looking closely, the mockup profile and production profile are quite similar. The mockup is just a more compact version of the same layout.

### Delta

| Change | Detail |
|--------|--------|
| Compact sizing | Avatar: 12x12 -> w-12 h-12. Stats text: text-2xl -> text-xl. General padding reduction |
| Aura viz simplification | Mockup uses simpler aura glow (a div with radial gradient), production uses `AuraVisualization` component. Keep production's — it's richer |
| Remove History placeholder | Mockup doesn't show the "History coming soon" grid item |
| Remove confidence distribution | Mockup's activity section doesn't include the confidence distribution bar |

### Complexity: **S**

Mostly cosmetic tightening. The structural layout matches.

### Dependencies

- `AuraVisualization` component — keep as-is
- `calculateArchetype` — keep as-is
- Profile screen exit navigation — keep as-is

### Risk: **Low**

Minimal structural changes. The mockup confirms the production direction is correct, just needs polish.

---

## 5. ScreenLevelUp (Contained Pulsing Glow)

### Current (Production) — Lines 4321-4352

```jsx
const LevelUpModal = ({ level, title, onClose, darkMode }) => (
  <div className="fixed inset-0 z-50 ...">
    <div className="w-full max-w-sm rounded-2xl p-8 text-center ...">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br
            from-violet-500/20 to-amber-500/20 animate-pulse" />
        </div>
        <div className="relative z-10 text-6xl mb-4 celebrate-glow">...</div>
      </div>
      ...
    </div>
  </div>
);
```

The pulsing glow is a **w-32 h-32** (128px) circle using `animate-pulse`. This is large relative to the modal content and can visually overlap with text below.

### Target (Mockup) — Lines 1118-1139

```jsx
const ScreenLevelUp = ({ darkMode }) => (
  ...
    <div className="relative inline-block mb-4">
      <div className="absolute inset-0 flex items-center justify-center"
        style={{ margin: '-8px' }}>
        <div className="w-16 h-16 rounded-full animate-pulse" style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(139,92,246,0.25),
               rgba(251,191,36,0.15), transparent)'
            : 'radial-gradient(circle, rgba(139,92,246,0.15),
               rgba(251,191,36,0.08), transparent)'
        }} />
      </div>
      <div className="relative z-10 text-4xl celebrate-glow">...</div>
    </div>
  ...
);
```

### Delta

| Change | Detail |
|--------|--------|
| Shrink glow circle | `w-32 h-32` (128px) -> `w-16 h-16` (64px) |
| Use radial gradient | Replace `bg-gradient-to-br from-violet-500/20 to-amber-500/20` with `radial-gradient(circle, violet, amber, transparent)` |
| Contain with negative margin | Add `margin: '-8px'` to the glow container so it stays close to the emoji |
| Reduce modal padding | `p-8` -> `p-6` (production uses larger modal) |
| Shrink emoji | `text-6xl` -> `text-4xl` |
| Reduce modal width | `max-w-sm` -> `max-w-[220px]` (tighter) |
| Reduce text sizes | Level number: `text-5xl` -> `text-4xl`. Title: `text-lg` -> `text-sm`. Remove "Keep going..." subtitle |
| Simplify button | Remove explicit `onClick` styling, simplify to basic rounded-lg |

### Complexity: **S**

Straightforward size/style adjustments within a single component.

### Dependencies

- `LevelUpModal` is rendered in two places (lines 9730, 9756). Both pass same props.
- `celebrate-glow` CSS animation is shared — no change needed.

### Risk: **Low**

Self-contained modal. Changes don't affect other components. Just verify it looks good at both render locations.

---

## Migration Priority Order

### Phase 1: Quick Wins (Low Risk, High Impact)

1. **ScreenLevelUp** (S) — Smallest change, self-contained modal. Good warmup. 15 min.
2. **ScreenResults / Confidence Bars** (S) — `renderConfidenceBar` is already 90% there. Add checkmark to `ConfidenceBar`, adjust border thickness. Affects all results views positively. 30 min.

### Phase 2: Structural Improvements (Medium Risk)

3. **ScreenAssessmentResults / Trait Spectrums** (M) — Refactor `TraitSpectrum` to use dual-color pairs. High visual impact on assessment results. Reconcile color mapping between `spectrumColors` and mockup. 1-2 hours.
4. **ScreenProfile** (S) — Cosmetic tightening. Quick once spectrums are done. 30 min.

### Phase 3: Major Rearchitecture

5. **ScreenQotD** (L) — Largest change, most entangled state. Do last because it requires careful extraction from the Q&A component stack. Needs decision on MC question handling. 2-4 hours.

### Rationale

- Start with isolated, low-risk changes to build momentum and verify the design direction
- Spectrum bars affect both Assessment Results AND Profile, so doing them in Phase 2 unlocks both
- QotD is last because it's the riskiest and most entangled — by the time we reach it, we'll have patterns established from the other migrations
- Each phase can be shipped independently

---

## Token Compliance Notes

All mockup colors are present in TOKENS.md:
- Violet, blue, teal, rose, emerald, amber, indigo, cyan, slate: all listed in ASSESS_C
- Binary response colors (emerald for Yes, rose for No): matches TOKENS
- Background gradients: matches TOKENS dark/light mode values
- The dual-color spectrum pairs in the mockup use only colors from the approved palette

**No new tokens needed** for this migration.

---

## Open Questions

1. **QotD MC questions:** The mockup only shows binary YES/NO. Should MC questions be dropped from QotD, or do we need an MC variant of the simplified design?
2. **QotD post-answer view:** Production shows community results after answering. The mockup doesn't show a post-answer state. What happens after tapping YES/NO?
3. **Spectrum color reconciliation:** Mockup Neuroticism uses emerald->amber; production `spectrumColors` uses cyan->orange. Which wins?
4. **Quick Profile results:** Mockup shows 5 trait spectrums with strength/growth insights. Production shows text description. Is the mockup the target for production Quick Profile results too, or only for the assessment results screen?
