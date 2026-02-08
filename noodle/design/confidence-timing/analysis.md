# Confidence Grace Period Timing Analysis

## Status

The `CONFIDENCE_GRACE_PERIOD` in production `index.html` (line 6904) is **already set to 1200ms**. The MEMORY.md note referencing 600ms is stale -- the value was bumped from 600 to 1200 at some point during the simplification/playtest sprint. Older noodle copies and archived checkpoints still show 600ms.

---

## What the Grace Period Controls

The grace period governs a **post-submit multi-tap window** for increasing confidence on an already-submitted answer. Here is the full sequence:

### Flow (requireConfirmation: true -- current default)

1. User taps an answer button (e.g., YES). This **selects** it visually (ring, gradient, star count = 1).
2. User can multi-tap the same button to increase tapCount (1-4 stars).
3. User taps the checkmark to call `submitAnswer(answer, tapCount)`.
4. `submitAnswer` sets `pendingSubmit = { answer, confidence, community }`, clears the tap state, starts the undo countdown (`undoDelay * 1000` ms, default 1s), and opens the grace period.
5. **During the grace period (1200ms):** if the user taps the *same* answer button again, confidence increments by 1 (up to 4). The grace timeout and undo timeout both reset on each additional tap.
6. After grace period expires OR `finalizeSubmit` fires (whichever comes first), `inGracePeriod` is set to false. Any further taps are ignored.
7. `finalizeSubmit` writes the answer + confidence to storage, awards XP (bonus +2 for confidence >= 3), and advances to the next question.

### Flow (requireConfirmation: false -- auto-submit mode)

1. User taps an answer button. A 400ms `tapTimeoutRef` starts.
2. Additional taps on the same button before 400ms expires increment tapCount and reset the 400ms timer.
3. After 400ms of inactivity, `submitAnswer` fires automatically.
4. Same grace period logic applies post-submit: user can still tap to increase confidence during the 1200ms window.

### Key interaction: Grace Period vs. Undo Delay

- Default `undoDelay` = 1s (1000ms). Grace period = 1200ms.
- The grace period is **longer** than the undo delay. This means the grace window outlasts the undo bar.
- However, each additional tap during grace **resets both timers** (grace timeout and submit timeout). So the effective sequence is: tap -> reset undo to 1s, reset grace to 1.2s -> repeat.
- If the user does NOT tap again, `finalizeSubmit` fires at 1000ms (undo delay), which calls `setInGracePeriod(false)` -- ending the grace period early. So in practice, the grace period is capped by whichever fires first: the grace timeout (1200ms) or finalize (undoDelay).
- With default settings: finalize at 1000ms terminates grace before the 1200ms timeout fires. The grace window is effectively 1000ms, not 1200ms.

---

## Analysis: Is 1200ms Appropriate?

### What 600ms felt like (the old value)

The Feel specialist review (noodle/design/reviews/feel-answer-buttons.md, line 28) called 600ms "smart" but noted it in the context of the broader timing concern (M5: "1s undo delay too short for new users"). At 600ms with a 1s undo delay, the grace period was genuinely too short -- a thoughtful user who takes 700ms between taps would miss the window entirely.

### What 1200ms feels like (current value)

At 1200ms, the grace period nominally exceeds the undo delay. But because `finalizeSubmit` terminates grace early, the effective grace window equals `undoDelay` (1000ms by default). This is a significant improvement over 600ms but still means:

- A user must re-tap within 1 second of their submit to boost confidence.
- On mobile, where motor latency is higher and the visual feedback of the undo bar sweep might distract, 1 second is tight for someone who is *reading* the undo bar and *then* deciding to add confidence.

### The real question: Does the grace period even serve its intended purpose?

The grace period is designed for this scenario: "I submitted at confidence 2 but actually I feel more like a 3." But there are UX problems with this:

1. **After submit, tap state is cleared.** `submitAnswer` calls `setTappedAnswer(null)` and `setTapCount(0)`. The button visual resets. The user sees the UndoBar overlay, not their answer buttons. To tap again during grace, they are tapping *through* or *on* the undo bar area -- the answer buttons are dimmed/covered.

