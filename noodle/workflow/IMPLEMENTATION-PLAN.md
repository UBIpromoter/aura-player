# Implementation Plan: New Workflow Protocol

The new CLAUDE.md is merged into Aura. Here's how to roll it out everywhere.

---

## 1. Update Global CLAUDE.md

**Location:** `~/.claude/CLAUDE.md`

**Action:** Sync the global file with the new patterns. The global one should be the "base template" that project-specific ones can override.

**Key additions:**
- Prime Directive (`BUILD → SHOW → ADJUST`)
- Clear Claude/Philip pronouns (or Claude/User for generic)
- Pattern-First Development section
- Protect User From Himself section
- Visual Density preferences
- Context Hygiene section
- Quality bar (`simple > clever`, etc.)

**Keep project-agnostic:** Remove Aura-specific items (orange color note, GitHub Pages, etc.)

---

## 2. Reorganize Existing Noodles

**Current state:** `noodle/2026-02-03-feature-name/` (date-based)

**New convention:** `noodle/category/feature-name/` (category-based)

**Migration approach:**
- Don't delete existing noodles (rule: never delete)
- Create new `archive/` folder inside noodle for old date-based ones
- New work uses category naming going forward

**Categories to create:**
```
noodle/
├── design/
├── backend/
├── charts/
├── flow/
├── experimental/
├── workflow/        ← already exists (this plan lives here)
└── archive/         ← move old date-based noodles here
```

---

## 3. Update Related Protocol Files

### TOKENS.md
- Already good, no changes needed
- Continue using as design system source of truth

### LESSONS.md
- Add lesson about the new workflow if relevant
- Format: `Old workflow caused confusion → Pronouns were ambiguous → Use Claude/Philip explicitly`

### tasks/status.md
- Update to reflect this workflow change is complete
- Note: New CLAUDE.md merged, noodle reorganization pending

---

## 4. Validate Light Mode

Per new protocol: "Philip won't be checking it often. Claude validates both."

**Action:** Run through main app flows in light mode, flag any issues.

---

## 5. Pattern Audit

Per new protocol: "Check for existing patterns before building new."

**Action:** Document existing UI patterns in a patterns reference file:
- Card styles
- Button variants
- Color usage by context
- Spacing conventions
- Animation timings

This could live in `design/patterns.md` or as comments in `TOKENS.md`.

---

## Order of Operations

1. **Now:** Update global `~/.claude/CLAUDE.md`
2. **Now:** Create noodle category folders + archive
3. **Next session:** Light mode validation
4. **Ongoing:** Pattern audit as we build

---

## Philip Decides

- Should global CLAUDE.md match Aura exactly, or be more generic?
- Archive old noodles now, or leave them and just use new naming going forward?
- Pattern audit: separate file or extend TOKENS.md?
