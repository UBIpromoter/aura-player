# Work Review: Answer Button Interaction Flow

**Scope:** Reviewing answer submission, undo mechanism, double-tap protection, error handling, accessibility, and touch targets in the question-answering flow. Not reviewing: assessment flow (separate system), profile/auth, export, navigation between screens, or visual design.

**Verdict:** PASS WITH TICKETS

---

## Architecture Summary

The answer flow has two modes controlled by user settings:

1. **Require Confirmation (default: ON)** -- User taps answer, then taps checkmark to submit. Undo window runs after submission.
2. **Auto-submit (confirmation OFF)** -- User taps answer, 400ms debounce fires `submitAnswer`. Undo window runs after submission.

### The Flow

```
tap answer -> handleAnswerTap() -> [select + confidence]
                                        |
                  [if requireConfirmation] -> wait for checkmark tap -> submitAnswer()
                  [if !requireConfirmation] -> 400ms debounce -> submitAnswer()
                                        |
                                  submitAnswer()
                                        |
                              setPendingSubmit({answer, confidence, community})
                              start grace period (600ms) for confidence bumps
                                        |
                              [if undoDelay === 0] -> finalizeSubmit() immediately
                              [if undoDelay > 0]   -> setTimeout(finalizeSubmit, undoDelay * 1000)
                                        |
                              UNDO WINDOW: full-screen overlay, any tap -> handleUndo()
                                        |
                              finalizeSubmit()
                                        |
                              1. Write to localStorage (demoStorage)
                              2. Fire captureResponse() to Supabase (async, fire-and-forget)
                              3. Update React state (responses, stats, XP)
                              4. Auto-advance to next question via goToNext()
```

### Undo Mechanism

- **handleUndo()** (line 6260): Clears `submitTimeoutRef`, clears grace period, restores `tappedAnswer` and `tapCount` to the pending values, sets `justUndone=true`, clears `pendingSubmit`.
- Undo is **pre-commit only** -- it cancels the pending timeout before `finalizeSubmit` runs. There is no post-commit undo (no Supabase delete/rollback).
- Undo window = `undoDelay` setting (default: 1s, range: 0-3s, step: 0.5s).
- After undo: shows "Undone -- tap to change or resubmit" banner with a Clear button.

---

## Issues by Severity

### Critical

**(none)**

The flow is fundamentally sound. The pre-commit undo pattern is the correct architecture for this use case -- answers don't hit the database until the undo window expires. No data corruption path exists.

---

### High

#### H1. No network failure handling on captureResponse (line 820-843)

`captureResponse()` is fire-and-forget. If Supabase is unreachable:
- The `console.error` fires (line 840), but **the user is never informed**.
- The local answer is saved to localStorage, so the user's session is intact.
- But the Supabase record is **permanently lost**. There is no retry queue, no offline buffer, no reconciliation on reconnect.

**Impact:** PWA/homescreen users on flaky connections will silently lose cloud data. localStorage stays correct, but their Supabase profile becomes incomplete.

**Fix:** Implement a retry queue. On failure, push the response to a `pendingSync` array in localStorage. On next successful Supabase call (or on `navigator.onLine` event), drain the queue.

**Why:** This is the primary reliability gap. The local-first architecture is excellent, but the cloud sync has no resilience.

#### H2. undoDelay=0 bypasses all safety (line 6193-6194)

When `undoDelay` is set to 0 in Settings, `finalizeSubmit()` fires **synchronously inside `submitAnswer()`** -- no timeout, no undo window, no overlay. The answer is immediately written to localStorage and sent to Supabase.

**Impact:** A user who sets undoDelay=0 has zero recourse for accidental taps. This is a user-chosen setting, but the UI doesn't warn about the consequence.

**Fix:** Either (a) set minimum undoDelay to 0.5s, or (b) show a warning when the user drags to 0: "Undo disabled -- answers are instant and irreversible."

**Why:** Philip said "undo window IS the safety net." With undoDelay=0, there is no safety net.

#### H3. No post-commit undo / answer change mechanism (finalizeSubmit, line 6202)

Once `finalizeSubmit()` runs:
- localStorage is overwritten with the new answer (line 6206).
- Supabase gets an `INSERT` (line 837) -- not an `UPSERT`. Multiple answers to the same question create **duplicate rows**, not updates.
- The question is marked `isAnswered=true` and buttons become disabled.
- `goToNext()` advances immediately (line 6257).

There is **no way to change an answer after the undo window closes**. The AnsweredQuestionView (line 4833 comment) says "no change answer - locked after undo."

