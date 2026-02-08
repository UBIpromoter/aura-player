# App Feedback Modernization Plan

> Source: Philip's phone walkthrough (dark mode), 2026-02-08.
> Contract: every item reviewed at end of Phase 2. Nothing gets lost.

---

## Phase 1 — Fix What's Broken

Functional UX fixes. No design system work yet — just solve real problems.

| # | Item | Detail | Status |
|---|------|--------|--------|
| 1 | Undo dialog moves buttons | Top toast or floating bar ABOVE action area. User can undo without accidentally re-tapping. Buttons never move. | ✅ |
| 2 | Action buttons too small | Four buttons (save, skip, confirm, cancel) use full screen width with proper padding. | ✅ |
| 3 | Multiple choice confirm/cancel too small | Checkmark and X need real touch targets, especially on small phones. | ✅ |
| 4 | Save button gives no feedback | Pop-up animation mid-screen: checkmark + "Saved for later." Quick, doesn't interrupt flow. | ✅ |
| 5 | Community answers show too early | Clean question page first. Community only appears AFTER you've answered. Never expanded by default. Remove "last" label. | ✅ |
| 6 | Categories screen: two sections | One page, two sections. World questions up top, Self assessments below with a clear divider. Surprise Me stays within context. Assessment Surprise Me = random test, no picking. | ✅ |
| 7 | Reveal repositioned | Keep the name (rename parked for future). But visually separate it from question categories — it's the assessment section, not a peer of Predict/Think/Judge. | ✅ |
| 8 | Profile: completed vs available | Available assessments = prominent, encouraged. Completed = muted (gray/filler background). At-a-glance distinction. | ✅ |
| 9 | "One more to complete" needs CTA | Whenever a category is incomplete, show a button to continue right there. Always help people finish. | ✅ |
| 10 | Pointless carets on single items | Only show expand caret when expansion is meaningful. One item = just show it inline. | ✅ |
| 11 | Assessment ordering | ADHD Screening shouldn't lead Mind category. Lead with something engaging, not clinical. | ✅ |
| 12 | ShadowSelf slider gradient | Midpoint too light. Should be darker in the middle. Dark-side people know it — gradient should feel honest, not skewed toward light. | ✅ |
| 13 | Personality color change | Personality shifts away from violet to differentiate from Starter Pack (indigo). Pick something that works against the full palette. Update TOKENS.md. | ✅ |
| 14 | Counter circles rethought | Remove raw numbers (245, 155). Replace with question type indicators — binary vs multiple choice. Not volume, just type. | ✅ |
| 15 | Question of the day text balance | When text wraps to two lines, balance it across lines. Center vertically and horizontally. | ✅ |
| 16 | Binary non-yes/no color | Green/red ONLY for actual yes/no. Other binary questions need a different color pairing. | ✅ |
| 17 | Onboarding hint | Subtle gray text on early questions: "we'll start easy" or similar. Visible if you're looking, not in your face. | ✅ |

---

## Phase 2 — Design System + Modernization

Define the modern Aura design language as reusable Legos. Then roll it across every legacy screen.

### Gate: Macro Design Review (/arena macro)

Before building any Legos, run a macro design review across Aura's key screens. The goal: establish the visual language that the Legos encode. Not "what components do we need" — "what does great look like, and how do we make it repeatable." Arena session produces the reference points. Lego specs derive from those.

### 2A: Component Spec (the Legos)

Define from the best existing patterns in onboarding/assessment + macro review output:

| Component | What It Is |
|-----------|-----------|
| **ActionButton** | Standard tappable button. Ghost pill style. Full-width option. Size tiers for different contexts. |
| **QuestionCard** | Glow treatment, text sizing, category label (no bubble). |
| **Toast** | Top-floating, non-displacing, auto-dismiss. For confirmations/undo. |
| **ExpandableOverlay** | Simple tier: expanding card, tap-away dismiss, soft colors. Complex tier: slide-up sheet ~80% screen. Elegant expand/collapse animation. |
| **SectionHeader** | Category with color, progress hint, optional CTA. |
| **CommunityBar** | Collapsed by default, only post-answer. |

### 2B: Apply to Legacy Screens

| # | Item | Detail | Status |
|---|------|--------|--------|
| 18 | Button restyling | Yes/No and action buttons → ActionButton Lego. Ghost-pill style from onboarding. | |
| 19 | Category bubble removal | Kill the visible bubble border around category name on question cards. | |
| 20 | Confidence tip modernization | Restyle to match newest screen design language. | |
| 21 | Result overlay | Assessment results → ExpandableOverlay. Not full-screen takeover. Soft colors, not bright/bold. | |
| 22 | Analysis animation | Slides elegantly from the corner where you tapped, diagonal. | |
| 23 | Analysis text sizing | Words bigger, fill the boxes. Must work on small phones. | |
| 24 | Quick Profile caret | Either make content fit without a caret or make the expansion worthwhile. | |
| 25 | Personality section contrast | Purple labels + purple content = muddy. Differentiate with the new Personality color (from #13). | |

---

## Phase 3 — Cohesion Walk-Through

Phone test, dark mode. Walk every screen. Review all 25 items line by line against this document. Flag anything that needs revisiting due to changes made. Then do light mode.

---

## Parked (Not In Scope)

| # | Item |
|---|------|
| P1 | Welcome/loading screen redesign |
| P2 | Aura blob / visualization work |
| P3 | Strengths, weaknesses, Watch4, tips & insights rework |
| P4 | Reveal rename |

---

## Decisions Made

- **Reveal:** keep name, rename parked
- **Categories:** two sections, one page (questions top, assessments bottom)
- **Counters:** question type indicators, not numbers
- **Color clash:** Personality changes, not Starter Pack
- **Undo dialog:** top toast, never displaces buttons
- **Results:** overlay/sheet, not full-screen takeover (simple vs complex tiers)
- **Assessment Surprise Me:** random test, no picking
