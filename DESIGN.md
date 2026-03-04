# Aura Design Principles

*Reference for builders and reviewers. Check work against these.*

---

## Visual

- **Dark, cool, glowing.** The app breathes. Atmospheric over structural.
- **Radial gradients, not box-shadows.** Things that feel alive — breathing glows, soft pulses, void.
- **Consistent glow/atmosphere throughout.** Every screen gets the same atmospheric treatment. No dead zones.
- **Confidence = brightness.** Higher confidence level = brighter visual treatment. Dim at level 1, brightest at max.
- **Clean beats dense everywhere.** Even the assessment screen. Philip's instinct is to cram — don't let him. Show what matters, cut the rest.
- **Nothing competes unless it earns its place.** Every element justifies its presence. Question screen = one question, breathing room, answer controls. Assessment = meaningful data, not everything we have.

## Interaction

- **Single-hand phone operation.** Everything reachable with thumb. Bottom-anchored controls.
- **Confidence through gesture, not chrome.** Confidence is set by the interaction itself (tap distance, repeated tap) — not dropdowns, toggle groups, or label soup. The gesture IS the input.
- **Zero jank. Hard gate.** Nothing jumps, goes black, wiggles, or flashes. If jank passes through the build loop, every stage failed. Crossfade between screens, float-in elements, zero layout shift.
- **Button positions are sacred.** Muscle memory IS the better layout. Once a control is placed, it stays.
- **Gear top-right, always.** Settings gear lives in the top-right corner of every screen, no exceptions — including welcome and onboarding. Profile icon sits directly left of the gear. This is the universal anchor.
- **Simple icons, SVG only.** Gear = simple radiating lines, not complex tooth paths. Profile = circle head + arc body. No emoji icons (👤 etc.) — they render differently per platform. Define shared icon components, reuse everywhere.
- **Never force movement.** Don't navigate the user somewhere they didn't ask to go. Switching state (demo profiles, settings toggles) swaps data in place — the screen doesn't change. Dismissing results or modals goes back to where you came from. Every navigation must be the user's choice.
- **Gestures over text.** Tap to skip, swipe to navigate. Guide users with symbols and affordances, not instruction text. Subtle enough to not clutter, clear enough to learn.
- **Follow this document. Then argue.** Builders must implement exactly what's here — no exceptions, no creative reinterpretation. If you think a principle is wrong, ship it as written, then make your case in your handoff. Good arguments win — but only future builds get the change. This version ships by the book.

## Architecture

- **Winamp skins model.** One data contract per input type, swappable visual skins.
- **Open input design space.** Bipolar and multi-choice are live. Ordered lists, drag-above-the-line, ranking — all possible. Don't enumerate types, define the contract. New skins experiment freely.
- **Variable range.** Max confidence set per question/domain/team, not global. Teams can downscale or reject confidence levels. Skins render whatever range they receive.
- **Skin = visual only.** Skins never own state, data logic, or answer semantics. They render and call onChange.
- **`index.html` is cordoned.** Production. Only authorized sessions touch it. Most builders work in `noodle/` and their changes get promoted. Don't mess with the index unless you're specifically told to.

## Never

- Move core controls (back, forward, answer buttons, nav)
- Hard-swap screens without transition
- Add text labels where a gesture or icon suffices
- Break thumb reachability for visual symmetry
- Build a new input implementation instead of skinning the existing contract
- Let glow/atmosphere drop on any screen — no flat, dead panels
- Clip glow with overflow:hidden or container edges — glow bleeds naturally unless an opaque element is naturally in front
- Ship anything janky — zero tolerance, loop-level hard gate
- Skip `TOKENS.md` before visual changes
