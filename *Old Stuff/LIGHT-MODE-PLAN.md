# Light Mode Redesign Plan

## Current Issues
The light mode uses basic gray-100/white backgrounds that look washed out and lack the polish of dark mode. The question screen screenshot shows:
- Dark answer buttons on light background (jarring contrast)
- Gray progress bar area doesn't fit
- Evidence bar looks out of place
- Overall lack of cohesion

## Design Philosophy for Light Mode
Match dark mode's sophistication with light equivalents:
- **Warm whites** instead of cold grays
- **Subtle shadows** instead of glows
- **Colored accents** that pop on light backgrounds
- **Consistent depth** through subtle gradients

## Color Mapping (Dark → Light)

| Element | Dark Mode | Light Mode |
|---------|-----------|------------|
| Screen bg | `gray-950` | `gray-50` or `white` |
| Card bg | `gray-900` | `white` with shadow |
| Secondary bg | `gray-800` | `gray-100` |
| Border | `gray-800`, `white/5` | `gray-200` |
| Primary text | `white` | `gray-900` |
| Secondary text | `gray-400` | `gray-600` |
| Muted text | `gray-500` | `gray-500` |
| Answer buttons | `gray-800` | `white` with border |
| Progress bar bg | `gray-800` | `gray-200` |
| Nav bar | `gray-950/70 blur` | `white/80 blur` with shadow |

## Screens to Fix

### 1. PhoneFrame (nav bar, status bar)
- [x] Nav: `bg-white/70 backdrop-blur-md` ✓ already done
- [ ] Need subtle shadow on nav

### 2. Categories Screen
- [ ] Background: pure `bg-white` or `bg-gray-50`
- [ ] Cards: `bg-white` with `shadow-sm`
- [ ] QOTD card: keep gradient, it works
- [ ] Track badges: ✓ fixed (solid emerald/violet)

### 3. Question Screen (PRIORITY - shown in screenshot)
- [ ] Top bar (category): light bg with subtle border
- [ ] Progress row: light bg, colored progress bar
- [ ] Question area: white bg, remove dark gradient overlay
- [ ] Answer buttons: white bg with colored border, NOT dark
- [ ] "Can't answer" button: light gray bg
- [ ] Skip/Maybe Later: light text colors

### 4. Results/Community View
- [ ] Charts: need light-friendly colors
- [ ] Confidence bars: work on light bg

### 5. History Screen
- [ ] Card backgrounds: white with shadow
- [ ] Text colors: dark on light

### 6. Profile Screen
- [ ] Stats cards: white with shadow
- [ ] Donut chart: works on any bg

### 7. Settings Screen
- [ ] Toggle backgrounds
- [ ] Section dividers

### 8. QOTD Screen
- [ ] Answer area at bottom
- [ ] Results display

## Implementation Order

1. **Question Screen** - most visible, most broken
2. **Categories Screen** - home screen polish
3. **Results views** - charts and community data
4. **History/Profile** - secondary screens
5. **Settings/Modals** - finishing touches

## Key Fixes for Question Screen

```jsx
// Answer zone background
darkMode ? 'bg-gray-950' : 'bg-white'

// Binary buttons (unanswered state)
darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700 border border-gray-300 shadow-sm'

// Evidence bar
darkMode ? 'bg-gray-800' : 'bg-gray-100 border border-gray-200'

// Progress row
darkMode ? 'bg-gray-900/50' : 'bg-gray-100'

// Category header
darkMode ? 'bg-amber-900/10 border-amber-800/30' : 'bg-amber-50 border-amber-200'
```

## Files to Modify
- `/sessions/stoic-cool-johnson/mnt/Aura/aura-player-vG.jsx`

## Testing
After each screen fix:
1. Toggle to light mode in settings
2. Navigate through affected screens
3. Check all interactive states (hover, active, selected)
4. Verify text readability
