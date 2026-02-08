# PWA / Home Screen Pinning Audit — Aura Player

**Audited:** 2026-02-05
**File:** `/Users/philipsilva/Code/Aura/index.html` (~9765 lines, single-file React app)

---

## 1. Current State

### Meta Tags (Lines 5-9)
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Aura">
<meta name="theme-color" content="#030712">
```

**Verdict:** The meta tags are correctly configured. `viewport-fit=cover` is present, `apple-mobile-web-app-capable` enables standalone mode, and `black-translucent` makes the status bar transparent over app content — which is exactly what triggers the safe area problem if not handled downstream.

### CSS Custom Properties (Lines 17-22)
```css
:root {
  --sat: env(safe-area-inset-top);
  --sar: env(safe-area-inset-right);
  --sab: env(safe-area-inset-bottom);
  --sal: env(safe-area-inset-left);
}
```

### Utility Classes (Lines 46-47)
```css
.safe-top { padding-top: env(safe-area-inset-top); }
.safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
```

### Display Mode Detection (Lines 3365-3383)
```javascript
const useDisplayMode = () => {
  const getMode = () => {
    if (window.matchMedia('(display-mode: standalone)').matches) return 'mobile';
    if (window.navigator.standalone === true) return 'mobile';
    if (window.innerWidth <= 768) return 'mobile';
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return 'mobile';
    return 'desktop';
  };
  // ...
};
```

**Note:** This detects standalone mode but groups it with "mobile" — it does NOT distinguish between "browser tab on phone" and "pinned to home screen." This is a problem because safe area insets behave differently in each context.

### What's Missing

| Component | Status |
|-----------|--------|
| `manifest.json` | **MISSING** — no web app manifest at all in production root |
| Service Worker | **MISSING** — no service worker for offline caching |
| `apple-touch-icon` | **MISSING** — no icon link tag; iOS will screenshot the page |
| `<link rel="manifest">` | **MISSING** — no manifest link in `<head>` |

---

## 2. Issues Found

### CRITICAL: Fake Status Bar in PhoneFrame (Line 3758-3771)

The `PhoneFrame` component (desktop wrapper) renders a fake Dynamic Island notch and fake status bar elements:

```jsx
// Line 3759 — Fake Dynamic Island
<div className="absolute top-3 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-30" />

// Line 3760-3771 — Fake status bar with "9:41", signal, wifi, battery
<div className="flex-shrink-0 flex items-end justify-between px-8 pb-2 h-[54px] ...">
  <span>9:41</span>
  // fake signal bars SVG
  // fake wifi SVG
  // fake battery SVG
</div>
```

**Impact:** This is desktop-only (PhoneFrame only renders when `displayMode === 'desktop'`, line 9708-9731), so it does NOT appear on actual phones. **This is safe as-is.** The PhoneFrame is a mockup wrapper for desktop browsers. No action needed on this specific issue.

### HIGH: Screens Without Safe Area Protection (Multiple Lines)

The mobile layout (line 9736-9758) wraps the NavBar in `.safe-top` and adds `.safe-bottom` at the end:

```jsx
// Line 9749 — safe-top wraps NavBar
<div className="safe-top">
  <NavBar ... />
</div>
// Line 9754 — safe-bottom at end
<div className="safe-bottom" />
```

**BUT** — the NavBar is conditionally hidden for these screens (line 9748):
```jsx
screen !== 'launch' && screen !== 'welcome' && screen !== 'onboarding' &&
screen !== 'path-choice' && screen !== 'settings' && screen !== 'categories'
```

When NavBar is hidden, the `.safe-top` wrapper is also removed. These screens have **zero safe area protection at the top:**

| Screen | Has Own Safe Area? | Risk |
|--------|--------------------|------|
| `welcome` (WelcomeScreen, line 3916) | NO — uses `flex-1 flex flex-col items-center justify-center p-8` | Low (centered content) |
| `onboarding` (OnboardingFlow, line 4080) | NO — header at `px-5 pt-4 pb-2` | **HIGH** — vortex button + hamburger menu at top |
| `path-choice` (PathChoiceScreen, line 4223) | NO — header at `px-5 pt-4 pb-2` | **HIGH** — same issue |
| `settings` (SettingsScreen, line 5753) | NO — header at `px-4 py-3` | **HIGH** — "Back" button overlaps Dynamic Island |
| `categories` (CategoryScreen, line 4969) | NO — header at `px-5 pt-4 pb-2` | **HIGH** — vortex + profile buttons overlap |
| `launch` (LaunchScreen, line 4354) | NO — delegates to WelcomeScreen | Low (centered) |

**On iPhone 14 Pro+ (Dynamic Island), the top safe area inset is ~59px.** A `pt-4` (16px) leaves the top ~43px of content hidden behind the Dynamic Island. The hamburger menu (line 4089, 4232) and vortex button become partially or fully inaccessible.

### HIGH: CategoryScreen Header Overlaps Dynamic Island (Line 4972)

```jsx
<div className="flex items-center justify-between px-5 pt-4 pb-2">
  <button className="text-3xl btn-feedback" onDoubleClick={onResetQotd}>vortex</button>
  // ... profile icon, streak, settings
