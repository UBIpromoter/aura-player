# Feel Review: Answer Button Interaction Flow

**Specialist:** Feel (UX)
**Scope:** Reviewing the core answer loop: see question -> tap answer -> see result -> next question. Includes undo mechanism, button positioning, transition timing, cognitive load, and modal interruptions. Not reviewing visual polish (Look's domain), backend persistence, or edge-case error handling (Work's domain).

**Verdict:** PASS WITH TICKETS

---

## What's Working

- **Fixed button positions (Binary):** YES/NO buttons use a `grid-cols-2` or `flex` layout with fixed `h-[57px]` height, `rounded-xl`. The comment on line 5382 explicitly says `// NO TRANSFORMS - buttons stay fixed`. They never move, resize, or animate position. This is exactly right. (Lines 5407-5425, 5429-5479)

- **Fixed button positions (MC):** Multiple-choice buttons use `h-[40px]` with `space-y-1` spacing. Also annotated `// NO TRANSFORMS - buttons stay fixed` at line 5491. Button height is consistent regardless of selection state. Correct. (Lines 5531-5579)

- **Immediate answer registration with undo safety net:** Answer registers immediately via `submitAnswer()` (line 6173), entering a pending state. During the `undoDelay` window (default 1s), the user can undo by tapping anywhere. This matches Philip's principle: "The undo window IS the safety net." No confirmation dialogs block the flow.

- **Tap-anywhere-to-undo:** Full-screen transparent overlay captures undo clicks (lines 9135-9143 for mobile via portal, 9712-9718 for desktop). The entire screen becomes an undo target. "Tap anywhere to Undo" text shown at line 9366. Very discoverable.

- **No transforms or layout shifts in button area:** `btn-feedback` CSS class uses `scale(0.96)` on `:active` (line 277) -- this is a sub-frame press effect, not a position change. Buttons snap back instantly. Good tactile feel without layout disruption.

- **Question text sizing:** `clamp(20px, 6vw, 28px)` with `text-wrap: balance` (lines 41-44). Readable across device sizes without overflow.

- **Touch optimization:** `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent` on all elements (lines 34-35). Prevents 300ms delay, removes blue flash. Correct for mobile.

- **Keyboard shortcuts:** Y/N/1-5 for answers, arrow keys for navigation, Escape for undo (lines 6280-6335). Power users can fly through questions.

- **Grace period for confidence stacking:** After submitting, there's a 600ms window (`CONFIDENCE_GRACE_PERIOD`, line 5991) to tap again and increase confidence. Smart -- prevents the undo timer from penalizing multi-tappers.

- **Swipe navigation:** Left/right swipe to navigate between questions (lines 6096-6100). Disabled during pending state to prevent accidental navigation.

---

## Issues by Severity

### Critical

None.

### High

**H1. Two-step answer submission is the DEFAULT and it's confusing for first-time users**
- Location: `requireConfirmation` defaults to `true` (line 3285: `requireConfirmation: true`)
- Issue: With confirmation required, a user must: (1) tap an answer option to select it, (2) find and tap the small checkmark button to submit. For binary questions, the checkmark appears in a `w-11` (44px) column between YES and NO (lines 5446-5462). For MC, it's a `w-9` (36px) column next to the selected option (lines 5554-5574). The deselect button (X) is only `w-6 h-6` (24px) for binary and `w-4 h-4` (16px) for MC.
- Problem: A first-time user taps YES, it highlights, and then... nothing happens. They have to discover a small checkmark button squeezed between/beside the answer buttons. This is a two-step pattern disguised as a one-step interaction. The "Tip: Confident? Tap up to four times" banner (line 5285) makes it worse -- it implies tapping the answer IS the action, not that tapping is just selection.
- The auto-submit mode (`requireConfirmation: false`) is the better UX: tap = answer, with a 400ms delay for multi-tap confidence (line 6156-6158). But it's buried in Settings.
- Fix: Default `requireConfirmation` to `false`. Auto-submit is the correct default for a "mom-friendly" app. The undo window provides the safety net. The explicit submit button should be an advanced/power-user option.
- Why: Philip's test is "Would Philip's mom feel confident using this without being told how?" A hidden submit button fails this test immediately.

**H2. LevelUp modal interrupts the answer flow mid-sequence**
- Location: `finalizeSubmit` checks for level up (lines 6251-6254), sets `levelUpData`. The `LevelUpModal` renders as a `fixed inset-0 z-50` overlay (lines 4322-4352, rendered at 9730/9756).
- Issue: The level-up modal appears IMMEDIATELY after `goToNext()` is called (line 6257), meaning the user answers a question, the answer commits, the view advances to the next question, AND THEN a full-screen celebration modal appears on top. This is a disruptive interruption in the middle of the answer flow. The user is likely already reaching for the next answer button when the modal appears.
- The modal requires an explicit "Continue" button tap (line 4344-4348) or clicking the backdrop to dismiss.
- Fix: Defer the level-up celebration. Either (a) show it as a non-blocking toast/banner that auto-dismisses, or (b) queue it and show it when the user navigates back to the category screen. Never interrupt the active answer flow.
- Why: Philip's principle: "No disruptions -- nothing pops up or shifts the layout while the user is in the answer zone. Zero surprises."

