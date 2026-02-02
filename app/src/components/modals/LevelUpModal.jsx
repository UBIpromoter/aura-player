// Level up celebration modal
// TODO: Extract full implementation from index.html

export const LevelUpModal = ({ level, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 text-center max-w-sm mx-4 animate-slide-up">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-white mb-2">Level Up!</h2>
        <p className="text-gray-400 mb-6">You reached level {level}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-500 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LevelUpModal;
