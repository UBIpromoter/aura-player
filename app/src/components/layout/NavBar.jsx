// Navigation bar with user status and actions
import { TH } from '../../utils/theme';

export const NavBar = ({
  darkMode,
  stats = { answered: 0, streak: 0 },
  showStreak = true,
  onHome,
  onDoubleClickHome,
  onSettings,
  onProfile,
  isLoggedIn = false,
  isGuest = true
}) => (
  <div className={`flex items-center justify-between px-4 py-2 ${
    darkMode
      ? 'bg-gray-950/70 border-b border-white/5'
      : 'bg-white/70 border-b border-gray-200/50'
  } backdrop-blur-md`}>
    {/* Home/Logo button */}
    <button
      onClick={onHome}
      onDoubleClick={onDoubleClickHome}
      className="text-xl btn-feedback"
    >
      🌀
    </button>

    {/* Stats display */}
    <button
      onClick={onProfile}
      className={`flex items-center gap-2 px-2 py-1 rounded-lg btn-feedback ${
        darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200'
      }`}
    >
      <span className={`text-sm ${TH('text-muted', darkMode)}`}>
        {stats.answered} answered
      </span>
      {showStreak && stats.streak > 0 && (
        <span className="text-sm text-orange-400">🔥{stats.streak}</span>
      )}
    </button>

    {/* User & settings */}
    <div className="flex items-center gap-2">
      {isLoggedIn ? (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
            boxShadow: '0 0 12px 3px rgba(255,255,255,0.3), inset 0 0 8px rgba(255,255,255,0.1)',
            border: '1.5px solid rgba(255,255,255,0.3)'
          }}
        >
          <span style={{color: 'rgba(255,255,255,0.9)'}}>👤</span>
        </div>
      ) : (
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
            darkMode ? 'border-gray-600 text-gray-500' : 'border-gray-400 text-gray-400'
          }`}
          style={{ border: '1.5px dashed', background: 'transparent' }}
        >
          ?
        </div>
      )}
      <button
        onClick={onSettings}
        className={`text-xl btn-feedback ${TH('text-muted', darkMode)}`}
      >
        ☰
      </button>
    </div>
  </div>
);

export default NavBar;
