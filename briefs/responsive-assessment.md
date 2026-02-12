# Brief: Responsive Assessment Screens

**Priority: High — ship today**

## What

The assessment/verify screens look good on desktop but break down at mobile sizes:
- **Large phones:** Buttons look dinky, too much whitespace around them. Touch targets feel small even though there's room.
- **Small phones:** Need to verify everything fits without cramping. Satisfying layout, not just "it fits."

## Approach
- Audit all assessment screen types (binary, multi-choice, slider, etc.) at multiple breakpoints
- Key breakpoints: 375px (small phone), 430px (large phone like iPhone Pro Max), 768px+ (tablet/desktop)
- Focus on: button sizing, touch targets (min 44px), spacing, text sizing, container max-widths
- Make buttons fill available width more confidently on mobile — they shouldn't float small in a sea of space

## Scope
- Assessment/verify question screens, answer options, action buttons
- Do NOT touch the gold ring / shimmer effects (another builder is fixing that)
- Do NOT change submit/progression logic
- Do NOT change dark/light mode styling

## Check DESIGN.md and TOKENS.md before starting.
