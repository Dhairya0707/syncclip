'use client';

import { isExperimentEnabled } from '@/utils/experiments';
import { CopyBlock } from '@/utils/headlines';

interface SecondDeviceCTAProps {
  participantCount: number;
  qrUrl: string;
  copyBlock?: CopyBlock;
  onClose?: () => void;
}

/**
 * SecondDeviceCTA: A Brutalist call-to-action to encourage cross-device syncing.
 * Hides automatically when a second device joins.
 */
export default function SecondDeviceCTA({
  participantCount,
  qrUrl,
  copyBlock,
  onClose
}: SecondDeviceCTAProps) {
  // Don't render if flag is off
  if (!isExperimentEnabled('FORCE_SECOND_DEVICE_ENABLED')) {
    return null;
  }

  // Hide if second device already joined
  if (participantCount > 1) {
    return null;
  }

  return (
    <div className="border-2 border-black bg-white mb-8 flex flex-col md:flex-row items-stretch animate-in fade-in slide-in-from-top duration-500">
      <div className="flex-grow p-6 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-black">
        <div className="font-mono text-[10px] tracking-[0.3em] text-secondary uppercase mb-2">
          {copyBlock?.brandPrompt || "Multi-Device Protocol"}
        </div>
        <h3 className="font-headline text-xl md:text-3xl font-black uppercase tracking-tight mb-3">
          {copyBlock?.hook || "This works best with 2 devices."}
        </h3>
        <p className="font-body text-sm text-zinc-600 leading-relaxed max-w-md">
          {copyBlock?.cta || "Scan the QR code with your phone to connect instantly. Watch your clipboard sync in real-time across hardware."}
        </p>
      </div>

      <div className="bg-zinc-50 p-6 flex items-center gap-6 relative group">
        <div className="border-2 border-black p-2 bg-white hover:border-secondary transition-colors cursor-pointer">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrUrl)}`}
            alt="Room QR code"
            className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black">SCAN_TO_PAIR</span>
          <span className="font-mono text-[9px] text-zinc-400 uppercase mt-1 tracking-tighter">Direct Uplink_</span>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-zinc-300 hover:text-black material-symbols-outlined text-lg transition-colors"
            aria-label="Dismiss"
          >
            close
          </button>
        )}
      </div>
    </div>
  );
}
