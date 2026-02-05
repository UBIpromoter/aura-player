# Aura — Lessons Learned

> Our shared memory. Check this when something feels familiar.
> Format: **Mistake → Root Cause → Rule**

---

## Data Integrity (Critical)

**Reused question ID** → Corrupts stored responses
→ **NEVER reuse IDs** — always increment (check comment for current max)

**Deleted/reordered assessment questions** → Breaks stored response indexes
→ **NEVER delete or reorder** — only add to END of items array

**Question still showing after removal** → Deletion not tracked
→ Use `x:1` to archive, don't delete

---

## Color System (See TOKENS.md)

**New color missing in places** → Color config is scattered across 7 locations
→ When adding a color, update ALL locations listed in TOKENS.md checklist

**Claude picks random color** → Drift
→ Check TOKENS.md first. Not listed = not allowed.

---

## React Patterns

**Stale state in useEffect** → useState doesn't update inside effects
→ Use `useRef` for values that need to persist without re-renders
→ Example: `guestStartCountRef` for nudge logic

**Wrong reset function** → `getInitialState()` has demo data (20 answers)
→ Use `getEmptyState()` for true reset

**User data persists after reset** → Forgot signOut
→ Call `signOut()` in `resetDemo()`

---

## Assessment System

**New assessment breaks demo profiles** → `assessLoadDemoProfile` crashes on tests without demo data
→ Always add guard check: `if (profile[testId]) { ... } else { return; }`

---

## Data Visualization

**Raw percentages look like grades** → 58% feels like "failing" on personality traits
→ Use descriptive spectrum labels for continuums (e.g., "Reserved ↔ Outgoing")
→ Percentages OK for completion counts, not personality dimensions

**Fill bars imply "more is better"** → Progress bars suggest you want 100%
→ Use gradient spectrum + marker for continuums (shows "where you land")

**Verbose trait displays waste space** → 3 lines per trait = too much scrolling
→ Compact to single line: `Name [lowLabel ════●════ highLabel]`

**Thin marker bars feel weak** → Rectangle markers on 1.5px bars are hard to see
→ Use refined design: h-3 bar (thicker), 16px glowing circle dot
→ Dot: colored fill + white border + colored glow (`box-shadow: 0 0 8px rgba(r,g,b,0.5)`)
→ TraitSpectrum has `compact={true}` for inline lists, full mode for standalone

**Long lists cause decision fatigue** → 11+ items flat = overwhelming
→ Group into collapsible categories with summary in collapsed state

---

## Git Safety

**Lost work on reset** → Didn't commit first
→ **Always commit before branch operations**

**Edited wrong branch** → Didn't check first
→ **Check `git branch` before editing** — never touch main/dev directly

---

## UI Patterns

**Slow tooltips** → Used native `title` attribute (has browser delay)
→ Use CSS tooltips with instant hover:
```jsx
<div className="relative group">
  <Element />
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1
                  text-xs bg-gray-800 text-white rounded whitespace-nowrap
                  opacity-0 group-hover:opacity-100 pointer-events-none z-10">
    {tooltipText}
  </div>
</div>
```

**Locked items confuse users** → No explanation why locked
→ Show tooltip: "Unlock by completing {prerequisiteName}"

---

## Code Editing

**White screen after large refactor** → Orphaned code or duplicate function definitions
→ When replacing/refactoring function blocks:
  1. Check for duplicate definitions (`grep -c "^const FunctionName"`)
  2. Verify function declarations weren't truncated
  3. Remove ALL old versions before adding new ones
→ Partial edits in large files leave debris

---

## Workflow Lessons

**Autonomy over permission** → Default AI behavior seeks approval
→ **Do, then show** — prototype instead of asking clarifying questions
→ If request is vague, build 2-3 noodle options with pros/cons

**Structure protects production** → Agents editing index.html directly
→ All new work in `noodle/`, production read-only until "Merge it"

**Multi-AI review works** → Different AIs catch different things
→ For protocol/architecture decisions, run through multiple AIs

**Vibes to Logic** → AI waits for perfect requirements
→ Capture "User Vibe" separately, then prototype
→ Example: "Make it faster" → build 3 noodles (skeleton loading, optimistic updates, lazy loading)

---

## Vision Context

**Self-discovery is the on-ramp** → Fun assessments train users for BrightID verification
→ Same interface, different questions. Build track record first.

**Neurotype shapes product** → Philip builds tools for accurate self-knowledge
→ Aura externalizes the self-discovery process

---

## File Organization

**Generic "HANDOFF.md" files pile up** → No context, hard to find later
→ Name handoffs descriptively: `handoffs/YYYY-MM-DD-feature-name.md`
→ Date + topic in filename

---

## Aura Visualization (Profile Redesign v2)

**Radar charts meaningless** → O, C, E, A, N acronyms mean nothing to users
→ Replace with organic "aura" glow visualization that feels personal

**Radial gradients look hollow** → CSS radialGradient creates "donut" effect
→ Use SVG `feGaussianBlur` filter on filled ellipses for organic glow

**Grid neurons look robotic** → Neurons at rectangle corners feel mechanical
→ Scatter positions organically, no geometric patterns

**Static lines feel dead** → CSS-animated neurons leave lines behind
→ Use JS animation (requestAnimationFrame) so lines follow neurons dynamically

**What we chose (2026-02-04):**
- Organic blurred ellipse aura (SVG feGaussianBlur, stdDeviation 18-22)
- Trait colors in zones: violet (curiosity), emerald (warmth), pink (stability), cyan (independence), blue (base)
- Colors appear progressively across 4 stages
- Scattered neuron positions (not geometric)
- Each neuron drifts independently (1.5-3px amplitude, unique speed/phase)
- Connection lines dynamically follow neurons via requestAnimationFrame
- Reference file: `noodle/2026-02-03-profile-redesign-v2/flow-demo.html`

---

*Add new lessons when we break something twice.*
