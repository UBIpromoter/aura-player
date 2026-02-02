// Binary answer buttons (Yes/No) with confidence tap system
import { getStars } from '../../utils/theme';
import { ConfidenceSegments } from './ConfidenceSegments';

export const BinaryButtons = ({
  darkMode,
  tappedAnswer,
  tapCount,
  isAnswered,
  currentResponse,
  onTap,
  onRightClick,
  pendingSubmit,
  requireConfirmation = false,
  onSubmit,
  onClear
}) => {
  // Color shades for gradient (light to dark by confidence)
  const yesShades = {
    1: darkMode ? ['#065f46', '#059669'] : ['#a7f3d0', '#6ee7b7'],
    2: darkMode ? ['#047857', '#10b981'] : ['#6ee7b7', '#34d399'],
    3: darkMode ? ['#059669', '#34d399'] : ['#34d399', '#10b981'],
    4: darkMode ? ['#10b981', '#6ee7b7'] : ['#10b981', '#059669'],
  };
  const noShades = {
    1: darkMode ? ['#9f1239', '#e11d48'] : ['#fecdd3', '#fda4af'],
    2: darkMode ? ['#be123c', '#f43f5e'] : ['#fda4af', '#fb7185'],
    3: darkMode ? ['#e11d48', '#fb7185'] : ['#fb7185', '#f43f5e'],
    4: darkMode ? ['#f43f5e', '#fda4af'] : ['#f43f5e', '#e11d48'],
  };

  const getButtonStyle = (answer) => {
    const isSelected = tappedAnswer === answer;
    const isPending = pendingSubmit?.answer === answer;
    const wasAnswered = currentResponse?.answer === answer;
    const shades = answer === 0 ? yesShades : noShades;
    const conf = isSelected ? tapCount : (currentResponse?.confidence || pendingSubmit?.confidence || 2);

    if (wasAnswered || isPending) {
      const s = shades[Math.min(conf, 4)];
      return { background: `linear-gradient(135deg, ${s[0]} 0%, ${s[1]} 100%)`, boxShadow: 'none', color: 'white' };
    }
    if (isSelected) {
      const s = shades[Math.min(tapCount, 4)];
      return {
        background: `linear-gradient(135deg, ${s[0]} 0%, ${s[1]} 100%)`,
        boxShadow: `0 0 ${tapCount * 8}px rgba(${answer === 0 ? '16,185,129' : '244,63,94'}, ${0.2 + tapCount * 0.15})`,
        color: 'white'
      };
    }
    if (isAnswered) {
      return {
        background: darkMode ? 'rgb(31,41,55)' : 'rgb(243,244,246)',
        boxShadow: 'none',
        color: darkMode ? 'rgb(107,114,128)' : 'rgb(156,163,175)'
      };
    }
    return {
      background: darkMode ? 'rgb(31,41,55)' : 'rgb(255,255,255)',
      boxShadow: 'none',
      color: darkMode ? 'rgb(209,213,219)' : (answer === 0 ? 'rgb(5,150,105)' : 'rgb(225,29,72)'),
      border: darkMode ? 'none' : `2px solid ${answer === 0 ? 'rgb(167,243,208)' : 'rgb(254,205,211)'}`,
    };
  };

  const showSubmit = tappedAnswer !== null && requireConfirmation && !isAnswered && !pendingSubmit;

  // Full width buttons when auto-submit (no checkmark slots needed)
  if (!requireConfirmation) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map(answer => (
          <button
            key={answer}
            onClick={() => !isAnswered && !pendingSubmit && onTap(answer)}
            onContextMenu={(e) => onRightClick && onRightClick(e, answer)}
            disabled={isAnswered || pendingSubmit}
            className={`relative h-[57px] rounded-xl font-bold overflow-hidden select-none btn-feedback ${
              tappedAnswer === answer
                ? (answer === 0 ? 'ring-2 ring-emerald-400 shine-card shine-emerald' : 'ring-2 ring-rose-400 shine-card shine-rose')
                : ''
            }`}
            style={getButtonStyle(answer)}
          >
            <ConfidenceSegments level={tapCount} color={answer === 0 ? 'emerald' : 'rose'} active={tappedAnswer === answer} darkMode={darkMode} />
            <div className="relative z-10 flex items-center justify-center h-full gap-1.5">
              <span className="text-2xl font-bold">{answer === 0 ? 'YES' : 'NO'}</span>
              {tappedAnswer === answer && <span className="text-sm font-medium opacity-70">{getStars(tapCount)}</span>}
            </div>
          </button>
        ))}
      </div>
    );
  }

  // With centered checkmark between buttons when confirmation required
  return (
    <div className="flex items-center gap-2">
      {/* YES button */}
      <button
        onClick={() => !isAnswered && !pendingSubmit && onTap(0)}
        onContextMenu={(e) => onRightClick && onRightClick(e, 0)}
        disabled={isAnswered || pendingSubmit}
        className={`flex-1 relative h-[57px] rounded-xl font-bold overflow-hidden select-none btn-feedback ${
          tappedAnswer === 0 ? 'ring-2 ring-emerald-400 shine-card shine-emerald' : ''
        }`}
        style={getButtonStyle(0)}
      >
        <ConfidenceSegments level={tapCount} color="emerald" active={tappedAnswer === 0} darkMode={darkMode} />
        <div className="relative z-10 flex items-center justify-center h-full gap-1.5">
          <span className="text-2xl font-bold">YES</span>
          {tappedAnswer === 0 && <span className="text-sm font-medium opacity-70">{getStars(tapCount)}</span>}
        </div>
      </button>

      {/* Centered submit/clear buttons */}
      <div className="w-11 h-[57px] flex-shrink-0 flex flex-col items-center justify-center">
        {showSubmit && (
          <>
            <button
              onClick={() => onClear && onClear()}
              className={`w-6 h-6 rounded-full btn-feedback flex items-center justify-center text-xs ${
                darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
              }`}
            >
              ✕
            </button>
            <button
              onClick={() => onSubmit && onSubmit(tappedAnswer, tapCount)}
              className={`w-10 h-10 rounded-full text-white shadow-lg btn-feedback flex items-center justify-center text-lg ${
                tappedAnswer === 0 ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            >
              ✓
            </button>
          </>
        )}
      </div>

      {/* NO button */}
      <button
        onClick={() => !isAnswered && !pendingSubmit && onTap(1)}
        onContextMenu={(e) => onRightClick && onRightClick(e, 1)}
        disabled={isAnswered || pendingSubmit}
        className={`flex-1 relative h-[57px] rounded-xl font-bold overflow-hidden select-none btn-feedback ${
          tappedAnswer === 1 ? 'ring-2 ring-rose-400 shine-card shine-rose' : ''
        }`}
        style={getButtonStyle(1)}
      >
        <ConfidenceSegments level={tapCount} color="rose" active={tappedAnswer === 1} darkMode={darkMode} />
        <div className="relative z-10 flex items-center justify-center h-full gap-1.5">
          <span className="text-2xl font-bold">NO</span>
          {tappedAnswer === 1 && <span className="text-sm font-medium opacity-70">{getStars(tapCount)}</span>}
        </div>
      </button>
    </div>
  );
};

export default BinaryButtons;
