'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useExperiment } from '../utils/experiments';
import { track } from '../utils/analytics';

interface FeedbackModalProps {
  roomCode: string;
  participantCount: number;
}

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // 7 Days in milliseconds

/**
 * Checks if a campaign has been permanently completed/dismissed within the last 7 days.
 * Automatically expires and cleans up localStorage keys older than 1 week!
 */
function isCampaignDone(storageKey: string): boolean {
  if (typeof window === 'undefined') return false;
  const val = localStorage.getItem(storageKey);
  if (!val) return false;

  const timestamp = parseInt(val, 10);
  if (isNaN(timestamp)) {
    // Migrate legacy 'true' string to current timestamp
    localStorage.setItem(storageKey, Date.now().toString());
    return true;
  }

  // If older than 1 week, auto-expire so user gets asked again!
  if (Date.now() - timestamp > ONE_WEEK_MS) {
    localStorage.removeItem(storageKey);
    return false;
  }

  return true;
}

export default function FeedbackModal({ roomCode, participantCount }: FeedbackModalProps) {
  const router = useRouter();
  const isFeatureCampaign = useExperiment('FEATURE_CAMPAIGN_ENABLED');
  const isFeedbackCampaign = useExperiment('FEEDBACK_CAMPAIGN_ENABLED');

  // Active if EITHER campaign flag is enabled
  const isEnabled = isFeatureCampaign || isFeedbackCampaign;

  const [showModal, setShowModal] = useState(false);
  const [showMascot, setShowMascot] = useState(false);
  const [isWagging, setIsWagging] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const modalTrackedRef = useRef(false);

  // Priority 1: Feature Campaign mode vs Priority 2: Feedback mode
  const mode = isFeatureCampaign ? 'feature' : 'feedback';
  const doneStorageKey = mode === 'feature' ? 'syncclip_feature_campaign_done' : 'syncclip_feedback_campaign_done';
  const sessionClosedKey = mode === 'feature' ? 'syncclip_feature_session_closed' : 'syncclip_feedback_session_closed';

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;

    const done = isCampaignDone(doneStorageKey);
    const sessionClosed = sessionStorage.getItem(sessionClosedKey) === 'true';

    // Trigger 3.5s after 2nd device join so user experiences clipboard sync magic first!
    if (!done && !sessionClosed && participantCount >= 2) {
      const timer = setTimeout(() => {
        setShowModal(true);
        // Mascot pops in 300ms after popup card slides in
        setTimeout(() => {
          setShowMascot(true);
          setIsWagging(true);
          // Initial bounce 5-8 times (~4.5s) then settles
          setTimeout(() => setIsWagging(false), 4500);
        }, 300);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isEnabled, participantCount, doneStorageKey, sessionClosedKey]);

  // Occasional subtle idle animation every 15 seconds
  useEffect(() => {
    if (!showModal || isDismissing) return;
    const interval = setInterval(() => {
      setIsWagging(true);
      setTimeout(() => setIsWagging(false), 3000);
    }, 15000);
    return () => clearInterval(interval);
  }, [showModal, isDismissing]);

  useEffect(() => {
    if (showModal && !modalTrackedRef.current) {
      track('feedback_popup_shown', { roomCode, mode, trigger: '2nd_device_join', timestamp: new Date().toISOString() });
      modalTrackedRef.current = true;
    }
  }, [showModal, roomCode, mode]);

  const handleDismiss = () => {
    setIsDismissing(true);
    // Store exact timestamp for 1-week auto-expiration
    localStorage.setItem(doneStorageKey, Date.now().toString());
    track('feedback_popup_dismissed', { roomCode, mode });
    setTimeout(() => setShowModal(false), 850);
  };

  const handleCloseSession = () => {
    setIsDismissing(true);
    sessionStorage.setItem(sessionClosedKey, 'true');
    track('feedback_popup_closed', { roomCode, mode });
    setTimeout(() => setShowModal(false), 850);
  };

  const handleGiveFeedback = () => {
    track('feedback_popup_clicked', { roomCode, mode });
    const targetSlug = mode === 'feature' ? "feature-request" : "clipboard-feedback";
    router.push(`/f/${targetSlug}?code=${roomCode}`);
  };

  if (!isEnabled || !showModal) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[250] max-w-sm sm:max-w-md w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-6 fade-in duration-300"
      role="dialog"
      aria-labelledby="feedback-popup-heading"
    >
      <div className="bg-white border-3 border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative flex flex-col gap-4">
        {/* Dismissing Reaction View */}
        {isDismissing ? (
          <div className="flex items-center gap-4 py-2 animate-in fade-in zoom-in-95 duration-200">
            <Image
              src="/transparent_mascot.png"
              alt="Clip Mascot"
              width={56}
              height={56}
              className="object-contain drop-shadow-md shrink-0"
            />
            <div>
              <div className="font-headline text-base font-extrabold text-black">
                No worries!
              </div>
              <p className="font-body text-xs text-zinc-600 font-medium">
                Thanks for using SyncClip ❤️
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Close Session Button */}
            <button
              onClick={handleCloseSession}
              className="absolute top-3 right-3 text-zinc-400 hover:text-black font-mono font-bold text-sm w-7 h-7 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Dismiss for now"
            >
              ✕
            </button>

            {/* Mascot & Greeting */}
            <div className="flex items-center gap-3.5 pr-6">
              <div className="relative shrink-0 w-16 h-16 flex items-center justify-center">
                {showMascot && (
                  <Image
                    src="/transparent_mascot.png"
                    alt="Clip the SyncClip Mascot"
                    width={64}
                    height={64}
                    className={`object-contain drop-shadow-md animate-in zoom-in-50 duration-300 ${
                      isWagging ? "animate-bounce" : ""
                    }`}
                  />
                )}
              </div>
              <div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-secondary font-bold uppercase">
                  {mode === 'feature' ? '❤️ SYNCCLIP COMMUNITY' : '📢 PRODUCT FEEDBACK'}
                </div>
                <h3 id="feedback-popup-heading" className="font-headline text-xl font-extrabold tracking-tight text-black leading-tight">
                  {mode === 'feature' ? "Hi 👋 I'm Clip!" : "Help Us Improve SyncClip! 💬"}
                </h3>
              </div>
            </div>

            {/* Body Copy tailored to active mode */}
            <p className="font-body text-sm text-zinc-800 leading-relaxed font-normal">
              {mode === 'feature' ? (
                <>We&apos;ve already built <strong className="text-black font-bold">50+ ideas suggested by our community</strong>. What&apos;s one thing you&apos;d love to see next?</>
              ) : (
                <>How has your experience with SyncClip been so far? Share 30s quick feedback to help us build zero-login cross-device sync for everyone.</>
              )}
            </p>

            {/* Action Button & Subtext */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleGiveFeedback}
                className="w-full bg-secondary text-white font-label font-extrabold py-3.5 px-5 border-2 border-black hover:bg-black hover:border-black transition-all uppercase tracking-widest text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{mode === 'feature' ? "SHARE MY IDEA" : "GIVE FEEDBACK"}</span>
                <span className="font-mono text-[10px]">→</span>
              </button>

              <div className="flex items-center justify-between px-1 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                <span>⏱ Takes &lt;30s • No sign-up required</span>
                <button
                  onClick={handleDismiss}
                  className="text-zinc-400 hover:text-black uppercase underline underline-offset-2 cursor-pointer"
                >
                  Don&apos;t show again
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
