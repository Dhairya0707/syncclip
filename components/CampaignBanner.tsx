'use client';

import { useExperiment } from '../utils/experiments';
import { track } from '../utils/analytics';
import Link from 'next/link';

// Announcement bar ONLY shows when FEATURE_CAMPAIGN_ENABLED = true
export default function CampaignBanner() {
  const isFeatureCampaign = useExperiment('FEATURE_CAMPAIGN_ENABLED');

  if (!isFeatureCampaign) return null;

  const handleClick = () => {
    track('campaign_banner_clicked', {
      banner_text: "We're all ears! Every community idea is read & built directly by the founder.",
      cta: "Share Your Idea →",
    });
  };

  return (
    <aside 
      aria-label="Feature Request Campaign Announcement" 
      className="bg-secondary text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-center py-1.5 px-3 sm:px-6 border-b-2 border-black flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full shadow-md animate-in slide-in-from-top duration-300"
    >
      <span className="text-white drop-shadow-xs">
        🎧 We&apos;re all ears! Every community idea is read &amp; built directly by the founder.
      </span>
      <Link
        href="/f/feature-request"
        onClick={handleClick}
        className="bg-white text-black px-2.5 py-0.5 shrink-0 font-black hover:bg-black hover:text-white transition-all text-[9px] sm:text-[10px] tracking-widest uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
      >
        Share Your Idea →
      </Link>
    </aside>
  );
}
