"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TinyConfig } from 'tinyconfig-sdk';

/**
 * SyncClip Feature Flags:
 * 1. FEATURE_CAMPAIGN_ENABLED: Feature Request Marketing Campaign (Top Announcement Bar + In-session Popup + /f/feature-request)
 * 2. FEEDBACK_CAMPAIGN_ENABLED: Normal Product Feedback Popup inside session only (No Announcement Bar + /f/clipboard-feedback)
 */

export const DEFAULTS = {
  // Feature Request Campaign (Top Announcement Bar + In-Session Feature Popup)
  FEATURE_CAMPAIGN_ENABLED: false,

  // Normal Product Feedback (In-Session Feedback Popup ONLY, No Announcement Bar)
  FEEDBACK_CAMPAIGN_ENABLED: false,
};

export type ExperimentFlags = typeof DEFAULTS;
export type FlagName = keyof ExperimentFlags;

export const tinyConfig = typeof window !== 'undefined'
  ? new TinyConfig({
      projectId: 'syncclip',
      workerUrl: 'https://tinyconfig.dhairyadarji7867.workers.dev',
      defaults: { flags: DEFAULTS }
    })
  : null;

export const isExperimentEnabled = (flagName: FlagName): boolean => {
  if (tinyConfig) return tinyConfig.getBoolean(flagName, DEFAULTS[flagName]);
  return DEFAULTS[flagName];
};

const ExperimentsContext = createContext<ExperimentFlags>(DEFAULTS);

export function ExperimentsProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlags] = useState<ExperimentFlags>(DEFAULTS);

  useEffect(() => {
    const load = async () => {
      try {
        if (tinyConfig) await tinyConfig.initialize();
        const res = await fetch('https://tinyconfig.dhairyadarji7867.workers.dev/v1/projects/syncclip/config');
        if (res.ok) {
          const body = await res.json();
          if (body?.success && body?.data?.flags) {
            const r = body.data.flags;
            setFlags({
              FEATURE_CAMPAIGN_ENABLED: typeof r.FEATURE_CAMPAIGN_ENABLED === 'boolean' ? r.FEATURE_CAMPAIGN_ENABLED : DEFAULTS.FEATURE_CAMPAIGN_ENABLED,
              FEEDBACK_CAMPAIGN_ENABLED: typeof r.FEEDBACK_CAMPAIGN_ENABLED === 'boolean' ? r.FEEDBACK_CAMPAIGN_ENABLED : DEFAULTS.FEEDBACK_CAMPAIGN_ENABLED,
            });
          }
        }
      } catch {
        // Fallback silently
      }
    };
    load();
  }, []);

  return (
    <ExperimentsContext.Provider value={flags}>
      {children}
    </ExperimentsContext.Provider>
  );
}

export function useExperiment<T extends FlagName>(flagName: T): ExperimentFlags[T] {
  const context = useContext(ExperimentsContext);
  return (context[flagName] ?? DEFAULTS[flagName]) as ExperimentFlags[T];
}
