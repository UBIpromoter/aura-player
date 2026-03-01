# Cowork Feedback — Round 4 (CP-13 Review + Builder Self-Review)

## Verdict: Good work, 4 bugs, several gaps. Fix pass required.

CP-11/12/13 are all verified and well-executed. But two independent code reviews (executive + builder self-review) found 4 critical bugs, 7 important issues, and several minor cleanups. 3 Phase 7 items from the original brief were also skipped.

This round: fix the bugs, close the gaps, clean up. No new features.

---

## CRITICAL — Will break. Fix first.

### C1. HistoryScreen confidence label off-by-one (~line 3486)

`CONFIDENCE_LABELS` is indexed 0-3 but confidence values are 1-4. `CONFIDENCE_LABELS[4]` is `undefined`. The Confidence component correctly uses `labels[value - 1]` (line 1062) but HistoryScreen doesn't.

**Fix:** `CONFIDENCE_LABELS[q.response.confidence - 1]`

### C2. Markdown export reads wrong localStorage key + no error handling (~line 3752)

The Markdown export reads from `STORAGE_KEY` and accesses `.answers` off the parsed result. The JSON export reads from `'aura-responses'` which is never written. Neither uses the in-memory `responses` state. Both will produce empty output. Additionally, if localStorage is corrupted, both silently export nothing.

**Fix (two parts):**
1. SettingsScreen should receive `responses` as a prop from App. Both export handlers should use that prop directly instead of reading localStorage. Update the SettingsScreen call site in the App router to pass `responses={responses}`.
2. Wrap both export handlers in try/catch. On failure, show a toast ("Export failed") rather than silent nothing.

### C3. Keyboard shortcut useEffect has stale closure risk (~line 2127)

Deps are `[activeModal, isAnswered, pendingSubmit, isBinary, currentIndex]` but the handler calls `goToPrev`, `goToNext`, `handleAnswerTap`, `handleUndo` — none of which are in the dep array. These functions close over state that changes across renders. The `currentIndex` dep partially masks this but any other state change will leave stale function references.

**Fix:** Add `goToPrev, goToNext, handleAnswerTap, handleUndo` to the dependency array.

### C4. Evidence reset is bare conditional logic in the render body (~line 2102)

The evidence-collapse-on-question-change logic is a bare `if` in the component body, not in a `useEffect`. It works incidentally because the state change triggers a re-render, but it's fragile — any refactor that changes render order could break it, and it sets state during render which React discourages.

**Fix:** `useEffect(() => { setEvidenceExpanded(false); }, [currentQuestion?.id]);` — replace the bare conditional with a proper effect.

---

## IMPORTANT — Fix before ship.

### I1. Retry queue: optimistic clear + no concurrency guard (~line 597)

Two problems:
1. `setRetryQueue([])` runs before the processing loop. If the tab closes mid-loop, unprocessed items are gone.
2. Concurrent calls to the retry processor (e.g., rapid auth state changes) can duplicate operations.

**Fix:** Add a `processingRef = useRef(false)` guard at the top of the processor. If already processing, bail. Remove items individually as they succeed rather than clearing upfront.

### I2. SyncIndicator has no onRetry handler (~line 4152)

`<SyncIndicator status={syncStatus} />` renders but never passes `onRetry`. The "failed" state shows "Sync failed" with no recovery path. The retry button is gated behind `onRetry` so it never appears.

**Fix:** Add a `processRetryQueue` method to `useCloudSync` return value. Pass it as `onRetry` at the CategoryScreen call site.

### I3. Double haptic on answer tap (~line 1894 + 1897)

Line 1894 fires `haptic(HAPTIC.tap)` unconditionally on every answer tap. Line 1897 fires `haptic(HAPTIC.confidence)` when tapping the same answer (confidence escalation). On a confidence bump, the user gets both vibrations back-to-back.

**Fix:** Line 1894 `haptic(HAPTIC.tap)` should only fire when `tappedAnswer !== answer` (new answer selection). When it IS the same answer, only the confidence haptic should fire.

### I4. Hardcoded colors — TOKENS.md is law

This was flagged as minor in the first review, but TOKENS.md compliance is a Critical Rule in CLAUDE.md. Promoting.

CommunityBar (~lines 3410-3420): uses `'#4ade80'`, `'#f87171'`, `'#dc2626'` instead of `COLOR_HEX` constants.
Evidence panel (~line 1828): `isDark ? '#34d399' : '#059669'` instead of CSS vars or `COLOR_HEX.emerald`.
IdentityOnboardingFlow (~line 3550): `rgba(52,211,153,0.15)` hardcoded.

