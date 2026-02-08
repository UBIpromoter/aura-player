# Look Review: Answer Button Interaction Flow

**Scope:** Reviewing the binary YES/NO answer buttons, confidence tap escalation, undo bar overlay, question-to-question transitions, answered state display, action row, and the QOTD reuse of these components. Not reviewing: navigation chrome, category picker, assessment flow buttons, settings, onboarding.

**Verdict:** PASS WITH TICKETS

---

## What's Working

- **Fixed button positions (Critical requirement met):** Both `BinaryButtons` (line 5359) and the main question layout enforce "NO TRANSFORMS" (comments at lines 5382, 5491). Buttons use `h-[57px]` fixed height, `grid-cols-2 gap-2` or `flex` layout. No scale transforms, no translateY, no layout shift on tap. The confirmation checkmark area uses a fixed-size `w-11 h-[57px] flex-shrink-0` container (line 5446) so it reserves space even when empty. This is exactly right for muscle memory.

- **Visual hierarchy:** Answer buttons are the most prominent element in the bottom fixed zone. The `text-2xl font-bold` (line 5419) label text makes YES/NO immediately scannable. Question text uses the `question-text` class (`clamp(20px, 6vw, 28px)`, line 42) which is large and readable. The layout puts question in center flex area (line 9244) and buttons in a `flex-shrink-0` pinned bottom (line 9254) -- a clean two-zone split.

- **Confidence escalation feedback:** Multi-tap is well-visualized. The `ConfidenceSegments` component (line 4359) renders a 4-segment bar at the button bottom with increasing opacity emerald/rose shades. Gradient intensifies per confidence level -- e.g. emerald goes from `#065f46` at level 1 to `#10b981` at level 4 in dark mode (line 5362-5366). Box-shadow glow scales with `tapCount * 8` px spread (line 5389). Stars display via `getStars()` (line 1537) as a visual confidence indicator. This is clear, tactile, and progressive.

- **Undo flow is non-disruptive:** The `UndoBar` (line 5182) overlays the answer zone with `absolute inset-0 z-20` (line 9286), sitting on top of existing buttons rather than shifting layout. The sweep animation (`sweepFill`, line 53) fills a dark overlay across the button to indicate countdown. The full-screen click target for undo uses a portal (line 9135-9143) to escape stacking context. "Tap anywhere to Undo" text (line 9366) sits in a fixed `h-[36px]` action row (line 9354). Nothing moves, nothing pops up.

- **Color usage for YES/NO:** Emerald for YES (`#10b981` base) and rose for NO (`#f43f5e` base) match TOKENS.md exactly (lines 1206-1208). Both dark and light mode gradients are provided in `yesShades`/`noShades` objects (lines 5362-5373). The emerald/rose token colors appear in the `shine-emerald` and `shine-rose` CSS classes (lines 102-103). Ring colors use Tailwind's `ring-emerald-400` / `ring-rose-400` (lines 5414, 5469).

- **Component reuse:** QOTD screen (line 7107-7139) uses the exact same `BinaryButtons` and `MCButtons` components. This is excellent pattern consistency.

- **Touch feedback:** The `btn-feedback` CSS class (line 270) provides `scale(0.96)` on `:active` with 0.1s transition, plus brightness adjustments. On touch devices, hover brightness is disabled via `@media (hover: none)` (line 280-284). This prevents phantom hover states on mobile.

- **Swipe navigation:** `useSwipe` (line 3385) uses a clean 50px threshold with horizontal-dominant detection. Swipe is disabled during `pendingSubmit` (line 6099), preventing accidental navigation while undo countdown is active.

- **Typography:** Question text uses `text-wrap: balance` (line 44) for even line distribution. Line height 1.35 (line 43) matches TOKENS.md. Font weight is `font-medium` which keeps questions readable without competing with the bold button labels.

---

## Issues by Severity

### High

**H1. Off-token red in undo hint text and q-circle binary indicator**
- **Location:** Line 9362 (undo hint text), line 201 (q-circle-binary CSS)
- **Issue:** The "No" undo hint text uses `#ef4444` (red-500) instead of `#f43f5e` (rose-500). Same problem in the binary track circle: `conic-gradient(#ef4444 0deg 180deg, #10b981 180deg 360deg)`. TOKENS.md defines rose-500 (`#f43f5e`) as the "No" color. `#ef4444` is Tailwind `red-500`, which is a different hue entirely -- more pure red, less pink.
- **Fix:** Replace `#ef4444` with `#f43f5e` at line 9362 and line 201. Also check line 220 box-shadow which uses `rgba(239, 68, 68, 0.3)` (red-500 alpha) -- should be `rgba(244, 63, 94, 0.3)` (rose-500 alpha).
- **Why:** Color drift. Two different reds in the same interaction flow breaks cohesion. The binary track circle sits directly above the buttons that use rose -- the mismatch is visible side-by-side.

