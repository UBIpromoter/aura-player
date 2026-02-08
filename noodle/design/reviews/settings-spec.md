# Settings Page Spec -- Aura Player

> **Status:** Draft for review
> **Date:** 2026-02-05
> **Context:** Current mockup (screen-atlas.html `ScreenSettings`) shows 6 controls. Production (index.html `SettingsScreen`) has 11+ controls plus profile management. Both are incomplete -- missing user-facing features that exist in code and features that should exist for a shipping app.

---

## Current State

### What the Mockup Shows (screen-atlas.html)
- Theme toggle (dark/light)
- Undo Delay slider (shown at 2s)
- Require Submit toggle
- Show Tips toggle
- Streak Counter toggle
- Demo Profiles toggle

### What Production Has (index.html)
Everything above, plus:
- **ProfileSection** (sign in / sign up / sign out / sync)
- Answer History link (marked "Coming Soon")
- Keyboard Shortcuts reference
- **Data Management** section (Export JSON, Import JSON, session ID display)
- Clear Assessments button (conditional)
- Reset Demo button
- Version label: "Aura Player vR-Data"

### What Exists in Code but Isn't Exposed in Settings
| Feature | Location | Notes |
|---------|----------|-------|
| `exportForAI(email)` | Line ~899 | Exports data in AI-friendly format from Supabase. Only callable from console. |
| `resetDemo()` | Line ~6482 | Available as button, but also triggered by double-clicking Home in NavBar -- undiscoverable. |
| Community results data | QOTD pool | No way for users to opt out of community features or control visibility. |
| Guest mode tracking | `isGuestMode` state | User has no visibility into guest vs. signed-in state beyond profile section. |
| `showDemoControls` | Stored in assessment storage | Developer toggle that ships to users -- should be hidden or gated. |

---

## Proposed Settings Groups

Modeled after iOS Settings: grouped sections with gray headers, each section a rounded card with dividers between items.

---

### 1. Account

| Setting | Control Type | Default | Description |
|---------|-------------|---------|-------------|
| **Profile** | Inline section | -- | Shows email if signed in, or Sign In / Create Profile buttons if not. |
| **Sync Now** | Button | -- | Pull latest data from cloud. Only visible when signed in. |
| **Sign Out** | Button (destructive style) | -- | Signs out, clears local email. Only visible when signed in. |

**Notes:** This is already implemented as `ProfileSection`. Keep it as the top card. No changes needed beyond polish.

---

### 2. Gameplay

| Setting | Control Type | Default | Description |
|---------|-------------|---------|-------------|
| **Require Submit Button** | Toggle | `true` (on) | When off, tapping an answer submits immediately. When on, you must tap a confirm button. |
| **Undo Delay** | Slider (0-3s, 0.5s steps) | `1s` | How long the undo bar appears after answering. Set to "Off" (0) to disable. |
| **Streak Counter** | Toggle | `true` (on) | Show the fire streak counter in the navigation bar during play. |
| **Show Tips** | Toggle | `true` (on) | Display gesture hints and onboarding tips for new users. |

**Notes:** These are the core interaction settings. All currently implemented and persisted in `demoStorage.settings`. The "Undo Delay" label could use a subtitle: "Time to undo after answering."

---

### 3. Appearance

| Setting | Control Type | Default | Description |
|---------|-------------|---------|-------------|
| **Theme** | Toggle (with sun/moon icon) | System preference (`null`) | Switch between dark and light mode. Default follows system preference. |

**Notes:** Currently implemented. Consider adding a third option: "System" / "Dark" / "Light" as a segmented control instead of a binary toggle, since the code already handles `darkMode: null` as "follow system." This would let users explicitly choose system-follow behavior.

**Proposed new token:** A segmented control component doesn't exist in TOKENS.md -- would need to propose if using three-way.

---

### 4. Data & Privacy

| Setting | Control Type | Default | Description |
|---------|-------------|---------|-------------|
| **Export Data (JSON)** | Button | -- | Download all your answers and assessment data as a JSON file. |
| **Import Data (JSON)** | Button (file picker) | -- | Restore from a previously exported backup file. |
| **Export for AI** | Button | -- | Download your data in a format optimized for use with AI tools (ChatGPT, Claude, etc.). Requires sign-in. |
| **Session ID** | Read-only label | Auto-generated | Your anonymous session identifier. Displayed as small text below export buttons. |

**Notes:**
- `exportForAI()` exists in code but is only callable from the console. This should be surfaced as a button, gated behind sign-in. It produces a cleaner, more structured export than the raw JSON dump.
- Import should show a confirmation dialog before overwriting existing data.
- Consider adding: "Your data is stored locally on this device. When signed in, it syncs to our servers." as a privacy note.

---

### 5. Danger Zone

| Setting | Control Type | Default | Description |
|---------|-------------|---------|-------------|
| **Clear Assessments** | Button (amber/warning) | -- | Clears all personality assessment progress (Big Five, Quick Profile, etc.). Keeps question answers. Only visible if assessment data exists. |
| **Reset All Data** | Button (red/destructive) | -- | Clears all local data and returns to the welcome screen. This cannot be undone. |

**Notes:** Both currently implemented. Should have confirmation dialogs (currently Reset Demo just fires immediately). Rename "Reset Demo" to "Reset All Data" for production -- "Demo" is internal language.

---

### 6. Keyboard Shortcuts

| Setting | Control Type | Default | Description |
|---------|-------------|---------|-------------|
| Reference card | Read-only list | -- | Y/1 = Yes, N/2-5 = No/Options, Arrow/Space = Navigate, Esc = Undo |

**Notes:** Currently implemented as a card with a dimmed border style. This is good -- keep as an info section, not interactive settings. Consider hiding on mobile (no keyboard).

---

### 7. About