</div>
```

This renders the entire app hub with no top safe area. The vortex button, level badge, streak counter, profile icon, and settings hamburger all render at `pt-4` (16px from top) — well inside the Dynamic Island zone.

### HIGH: SettingsScreen Header Behind Notch (Line 5753-5758)

```jsx
<div className="flex items-center justify-between px-4 py-3 border-b ...">
  <button onClick={onBack} className="...">Back</button>
  <h1 className="font-semibold">Settings</h1>
  <div className="w-12" />
</div>
```

The "Back" button is the only way to exit settings. If it's behind the Dynamic Island, the user is trapped.

### MEDIUM: Bottom Sheets Don't Account for Home Indicator (Lines 4662-4663)

```jsx
const BottomSheet = ({ onClose, darkMode, children }) => (
  <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50 pb-8" onClick={onClose}>
```

The `pb-8` (32px) provides some bottom padding, but on devices with the home indicator bar (~34px safe area), this is barely enough. The bottom of bottom sheets may overlap the swipe-up zone.

### MEDIUM: Toast Notification Uses Fixed `top: 120px` (Line 973-974)

```javascript
toast.style.cssText = `
  position: fixed;
  top: 120px;
  ...
`;
```

This hardcoded position doesn't use `env(safe-area-inset-top)`. On most devices 120px is enough to clear the notch, but it's fragile and doesn't adapt. Should use `calc(env(safe-area-inset-top) + 120px)` or similar.

### MEDIUM: assess-picker Screen Missing Safe Area (Line 7174)

```jsx
<div className={`h-full flex flex-col ${TH('bg-main', darkMode)}`}>
```

The assessment picker has its own header (with back button, demo controls) at line 7208+ but no safe area wrapper. The back arrow at line 7942 would be behind the Dynamic Island.

### MEDIUM: Expanded Community Panel Bottom Safe Area (Line 9582)

```jsx
<div className="absolute bottom-0 left-0 right-0 rounded-t-2xl ...">
```

This slide-up panel anchors to `bottom-0` without accounting for the home indicator safe area.

### LOW: No `apple-touch-icon` (Missing)

Without an `<link rel="apple-touch-icon">` tag, iOS will take a screenshot of the page as the home screen icon, which looks unprofessional.

### LOW: No `manifest.json` (Missing)

No web app manifest means:
- No install prompt on Android
- No splash screen configuration
- No icon specification
- No `display: standalone` declaration for Android Chrome

---

## 3. Missing Pieces

### Must Have

1. **Safe area handling for ALL screens** — not just the ones with NavBar
2. **`manifest.json`** with proper icons, display mode, theme color
3. **`apple-touch-icon`** link tag
4. **Standalone mode detection** that distinguishes browser vs. pinned

### Should Have

5. **Service worker** for offline caching (single-file app should cache itself)
6. **Splash screen meta tags** for iOS (`apple-touch-startup-image`)
7. **Left/right safe area insets** applied to scrollable content areas (for landscape)

### Nice to Have

8. **Android TWA / install banner** support
9. **`theme-color` media query** variant for light mode

---

## 4. Fix Plan

### Fix 1: Add Safe Area to ALL Screen Headers (HIGH priority)

Every screen that has its own header needs safe area padding. The cleanest approach: add `.safe-top` to the root mobile container unconditionally, not just conditionally around NavBar.

**Current (line 9736-9754):**
```jsx
<div className={`h-full flex flex-col ${TH('bg-main', darkMode)}`}>
  {darkMode && <div className="global-stars" />}
  {screen !== 'launch' && ... && (
    <div className="safe-top">
      <NavBar ... />
    </div>
  )}
  <div className="flex-1 flex flex-col overflow-hidden">{renderContent()}</div>
  <div className="safe-bottom" />
</div>
```

**Proposed:**
```jsx
<div className={`h-full flex flex-col ${TH('bg-main', darkMode)}`}
  style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
  {darkMode && <div className="global-stars" />}
  {screen !== 'launch' && ... && (
    <NavBar ... />
  )}
  <div className="flex-1 flex flex-col overflow-hidden">{renderContent()}</div>
</div>
```

This approach:
- Applies safe area padding to the outermost mobile container
- All child screens automatically get the safe area respected
- No need to modify every individual screen component
- Removes the separate `.safe-top` / `.safe-bottom` wrappers

**Alternative (safer, less refactoring):** Keep current structure but add `.safe-top` to screens that skip NavBar. Each of these screens needs its outermost `<div>` to include `safe-top`:

```jsx
// OnboardingFlow (line 4081)
<div className={`flex-1 flex flex-col safe-top ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>

// PathChoiceScreen (line 4224)
<div className={`flex-1 flex flex-col safe-top ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>

// SettingsScreen (line 5753)
<div className={`flex-1 flex flex-col overflow-hidden safe-top ${TH('bg-main', darkMode)}`}>

// CategoryScreen (line 4970)
<div className={`flex-1 flex flex-col relative safe-top ${TH('bg-main', darkMode)}`}>

// WelcomeScreen (line 3918) — centered content, but add for safety
<div className="flex-1 flex flex-col items-center justify-center p-8 safe-top" ...>
```

And ensure they all also get `safe-bottom` either via the parent wrapper or individually.

### Fix 2: Root-Level Safe Area (Recommended - Simplest)

The cleanest fix that covers everything: apply safe areas to the root mobile `<div>` and remove the conditional wrappers.

**Change the mobile return (line 9736-9758) to:**

```jsx
return (
  <div
    className={`h-full flex flex-col ${TH('bg-main', darkMode)}`}
    style={{
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)',
    }}
    onClickCapture={(e) => {
      if (pendingSubmit) {
        e.stopPropagation();
        handleUndo();
      }
    }}
  >
    {darkMode && <div className="global-stars" />}
    {screen !== 'launch' && screen !== 'welcome' && screen !== 'onboarding' && screen !== 'path-choice' && screen !== 'settings' && screen !== 'categories' && (
      <NavBar ... />
    )}
    <div className="flex-1 flex flex-col overflow-hidden">{renderContent()}</div>
    {showSaveNudge && <SaveProgressModal ... />}
    {levelUpData && <LevelUpModal ... />}
  </div>
);
```

Remove the `<div className="safe-top">` wrapper (line 9749) and `<div className="safe-bottom" />` (line 9754) since the root now handles it.

**Important:** The `global-stars` div uses `position: fixed; inset: 0` — it should NOT be affected by parent padding. Modals using `position: fixed` also escape this layout. Only the flow-layout children benefit from the padding, which is exactly what we want.

### Fix 3: Background Color Behind Safe Area (HIGH priority)

With `black-translucent` status bar style and `viewport-fit=cover`, the area behind the status bar/Dynamic Island is transparent. The app's background color needs to extend behind it.

The current `html, body, #root { background: #030712; }` (line 31) handles this for dark mode. But if dark mode is off, the safe area background will still be `#030712` while the app content is `#f9fafb`.

**Fix:** Make the root background dynamic. Add to the mobile container:
```jsx
style={{
  backgroundColor: darkMode ? '#030712' : '#f9fafb',
  paddingTop: 'env(safe-area-inset-top)',
  // ...
}}
```

Or better, update the CSS:
```css
html, body, #root {
  background: var(--app-bg, #030712);
}
```

And set `--app-bg` based on dark mode in the React app.

### Fix 4: Create manifest.json

Create `/Users/philipsilva/Code/Aura/manifest.json`:

```json
{
  "name": "Aura Player",
  "short_name": "Aura",
  "description": "Discover yourself, one question at a time",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#030712",
  "theme_color": "#030712",
  "orientation": "portrait",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "icons/icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

Add to `<head>` (after line 9):
```html
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
```

**Note:** You'll need to generate actual icon PNGs. A vortex emoji rendered to canvas or a designed icon.

### Fix 5: Toast Notification Safe Area (MEDIUM priority)

**Current (line 973):**
```javascript
top: 120px;
```

**Fix:**
```javascript
top: calc(env(safe-area-inset-top, 0px) + 80px);
```

This adapts to the actual safe area and adds 80px below it.

### Fix 6: Bottom Sheet Safe Area (MEDIUM priority)

**Current (line 4663):**
```jsx
<div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50 pb-8">
```

**Fix:**
```jsx
<div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50"
  style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 32px)' }}>