**H3. SaveProgressModal interrupts the answer flow at 20 responses**
- Location: Lines 6473-6480 -- after 20 guest responses, `showSaveNudge` is set to `true`. The `SaveProgressModal` renders as `fixed inset-0 z-50` (lines 4300-4319, rendered at 9729/9755).
- Issue: Same problem as H2. After the 20th answer, a full-screen modal blocks the flow: "20 responses! Save your progress?" This appears regardless of whether the user is mid-flow answering questions. It has no auto-dismiss -- user must tap "Create Account" or "Later."
- Fix: Show the nudge when the user returns to the category screen, not while they're in the question flow. Or make it a dismissible banner, not a modal.
- Why: Same "no disruptions" principle. A registration prompt during active answering is the worst possible timing.

### Medium

**M1. Action row below buttons creates decision overload for new users**
- Location: Lines 9353-9403 -- below the answer buttons, a row shows: "Can't" (or "None"), "Explain", "Skip", "Save"
- Issue: That's 4 secondary actions visible at all times during the unanswered state. Combined with the answer buttons themselves, a binary question shows 6 tappable elements; an MC question with 4 options shows 8 tappable elements. Philip's own principle says "No disruptions" -- while these don't pop up, their persistent presence adds cognitive weight.
- The "Explain" button (line 9376-9385) opens a modal (`ExplanationModal`, line 4736) BEFORE the user has answered -- it asks "Why this answer?" when there's no answer yet. This is conceptually confusing.
- Fix: Consider progressive disclosure. Show "Can't" and "Skip" only. "Explain" should only appear after answering. "Save" could be a long-press or swipe gesture instead of a persistent button.
- Why: Feel checklist: "<=3 choices at decision points." The answer buttons + 4 action buttons exceed this.

**M2. Onboarding answer flow differs from main app flow**
- Location: `OnboardingFlow` component (lines 3982-4190) has its own `handleTap` and `handleSubmit` pattern
- Issue: The onboarding ALWAYS uses explicit confirmation (small checkmark at line 4177-4181, X at lines 4169-4176). It doesn't respect the `requireConfirmation` setting. It also has no undo mechanism -- once submitted, it's done. The onboarding teaches a pattern (select + confirm) that may or may not match the main app depending on settings.
- Additionally, the confidence hint only appears starting at question 6 (`showConfidenceHint = currentIndex >= 5`, line 4010). So for the first 5 questions, there's no indication that multi-tapping does anything -- but it does.
- Fix: Make onboarding match the main flow's behavior. If the main app defaults to auto-submit, onboarding should too. At minimum, teach the pattern that will be used.
- Why: Consistency between onboarding and main app is essential. Training users on one pattern, then switching, creates confusion.

**M3. "Undone" banner state can be confusing**
- Location: Lines 9257-9273 -- after undo, a banner says "Undone -- tap to change or resubmit" with a "Clear" button.
- Issue: After undoing, the user sees their previous answer re-selected (line 6265-6268: `setTappedAnswer(pendingSubmit.answer)`, `setTapCount(pendingSubmit.confidence)`). The banner tells them to "tap to change or resubmit." But what does "resubmit" mean? If `requireConfirmation` is on, they need to find the checkmark again. If it's off, tapping the same answer starts a 400ms auto-submit timer.
- The "Clear" button (line 9264) calls `clearUndoneState` which deselects everything -- but a user might interpret "Clear" as "clear my answer from the database" rather than "deselect my current selection."
- Fix: Simplify the undo recovery. After undo, return to a clean slate (no pre-selection). The banner should say "Answer removed" and auto-dismiss after 2 seconds. Let the user start fresh.
- Why: The current state requires understanding the difference between "selected but not submitted" and "submitted." That's expert-level state awareness.

**M4. Right-click to decrease confidence is undiscoverable**
- Location: `handleAnswerRightClick` at lines 6163-6171
- Issue: Right-click (or long-press on mobile) decreases confidence. This is never shown to the user anywhere -- not in tips, not in onboarding, not in settings. On mobile, `onContextMenu` (lines 5412, 5434, 5467, 5540) may trigger the browser's native context menu instead of the intended action.
- Fix: Either remove this feature or add it to the keyboard shortcuts help. On mobile, consider a different gesture.
- Why: An invisible interaction that may conflict with browser behavior is a liability, not a feature.

