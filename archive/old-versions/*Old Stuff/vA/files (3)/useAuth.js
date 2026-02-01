// Aura Player - Auth Hook
// Handles user state, device ID, and tier management

import { useState, useEffect, useCallback } from 'react';

// Generate device ID (persisted in localStorage)
const getDeviceId = () => {
  const stored = localStorage.getItem('aura_device_id');
  if (stored) return stored;
  
  const id = `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('aura_device_id', id);
  return id;
};

// Determine user tier based on available data
const getTier = (user) => {
  if (user?.auraLevel > 0) return 'verified';
  if (user?.brightId) return 'brightid';
  if (user?.username) return 'named';
  return 'anonymous';
};

export function useAuth() {
  const [deviceId] = useState(getDeviceId);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('aura_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);
  
  // Register with username
  const register = useCallback(async (username) => {
    // TODO: POST /user/register with { username, deviceId }
    const newUser = {
      id: `user-${Date.now()}`,
      deviceId,
      username,
      brightId: null,
      auraLevel: 0,
      createdAt: new Date().toISOString(),
      stats: {
        totalAnswered: 0,
        currentStreak: 0,
        longestStreak: 0,
        points: 0,
      },
    };
    
    localStorage.setItem('aura_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }, [deviceId]);
  
  // Connect BrightID
  const connectBrightId = useCallback(async () => {
    // TODO: Implement BrightID flow
    // This will:
    // 1. Show QR code or deep link to BrightID app
    // 2. User scans/taps to link
    // 3. POST /user/link-brightid with signed payload
    // 4. Update user state
    console.log('BrightID connection flow not yet implemented');
  }, []);
  
  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('aura_user');
    setUser(null);
    // Note: deviceId remains, so anonymous responses can still be linked later
  }, []);
  
  return {
    user,
    deviceId,
    tier: getTier(user),
    isVerified: getTier(user) === 'verified',
    loading,
    register,
    connectBrightId,
    logout,
  };
}
