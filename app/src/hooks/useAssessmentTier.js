import { useMemo } from 'react';
import { calculateAssessTier } from '../data/assessments';

/**
 * Hook to calculate the user's current assessment unlock tier
 *
 * Tier 0: Default (only Quick Profile available)
 * Tier 1: Quick Profile completed (Starter Pack unlocked)
 * Tier 2: All 5 Starter Pack modules completed (all branches unlocked)
 *
 * @param {Object} completed - Object mapping test IDs to completion data
 * @returns {number} Current tier (0, 1, or 2)
 */
export function useAssessmentTier(completed) {
  return useMemo(() => calculateAssessTier(completed), [completed]);
}

export default useAssessmentTier;