**Impact:** If a user genuinely misunderstood a question and submitted, they're stuck. The Supabase INSERT (not UPSERT) means re-answering would create duplicates anyway.

**Fix:** This is a product decision, not necessarily a bug. But the INSERT vs UPSERT should be resolved -- if re-answering is ever added, the current schema will create duplicate rows. Consider `UPSERT` on `(session_id, question_id)` or `(email, question_id)` now.

**Why:** Data integrity. Duplicate rows in `responses` for the same user+question is a latent schema issue.

---

### Medium

#### M1. Grace period allows confidence change but not answer change (line 6118-6137)

During the 600ms grace period after submission, tapping the **same** answer increases confidence. But tapping a **different** answer is silently ignored (line 6140: `if (pendingSubmit) return`).

**Impact:** If a user submits YES then immediately realizes they meant NO, they must wait for the grace period to end, then use the undo overlay. The grace period adds 600ms of confusion where tapping the other button does nothing.

**Fix:** During grace period, allow tapping a different answer to switch the pending answer (clear current timeout, set new pending).

**Why:** Accidental taps are the exact scenario Philip asked about. The 600ms grace period is a window where a course-correction is impossible.

#### M2. No `aria-label` attributes anywhere in answer buttons (lines 5360-5480, 5483-5570)

The BinaryButtons and MCButtons components use `<button>` elements (good) but have:
- No `aria-label` on YES/NO buttons
- No `aria-label` on multiple choice options
- No `role` attributes on the UndoBar overlay
- No `aria-live` region for the "Undone" banner or the "Tap anywhere to Undo" text
- The full-screen undo overlay (line 9136) is a `<div>` with `onClick` -- no keyboard handler, no `role="button"`, no `aria-label`

**Impact:** Screen reader users cannot identify what the buttons do, cannot hear the undo prompt, and cannot trigger undo via keyboard alone (the Escape key handler exists but only on the question screen -- line 6300).

**Fix:**
- Add `aria-label="Yes"` / `aria-label="No"` to binary buttons
- Add `aria-label` with the option text to MC buttons
- Add `role="alert"` and `aria-live="assertive"` to the undo banner
- Add `role="button"` and `aria-label="Undo answer"` to the undo overlay div

**Why:** WCAG 2.1 Level A compliance. Buttons must have accessible names.

#### M3. Touch target height for MC buttons is 40px (line 5542)

MC option buttons have `h-[40px]` -- below the 44px WCAG/Apple minimum for touch targets.

Binary buttons are `h-[57px]` -- well above the minimum. Only MC buttons are undersized.

The gap between MC buttons is `space-y-1` (4px) which makes the effective target even smaller due to spacing.

**Impact:** Users with motor impairments or large fingers may mis-tap on MC questions.

**Fix:** Increase MC button height to `h-[44px]` minimum. Consider increasing `space-y-1` to `space-y-1.5` or `space-y-2`.

**Why:** WCAG 2.5.5 Target Size (Enhanced) requires 44x44px. Even WCAG 2.5.8 (minimum) requires 24x24px, but Apple HIG and Material Design both recommend 44px.

#### M4. Auto-submit mode has 400ms debounce but no visual indication (line 6155-6158)

When `requireConfirmation=false`, tapping an answer starts a 400ms timeout before `submitAnswer` fires. During this 400ms:
- The button shows as selected (visual feedback exists)
- But there's no indication that submission is imminent
- A second tap on the same answer during this window increases confidence and resets the 400ms timer
- A tap on a different answer switches the selection and resets the 400ms timer

**Impact:** The 400ms is actually well-designed for multi-tap confidence. But users don't know the answer will auto-submit. The only hint is a Tip Banner that says "Confident? Tap up to four times."

**Fix:** Minor -- consider a subtle pulse or countdown on the selected button during the 400ms, or a small "submitting..." indicator.

**Why:** User expectation management. Without the checkmark, there's no clear moment of "I chose this."

#### M5. Swipe navigation disabled during pending but not during grace period ambiguity (line 6098-6099)

Swipe is disabled when `pendingSubmit` is truthy (good). But after undo, `pendingSubmit` is cleared and `justUndone` is set -- swipe is re-enabled. A user who undoes and then swipes away will navigate to the next question, losing their selection.

`goToNext` does clear `justUndone` (line 6056), so state is clean. But the user's intent to re-answer is lost silently.

**Impact:** Minor confusion after undo -- the user's re-tap selection disappears if they accidentally swipe.

**Fix:** Consider keeping swipe disabled while `justUndone` is true, or at minimum while `tappedAnswer !== null`.

---

### Low

#### L1. `btn-feedback` active state uses `transform: scale(0.96)` (line 277)

