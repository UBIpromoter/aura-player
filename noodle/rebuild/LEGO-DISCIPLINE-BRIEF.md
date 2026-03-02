# Lego Discipline Brief

> For executive review. Origin: rebuild feedback session 2026-03-02.

## Problem

Builders (including me) write raw HTML when implementing features, even when lego primitives exist that do exactly what's needed. The component system gets bypassed not out of ignorance but out of inertia — raw `<button>` with inline styles is faster in the moment than checking what `Button` supports.

This creates two problems:
1. **Drift** — the rebuild accumulates hand-coded UI that duplicates primitive behavior, making the system harder to maintain
2. **Illegibility** — new builders can't tell what's a pattern vs. a one-off hack

## Evidence

Quick Read screen was written across 3 iterations with zero lego usage. Every element was a raw div/button/span with inline styles. After audit, it refactored cleanly to `Card`, `Button`, `Stack`, `Text` with only targeted style overrides for effects the primitives don't cover (backdrop-blur, custom box-shadow).

The explore agent found 18 raw buttons across the full rebuild that should use `Button`. The assessment category list reimplements `CategoryCard` + `ListItem`. Demo profile selectors should use `ChipGroup`.

## Root Cause

No gate exists between "I need a UI element" and "I write JSX." Builders go straight to implementation without checking the primitive inventory. BUILDER.md says "use before build" but doesn't enforce it at the component level.

## Recommendations

### 1. Lego Gate in CLAUDE.md (High impact, zero cost)

Add a checklist to the project CLAUDE.md that builders scan before writing any visual element:

- Layout wrapper? → `Stack` (not div+flex)
- Text content? → `Text` (not span/p)
- Clickable? → `Button` (not raw button)
- Container with border/bg? → `Card` (not div+inline styles)
- Full screen? → `Screen`
- Raw elements only for: decorative/SVG, absolute positioning, unique interaction patterns

### 2. Override threshold rule

If you need to override more than 4 style props on a primitive, the primitive probably needs a new variant rather than a one-off override. Extend the system, don't bypass it.

Concrete example: the Quick Read exit buttons needed `variant="outline"` with a tinted gradient background. That's a `tinted` variant that would serve this pattern app-wide. Instead, I style-overrode `outline` with 3 custom properties. A `tinted` variant added to `Button` would have been cleaner and reusable.

### 3. Preflight lint (Medium impact, low cost)

Extend `tools/preflight.sh` to grep for common anti-patterns inside component-level code:
- Raw `<button` outside of known exceptions (decorative, dev panel)
- `<div className="flex` that should be `Stack`
- Inline `style={{ color:` that should use `Text` emphasis/color props

Non-blocking — just a warning that says "N raw elements found, consider lego primitives." Nudge, not gate.

### 4. Primitive inventory comment

Add a one-line comment at the top of the component section in the rebuild:

```
// PRIMITIVES: Stack, Text, Button, Card, Screen, Input, Field, Modal, Placeholder, Skeleton
// PATTERNS: NavBar, SegmentBar, CategoryCard, AnswerButton, ActionBar, TrackSelector, AvatarRow, ListItem, SettingItem
// CHECK THESE BEFORE WRITING RAW ELEMENTS
```

This puts the inventory at the point of use, not in a separate file builders might skip.

### 5. Consider a `tinted` Button variant

Current variants: `primary`, `secondary`, `ghost`, `outline`. The app frequently needs outline-style buttons with a subtle colored gradient fill (Quick Read exits, Welcome screen, assessment CTAs). A `tinted` variant would eliminate the most common override pattern:

```js
tinted: {
  cls: `font-medium btn-feedback ${shineCls} ${sizeClass}`,
  st: {
    background: `linear-gradient(135deg, rgba(${c.rgb},0.12), rgba(${c.rgb},0.04))`,
    border: `1.5px solid rgba(${c.rgb},0.35)`,
    color: isDark ? c.light : c.base,
    ...accentVar
  }
}
```

## Scope

These changes affect: project CLAUDE.md, tools/preflight.sh, and the primitive definitions in the rebuild. No locked files. No production changes. Executive should review and decide what to implement.
