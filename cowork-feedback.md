# Cowork Feedback — Round 3 (Phase 6 Complete + Phase 7 Instructions)

## Review Verdict: Phase 6 is done. Clean work.

The backfill implementation is solid — `upsert` with `onConflict`, auth-gated, defensive `resp.answer ?? resp` for format flexibility, chained after `syncOnLogin` with shared `syncDoneRef` gate. No issues.

---

## What You're Doing Well

1. **Following directions precisely.** Every item addressed as asked, no over-engineering, no extras.
2. **Net negative lines.** -40 then +16 — you're tightening, not bloating.
3. **Defensive coding.** The `resp.answer ?? resp` in backfill handles both response object and raw value formats. The `bridgeStarted` ref properly resets when leaving the screen.
4. **Correct data flow.** Response capture → localStorage → backfill on sign-in → Supabase. Assessment complete → cloud sync → profile summary update. The chain is complete.

## What to Improve

### A. Stop using IIFEs in JSX for simple color lookups

You cleaned up the CategoryScreen IIFEs (good), but the pattern still exists in code you touched indirectly. When you encounter `{(() => { const c = colorOf(...); return <div>...</div>; })()}` where the only reason for the IIFE is to scope a variable, refactor it. Put the variable above the return, or use a config array + `.map()`. IIFEs in JSX are a code smell in this codebase — the lego audit banned them for components you write.

This doesn't apply to pre-existing IIFEs in code you didn't touch (like the track selector or assess-picker hero). Don't go refactoring things you weren't asked to change.

### B. Don't add comments that just restate the code

`{/* Action modals triggered from action bar */}` followed by `{/* Action modals */}` was redundant (you fixed this). But more broadly: comments like `// Cloud sync (fire-and-forget)` or `// Persist` are fine because they explain *why*. Comments like `// Screen router` above `const renderContent` are noise — the function name says it. When you add comments, ask: "Does this tell me something I can't see from the code?" If not, skip it.

### C. When verifying end-to-end flows, report edge cases you found

You said "no dead ends" but didn't mention the gap I can see: **the assess-results screen has no link to analysis.** After completing a test, a user can go back to the picker or follow the nudge to the next test, but there's no "View your full analysis" or "See your profile" action. This means a user who finishes their first test and wants to see their results in context has to navigate: back to picker → 📊 icon in the nav. That's two taps and a non-obvious icon. This isn't a Phase 6 blocker, but you should have flagged it.

### D. Checkpoint files

You're creating `index-CP-1.html` and `index-CP-2.html` as snapshots. Good instinct for safety. But these are now stale (they're from before your fixes). After this round, delete the old checkpoints and create a fresh `index-CP-3.html` as the Phase 6 complete baseline. One current checkpoint, not a trail of old ones.

---

## Phase 7: Polish

Phase 6 is complete. Phase 7 is about making every screen feel finished. Here's the work, in priority order.

### 1. Results → Analysis link (UX gap)

On `AssessResultsScreen`, add a subtle link to analysis below the nudge card (or below results if no nudge). Only show it when 2+ assessments are completed (analysis needs data to be meaningful):

```jsx
{Object.keys(assessCompleted).length >= 2 && (
  <button onClick={() => onNavigate('assess-analysis')} className="...">
    <Text size="xs" emphasis="subtle">📊 View full analysis</Text>
  </button>
)}
```

Also add a "View Profile" link so users can see their aura visualization after their first test.

### 2. Light mode verification pass

Go through every screen in light mode and check:
- Text is readable (no white-on-white, no barely-visible faint text)
- Borders are visible (dark mode uses `rgba(255,255,255,0.06)` which is invisible in light)
- Gradients look intentional (not washed out or too strong)
- Cards and sections have clear visual hierarchy

Screens to check (in this order):
1. Categories hub
2. Question flow (binary + MC)
3. Assess picker
4. Assess question (Likert scale)
5. Assess results
6. Profile
7. Analysis
8. Settings
9. QotD

For each screen, if light mode looks wrong, fix it. Most fixes will be `isDark ? 'dark value' : 'light value'` adjustments.

### 3. Results screen — missing link to profile from QP

After completing Quick Profile, the results screen shows spectrum bars and a nudge to the next test. But there's no link to the Profile screen where the aura visualization lives. The user completed their first assessment and can't easily see their aura.

Add a "See your Aura →" card/button on the QP results screen that navigates to `'profile'`.

### 4. Categories hub — progress indicators

The category cards currently disable when `unanswered === 0` but don't show progress. Add a subtle progress indicator — either:
- Small text like "12 left" or "✓ Done" below the category name
- A thin progress bar at the bottom of each card
- A completion checkmark overlay

Keep it minimal. The 2×2 grid cards are compact — don't bloat them.

### 5. Nav consistency check

Several screens have back buttons that go to `assess-picker`:
- AssessResultsScreen → `assess-picker`
- AnalysisScreen → `assess-picker`
- CompareScreen → `assess-picker`
- ProfileScreen → `categories`
- HistoryScreen → `profile`

These should make sense from the user's perspective. Analysis and Compare should probably go back to wherever the user came FROM (could be profile, could be picker). If that's too complex for now, at least make Analysis go to `categories` (the hub) instead of `assess-picker`.

### 6. Strip dev-only UI for production readiness

The dev panel and demo controls are gated behind `IS_DEV` and 5-tap gesture, which is correct. But verify:
- `IS_DEV` returns false on `aura-player-one.vercel.app`
- Demo profiles don't leak into production state
- No `console.log` spam in production (keep `console.warn` for errors only)

### 7. Clean up stale checkpoint files

Delete `index-CP-1.html` and `index-CP-2.html`. Create `index-CP-3.html` as the Phase 6 complete baseline.

---

## What NOT to do

- **No new features.** Phase 7 is polish, not feature development.
- **No layout changes** to the question flow. Answer buttons, undo, confidence — all locked.
- **No refactoring** of code you weren't asked to touch.
- **Don't change the color system.** TOKENS.md is law.
- **Don't touch Supabase wiring.** Phase 6 is done.

## Priority: 1 (results links) > 2 (light mode) > 4 (progress indicators) > 5 (nav consistency) > 3 (QP profile link) > 6 (dev strip) > 7 (checkpoints)
