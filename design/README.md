# Aura Design Playground

A standalone visual design tool for experimenting with Aura's UI components, colors, and layouts.

## Quick Start

```bash
# Open the playground in your browser
open playground.html

# Or use a local server for better experience
npx serve .
```

## Features

### Device Preview
Switch between different device sizes:
- iPhone SE (375 x 667)
- iPhone 15 (393 x 852)
- iPhone 15 Pro Max (430 x 932)
- Pixel 7 (412 x 915)
- iPad Mini (768 x 1024, scaled)
- Desktop (1280 x 800, scaled)

### Live Color Editor
Click on any color swatch in the sidebar to open a color picker. Changes apply instantly to the preview.

**Color categories:**
- **Core Colors** - Primary, secondary, success, danger, warning, neutral
- **Categories** - Prediction, reasoning, judgment question types
- **Assessments** - Colors for different test types

### Component Views
- **Binary Question** - Yes/No question with confidence buttons
- **Multiple Choice** - Question with 4+ answer options
- **Assessment Cards** - List of available tests
- **Full Screen** - Cycle through sample questions

### Dark/Light Mode
Toggle between dark and light themes to preview both modes.

## Workflow

### 1. Design in Playground
Make visual changes here without touching production code:
- Adjust colors using the color pickers
- Try different device sizes
- Test both dark and light modes

### 2. Export Theme
Click "Copy Theme JSON" to copy your color configuration to clipboard.

### 3. Apply to Production
Manually update the colors in `../index.html`:

**Color locations to update (see LESSONS.md):**
1. `ASSESS_C` (~line 1886)
2. `PROGRESS_GRADIENTS` (~line 2213)
3. CSS `.hover-glow-{color}` (~line 116)
4. `gradientStyles`, `selectedStyles`, `pendingStyles` (~line 5692)
5. `colorStyles` in AnalysisCard (~line 6408)
6. Completion celebration glow (~line 5714)

## Sync Script

Pull current colors from production:

```bash
chmod +x sync.sh
./sync.sh
```

This creates `theme.js` with the current production color values for reference.

## Files

```
design/
├── README.md           # This file
├── playground.html     # Main design tool (open in browser)
├── sync.sh            # Pull colors from index.html
└── theme.js           # Generated color config (after sync)
```

## Tips

- **Click buttons multiple times** to see confidence level changes (1-4 taps)
- **Use the dots** at the bottom of Full Screen view to cycle through sample questions
- **Test mobile sizes** before desktop - Aura is mobile-first
- **Check both themes** - some colors look different in light mode

## Component Reference

| Component | Description |
|-----------|-------------|
| `QuestionCard` | Question text with category chip and evidence panel |
| `BinaryButtons` | YES/NO buttons with confidence segments |
| `MCButtons` | Multiple choice option buttons |
| `NavBar` | Top navigation with stats |
| `ProgressCircle` | Circular progress indicator |
| `AssessmentCard` | Test selection card with progress |
| `PhoneFrame` | Device mockup wrapper |
| `ConfidenceSegments` | Bottom bar showing tap count |
| `CategoryChip` | Colored category badge |

## Adding New Components

1. Add the component function to `playground.html`
2. Add a new option to `ComponentPicker`
3. Add rendering logic to `PreviewContent`
4. Test in all device sizes and both themes
