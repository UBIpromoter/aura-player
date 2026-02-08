# Pro Max Overflow Analysis

## Problem

On iPhone 15 Pro Max (430x932), the phone frame plus its chrome (padding, rounded bezel, drop shadow) exceeds typical laptop viewport heights (~900px on a 1080p display, ~700-800px on a 13" MacBook at default scaling). The frame clips at the bottom.

---

## How the Phone Frame Currently Works

**File:** `/Users/philipsilva/Code/Aura/index.html`
**Component:** `PhoneFrame` (line 4526)
**Invoked at:** line 11064

### Phone Sizes (line 4518-4524)

```js
const PHONE_SIZES = [
  { id: 'se', label: 'iPhone SE', w: 375, h: 667 },
  { id: '15', label: 'iPhone 15', w: 393, h: 852 },
  { id: '15pm', label: 'iPhone 15 PM', w: 430, h: 932 },
  { id: 'pixel', label: 'Pixel 8', w: 412, h: 915 },
  { id: 'galaxy', label: 'Galaxy S24', w: 360, h: 780 },
];
```

### PhoneFrame Component (line 4526-4571)

```jsx
const PhoneFrame = ({ children, darkMode = true, width = 393, height = 852, devOffset = false }) => {
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const calc = () => {
      const totalH = height + 56; // p-3 (24) + outer p-4 (32)
      const avail = window.innerHeight;
      setScale(avail < totalH ? avail / totalH : 1);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [height]);
  const chromeW = width + 24; // p-3 each side (12+12)
  const chromeH = height + 24; // p-3 top+bottom (12+12)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4"
      style={devOffset ? { paddingRight: 280 } : undefined}>
      <div style={scale < 1 ? { width: chromeW * scale, height: chromeH * scale } : undefined}>
        <div className="relative bg-[#1a1a1c] rounded-[55px] p-3 shadow-2xl"
          style={{
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))',
            transform: scale < 1 ? `scale(${scale.toFixed(3)})` : undefined,
            transformOrigin: 'top left'
          }}>
          {/* Side buttons, screen content, etc. */}
          <div style={{ width, height, borderRadius: 44 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Display Mode Detection (line 4275-4293)

Desktop mode (which triggers PhoneFrame) is the default for viewports > 768px wide that aren't on mobile devices or in standalone/PWA mode. The phone frame is only rendered in desktop mode; on actual mobile devices, the app renders directly without the frame.

---

## Current Scaling Logic Analysis

The existing code already has a scaling mechanism. Here is what it does:

1. **`totalH = height + 56`** -- This accounts for the inner `p-3` padding (24px: 12px top + 12px bottom) plus the outer `p-4` padding (32px: 16px top + 16px bottom). Total: `932 + 56 = 988px` for Pro Max.

2. **`avail = window.innerHeight`** -- Raw viewport height.

3. **`scale = avail < totalH ? avail / totalH : 1`** -- If the viewport is shorter than totalH, it computes a scale factor.

4. **Wrapper div** gets `width: chromeW * scale` and `height: chromeH * scale` to reserve the correct box size after scaling.

5. **Inner bezel div** gets `transform: scale(factor)` with `transformOrigin: 'top left'`.

### What Goes Wrong

The math looks correct in principle, but there are several issues:

#### Issue 1: totalH underestimates the actual rendered height

`totalH = height + 56` calculates `932 + 56 = 988px`. But the actual rendered stack is:

| Element | Height |
|---------|--------|
| Screen content (inner) | 932px |
| `p-3` on bezel div (top + bottom) | 24px (12 + 12) |
| `rounded-[55px]` bezel | Adds no height but the 55px border-radius clips visual area |
| `drop-shadow(0 25px 50px ...)` | Adds ~50px visual overflow below |
| `p-4` on outer centering div | 32px (16 top + 16 bottom) |
| **Total visual footprint** | **~1038px** |

The drop-shadow filter extends 50px below but filters don't affect layout. However, `min-h-screen` on the outer div means the flex centering (`items-center justify-center`) places the frame such that the top/bottom padding matters. The actual layout height needed is:

- Chrome height: `932 + 24 = 956px`
- Outer padding: `32px` (16 top + 16 bottom)
- **Minimum viewport needed: 988px** (which is exactly what totalH computes)

So the math is actually correct for layout. The shadow clips but that is cosmetic.

#### Issue 2: The wrapper div sizing may be off

When `scale < 1`, the wrapper div is set to `chromeW * scale` and `chromeH * scale` where `chromeH = height + 24 = 956`. But `totalH` (used to calculate the scale) is `height + 56 = 988`. This means:

- The scale is computed against 988px (correct -- includes outer padding)
- But the wrapper height is `956 * scale`, not `988 * scale`
- The outer div still has `p-4` (32px of padding) around the wrapper
- So effective height = `956 * scale + 32`

Let's check: if `avail = 800px`, then `scale = 800 / 988 = 0.8097`.
- Wrapper height: `956 * 0.8097 = 774px`
- Plus outer padding: `774 + 32 = 806px`
- But avail is only 800px -- **overflows by 6px**

The mismatch is that the scale factor accounts for 56px of chrome, but the scaled element only includes 24px of chrome, while the remaining 32px (outer `p-4`) stays unscaled.

#### Issue 3: min-h-screen on the outer container

The outer div has `min-h-screen` via Tailwind class. When the content (after scaling) is shorter than the viewport, this does nothing. But with `items-center justify-center`, the flex container centers the phone vertically. If the content overflows, the `min-h-screen` div grows beyond the viewport, which is fine -- but `html, body, #root` all have `overflow: hidden` (line 78), so the overflow is clipped rather than scrollable.

---

## Root Cause Summary

The scaling math has a bug: the outer `p-4` padding (32px) is unscaled and not properly accounted for. The scale factor divides by `totalH` (which includes the 32px outer padding), but only the inner frame is actually scaled. The outer padding remains at full size.

For small viewports this means the frame still overflows by a small amount. On a 13" MacBook with browser chrome (viewport ~700-750px), the Pro Max frame (988px needed) requires aggressive scaling, and the 32px unscaled padding becomes significant relative to the available space.

---

## Proposed Fix

### Option A: Scale against the correct total and account for unscaled padding (Recommended)

Fix the math so the wrapper + unscaled padding fits exactly in the viewport:

```jsx
const PhoneFrame = ({ children, darkMode = true, width = 393, height = 852, devOffset = false }) => {
  const [scale, setScale] = React.useState(1);
  const outerPad = 32; // p-4 = 16px top + 16px bottom (unscaled)

  React.useEffect(() => {
    const calc = () => {
      const chromeH = height + 24; // p-3 top + bottom on the bezel
      const avail = window.innerHeight - outerPad; // subtract unscaled padding
      setScale(avail < chromeH ? avail / chromeH : 1);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [height]);

  const chromeW = width + 24;
  const chromeH = height + 24;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4"
      style={devOffset ? { paddingRight: 280 } : undefined}>
      <div style={scale < 1 ? { width: chromeW * scale, height: chromeH * scale } : undefined}>
        <div className="relative bg-[#1a1a1c] rounded-[55px] p-3 shadow-2xl"
          style={{
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))',
            transform: scale < 1 ? `scale(${scale.toFixed(3)})` : undefined,
            transformOrigin: 'top left'
          }}>
          {/* ... rest unchanged ... */}
        </div>
      </div>
    </div>
  );
};
```

**What changed:** Instead of `avail / (height + 56)`, we compute `(avail - 32) / (height + 24)`. This subtracts the unscaled outer padding from the available space, then scales only the chrome frame to fit in the remaining space. The wrapper div (`chromeH * scale`) plus the outer `p-4` (32px) now correctly sums to `<= avail`.

**Verification math:** viewport 800px, Pro Max 932h:
- `avail = 800 - 32 = 768`
- `chromeH = 932 + 24 = 956`
- `scale = 768 / 956 = 0.8033`
- Wrapper height: `956 * 0.8033 = 768`
- Total: `768 + 32 = 800` -- exact fit

### Option B: CSS-only approach (Alternative)

Replace the JS scaling with pure CSS using `max-height` and `aspect-ratio`:

```jsx
const chromeW = width + 24;
const chromeH = height + 24;
const aspect = chromeW / chromeH;

return (
  <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
    <div style={{
      maxHeight: 'calc(100vh - 32px)',
      maxWidth: `calc((100vh - 32px) * ${aspect.toFixed(4)})`,
      width: chromeW,
      height: chromeH,
      aspectRatio: `${chromeW} / ${chromeH}`,
    }}>
      <div className="relative bg-[#1a1a1c] rounded-[55px] p-3 shadow-2xl w-full h-full"
        style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))' }}>
        {/* inner content with width/height: 100% instead of fixed px */}
      </div>
    </div>
  </div>
);
```

This is cleaner conceptually but requires reworking the inner content to use relative sizing instead of fixed pixel dimensions (width/height on the screen div). Since other components depend on the exact pixel dimensions for layout, this is a bigger refactor.

### Option C: Reduce outer padding at small viewports

A minimal change: swap `p-4` to a responsive value that shrinks when space is tight:

```jsx
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-2 sm:p-4"
```

This saves 16px (32 -> 16 total padding) on small screens. Alone it is not enough but combined with the corrected scale math it provides extra breathing room.

---

## Recommendation

**Option A** is the correct fix. It is a 2-line change (add `outerPad` constant, change the scale calculation) that properly solves the math error. The current code is close -- it just conflates scaled and unscaled dimensions in the denominator.

Optionally combine with **Option C** (responsive outer padding) for extra safety on very constrained viewports like 13" MacBooks with multiple browser toolbars.

### Exact Diff (for when ready to merge)

```diff
 const PhoneFrame = ({ children, darkMode = true, width = 393, height = 852, devOffset = false }) => {
   const [scale, setScale] = React.useState(1);
   React.useEffect(() => {
     const calc = () => {
-      const totalH = height + 56; // p-3 (24) + outer p-4 (32)
-      const avail = window.innerHeight;
-      setScale(avail < totalH ? avail / totalH : 1);
+      const chromeH = height + 24; // p-3 (12 top + 12 bottom)
+      const outerPad = 32;         // p-4 (16 top + 16 bottom) — not scaled
+      const avail = window.innerHeight - outerPad;
+      setScale(avail < chromeH ? avail / chromeH : 1);
     };
     calc();
     window.addEventListener('resize', calc);
     return () => window.removeEventListener('resize', calc);
   }, [height]);
```

No other files need changes. The fix is isolated to the PhoneFrame component.
