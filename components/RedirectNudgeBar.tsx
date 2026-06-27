'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useExperiment } from '@/utils/experiments';
import { getRandomCopyBlock } from '@/utils/headlines';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { track } from '@/utils/analytics';

/**
 * RedirectNudgeBar: A Brutalist countdown banner for the homepage.
 * Rejects soft UI in favor of high-contrast, sharp-edged authority.
 */
export default function RedirectNudgeBar() {
  const [countdown, setCountdown] = useState(5);
  const [dismissed, setDismissed] = useState(false);
  const [hasRedirectedToday, setHasRedirectedToday] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const createSession = useMutation(api.sessions.createSession);

  const isEnabled = useExperiment('REDIRECT_NUDGE_ENABLED');
  const isRotatingHeadlinesEnabled = useExperiment('ROTATING_HEADLINES_ENABLED');

  useEffect(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastRedirect = localStorage.getItem('syncclip_last_auto_redirect');
      
      // Production Grade: Validate format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (lastRedirect) {
        if (!dateRegex.test(lastRedirect)) {
          // Tampered or malformed: Reset
          localStorage.removeItem('syncclip_last_auto_redirect');
        } else if (lastRedirect === today) {
          setHasRedirectedToday(true);
        }
      }
    } catch (e) {
      // Storage blocked or full: default to safe state
      console.warn("Storage access failed, defaulting to show nudge.");
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isEnabled || dismissed || hasRedirectedToday) return;

    if (countdown <= 0) {
      handleAutoRedirect();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isEnabled, dismissed, hasRedirectedToday]);

  if (!isMounted || !isEnabled || dismissed || hasRedirectedToday) {
    return null;
  }

  function handleDismiss() {
    setDismissed(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('syncclip_last_auto_redirect', today);
    } catch (e) {
      // Fail silently
    }
  }

  async function handleAutoRedirect() {
    try {
      let nodeId = localStorage.getItem("syncclip_node_id");
      if (!nodeId) {
        nodeId = `NODE-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        localStorage.setItem("syncclip_node_id", nodeId);
      }
      const initialCopy = isRotatingHeadlinesEnabled 
        ? getRandomCopyBlock().hook 
        : "";

      const code = await createSession({ 
        ownerNodeId: nodeId,
        initialText: initialCopy
      });

      // Track auto-creation
      track("room_created", {
        timestamp: new Date().toISOString(),
        platform: "auto_redirect",
      });

      // Set daily redirect flag
      try {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('syncclip_last_auto_redirect', today);
      } catch (e) {
        // Fail silently if storage is full
      }

      router.push(`/${code}`);
    } catch (err) {
      console.error("Auto-redirect failed:", err);
      setDismissed(true);
    }
  }

  return (
    <div className="bg-secondary text-white border-b-2 border-black sticky top-10 z-40 flex items-center justify-between px-6 py-3 font-mono text-[10px] sm:text-xs tracking-widest uppercase antialiased">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 bg-white animate-pulse block"></span>
        <span>
          Auto-initializing live node in <strong className="font-black text-white underline">{countdown}s</strong> —
        </span>
      </div>
      <div className="flex items-center gap-6">
        <button 
          onClick={() => handleAutoRedirect()}
          className="hover:underline font-black cursor-pointer"
        >
          START NOW_
        </button>
        <button
          onClick={handleDismiss}
          className="bg-white text-black px-2 py-0.5 font-black hover:bg-black hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          ESC
        </button>
      </div>
    </div>
  );
}