```

This ensures the bottom sheet content clears both the home indicator and has breathing room.

Also fix the NoneOptionModal at line 4817:
```jsx
<div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50"
  style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 32px)' }}>
```

### Fix 7: Slide-Up Panel Bottom Safe Area (MEDIUM priority)

**Current (line 9582):**
```jsx
<div className="absolute bottom-0 left-0 right-0 rounded-t-2xl ...">
```

**Fix:** Add padding-bottom to the panel content:
```jsx
<div className="absolute bottom-0 left-0 right-0 rounded-t-2xl ..."
  style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
```

### Fix 8: Add Standalone Detection Helper (LOW priority)

Currently `useDisplayMode` returns 'mobile' for both browser and standalone. Add a helper:

```javascript
const useIsStandalone = () => {
  const [standalone, setStandalone] = React.useState(false);
  React.useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setStandalone(isStandalone);
  }, []);
  return standalone;
};
```

This can be used for conditional UI decisions (like hiding "Add to Home Screen" prompts for users who already pinned it).

---

## 5. Testing Checklist

### Device Testing

- [ ] **iPhone 14 Pro / 15 Pro (Dynamic Island)** — Most critical. Top safe area ~59px.
  - [ ] Pinned to home screen: All headers clear the Dynamic Island
  - [ ] In Safari: Headers show correctly (Safari provides its own chrome)
  - [ ] Categories screen: vortex button, profile icon, hamburger all tappable
  - [ ] Settings screen: "Back" button accessible
  - [ ] Onboarding flow: vortex and hamburger accessible
  - [ ] Path choice screen: buttons accessible

- [ ] **iPhone 13 / SE (notch or no notch)** — Verify no excessive padding on non-Dynamic-Island devices
  - [ ] Safe area insets collapse to 0 or smaller values on non-notch devices
  - [ ] Layout doesn't have unnecessary gaps

- [ ] **iPad** — May render in mobile mode due to width check
  - [ ] Safe areas handled (iPads with Face ID have safe areas)

- [ ] **Android Chrome** — Verify manifest.json is picked up
  - [ ] Install banner appears (if manifest + service worker present)
  - [ ] Standalone mode works after install

### Screen-by-Screen Verification

For each, test in **both** Safari tab and home screen standalone:

| Screen | Check |
|--------|-------|
| Welcome | Content centered, not cut off at top/bottom |
| Onboarding | Vortex button + hamburger visible and tappable |
| Path Choice | Vortex button + hamburger visible and tappable |
| Categories | Full header visible: vortex, level, streak, profile, settings |
| Question (with NavBar) | NavBar fully visible, bottom buttons above home indicator |
| Settings | "Back" button tappable, all toggles reachable |
| Assessment Picker | Back arrow visible, demo profile bar visible |
| Assessment in progress | Header + progress visible |
| Bottom sheets | Content above home indicator bar |
| Toasts | Visible below Dynamic Island / status bar |

### Automated Checks

```javascript
// Paste in browser console on device to verify safe area values:
console.log('SAT:', getComputedStyle(document.documentElement).getPropertyValue('--sat'));
console.log('SAR:', getComputedStyle(document.documentElement).getPropertyValue('--sar'));
console.log('SAB:', getComputedStyle(document.documentElement).getPropertyValue('--sab'));
console.log('SAL:', getComputedStyle(document.documentElement).getPropertyValue('--sal'));

