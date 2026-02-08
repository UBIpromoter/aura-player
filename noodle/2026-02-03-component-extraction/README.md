# Component Extraction Noodle (Phase 2)

Built on top of Phase 1 (token consolidation).

## Extracted Components

### ConfidenceBar
Reusable bar showing confidence distribution with segments.

**Props:**
- `label` - Text label (Yes/No/option name)
- `pct` - Percentage to display
- `confCounts` - Array [conf1, conf2, conf3, conf4] counts
- `colors` - Array [conf1, conf2, conf3, conf4] hex colors (light→dark)
- `maxCount` - For calculating relative segment widths
- `isUserRow` - Highlight as user's answer
- `userConf` - User's confidence level (0-3 index)
- `showEmpty` - Show empty bar portion
- `labelWidth` - Tailwind width class for label
- `labelColor` - Hex color for label text
- `darkMode` - Theme

**Used by:**
- BinaryChart (2 rows)
- MultipleChoiceChart (5 rows max)

### Before/After

**BinaryChart:**
- Before: 55 lines of inline rendering
- After: 35 lines using ConfidenceBar

**MultipleChoiceChart:**
- Before: 44 lines of inline rendering
- After: 30 lines using ConfidenceBar

**Total saved:** ~34 lines, plus consistency guarantee

## Testing
Open in browser and verify:
- [ ] Binary question results render correctly
- [ ] MC question results render correctly
- [ ] User's answer highlighted with border
- [ ] Confidence segments show correct colors
- [ ] Dark/light mode works

## Next Extractions (not yet done)
- TraitSpectrumBar - for assessment trait displays
- MiniCommunityResults - could also use ConfidenceBar
- LikertScaleButtons - assessment question inputs
