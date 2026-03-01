# Aura — Project Instructions

## What This Is

Personality assessment app. Questions reveal who you are, one answer at a time. Deeper purpose: recruitment engine for BrightID/Aura Protocol evaluators, disguised as an entertainment app.

Vision stack: BrightID (unique humanity) > Aura Protocol (peer evaluation) > Updraft (economic incentives) > Aura App (consumer funnel) > AI Personality Builder (revenue). This app is top of funnel.

**Deployed:** https://aura-player-one.vercel.app

## Working With Philip

- Philip thinks out loud. Extract intent from the ramble.
- Have opinions. Recommend, don't present options. Better argument wins.
- **Be extremely concise.** 1-3 sentences between tool calls, not paragraphs. State what you're doing and why in one line, then do it. Philip watches progress — he doesn't need a recap at every step.
- Narrative first — what and why, not how. Code when asked or when code IS the message.
- Never restate what he just said. Never ask "what would you like?" without a take.

## Tech Stack

- React 18 via CDN (UMD, not bundled), Tailwind CSS via CDN, Babel standalone (JSX in-browser)
- Supabase JS v2.49.1 (PINNED — never unpinned)
- Single-file architecture: one `index.html`. No build step. This is a locked decision.
- Vercel deployment. Build command: `cp index.html dist/`
- API: `/api/questions.js` + `/api/assess.js` — serverless functions for external AI consumers

## Current State

Active rebuild at `noodle/rebuild/index.html` (~4k lines, down from 13k production). Phase 6 (Supabase integration) in progress. X OAuth verified end-to-end. Google OAuth configured but untested. Philip said he's done with OAuth for now — wants to focus on "the rest of the app."

## Architecture — Locked Decisions

These are NOT up for debate. They were decided deliberately:

- **Single-file architecture.** One index.html. No build step. Max iteration speed. Adam wraps in Vite shell later.
- **Backend isolation.** All cloud communication in 6 functions. Adam swaps to his API. Everything else is backend-agnostic.
- **Supabase = throwaway scaffolding.** Dev/testing only. Adam starts fresh.
- **Atmospheric design language.** Radial gradient glows, NOT CSS box-shadows. Dual-layer breathing. Soft depth over hard structure.
- **Light mode is first-class.** Dark is home, light fully supported.
- **No DPR canvas scaling.** Browser upscale softens gradients naturally.

## Design Language

Dark, cool default. Atmospheric over structural — glows, breathing, void. Things that feel alive. Violet/blue/emerald/pink/cyan color zones. Background near-black (#030712). Design tokens live in `theme.css` as CSS custom properties. Accent colors via `--accent-rgb` — derived tokens auto-follow.

## Critical Rules (Learned the Hard Way)

1. **Never move the buttons.** Answer buttons must NEVER shift position. All transient UI (tips, undo, confirm) must be absolute-positioned overlays above the answer area.

2. **A button and its undo are one thing.** Undo renders INSIDE each button's slot container. Never a sibling overlay. Two sources of truth for dimensions = drift bug.

3. **Never await inside onAuthStateChange.** Supabase JS v2 deadlocks. Use `setTimeout(async () => { ... }, 0)`.

4. **Pin CDN dependencies.** Never `@supabase/supabase-js@2`. Always `@2.49.1`.

5. **Guard cloud calls behind auth.** Always `if (!AURA_AUTH_USER) return;` before Supabase operations.

6. **No React hooks inside IIFEs in render.** React throws "Rendered more hooks" error.

7. **transform: scale() lies about size.** Use CSS `zoom` instead — scale is visual-only, layout box stays full.

8. **Fight the constraint or replace the technique.** When a visual effect breaks layout, reframe: "Why does my technique need to violate this constraint?" Usually there's an equivalent technique that stays in its box.

9. **X OAuth provider string is `x` not `twitter`.** Supabase dashboard may show "twitter" but the API uses `x`.

## Key People

- **Philip** — product, taste, vision
- **Adam Stallard** — BrightID founder, protocol architect, technical co-founder. "Do it Adam's way" on backend/crypto decisions.

## Rebuild Structure

Primitives: Text (emphasis prop), Stack (direction/align/gap), Card, Screen, Button, Modal, Toast. Screen composition target: ~50-80 lines. One styling system: Tailwind for layout, CSS custom properties through component props, inline styles only for truly dynamic values.

Phases 1-5 complete (foundation, core loop, assessments, profile/analysis, social/settings). Phase 6 (Supabase) in progress. Phase 7 (polish) not started.
