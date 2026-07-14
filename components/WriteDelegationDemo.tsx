"use client";

import { useState } from "react";

export default function WriteDelegationDemo() {
  const [isLocked, setIsLocked] = useState(true);
  const [isDelegated, setIsDelegated] = useState(false);
  const [text, setText] = useState("Hello from the shared clipboard!");

  // Guest write capability check
  const guestCanEdit = !isLocked || isDelegated;

  return (
    <div className="my-16 border-4 border-black p-6 md:p-8 bg-zinc-50 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-6 text-center">
        LIVE INTERACTIVE SIMULATION // PASS THE PEN
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* OWNER NODE PANEL */}
        <div className="border-2 border-black p-5 bg-white flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
              <span className="font-mono text-xs font-bold text-black uppercase">NODE_A (OWNER)</span>
              <span className="inline-block px-1.5 py-0.5 border border-black bg-black text-white text-[8px] font-mono">OWNER</span>
            </div>

            <div className="space-y-4">
              {/* LOCK CONTROL */}
              <div className="flex justify-between items-center">
                <span className="font-label font-bold text-xs uppercase tracking-wider">Session Lock:</span>
                <button
                  onClick={() => {
                    setIsLocked(!isLocked);
                    if (!isLocked) {
                      // auto revoke on lock off to keep simulation clean
                      setIsDelegated(false);
                    }
                  }}
                  className={`px-3 py-1 border-2 border-black font-mono text-[10px] font-bold uppercase transition-colors ${
                    isLocked ? "bg-black text-white" : "bg-white text-black hover:bg-zinc-100"
                  }`}
                >
                  {isLocked ? "LOCKED 🔒" : "UNLOCKED 🔓"}
                </button>
              </div>

              {/* SIMULATED SIDEBAR / ACTIVE NODES */}
              <div className="border border-dashed border-zinc-300 p-3 bg-zinc-50">
                <div className="font-mono text-[9px] text-zinc-400 uppercase mb-2">Connected Nodes:</div>
                <div className="flex flex-col gap-2">
                  {/* Self */}
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-zinc-500">NODE_A (YOU)</span>
                    <span className="text-zinc-300">OWNER</span>
                  </div>
                  {/* Guest Node */}
                  <div className="flex flex-col gap-1.5 text-[11px] font-mono border-t border-zinc-200 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-zinc-700">NODE_B (GUEST)</span>
                      <span className="text-secondary text-[8px] uppercase animate-pulse">active</span>
                    </div>

                    {isLocked ? (
                      <div className="flex justify-between items-center mt-1 bg-white p-1.5 border border-zinc-200">
                        <span className="text-[9px] text-zinc-500">DELEGATE WRITE:</span>
                        <button
                          onClick={() => setIsDelegated(!isDelegated)}
                          className={`px-2 py-0.5 border text-[9px] font-bold font-mono transition-all ${
                            isDelegated
                              ? "bg-black text-white border-black"
                              : "bg-white text-zinc-600 border-zinc-300 hover:border-black hover:text-black"
                          }`}
                        >
                          {isDelegated ? "ON" : "OFF"}
                        </button>
                      </div>
                    ) : (
                      <div className="text-[9px] text-zinc-400 uppercase italic mt-1">
                        Room Unlocked (Write open to all)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-mono text-[9px] text-zinc-400 uppercase mb-1">Owner Text Input:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-20 p-2 font-mono text-xs border border-black resize-none focus:outline-none focus:border-secondary"
            />
          </div>
        </div>

        {/* GUEST NODE PANEL */}
        <div className="border-2 border-black p-5 bg-white flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
              <span className="font-mono text-xs font-bold text-black uppercase">NODE_B (GUEST)</span>
              <div className="flex items-center gap-1.5">
                {isLocked ? (
                  isDelegated ? (
                    <span className="px-1.5 py-0.5 border border-secondary text-secondary text-[8px] font-mono font-bold">
                      AUTHORIZED WRITER
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 border border-zinc-400 text-zinc-500 text-[8px] font-mono">
                      READ ONLY
                    </span>
                  )
                ) : (
                  <span className="px-1.5 py-0.5 border border-black text-black text-[8px] font-mono">
                    OPEN WRITE
                  </span>
                )}
              </div>
            </div>

            <div className="font-body text-xs text-zinc-600 leading-relaxed mb-4">
              {isLocked ? (
                isDelegated ? (
                  <p className="text-secondary font-mono text-[10px] uppercase font-bold">
                    ✓ Owner has passed you the pen. You can write.
                  </p>
                ) : (
                  <p className="text-zinc-400 font-mono text-[10px] uppercase">
                    🔒 Locked by Owner. Read-only access active.
                  </p>
                )
              ) : (
                <p className="text-zinc-500 font-mono text-[10px] uppercase">
                  🔓 Session is unlocked. Anyone can write.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-mono text-[9px] text-zinc-400 uppercase mb-1">Guest Text Input:</label>
            <textarea
              value={text}
              disabled={!guestCanEdit}
              onChange={(e) => setText(e.target.value)}
              className={`w-full h-20 p-2 font-mono text-xs border ${
                guestCanEdit
                  ? "border-black focus:outline-none focus:border-secondary"
                  : "border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed"
              } resize-none`}
              placeholder={guestCanEdit ? "Type here to sync..." : "Locked. Awaiting writer permission..."}
            />
            <div className="mt-2 text-[9px] font-mono text-zinc-400 uppercase text-right">
              {guestCanEdit ? "STREAM EDITABLE" : "STREAM LOCKED"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
