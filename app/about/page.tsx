

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About SyncClip | Architecture & Features",
  description: "Learn how SyncClip's ephemeral clipboard protocol works. Discover our real-time Convex engine, zero-tracking policy, and secure 'Burn After Reading' functionality.",
  alternates: {
    canonical: "https://syncclip.in/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://syncclip.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://syncclip.in/about',
      },
    ],
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* NAV */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/support" className="text-zinc-400 hover:text-white transition-colors">SUPPORT</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">

        {/* PAGE HEADER */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Documentation</div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-6">
            ABOUT_
          </h1>
          <p className="font-body text-xl md:text-2xl leading-relaxed italic text-zinc-600 max-w-2xl">
            Everything you need to know about SYNCCLIP — every feature, every shortcut, and the architecture behind the protocol.
          </p>
        </div>

        {/* ═══════════════════════════════════════
            WHAT IS SYNCCLIP
        ═══════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="border-t-2 border-black pt-10">
            <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">OVERVIEW</div>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">What Is SYNCCLIP?</h2>
            <div className="font-body text-base text-zinc-700 leading-relaxed space-y-4 max-w-3xl">
              <p>
                SYNCCLIP is an ephemeral, real-time universal clipboard built for developers, designers, and teams who need to move text between devices without friction. No app to install. No account to create. No data that lingers.
              </p>
              <p>
                You create a session with one click. A unique 6-character code is generated. Share the URL or scan a QR code from your second device. Now anything you type or paste on one screen appears on all connected screens instantly.
              </p>
              <p>
                Sessions automatically expire and are permanently purged after 24 hours. Your data is never stored long-term.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            ALL FEATURES — DETAILED
        ═══════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="border-t-2 border-black pt-10">
            <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">FEATURE_REFERENCE</div>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">All Features</h2>

            <div className="space-y-0">
              {/* Feature 1 */}
              <div className="border-2 border-black p-8 -mb-[2px]">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-3xl text-secondary mt-1 shrink-0">cloud_sync</span>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase mb-2">Real-Time Sync</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      Every character you type is debounced (500ms) and pushed through Convex&apos;s real-time mutation engine. All connected nodes receive updates via WebSocket subscriptions within milliseconds. There is no polling and no manual refresh. The sync is bidirectional — if someone types on their device, your screen updates instantly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="border-2 border-black p-8 -mb-[2px]">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-3xl text-secondary mt-1 shrink-0">all_match</span>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase mb-2">Auto-Push Protocol</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      When you enable Auto-Push, every time a remote node updates the session text, SYNCCLIP automatically writes it to your native OS clipboard using the Clipboard API. This means you can copy text on your phone, and immediately CMD+V on your laptop without ever touching the browser. It works seamlessly across Mac, Windows, and mobile browsers that support clipboard access.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="border-2 border-black p-8 -mb-[2px]">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-3xl text-secondary mt-1 shrink-0">visibility</span>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase mb-2">Smart Auto-Read</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      Auto-Read works in the opposite direction. When enabled, SYNCCLIP listens for when you return focus to the browser tab (CMD+Tab back). At that moment, it reads your local OS clipboard and checks if the content has changed. If it has, the new content is immediately synced to the cloud session. This means you can copy something in VS Code, switch to the SYNCCLIP tab, and it automatically pushes it to all your other devices without typing anything.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="border-2 border-black p-8 -mb-[2px]">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-3xl text-orange-500 mt-1 shrink-0">local_fire_department</span>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase mb-2">Burn After Reading</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      This is for sharing sensitive, one-time data like passwords, API keys, or private messages. When the session creator arms the Burn Protocol, the session becomes volatile. If any other device connects and reads the data, a 5-second countdown triggers. After 5 seconds, the system permanently deletes all text content and the entire archive history from the Convex database. The session becomes blank and cannot be recovered. Think of it as Snapchat for your clipboard.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="border-2 border-black p-8 -mb-[2px]">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-3xl text-secondary mt-1 shrink-0">lock</span>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase mb-2">Origin Lock (Read-Only Mode)</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      The device that creates a session is registered as the &quot;origin node&quot; and has a unique owner identity stored locally. The owner can toggle a Lock on the session. When locked, all other connected devices are forced into a read-only state — the textarea becomes disabled, and the backend rejects any write attempts from non-owner nodes. Only the origin node can unlock it. This is perfect for broadcasting information to a group without anyone editing it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="border-2 border-black p-8 -mb-[2px]">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-3xl text-secondary mt-1 shrink-0">qr_code_2</span>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase mb-2">Optical QR Pairing</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      Instead of typing a URL or session code on your second device, click the Pair button inside any session. A high-contrast QR code matrix appears. Point your phone&apos;s camera at it, tap the link, and you&apos;re instantly connected to the same session. No typing. No login. Just scan and you&apos;re in.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 7 */}
              <div className="border-2 border-black p-8 -mb-[2px]">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-3xl text-secondary mt-1 shrink-0">terminal</span>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase mb-2">Command Palette (CMD + K)</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      Press CMD+K (or CTRL+K on Windows/Linux) anywhere inside a session to open the spotlight-style command terminal. A list of commands appears — Clear Node, Copy Text, Toggle Lock, Pair Device, Burn Protocol, and Force Sync. Use the Arrow keys to navigate, Enter to execute, Escape to close. Each command has a visual icon so you can identify it at a glance. It makes SYNCCLIP feel like a native desktop application.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 8 */}
              <div className="border-2 border-black p-8 -mb-[2px]">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-3xl text-secondary mt-1 shrink-0">code</span>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase mb-2">Intelligent Payload Detection</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      The metadata bar below the text editor displays a real-time TYPE indicator. An intelligent regex engine scans what you&apos;re typing or pasting and classifies it: <strong>URL</strong> (if it matches an http/https pattern), <strong>JSON</strong> (if it parses as valid JSON), <strong>CODE</strong> (if it contains syntax keywords like function, const, import alongside structural characters), or <strong>TEXT</strong> (everything else). This helps you quickly understand what kind of data is in your clipboard.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 9 */}
              <div className="border-2 border-black p-8 -mb-[2px]">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-3xl text-secondary mt-1 shrink-0">monitoring</span>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase mb-2">Session Telemetry</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      Open the sidebar (click the Nodes menu on mobile) and you&apos;ll find a Telemetry panel at the top. It tracks three metrics in real-time: <strong>Uptime</strong> (how many minutes since the session was created), <strong>Mutations</strong> (how many times the text has been updated in the database), and <strong>Node Density</strong> (how many devices are currently connected). This gives you visibility into the lifecycle of your session.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 10 */}
              <div className="border-2 border-black p-8">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-3xl text-secondary mt-1 shrink-0">history</span>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase mb-2">Archive History &amp; Restore</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      Every time you Force Sync or Clear the node, a snapshot of the current text is saved to the session&apos;s archive log (capped at 10 entries). You can open the sidebar and click on any previous version to instantly restore it. This means you can freely overwrite your clipboard knowing that previous states are always recoverable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            KEYBOARD SHORTCUTS
        ═══════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="border-t-2 border-black pt-10">
            <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">SHORTCUT_REFERENCE</div>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">Keyboard Shortcuts</h2>

            <div className="border-2 border-black divide-y-2 divide-black">
              {[
                { keys: "⌘ K", action: "Open Command Palette" },
                { keys: "↑ ↓", action: "Navigate commands" },
                { keys: "Enter", action: "Execute selected command" },
                { keys: "Esc", action: "Close palette / modals" },
              ].map((s) => (
                <div key={s.keys} className="flex items-center gap-6 p-5">
                  <span className="font-mono text-sm font-black bg-zinc-900 text-white px-4 py-2 min-w-[70px] text-center tracking-wider">{s.keys}</span>
                  <span className="font-label font-bold text-sm uppercase tracking-widest">{s.action}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            THE CREATOR
        ═══════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="border-t-2 border-black pt-10">
            <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">THE_BUILDER</div>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">Creator</h2>

            <div className="border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-headline text-2xl font-black uppercase mb-4">Dhairya Darji</h3>
              <p className="font-body text-zinc-700 leading-relaxed mb-6">
                I built SYNCCLIP to solve my own problem: I hated sending myself emails or Slack messages just to move a snippet of text from my phone to my desktop. I wanted something instant, account-free, and ephemeral.
              </p>

              <div className="flex gap-4 font-mono text-sm tracking-widest uppercase">
                <a href="https://github.com/Dhairya0707" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors font-bold">
                  GitHub <span className="material-symbols-outlined text-[16px]">north_east</span>
                </a>
                <a href="https://www.linkedin.com/in/dhairya-darji-072428284/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors font-bold">
                  LinkedIn <span className="material-symbols-outlined text-[16px]">north_east</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            TECH STACK
        ═══════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="border-t-2 border-black pt-10">
            <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">ARCHITECTURE</div>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">The Stack</h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-start border-l-4 border-black pl-6 py-3">
                <div>
                  <h4 className="font-label font-bold uppercase tracking-widest text-sm">Convex Real-Time Engine</h4>
                  <p className="font-body text-sm text-zinc-600 mt-1">Reactive queries, transactional mutations, and WebSocket subscriptions. Every keystroke is a database write that propagates globally in real-time.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start border-l-4 border-secondary pl-6 py-3">
                <div>
                  <h4 className="font-label font-bold uppercase tracking-widest text-sm">Next.js App Router</h4>
                  <p className="font-body text-sm text-zinc-600 mt-1">Server-first routing with client-side interactivity. Dynamic session pages render instantly via the App Router&apos;s streaming architecture.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start border-l-4 border-black pl-6 py-3">
                <div>
                  <h4 className="font-label font-bold uppercase tracking-widest text-sm">Edge Deployment (Vercel)</h4>
                  <p className="font-body text-sm text-zinc-600 mt-1">Static pages cached globally on Vercel&apos;s Edge Network. Session data lives in Convex&apos;s distributed database. Zero cold starts.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start border-l-4 border-secondary pl-6 py-3">
                <div>
                  <h4 className="font-label font-bold uppercase tracking-widest text-sm">Automatic Cleanup</h4>
                  <p className="font-body text-sm text-zinc-600 mt-1">A daily Convex cron job purges sessions older than 24 hours. Text, history, and presence data are permanently deleted.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECURITY
        ═══════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="border-t-2 border-black pt-10">
            <div className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4">SECURITY_SPEC</div>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">Security &amp; Privacy</h2>

            <div className="border-2 border-black bg-zinc-900 text-white p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(5,125,188,1)]">
              <div className="space-y-5 font-mono text-sm">
                {[
                  { title: "100K Character Limit", desc: "Payload size is hard-capped to prevent database abuse and denial-of-service attacks." },
                  { title: "Origin Node Ownership", desc: "The machine that creates a session is tagged as the owner. Only the owner can Lock, Unlock, or activate Burn Mode." },
                  { title: "Ephemeral by Design", desc: "Sessions auto-expire in 24 hours. The cron job permanently purges all text, history, and presence data." },
                  { title: "Presence Throttling", desc: "Heartbeat pings are throttled to 15-second intervals with visibility gating. Inactive tabs generate zero network noise." },
                  { title: "History Capped", desc: "Archive history is capped at 10 restorable snapshots per session to prevent unbounded storage growth." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                    <span className="material-symbols-outlined text-secondary text-xl mt-0.5 shrink-0">check_circle</span>
                    <div>
                      <div className="font-bold uppercase tracking-widest text-xs mb-1">{item.title}</div>
                      <div className="text-zinc-400 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
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
            <Link href="/" className="text-zinc-500 hover:text-secondary transition-colors">Home</Link>
            <Link href="/support" className="text-zinc-500 hover:text-secondary transition-colors">Support</Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-secondary transition-colors">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
