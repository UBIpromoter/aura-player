import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage, getDeviceId } from './useLocalStorage';
import { USER_TIERS } from '../data/constants';

/**
 * Authentication and user state hook
 * 
 * Manages user identity across three tiers:
 * - anonymous: Device UUID only, localStorage storage
 * - named: Username chosen, syncs to server
 * - verified: BrightID linked, can earn rewards
 * 
 * @returns {Object} Auth state and methods
 */
export function useAuth() {
  const [user, setUser] = useLocalStorage('aura_user', null);
  const [deviceId] = useState(getDeviceId);

  // Initialize anonymous user if none exists
  useEffect(() => {
    if (!user) {
      setUser({
        id: deviceId,
        device_id: deviceId,
        username: null,
        bright_id: null,
        tier: USER_TIERS.ANONYMOUS,
        stats: {
          total_answered: 0,
          streak: 0,
          points: 0
        },
        created_at: Date.now()
      });
    }
  }, [user, deviceId, setUser]);

  // Computed tier
  const tier = user?.tier || USER_TIERS.ANONYMOUS;
  const isVerified = tier === USER_TIERS.VERIFIED;
  const isNamed = tier === USER_TIERS.NAMED || tier === USER_TIERS.VERIFIED;

  /**
   * Register with a username (anonymous → named)
   * In production: POST /user/register
   */
  const register = useCallback(async (username) => {
    // TODO: Replace with API call
    // const response = await api.post('/user/register', { username, deviceId });
    
    const updatedUser = {
      ...user,
      username,
      tier: USER_TIERS.NAMED
    };
    setUser(updatedUser);
    return updatedUser;
  }, [user, setUser]);

  /**
   * Connect BrightID (named → verified)
   * In production: Shows QR code, calls POST /user/link-brightid
   */
  const connectBrightId = useCallback(async () => {
    // TODO: Implement BrightID QR flow
    // 1. Generate QR code / deep link
    // 2. Poll for confirmation
    // 3. Call POST /user/link-brightid with signed payload
    console.log('BrightID connection not yet implemented');
    
    // For demo, simulate verification
    const updatedUser = {
      ...user,
      bright_id: 'demo-brightid-' + deviceId,
      tier: USER_TIERS.VERIFIED
    };
    setUser(updatedUser);
    return updatedUser;
  }, [user, deviceId, setUser]);

  /**
   * Update user stats
   */
  const updateStats = useCallback((updates) => {
    setUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        ...updates
      }
    }));
  }, [setUser]);

  /**
   * Logout (reset to anonymous)
   */
  const logout = useCallback(() => {
    setUser({
      id: deviceId,
      device_id: deviceId,
      username: null,
      bright_id: null,
      tier: USER_TIERS.ANONYMOUS,
      stats: {
        total_answered: 0,
        streak: 0,
        points: 0
      },
      created_at: Date.now()
    });
  }, [deviceId, setUser]);

  return {
    user,
    tier,
    deviceId,
    isVerified,
    isNamed,
    register,
    connectBrightId,
    updateStats,
    logout
  };
}

export default useAuth;