**H2. Light mode binary buttons have no color differentiation in default (unselected) state**
- **Location:** Line 5394-5399, `getButtonStyle()` default return
- **Issue:** In dark mode, default buttons are both `rgb(31,41,55)` (gray-800) with white text -- no emerald/rose hint. The buttons rely entirely on the text "YES" / "NO" for differentiation. In light mode, the text color *does* differentiate (`rgb(5,150,105)` for YES, `rgb(225,29,72)` for NO) and borders add emerald/rose tints. But in dark mode, both buttons are identical gray with identical gray text `rgb(209,213,219)` until tapped.
- **Fix:** Add subtle color differentiation to dark mode default state. Options: (a) faint emerald/rose text tint, (b) very subtle border like light mode uses, or (c) a barely-there background tint. The "YES" and "NO" labels carry meaning, but color reinforcement would improve scannability.
- **Why:** In dark mode, the two buttons are visually identical rectangles. Users must read text to distinguish them. This works, but color as a redundant channel would strengthen muscle memory -- users learn "green side" vs "red side" faster than "left text" vs "right text."

### Medium

**M1. ConfidenceSegments uses hardcoded dark-mode-only colors**
- **Location:** Lines 4361-4364, `ConfidenceSegments` component
- **Issue:** The segment fill colors are hardcoded RGBA values tuned for dark backgrounds (e.g., `rgba(6,78,59,0.6)` for emerald level 1). The component receives `darkMode` as a prop (line 4360) but never uses it. On light backgrounds, these dark-tuned alpha values will appear washed out and muddy.
- **Fix:** Add light-mode color arrays that use the lighter end of the emerald/rose spectrum with higher opacity, similar to how `BinaryButtons` already has separate dark/light shade maps.
- **Why:** The answer buttons themselves handle light mode beautifully with separate shade arrays. But the confidence indicator at the bottom of each button doesn't. If light mode is enabled, the confidence segments will visually disappear into the button background.

**M2. Confirmation mode checkmark button could be larger for touch**
- **Location:** Lines 5455-5460, submit checkmark button
- **Issue:** The submit checkmark is `w-10 h-10` (40x40px). The clear button above it is only `w-6 h-6` (24x24px). Apple HIG recommends 44px minimum touch targets. The checkmark is close at 40px but the clear button at 24px is well below the minimum.
- **Fix:** Increase clear button to at least `w-8 h-8` (32px) with 44px touch target via padding, or increase the overall `w-11` (44px) container to accommodate both. The checkmark should be `w-11 h-11` (44px).
- **Why:** The clear button (X to deselect) is a critical error-recovery control. Making it hard to tap on mobile increases frustration, especially when the user chose the wrong answer and needs to quickly correct.

