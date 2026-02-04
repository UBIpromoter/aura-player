# Spectrum Bar Style Handoff

## The Problem

The trait spectrum bars are rendering incorrectly. There are two styles being confused:

### WRONG (Fill Bar Style) - Image 17
```
Detachment                                    63%
[████████████████████░░░░░░░░░░░░░░░░░░░░░░░]
Empathic                                 Detached
```
- Gradient FILLS from left to the percentage point
- Gray track background showing "empty" portion
- NO dot marker

### CORRECT (Full Gradient + Dot Style) - Image 18
```
Strategic Mind                                40%
[dark████████●light██████████████████████████]
Transparent                              Strategic
```
- FULL gradient spans entire bar (dark → light for Shadow Self)
- WHITE DOT marker positioned at the score percentage
- Shows "where you land on the spectrum"

## The Visual Difference

**Fill bar** = "how much you have" (like a progress bar)
**Spectrum + dot** = "where you land on a continuum" (like a slider)

## What Needs to Happen

The Analysis screen expanded view currently uses fill-bar style. It needs to use the spectrum+dot style like `SpectrumBar` component.

### Current Code Location
`/Users/philipsilva/Code/Aura/index.html` around line 7838-7877 (CollapsibleGroup expanded section)

### Current (Wrong) Implementation
```jsx
<div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
  <div className="h-full rounded-full" style={{ width: `${result.score}%`, background: `linear-gradient(90deg, ${spec.left}, ${spec.right})` }} />
</div>
```

### Correct Implementation (use SpectrumBar pattern)
```jsx
<div className="h-3 rounded-full relative" style={{ background: `linear-gradient(to right, ${spec.left}, ${spec.right})` }}>
  <div
    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white"
    style={{
      left: `${Math.max(5, Math.min(95, result.score))}%`,
      marginLeft: -8,
      boxShadow: '0 1px 3px rgba(0,0,0,0.25)'
    }}
  />
</div>
```

Key differences:
1. Full gradient background on the bar itself (not a fill)
2. White dot absolutely positioned at the score percentage
3. No gray track background
4. Slightly thicker bar (h-3 vs h-2)

## Files to Update

1. **Analysis screen expanded view** - CollapsibleGroup in assess-analysis section
2. **Assess-results screen** - Big Five and Shadow Self results sections
3. **Assess-picker expanded modules** - Already updated but verify

## Reference

The `SpectrumBar` component at line ~2713 has the correct implementation. Use that pattern everywhere trait spectrums are displayed.

## spectrumColors for Shadow Self

```javascript
'shadow-M': { left: '#94a3b8', right: '#1e293b', leftLabel: 'Direct', rightLabel: 'Strategic' },
'shadow-N': { left: '#94a3b8', right: '#1e293b', leftLabel: 'Humble', rightLabel: 'Confident' },
'shadow-P': { left: '#94a3b8', right: '#1e293b', leftLabel: 'Empathic', rightLabel: 'Detached' },
```

Light slate (#94a3b8) on left → Dark navy (#1e293b) on right

## Test

1. Open Analysis screen
2. Expand Shadow Self group
3. Should see FULL gradient bar with WHITE DOT at the score position
4. NOT a fill-bar that stops at the percentage
