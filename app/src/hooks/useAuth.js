import { useState, useEffect, useCallback } from 'react';
import { auraDB, setUserEmail } from '../services/supabase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    auraDB.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setUserEmail(session.user.email);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = auraDB.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setUserEmail(session.user.email);
      } else {
        setUser(null);
        setUserEmail(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithMagicLink = useCallback(async (email) => {
    const { error } = await auraDB.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      }
    });
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await auraDB.auth.signOut();
    return { error };
  }, []);

  return {
    user,
    loading,
    signInWithMagicLink,
    signOut,
    isAuthenticated: !!user
  };
};

export default useAuth;