2. **The undo bar itself is a tap target for undo.** The UndoBar component has `onClick={onUndo}` on its outer div. So tapping in the answer area during the undo bar's presence triggers undo, not confidence increase -- unless the tap specifically hits the answer button underneath. This creates a confusing interaction where the *same physical gesture* (tap in the answer zone) means different things depending on exactly where you tap.

3. **The user has no visual cue that confidence can still be increased.** After submit, the confidence segments and star indicators disappear (tap state cleared). Nothing on screen says "tap again to increase confidence." The user would have to discover this by accident.

Given these three issues, the grace period's post-submit confidence boost is largely a **phantom feature** -- technically functional but practically invisible.

---

## Recommendations

### Option A: Keep 1200ms, Fix the Interaction (Recommended)

The timing value itself is reasonable. The problems are UI/UX, not timing:

1. **Don't clear tap state on submit.** Keep `tappedAnswer` and `tapCount` visually active during the grace period so the user can see their current confidence and intuitively tap to increase it.
2. **Make the UndoBar pass through taps to answer buttons** during the grace period, or provide a distinct "boost confidence" tap target within the undo bar itself.
3. **Add a visual hint** during grace period -- pulse the confidence segments, or show a brief "tap to increase confidence" label.

If these three changes land, 1200ms is generous enough for most users. The grace timeout resets on each tap, so a user who taps slowly (e.g., 1 tap per second) still gets a full 1200ms window after each tap.

### Option B: Increase to 1500ms

If fixing the interaction is out of scope, bumping to 1500ms adds a 500ms buffer after the default 1s undo delay. This means even after `finalizeSubmit` fires, the grace timeout hasn't expired yet -- but this is meaningless because `finalizeSubmit` explicitly calls `setInGracePeriod(false)`. So increasing the constant alone does nothing unless the finalize call is also changed.

**This option doesn't work without also removing the `setInGracePeriod(false)` from `finalizeSubmit`.** That would be a logic change, not just a timing tweak.

### Option C: Adaptive Grace Period

Scale the grace period based on user behavior:

```
const CONFIDENCE_GRACE_PERIOD = isFirstSession ? 2000 : 1200;
```

Or track average time-between-taps and set grace = 2x that average. This adds complexity for marginal gain. Not recommended unless user testing reveals a specific failure mode.

### Option D: Remove the Post-Submit Grace Period Entirely

Accept that confidence is set *before* submit (via multi-tap), not after. Remove the grace period logic. This simplifies the state machine significantly:

- Remove `inGracePeriod`, `graceTimeoutRef`, the grace-period branch in `handleAnswerTap`.
- The multi-tap *before* submit (the 400ms `tapTimeoutRef` in auto-submit mode, or the explicit checkmark in confirmation mode) already handles confidence fully.
- The undo button already lets the user take back their answer and re-answer with different confidence.

This is the cleanest path if user testing confirms that nobody uses post-submit confidence boosting (which is likely, given the phantom feature analysis above).

---

## Summary

| Option | Change | Effort | Impact |
|--------|--------|--------|--------|
| A | Fix interaction (keep 1200ms) | Medium | High -- makes the feature actually usable |
| B | Bump to 1500ms | None (broken without logic change) | None |
| C | Adaptive timing | Medium | Low -- complexity for marginal UX gain |
| D | Remove post-submit grace entirely | Low | Medium -- simplifies state machine, relies on pre-submit multi-tap + undo |

**Recommendation: Option D (simplify) or Option A (make it real).** The current grace period is a ghost feature -- it exists in code but is invisible to users. Either make it visible and useful (A) or remove the dead complexity (D).

The 1200ms value itself is not the problem. The interaction design around it is.

---

## Files Referenced

- `/Users/philipsilva/Code/Aura/index.html` -- lines 6804, 6900-6904, 7042-7087, 7100-7131, 7187-7198
- `/Users/philipsilva/Code/Aura/noodle/design/reviews/feel-answer-buttons.md` -- line 28 (600ms note), lines 92-97 (M5 undo delay)
- Archived copies still showing 600ms: `noodle/2026-02-03-component-extraction/index.html`, `archive/old-checkpoints/`
