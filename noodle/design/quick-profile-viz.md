# Quick Profile Results — Visualization Options

> Three specialists noodle on what to show when you only have 10 data points.

---

## Current State

The Quick Profile results screen shows:
- A `ResultCard` with the `✨` icon, "Quick Profile" title, "Your personality snapshot" subtitle
- A single italic paragraph: *"You're outgoing and energized by people, organized and follow-through strong, and drawn to the unconventional."*
- A CTA box: "Ready for more? Starter Pack awaits with 40 deeper questions"

**The problem:** No visualization. Just text. Philip says "I would like to have some visualization always." And the text itself is generic — it reads like a fortune cookie, not a personality tool.

---

## The Data We Have

From 10 questions, we get rough scores (0-100) for 7 dimensions:

| Trait | Questions | What It Maps To |
|-------|-----------|-----------------|
| E (Extraversion) | 2 | Reserved ←→ Outgoing |
| C (Conscientiousness) | 2 | Flexible ←→ Organized |
| A (Agreeableness) | 2 | Direct ←→ Empathetic |
| N (Neuroticism) | 1 | Steady ←→ Sensitive |
| O (Openness) | 1 | Practical ←→ Curious |
| Intuition | 1 | Analytical ←→ Gut-driven |
| Depth | 1 | Broad connections ←→ Deep bonds |

**Critical reality:** 1-2 questions per trait = directional signal, not measurement. The Big Five full test uses 10 per trait. We have 10-20% of that resolution.

---

## Feel (UX Specialist)

### What's the right information to show?

The Quick Profile serves one purpose: **make the user feel seen enough to want more.** It's the appetizer — just enough flavor to make you hungry.

**What works:**
- Show them their shape, not their scores. People respond to "here's your pattern" more than "here's your number."
- Use the human-readable endpoint labels we already have (`Reserved ←→ Outgoing`). These immediately mean something. `E: 72%` means nothing.
- The current text paragraph is doing too much. It tries to be a full personality reading from a 90-second quiz. That creates a trust gap — the user *feels* it's thin even if they can't articulate why.

**What doesn't work:**
- Showing precise percentages. `72% Extraversion` implies precision we don't have. One different answer swings this by 50 points.
- Showing all 7 traits equally. Intuition and Depth are single-question traits — even less signal. They shouldn't get the same visual weight as E/C/A.
- The current "fortune cookie" paragraph. It only fires for traits above 60 or below 40, so someone scoring in the middle range gets almost nothing back.

### Feel Proposal A: "Your Shape" — Directional Indicators

Show the **top 3 strongest signals** (traits furthest from 50) with simple directional indicators — not precise spectrum bars.

Each indicator shows:
- The human-readable endpoint labels (e.g., "Reserved ←→ Outgoing")
- A soft indicator of which direction they lean (not a precise dot)
- No percentages, no numbers

**Why this works:** It says "here's what stood out" rather than "here's your complete profile." Honest framing. And it naturally creates curiosity: "What about the other traits?"

### Feel Proposal B: "Snapshot vs. Full Picture" — Comparison Teaser

Show 3 trait indicators in a compact format, then below them show the same layout for all 5 Big Five traits but with 3 of them grayed out / locked with a subtle lock or "?" indicator. The message becomes visual: "You've unlocked part of the picture. Keep going for the rest."

**Why this works:** Shows value of what they've done AND creates FOMO for what they haven't. The Starter Pack CTA writes itself.

---

## Look (Visual Specialist)

### What visual treatment works for thin data?

The core tension: the existing `TraitSpectrum` bars look great for the Big Five (10 data points each), but using the exact same component for 1-2 question traits implies the same precision. We need something that *feels* like the same design family but signals "sketch" rather than "measurement."

### Look Proposal A: "Soft Spectrum" — Blurred Dot on Abbreviated Bar

