# Aura Rebuild — Visual QA Inventory

> QA pass date: 2026-03-01
> File under test: `noodle/rebuild/index.html` (CP-8)
> Browser: Chrome via localhost:8765, iPhone 15 PM frame, dark theme

---

## Bugs Found

| # | Screen / Flow | Description | Severity |
|---|--------------|-------------|----------|
| 1 | Bridge screen | Bridge screen ("Good taste. Now let's see who you really are.") may flash too fast or skip entirely during onboarding → Quick Profile transition. Went straight from Onboarding Q5 to Quick Profile Q1 with no visible pause. | Medium |

---

## Screens Tested — Dark Theme

### Golden Path
| Screen | Status | Notes |
|--------|--------|-------|
| Landing | ✅ Clean | Dev panel visible |
| Onboarding Q1-Q5 | ✅ Clean | All 5 questions, progress bar advancing |
| Bridge | ⚠️ BUG #1 | See bugs table |
| Quick Profile Q1-Q5 | ✅ Clean | Progress bar, all options render |
| Assessment Results | ✅ Clean | Trait bars, personality blurb, CTAs |
| Profile | ✅ Clean | Guest, 1 assessment, Your Aura card |
| Analysis | ✅ Clean | Progress bar, gem visualization |

### Categories Hub
| Screen | Status | Notes |
|--------|--------|-------|
| Category grid | ✅ Clean | Streak counter, SELF section with Verify button |

### Verify Path A — Vouching (Aisha, 31 connections)
| Screen | Status | Notes |
|--------|--------|-------|
| Verify Hub | ✅ Clean | "8 pending", collapsible UP NEXT (intentional) |
| Smart path suggestion | ✅ Clean | "Likely" on Path A (31 connections >= 5) |
| A Q1: Connection fields | ✅ Clean | Relationship/How long/Last contact — VerifyFieldGroup |
| A Q2: Identity check | ✅ Clean | Gaming/one account options |
| A Q3: Verdict | ✅ Clean | Yes/No, confidence scale, "Anything feel off?" textarea, pulse animation |
| Evaluation Summary | ✅ Clean | Summary card rendered |
| Submit → Hub | ✅ Clean | "1 evaluated · 7 pending" |

### Verify Path B — Investigation (Sofia, 22 connections)
| Screen | Status | Notes |
|--------|--------|-------|
| Smart path suggestion | ✅ Clean | Path B selected |
| B Q1: How did you meet | ✅ Clean | 3 options (In person selected) |
| B Q2: Who initiated | ✅ Clean | Options rendered |
| B Q3: Brief context | ✅ Clean | Free text input, Continue activates on input |
| B Q4: Evidence | ✅ Clean | Two sections (Directly Observed + Supporting Evidence), multi-select with green checks |
| B Q5: Identity check | ✅ Clean | Gaming (Unlikely) + one account (Yes), "Select one from each · 0 of 2" counter |
| B Q6: Verdict | ✅ Clean | Yes/No, confidence 1-4, "Anything feel off?" collapsible, amber pulse glow |
| Evaluation Summary | ✅ Clean | Path B badge, verdict card, all responses listed, weighting text |
| Submit → Hub | ✅ Clean | "2 evaluated · 6 pending" |
| Readonly view (Sofia) | ✅ Clean | Same layout minus action buttons, "Submitted 3/1/2026" timestamp |
| Readonly view (hub) | ✅ Clean | "RECENTLY EVALUATED (2)" collapse/expand, green "Done" badges |

