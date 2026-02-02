# AURA Lessons Learned

## React Patterns
- **Use refs for tracking values across renders** - useState can be stale in useEffect. Use useRef when tracking counts that need to persist without triggering re-renders (e.g., guestStartCountRef for nudge logic)
- **getEmptyState() vs getInitialState()** - getInitialState has demo data (20 answers). Use getEmptyState() for true reset.

## Data Rules
- **Never reuse question IDs** - Always increment. Check comment for current max.
- **Never delete/reorder assessment questions** - Index is stored in responses. Only add to END.
- **Use `x:1` to archive questions** - Don't delete, just hide.

## Git Mistakes to Avoid
- **Always commit before branch operations** - Lost work by doing `git reset --hard` before committing
- **Check current branch before editing** - Never edit directly on main or dev

## UI Patterns
- **Use CSS tooltips, not title attribute** - Native tooltips have delay. Use instant CSS hover.
- **Call signOut() in resetDemo()** - Otherwise logged-in user data persists after reset.
- **Adding a new color requires updates in MULTIPLE places** - When adding a color (e.g., `indigo`), update ALL these locations:
  - `ASSESS_C` (~line 1768) - base color config
  - `PROGRESS_GRADIENTS` (~line 2039) - gradient hex values
  - `.hover-glow-{color}` CSS (~line 116) - hover effect styles
  - `gradientStyles`, `selectedStyles`, `pendingStyles`, `numColors` in assess-question (~line 5692)
  - `colorStyles` in AnalysisCard (~line 6408)
  - Completion celebration glow chain (~line 5714)

---
*Add new lessons whenever user corrects a mistake or you discover a gotcha.*
