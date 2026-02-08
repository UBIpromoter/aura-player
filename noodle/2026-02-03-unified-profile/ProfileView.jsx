/**
 * ProfileView - Unified Aura Profile
 *
 * Two-stage reveal:
 * - After Quick Profile: Teaser with CTA
 * - After Starter Pack: Full profile with archetype, radar, insights
 */

// Import archetypes (in production, these would be in the same file or properly bundled)
// const { calculateProfile, generateInsights } = require('./archetypes');

// ==================== PROFILE HEADER ====================

const ProfileHeader = ({
  archetype,
  darkMode = true,
  animated = true
}) => {
  const [revealed, setRevealed] = React.useState(!animated);

  React.useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setRevealed(true), 200);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  if (!archetype) return null;

  const gradients = {
    violet: 'from-violet-900/50 to-purple-900/30',
    blue: 'from-blue-900/50 to-indigo-900/30',
    emerald: 'from-emerald-900/50 to-teal-900/30',
    amber: 'from-amber-900/50 to-orange-900/30',
    pink: 'from-pink-900/50 to-rose-900/30',
    slate: 'from-slate-800/50 to-gray-900/30',
    indigo: 'from-indigo-900/50 to-violet-900/30',
    teal: 'from-teal-900/50 to-cyan-900/30',
  };

  const textColors = {
    violet: 'text-violet-300',
    blue: 'text-blue-300',
    emerald: 'text-emerald-300',
    amber: 'text-amber-300',
    pink: 'text-pink-300',
    slate: 'text-slate-300',
    indigo: 'text-indigo-300',
    teal: 'text-teal-300',
  };

  const borderColors = {
    violet: 'border-violet-500/30',
    blue: 'border-blue-500/30',
    emerald: 'border-emerald-500/30',
    amber: 'border-amber-500/30',
    pink: 'border-pink-500/30',
    slate: 'border-slate-500/30',
    indigo: 'border-indigo-500/30',
    teal: 'border-teal-500/30',
  };

  const color = archetype.color || 'violet';
  const gradient = darkMode ? gradients[color] : 'from-white to-gray-50';
  const textColor = darkMode ? textColors[color] : 'text-gray-700';
  const borderColor = darkMode ? borderColors[color] : 'border-gray-200';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${borderColor} bg-gradient-to-br ${gradient} p-6 transition-all duration-700 ${
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Subtle glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} blur-2xl opacity-50`}
        style={{ transform: 'scale(1.5)' }}
      />

      <div className="relative">
        {/* Aura icon */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🌀</span>
          <span className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Your Aura
          </span>
        </div>

        {/* Archetype name */}
        <h2
          className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-all duration-500 ${
            revealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {archetype.name}
        </h2>

        {/* Tagline */}
        <p
          className={`text-sm ${textColor} mb-4 transition-all duration-500 ${
            revealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {archetype.tagline}
        </p>

        {/* Match indicator */}
        {archetype.matchPercentage && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
              darkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'
            } transition-all duration-500 ${revealed ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {Math.round(archetype.matchPercentage)}% match
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== STRENGTH/SHADOW CARDS ====================

const InsightCards = ({
  strengths = [],
  watchOuts = [],
  darkMode = true
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Strengths */}
      <div
        className={`rounded-xl p-4 ${
          darkMode
            ? 'bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/20'
            : 'bg-emerald-50 border border-emerald-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">✨</span>
          <span className={`text-sm font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
            Strengths
          </span>
        </div>
        <ul className="space-y-2">
          {strengths.slice(0, 3).map((s, i) => (
            <li
              key={i}
              className={`text-xs leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              • {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Watch-outs */}
      <div
        className={`rounded-xl p-4 ${
          darkMode
            ? 'bg-gradient-to-br from-slate-800/50 to-gray-900/30 border border-slate-500/20'
            : 'bg-slate-50 border border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">👁️</span>
          <span className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Watch For
          </span>
        </div>
        <ul className="space-y-2">
          {watchOuts.slice(0, 2).map((w, i) => (
            <li
              key={i}
              className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              • {w}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ==================== PATTERN INSIGHTS ====================

const PatternInsights = ({
  insights = [],
  darkMode = true
}) => {
  if (insights.length === 0) return null;

  return (
    <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🔮</span>
        <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Key Patterns
        </span>
      </div>
      <div className="space-y-3">
        {insights.slice(0, 3).map((insight, i) => (
          <div
            key={i}
            className={`flex gap-3 p-3 rounded-lg ${
              darkMode ? 'bg-gray-900/50' : 'bg-white border border-gray-100'
            }`}
          >
            <span className="text-xl">{insight.icon}</span>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {insight.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== ACTIONABLE TIPS ====================

const ActionableTips = ({
  tips = [],
  darkMode = true,
  color = 'violet'
}) => {
  if (tips.length === 0) return null;

  const borderColors = {
    violet: darkMode ? 'border-violet-500/30' : 'border-violet-200',
    blue: darkMode ? 'border-blue-500/30' : 'border-blue-200',
    emerald: darkMode ? 'border-emerald-500/30' : 'border-emerald-200',
    amber: darkMode ? 'border-amber-500/30' : 'border-amber-200',
  };

  return (
    <div className={`rounded-xl p-4 border ${borderColors[color] || borderColors.violet} ${darkMode ? 'bg-gray-800/30' : 'bg-white'}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">💡</span>
        <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Try This
        </span>
      </div>
      <div className="space-y-2">
        {tips.slice(0, 3).map((tip, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
              darkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-600'
            }`}>
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== PROGRESS INDICATOR ====================

const ProfileProgress = ({
  completeness = { core: 0, extended: 0, shadow: 0, overall: 0 },
  darkMode = true,
  onStartAssessment = null
}) => {
  const sections = [
    { key: 'core', label: 'Big Five', pct: completeness.core, color: 'violet' },
    { key: 'extended', label: 'Traits', pct: completeness.extended, color: 'blue' },
    { key: 'shadow', label: 'Shadow', pct: completeness.shadow, color: 'slate' },
  ];

  return (
    <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Profile Depth
        </span>
        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {completeness.overall}% complete
        </span>
      </div>

      <div className="flex gap-2 mb-3">
        {sections.map(s => (
          <div key={s.key} className="flex-1">
            <div className={`h-1.5 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className={`h-full rounded-full bg-${s.color === 'violet' ? 'violet' : s.color === 'blue' ? 'blue' : 'slate'}-500 transition-all duration-500`}
                style={{ width: `${s.pct}%` }}
              />
            </div>
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {completeness.overall < 100 && onStartAssessment && (
        <button
          onClick={onStartAssessment}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            darkMode
              ? 'bg-violet-600 hover:bg-violet-500 text-white'
              : 'bg-violet-500 hover:bg-violet-600 text-white'
          }`}
        >
          Deepen your profile →
        </button>
      )}
    </div>
  );
};

// ==================== TEASER VIEW (Post Quick Profile) ====================

const ProfileTeaser = ({
  quickProfileData = null,
  darkMode = true,
  onUnlock = null
}) => {
  // Extract a hint from quick profile if available
  const getHint = () => {
    if (!quickProfileData?.traits) return null;
    const traits = quickProfileData.traits;
    const highest = Object.entries(traits).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0]);
    const traitNames = {
      E: 'social energy',
      A: 'empathy',
      C: 'organization',
      N: 'emotional sensitivity',
      O: 'curiosity'
    };
    return `Signs of strong ${traitNames[highest[0]] || 'personality'}`;
  };

  const hint = getHint();

  return (
    <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      {/* Blurred header area */}
      <div className="relative p-6 pb-8">
        {/* Blurred gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-indigo-900/20 blur-sm" />

        {/* Content */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌀</span>
            <span className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Your Aura
            </span>
          </div>

          {/* Blurred placeholder for archetype name */}
          <div className="space-y-2 mb-4">
            <div className={`h-7 w-48 rounded ${darkMode ? 'bg-gray-700/50' : 'bg-gray-200'} blur-sm`} />
            <div className={`h-4 w-64 rounded ${darkMode ? 'bg-gray-700/30' : 'bg-gray-200/70'} blur-sm`} />
          </div>

          {/* Teaser text */}
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            First glimpse of your profile...
          </p>
        </div>
      </div>

      {/* Visible hints section */}
      <div className={`px-6 py-4 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <p className={`text-xs uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          We see hints of:
        </p>
        <ul className="space-y-2 mb-4">
          {hint && (
            <li className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              {hint}
            </li>
          )}
          <li className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Unique patterns emerging...
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="p-4">
        <button
          onClick={onUnlock}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
            darkMode
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white'
              : 'bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white'
          } shadow-lg shadow-violet-500/25`}
        >
          Complete Starter Pack to unlock full profile
        </button>
        <p className={`text-center text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          ~5 minutes to reveal your archetype
        </p>
      </div>
    </div>
  );
};

// ==================== FULL PROFILE VIEW ====================

const ProfileFull = ({
  profile,
  darkMode = true,
  onTraitTap = null,
  onStartAssessment = null
}) => {
  if (!profile) return null;

  const { bigFive, archetype, completeness, strengths, watchOuts, assessments } = profile;

  // Convert bigFive object to radar format
  const radarTraits = {};
  Object.entries(bigFive).forEach(([key, data]) => {
    radarTraits[key] = data.score;
  });

  // Generate insights (in production this would use the imported function)
  const insights = generateInsights ? generateInsights(profile) : [];

  // Get tips from primary archetype
  const tips = archetype?.primary?.tips || [];

  return (
    <div className="space-y-4">
      {/* Archetype Header */}
      {archetype?.primary && (
        <ProfileHeader
          archetype={archetype.primary}
          darkMode={darkMode}
          animated={true}
        />
      )}

      {/* Radar Chart - Big Five */}
      {Object.keys(radarTraits).length > 0 && (
        <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} flex justify-center`}>
          <RadarChart
            traits={radarTraits}
            size={260}
            darkMode={darkMode}
            onTraitTap={onTraitTap}
            color={archetype?.primary?.color || 'violet'}
          />
        </div>
      )}

      {/* Strengths & Watch-outs */}
      {(strengths.length > 0 || watchOuts.length > 0) && (
        <InsightCards
          strengths={strengths}
          watchOuts={watchOuts}
          darkMode={darkMode}
        />
      )}

      {/* Cross-Pattern Insights */}
      {insights.length > 0 && (
        <PatternInsights
          insights={insights}
          darkMode={darkMode}
        />
      )}

      {/* Actionable Tips */}
      {tips.length > 0 && (
        <ActionableTips
          tips={tips}
          darkMode={darkMode}
          color={archetype?.primary?.color}
        />
      )}

      {/* Profile Completeness */}
      <ProfileProgress
        completeness={completeness}
        darkMode={darkMode}
        onStartAssessment={onStartAssessment}
      />

      {/* Secondary Archetypes */}
      {archetype?.secondary?.length > 0 && (
        <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <p className={`text-xs uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            You also resonate with
          </p>
          <div className="flex flex-wrap gap-2">
            {archetype.secondary.map((a, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  darkMode
                    ? `bg-${a.color}-900/30 text-${a.color}-300 border border-${a.color}-500/20`
                    : `bg-${a.color}-50 text-${a.color}-700 border border-${a.color}-200`
                }`}
              >
                {a.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== MAIN PROFILE VIEW CONTAINER ====================

const ProfileView = ({
  assessCompleted = {},
  currentTier = 0,
  darkMode = true,
  onNavigate = null,
  onStartAssessment = null
}) => {
  // Determine which view to show
  const hasQuickProfile = !!assessCompleted['quick-profile'];
  const hasStarterPack = currentTier >= 2; // Tier 2 = completed starter pack

  // Calculate full profile (only if we have enough data)
  const profile = hasStarterPack && calculateProfile
    ? calculateProfile(assessCompleted)
    : null;

  return (
    <div className={`h-full flex flex-col ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`h-[44px] flex-shrink-0 flex items-center px-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <button
          onClick={() => onNavigate?.('assess-picker')}
          className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
        >
          ←
        </button>
        <span className={`flex-1 text-center font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Your Aura
        </span>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 pb-8 hide-scrollbar">
        {!hasQuickProfile ? (
          // No data yet
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-4xl mb-4">🌀</span>
            <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Discover Your Aura
            </h2>
            <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Complete Quick Profile to start building your personality map
            </p>
            <button
              onClick={() => onStartAssessment?.('quick-profile')}
              className="px-6 py-3 rounded-xl font-medium bg-violet-600 hover:bg-violet-500 text-white transition-colors"
            >
              Start Quick Profile
            </button>
          </div>
        ) : !hasStarterPack ? (
          // Teaser view
          <ProfileTeaser
            quickProfileData={assessCompleted['quick-profile']}
            darkMode={darkMode}
            onUnlock={() => onNavigate?.('assess-picker')}
          />
        ) : (
          // Full profile
          <ProfileFull
            profile={profile}
            darkMode={darkMode}
            onTraitTap={(trait, value) => {
              // Navigate to specific trait assessment
              onNavigate?.('assess-results', { testId: `bigfive-${trait}` });
            }}
            onStartAssessment={() => onNavigate?.('assess-picker')}
          />
        )}
      </div>
    </div>
  );
};