The CSS `btn-feedback:active` applies `transform: scale(0.96)` globally. This is good tactile feedback but:
- No `prefers-reduced-motion` media query wrapping
- The scale happens on ALL buttons, not just answer buttons

**Impact:** Users who prefer reduced motion still get the scale animation.

**Fix:** Wrap the transform in `@media (prefers-reduced-motion: no-preference) { ... }`.

#### L2. localStorage write failure silently swallowed (line 3345)

`demoStorage.set()` wraps `localStorage.setItem` in try/catch with empty catch. If localStorage is full (5MB limit on some browsers, especially Safari PWA), the answer is lost silently.

**Impact:** Extremely rare, but in a "pinned to homescreen" PWA scenario with lots of data, this could happen.

**Fix:** Show a toast notification on storage failure: "Storage full -- your answer may not be saved."

#### L3. The undo overlay uses both `onClick` and `onTouchEnd` (line 9138-9139)

The mobile portal overlay (line 9135-9143) uses both `onClick` and `onTouchEnd` with `e.preventDefault()`. On touch devices, this could theoretically fire the handler twice (once for `touchend`, once for the synthetic `click`). The `preventDefault()` on `touchend` should prevent the synthetic click, but this is a fragile pattern across browsers.

**Impact:** Theoretical double-fire of `handleUndo`. In practice, `handleUndo` is idempotent (clearing an already-null `pendingSubmit` is a no-op), so no actual bug occurs.

**Fix:** Use only `onTouchEnd` with `preventDefault` on mobile, or only `onClick`. The current dual-handler works but is fragile.

#### L4. Desktop undo overlay uses both `onClick` and `onMouseDown` (line 9715-9716)

Similar to L3, the desktop overlay fires `handleUndo` on both `mousedown` and `click`. Since `mousedown` fires first, `pendingSubmit` is cleared by the time `click` fires, making the second call a no-op. Still redundant.

**Impact:** None in practice -- `handleUndo` is idempotent.

**Fix:** Use only `onMouseDown` (faster response) or only `onClick` (more standard).

#### L5. No focus management after answer submission (line 6257)

After `finalizeSubmit`, `goToNext()` changes `currentIndex`. The next question renders, but keyboard focus is not explicitly set to anything. A keyboard user would need to Tab around to find the new answer buttons.

**Impact:** Keyboard-only users lose context after each answer.

**Fix:** After `goToNext()`, focus the first answer button or the question text.

---

## Hard Gates

