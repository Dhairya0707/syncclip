'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const DEMOS = [
  {
    tag: '2FA / OTP CODE',
    scenario: 'Received OTP on Android — need it in desktop browser',
    text: '482 961',
    icon: '🔐',
  },
  {
    tag: 'DEVELOPER COMMAND',
    scenario: 'Copied terminal command from phone notes to laptop',
    text: 'npx convex dev --once',
    icon: '⚡',
  },
  {
    tag: 'MEETING URL',
    scenario: 'WhatsApp meeting link → pasted directly in PC browser',
    text: 'meet.google.com/xzq-abcd-efg',
    icon: '📎',
  },
  {
    tag: 'ADDRESS / TEXT',
    scenario: 'Forwarded address from WhatsApp to Google Maps on PC',
    text: 'Sector 17, Chandigarh 160017',
    icon: '📍',
  },
];

type Phase = 'idle' | 'typing' | 'syncing' | 'synced' | 'resetting';

export default function AndroidWindowsSimulation() {
  const [demoIndex, setDemoIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedText, setTypedText] = useState('');
  const [pcText, setPcText] = useState('');
  const [syncProgress, setSyncProgress] = useState(0); // 0-100 for the beam animation
  const pendingRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => {
    pendingRef.current.forEach(clearTimeout);
    pendingRef.current = [];
  };

  const later = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    pendingRef.current.push(id);
  };

  const runDemo = useCallback((idx: number) => {
    const demo = DEMOS[idx];
    setPhase('idle');
    setTypedText('');
    setPcText('');
    setSyncProgress(0);

    // Start typing after short pause
    later(() => {
      setPhase('typing');
      let charIdx = 0;

      const typeNext = () => {
        charIdx++;
        setTypedText(demo.text.slice(0, charIdx));
        if (charIdx < demo.text.length) {
          later(typeNext, 55 + Math.random() * 40);
        } else {
          // Done typing — begin sync animation
          later(() => {
            setPhase('syncing');
            // Animate sync progress beam 0→100
            let prog = 0;
            const tick = () => {
              prog += 8;
              setSyncProgress(Math.min(prog, 100));
              if (prog < 100) {
                later(tick, 25);
              } else {
                // Beam reached PC — show text
                later(() => {
                  setPhase('synced');
                  setPcText(demo.text);
                  // Hold then reset
                  later(() => {
                    setPhase('resetting');
                    later(() => {
                      setDemoIndex((prev) => (prev + 1) % DEMOS.length);
                    }, 400);
                  }, 2800);
                }, 80);
              }
            };
            tick();
          }, 700);
        }
      };

      later(typeNext, 55);
    }, 600);
  }, []);

  useEffect(() => {
    clear();
    runDemo(demoIndex);
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoIndex]);

  const demo = DEMOS[demoIndex];
  const isSyncing = phase === 'syncing';
  const isSynced = phase === 'synced' || phase === 'resetting';
  const isTyping = phase === 'typing';
  const opacity = phase === 'resetting' ? 'opacity-0' : 'opacity-100';

  return (
    <div className={`transition-opacity duration-300 ${opacity}`}>

      {/* Scenario label */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">{demo.icon}</span>
          <div>
            <div className="font-mono text-[9px] tracking-[0.3em] text-secondary uppercase font-bold">{demo.tag}</div>
            <div className="font-mono text-[10px] text-zinc-400 mt-0.5">{demo.scenario}</div>
          </div>
        </div>
        {/* Demo counter dots */}
        <div className="flex gap-2">
          {DEMOS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 border border-zinc-600 transition-all duration-300 ${
                i === demoIndex ? 'bg-secondary border-secondary' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Devices row */}
      <div className="flex items-center gap-4 md:gap-8">

        {/* ── ANDROID PHONE ── */}
        <div className="flex-shrink-0 w-[130px] md:w-[155px]">
          <div className="font-mono text-[8px] tracking-widest text-zinc-500 uppercase text-center mb-2">ANDROID</div>
          <div className="border-[3px] border-zinc-700 rounded-[18px] overflow-hidden bg-zinc-950 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            {/* Status bar */}
            <div className="bg-zinc-900 px-3 py-1.5 flex justify-between items-center border-b border-zinc-800">
              <span className="font-mono text-[8px] text-zinc-400">9:41</span>
              <div className="flex gap-1 items-center">
                <div className="w-3 h-1.5 border border-zinc-500 rounded-sm relative">
                  <div className="absolute inset-0.5 bg-green-500 rounded-sm w-2/3" />
                </div>
              </div>
            </div>
            {/* App bar */}
            <div className="bg-zinc-900 px-3 py-2 border-b border-zinc-800">
              <div className="font-mono text-[8px] text-secondary font-bold tracking-widest">SYNCCLIP</div>
            </div>
            {/* Content area */}
            <div className="p-3 min-h-[90px] relative bg-zinc-950">
              {isTyping || isSyncing || isSynced ? (
                <div className="font-mono text-[10px] text-white leading-relaxed break-all">
                  {typedText}
                  {(isTyping) && (
                    <span className="inline-block w-0.5 h-3 bg-secondary ml-0.5 animate-pulse" />
                  )}
                </div>
              ) : (
                <div className="font-mono text-[9px] text-zinc-700 italic">Waiting...</div>
              )}

              {/* Green "pulsing" active dot */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${isTyping || isSyncing || isSynced ? 'bg-green-500' : 'bg-zinc-700'}`} />
              </div>
            </div>
            {/* Home bar */}
            <div className="bg-zinc-900 py-2 flex justify-center border-t border-zinc-800">
              <div className="w-8 h-0.5 bg-zinc-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* ── SYNC BEAM ── */}
        <div className="flex-1 flex flex-col items-center gap-2 min-w-0">
          {/* Latency label */}
          <div className={`font-mono text-[9px] tracking-widest transition-colors duration-200 ${isSynced ? 'text-secondary' : 'text-zinc-600'}`}>
            {isSynced ? '~100ms ✓' : isSyncing ? 'SYNCING...' : ''}
          </div>

          {/* The beam track */}
          <div className="w-full relative h-4 flex items-center">
            {/* Track line */}
            <div className="absolute inset-x-0 h-px bg-zinc-800" />

            {/* Moving beam */}
            {isSyncing && (
              <div
                className="absolute h-0.5 bg-secondary shadow-[0_0_8px_rgba(5,125,188,0.8)] transition-none rounded-full"
                style={{ width: `${syncProgress}%`, left: 0 }}
              />
            )}

            {/* Completed beam */}
            {isSynced && (
              <div className="absolute inset-x-0 h-0.5 bg-secondary shadow-[0_0_8px_rgba(5,125,188,0.6)] rounded-full" />
            )}

            {/* Pulse dots */}
            {isSyncing && (
              <>
                <div
                  className="absolute w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_rgba(5,125,188,1)] -translate-y-px"
                  style={{ left: `calc(${syncProgress}% - 4px)` }}
                />
              </>
            )}

            {isSynced && (
              <div className="absolute right-0 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_rgba(5,125,188,1)]" />
            )}
          </div>

          {/* WebSocket label */}
          <div className="font-mono text-[8px] text-zinc-700 uppercase tracking-widest">WebSocket</div>
        </div>

        {/* ── WINDOWS PC ── */}
        <div className="flex-shrink-0 w-[150px] md:w-[180px]">
          <div className="font-mono text-[8px] tracking-widest text-zinc-500 uppercase text-center mb-2">WINDOWS PC</div>
          {/* Laptop frame */}
          <div className="border-[3px] border-zinc-600 rounded-t-[6px] rounded-b-none bg-zinc-900 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            {/* Screen bezel */}
            <div className="bg-zinc-900 p-2 pb-0">
              {/* Screen */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden">
                {/* Browser chrome bar */}
                <div className="bg-zinc-800 px-2 py-1.5 flex items-center gap-1.5 border-b border-zinc-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  <div className="flex-1 bg-zinc-900 rounded-sm px-2 py-0.5 ml-1">
                    <span className="font-mono text-[7px] text-zinc-500">syncclip.in/XKFQ92</span>
                  </div>
                </div>
                {/* Clipboard content */}
                <div className="p-3 min-h-[70px] relative">
                  {isSynced ? (
                    <div className="font-mono text-[9px] text-white leading-relaxed break-all animate-in fade-in duration-300">
                      {pcText}
                    </div>
                  ) : (
                    <div className="font-mono text-[8px] text-zinc-700 italic">Waiting for sync...</div>
                  )}

                  {/* Synced indicator */}
                  {isSynced && (
                    <div className="absolute bottom-2 right-2">
                      <div className="font-mono text-[7px] text-secondary font-bold">SYNCED ✓</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Taskbar */}
            <div className="bg-zinc-800 px-2 py-1.5 flex items-center gap-2 border-t border-zinc-700">
              <div className="w-3 h-3 bg-blue-500 rounded-sm flex-shrink-0" />
              <div className="flex-1 h-1 bg-zinc-700 rounded" />
              <div className="font-mono text-[7px] text-zinc-500">9:41</div>
            </div>
          </div>
          {/* Laptop base */}
          <div className="h-1 bg-zinc-600 rounded-b" />
          <div className="h-px bg-zinc-700 mx-2 rounded" />
        </div>

      </div>

      {/* Bottom stats bar */}
      <div className="mt-6 pt-4 border-t border-zinc-800 grid grid-cols-3 gap-4 text-center">
        {[
          { label: 'SYNC SPEED', value: '<100ms' },
          { label: 'NETWORK REQ', value: 'Any WiFi' },
          { label: 'SETUP TIME', value: '0 sec' },
        ].map((s) => (
          <div key={s.label}>
            <div className="font-headline text-base md:text-xl font-black text-white">{s.value}</div>
            <div className="font-mono text-[8px] tracking-widest text-zinc-500 uppercase mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
