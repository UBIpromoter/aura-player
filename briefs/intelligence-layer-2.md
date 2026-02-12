# Brief: Intelligence Layer 2 — Reactive Smartness

**Priority: High — next build**

## Context

Layer 1 (static intelligence) is shipped — categories have a smart static ordering, post-assessment nudges guide users to the next category. Layer 2 makes the app respond to what the user has actually done.

80/20 rule. Minimum machinery, maximum impact. All client-side — no backend, no server, localStorage or app state only.

## What to Build

### 1. Category Completion Map

A helper that computes category-level status from existing `assessCompleted` + `assessInProgress`:

```
getCategoryStatus(catId, assessCompleted, assessInProgress) → 'done' | 'in-progress' | 'available' | 'locked'
```

- `done` — every test in category is in `assessCompleted`
- `in-progress` — at least one test has progress but not all complete
- `available` — tier ≤ user tier, no progress yet
- `locked` — tier > user tier

Pure function. No new state. Extracts the inline logic already in AssessPickerScreen (~line 8437).

### 2. Dynamic Category Reordering

Layer completion state on top of the static order:

- **In-progress** categories float to top (user started but didn't finish — bring them back)
- **Next recommended** (first available in static order) gets the hero card
- **Completed** categories drop to bottom (already the case)
- Everything stays visible and tappable — ordering is guidance, not restriction

Hero card: prefer in-progress over untouched. If any category is in-progress, hero = that category.

### 3. Insight Gating

Don't show trait insights or profile summaries until they're meaningful:

- < 2 categories completed → encouragement message ("Complete 2 assessments to unlock your profile")
- 2+ categories completed → show full analysis
- Category-specific insights only show after that category is done

Strengthen the Analysis button gate (line 8379): require 2+ categories, not just quick-profile.

### 4. Profile Richness Signal

Simple completeness indicator on the profile screen: "Profile Depth: 3 of 8 assessments" with visual bar.

## What NOT to Build

- No trait scoring engine — answers exist, scoring comes later
- No engagement tracking or analytics
- No cross-user features
- No re-engagement triggers or notifications
- No new UI screens — modifies existing picker and profile behavior
- No evaluator quality scoring (Layer 3)

## Key Files

- `index.html` lines 4147-4215 — category data, tier logic, static order
- `index.html` lines 8330-8600+ — AssessPickerScreen, hero logic, category sort
- `index.html` line 8379 — Analysis button gate

## Check DESIGN.md and TOKENS.md before starting.
