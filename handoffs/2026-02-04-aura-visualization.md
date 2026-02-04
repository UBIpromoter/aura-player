# Aura Visualization Component — Handoff

**Date:** 2026-02-04
**Source:** `noodle/2026-02-03-profile-redesign-v2/flow-demo.html`
**Status:** Approved for integration

---

## What We Built

An organic, animated "aura" visualization that replaces the radar chart in the profile view. Shows personality traits as a glowing, breathing neural network.

## Design Decisions

| Decision | What We Chose | Why |
|----------|---------------|-----|
| Glow technique | SVG `feGaussianBlur` filter | Organic look, no "donut" effect |
| Blur strength | stdDeviation 18-22 | Strong enough to blend, not muddy |
| Neuron positions | Scattered/organic | Geometric grids felt robotic |
| Animation | JS (requestAnimationFrame) | Lines must follow neurons dynamically |
| Movement amplitude | 1.5-3px per neuron | Subtle drift, not chaotic |
| Color zones | Ellipses in different regions | Each trait color visible, not blended to mud |

## Trait Colors

| Trait | Color | Hex |
|-------|-------|-----|
| Openness (curiosity) | Violet | `#8B5CF6` |
| Agreeableness (warmth) | Emerald | `#10B981` |
| Neuroticism (stability) | Pink | `#EC4899` |
| Conscientiousness (independence) | Cyan | `#06B6D4` |
| Base/Extraversion | Blue | `#60a5fa` |

## Progressive Reveal (4 Stages)

- **Stage 1:** Violet + Blue (2 colors, 5 neurons)
- **Stage 2:** + Emerald (3 colors, 7 neurons)
- **Stage 3:** + Pink (4 colors, 10 neurons)
- **Stage 4:** + Cyan (5 colors, 13 neurons, full network)

## Component Code

