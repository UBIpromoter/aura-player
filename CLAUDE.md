# AURA Project - Agent Instructions

> **READ FIRST:** Check `tasks/status.md` for current state before starting any work.

## Quick Reference
| User says | You do |
|-----------|--------|
| "Try something" / "Let's work on X" | Create feature branch, start working |
| "Save this" | Commit to feature branch |
| "Make it live" | Merge feature → dev → main → push |
| "Undo this" | Reset feature branch |
| "Status" | Show git status + tasks/status.md summary |

## Session Protocol

### Starting a Session
1. Read `tasks/status.md` - understand current state
2. Read `tasks/lessons.md` - avoid past mistakes
3. Check `git branch` - never work on main/dev directly
4. If needed, create feature branch from dev

### Ending a Session
1. Commit all work (or stash if incomplete)
2. Update `tasks/status.md` with current state + handoff notes
3. Update `tasks/todo.md` - check off completed, add new tasks
4. If user corrected you, add lesson to `tasks/lessons.md`

### When User Corrects You
1. Fix the issue immediately
2. Add the pattern to `tasks/lessons.md` so it won't happen again

## Core Principles
- **Simplicity First** - Make every change as simple as possible
- **No Lazy Fixes** - Find root causes, not workarounds
- **Minimal Impact** - Only touch what's necessary
- **Verify Before Done** - Test in browser, check console for errors
- **Just Do It** - Don't ask for permission on obvious fixes

## Git Workflow

### Branch Structure
```
main                    ← production (ubipromoter.github.io/aura-player)
  └── dev               ← integration branch
       └── feature/X    ← where work happens
```

### Rules
1. **NEVER edit directly on main or dev** - always create feature branch
2. **Create feature branch**: `git checkout dev && git checkout -b feature/name`
3. **Commit early and often** on feature branch
4. **"Make it live"** → merge feature to dev, dev to main, push
5. **Multiple agents**: Each agent uses own feature branch to avoid conflicts

## Question & Assessment Rules

### Regular Questions (Q_RAW)
- **NEVER reuse an ID** - always increment (check comment for current max)
- **NEVER delete** - set `x:1` to archive instead
- Minor edits (typos) OK, major changes = new question with new ID
- Schema: `{ id, v, t (b/m), c (p/r/j), q, o, e, x }`

### Assessments (ASSESS_TESTS)
- **NEVER delete a test** - add `archived: true` to hide
- **NEVER delete questions** - index matters for stored responses
- **NEVER reorder questions** - index is stored in responses
- Can ADD questions to END of items array only

### Data Architecture
- Questions live in HTML (will migrate to DB later)
- Responses stored in Supabase `responses` table
- Profiles stored in Supabase `profiles` table
- Sync uses `email` + `test_id` columns

## UI Patterns

### Tooltips
Always use instant CSS tooltips, never native `title` attribute:
```jsx
<div className="relative group">
  <Element />
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-gray-800 text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-10">
    {tooltipText}
  </div>
</div>
```

### Locked Items
Show tooltip: "Unlock by completing {prerequisiteName}"

## File Reference
- `index.html` - entire React app (~7000 lines)
- `tasks/status.md` - current state + handoff notes
- `tasks/todo.md` - active tasks with checkboxes
- `tasks/lessons.md` - mistakes to avoid
