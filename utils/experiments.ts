/**
 * Centralized feature flags for A/B tests and activation funnel experiments.
 * Follows the "High-Density Editorial Brutalism" philosophy:
 * These flags allow rapid iteration without modifying core logic.
 */

export const EXPERIMENTS = {
  // Flag F: Event tracking (Vercel Analytics custom events)
  TRACKING_ENABLED: true,

  // Flag A: 5-second redirect nudge bar on homepage
  REDIRECT_NUDGE_ENABLED: false,

  // Flag C: Prominent second device CTA strip in room view
  FORCE_SECOND_DEVICE_ENABLED: false,

  // Flag D: PWA install prompt after first keystroke
  PWA_NUDGE_ENABLED: true,

  // Flag B: Rotating post-room-creation headlines
  ROTATING_HEADLINES_ENABLED: true,

  // Flag G: Feedback campaign banner + feedback page route
  FEEDBACK_CAMPAIGN_ENABLED: process.env.NEXT_PUBLIC_FEEDBACK_CAMPAIGN === "true",
} as const;

/**
 * Helper function to check if an experiment is enabled.
 */
export const isExperimentEnabled = (
  flagName: keyof typeof EXPERIMENTS,
): boolean => {
  return EXPERIMENTS[flagName];
};
