# AURA Lessons Learned

> Read this before every task. Add new lessons when mistakes happen.
> Format: **Mistake → Root Cause → Rule → Example**

---

## React Patterns

- **Stale state in useEffect** → useState doesn't update inside effects → Use useRef for values that need to persist without re-renders
  - Example: `guestStartCountRef` for nudge logic

- **Wrong reset function** → getInitialState has demo data (20 answers) → Use `getEmptyState()` for true reset

---

## Data Rules

- **Reused question ID** → Corrupts responses → **NEVER reuse IDs** — always increment (check comment for max)

- **Deleted/reordered assessment questions** → Breaks stored response indexes → **NEVER delete or reorder** — only add to END

- **Question still showing after removal** → Deletion isn't tracked → Use `x:1` to archive, don't delete

---

## Git Mistakes

- **Lost work on reset** → Didn't commit first → **Always commit before branch operations**

- **Edited wrong branch** → Didn't check first → **Check `git branch` before editing** — never touch main/dev directly

---

## UI Patterns

- **Slow tooltips** → Used native `title` attribute → Use CSS tooltips with instant hover

- **User data persists after reset** → Forgot signOut → Call `signOut()` in `resetDemo()`

- **New color missing in places** → Color config is scattered → When adding a color, update ALL:
  - `ASSESS_C` (~line 1768)
  - `PROGRESS_GRADIENTS` (~line 2039)
  - `.hover-glow-{color}` CSS (~line 116)
  - `gradientStyles`, `selectedStyles`, `pendingStyles`, `numColors` (~line 5692)
  - `colorStyles` in AnalysisCard (~line 6408)
  - Completion celebration glow chain (~line 5714)

---

## Assessment System

- **New assessment breaks demo profiles** → assessLoadDemoProfile crashes on tests without demo data → **Always add guard check** for missing profile data
  - Example: `if (profile[testId]) { ... } else { return; }` before iterating

*Add new lessons whenever a mistake happens or user corrects you.*
