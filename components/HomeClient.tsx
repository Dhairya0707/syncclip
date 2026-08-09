"use client"

import { useEffect, useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter } from "next/navigation";
import { track } from "../utils/analytics";
import { useExperiment } from "../utils/experiments";
import CampaignBanner from "./CampaignBanner";
import { getRandomCopyBlock } from "../utils/headlines";
import { sendError } from "../utils/discord";
import Link from "next/link";
import Image from "next/image";
import { track as vaTrack } from "@vercel/analytics";

interface HomeClientProps {
  defaultTypewriter?: string;
  defaultH1?: React.ReactNode;
  defaultSubH1?: string;
  isAndroidToPC?: boolean;
  isMacToWindows?: boolean;
  isPastebin?: boolean;
}

export default function HomeClient({
  defaultTypewriter = "Paste your text here to test real-time sync across all your devices instantly...",
  defaultH1,
  defaultSubH1 = "SYNC INSTANTLY.",
  isAndroidToPC = false,
  isMacToWindows = false,
  isPastebin = false,
}: HomeClientProps) {
  const router = useRouter();
  const createSession = useMutation(api.sessions.createSession);
  const [initializing, setInitializing] = useState(false);
  const [recentSessions, setRecentSessions] = useState<string[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [demoText, setDemoText] = useState("");
  const hasInteractedRef = useRef(false);

  // Typewriter effect simulation for interactive landing page sandbox
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (hasInteractedRef.current) {
        clearInterval(interval);
        return;
      }
      setDemoText(defaultTypewriter.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= defaultTypewriter.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [defaultTypewriter]);

  const handleDemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!hasInteractedRef.current) {
      track("sandbox_typed", { timestamp: new Date().toISOString() });
    }
    hasInteractedRef.current = true;
    setDemoText(e.target.value);
  };

  const handleResetDemo = () => {
    track("sandbox_cleared", { timestamp: new Date().toISOString() });
    hasInteractedRef.current = true;
    setDemoText("");
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("syncclip_recent_sessions");
      if (saved) {
        setRecentSessions(JSON.parse(saved).slice(0, 5));
      }
    } catch (e) {
      // Fail-safe if localStorage is disabled or corrupt
    }
  }, []);

  async function handleCreateSession(
    textOverride?: string | React.MouseEvent,
    sourceOverride?: string
  ) {
    setInitializing(true);
    try {
      let nodeId = localStorage.getItem("syncclip_node_id");
      if (!nodeId) {
        nodeId = `NODE-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        localStorage.setItem("syncclip_node_id", nodeId);
      }

      const initialCopy = (typeof textOverride === "string" && hasInteractedRef.current)
        ? textOverride 
        : getRandomCopyBlock().hook;

      const code = await createSession({ 
        ownerNodeId: nodeId,
        initialText: initialCopy
      });
      
      const source = sourceOverride || (typeof textOverride === "string" && hasInteractedRef.current ? "sandbox" : "hero_cta");
      
      track("room_created", {
        timestamp: new Date().toISOString(),
        platform: typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : "desktop") : "unknown",
        source,
        context: isAndroidToPC ? "android_to_pc" : isMacToWindows ? "mac_to_windows" : isPastebin ? "pastebin" : "home",
      });
      vaTrack("room_created", {
        platform: typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : "desktop") : "unknown",
        source,
        context: isAndroidToPC ? "android_to_pc" : isMacToWindows ? "mac_to_windows" : isPastebin ? "pastebin" : "home",
      });

      const saved = localStorage.getItem("syncclip_recent_sessions");
      const current = saved ? JSON.parse(saved) : [];
      const updated = [code, ...current.filter((c: string) => c !== code)].slice(0, 10);
      localStorage.setItem("syncclip_recent_sessions", JSON.stringify(updated));

      router.push(`/${code}`);
    } catch (err) {
      console.error("Failed to create session:", err);
      sendError("Session creation failed", err instanceof Error ? err.message : String(err));
      setInitializing(false);
    }
  }

  const campaignBannerEnabled = useExperiment('FEATURE_CAMPAIGN_ENABLED');

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      {/* FIXED TOP NAV & BANNER WRAPPER */}
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-200">
        <CampaignBanner />
        <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased h-10 flex justify-between items-center px-4 sm:px-6" role="banner">
          <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
          <nav className="flex gap-4 sm:gap-6 items-center">
            <Link href="/join" className="text-secondary hover:text-white transition-colors font-bold">JOIN</Link>
            <a href="#features" className="text-zinc-400 hover:text-white transition-colors hidden sm:block">FEATURES</a>
            <Link href="/support" className="text-zinc-400 hover:text-white transition-colors">SUPPORT</Link>
            <button
              onClick={handleCreateSession}
              disabled={initializing}
              className="bg-secondary text-white px-3 sm:px-4 py-1 font-bold hover:bg-white hover:text-black transition-all text-[10px] tracking-widest cursor-pointer"
            >
              {initializing ? "..." : "LAUNCH"}
            </button>
          </nav>
        </header>
      </div>

      <main className={`${campaignBannerEnabled ? 'pt-20 sm:pt-18' : 'pt-10'} flex-grow transition-all duration-200`}>

        {/* ════════════════════════════════════════════
            AEO ANSWER BOX — AI Grounding
        ════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <div className="bg-zinc-900 text-white p-6 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-2">Quick Answer // AEO Node</div>
            <p className="font-body text-lg md:text-xl leading-relaxed font-bold italic text-zinc-300">
              {isAndroidToPC && "To copy and paste text from Android to PC instantly, use SyncClip. It works entirely in your browser using real-time WebSockets to sync copy/paste history. Used in 57 countries."}
              {isMacToWindows && "To copy text from Mac to Windows without emails or apps, use SyncClip. It pairs macOS and Windows via browser-native WebSocket sync instantly. Used in 57 countries."}
              {isPastebin && "SyncClip is a private Pastebin alternative designed for ephemeral text and code sharing. Toggle 'Burn After Reading' to destroy text automatically. Used in 57 countries."}
              {!isAndroidToPC && !isMacToWindows && !isPastebin && "SyncClip is a free, browser-based online clipboard that syncs text between your devices in real-time. No app to download, no account to create — just open the URL on any device and anything you copy appears everywhere instantly. Used in 57 countries."}
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            HERO — Benefit-Focused, Product-in-Context
        ════════════════════════════════════════════ */}
        <section className="border-b-2 border-black min-h-[calc(100vh-40px)] flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-0 w-full">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">

              {/* Left: Copy — 3 columns */}
              <div className="lg:col-span-3">
                <div className="font-mono text-[10px] tracking-[0.4em] text-secondary uppercase mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-secondary animate-pulse block"></span>
                  Live · Used in 57 Countries · No Signup
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter font-headline leading-[1.1] text-primary mb-6">
                  {defaultH1 || (
                    <>
                      FREE_
                      <br />
                      ONLINE_
                      <br />
                      CLIPBOARD_
                    </>
                  )}
                  <br />
                  <span className="text-secondary block mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl">{defaultSubH1}</span>
                </h1>

                <p className="font-body text-lg md:text-xl text-zinc-600 max-w-lg leading-relaxed mb-10">
                  {isAndroidToPC && "Copy text or links on Android → paste on Windows PC in milliseconds. No signup, no background apps, no logs. Perfect cross-OS bridge."}
                  {isMacToWindows && "Copy code on Mac → paste on Windows PC instantly. Fully cross-OS browser native synchronization. No installation, no login barrier."}
                  {isPastebin && "Share text and code snippets privately without leaving a digital footprint. Secure WebSockets, auto-purging, and zero storage."}
                  {!isAndroidToPC && !isMacToWindows && !isPastebin && "Copy text on your phone → paste on PC in milliseconds. No signup, no installation, no logs. Works on Android, iOS, Windows, Mac, Linux."}
                </p>

                <div className="relative mb-8">
                  {/* Primary Desktop Action (Side-by-side) */}
                  <div className="hidden sm:flex flex-row gap-4">
                    <button
                      onClick={handleCreateSession}
                      disabled={initializing}
                      className="bg-zinc-900 text-white font-label font-bold py-5 px-10 border-2 border-black hover:bg-secondary hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] disabled:bg-zinc-800 disabled:shadow-none inline-flex items-center justify-center gap-3"
                    >
                      <span className="material-symbols-outlined text-[18px]">bolt</span>
                      {initializing ? "GENERATING..." : "START SYNCING — FREE"}
                    </button>
                    <Link
                      href="/join"
                      className="bg-white text-black font-label font-bold py-5 px-10 border-2 border-black hover:bg-zinc-100 transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] inline-flex items-center justify-center gap-3"
                    >
                      <span className="material-symbols-outlined text-[18px]">key</span>
                      JOIN NODE
                    </Link>
                  </div>

                  {/* Unified Mobile Actions (Direct Access) */}
                  <div className="sm:hidden flex flex-col gap-4 w-full">
                    <button
                      onClick={handleCreateSession}
                      disabled={initializing}
                      className="w-full bg-zinc-900 text-white font-label font-bold py-6 px-10 border-2 border-black flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <span className="material-symbols-outlined text-[18px]">bolt</span>
                      {initializing ? "GENERATING..." : "START SYNCING"}
                    </button>
                    <Link
                      href="/join"
                      className="w-full bg-white text-black font-label font-bold py-5 px-10 border-2 border-black flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <span className="material-symbols-outlined text-[18px]">key</span>
                      JOIN NODE
                    </Link>
                  </div>
                </div>

                {/* Trust line */}
                <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] tracking-widest uppercase text-zinc-400">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-secondary">public</span> Used in 57 countries</span>
                  <span className="text-zinc-200">|</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-secondary">bar_chart</span> 124,821+ clipboards synchronized</span>
                  <span className="text-zinc-200">|</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-secondary">encrypted</span> Secured</span>
                  <span className="text-zinc-200">|</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-secondary">timer</span> Sessions expire in 24h</span>
                  <span className="text-zinc-200">|</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-secondary">devices</span> Unlimited devices</span>
                </div>
              </div>

              {/* Right: Recent Sessions Panel — 2 columns */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Interactive Sandbox Card */}
                <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="bg-black text-white px-5 py-3 font-mono text-[10px] tracking-widest uppercase flex justify-between items-center">
                    <span>INTERACTIVE DEMO // SANDBOX</span>
                    <span className="flex items-center gap-2 text-secondary font-bold">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
                      SECURE BRIDGE ACTIVE
                    </span>
                  </div>
                  
                  <div className="p-5 flex flex-col gap-4">
                    {/* Simulated Devices Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Left: Input (Simulated Phone) */}
                      <div className="border border-zinc-200 p-3 bg-zinc-50 flex flex-col gap-2">
                        <div className="flex justify-between items-center font-mono text-[8px] tracking-widest uppercase text-zinc-400 font-bold">
                          <span>📱 MOBILE_NODE</span>
                          <span className="text-secondary">EDITABLE</span>
                        </div>
                        <textarea
                          value={demoText}
                          onChange={handleDemoChange}
                          placeholder="Type something here to sync..."
                          className="w-full h-24 border border-zinc-200 bg-white p-2 font-mono text-xs focus:outline-none focus:border-secondary resize-none"
                        />
                      </div>

                      {/* Right: Output (Simulated Laptop) */}
                      <div className="border border-zinc-200 p-3 bg-zinc-950 text-zinc-100 flex flex-col gap-2 relative overflow-hidden">
                        <div className="flex justify-between items-center font-mono text-[8px] tracking-widest uppercase text-zinc-500 font-bold">
                          <span>💻 DESKTOP_NODE</span>
                          <span className="text-secondary animate-pulse">RECEIVING...</span>
                        </div>
                        <div className="w-full h-24 p-2 font-mono text-[11px] overflow-y-auto whitespace-pre-wrap break-all relative">
                          {demoText || <span className="text-zinc-600 italic">Waiting for input...</span>}
                          <span className="inline-block w-1.5 h-3.5 bg-secondary ml-1 animate-pulse"></span>
                        </div>
                      </div>
                    </div>

                    {/* Shared telemetry bar */}
                    <div className="flex flex-wrap justify-between items-center mt-1 pt-3 border-t border-zinc-100">
                      <div className="flex gap-4 font-mono text-[8px] tracking-widest uppercase text-zinc-400 font-bold">
                        <span>LATENCY: <span className="text-secondary">42ms</span></span>
                        <span>WEIGHT: <span className="text-black">{(new Blob([demoText]).size / 1024).toFixed(3)} KB</span></span>
                        <span>STATUS: <span className="text-emerald-600">SYNCED</span></span>
                      </div>
                      
                      <div className="flex gap-4 items-center">
                        {demoText && hasInteractedRef.current && (
                          <button
                            onClick={() => handleCreateSession(demoText)}
                            className="bg-secondary text-white font-mono text-[9px] font-black py-1 px-3 hover:bg-black transition-colors uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                          >
                            [Sync This Text ⚡]
                          </button>
                        )}
                        {demoText && (
                          <button
                            onClick={handleResetDemo}
                            className="font-mono text-[8px] tracking-widest uppercase text-red-600 hover:text-black font-black transition-colors"
                          >
                            [CLEAR]
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Sessions */}
                <div>
                  <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">history</span>
                    YOUR RECENT SESSIONS
                  </div>
                  <div className="space-y-2">
                    {recentSessions.length > 0 ? (
                      recentSessions.map((code) => (
                        <button
                          key={code}
                          onClick={() => router.push(`/${code}`)}
                          className="w-full flex justify-between items-center group border border-zinc-200 p-4 hover:border-black hover:bg-black transition-all bg-white"
                        >
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[16px] text-zinc-400 group-hover:text-secondary transition-colors">cloud_done</span>
                            <span className="font-mono text-xs tracking-widest uppercase group-hover:text-white group-hover:font-bold transition-colors">NODE_{code}</span>
                          </div>
                          <span className="material-symbols-outlined text-[16px] text-zinc-300 group-hover:text-secondary group-hover:rotate-45 transition-all">north_east</span>
                        </button>
                      ))
                    ) : (
                      <div className="text-zinc-400 italic font-body text-sm border border-dashed border-zinc-200 p-6 text-center bg-white flex flex-col items-center gap-3">
                        <span className="material-symbols-outlined text-3xl text-zinc-200">cloud_off</span>
                        No sessions in your local buffer yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            TICKER RIBBON
        ════════════════════════════════════════════ */}
        <section className="bg-black text-white py-5 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-12 font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-400">
            <span>REAL-TIME SYNC</span><span className="text-secondary">◆</span>
            <span>NO ACCOUNTS</span><span className="text-secondary">◆</span>
            <span>MULTI-DEVICE</span><span className="text-secondary">◆</span>
            <span>BURN AFTER READING</span><span className="text-secondary">◆</span>
            <span>COMMAND PALETTE</span><span className="text-secondary">◆</span>
            <span>QR PAIRING</span><span className="text-secondary">◆</span>
            <span>SESSION LOCKING</span><span className="text-secondary">◆</span>
            <span>ZERO INSTALL</span><span className="text-secondary">◆</span>
            <span>REAL-TIME SYNC</span><span className="text-secondary">◆</span>
            <span>NO ACCOUNTS</span><span className="text-secondary">◆</span>
            <span>MULTI-DEVICE</span><span className="text-secondary">◆</span>
            <span>BURN AFTER READING</span><span className="text-secondary">◆</span>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            HOW IT WORKS — 3 Steps
        ════════════════════════════════════════════ */}
        <section className="border-b-2 border-black">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
              <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">HOW_IT_WORKS</div>
              <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">Three Steps. Done.</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-0 border-2 border-black">
              <div className="p-8 md:p-10 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col">
                <div className="mb-6 border-2 border-black grayscale hover:grayscale-0 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
                  <Image
                    src="/step-1-create.png"
                    alt="Step 1: Create a clipboard session on SyncClip"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4 mt-auto">
                  <span className="bg-black text-white font-mono font-black text-lg w-10 h-10 flex items-center justify-center">01</span>
                  <h3 className="font-headline text-xl font-black uppercase">Create</h3>
                </div>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Hit the button. A unique session is generated instantly. No signup, no email, nothing.
                </p>
              </div>
              <div className="p-8 md:p-10 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col">
                <div className="mb-6 border-2 border-black grayscale hover:grayscale-0 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
                  <Image
                    src="/step-2-join.png"
                    alt="Step 2: Join a SyncClip session with a code or QR"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4 mt-auto">
                  <span className="bg-black text-white font-mono font-black text-lg w-10 h-10 flex items-center justify-center">02</span>
                  <h3 className="font-headline text-xl font-black uppercase">Share</h3>
                </div>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Send the link or scan the QR code from your other device. One URL syncs them all.
                </p>
              </div>
              <div className="p-8 md:p-10 flex flex-col">
                <div className="mb-6 border-2 border-black grayscale hover:grayscale-0 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
                  <Image
                    src="/step-3-sync.png"
                    alt="Step 3: Clipboard syncs in real-time across all devices"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4 mt-auto">
                  <span className="bg-secondary text-white font-mono font-black text-lg w-10 h-10 flex items-center justify-center">03</span>
                  <h3 className="font-headline text-xl font-black uppercase">Paste</h3>
                </div>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Type or paste on any connected device. It appears everywhere in milliseconds. Real-time magic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            KEY FEATURES — Only the power moves
        ════════════════════════════════════════════ */}
        <section id="features" className="border-b-2 border-black">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
              <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">CORE_FEATURES</div>
              <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">Why SYNCCLIP</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="border-2 border-black p-8 md:p-10 group hover:bg-black transition-all duration-300 -mr-[2px] -mb-[2px]">
                <span className="material-symbols-outlined text-4xl block mb-5 text-black group-hover:text-secondary transition-colors">cloud_sync</span>
                <h3 className="font-headline text-2xl uppercase font-black mb-3 group-hover:text-white transition-colors">Real-Time Sync</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  Every keystroke is pushed through a real-time engine. All connected devices update within milliseconds. No polling, no refresh, no lag.
                </p>
              </div>

              <div className="border-2 border-black p-8 md:p-10 group hover:bg-black transition-all duration-300 -mb-[2px]">
                <span className="material-symbols-outlined text-4xl block mb-5 text-black group-hover:text-secondary transition-colors">all_match</span>
                <h3 className="font-headline text-2xl uppercase font-black mb-3 group-hover:text-white transition-colors">Auto Clipboard Sync</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  Toggle <strong className="group-hover:text-white">Auto-Push</strong> and remote changes land directly in your OS clipboard. Toggle <strong className="group-hover:text-white">Auto-Read</strong> and local clipboard changes sync to the cloud when you return.
                </p>
              </div>

              <div className="border-2 border-black p-8 md:p-10 group hover:bg-black transition-all duration-300 -mr-[2px]">
                <span className="material-symbols-outlined text-4xl block mb-5 text-orange-500 group-hover:text-orange-400 transition-colors">local_fire_department</span>
                <h3 className="font-headline text-2xl uppercase font-black mb-3 group-hover:text-white transition-colors">Burn After Reading</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  Arm the protocol and your clipboard becomes volatile. When a second device opens it, the data self-destructs in 5 seconds — permanently wiped from the database.
                </p>
              </div>

              <div className="border-2 border-black p-8 md:p-10 group hover:bg-black transition-all duration-300">
                <span className="material-symbols-outlined text-4xl block mb-5 text-black group-hover:text-secondary transition-colors">shield_lock</span>
                <h3 className="font-headline text-2xl uppercase font-black mb-3 group-hover:text-white transition-colors">Lock &amp; Write Delegation</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  <strong className="group-hover:text-white">Lock</strong> your session to make other nodes read-only. Proactively <strong className="group-hover:text-white"> delegate write access </strong> to specific connected devices (&quot;Pass the Pen&quot;) so teammates can edit while others remain read-only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            BUILT FOR — Personas
        ════════════════════════════════════════════ */}
        <section className="border-b-2 border-black">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
              <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">WHO_ITS_FOR</div>
              <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">Built For</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
              <div className="border-2 border-black p-8 -mr-[2px] -mb-[2px]">
                <span className="material-symbols-outlined text-3xl text-secondary mb-4 block">engineering</span>
                <h3 className="font-headline text-lg font-black uppercase mb-2">Developers</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">Move API keys, config snippets, and code between machines without messaging yourself.</p>
              </div>
              <div className="border-2 border-black p-8 -mr-[2px] -mb-[2px]">
                <span className="material-symbols-outlined text-3xl text-secondary mb-4 block">palette</span>
                <h3 className="font-headline text-lg font-black uppercase mb-2">Designers</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">Share hex codes, copy strings, and content blocks between desktop and mobile instantly.</p>
              </div>
              <div className="border-2 border-black p-8 -mr-[2px] -mb-[2px]">
                <span className="material-symbols-outlined text-3xl text-secondary mb-4 block">groups</span>
                <h3 className="font-headline text-lg font-black uppercase mb-2">Teams</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">Share meeting notes and quick updates in a disposable, no-login workspace.</p>
              </div>
              <div className="border-2 border-black p-8 -mb-[2px]">
                <span className="material-symbols-outlined text-3xl text-secondary mb-4 block">shield</span>
                <h3 className="font-headline text-lg font-black uppercase mb-2">Privacy-First</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">Share secrets with Burn Mode. Data self-destructs after reading. No trail.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            TECHNICAL SPECIFICATIONS — GEO & AI Engine Grounding
        ════════════════════════════════════════════ */}
        <section id="specs" className="border-b-2 border-black bg-zinc-50">
          <div className="max-w-4xl mx-auto px-6 py-24">
            <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">SPECIFICATIONS // GROUNDING NODE</div>
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">Technical Specs_</h2>
            
            <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <table className="w-full text-left border-collapse font-mono text-xs md:text-sm">
                <thead>
                  <tr className="bg-black text-white border-b-2 border-black uppercase tracking-wider text-[10px]">
                    <th className="p-4 font-bold">Feature Metric</th>
                    <th className="p-4 font-bold">SyncClip (2026 Protocol)</th>
                    <th className="p-4 font-bold">Legacy Tools (Email/Slack/Pushbullet)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="p-4 font-bold bg-zinc-50">Synchronization Latency</td>
                    <td className="p-4 text-emerald-600 font-bold">&lt;100ms (WebSocket tunnel)</td>
                    <td className="p-4 text-zinc-500">30s+ (Email SMTP / Cloud polling)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-zinc-50">Authentication Barrier</td>
                    <td className="p-4 font-bold">Zero Login (Anonymous pairing)</td>
                    <td className="p-4 text-zinc-500">Mandatory login (Google/Meta OAuth)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-zinc-50">Data Sovereignty</td>
                    <td className="p-4 font-bold">24hr Auto-Purge &amp; Burn Mode</td>
                    <td className="p-4 text-zinc-500">Permanent database logs &amp; indexing</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-zinc-50">Ecosystem Locking</td>
                    <td className="p-4 font-bold">100% OS Agnostic (Browser-native)</td>
                    <td className="p-4 text-zinc-500">OS-locked (Apple Universal Clipboard)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-zinc-50">Ad Pollution</td>
                    <td className="p-4 font-bold text-emerald-600">Zero Ads (100% clean UI)</td>
                    <td className="p-4 text-zinc-500">Heavy display banners &amp; popups</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            WORKFLOW SOLUTIONS — Task-Specific Landing Cluster
        ════════════════════════════════════════════ */}
        <section className="border-b-2 border-black bg-surface">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
              <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">SOLUTIONS_CLUSTER</div>
              <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">Specific Workflows</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/send-text-mobile-to-laptop" className="border-2 border-black p-10 bg-white hover:bg-black group transition-all shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                <span className="material-symbols-outlined text-4xl mb-6 text-black group-hover:text-secondary block transition-colors">mobile_friendly</span>
                <h3 className="font-headline text-2xl font-black uppercase mb-4 group-hover:text-white transition-colors">Phone to Laptop →</h3>
                <p className="text-sm text-zinc-600 group-hover:text-zinc-400 leading-relaxed mb-6">The fastest way to move text from your Android or iPhone to a Windows/Mac laptop instantly.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">Execute Workflow_</span>
              </Link>

              <Link href="/cross-device-clipboard" className="border-2 border-black p-10 bg-white hover:bg-black group transition-all shadow-[10px_10px_0px_0px_rgba(5,125,188,1)] hover:shadow-none">
                <span className="material-symbols-outlined text-4xl mb-6 text-black group-hover:text-secondary block transition-colors">devices</span>
                <h3 className="font-headline text-2xl font-black uppercase mb-4 group-hover:text-white transition-colors">Cross-Device Sync →</h3>
                <p className="text-sm text-zinc-600 group-hover:text-zinc-400 leading-relaxed mb-6">A universal bridge for your clipboard data across every OS and browser in your stack.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">Connect Stack_</span>
              </Link>

              <Link href="/copy-text-from-phone-to-computer" className="border-2 border-black p-10 bg-white hover:bg-black group transition-all shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                <span className="material-symbols-outlined text-4xl mb-6 text-black group-hover:text-secondary block transition-colors">desktop_windows</span>
                <h3 className="font-headline text-2xl font-black uppercase mb-4 group-hover:text-white transition-colors">Phone to PC →</h3>
                <p className="text-sm text-zinc-600 group-hover:text-zinc-400 leading-relaxed mb-6">The absolute fastest method to copy and paste text from phone to PC instantly without apps.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">Bridge Devices_</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            RESOURCES — Internal SEO linking
        ════════════════════════════════════════════ */}
        <section className="border-b-2 border-black bg-white">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">RESOURCES_&_SEO_GUIDES</div>
                <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">Clipboard Sync Guides</h2>
              </div>
              <Link href="/clipboard-sync-guide" className="font-mono text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-secondary hover:border-secondary transition-all">View Full Guide →</Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/clipboard" className="border-2 border-black p-6 bg-black text-white hover:bg-secondary hover:text-black group transition-all">
                <h3 className="font-headline font-black uppercase text-lg mb-2 transition-colors">Online Clipboard</h3>
                <p className="text-xs text-zinc-300 group-hover:text-zinc-800 transition-colors mb-4">Free online clipboard — copy &amp; paste between phone, PC, and tablet instantly.</p>
                <span className="font-mono text-[10px] font-bold text-secondary group-hover:text-black uppercase tracking-widest">Open Free Tool _</span>
              </Link>
              <Link href="/blog/online-clipboard-vs-desktop-apps" className="border-2 border-black p-6 hover:bg-black group transition-all">
                <h3 className="font-headline font-black uppercase text-lg mb-2 group-hover:text-white transition-colors">Apps vs Web</h3>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors mb-4">Why browser-native sync is replacing installed apps.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">Read Audit _</span>
              </Link>
              <Link href="/pushbullet-alternative" className="border-2 border-black p-6 hover:bg-black group transition-all">
                <h3 className="font-headline font-black uppercase text-lg mb-2 group-hover:text-white transition-colors">Pushbullet Alt</h3>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors mb-4">Why SyncClip is the best free alternative in 2026.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">View Comparison _</span>
              </Link>
              <Link href="/pastebin-alternative" className="border-2 border-black p-6 hover:bg-black group transition-all">
                <h3 className="font-headline font-black uppercase text-lg mb-2 group-hover:text-white transition-colors">Pastebin Alt</h3>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors mb-4">Ephemeral code sharing without permanent trails.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">Secure Code _</span>
              </Link>
              <Link href="/fastest-way-to-copy-links-between-devices" className="border-2 border-black p-6 hover:bg-black group transition-all">
                <h3 className="font-headline font-black uppercase text-lg mb-2 group-hover:text-white transition-colors">Link Sync</h3>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors mb-4">Mastering sub-100ms URL transfers across devices.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">Fastest Way _</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            BLOG — Expert Productivity Insights
        ════════════════════════════════════════════ */}
        <section className="border-b-2 border-black bg-zinc-50">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">LATEST_FROM_THE_BLOG</div>
                <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">Productivity Hub</h2>
              </div>
              <Link href="/blog" className="font-mono text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-secondary hover:border-secondary transition-all">View All Articles →</Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/blog/clipboard-sync-indian-developers" className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(5,125,188,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <div className="font-mono text-[9px] text-zinc-400 mb-4 uppercase">Regional // Developer Audit</div>
                <h3 className="font-headline font-black uppercase text-xl mb-4">Clipboard Sync for Indian Developers</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">Bridging the Android-Mac gap for developers in Bangalore, Pune, and Hyderabad. Sub-50ms regional latency.</p>
                <span className="text-secondary font-mono text-[10px] font-bold uppercase tracking-widest border-b border-secondary">Read Regional Guide _</span>
              </Link>
              <Link href="/blog/5-ways-to-copy-text-between-phone-and-laptop" className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <div className="font-mono text-[9px] text-zinc-400 mb-4 uppercase">Workflow // Analysis</div>
                <h3 className="font-headline font-black uppercase text-xl mb-4">5 Ways to Copy Text Between Phone & Laptop</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">Stop emailing yourself snippets. Here are the 5 fastest ways to move data in 2026 without app bloat.</p>
                <span className="text-secondary font-mono text-[10px] font-bold uppercase tracking-widest border-b border-secondary">Read Workflow _</span>
              </Link>
              <Link href="/clipboard-sync-guide" className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(5,125,188,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <div className="font-mono text-[9px] text-zinc-400 mb-4 uppercase">Direct Guide // Step-by-Step</div>
                <h3 className="font-headline font-black uppercase text-xl mb-4">How to Sync Clipboard Between Devices</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">Forget emailing yourself links. Learn the step-by-step guide to real-time copy and paste across Android, Windows, Mac, and iPhone.</p>
                <span className="text-secondary font-mono text-[10px] font-bold uppercase tracking-widest border-b border-secondary">Read Setup Guide _</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            FAQ — GEO & AI Search Optimization
        ════════════════════════════════════════════ */}
        <section className="border-b-2 border-black bg-white">
          <div className="max-w-4xl mx-auto px-6 py-24">
            <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">FREQUENTLY_ASKED_QUESTIONS</div>
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">Problem Solving_</h2>
            
            <div className="space-y-12">
              <div className="border-l-4 border-black pl-8">
                <h3 className="font-headline text-xl font-black uppercase mb-4">What is SyncClip?</h3>
                <p className="font-body text-base text-zinc-600 leading-relaxed">
                  <strong>SyncClip</strong> is a free, browser-based online clipboard that syncs text between any devices in under 100ms. No app download, no account, and no permanent storage — open <Link href="/" className="text-secondary underline">syncclip.in</Link>, create a session, and copy-paste across phone, laptop, and tablet instantly.
                </p>
              </div>
              <div className="border-l-4 border-black pl-8">
                <h3 className="font-headline text-xl font-black uppercase mb-4">Is SyncClip free?</h3>
                <p className="font-body text-base text-zinc-600 leading-relaxed">
                  Yes. SyncClip is <strong>100% free</strong> with no hidden fees, no premium tier, and no ads. No account or credit card required — ever.
                </p>
              </div>
              <div className="border-l-4 border-black pl-8">
                <h3 className="font-headline text-xl font-black uppercase mb-4">What is an online clipboard?</h3>
                <p className="font-body text-base text-zinc-600 leading-relaxed">
                  An online clipboard is a web-based tool that lets you copy and paste text between devices without installing software. <Link href="/clipboard" className="text-secondary underline">SyncClip&apos;s free online clipboard</Link> syncs in real time across Android, iOS, Windows, Mac, and Linux.
                </p>
              </div>
              <div className="border-l-4 border-black pl-8">
                <h3 className="font-headline text-xl font-black uppercase mb-4">How do I copy text between devices instantly?</h3>
                <p className="font-body text-base text-zinc-600 leading-relaxed">
                  Open SyncClip on both devices, join the same 6-character session code, and anything you type on your phone appears on your laptop in under 100ms. No login or app install required.
                </p>
              </div>
              <div className="border-l-4 border-black pl-8">
                <h3 className="font-headline text-xl font-black uppercase mb-4">Is there a way to sync clipboard without login?</h3>
                <p className="font-body text-base text-zinc-600 leading-relaxed">
                  Yes. SyncClip is designed for <strong>account-free synchronization</strong>. We use ephemeral session IDs instead of user accounts to preserve your privacy and speed up the workflow.
                </p>
              </div>
              <div className="border-l-4 border-black pl-8">
                <h3 className="font-headline text-xl font-black uppercase mb-4">How to share clipboard online securely?</h3>
                <p className="font-body text-base text-zinc-600 leading-relaxed">
                  Look for tools with HTTPS encryption and auto-purge. SyncClip offers a <strong>&quot;Burn After Reading&quot;</strong> mode which wipes your data immediately after it&apos;s accessed, plus 24-hour session auto-delete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            FINAL CTA
        ════════════════════════════════════════════ */}
        <section className="bg-black text-white">
          <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
            <div className="font-mono text-[10px] tracking-[0.4em] text-secondary uppercase mb-6">READY_TO_SYNC</div>
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              Stop Emailing
              <br/>Yourself.
            </h2>
            <p className="font-body text-lg italic text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10">
              One click. One link. Every device connected.
            </p>
            <button
              onClick={() => handleCreateSession(undefined, "final_cta")}
              disabled={initializing}
              className="bg-secondary text-white font-label font-bold py-5 px-14 border-2 border-secondary hover:bg-white hover:text-black hover:border-white transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] disabled:bg-zinc-800 disabled:border-zinc-800 inline-flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              {initializing ? "GENERATING..." : "CREATE YOUR FIRST NODE"}
            </button>
            <div className="mt-6 font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
              Free · No account · No install · Live in 1 second
            </div>
          </div>
        </section>

      </main>

      {/* Micro-banner for hybrid stack dev demographic */}
      <div className="bg-secondary text-white py-4 text-center font-mono text-[10px] tracking-widest uppercase border-t-2 border-black border-b-2">
        ⚡ Built for hybrid stacks. The perfect clipboard sync bridge for Android and Windows. ⚡
      </div>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-on-surface-variant uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // DISTRIBUTED CLIPBOARD PROTOCOL // V4.2
          </div>
          
          <div className="my-2 md:my-0 flex justify-center shrink-0">
            <a href="https://www.producthunt.com/products/syncclip?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-syncclip" target="_blank" rel="noopener noreferrer">
              <img alt="SyncClip - No-login, real-time clipboard sync between any device. | Product Hunt" width="180" height="39" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1127130&theme=light&t=1782389533779" />
            </a>
          </div>

          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link href="/about" className="text-zinc-500 hover:text-secondary transition-colors">About</Link>
            <Link href="/support" className="text-zinc-500 hover:text-secondary transition-colors">Support</Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-secondary transition-colors">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
