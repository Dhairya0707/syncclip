"use client"

import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter } from "next/navigation";
import { track } from "../utils/analytics";
import { isExperimentEnabled } from "../utils/experiments";
import { getRandomCopyBlock } from "../utils/headlines";
import Link from "next/link";
import RedirectNudgeBar from "../components/RedirectNudgeBar";

export default function Home() {
  const createSession = useMutation(api.sessions.createSession);
  const router = useRouter();
  const [initializing, setInitializing] = useState(false);
  const [recentSessions, setRecentSessions] = useState<string[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("syncclip_recent_sessions");
    if (saved) {
      setRecentSessions(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  async function handleCreateSession() {
    setInitializing(true);
    try {
      let nodeId = localStorage.getItem("syncclip_node_id");
      if (!nodeId) {
        nodeId = `NODE-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        localStorage.setItem("syncclip_node_id", nodeId);
      }

      const initialCopy = isExperimentEnabled("ROTATING_HEADLINES_ENABLED") 
        ? getRandomCopyBlock().hook 
        : "";

      const code = await createSession({ 
        ownerNodeId: nodeId,
        initialText: initialCopy
      });
      
      track("room_created", {
        timestamp: new Date().toISOString(),
        platform: typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : "desktop") : "unknown",
      });

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'SyncClip — Online Clipboard',
        alternateName: ['Online Clipboard', 'Clipboard Sync Tool', 'Cross Device Clipboard'],
        applicationCategory: 'UtilityApplication',
        applicationSubCategory: 'Clipboard Sharing Tool',
        operatingSystem: 'All',
        url: 'https://syncclip.in',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online clipboard to copy and paste text between devices. Sync clipboard between phone, laptop, and PC instantly with no login and no app install.',
        featureList: [
          'Online clipboard for cross-device text sharing',
          'Sync clipboard between devices instantly',
          'Copy paste between phone and PC without app',
          'No login, no signup, no tracking',
          'Burn After Reading mode for sensitive data',
          'Real-time WebSocket sync under 100ms',
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'SyncClip',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How do I sync my clipboard between devices for free?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The fastest free way to sync your clipboard is using SyncClip. Open syncclip.in on both devices, join the same session, and text copied on one will appear on the other instantly via WebSockets.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is there a clipboard sync tool that doesn\'t require login?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, SyncClip is a zero-login clipboard sync tool. It uses ephemeral session codes instead of user accounts to ensure privacy and speed.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I copy text from Android to PC without an app?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. SyncClip works in any modern mobile and desktop browser, allowing you to move text from Android to Windows, Mac, or Linux without installing any software.'
        }
      }
    ]
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* NAV */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6 items-center">
          <Link href="/join" className="text-secondary hover:text-white transition-colors font-bold">JOIN</Link>
          <a href="#features" className="text-zinc-400 hover:text-white transition-colors hidden sm:block">FEATURES</a>
          <Link href="/support" className="text-zinc-400 hover:text-white transition-colors">SUPPORT</Link>
          <button
            onClick={handleCreateSession}
            disabled={initializing}
            className="bg-secondary text-white px-4 py-1 font-bold hover:bg-white hover:text-black transition-all text-[10px] tracking-widest"
          >
            {initializing ? "..." : "LAUNCH"}
          </button>
        </nav>
      </header>

      <RedirectNudgeBar />

      <main className="pt-10 flex-grow">

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
                  Live · No Signup · Ephemeral
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter font-headline leading-[0.9] text-primary mb-6">
                  CLIPBOARD SYNC_
                  <br />
                  BETWEEN
                  <br />
                  <span className="text-secondary">ANY DEVICE.</span>
                </h1>

                <p className="font-body text-lg md:text-xl text-zinc-600 max-w-lg leading-relaxed mb-10">
                  The fastest free universal clipboard to sync text and code between devices. No downloads, no logins, and zero tracking. Copy on phone, paste on PC instantly.
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
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-secondary">encrypted</span> Secured</span>
                  <span className="text-zinc-200">|</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-secondary">timer</span> Sessions expire in 24h</span>
                  <span className="text-zinc-200">|</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-secondary">devices</span> Unlimited devices</span>
                </div>
              </div>

              {/* Right: Recent Sessions Panel — 2 columns */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Live UI mockup card */}
                <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="bg-black text-white px-5 py-3 font-mono text-[10px] tracking-widest uppercase flex justify-between items-center">
                    <span>SYNCCLIP</span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
                      LIVE
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="border border-zinc-200 p-4 min-h-[80px] font-body text-sm text-zinc-400 italic">
                      Begin typing on any device...
                    </div>
                    <div className="mt-3 flex gap-6 font-mono text-[8px] tracking-widest uppercase text-zinc-400">
                      <span>WEIGHT: 0.00 KB</span>
                      <span>TYPE: EMPTY</span>
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
                <div className="mb-6 border-2 border-black grayscale hover:grayscale-0 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
                  <img src="/step-1-create.png" alt="Step 1: Create Session" className="w-full h-auto" />
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
                <div className="mb-6 border-2 border-black grayscale hover:grayscale-0 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
                  <img src="/step-2-join.png" alt="Step 2: Join Session" className="w-full h-auto" />
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
                <div className="mb-6 border-2 border-black grayscale hover:grayscale-0 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
                  <img src="/step-3-sync.png" alt="Step 3: Syncing" className="w-full h-auto" />
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
              {/* Feature 1: Real-Time Sync */}
              <div className="border-2 border-black p-8 md:p-10 group hover:bg-black transition-all duration-300 -mr-[2px] -mb-[2px]">
                <span className="material-symbols-outlined text-4xl block mb-5 text-black group-hover:text-secondary transition-colors">cloud_sync</span>
                <h3 className="font-headline text-2xl uppercase font-black mb-3 group-hover:text-white transition-colors">Real-Time Sync</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  Every keystroke is pushed through a real-time engine. All connected devices update within milliseconds. No polling, no refresh, no lag.
                </p>
              </div>

              {/* Feature 2: Auto Clipboard Sync */}
              <div className="border-2 border-black p-8 md:p-10 group hover:bg-black transition-all duration-300 -mb-[2px]">
                <span className="material-symbols-outlined text-4xl block mb-5 text-black group-hover:text-secondary transition-colors">all_match</span>
                <h3 className="font-headline text-2xl uppercase font-black mb-3 group-hover:text-white transition-colors">Auto Clipboard Sync</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  Toggle <strong className="group-hover:text-white">Auto-Push</strong> and remote changes land directly in your OS clipboard. Toggle <strong className="group-hover:text-white">Auto-Read</strong> and local clipboard changes sync to the cloud when you return.
                </p>
              </div>

              {/* Feature 3: Burn After Reading */}
              <div className="border-2 border-black p-8 md:p-10 group hover:bg-black transition-all duration-300 -mr-[2px]">
                <span className="material-symbols-outlined text-4xl block mb-5 text-orange-500 group-hover:text-orange-400 transition-colors">local_fire_department</span>
                <h3 className="font-headline text-2xl uppercase font-black mb-3 group-hover:text-white transition-colors">Burn After Reading</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  Arm the protocol and your clipboard becomes volatile. When a second device opens it, the data self-destructs in 5 seconds — permanently wiped from the database.
                </p>
              </div>

              {/* Feature 4: Session Lock + QR */}
              <div className="border-2 border-black p-8 md:p-10 group hover:bg-black transition-all duration-300">
                <span className="material-symbols-outlined text-4xl block mb-5 text-black group-hover:text-secondary transition-colors">shield_lock</span>
                <h3 className="font-headline text-2xl uppercase font-black mb-3 group-hover:text-white transition-colors">Secure &amp; Controlled</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  <strong className="group-hover:text-white">Lock</strong> your session to make all others read-only. Pair devices instantly via <strong className="group-hover:text-white">QR codes</strong>. Use <strong className="group-hover:text-white">CMD+K</strong> to control everything from the keyboard.
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

              <Link href="/clipboard-between-devices" className="border-2 border-black p-10 bg-white hover:bg-black group transition-all shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                <span className="material-symbols-outlined text-4xl mb-6 text-black group-hover:text-secondary block transition-colors">sync_alt</span>
                <h3 className="font-headline text-2xl font-black uppercase mb-4 group-hover:text-white transition-colors">Between Devices →</h3>
                <p className="text-sm text-zinc-600 group-hover:text-zinc-400 leading-relaxed mb-6">Master the art of moving temporary data between hardware without accounts or logins.</p>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Link href="/clipboard" className="border-2 border-black p-6 hover:bg-secondary group transition-all bg-zinc-50">
                <h3 className="font-headline font-black uppercase text-lg mb-2 group-hover:text-white transition-colors">Free Clipboard</h3>
                <p className="text-xs text-zinc-500 group-hover:text-white transition-colors mb-4">The free online clipboard tool to copy paste between any devices.</p>
                <span className="font-mono text-[10px] font-bold text-secondary group-hover:text-white uppercase tracking-widest">Open Now _</span>
              </Link>
              <Link href="/sync-clipboard-between-devices" className="border-2 border-black p-6 hover:bg-black group transition-all">
                <h3 className="font-headline font-black uppercase text-lg mb-2 group-hover:text-white transition-colors">How to Sync</h3>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors mb-4">Master the real-time clipboard sync between all your devices.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">Read More _</span>
              </Link>
              <Link href="/copy-text-from-phone-to-computer" className="border-2 border-black p-6 hover:bg-black group transition-all">
                <h3 className="font-headline font-black uppercase text-lg mb-2 group-hover:text-white transition-colors">Phone to PC</h3>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors mb-4">The fastest way to move text from mobile to desktop without apps.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">Read More _</span>
              </Link>
              <Link href="/pushbullet-alternative" className="border-2 border-black p-6 hover:bg-black group transition-all">
                <h3 className="font-headline font-black uppercase text-lg mb-2 group-hover:text-white transition-colors">Free Alternative</h3>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors mb-4">Why SyncClip is the best free alternative to Pushbullet in 2026.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">Read More _</span>
              </Link>
              <Link href="/online-clipboard" className="border-2 border-black p-6 hover:bg-black group transition-all">
                <h3 className="font-headline font-black uppercase text-lg mb-2 group-hover:text-white transition-colors">Online Hub</h3>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors mb-4">A secure, ephemeral space for your transient clipboard data.</p>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">Read More _</span>
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
              <Link href="/blog/how-to-sync-clipboard-between-devices" className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <div className="font-mono text-[9px] text-zinc-400 mb-4 uppercase">Guide // 2026</div>
                <h3 className="font-headline font-black uppercase text-xl mb-4">How to Sync Clipboard Between Devices</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">Master the 2026 workflow for cross-OS clipboard synchronization without app fatigue.</p>
                <span className="text-secondary font-mono text-[10px] font-bold uppercase tracking-widest border-b border-secondary">Read Article _</span>
              </Link>
              <Link href="/blog/5-ways-to-copy-text-between-phone-and-laptop" className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <div className="font-mono text-[9px] text-zinc-400 mb-4 uppercase">Listicle // Workflow</div>
                <h3 className="font-headline font-black uppercase text-xl mb-4">5 Ways to Copy Text Between Phone & Laptop</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">Stop emailing yourself. Here are 5 ways to move snippets instantly in 30 seconds or less.</p>
                <span className="text-secondary font-mono text-[10px] font-bold uppercase tracking-widest border-b border-secondary">Read Article _</span>
              </Link>
              <Link href="/blog/best-online-clipboard-tools-2026" className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <div className="font-mono text-[9px] text-zinc-400 mb-4 uppercase">Comparison // Audit</div>
                <h3 className="font-headline font-black uppercase text-xl mb-4">Best Online Clipboard Tools in 2026</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">An audit of the top clipboard sync tools. Why browser-native beats installed apps.</p>
                <span className="text-secondary font-mono text-[10px] font-bold uppercase tracking-widest border-b border-secondary">Read Article _</span>
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
                <h3 className="font-headline text-xl font-black uppercase mb-4">What is an online clipboard?</h3>
                <p className="font-body text-base text-zinc-600 leading-relaxed">
                  An online clipboard is a web-based tool like <strong>SyncClip</strong> that allows you to store and sync text or code snippets between different devices (phone, laptop, tablet) without installing software.
                </p>
              </div>
              <div className="border-l-4 border-black pl-8">
                <h3 className="font-headline text-xl font-black uppercase mb-4">How do I copy text between devices instantly?</h3>
                <p className="font-body text-base text-zinc-600 leading-relaxed">
                  The fastest way is to use a real-time sync tool. Open SyncClip on both devices, join the same session code, and anything you type on your phone will appear on your laptop in milliseconds.
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
                  Look for tools that offer end-to-end encryption (SSL) and data auto-purge features. SyncClip offers a <strong>&quot;Burn After Reading&quot;</strong> mode which wipes your data immediately after it&apos;s accessed.
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
              onClick={handleCreateSession}
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

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-on-surface-variant uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // DISTRIBUTED CLIPBOARD PROTOCOL // V4.2
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
