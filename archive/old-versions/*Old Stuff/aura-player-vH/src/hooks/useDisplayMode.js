import { useState, useEffect } from 'react';

export const useDisplayMode = () => {
  const [mode, setMode] = useState(() => getDisplayMode());

  useEffect(() => {
    const handleResize = () => setMode(getDisplayMode());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return mode;
};

const getDisplayMode = () => {
  // PWA standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches) return 'mobile';
  // iOS PWA
  if (window.navigator.standalone === true) return 'mobile';
  // Mobile browser by width
  if (window.innerWidth <= 768) return 'mobile';
  // Mobile user agent
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return 'mobile';
  // Default: desktop with phone simulator
  return 'desktop';
};

export default useDisplayMode;
