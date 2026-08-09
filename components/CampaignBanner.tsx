'use client';

import { useExperiment } from '../utils/experiments';
import Link from 'next/link';

// Announcement bar ONLY shows when FEATURE_CAMPAIGN_ENABLED = true
export default function CampaignBanner() {
  const isFeatureCampaign = useExperiment('FEATURE_CAMPAIGN_ENABLED');

  if (!isFeatureCampaign) return null;

  return (
    <aside 
      aria-label="Feature Request Campaign Announcement" 
      className="bg-secondary text-white font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-center py-1.5 px-3 sm:px-6 border-b-2 border-black flex items-center justify-center gap-2 sm:gap-3 w-full shadow-md animate-in slide-in-from-top duration-300"
    >
      <span className="text-white drop-shadow-xs truncate max-w-[210px] xs:max-w-none">
        ⚡ We&apos;ve built 50+ user suggestions within 48h!
      </span>
      <Link
        href="/f/feature-request"
        className="bg-white text-black px-2.5 py-0.5 shrink-0 font-black hover:bg-black hover:text-white transition-all text-[9px] sm:text-[10px] tracking-widest uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        Request a Feature →
      </Link>
    </aside>
  );
}
