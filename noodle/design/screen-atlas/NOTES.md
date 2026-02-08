# Screen Atlas — Design Notes

## ⭐ STARRED: Answer Button Timing & Feel

**Priority: Highest. This is the core interaction loop.**

Philip's direction: The answer flow needs to feel *perfect under their fingers* for first-time users, not just power users.

### Principles
- **Fixed button positions** — Answer buttons (YES/NO, MC options) NEVER move. Same position every time. Muscle memory.
- **No disruptions** — Nothing can pop up, slide in, or shift the layout while the user is in the answer zone. Zero surprises.
- **Generous timing** — Regular users don't know multi-tap/gesture patterns. Leave MORE room between tap → response → next question. The undo window gives us this space — use it.
- **The undo window IS the safety net** — Because we have undo, we can let answers register immediately without confirmation dialogs. Fast but forgivable.

### Review Required
Full team review (Feel + Look + Work) of the actual interaction:
1. Tap answer → what happens visually? How fast?
2. Transition to next question → timing, animation
3. Undo affordance → is it obvious enough for new users?
4. Accidental taps → how forgiving are we?
5. The whole sequence from "see question" → "answer" → "see result" → "next question"

### The Test
> "Would Philip's mom feel confident using this without being told how?"

If the answer is no, the timing is wrong.

---

## Production Concerns (from Philip's review)

### PWA / Home Screen Pinning
- When pinned to home screen, top corner gets messed up and menu becomes inaccessible
- Need to handle safe areas properly (`env(safe-area-inset-*)`)
- Must work for both: browser tab users AND pinned-to-homescreen users
- Philip will pin it — so PWA mode is first-class

### Status Bar Elements
- Fake 9:41 / battery / signal icons are great in mockups
- Must NEVER appear in production code — real device provides these
- In PWA mode, status bar is the OS's job

### Settings Page
- Current mockup looks nice but incomplete
- Future task: flesh out with all real settings
- Low priority — design is directionally good

### Screen Components That Need More Work
- QotD: simplified but may need more iteration on the real interaction
- Results: confidence bars now match production pattern
- Profile: dual-color spectrums done, but may need real data shapes
- Assessment Results: dual-color spectrums done

## Device Sizes (for atlas)
- iPhone SE: 375×667 (no Dynamic Island)
- iPhone 15: 393×852 (Dynamic Island)
- iPhone Pro Max: 430×932 (Dynamic Island)
- Pixel: 412×915 (no Dynamic Island)
- Android Compact: 360×800 (no Dynamic Island)

## Direction Decisions
- **Winner:** Hybrid (Minimal gallery + Showroom nav)
- **Runner-up:** Glass v2 (for deeper dark mode aesthetic)
- **Parked:** Flow Map (useful for flow documentation, not daily atlas)
- **Out:** Editorial