Use the same gradient bar concept as `TraitSpectrum`, but with these modifications:
- **Wider, softer dot** — instead of a crisp 16px white circle, use a 24-28px dot with a gaussian blur / soft glow (like the Aura visualization's blur aesthetic). This visually communicates "approximate zone" rather than "precise point."
- **Shorter bar** — don't stretch the full card width. Use ~70% width, centered. This subtly signals "partial data."
- **No percentage labels** — only the endpoint words (`Reserved ←→ Outgoing`)
- **Muted gradient** — use the same `spectrumColors` pairs but at reduced opacity (60-70%). Saves the full-saturation treatment for the Big Five.

Color tokens (already approved):
- Use the existing `spectrumColors['bigfive-E']` etc. pairs at reduced opacity
- Blue-500 category color for the card header (Quick Profile = blue)

```
┌──────────────────────────────────────────┐
│  ✨ Quick Profile                        │
│  Your personality snapshot               │
├──────────────────────────────────────────┤
│                                          │
│  Reserved ─────────●───── Outgoing       │
│                    ~~~                    │
│  Flexible ────●────────── Organized      │
│               ~~~                        │
│  Direct ──────────────●── Empathetic     │
│                       ~~~                │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │  Based on 10 questions.          │    │
│  │  Starter Pack sharpens the       │    │
│  │  picture with 40 more. →         │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

The `~~~` under each dot represents the soft glow / blur zone — visually saying "you're somewhere around here."

### Look Proposal B: "Constellation" — Compact Dot Grid

A different approach: skip the spectrum bars entirely. Instead, show a compact 2D visualization — a small radar/spider shape or a set of positioned dots in a circular arrangement. Each dot is labeled with the endpoint that the user leans toward.

```
┌──────────────────────────────────────────┐
│  ✨ Quick Profile                        │
│  Your personality snapshot               │
├──────────────────────────────────────────┤
│                                          │
│          Curious                         │
│            ·                             │
│    Empathetic · · Outgoing               │
│            ·                             │
│          Organized                       │
│                                          │
│  "You lean outgoing, organized, and      │
│   empathetic — with a curious streak."   │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │  See your full shape →           │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

This is more novel but risks feeling disconnected from the rest of the app's visual language (spectrum bars everywhere else).

**Recommendation:** Proposal A (Soft Spectrum). It's in the same visual family as the Big Five results but clearly differentiated. The blur dot is a natural extension of the app's existing Aura glow aesthetic.

---

## Work (Reliability Specialist)

### What's implementable?

**Existing assets we can reuse:**

1. **`TraitSpectrum` component** (line ~7988 in index.html) — already supports `compact` mode, takes `name`, `score`, `lowLabel`, `highLabel`, `color`. This is 80% of what we need.

2. **`spectrumColors` map** (line ~3604) — already has Big Five spectrum pairs with human-readable labels (`Reserved`, `Outgoing`, etc.)

3. **`ResultCard` component** (line ~7942) — container is already there and working.

4. **Score calculation** (line ~8046-8070) — already computes traitScores normalized to 0-100 for all 7 dimensions.

5. **`HintCard` component** (line ~3648) — could be used for the CTA or supplementary text.

**What's missing:**

- `spectrumColors` doesn't have entries for `quick-profile` traits (it has `bigfive-E` but not a Quick Profile equivalent). We'd either reuse the Big Five entries or add QP-specific ones.
- No visual variant for "soft/approximate" spectrum bars. The current `TraitSpectrum` always shows a crisp white dot.
- The `intuition` and `depth` traits don't have spectrumColors entries or standard labels.

### Work Proposal A: Minimal — Reuse TraitSpectrum Compact Mode

**Effort: Small.** Reuse `TraitSpectrum` in compact mode with the Big Five spectrumColors. Show top 3-5 traits. Skip intuition/depth (too thin). Add a one-line caveat.

Changes needed:
1. In the Quick Profile results block (~line 8109-8124), replace the text paragraph with 3-5 `TraitSpectrum` calls
2. Map Quick Profile trait keys to their Big Five spectrumColors counterparts (E → `bigfive-E`, etc.)
3. Filter to traits with strongest signals (furthest from 50)
4. Replace the italic fortune-cookie text with the visual bars
5. Keep the Starter Pack CTA box

**Risk:** Looks identical to Big Five results. Users might not register that this is a rougher cut. But it ships fast.

### Work Proposal B: Moderate — Soft Spectrum Variant

**Effort: Medium.** Create a `SoftSpectrum` variant (or add a `soft` prop to TraitSpectrum) that renders:
- Larger dot (w-5 h-5 instead of w-4 h-4)
- Soft glow via `boxShadow` with the gradient color (already have this pattern in `.glow-*` CSS classes)
- Reduced gradient opacity (add `opacity: 0.65` to the bar)
- No percentage display
- Only the endpoint labels

Changes needed:
1. Add a `soft` prop to `TraitSpectrum` OR create a lightweight `SoftSpectrum` inline component
2. Add `spectrumColors` entries for Quick Profile traits (or alias to Big Five entries)
3. Define labels for intuition (`Analytical ←→ Gut-driven`) and depth (`Broad ←→ Deep`) — or skip them
4. Replace the current results block content
5. Add a subtle caption: "Based on 10 questions — take Starter Pack for sharper results"

**Risk:** New component variant = new surface area to maintain. But it's small and follows existing patterns closely.

### Work Proposal C: Progressive Enhancement Path

**Effort: Medium, but future-proof.** Build Proposal B, but also store the Quick Profile scores so that when the user completes the Starter Pack, their Quick Profile bars automatically sharpen (soft → crisp) as more data comes in. This turns the visualization into a living thing.

This would require the Analysis screen's `TraitSpectrum` rendering to check data density and choose soft vs. crisp automatically. The Quick Profile scores are already stored in `assessCompleted['quick-profile']`.

**Risk:** Scope creep. Nice to have, not needed for V1.

---

## Synthesis: The Recommendation

**Build Look Proposal A (Soft Spectrum) + Feel Proposal A (Top Signals) + Work Proposal B (Moderate effort).**

### The Design

Show the **top 3 strongest-signal Big Five traits** (furthest from center) as Soft Spectrum bars. Skip intuition and depth — they're single-question traits and don't yet have established spectrum endpoints in the system. Below the bars, a one-line text summary (trimmed from the current paragraph), then the Starter Pack CTA.

### Specifically:

```
┌──────────────────────────────────────────┐
│        ✨  Quick Profile                 │
│      Your personality snapshot            │
├──────────────────────────────────────────┤
│                                          │
│  Reserved ────────────⦿─── Outgoing      │  ← soft glow dot
│                                          │
│  Flexible ───⦿──────────── Organized     │
│                                          │
│  Direct ─────────────⦿──── Empathetic    │
│                                          │
│  "Outgoing, organized, and empathetic    │
│   — with more to discover."             │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │  📊 Based on 10 questions        │    │
│  │  Starter Pack sharpens your      │    │
│  │  profile with 40 deeper ones →   │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

### Why This Wins

| Criterion | How It Scores |
|-----------|---------------|
| **Philip's "visualization always"** | Three gradient bars with glowing dots — visual, not just text |
| **"Letters don't mean anything"** | No E/A/C/N/O — only `Reserved ←→ Outgoing` style labels |
| **"Only write text that's useful"** | One summary line + CTA. No fortune-cookie paragraph |
| **Honest about data density** | Soft/glowing dots signal "approximate," muted gradients signal "partial" |
| **Teases deeper assessment** | "Based on 10 questions" + CTA. The locked-out traits create natural curiosity |
| **Works in dark + light mode** | Uses existing spectrumColors + glow patterns that already support both |
| **Fits in ResultCard** | Three compact bars + text + CTA box fits easily in 300px width |
| **Implementable** | ~30 lines of new component code, reusing existing spectrumColors and TraitSpectrum patterns |

### What NOT to Build (Yet)

- **Radar/spider chart** — Different visual language from rest of app. Save for full profile.
- **All 7 traits** — Intuition and Depth need established endpoint labels and more signal. Add them when Starter Pack data enriches them.
- **Percentages** — No numbers. Not with 1-2 questions of data.
- **Progressive sharpening** — Great idea for V2. Keep the architecture open for it but don't build it now.

### Implementation Sketch

```jsx
// Inside the quick-profile results block (~line 8045)
// After calculating traitScores...

// Map QP traits to Big Five spectrum configs
const qpSpectrums = {
  E: { ...spectrumColors['bigfive-E'] },  // Reserved ←→ Outgoing
  C: { ...spectrumColors['bigfive-C'] },  // Flexible ←→ Organized
  A: { ...spectrumColors['bigfive-A'] },  // Direct ←→ Empathetic
  N: { ...spectrumColors['bigfive-N'] },  // Steady ←→ Sensitive
  O: { ...spectrumColors['bigfive-O'] },  // Practical ←→ Curious
};

// Pick top 3 strongest signals (furthest from 50)
const ranked = Object.entries(qpSpectrums)
  .map(([trait, spec]) => ({
    trait,
    score: traitScores[trait] || 50,
    distance: Math.abs((traitScores[trait] || 50) - 50),
    ...spec
  }))
  .sort((a, b) => b.distance - a.distance)
  .slice(0, 3);

// Render soft spectrum bars
return (
  <ResultCard icon="✨" title="Quick Profile" subtitle="Your personality snapshot">
    <div className="space-y-3 py-2">
      {ranked.map(({ trait, score, left, right, leftLabel, rightLabel }) => (
        <div key={trait} className="py-1">
          <div className="flex justify-between text-[10px] mb-1">
            <span style={{ color: left, opacity: 0.8 }}>{leftLabel}</span>
            <span style={{ color: right, opacity: 0.8 }}>{rightLabel}</span>
          </div>
          <div
            className="h-2.5 rounded-full relative"
            style={{
              background: `linear-gradient(to right, ${left}, ${right})`,
              opacity: 0.6
            }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white"
              style={{
                left: `${Math.max(8, Math.min(92, score))}%`,
                marginLeft: -10,
                boxShadow: `0 0 8px rgba(255,255,255,0.5), 0 0 16px ${score > 50 ? right : left}40`
              }}
            />
          </div>
        </div>
      ))}
    </div>

    {/* Trimmed summary */}
    <p className={`text-sm text-center italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      {/* Use the existing getTraitDescription() but shortened */}
      {getTraitDescription()}
    </p>

    {/* CTA */}
    <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'}`}>
      <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        Based on 10 questions
      </div>
      <div className={`text-sm font-medium mt-1 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
        Starter Pack sharpens the picture with 40 more →
      </div>
    </div>
  </ResultCard>
);
```

### Key Differences from Full TraitSpectrum

| Property | Full (Big Five) | Soft (Quick Profile) |
|----------|----------------|---------------------|
| Bar height | h-3 | h-2.5 |
| Dot size | w-4 h-4 (16px) | w-5 h-5 (20px) |
| Dot style | Crisp white, drop shadow | White with color glow halo |
| Gradient opacity | 100% | 60% |
| Score clamp | 5%-95% | 8%-92% (more conservative) |
| Percentage shown | Yes (on Big Five) | Never |
| Number of traits | All 5 | Top 3 by signal strength |

---

## Open Questions for Philip

1. **Keep any text summary at all?** The bars might speak for themselves. Could drop the italic paragraph entirely and just have bars + CTA.

2. **Show 3 or 5 traits?** Three strongest feels right for the "appetizer" framing, but showing all 5 with the weaker ones more faded could also work.

3. **Intuition and Depth** — worth showing at all on this screen? They're interesting traits but only have one question each. Could save them as a "bonus insight" if the score is decisive (near 0 or 100).
