// Confidence level indicator segments (fills up inside button)
export const ConfidenceSegments = ({ level, color = 'violet', active = false, darkMode = true }) => {
  const colors = {
    emerald: ['rgba(6,78,59,0.6)', 'rgba(4,120,87,0.7)', 'rgba(5,150,105,0.8)', 'rgba(16,185,129,0.9)'],
    rose: ['rgba(136,19,55,0.6)', 'rgba(190,18,60,0.7)', 'rgba(225,29,72,0.8)', 'rgba(244,63,94,0.9)'],
  };
  const shades = colors[color] || colors.emerald;

  if (!active || level === 0) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-2 flex">
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className={`flex-1 transition-all duration-150 ${i === 1 ? 'rounded-bl-xl' : ''} ${i === 4 ? 'rounded-br-xl' : ''}`}
          style={{
            backgroundColor: level >= i ? shades[i - 1] : 'rgba(0,0,0,0.2)',
            borderRight: i < 4 ? '1px solid rgba(0,0,0,0.3)' : 'none'
          }}
        />
      ))}
    </div>
  );
};

export default ConfidenceSegments;
