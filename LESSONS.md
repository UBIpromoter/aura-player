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

---

## Data Visualization

- **Raw percentages look like grades** → 58% feels like "failing" on personality traits → **Use descriptive spectrum labels** for continuums
  - Example: Instead of "58%", show "Balanced" or trait-specific labels like "Reserved ↔ Outgoing"
  - Percentages are fine for completion counts, but not for personality dimensions where middle = valid

- **Fill bars imply "more is better"** → Progress bars suggest you want 100% → **Use gradient spectrum + marker** for continuums
  - Example: Gradient from blue→orange with white line marker at user's position
  - Shows "where you land" not "how much you have"

- **Verbose trait displays waste space** → 3 lines per trait (name, bar, labels) = too much scrolling → **Compact to single line**
  - Example: `Name [lowLabel ════●════ highLabel]` all on one row
  - Use smaller text (text-[10px]) for endpoint labels

- **Long lists cause decision fatigue** → 11+ items in flat list = overwhelming → **Group into collapsible categories**
  - Example: Starter Pack ▼, Personality ▼, Shadow ▼ with expand/collapse
  - Show summary in collapsed state (completion count or mini gauges)

- **Semicircle gauges for density** → Need quick visual summary without space → **Use mini semicircle gauges** in headers
  - Example: Row of 5 tiny gauges showing Big Five at a glance
  - Good for collapsed state, expand for full spectrum bars

---

## Protocol Lessons (2026-02-02)

- **Autonomy over permission** → Default AI behavior seeks approval → **Do, then show** — prototype instead of asking clarifying questions
  - Example: If request is vague, build 2-3 noodle options with pros/cons

- **Structure protects production** → Agents editing index.html directly → All new work in `noodle/`, production read-only until "merge it"
  - Example: Build `noodle/2026-02-02-feature/`, test in `tools/`, integrate on command

- **Multi-AI review works** → Different AIs catch different things → For protocol/architecture decisions, run through multiple AIs
  - Gemini: Decision tiers, memory compression
  - Grok: Auto-clean, yellow heartbeat
  - ChatGPT: Leaner, more deterministic

- **Vibes to Logic** → AI waits for perfect requirements → Capture "User Vibe" + "Technical Logic" separately, then prototype
  - Example: "Make it faster" → build 3 noodles: skeleton loading, optimistic updates, lazy loading

---

## Vision Lessons (2026-02-02)

- **Self-discovery is the on-ramp** → Fun assessments train users for BrightID verification → Same interface, different questions
  - Pattern: Self-discovery → learn mechanics → build track record → graduate to real evaluation

- **Neurotype shapes product** → Philip builds tools for accurate self-knowledge → Product is externalization of self-discovery process
  - BrightID: "Are you unique?" → Aura: "How does your mind work?"

---

*Add new lessons whenever a mistake happens or user corrects you.*
