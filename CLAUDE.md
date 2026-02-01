# Claude Preferences for Aura Project

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
- Test IDs are stored in `responses.test_id` column in Supabase

### Data Architecture
- Questions live in HTML (for now) - will migrate to DB later
- Responses stored in Supabase `responses` table
- Profiles stored in Supabase `profiles` table
- Sync uses `email` + `test_id` columns

## UI Patterns

### Hover Text / Tooltips
Always use instant CSS tooltips, never native `title` attribute.

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
