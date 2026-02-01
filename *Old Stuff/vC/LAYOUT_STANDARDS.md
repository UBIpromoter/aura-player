# Aura Player Layout Standards

## Fixed Zone Heights (Question Screen)
- Header (category bar): h-[44px] flex-shrink-0
- Progress bar: h-[32px] flex-shrink-0  
- Question text: h-[60px] min-h-[60px] flex-shrink-0
- Evidence (collapsed): h-[32px] flex-shrink-0
- Answer zone: flex-1 overflow-y-auto

## Required CSS Pattern for Fixed Zones
```jsx
// CORRECT - guaranteed fixed height
<div className="h-[44px] flex-shrink-0 flex items-center">

// WRONG - can shrink in flex context
<div className="h-[44px] flex items-center">

// WRONG - padding-based height varies
<div className="py-2 flex items-center">
```

## Screens Audit - ALL FIXED ✅

| Screen | Header | Status |
|--------|--------|--------|
| Question | h-[44px] flex-shrink-0 | ✅ |
| Question (empty) | h-[44px] flex-shrink-0 | ✅ |
| QOTD | Gradient header (special) | ✅ |
| History | h-[44px] flex-shrink-0 | ✅ |
| Profile | h-[44px] flex-shrink-0 | ✅ |
| Turk | h-[44px] flex-shrink-0 | ✅ |
| Turk Type | h-[44px] flex-shrink-0 | ✅ |
| Turk Task | h-[44px] flex-shrink-0 | ✅ |
| Turk Task (timer) | h-[44px] flex-shrink-0 | ✅ |
| Settings | h-[44px] flex-shrink-0 | ✅ |

## Components Fixed

| Component | Fix Applied |
|-----------|-------------|
| EvidencePanel | Container has flex-shrink-0 |
| QOTD question | line-clamp-2 + min-h-[56px] |
| Question text | h-[60px] min-h-[60px] + line-clamp-2 |

## Visual Test Cases
1. Short question (< 1 line) - zones should not collapse ✅
2. Long question (2+ lines) - truncates with line-clamp-2 ✅
3. Question with evidence - evidence collapsed by default ✅
4. Question without evidence - "No evidence" placeholder ✅
5. Navigate between questions - answer buttons stay in place ✅

## Run Check Script
```bash
bash /home/claude/check_layout.sh /path/to/file.jsx
```