```jsx
// Requires: useState, useEffect, useRef from React

const AuraVisualization = ({ stage }) => {
  const blue = '#60a5fa';
  const violet = '#8B5CF6';
  const emerald = '#10B981';
  const pink = '#EC4899';
  const cyan = '#06B6D4';

  // Aura ellipses for each stage
  const auraData = {
    1: [
      { cx: 100, cy: 70, rx: 80, ry: 60, color: violet, opacity: 0.85 },
      { cx: 100, cy: 130, rx: 70, ry: 50, color: blue, opacity: 0.7 },
    ],
    2: [
      { cx: 100, cy: 60, rx: 90, ry: 65, color: violet, opacity: 0.85 },
      { cx: 70, cy: 130, rx: 60, ry: 55, color: blue, opacity: 0.7 },
      { cx: 140, cy: 120, rx: 70, ry: 60, color: emerald, opacity: 0.8 },
    ],
    3: [
      { cx: 100, cy: 55, rx: 95, ry: 65, color: violet, opacity: 0.85 },
      { cx: 60, cy: 130, rx: 65, ry: 60, color: blue, opacity: 0.7 },
      { cx: 150, cy: 100, rx: 70, ry: 70, color: emerald, opacity: 0.8 },
      { cx: 100, cy: 150, rx: 80, ry: 55, color: pink, opacity: 0.8 },
    ],
    4: [
      { cx: 100, cy: 50, rx: 100, ry: 70, color: violet, opacity: 0.85 },
      { cx: 55, cy: 120, rx: 65, ry: 70, color: cyan, opacity: 0.8 },
      { cx: 150, cy: 90, rx: 70, ry: 75, color: emerald, opacity: 0.8 },
      { cx: 100, cy: 155, rx: 85, ry: 55, color: pink, opacity: 0.8 },
      { cx: 100, cy: 100, rx: 50, ry: 50, color: blue, opacity: 0.6 },
    ],
  }[stage];

  // Base neuron positions (before animation)
  const baseNeurons = {
    1: [
      { x: 100, y: 95, r: 6, color: violet },
      { x: 75, y: 72, r: 5, color: violet },
      { x: 128, y: 85, r: 4, color: blue },
      { x: 88, y: 118, r: 5, color: blue },
      { x: 115, y: 108, r: 4, color: violet },
    ],
    2: [
      { x: 103, y: 98, r: 6, color: violet },
      { x: 68, y: 65, r: 5, color: violet },
      { x: 135, y: 78, r: 5, color: emerald },
      { x: 82, y: 135, r: 5, color: blue },
      { x: 55, y: 102, r: 4, color: blue },
      { x: 118, y: 58, r: 4, color: emerald },
      { x: 142, y: 118, r: 4, color: emerald },
    ],
    3: [
      { x: 100, y: 100, r: 6, color: violet },
      { x: 62, y: 58, r: 5, color: violet },
      { x: 142, y: 72, r: 5, color: emerald },
      { x: 155, y: 108, r: 4, color: emerald },
      { x: 45, y: 95, r: 5, color: blue },
      { x: 78, y: 145, r: 5, color: pink },
      { x: 128, y: 138, r: 5, color: pink },
      { x: 95, y: 68, r: 4, color: violet },
      { x: 68, y: 115, r: 4, color: blue },
      { x: 138, y: 95, r: 3, color: emerald },
    ],
    4: [
      { x: 100, y: 98, r: 6, color: violet },
      { x: 58, y: 52, r: 5, color: violet },
      { x: 138, y: 48, r: 4, color: violet },
      { x: 155, y: 85, r: 5, color: emerald },
      { x: 148, y: 125, r: 4, color: pink },
      { x: 42, y: 88, r: 5, color: cyan },
      { x: 52, y: 135, r: 5, color: cyan },
      { x: 115, y: 148, r: 5, color: pink },
      { x: 72, y: 148, r: 4, color: pink },
      { x: 85, y: 65, r: 4, color: violet },
      { x: 125, y: 72, r: 4, color: emerald },
      { x: 65, y: 105, r: 3, color: cyan },
      { x: 135, y: 105, r: 3, color: emerald },
    ],
  }[stage];

  // Connection indices (which neurons connect to which)
  const connectionIndices = {
    1: [[0,1], [0,2], [0,3], [0,4], [1,3], [2,4], [1,2]],
    2: [[0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [1,4], [1,5], [2,5], [2,6], [3,4], [3,6]],
    3: [[0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,8], [0,9], [1,7], [2,7], [2,9], [3,9], [3,6], [4,8], [4,5], [5,6], [1,4]],
    4: [[0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,8], [0,9], [0,10], [0,11], [0,12], [1,9], [2,10], [3,10], [3,12], [4,12], [4,7], [5,11], [5,6], [6,8], [8,7], [1,5], [2,3]],
  }[stage];

  // Animate neurons independently
  const [time, setTime] = useState(0);
  const animRef = useRef();

  useEffect(() => {
    const animate = () => {
      setTime(t => t + 0.02);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Calculate animated positions - each neuron has unique drift pattern
  const animatedNeurons = baseNeurons.map((n, i) => {
    const speed = 0.5 + (i % 3) * 0.3;
    const amp = 1.5 + (i % 4) * 0.5;
    const phaseX = i * 1.3;
    const phaseY = i * 0.9 + 0.5;
    return {
      ...n,
      x: n.x + Math.sin(time * speed + phaseX) * amp,
      y: n.y + Math.cos(time * speed * 0.8 + phaseY) * amp,
    };
  });

  const sizes = { 1: 180, 2: 200, 3: 220, 4: 240 };
  const size = sizes[stage];

  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size * 1.1, margin: '0 auto' }}>
      <svg width={size} height={size * 1.1} viewBox="0 0 200 220" style={{ overflow: 'visible' }}>
        <defs>
          <filter id={`blur-${stage}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={stage === 4 ? 22 : 18} />
          </filter>
        </defs>

        {/* Organic aura glow */}
        <g filter={`url(#blur-${stage})`}>
          {auraData.map((e, i) => (
            <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill={e.color} opacity={e.opacity} />
          ))}
        </g>

        {/* Connection lines - dynamically follow neuron positions */}
        <g stroke="rgba(255,255,255,0.35)" strokeWidth="1">
          {connectionIndices.map(([from, to], i) => (
            <line
              key={i}
              x1={animatedNeurons[from].x}
              y1={animatedNeurons[from].y}
              x2={animatedNeurons[to].x}
              y2={animatedNeurons[to].y}
            />
          ))}
        </g>

        {/* Neurons with glow */}
        {animatedNeurons.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r * 2} fill={n.color} opacity="0.3" filter={`url(#blur-${stage})`} />
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} />
          </g>
        ))}
      </svg>
    </div>
  );
};
```

## Usage

```jsx
<AuraVisualization stage={1} />  // Early teaser
<AuraVisualization stage={2} />  // After more questions
<AuraVisualization stage={3} />  // Almost complete
<AuraVisualization stage={4} />  // Full profile
```

## Integration Notes

1. **Remove RadarChart** — This replaces it entirely
2. **Stage prop** — Derive from user's progress (questions answered)
3. **Container** — Needs dark background (`#030712` or similar)
4. **Size** — Component handles sizing internally (180-240px based on stage)

## Demo File

Full working demo with phone frame, hint cards, and stage navigation:
`noodle/2026-02-03-profile-redesign-v2/flow-demo.html`

Open in browser to test all stages.