| Gate | Status |
|------|--------|
| WCAG contrast | Not tested in this review (visual concern -- Look's domain) |
| Keyboard navigation | PARTIAL -- Y/N/1-5 keys + Escape work (line 6280-6335), but no Tab focus management after answer, no keyboard trigger for undo overlay |
| Console errors | PASS -- no unhandled errors in the answer flow; Supabase failures are caught |
| Unhandled rejections | PASS -- `captureResponse` has try/catch equivalent (async with error check) |
| Network failures | FAIL -- Supabase failures are logged but not retried or queued (H1) |

---

## Verified OK

- [x] **Double-tap protection:** Tapping the same answer increases confidence (1-4 scale); tapping during `pendingSubmit` outside grace period is blocked by `if (pendingSubmit) return` (line 6140) and the full-screen overlay intercepts all taps to trigger undo
- [x] **Undo mechanism exists:** Pre-commit cancellation via `handleUndo()`, configurable window 0-3s, default 1s
- [x] **Undo visual feedback:** UndoBar component with sweep animation, "Tap anywhere to Undo" text, "Undone" banner after undo
- [x] **State: Empty (no questions):** `goToNext()` falls through to `setScreen('categories')` when no unanswered questions remain (line 6058)
- [x] **State: Loading:** Not applicable -- questions are bundled in the HTML, no async load
- [x] **State: Success:** Answer written to localStorage + Supabase, XP calculated, streak updated, auto-advance
- [x] **State: Undo:** `justUndone` state shows banner, restores tapped selection, allows re-submit or change
- [x] **PWA detection:** `useDisplayMode()` correctly detects standalone/homescreen mode (line 3365-3383) and adjusts overlay behavior
- [x] **Tap -> visual response:** `btn-feedback:active` fires on touch/click with `transition: 0.1s` (line 271), well under 100ms. Button color change is synchronous React state update.
- [x] **Local data integrity:** localStorage is the source of truth. `demoStorage.get/set` with try/catch. Answer written atomically (single `setItem` call).
- [x] **Binary button touch targets:** 57px height, well above 44px minimum
- [x] **Swipe disabled during pending:** `enabled: screen === 'question' && !pendingSubmit` (line 6099)
- [x] **Keyboard shortcuts:** Y/N, 1-5, Escape for undo (line 6280-6304)

---

## Stress Test: "What breaks if a user rage-taps the answer buttons?"

### Scenario 1: Rage-tapping YES repeatedly (requireConfirmation=true)

1. First tap: `tappedAnswer=0, tapCount=1`. Button highlights. Checkmark appears.
2. Second tap: `tapCount=2`. Confidence increases. Stars update.
3. Third tap: `tapCount=3`. Same.
4. Fourth tap: `tapCount=4`. Max confidence. Capped by `Math.min(tapCount + 1, 4)`.
5. Fifth+ taps: `tapCount` stays at 4. No further effect. No submission.

**Result: SAFE.** Nothing submits until checkmark is tapped. Rage-tapping just maxes confidence.

### Scenario 2: Rage-tapping YES repeatedly (requireConfirmation=false, auto-submit)

1. First tap: `tappedAnswer=0, tapCount=1`. 400ms timer starts.
2. Second tap (within 400ms): `tapCount=2`. Timer reset to 400ms.
3. Third tap (within 400ms): `tapCount=3`. Timer reset.
4. Fourth tap (within 400ms): `tapCount=4`. Timer reset.
5. Fifth+ taps (within 400ms): `tapCount` stays at 4, timer keeps resetting.
6. User stops tapping. 400ms passes. `submitAnswer(0, 4)` fires. Undo overlay appears.
7. Any further taps hit the undo overlay -> `handleUndo()` fires.

**Result: SAFE.** The 400ms debounce absorbs rage-taps. Only one submission occurs.

### Scenario 3: Rage-tapping YES then NO rapidly (auto-submit)

1. Tap YES: `tappedAnswer=0, tapCount=1`. 400ms timer starts.
2. Tap NO (within 400ms): `tapTimeoutRef` cleared (line 6142), `tappedAnswer=1, tapCount=1`. New 400ms timer.
3. 400ms passes: `submitAnswer(1, 1)` -- NO is submitted.

**Result: SAFE.** Last answer wins. The `tapTimeoutRef` clear prevents dual submission.

### Scenario 4: Rage-tapping during undo window

1. Answer submitted. Undo overlay appears.
2. Rage-tapping: Each tap hits the overlay, calling `handleUndo()`.
3. First `handleUndo()`: Clears `pendingSubmit`, restores selection, sets `justUndone=true`.
4. Subsequent taps: `pendingSubmit` is already null. `handleUndo()` runs but `if (pendingSubmit)` on line 6265 is false -- it just calls `setPendingSubmit(null)` on an already-null value. No-op.

**Result: SAFE.** `handleUndo` is idempotent. Rage-tapping the overlay just triggers one undo.

### Scenario 5: Rage-tapping after undo (justUndone=true)

1. Undo completed. Banner shows "Undone -- tap to change or resubmit."
2. Previous answer is restored as `tappedAnswer` + `tapCount`.
3. User rage-taps the same button: confidence increases up to 4, same as Scenario 1/2.
4. User taps checkmark (if requireConfirmation) or waits 400ms (if auto): new submission with updated confidence.

**Result: SAFE.** Normal flow resumes after undo.

### The One Edge Case

**Scenario 6: Tap answer + immediately tap checkmark (requireConfirmation=true)**

1. Tap YES: `tappedAnswer=0, tapCount=1`. Checkmark appears.
2. Immediately tap checkmark: `submitAnswer(0, 1)` fires.
3. `pendingSubmit` set, undo timer starts.
4. If user has another tap queued from the rapid sequence: it hits `if (pendingSubmit && inGracePeriod)` -- if it's the same answer, confidence increases. If different answer, `if (pendingSubmit) return` blocks it.

**Result: SAFE.** The grace period absorbs the extra tap gracefully.

---

## Summary

The answer flow is **well-architected for its core use case**. The pre-commit undo pattern is the right call -- it's fast, forgiving, and avoids the complexity of post-commit rollback. The multi-tap confidence system is cleverly debounced.

**Three things to fix before shipping to real users:**

1. **H1: Supabase retry queue** -- the biggest gap. Local-first is great, but cloud sync needs resilience.
2. **H2: undoDelay=0 warning** -- if the undo window is the safety net, don't let users turn it off without knowing.
3. **M2: Accessibility labels** -- screen reader users are currently locked out of the answer flow.

Everything else is quality-of-life improvement.

---

*Reviewed: 2026-02-05 | Reviewer: Work | File: `/Users/philipsilva/Code/Aura/index.html` (9764 lines)*
