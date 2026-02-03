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

## Protocol Lessons (2026-02-02 Session)

### Autonomy Over Permission
- **Mistake:** Asking "Can I do X?" constantly
- **Root Cause:** Default AI behavior is to seek approval
- **Rule:** Do, then show. Prototype instead of asking clarifying questions.
- **Example:** If request is vague, build 2-3 small noodle options with pros/cons instead of asking "What do you mean?"

### Structure Protects Production
- **Mistake:** Agents editing index.html directly, breaking things
- **Root Cause:** No isolation between experiments and production
- **Rule:** All new work starts in `noodle/`. Production (`app/`, `index.html`) is read-only until explicit "merge it" trigger.
- **Example:** Agent builds `noodle/2026-02-02-new-feature/`, tests in `tools/`, only integrates on command.

### Multi-AI Review Works
- **Observation:** Different AIs catch different things
- **Gemini:** Decision tiers, memory compression, adversarial critic accountability
- **Grok:** Auto-clean stale noodles, yellow heartbeat, uncommitted check
- **ChatGPT:** 30% leaner, more deterministic wording, "bias toward artifacts over discussion"
- **Rule:** For protocol/architecture decisions, run proposals through multiple AIs before finalizing.

### Vibes to Logic
- **Mistake:** Saying "I'm not sure what you mean"
- **Root Cause:** AI waiting for perfect requirements instead of experimenting
- **Rule:** Capture emotional intent ("User Vibe") separately from implementation ("Technical Logic"). Prototype the vibe.
- **Example:** "Make it feel faster" → build 3 noodles: skeleton loading, optimistic updates, lazy loading. Show all three.

---

## Vision Lessons (2026-02-02 Session)

### Self-Discovery is the On-Ramp
- **Insight:** The fun assessment flow isn't separate from BrightID verification—it's training.
- **Pattern:** Users come for self-discovery → learn mechanics (tap/hold, confidence) → build track record → some graduate to real evaluation work.
- **Implication:** Same interface, different questions. Calibration on fun questions transfers to serious questions.

### Philip's Neurotype Shapes the Product
- **Insight:** Systems thinking, hyperfocus, compensation architecture, obsession with accurate self-knowledge.
- **Pattern:** He builds tools that help people see themselves clearly—first BrightID (are you unique?), now Aura (how does your mind work?).
- **Implication:** The product is an externalization of his own self-discovery process.

---
*Add new lessons whenever user corrects a mistake or you discover a gotcha.*
