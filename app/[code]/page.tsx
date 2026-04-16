"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ClipboardEditor from "../../components/ClipboardEditor";
import { useEffect } from "react";

export default function SessionPage() {
  const params = useParams();
  const code = params.code as string;
  const router = useRouter();

  const session = useQuery(api.sessions.getSession, { code });

  // Cleanup local storage if session is dead
  useEffect(() => {
    if (session === null) {
      const saved = localStorage.getItem("syncclip_recent_sessions");
      if (saved) {
        const current = JSON.parse(saved);
        const updated = current.filter((c: string) => c !== code);
        localStorage.setItem("syncclip_recent_sessions", JSON.stringify(updated));
      }
    }
  }, [session, code]);

  if (session === undefined) {
    return (
      <div className="bg-surface font-body min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-headline leading-none text-primary mb-4 animate-pulse">
            SYNCCLIP
          </h1>
          <div className="font-mono text-xs tracking-[0.2em] text-on-surface-variant">
            CONNECTING TO NODE {code}...
          </div>
        </div>
      </div>
    );
  }

  if (session === null) {
    return (
      <div className="bg-surface font-body min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full border-2 border-black p-12">
          <div className="font-mono text-[10px] font-bold tracking-[0.3em] text-secondary mb-4 uppercase">PROTOCOL_ERROR</div>
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-6">
            OFFLINE
          </h1>
          <p className="font-body text-zinc-600 mb-10 leading-relaxed font-bold italic">
            Node {code} is currently unresponsive. This identifier may be invalid, or the protocol has expired from the cloud buffer (24h Limit).
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-black text-white font-label font-bold py-6 px-4 border-2 border-black hover:bg-secondary hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
          >
            RETURN TO ROOT
          </button>
        </div>
      </div>
    );
  }

  return <ClipboardEditor session={session} />;
}
