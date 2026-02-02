// Settings/Profile screen
// TODO: Extract full implementation from index.html

export const SettingsScreen = ({ darkMode, toggleDarkMode, user, onSignOut }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-6">Settings</h2>

      <div className="space-y-4">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
          <span className="text-white">Dark Mode</span>
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors ${
              darkMode ? 'bg-violet-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Account */}
        <div className="p-4 bg-white/5 rounded-xl">
          <span className="text-gray-400 text-sm">Account</span>
          <p className="text-white mt-1">
            {user?.email || 'Not signed in'}
          </p>
          {user && (
            <button
              onClick={onSignOut}
              className="text-red-400 text-sm mt-2"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
