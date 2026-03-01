# Cowork Feedback — Round 5 (Remaining fixes from code review)

## Context

Two independent reviews (executive + your own self-review) found bugs in the CP-11/12/13 work. Your last session fixed the minors, housekeeping, and light mode — good. But all 4 critical bugs and most important issues are still open. This session: fix them top-down.

**File:** `noodle/rebuild/index.html` (currently 5,860 lines, budget 5,920)

---

## CRITICAL — These are bugs. Fix first, in order.

### C1. HistoryScreen confidence label off-by-one

`CONFIDENCE_LABELS` is a 4-element array indexed 0-3. Confidence values in the response object are 1-4. HistoryScreen accesses `CONFIDENCE_LABELS[q.response.confidence]` directly — so confidence 4 returns `undefined`, and confidence 1 shows "Fair" instead of "Gaps". The Confidence component at ~line 1062 correctly uses `labels[value - 1]`.

**Fix:** `CONFIDENCE_LABELS[q.response.confidence - 1]`

### C2. Export handlers are broken

Two problems:
1. **Wrong data source.** The Markdown export reads `STORAGE_KEY` + `.answers`. The JSON export reads `'aura-responses'` — a key that's never written anywhere. Neither uses the in-memory `responses` state. Both produce empty output.
2. **No error handling.** If localStorage is corrupted, both silently export nothing.

**Fix:**
- Pass `responses` as a prop to SettingsScreen from the App router. Use that prop in both export handlers instead of reading localStorage.
- Wrap both handlers in try/catch. On failure, show a toast ("Export failed").
- After creating the object URL, revoke it: `setTimeout(() => URL.revokeObjectURL(url), 1000)` (this also covers the old M2 memory leak item).

### C3. Keyboard shortcut useEffect has stale closures

The dependency array is `[activeModal, isAnswered, pendingSubmit, isBinary, currentIndex]` but the handler calls `goToPrev`, `goToNext`, `handleAnswerTap`, `handleUndo` — none in the dep array. These functions close over changing state. After a few questions, arrow keys and Y/N can fire with stale references.

**Fix:** Add `goToPrev, goToNext, handleAnswerTap, handleUndo` to the dependency array.

### C4. Evidence reset is bare conditional in render body

The evidence-collapse-on-question-change logic is a bare `if` statement in the component body, not in a `useEffect`. It sets state during render, which React discourages and which breaks if render order changes.

**Fix:** Replace the bare conditional with:
```js
useEffect(() => { setEvidenceExpanded(false); }, [currentQuestion?.id]);
```
Remove the bare `if` block and the `prevQIdRef` that supports it (the useEffect handles the change detection).

---

## IMPORTANT — Fix after criticals, before ship.

### I1. Retry queue: two problems

1. **Optimistic clear.** `setRetryQueue([])` runs before the processing loop starts. Tab closes mid-loop → unprocessed items lost.
2. **No concurrency guard.** Rapid auth state changes can trigger concurrent processing, duplicating operations.

**Fix:** Add `const processingRef = useRef(false)` to useCloudSync. At the top of the queue processor: `if (processingRef.current) return; processingRef.current = true;` At the end (finally block): `processingRef.current = false;` Remove items from the queue individually as they succeed, not all at once upfront.

### I2. SyncIndicator onRetry is orphaned

`<SyncIndicator status={syncStatus} />` renders in the CategoryScreen header but never passes `onRetry`. The retry button in SyncIndicator is gated behind `onRetry`, so on sync failure the user sees "Sync failed" with no way to retry.

**Fix:** Expose a `processRetryQueue` function from `useCloudSync` (it can just re-run the queue processing logic). Pass it as `onRetry` at the call site.

### I3. Double haptic on confidence bump

`haptic(HAPTIC.tap)` fires on every answer tap unconditionally. Then `haptic(HAPTIC.confidence)` fires when tapping the same answer (confidence escalation). User gets both vibrations on a confidence bump.

**Fix:** Only fire `haptic(HAPTIC.tap)` when selecting a *different* answer (`tappedAnswer !== answer`). Confidence bumps should only get the confidence haptic.

### I4. Hardcoded colors (TOKENS.md is law)

Three locations use raw hex/rgba instead of the design system:
- CommunityBar: `'#4ade80'`, `'#f87171'`, `'#dc2626'`
- Evidence panel: `isDark ? '#34d399' : '#059669'`
- IdentityOnboardingFlow: `rgba(52,211,153,0.15)`

**Fix:** Replace with `COLOR_HEX.*` or `colorOf()`. Look at how existing components reference colors and match the pattern.

### I5. _scrollCache unbounded

Module-level `_scrollCache` object grows forever. Cap it.

**Fix:** Before adding a new entry, check `Object.keys(_scrollCache).length > 20` and if so, `Object.keys(_scrollCache).slice(0, 10).forEach(k => delete _scrollCache[k])` — evict the oldest half. Simple, no new data structures.

### I6. CommunityBar division-by-zero

If `evaluators` is 0 after the existing guard, the percentage calculation divides by zero.

**Fix:** Add early return: `if (!evaluators) return null;`

### I8. AssessResults back button nav target

AssessResultsScreen back button goes to `'assess-picker'`. After finishing a test, it should go to `'categories'` (the hub), consistent with AnalysisScreen which was already fixed.

**Fix:** Change the back navigation target to `'categories'`.

---

## Already done (don't redo)

These were completed in your last session:
- ~~M1: IIFE → useMemo~~ ✓
- ~~M2: URL.createObjectURL leak~~ (folded into C2 above)
- ~~M3: setTimeout cleanup~~ ✓
- ~~M4: ErrorBoundary remount key~~ ✓
- ~~M5: maxLength~~ ✓
- ~~H1: Checkpoint cleanup~~ ✓
- ~~H2: Auto-select~~ ✓
- ~~I7: Light mode pass~~ ✓

---

## Rules

- **Work top-down.** C1 first, then C2, C3, C4, then I1 through I8. Not bottom-up.
- No new features. Fix pass only.
- No layout changes to the question flow.
- No refactoring code you weren't asked to touch.
- Use the existing `COLOR_HEX` / `colorOf()` pattern for color fixes.
- Stay under 5,920 lines.
- When done, create `index-CP-15.html` as the clean baseline and delete `index-CP-14.html`.
