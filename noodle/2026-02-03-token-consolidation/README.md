# Token Consolidation Noodle

## What Changed

Consolidated color definitions from 7 scattered locations into 1 source of truth.

### Before
- Colors defined in 7 places (ASSESS_C, PROGRESS_GRADIENTS, gradientStyles, selectedStyles, pendingStyles, numColors, colorStyles)
- Adding a new color required updating all 7+ locations
- Celebration glow used ugly `.includes()` chain

### After
- Single `COLOR_HEX` object at top of file with all color hex values
- Everything else derives from this object:
  - `ASSESS_C` - Tailwind classes for assessment colors
  - `PROGRESS_GRADIENTS` - Hex gradients for SVG progress circles
  - `gradientStyles` - Likert button intensity levels
  - `selectedStyles` - Selected button styles
  - `pendingStyles` - Pending answer styles
  - `numColors` - Number text colors
  - `colorStyles` (AnalysisCard) - Card background/text/bar styles
  - `MC_COLORS` - Multiple choice option colors (partially)
- Celebration glow uses direct `COLOR_HEX[color].base` lookup

### Adding a New Color Now
1. Add entry to `COLOR_HEX` object (~line 1200)
2. Add to `ASSESS_COLORS` array if used in assessments
3. Add CSS classes (`.shine-*`, `.glow-*`, `.hover-glow-*`) in `<style>`

That's it. Everything else derives automatically.

## Files Changed
- `index.html` - All changes in single file

## Testing
Open in browser and verify:
- [ ] Player questions load with correct category colors
- [ ] Assessment picker shows correct colors
- [ ] Assessment questions show Likert buttons with gradient intensity
- [ ] Completion celebration shows correct glow color
- [ ] AnalysisCard shows correct color styling
- [ ] Progress circles render with correct gradients
- [ ] Dark/light mode toggle works

## Merge
When ready: "Merge it" to copy changes to production `/Code/Aura/index.html`
