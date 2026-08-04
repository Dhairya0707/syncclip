'use client';

import { useExperiment } from '@/utils/experiments';
import { CopyBlock } from '@/utils/headlines';

import { QRCodeSVG } from 'qrcode.react';

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
  const isEnabled = useExperiment('FORCE_SECOND_DEVICE_ENABLED');

  // Don't render if flag is off
  if (!isEnabled) {
    return null;
  }

  // Hide on mobile screens since they can't scan their own screen
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  // Hide if second device already joined
  if (participantCount > 1) {
    return null;
  }

  return (
    <div className="border-2 border-black bg-white mb-8 flex flex-col md:flex-row items-stretch flex-shrink-0 animate-in fade-in slide-in-from-top duration-500">
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
        <div className="border-2 border-black p-2 bg-white hover:border-secondary transition-colors cursor-pointer flex items-center justify-center">
          {qrUrl && (
            <QRCodeSVG
              value={qrUrl}
              size={115}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              marginSize={0}
              imageSettings={{
                src: "/assets/icon-removebg-preview copy.png",
                x: undefined,
                y: undefined,
                height: 30,
                width: 30,
                excavate: true,
              }}
            />
          )}
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
