/**
 * RadarChart - Big Five Visualization
 *
 * A 5-axis spider chart for personality traits
 * Uses pure SVG with gradient fill, no external libraries
 */

const RadarChart = ({
  traits = {}, // { E: 72, A: 65, C: 45, N: 38, O: 81 }
  size = 280,
  darkMode = true,
  animated = true,
  onTraitTap = null, // Callback when user taps a trait
  color = 'violet'
}) => {
  const [animationProgress, setAnimationProgress] = React.useState(animated ? 0 : 1);

  React.useEffect(() => {
    if (!animated) return;
    const duration = 800;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [animated, traits]);

  // Trait labels and positions (clockwise from top)
  const traitConfig = [
    { key: 'O', label: 'Openness', short: 'O' },
    { key: 'C', label: 'Conscientiousness', short: 'C' },
    { key: 'E', label: 'Extraversion', short: 'E' },
    { key: 'A', label: 'Agreeableness', short: 'A' },
    { key: 'N', label: 'Neuroticism', short: 'N' },
  ];

  const center = size / 2;
  const maxRadius = (size / 2) - 40; // Leave room for labels
  const angleStep = (2 * Math.PI) / 5;
  const startAngle = -Math.PI / 2; // Start from top

  // Calculate point position for a given trait index and value (0-100)
  const getPoint = (index, value) => {
    const angle = startAngle + (index * angleStep);
    const radius = (value / 100) * maxRadius * animationProgress;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    };
  };

  // Generate axis lines (from center to edge)
  const axisLines = traitConfig.map((_, i) => {
    const angle = startAngle + (i * angleStep);
    const endX = center + maxRadius * Math.cos(angle);
    const endY = center + maxRadius * Math.sin(angle);
    return { x1: center, y1: center, x2: endX, y2: endY };
  });

  // Generate concentric rings (at 25%, 50%, 75%, 100%)
  const rings = [0.25, 0.5, 0.75, 1].map(scale => {
    const points = traitConfig.map((_, i) => {
      const angle = startAngle + (i * angleStep);
      const radius = maxRadius * scale;
      return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
    });
    return points.join(' ');
  });

  // Generate the data polygon
  const hasData = Object.keys(traits).length > 0;
  const dataPoints = hasData
    ? traitConfig.map((t, i) => {
        const value = traits[t.key] ?? 50;
        const pt = getPoint(i, value);
        return `${pt.x},${pt.y}`;
      }).join(' ')
    : null;

  // Label positions (slightly outside the chart)
  const labelPositions = traitConfig.map((t, i) => {
    const angle = startAngle + (i * angleStep);
    const labelRadius = maxRadius + 28;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      trait: t,
      value: traits[t.key]
    };
  });

  // Gradient colors from TOKENS
  const gradients = {
    violet: { from: '#8b5cf6', to: '#a78bfa' },
    blue: { from: '#3b82f6', to: '#60a5fa' },
    emerald: { from: '#10b981', to: '#34d399' },
    indigo: { from: '#6366f1', to: '#818cf8' },
    teal: { from: '#14b8a6', to: '#2dd4bf' },
  };

  const grad = gradients[color] || gradients.violet;
  const gridColor = darkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(100, 116, 139, 0.15)';
  const axisColor = darkMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(100, 116, 139, 0.25)';
  const textColor = darkMode ? '#e2e8f0' : '#334155';
  const subtleText = darkMode ? '#94a3b8' : '#64748b';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          {/* Gradient fill for data area */}
          <linearGradient id="radar-fill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={grad.from} stopOpacity="0.3" />
            <stop offset="100%" stopColor={grad.to} stopOpacity="0.1" />
          </linearGradient>
          {/* Gradient stroke for data line */}
          <linearGradient id="radar-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={grad.from} />
            <stop offset="100%" stopColor={grad.to} />
          </linearGradient>
          {/* Glow filter */}
          <filter id="radar-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background rings */}
        {rings.map((points, i) => (
          <polygon
            key={`ring-${i}`}
            points={points}
            fill="none"
            stroke={gridColor}
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((line, i) => (
          <line
            key={`axis-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={axisColor}
            strokeWidth={1}
          />
        ))}

        {/* Data polygon */}
        {dataPoints && (
          <g filter="url(#radar-glow)">
            <polygon
              points={dataPoints}
              fill="url(#radar-fill-gradient)"
              stroke="url(#radar-stroke-gradient)"
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Data points (dots at vertices) */}
        {hasData && traitConfig.map((t, i) => {
          const value = traits[t.key] ?? 50;
          const pt = getPoint(i, value);
          return (
            <g key={`point-${t.key}`}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={5}
                fill={grad.from}
                stroke="#fff"
                strokeWidth={2}
                className={onTraitTap ? 'cursor-pointer' : ''}
                onClick={() => onTraitTap?.(t.key, value)}
              />
            </g>
          );
        })}
      </svg>

      {/* Labels positioned outside SVG for better text rendering */}
      {labelPositions.map(({ x, y, trait, value }) => {
        const hasValue = value !== undefined;
        return (
          <div
            key={trait.key}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-center ${
              onTraitTap ? 'cursor-pointer hover:scale-110 transition-transform' : ''
            }`}
            style={{ left: x, top: y }}
            onClick={() => onTraitTap?.(trait.key, value)}
          >
            <div
              className="text-xs font-semibold"
              style={{ color: hasValue ? textColor : subtleText }}
            >
              {trait.short}
            </div>
            {hasValue && (
              <div className="text-xs font-medium" style={{ color: grad.from }}>
                {Math.round(value)}%
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Empty state version with placeholder shape
const RadarChartEmpty = ({ size = 280, darkMode = true }) => {
  const center = size / 2;
  const maxRadius = (size / 2) - 40;
  const startAngle = -Math.PI / 2;
  const angleStep = (2 * Math.PI) / 5;

  const traitConfig = [
    { key: 'O', label: 'Openness' },
    { key: 'C', label: 'Conscientiousness' },
    { key: 'E', label: 'Extraversion' },
    { key: 'A', label: 'Agreeableness' },
    { key: 'N', label: 'Neuroticism' },
  ];

  const rings = [0.25, 0.5, 0.75, 1].map(scale => {
    const points = traitConfig.map((_, i) => {
      const angle = startAngle + (i * angleStep);
      const radius = maxRadius * scale;
      return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
    });
    return points.join(' ');
  });

  const gridColor = darkMode ? 'rgba(148, 163, 184, 0.15)' : 'rgba(100, 116, 139, 0.1)';
  const subtleText = darkMode ? '#64748b' : '#94a3b8';

  const labelPositions = traitConfig.map((t, i) => {
    const angle = startAngle + (i * angleStep);
    const labelRadius = maxRadius + 28;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      trait: t
    };
  });

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible opacity-50">
        {rings.map((points, i) => (
          <polygon
            key={`ring-${i}`}
            points={points}
            fill="none"
            stroke={gridColor}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}
      </svg>

      {labelPositions.map(({ x, y, trait }) => (
        <div
          key={trait.key}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: x, top: y, color: subtleText }}
        >
          <div className="text-xs font-medium">{trait.key}</div>
          <div className="text-xs">—</div>
        </div>
      ))}

      {/* Center lock icon */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 text-2xl opacity-30"
        style={{ left: center, top: center, color: subtleText }}
      >
        🔒
      </div>
    </div>
  );
};

// Mini version for preview cards
const RadarChartMini = ({
  traits = {},
  size = 80,
  darkMode = true,
  color = 'violet'
}) => {
  const center = size / 2;
  const maxRadius = (size / 2) - 8;
  const startAngle = -Math.PI / 2;
  const angleStep = (2 * Math.PI) / 5;

  const traitKeys = ['O', 'C', 'E', 'A', 'N'];

  const hasData = Object.keys(traits).length > 0;
  const dataPoints = hasData
    ? traitKeys.map((key, i) => {
        const value = traits[key] ?? 50;
        const angle = startAngle + (i * angleStep);
        const radius = (value / 100) * maxRadius;
        return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
      }).join(' ')
    : null;

  const gradients = {
    violet: { from: '#8b5cf6', to: '#a78bfa' },
    blue: { from: '#3b82f6', to: '#60a5fa' },
    emerald: { from: '#10b981', to: '#34d399' },
    indigo: { from: '#6366f1', to: '#818cf8' },
  };
  const grad = gradients[color] || gradients.violet;
  const gridColor = darkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(100, 116, 139, 0.15)';

  // Single outer ring
  const outerRing = traitKeys.map((_, i) => {
    const angle = startAngle + (i * angleStep);
    return `${center + maxRadius * Math.cos(angle)},${center + maxRadius * Math.sin(angle)}`;
  }).join(' ');

  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id={`radar-mini-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={grad.from} stopOpacity="0.4" />
          <stop offset="100%" stopColor={grad.to} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <polygon
        points={outerRing}
        fill="none"
        stroke={gridColor}
        strokeWidth={1}
      />
      {dataPoints && (
        <polygon
          points={dataPoints}
          fill={`url(#radar-mini-${color})`}
          stroke={grad.from}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};
