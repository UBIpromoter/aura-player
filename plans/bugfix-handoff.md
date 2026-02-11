# Aura Bug Fix Handoff

**Branch:** `feature/organism-viz` at `ef4b1ad`
**Working tree:** Clean
**Date:** 2026-02-09

---

## Four Issues From Smoke Test

Philip opened the app for the first smoke test after the refactor. Found these:

### 1. Work Divider Gap (ATTEMPTED — verify visually)
- **Where:** CategoryScreen, the "WORK" text divider between Self and Work sections
- **Line:** ~6069 (search `DIVIDER — Self ↔ Work`)
- **Problem:** Gap above the Work line was too tall
- **Fix applied:** Changed `my-5` → `my-3`
- **Status:** Edit is in commit `ef4b1ad`. Needs visual confirmation.

### 2. Undo Popup Pushing Content (NOT STARTED)
- **Where:** Main question answering screen
- **Problem:** Two undo-related elements:
  - An undo popup that "gets in the way"
  - An undo submission indicator at the top of the screen that pushes down other content instead of floating over it
- **Philip's rule:** "We NEVER MOVE BUTTONS on the user." Undo indicators must be absolutely positioned, floating over content.
- **What to check:**
  - Undo toast at ~line 10249: `absolute top-1 left-3 right-3 z-30` — looks correct (absolute)
  - "Undone" banner at ~line 10420: `absolute bottom-1` — looks correct (absolute)
  - There may be ANOTHER undo element that ISN'T absolute. Search all undo-related rendering.
  - The `UndoBar` component (~line 6280) is defined but never referenced (`<UndoBar` returns 0 hits) — dead code
- **No screenshots survived** the terminal crash. May need Philip to reproduce and screenshot.

### 3. QOD Going Off Screen (NOT STARTED)
- **Where:** Question answering screen when QOD is active
- **Problem:** "QOD is going off screen. Don't move the buttons. The header is pushing things down."
- **Likely cause:** QOD header/banner taking vertical space in the flow, pushing answer buttons below the viewport
- **Fix direction:** QOD elements should be absolutely positioned or the layout should ensure buttons stay pinned to bottom regardless of header content
- **No screenshots survived.**

### 4. Assessment Page Glow Cutoff (ATTEMPTED — not resolved)
- **Where:** AssessPickerScreen — the Reveal/Assessments hub
- **Problem:** ProgressCircle glow (blurred gradient div) is cut off with hard vertical black edges
- **What was tried:**
  - Removed `overflow-hidden` from hero card button (~line 8154), moved it to inner wrapper for background glow only
  - Removed `overflow-hidden` from expanded category card container (~line 8209)
  - Removed `overflow-hidden` from completed categories container (~line 8447)
- **These edits are in commit `ef4b1ad` but Philip says the issue persists.**
- **What to investigate next:**
  - The scroll container (`overflow-auto` at ~line 8123) may be clipping
  - The ProgressCircle glow is a `blur-md` div inside a fixed-size container (`width: size, height: size`). The blur visually extends beyond but parent backgrounds may paint over it.
  - Check if the z-10 content div's `bg-white/[0.03]` background paints over the glow bleeding from the ProgressCircle
  - Consider changing ProgressCircle glow from a blur div to `box-shadow` on the container itself — box-shadow paints at the element level and wouldn't be covered by sibling backgrounds
  - Or: add negative margin + overflow-visible on the ProgressCircle wrapper to ensure glow escapes the card padding area
  - ProgressCircle component is at ~line 4520

---

## Context

- This is the `feature/clean-lego-blocks` refactor branch's smoke test (8 commits of mechanical extraction into components/hooks)
- The `feature/organism-viz` branch adds new organism viz on top
- Both need to merge to `main` eventually
- The bug fixes are UI/layout issues, not related to the refactor or viz work

## Key Files

- `index.html` — everything lives here (single-file React app)
- ProgressCircle component: ~line 4520
- CategoryScreen (Work divider): ~line 6004
- AssessPickerScreen (glow issue): ~line 8174
- Question screen (undo/QOD issues): ~line 10146
