// Multiple choice buttons
// TODO: Extract full styling from index.html

export const MCButtons = ({ options, onAnswer, disabled }) => {
  if (!options) return null;

  return (
    <div className="flex flex-col gap-3 mt-6">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(index)}
          disabled={disabled}
          className="w-full py-3 px-4 rounded-xl bg-white/5 text-white text-left hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MCButtons;