// Check if running standalone:
console.log('Standalone:', window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches);
```

---

## 6. Priority Summary

| # | Fix | Priority | Effort | Impact |
|---|-----|----------|--------|--------|
| 1-2 | Root-level safe area padding | HIGH | Small | Fixes ALL top/bottom overlap issues at once |
| 3 | Background color behind safe area | HIGH | Small | Prevents color mismatch in light mode |
| 4 | Create manifest.json + icons | HIGH | Medium | Proper PWA identity, install prompt |
| 5 | Toast safe area | MEDIUM | Tiny | Prevents toast behind notch |
| 6 | Bottom sheet safe area | MEDIUM | Small | Prevents overlap with home indicator |
| 7 | Slide-up panel safe area | MEDIUM | Small | Same as above |
| 8 | Standalone detection helper | LOW | Small | Enables future standalone-specific UI |

**Recommendation:** Fix 2 (root-level safe area) solves the biggest class of problems with one change. Start there, then tackle manifest/icons, then the medium-priority items.

---

## 7. Key Insight: Why the Menu Gets "Messed Up"

The reported issue — "top corner gets messed up and menu becomes inaccessible" — has a clear root cause:

1. `apple-mobile-web-app-status-bar-style: black-translucent` + `viewport-fit=cover` tells iOS: "Let the app draw under the status bar / Dynamic Island."
2. The app correctly sets up `env(safe-area-inset-top)` CSS variables.
3. The main app shell (line 9749) correctly wraps NavBar in `.safe-top`.
4. **BUT** — six screens skip the NavBar AND its `.safe-top` wrapper, rendering their own headers directly at the top of the viewport.
5. On a Dynamic Island iPhone (~59px safe area), this means the first ~59px of those screens are behind the opaque Dynamic Island pill + status bar time/icons.
6. The hamburger menu (line 4089, 4232, 5755) sits in this obscured zone.

The fix is straightforward: ensure safe area padding is always present, regardless of which screen is active.
