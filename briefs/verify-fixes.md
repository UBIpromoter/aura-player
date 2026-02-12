# Brief: Verify Screen Fixes

**Priority: High — ship today**

## What

Two targeted fixes on the verify/assessment screens:

### 1. Remove gold shimmer ring (URGENT)
One answer option per multi-choice screen has a shimmering/glowing gold ring around it. This is an integrity bug — it suggests a "right" answer in a verification context. Find and remove any such highlight, shimmer, or ring effect on answer options. No answer should look different from another until the user selects it.

### 2. Relocate undo toast
The undo toast currently appears at the top of the screen. Move it to one of:
- **Preferred:** Inline on the answer row the user just tapped (where it used to be)
- **Alternative:** Just above the check/X action buttons

The goal is contextual placement — keep it near where the user's attention already is, not floating at the top of the viewport.

## Scope
- Verify/assessment question screens only
- Do NOT touch responsive layout/sizing (another builder is handling that)
- Do NOT change the submit/progression logic

## Check DESIGN.md and TOKENS.md before starting.