### Verify Path C — Analysis (Marcus Chen, 0 connections)
| Screen | Status | Notes |
|--------|--------|-------|
| Smart path suggestion | ✅ Clean | "Likely" on Path C (0 connections), all 3 paths shown |
| C Q1: What are you working from | ✅ Clean | 6 multi-select options, "Toggle all that apply" |
| C Q2: Profile confidence | ✅ Clean | 1-4 scale (Gaps/Fair/Confident/Certain) |
| C Q3: Strongest signals | ✅ Clean | "Pick up to two", 5 options |
| C Q4: Biggest gaps | ✅ Clean | "Pick up to two", 5 options |
| C Verdict | ✅ Clean | No identity check (expected for profile-only path), same Yes/No + confidence + "Anything feel off?" |
| Evaluation Summary | ✅ Clean | Path C badge (slate), all responses, weighting text says "(Analysis)" |
| Submit → Hub | ✅ Clean | "3 evaluated · 5 pending", "RECENTLY EVALUATED (3)" |

### Settings (dark + light)
| Screen | Status | Notes |
|--------|--------|-------|
| Sign In row | ✅ Clean | "Sign In" button, "Sync across devices, never lose data" |
| Theme toggle | ✅ Clean | Toggles between dark/light, dev panel icon changes (moon/sun) |
| Undo Delay slider | ✅ Clean | Draggable thumb, "1s" label |
| Require Submit Button | ✅ Clean | Toggle with description |
| Show Tips | ✅ Clean | Toggle with description |
| Streak Counter | ✅ Clean | Toggle with description |
| I am a... | ✅ Clean | Toggle shows "Human" |
| Keyboard Shortcuts | ✅ Clean | Collapsible section |
| Your Data / Export JSON | ✅ Clean | Button renders |
| Clear Assessments | ✅ Clean | Red border button |
| Clear Verification | ✅ Clean | Red border button, side-by-side with Clear Assessments |
| Reset All Data | ✅ Clean | Red border button, full width |
| Version string | ✅ Clean | "Aura Player vR5" at bottom |
| Light theme | ✅ Clean | White bg, purple accents, good contrast |

**Note:** No "stamps" section visible — may be production-only feature not yet ported.

### Compare (light theme)
| Screen | Status | Notes |
|--------|--------|-------|
| Comparison state | ✅ Clean | Share CTA (Post/Share/Text/Link), 5 trait bars with F/Y markers, legend |

### QotD (light theme)
| Screen | Status | Notes |
|--------|--------|-------|
| Question display | ✅ Clean | Source badge, question text, green Yes / pink No buttons |

### Question Flow (light theme)
| Screen | Status | Notes |
|--------|--------|-------|
| Already-answered state | ✅ Clean | Category filters (Y/N, ABC, Mix), "Already answered" hint |

### Light Theme — Spot Checks
| Screen | Status | Notes |
|--------|--------|-------|
| Settings | ✅ Clean | White bg, purple accents, good contrast |
| Categories Hub | ✅ Clean | Pastel card tints, SELF section visible |
| Profile | ✅ Clean | Guest, Your Aura card, assessments list |
| Compare | ✅ Clean | Trait bars readable |
| QotD | ✅ Clean | Good contrast |
| Question | ✅ Clean | Category filters visible |

### pushState Back Button
| Test | Status | Notes |
|------|--------|-------|
| Categories → back → Question | ✅ Works | Correctly navigates history stack |
| Question → back → Compare | ✅ Works | Continues through stack correctly |
| Profile skipped (not in HISTORY_SCREENS) | ℹ️ Observation | "profile" not in HISTORY_SCREENS set — navigating to Profile doesn't push history entry. May be intentional. |

---

## Summary

**Total screens tested:** 45+
**Bugs found:** 1
**Observations:** 2

### Bug List
1. **Bridge screen flash** (Medium) — Bridge screen may flash too fast or skip during onboarding → Quick Profile transition

### Observations (not bugs, needs discussion)
1. **No stamps section** in Settings — may be production feature not yet ported
2. **"profile" not in HISTORY_SCREENS** — browser back skips Profile screen. May be intentional design.

---

## Notes
- Testing with dev panel in Human mode
- iPhone 15 PM device frame
- Dark theme tested on: Golden path, Categories, Verify Hub, all 3 Verify paths, Readonly view
- Light theme tested on: Settings, Categories, Profile, Compare, QotD, Question
- pushState tested with browser back button navigation