**M5. Default undo delay of 1 second may be too short for new users**
- Location: Line 3285: `undoDelay: 1`
- Issue: Philip's direction says "Leave MORE room between tap -> response -> next question." 1 second is fine for power users but may be too fast for someone's mom to notice the undo bar and react. The sweep animation fills in 1s (line 5252: `sweepFill ${undoDelay}s`), then `finalizeSubmit` fires and `goToNext()` advances. For a first-time user, the question changes before they fully process what happened.
- The delay is configurable (0-3s in 0.5s steps, line 5782), but the default matters most.
- Fix: Consider a default of 1.5s or 2s. Power users will reduce it; first-time users need the breathing room.
- Why: Philip explicitly said "generous timing" and "leave MORE room."

### Low

**L1. "Swipe for next" hint only shows when no questions have been answered this session**
- Location: Lines 9418-9422
- Issue: The "Swipe for next ->" hint in the community browse area disappears after the first answer, replaced by community results. There's no other affordance teaching swipe navigation. Not blocking, but a missed teaching moment.

**L2. Track selector circles in header are non-obvious**
- Location: Lines 9144-9217 -- colored gradient-border circles showing remaining binary/MC/mixed counts
- Issue: The circles use gradient borders (green/red for binary, multicolor for MC, white for mixed) but have no labels. A first-time user won't know what they mean. They show counts like "42" or "Mix" but don't explain what they control.
- Fix: Add subtle labels on first few uses, or use a tooltip/long-press explanation.
- Why: This is navigation chrome, not core loop, so Low priority.

**L3. The `btn-feedback` scale effect is 0.96 -- imperceptible on small buttons**
- Location: Lines 270-284
- Issue: On the small MC checkmark button (w-8 = 32px), a 4% scale reduction is about 1.3px. Users may not perceive the press feedback on these tiny targets.
- Fix: Consider a more visible press state for small targets (color flash, brief opacity change).

---

## Hard Gates

- [x] **First task completion < 30 seconds without instruction** -- With `requireConfirmation: false` (auto-submit), YES. Tap answer, done, next question appears. With the default `requireConfirmation: true`, FAILS -- the submit button discovery adds uncertain time.
- [ ] **Decisions per screen <= 3** -- FAILS during unanswered state. Binary: 2 answer buttons + 4 action buttons = 6 decisions. MC with 4 options: 4 + 4 = 8 decisions. The action row (Can't/Explain/Skip/Save) pushes past the threshold.
- [x] **One clearly dominant primary action** -- The answer buttons are visually dominant (large, colored, centered). The action row is visually subdued. Passes, but barely with the confirmation-required checkmark competing.

---

## The Mom Test

> "Would Philip's mom feel confident using this without being told how?"

**With default settings (`requireConfirmation: true`): No.**

She would tap YES or NO, see it highlight, and then wait for something to happen. The small checkmark button between the answer buttons is not obvious as "the thing you tap next." She might tap the same answer again (which increases confidence but doesn't submit). She might tap the other answer (which switches selection). She would not feel confident.

**With `requireConfirmation: false` (auto-submit): Almost yes.**

She taps YES, it highlights and auto-submits after 400ms. An undo bar sweeps across for 1 second. The next question appears. This is clear and intuitive. But:

1. The 4-button action row (Can't/Explain/Skip/Save) below the answers adds visual noise she doesn't need.
2. If she accidentally triggers a level-up modal, she might think she broke something.
3. The 1-second undo window is fast -- she might not realize she can undo.

**To pass the Mom Test, three changes are needed:**
1. Default `requireConfirmation` to `false` (auto-submit on tap)
2. Defer or suppress level-up/save-progress modals during active answering
3. Increase default `undoDelay` to 1.5-2 seconds

With those three changes: **Yes, she would feel confident.**

---

## Summary Table

| ID | Severity | Issue | Core Principle Violated |
|----|----------|-------|------------------------|
| H1 | High | Two-step submit is the default | "Would mom get it?" |
| H2 | High | LevelUp modal interrupts flow | "No disruptions" |
| H3 | High | SaveProgress modal interrupts flow | "No disruptions" |
| M1 | Medium | 4 action buttons = decision overload | "<=3 choices" |
| M2 | Medium | Onboarding pattern differs from main app | Consistency |
| M3 | Medium | Undo-then-reselect state is confusing | Easy recovery |
| M4 | Medium | Right-click to decrease confidence is invisible | Discoverability |
| M5 | Medium | 1s undo delay too short for new users | "Generous timing" |
| L1 | Low | Swipe hint disappears after first answer | Teaching moments |
| L2 | Low | Track selector circles have no labels | Progressive disclosure |
| L3 | Low | Press feedback imperceptible on small buttons | Tactile clarity |
