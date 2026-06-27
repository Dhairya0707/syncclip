"use client";

/**
 * Centralized feature flags for A/B tests and activation funnel experiments.
 * Integrated with tinyconfig-sdk for dynamic remote configuration.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TinyConfig } from 'tinyconfig-sdk';

export const DEFAULTS = {
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

  // Flag H: Automatic QR code pairing popup modal on first entry
  AUTO_QR_MODAL_ENABLED: true,
};

export type ExperimentFlags = typeof DEFAULTS;
export type FlagName = keyof ExperimentFlags;

// Singleton client initialization
export const tinyConfig = typeof window !== 'undefined'
  ? new TinyConfig({
      projectId: 'syncclip',
      workerUrl: 'https://tinyconfig.dhairyadarji7867.workers.dev',
      defaults: {
        flags: DEFAULTS
      }
    })
  : null;

// Synchronous helper for non-React code (e.g. analytics tracking)
export const isExperimentEnabled = (flagName: FlagName): boolean => {
  if (tinyConfig) {
    return tinyConfig.getBoolean(flagName, DEFAULTS[flagName]);
  }
  return DEFAULTS[flagName];
};

// React Context for reactive updates
const ExperimentsContext = createContext<ExperimentFlags>(DEFAULTS);

export function ExperimentsProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlags] = useState<ExperimentFlags>(DEFAULTS);

  useEffect(() => {
    if (!tinyConfig) return;

    const initConfig = async () => {
      try {
        await tinyConfig.initialize();
        // Read initialized values
        const updatedFlags: ExperimentFlags = {
          TRACKING_ENABLED: tinyConfig.getBoolean('TRACKING_ENABLED', DEFAULTS.TRACKING_ENABLED),
          REDIRECT_NUDGE_ENABLED: tinyConfig.getBoolean('REDIRECT_NUDGE_ENABLED', DEFAULTS.REDIRECT_NUDGE_ENABLED),
          FORCE_SECOND_DEVICE_ENABLED: tinyConfig.getBoolean('FORCE_SECOND_DEVICE_ENABLED', DEFAULTS.FORCE_SECOND_DEVICE_ENABLED),
          PWA_NUDGE_ENABLED: tinyConfig.getBoolean('PWA_NUDGE_ENABLED', DEFAULTS.PWA_NUDGE_ENABLED),
          ROTATING_HEADLINES_ENABLED: tinyConfig.getBoolean('ROTATING_HEADLINES_ENABLED', DEFAULTS.ROTATING_HEADLINES_ENABLED),
          FEEDBACK_CAMPAIGN_ENABLED: tinyConfig.getBoolean('FEEDBACK_CAMPAIGN_ENABLED', DEFAULTS.FEEDBACK_CAMPAIGN_ENABLED),
          AUTO_QR_MODAL_ENABLED: tinyConfig.getBoolean('AUTO_QR_MODAL_ENABLED', DEFAULTS.AUTO_QR_MODAL_ENABLED),
        };
        setFlags(updatedFlags);
      } catch (err) {
        console.error("Failed to initialize tinyconfig-sdk:", err);
      }
    };

    initConfig();
  }, []);

  return (
    <ExperimentsContext.Provider value={flags}>
      {children}
    </ExperimentsContext.Provider>
  );
}

// React hook for component reactivity
export function useExperiment(flagName: FlagName): boolean {
  const context = useContext(ExperimentsContext);
  return context[flagName];
}
