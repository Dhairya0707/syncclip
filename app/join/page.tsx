"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { track } from "../../utils/analytics";

export default function JoinPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect when 6 characters are entered
    if (code.length === 6) {
      track("session_joined", {
        method: "auto",
        platform: typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : "desktop") : "unknown",
      });
      router.push(`/${code.toUpperCase()}`);
    }
  }, [code, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      track("session_joined", {
        method: "submit",
        platform: typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : "desktop") : "unknown",
      });
      router.push(`/${code.toUpperCase()}`);
    }
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      {/* NAV */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">ABOUT</Link>
          <Link href="/support" className="text-zinc-400 hover:text-white transition-colors">SUPPORT</Link>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pt-10">
        <div className="max-w-xl w-full">
          <div className="text-center mb-12">
            <div className="font-mono text-[10px] font-bold tracking-[0.4em] text-secondary mb-4 uppercase flex justify-center items-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary animate-pulse"></span>
              Enter Protocol Code
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-6">
              JOIN NODE
            </h1>
            <p className="font-body text-zinc-600 italic leading-relaxed max-w-sm mx-auto">
              Enter the 6-character session code to instantly synchronize with the remote clipboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="XXXXXX"
                autoFocus
                className="w-full bg-white border-2 border-black p-8 md:p-12 text-center font-mono text-5xl md:text-7xl font-black tracking-[0.2em] focus:outline-none focus:border-secondary focus:ring-0 transition-all uppercase placeholder:text-zinc-100 placeholder:tracking-widest"
              />
              <div className="absolute inset-0 border-2 border-black translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={code.length !== 6}
                className="flex-1 bg-zinc-900 text-white font-label font-bold py-6 px-4 border-2 border-black hover:bg-secondary hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] disabled:bg-zinc-800 disabled:shadow-none disabled:cursor-not-allowed"
              >
                Connect to Node
              </button>
              <Link
                href="/"
                className="flex-1 bg-white text-black font-label font-bold py-6 px-4 border-2 border-black hover:bg-zinc-100 transition-all uppercase tracking-widest text-center text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
              >
                Back to Root
              </Link>
            </div>
          </form>

          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="border border-zinc-200 p-4 font-mono text-[9px] tracking-widest uppercase text-zinc-400 bg-white/50">
              <span className="block text-secondary font-bold mb-1">Format</span>
              6-Digit Alphanumeric Code
            </div>
            <div className="border border-zinc-200 p-4 font-mono text-[9px] tracking-widest uppercase text-zinc-400 bg-white/50">
              <span className="block text-secondary font-bold mb-1">Duration</span>
              Ephemeral (Purged in 24h)
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-on-surface-variant uppercase">
            © {new Date().getFullYear()} SYNCCLIP // DISTRIBUTED CLIPBOARD PROTOCOL
          </div>
          <div className="font-mono text-[9px] tracking-widest text-secondary uppercase font-bold">
            V4.2.0-STABLE
          </div>
        </div>
      </footer>
    </div>
  );
}