| Setting | Control Type | Default | Description |
|---------|-------------|---------|-------------|
| **Version** | Read-only label | `vR-Data` | Current app version string. |
| **Send Feedback** | Link/button | -- | Opens email or feedback form. Not currently implemented. |
| **Credits** | Link/button | -- | Attribution, open source licenses. Not currently implemented. |

**Notes:** Currently only the version label exists ("Aura Player vR-Data" at the bottom). Feedback and credits are standard for shipping apps but don't exist yet. Low priority -- add when ready.

---

## Settings NOT to Include (Considered and Rejected)

| Candidate | Reason to Exclude |
|-----------|-------------------|
| Notification preferences | App has no push notifications. Add when/if implemented. |
| Language/locale | App is English-only. Add when/if i18n is implemented. |
| Sound/haptics | App has no audio or haptic feedback. |
| Font size | App uses responsive `clamp()` sizing. System accessibility handles this. |
| Animation speed | Not configurable currently and no user demand signal. |
| Community opt-out | No server-side community features exist yet (QOTD data is static/local). |

---

## Developer / Debug Section

| Setting | Control Type | Default | Description |
|---------|-------------|---------|-------------|
| **Demo Profiles** | Toggle | `false` (off) | Show sample assessment data for testing. |

**Notes:** This should be hidden behind a gesture or hidden trigger (e.g., tap version label 7 times, like Android developer options). It should NOT ship as a visible toggle alongside user-facing settings. Currently it sits right between "Streak Counter" and "Keyboard Shortcuts," which is confusing for real users.

---

## Visual Layout Recommendation

Follow iOS Settings pattern: scrollable list of grouped cards with section headers.

```
┌─────────────────────────────────┐
│ ← Back       Settings           │
├─────────────────────────────────┤
│                                 │
│ ┌─ Account ───────────────────┐ │
│ │ Profile                     │ │
│ │ philip@example.com          │ │
│ │ [Sync Now]     [Sign Out]   │ │
│ └─────────────────────────────┘ │
│                                 │
│ GAMEPLAY                        │
│ ┌─────────────────────────────┐ │
│ │ Require Submit       [═══] │ │
│ │ Off = auto-submit on tap    │ │
│ ├─────────────────────────────┤ │
│ │ Undo Delay            1.0s │ │
│ │ ────●──────────────────     │ │
│ ├─────────────────────────────┤ │
│ │ Streak Counter       [═══] │ │
│ │ Show 🔥 during play         │ │
│ ├─────────────────────────────┤ │
│ │ Show Tips            [═══] │ │
│ │ Gesture hints               │ │
│ └─────────────────────────────┘ │
│                                 │
│ APPEARANCE                      │
│ ┌─────────────────────────────┐ │
│ │ Theme          [🌙 Dark ▾] │ │
│ └─────────────────────────────┘ │
│                                 │
│ DATA & PRIVACY                  │
│ ┌─────────────────────────────┐ │
│ │ [Export JSON] [Import JSON] │ │
│ │ [Export for AI]              │ │
│ │ Session: abc123...          │ │
│ └─────────────────────────────┘ │
│                                 │
│ ⌨️ KEYBOARD SHORTCUTS           │
│ ┌─────────────────────────────┐ │
│ │ Yes / Option A    Y or 1   │ │
│ │ No / Option B-E   N or 2-5 │ │
│ │ Next question     → Space  │ │
│ │ Previous          ←        │ │
│ │ Undo              Esc      │ │
│ └─────────────────────────────┘ │
│                                 │
│ DANGER ZONE                     │
│ ┌─────────────────────────────┐ │
│ │ [Clear Assessments] [Reset] │ │
│ └─────────────────────────────┘ │
│                                 │
│     Aura Player vR-Data         │
│                                 │
└─────────────────────────────────┘
```

### Layout Rules
- **Section headers:** Uppercase, small text, muted color (`text-faint`). Sits above each card group.
- **Cards:** Use `TH('bg-card-shine')` for interactive sections. Use dimmed border style for read-only sections (keyboard shortcuts).
- **Dividers inside cards:** 1px border between items within the same group. No border on last item.
- **Toggles:** Right-aligned, violet when on, gray when off. Consistent 12x6 sizing.
- **Destructive buttons:** Amber for partial clears, rose for full resets. Confirmation dialog required.
- **Spacing:** `space-y-3` between cards, `p-4` page padding. Section headers get `mt-2` extra above.
- **Scrollable:** Entire settings body scrolls. Header stays fixed.

### Key Differences from Current Implementation
1. **Add section headers** -- currently all settings are flat cards with no grouping labels.
2. **Group related controls** into single cards with internal dividers (gameplay settings should be one card, not four separate cards).
3. **Move Demo Profiles** behind a hidden developer trigger.
4. **Surface Export for AI** as a visible button.
5. **Rename "Reset Demo"** to "Reset All Data."
6. **Add confirmation dialogs** for destructive actions.
7. **Consider three-way theme control** (System / Dark / Light).

---

## Implementation Priority

| Priority | Item | Effort |
|----------|------|--------|
| **P0** | Group settings into sections with headers | Small -- restructure existing JSX |
| **P0** | Rename "Reset Demo" to "Reset All Data" | Trivial |
| **P0** | Add confirmation dialogs for destructive actions | Small |
| **P1** | Surface "Export for AI" button | Small -- function exists, needs UI |
| **P1** | Hide Demo Profiles behind developer gesture | Small |
| **P1** | Three-way theme selector (System/Dark/Light) | Medium -- new component |
| **P2** | Add feedback link in About section | Trivial once destination decided |
| **P2** | Hide keyboard shortcuts on mobile | Trivial -- check touch/viewport |
| **P3** | Answer History screen (currently "Coming Soon") | Large -- separate feature |
