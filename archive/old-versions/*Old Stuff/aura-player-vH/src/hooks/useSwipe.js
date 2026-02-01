import { useState, useRef, useCallback } from 'react';

const SWIPE_THRESHOLD = 50;

export const useSwipe = ({ onSwipeLeft, onSwipeRight, enabled = true }) => {
  const [swiping, setSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e) => {
    if (!enabled) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setSwiping(true);
  }, [enabled]);

  const handleTouchMove = useCallback((e) => {
    if (!enabled || !swiping) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    
    // Only track horizontal swipes (ignore vertical scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setSwipeOffset(deltaX);
    }
  }, [enabled, swiping]);

  const handleTouchEnd = useCallback((e) => {
    if (!enabled || !swiping) return;
    
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }
    
    setSwiping(false);
    setSwipeOffset(0);
  }, [enabled, swiping, onSwipeLeft, onSwipeRight]);

  return {
    swipeOffset,
    swiping,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    }
  };
};

export default useSwipe;
