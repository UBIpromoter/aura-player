# Code Readability Sprint

> **Goal:** Make `index.html` welcoming to new devs (Adam, Ali) without restructuring or slowing iteration.
> **Timing:** Before they start committing (target: early next week)
> **Constraint:** No module extraction. No build step changes. Behavior-preserving only.

---

## Priority 1 — Do First (high value, zero risk)

### 1. Add Code Map
Insert a table of contents comment at the top of the `<script>` block showing sections and approximate line ranges. Use search-friendly labels so devs can `Cmd+F` to jump.

### 2. Fix TOKENS.md Line References
Replace approximate line numbers (`~line 1886`) with search terms (`search: "const ASSESS_C"`). These don't drift when code is added above them.

### 3. Section Header Cleanup
Ensure every screen block in the App render function has a clear comment header with a blank line above it. Currently some have it, some don't.

---

## Priority 2 — Do Next (meaningful improvement, low risk)

### 4. Dead Code Audit
Agent is currently scanning for unused functions, constants, CSS classes, and orphaned variables. Remove anything confirmed dead. Less code = less confusion.

### 5. TH() Helper — Fail Loud
Currently returns empty string on unknown tokens. Add a `console.warn` in dev mode for mistyped token names. One line change, saves 20-minute debugging sessions.

### 6. Add ErrorBoundary
Wrap the App render in a basic React ErrorBoundary. If a component throws, show a fallback message instead of white-screening the whole app. ~15 lines of code.

---

## Priority 3 — When There's Time (nice to have)

### 7. Group Related State
Add comment blocks grouping the useState calls in App by domain:
- `// --- Auth & User ---`
- `// --- Questions & Responses ---`
- `// --- Assessment System ---`
- `// --- UI State ---`

Not refactoring, just commenting for navigation.

### 8. App Render Function Comments
The `if (screen === 'x') return (...)` chain is long. Add a mini table of contents comment before it listing all screens and their line offsets within the function.

---

## Out of Scope (for now)
- Module extraction (wait for collaboration pain)
- TypeScript (wait for extraction)
- Automated tests (wait for extraction)
- Build tooling (not needed yet)

---

## Agent Research (from 2026-02-06 session)

Two background agents were launched to gather data. Next session: read these files to pull findings into the work.

- **Dead code audit:** Agent a0671c6 — check output or re-run `Grep` for unused functions/constants
- **Code map builder:** Agent a609f1c — check output or re-run section header scan

## Status
- [x] Code map — 49-line HTML comment at top of file with section index + search terms
- [x] TOKENS.md search terms — replaced ~line refs with Cmd+F search terms
- [x] Section headers — all screen blocks in renderContent() now have comment headers
- [x] Dead code audit — removed BATCHES, generateInsights, xpForLevel, HorseshoeProgress, ProgressSquare (~143 net lines removed)
- [x] TH() warn — console.warn on unknown tokens in dev mode
- [x] ErrorBoundary — class component wrapping App, "Try Again" button, dev-only stack trace
- [x] State grouping comments — 6 groups: Navigation & Auth, UI Chrome, Questions & Responses, QotD, Profile & History, Assessment System, Refs & Derived
- [x] Render function comments — 14-screen mini-TOC at top of renderContent()

### Bonus fixes
- Fixed `<ConfidenceDots>` — was used in history screen but never defined (crash risk). Replaced with inline dot display.