**Fix:** Replace all with `COLOR_HEX.*` or `colorOf()` equivalents. Check the existing color constants in the file and match their pattern.

### I5. _scrollCache grows unbounded (~line 868)

Module-level object with no size limit. Current screens are fine (~15 keys), but the architecture invites misuse.

**Fix:** Cap at 20 entries. When adding a new entry and cache is full, evict the oldest (or just clear the whole thing — these are scroll positions, not precious data).

### I6. CommunityBar division-by-zero edge case

If `evaluators` is 0 after the guard, the percentage calculation divides by zero. The guard may not catch all paths.

**Fix:** Add `if (!evaluators) return null;` or default to 0%.

### I7. Light mode pass — NOT DONE

The original Phase 7 brief (cowork-feedback.md, item 2) asked for a light mode verification on all 9 screens. This was skipped. Before ship, every screen needs to be checked in light mode. You have UI inspection capability — use it.

Screens to verify (toggle with the theme button in settings):
1. Categories hub
2. Question flow (binary + MC)
3. Assess picker
4. Assess question (Likert scale)
5. Assess results
6. Profile
7. Analysis
8. Settings
9. QotD

For each: text readable? Borders visible? Gradients intentional? Fix any white-on-white, invisible borders, or washed-out gradients.

### I8. Nav consistency — AssessResults back button (~line 2850)

AnalysisScreen was correctly updated to go back to `'categories'`. But AssessResultsScreen still goes to `'assess-picker'`. After finishing a test, "back" should take you to the hub, not the picker.

**Fix:** Change the AssessResultsScreen back navigation target to `'categories'`.

---

## MINOR — Clean up in this pass.

### M1. IIFE re-parses localStorage on every render (~line 3588)

The IdentityScreen "about you" section uses an IIFE that calls `JSON.parse(localStorage.getItem(...))` on every render. Read it into state once with `useState(() => ...)` or `useMemo`.

### M2. URL.createObjectURL memory leak in exports (~lines 3749, 3767)

Both export handlers create object URLs but never revoke them. Add `setTimeout(() => URL.revokeObjectURL(url), 1000)` after the click trigger.

### M3. IdentityOnboardingFlow setTimeout cleanup (~line 3522)

The 300ms step-advance timeout has no cleanup. If the component unmounts during the delay, `setStep` fires on an unmounted component and `localStorage.setItem` runs unexpectedly.

**Fix:** Store the timeout in a ref, clear on unmount.

### M4. ErrorBoundary Try Again doesn't remount (~line 1460)

Clicking "Try Again" resets error state but re-renders the same child instance. If the child's initial render throws (bad data), it errors again immediately.

**Fix:** Add a `key={this.state.resetCount}` pattern — increment a counter on reset, use it as key on the children wrapper to force remount.

### M5. Identity text input needs maxLength (~line 3537)

No length limit on the location text input. User could paste 100KB.

**Fix:** Add `maxLength={100}` (or similar reasonable limit).

---

## CLEANUP — Housekeeping.

### H1. Delete stale checkpoint files

The noodle/rebuild/ directory has 9 checkpoint files (CP-3 through CP-13). Keep only `index-CP-13.html` as the current baseline. Delete the rest.

### H2. Identity text input auto-select

LESSONS.md says "any input that may contain existing text" should auto-select on focus. The identity location text input (~line 3537) doesn't have `onFocus={(e) => e.target.select()}`. If the user navigates back to step 3, existing text won't be selected.

---

## Decided against (and why)

**questionMeta "over-lifted" to App** — Two consumers (QuestionFlowScreen writes, HistoryScreen reads) is exactly when you lift to the common parent. A custom hook is cleaner in theory but it's a refactor, not a fix, and the re-render cost of flagging a question is negligible. Defer to a future cleanup pass.

**Retry queue helpers to hook scope** — They're pure functions with no side effects at module scope. Moving them doesn't change behavior. Not worth the churn.

---

## What NOT to do

- No new features. This is a fix pass.
- No layout changes to the question flow.
- No refactoring of code you weren't asked to touch.
- Don't change the color system — use the existing `COLOR_HEX` / `colorOf()` pattern.
- Don't touch Supabase wiring beyond the retry queue fix.

## Priority order

C1 → C2 → C3 → C4 → I1 → I2 → I3 → I4 → I5 → I6 → I8 → M1-M5 → H1-H2 → I7 (light mode pass LAST — do after all code fixes so you're inspecting the final state)

After completing all fixes, create `index-CP-14.html` as the clean baseline.

## Line budget

Current: 5,845. Target: stay under 5,900. The fixes are mostly corrections, not additions. The light mode pass may add a few isDark ternaries but shouldn't bloat significantly.
