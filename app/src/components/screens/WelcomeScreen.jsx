// Welcome/Onboarding screen
// TODO: Extract full implementation from index.html

export const WelcomeScreen = ({ onComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Aura</h1>
      <p className="text-gray-400 mb-8">Discover your thinking patterns</p>
      <button
        onClick={onComplete}
        className="px-8 py-3 bg-violet-600 text-white rounded-full font-medium hover:bg-violet-500 transition-colors"
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomeScreen;
