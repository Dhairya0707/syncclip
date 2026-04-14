"use client";

import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const createSession = useMutation(api.sessions.createSession);
  const router = useRouter();
  const [initializing, setInitializing] = useState(false);
  const [recentSessions, setRecentSessions] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("syncclip_recent_sessions");
    if (saved) {
      setRecentSessions(JSON.parse(saved).slice(0, 5)); // Show last 5
    }
  }, []);

  async function handleCreateSession() {
    setInitializing(true);
    try {
      const code = await createSession();
      // Update local storage
      const saved = localStorage.getItem("syncclip_recent_sessions");
      const current = saved ? JSON.parse(saved) : [];
      const updated = [code, ...current.filter((c: string) => c !== code)].slice(0, 10);
      localStorage.setItem("syncclip_recent_sessions", JSON.stringify(updated));
      
      router.push(`/${code}`);
    } catch (err) {
      console.error("Failed to create session:", err);
      setInitializing(false);
    }
  }

  return (
    <div className="bg-surface font-body min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter font-headline leading-none text-primary mb-2">
            SYNCCLIP
          </h1>
          <div className="font-mono text-[10px] tracking-[0.4em] text-on-surface-variant uppercase">
            Digital Broadsheet Protocol V4.2
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 border-t-2 border-black pt-12">
          {/* New Session Section */}
          <div className="flex flex-col">
            <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-secondary mb-6">PROTOCOL_INIT</div>
            <h2 className="font-headline text-3xl italic mb-6">Initialize New Node Cluster</h2>
            <button 
              onClick={handleCreateSession}
              disabled={initializing}
              className="bg-black text-white font-label font-bold py-6 px-4 border-2 border-black hover:bg-secondary hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] disabled:bg-zinc-800 disabled:shadow-none"
            >
              {initializing ? "GENERATING_CODE..." : "CREATE RE-SYNC NODE"}
            </button>
          </div>

          {/* Recent Sessions section */}
          <div className="flex flex-col border-l-0 md:border-l-2 border-black md:pl-12">
            <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-6">RECENT_NODES</div>
            <div className="space-y-4">
              {recentSessions.length > 0 ? (
                recentSessions.map((code) => (
                  <button
                    key={code}
                    onClick={() => router.push(`/${code}`)}
                    className="w-full flex justify-between items-center group border border-zinc-200 p-4 hover:border-black hover:bg-black transition-all"
                  >
                    <span className="font-mono text-sm tracking-widest uppercase group-hover:text-white group-hover:font-bold">NODE_{code}</span>
                    <span className="material-symbols-outlined text-zinc-300 group-hover:text-secondary group-hover:rotate-45 transition-all">north_east</span>
                  </button>
                ))
              ) : (
                <div className="text-zinc-400 italic font-body text-sm border border-dashed border-zinc-200 p-8 text-center">
                  No previous sessions detected in local buffer.
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <div className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
            © 2024 SYNCCLIP PUBLISHING GROUP // SECURE DISTRIBUTED CLIPBOARD
          </div>
        </div>
      </div>
    </div>
  );
}
