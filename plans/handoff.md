# Handoff — Aura Rebuild Production Gap Closure
*2026-03-02*

## Task
Close the 5 production gaps identified in the previous session's gap analysis, wire judgment subcategory filtering, fix integrity subscale scoring.

## Done
All 8 tasks from `cowork-instructions.md` complete. CP-21 at 6,329 lines.

**1. Bridge timing** — Auto-advance 1800ms→2500ms, tap guard 800ms→1000ms. Total visibility ~2.85s.

**2. Entity Gate** — Ported from production, adapted to rebuild primitives (Text, Stack, colorOf). New component `EntityGateScreen` (~60 lines). Added `ENTITY_GATE_KEY` constant. Wired into `getInitialScreen()` (shows before landing for first-time visitors) and `renderContent()`. Stores declaration in localStorage.

**3. Launch screen** — Vestigial in production (just WelcomeScreen alias). Added `'launch'` to existing landing/welcome route condition. Net zero lines.

**4. Stamps/SharePicker** — Full port adapted to rebuild primitives (~85 lines). Bottom sheet with primary selection gate, stamp toggles (green=public), profile avatar + assessment count, copy link with Web Share API fallback. Wired into IdentityScreen NavBar via `right` prop. Connected to `auth.setPrimaryClaim` and `auth.updateClaimVisibility`. Simplified from production by removing tempUnlocked/amber/red tier complexity (rebuild only shows public stamps).

**5. HISTORY_SCREENS** — Verified `clinical-consent` inclusion is intentional. Production doesn't use HISTORY_SCREENS pattern at all. Left alone.

**6. Judgment subcategory filtering** — Fixed `sub` tag propagation in `aura-questions.js` line 573 (added `...(q.sub && { sub: q.sub })`). Added `selectedSub` state, wired into `findNextUnanswered` filter. Added teal-gradient filter chips (All/Society/Taste/Calibration/Spicy) that appear when viewing judgment questions. Chips auto-navigate to first matching unanswered question. Cleared on category switch.

**7. Integrity subscale scoring** — Moved `'integrity'` from dedicated branch into generic Likert list at line ~405. This automatically picks up `hon`/`hum` subcategory scoring. Deleted dead `attachment-v2-handled` branch.

**8. CP-21** — Checkpoint at 6,329 lines.

## Decided
- SharePicker simplified: removed tempUnlocked/amber/red visibility tiers. Rebuild shows only public stamps in share sheet. Full visibility tier system can be added later if needed.
- Entity Gate doesn't persist `entityModelName` to state (rebuild has no such variable). The model name is stored in localStorage only.
- Bridge timing conservative at 2.5s — feels better than 1.8s without being sluggish.
- `selectedSub` clears on category change to avoid confusing cross-category filtering.

## Next
- Commit these changes
- Test entity gate flow end-to-end (new visitor → entity gate → landing → onboarding)
- Test SharePicker in identity screen (signed-in user with linked accounts)
- Consider adding visibility tiers (private/locked) to SharePicker if needed
- Consider adding `entityModelName` state to rebuild if AI entity flow needs it

## Leave Alone
- `aura-assessments.js` — verified correct
- Assessment system internals — Phase 8 complete
- useAssessment hook internals — interface split done
- CP-15, CP-19, CP-20 checkpoints
