# AURA Status

## Current State
- **Branch:** feature/ux-flow-fun
- **Last Updated:** 2026-02-02
- **Last Session:** UX Overhaul - Progressive Onboarding Flow

## What's Working
- Welcome screen with Sign In / Let's Go
- **New progressive onboarding flow** (10 fun questions)
- **Path choice screen** after onboarding (Reveal vs Explore)
- Guest mode with 20-response nudge
- Session persistence for signed-in users
- Supabase backend storing profiles + responses
- **Starter Pack v4.3** - 5-module assessment battery (41 items)
- **Gamification foundation** - XP system, levels, titles

## Handoff Notes

### New Onboarding Flow (This Session)

**Philosophy:** "New users should feel smart, not overwhelmed." Start with fun world questions, teach mechanics progressively.

#### Components Added/Modified:

1. **ONBOARDING_QUESTIONS** (~line 787)
   - 10 fun binary questions about the world (not about the user)
   - Examples: "Which came first - chicken or egg?", "Is a hot dog a sandwich?"

2. **OnboardingFlow Component** (~line 2501)
   - Progressive 10-question flow with MC-style buttons
   - Confidence hint banner appears at question 6+
   - Navigation: single-tap vortex → categories, double-tap → reset to welcome
   - Hamburger menu (☰) for settings access

3. **PathChoiceScreen Component** (~line 2725)
   - Shows after completing 10 onboarding questions
   - Two paths: "Learn About Yourself" (Reveal) or "Explore Topics" (Categories)
   - Same vortex/menu navigation pattern

4. **Gamification System** (~line 1995)
   - `XP_RATES`: answer=5, highConfidence=2, assessment=50, dailyFirst=10, etc.
   - `calculateLevel(xp)`: Level = floor(sqrt(xp / 100)) + 1
   - `LEVEL_TITLES`: Newcomer → Curious Mind → Explorer → ... → Master Mind
   - `LevelUpModal` component for celebrations

5. **VortexButton Component** (~line 2338)
   - Reusable component with single/double tap detection
   - Not currently used (direct handlers preferred for simplicity)

#### Navigation Changes:

- **Vortex (🌀) behavior:**
  - Single tap → Go to categories menu
  - Double tap → Full reset to welcome/login screen

- **Page reload behavior:**
  - Signed-in users → Categories menu
  - Not signed-in (including guests) → Welcome screen

- **NavBar exclusions:** Added 'onboarding' and 'path-choice' to screens that hide the NavBar

#### Key Files Changed:
- `index.html` - All changes in single file (~8000 lines)

#### Key Line References:
- ONBOARDING_QUESTIONS: ~787
- XP_RATES, calculateLevel, LEVEL_TITLES: ~1995
- VortexButton: ~2338
- OnboardingFlow: ~2501
- PathChoiceScreen: ~2725
- getInitialScreen: ~4593
- renderContent (screen routing): ~5396

## Recent Changes (This Session)
- Added 10-question progressive onboarding flow
- Added path choice screen (Reveal vs Explore)
- Added gamification foundation (XP, levels, titles)
- MC-style buttons for onboarding questions
- Confidence tip banner at question 6+
- Vortex: single-tap → categories, double-tap → reset
- Hamburger menu on onboarding/path-choice screens
- Page reload: non-signed-in users go to welcome
- Page reload: signed-in users go to categories (not assess-picker)

## Vision Notes (2026-02-02 Session)

### The Big Picture
Aura Player is the **training ground for the real work**. The self-discovery flow isn't separate from BrightID verification - it's the on-ramp.

**Funnel:**
- Wide top: Fun self-discovery, anyone can do it, immediately valuable
- Middle: Learn mechanics (tap/hold, confidence), build track record, get calibrated
- Narrow bottom: Qualified evaluators who can do serious BrightID verification

### How the Pieces Connect
- **Philip builds:** The front-end - the thing humans touch, that makes them want to participate, that trains them without feeling like training
- **Adam builds:** The backend - trust graphs, energy flow, SybilRank, accountability cascades
- **The merge:** Players calibrated on fun questions can be trusted more on serious questions. Track record transfers.

### BrightID Verification Questions (Same Interface)
The same UI/mechanics work for evaluating unique humanity:
- Have you met them in person?
- Have you touched them?
- When did you last see them?
- Do you know their family?
- Have you seen documents?
- How long have you known them?

### Core Insight
The same interface that helps people understand themselves can train them to evaluate others.

---

## Not Yet Implemented (From Plan)
- Full gamification UI (XP bar display, level-up animations)
- Streak system enhancements
- Achievement badges
- Category feed optimization
- Profile enhancements
- Power user features (auto-submit, undo delay options)