**M3. Action row buttons lack sufficient touch target height**
- **Location:** Lines 9369-9401, action row (Can't / Explain / Skip / Save buttons)
- **Issue:** These buttons use `px-4 py-1.5` which produces roughly 30-32px height depending on font metrics. The parent container is `h-[36px]` (line 9354). All four buttons are below 44px minimum touch height.
- **Fix:** Increase to `py-2.5` or add explicit `min-h-[44px]` to the parent. The row height should be at least 48px to accommodate 44px targets with breathing room.
- **Why:** These are secondary actions so smaller targets are acceptable for desktop, but on mobile they're the only way to skip, save, or flag a question. Undersized targets increase error rate.

**M4. No visible question transition animation**
- **Location:** Lines 6032-6060 (`goToNext`), line 9244 (question area)
- **Issue:** When navigating between questions (swipe or arrow), `setCurrentIndex(nextIdx)` causes an instant content swap. There is no `fadeSlideIn` or any transition applied to the question area. The `fadeSlideIn` keyframe exists (line 51) but is not used on the question card container. The result is an abrupt text replacement with no visual continuity.
- **Fix:** Add `style={{ animation: 'fadeSlideIn 0.2s ease' }}` to the question area with a key tied to `currentIndex` so it re-triggers on each question change. Keep it fast (200ms) to avoid feeling sluggish.
- **Why:** Motion should clarify state changes. An instant swap is technically "no disruption" (which is good), but a subtle fade-slide confirms to the user that the question actually changed, especially for questions of similar length. This is a "motion that clarifies" case per the checklist.

**M5. Answered question view (AnsweredQuestionView) uses different text alignment than unanswered**
- **Location:** Line 4856 vs line 5309
- **Issue:** `AnsweredQuestionView` uses `text-center font-medium flex-1` alongside a flag button in a `flex items-start gap-2` container (line 4855). This means the question text is centered but pushed left by the flag icon. In the unanswered `QuestionCard` (line 5309), text is purely centered without adjacent elements. The centering appears slightly different between states.
- **Fix:** Move the flag button to a separate row or use absolute positioning so it doesn't affect text centering.
- **Why:** When a user answers and sees the result, the question text shifts slightly left. This breaks the "nothing moves" principle -- the question itself appears to move even though the answer buttons didn't.

### Low

**L1. `getStars()` uses Unicode stars that may render inconsistently**
- **Location:** Line 1537 (`getStars`), displayed at lines 5420, 5442, 5475, 5258
- **Issue:** `'★'.repeat()` renders as filled Unicode stars. On some Android devices and older browsers, these may render as outlined or with inconsistent sizing. SVG or emoji would be more predictable.
- **Fix:** Consider replacing with a small SVG star icon or using the emoji variant. Low priority since most modern devices handle this fine.
- **Why:** Minor cross-platform consistency concern.

**L2. QOTD answer area uses hardcoded height `h-[93px]` for binary**
- **Location:** Line 7109
- **Issue:** The QOTD binary button area uses `h-[93px]` while the main question screen calculates height dynamically from `flex-shrink-0` and content. If button height changes (e.g., if H2 fix adds borders), the QOTD height won't update automatically.
- **Fix:** Extract the button zone height to a shared constant, or use `flex-shrink-0` with auto-height like the main screen does.
- **Why:** Maintenance risk. Two separate implementations of the same visual zone.

**L3. Shine/glow effects only trigger on hover (desktop only)**
- **Location:** Lines 91-95, `.shine-card:hover::before` and `:active`
- **Issue:** The `shine-card` shimmer-pulse animation only activates on `:hover`. On touch devices, `:hover` is unreliable. The `:active` state does show a brighter version (lines 93-95), but the shimmer-pulse animation doesn't play on tap-and-hold. Mobile users miss the premium shine effect entirely.
- **Fix:** Add a brief shine animation class that can be toggled programmatically on tap, or use the `:active` state to trigger a shorter shimmer. This is very low priority since the `:active` brightness boost already provides feedback.
- **Why:** The shine effect is premium polish that only desktop users see. Mobile is the primary use case.

---

## Hard Gates

- [x] **Type scale:** Question text uses 1 size (`clamp(20px, 6vw, 28px)`). Button labels use `text-2xl`. Confidence labels use `text-sm`. Action row uses `text-sm`. Four sizes total in the answer flow -- within the 5-size limit.
- [ ] **Color/spacing -- default to tokens:** FAIL on H1. `#ef4444` (red-500) is used at lines 201, 220, 9362. This color is NOT in TOKENS.md. The correct "No" color is `#f43f5e` (rose-500). All other colors trace back to tokens.
- [x] **Contrast WCAG AA (4.5:1):** White text on emerald-500 (`#10b981`) = 3.94:1 -- this technically fails AA for normal text but passes for large text (18px+ bold = "large" per WCAG). The button text is `text-2xl font-bold` which qualifies as large text. On the full-confidence gradient endpoints (`#6ee7b7` light, `#10b981` dark), white text maintains acceptable contrast for the large bold labels. Rose buttons pass more easily since rose is inherently higher contrast.
- [ ] **Theme parity -- both verified:** PARTIAL FAIL on M1. `ConfidenceSegments` does not adapt to light mode. All other answer flow components have explicit dark/light branches.

---

## Summary of Fixes by Priority

| ID | Severity | Component | Line(s) | Fix |
|----|----------|-----------|---------|-----|
| H1 | High | Undo hint, q-circle | 9362, 201, 220 | Replace `#ef4444` with `#f43f5e` (rose-500) |
| H2 | High | BinaryButtons default state | 5394-5399 | Add subtle emerald/rose tint to dark-mode default buttons |
| M1 | Medium | ConfidenceSegments | 4361-4364 | Add light-mode color arrays |
| M2 | Medium | Confirm checkmark/clear | 5449-5461 | Increase touch targets to 44px |
| M3 | Medium | Action row buttons | 9369-9401 | Increase touch targets to 44px min |
| M4 | Medium | Question transition | 9244, 6050 | Add subtle fade-slide animation keyed to question index |
| M5 | Medium | AnsweredQuestionView | 4855-4856 | Fix flag button affecting text centering |
| L1 | Low | Star display | 1537 | Consider SVG stars for cross-platform consistency |
| L2 | Low | QOTD height | 7109 | Unify with main screen height approach |
| L3 | Low | Shine on mobile | 91-95 | Add programmatic shine trigger for touch |

---

## Design Cohesion Score

The answer button flow is the strongest part of Aura's interaction design. The fixed-position constraint is rigorously enforced. The confidence escalation (tap 1-4) with progressive gradient + glow + stars is inventive and satisfying. The undo overlay is elegant -- it occupies the same visual space without shifting anything.

The main cohesion break is H1 (two different reds). Fix that and this flow is very tight.
