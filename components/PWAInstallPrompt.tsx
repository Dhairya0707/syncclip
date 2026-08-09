'use client';

import { useEffect, useState, useRef } from 'react';
import { track } from '@/utils/analytics';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * PWAInstallPrompt: A Brutalist toast that triggers after user activity.
 * Focuses on retention without compromising the aesthetic.
 */
export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const firstKeystrokeRef = useRef(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Check if already dismissed in this browser
    const isDismissed = localStorage.getItem('syncclip_pwa_dismissed');
    if (isDismissed) dismissedRef.current = true;

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    const handleFirstKeystroke = () => {
      if (!firstKeystrokeRef.current && deferredPrompt && !dismissedRef.current) {
        firstKeystrokeRef.current = true;

        // Wait 8 seconds after first interaction to not be too intrusive
        const timer = setTimeout(() => {
          setShowPrompt(true);
          track('pwa_prompted', { action: 'shown', timestamp: new Date().toISOString() });
        }, 8000);

        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('first_keystroke', handleFirstKeystroke);
    return () => window.removeEventListener('first_keystroke', handleFirstKeystroke);
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    track('pwa_prompted', { action: 'accepted', timestamp: new Date().toISOString() });

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    dismissedRef.current = true;
    track('pwa_prompted', { action: 'dismissed', timestamp: new Date().toISOString() });
    setShowPrompt(false);
    localStorage.setItem('syncclip_pwa_dismissed', 'true');
  };

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-sm w-full bg-white border-4 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-bottom duration-500">
      <div className="font-mono text-[10px] tracking-[0.3em] text-secondary uppercase mb-2">System Upgrade</div>
      <h3 className="font-headline text-xl font-black uppercase tracking-tight mb-3">
        Install SyncClip Node_
      </h3>
      <p className="font-body text-sm text-zinc-600 leading-relaxed mb-6">
        Add this protocol to your home screen for instant access. Works offline. Zero latency.
      </p>

      <div className="flex gap-4">
        <button
          onClick={handleInstall}
          className="flex-grow bg-black text-white font-label font-bold py-3 px-4 border-2 border-black hover:bg-secondary hover:border-secondary transition-all uppercase tracking-widest text-xs"
        >
          INSTALL NOW
        </button>
        <button
          onClick={handleDismiss}
          className="bg-white text-black font-label font-bold py-3 px-4 border-2 border-black hover:bg-zinc-100 transition-all uppercase tracking-widest text-xs"
        >
          NOT NOW
        </button>
      </div>
    </div>
  );
}
