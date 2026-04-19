
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Online Clipboard — Copy and Paste Across Devices",
  description: "The best free online clipboard to share text between your phone and laptop instantly in 2026. No signup, no login, and secure real-time syncing. Perfect for developers and students in India.",
  alternates: {
    canonical: "https://syncclip.in/online-clipboard",
  },
};

export default function OnlineClipboardPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SyncClip Online Clipboard",
    "url": "https://syncclip.in/online-clipboard",
    "applicationCategory": "Utility",
    "description": "An instant, real-time online clipboard for cross-device text sharing with zero tracking."
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
          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">ABOUT</Link>
          <Link href="/support" className="text-zinc-400 hover:text-white transition-colors">SUPPORT</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* HEADER */}
          <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Regional Solution // INDIA HUB</div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              ONLINE_ CLIPBOARD FOR INSTANT TEXT SHARING_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed italic text-zinc-600 max-w-2xl">
              The fastest way to share text between your mobile and computer in India. Secure, instant, and completely free.
            </p>
          </div>

          {/* SECTION 1: THE INDIA CONTEXT */}
          <section className="mb-20">
            <div className="border-t-2 border-black pt-10">
              <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8 text-black">Solving the Local Workflow</h2>
              <div className="grid md:grid-cols-2 gap-12 font-body text-base text-zinc-700 leading-relaxed">
                <p>
                  Whether you are a software engineer in <strong>Bengaluru&apos;s tech parks</strong>, a research student in <strong>Mumbai</strong>, or a remote worker in <strong>Delhi</strong>, the &quot;mobile-to-PC&quot; gap is a daily hurdle. Many Indians rely on WhatsApp Web or Telegram to send links to themselves, but this clutters personal chats and compromises privacy.
                </p>
                <p>
                  SyncClip provides a <strong>sovereign, browser-native alternative</strong>. Built on a low-latency stack (Next.js + Convex), it offers an immediate &quot;scratchpad&quot; that exists only as long as you need it.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: TARGET AUDIENCE WORKFLOWS */}
          <section className="mb-20 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">Optimized for Productivity</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-2 border-black p-10 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-headline font-black uppercase text-2xl mb-4 text-secondary">For Developers</h3>
                <ul className="space-y-4 font-body text-sm text-zinc-600 leading-relaxed">
                  <li><strong className="text-black">API Snippets:</strong> Instantly move curl commands or JSON payloads between your Linux workstation and Android testing device.</li>
                  <li><strong className="text-black">No Setup:</strong> Works in every environment—from office Wi-Fi to mobile hotspots—without firewall configuration.</li>
                  <li><strong className="text-black">Live Debugging:</strong> See logs update in real-time across devices during remote debugging sessions.</li>
                </ul>
              </div>
              <div className="border-2 border-black p-10 bg-white shadow-[8px_8px_0px_0px_rgba(5,125,188,1)]">
                <h3 className="font-headline font-black uppercase text-2xl mb-4 text-secondary">For Students</h3>
                <ul className="space-y-4 font-body text-sm text-zinc-600 leading-relaxed">
                  <li><strong className="text-black">Note Sync:</strong> Copy research references or citation links from your phone during lectures directly to your laptop.</li>
                  <li><strong className="text-black">Cross-Platform:</strong> Works perfectly on budget Android tablets, Windows laptops, and iPads alike.</li>
                  <li><strong className="text-black">Study Groups:</strong> Share a 6-character node code with a friend to exchange links instantly in a common room.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 3: SYNCCLIP VS PASTEBIN */}
          <section className="mb-20 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Better Than a Traditional Pastebin</h2>
            <p className="font-body text-base text-zinc-700 leading-relaxed mb-10 max-w-3xl">
              While Pastebin sites are great for long-term code storage, they are terrible for transient, real-time sharing. SyncClip is a <strong>Distributed Clipboard Protocol</strong>, not a storage site.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-2 border-black p-6 bg-zinc-900 text-white text-center">
                <h4 className="font-mono text-secondary uppercase font-bold text-xs mb-3">Instant Update</h4>
                <p className="font-body text-xs text-zinc-400">No &quot;Submit&quot; or &quot;Save&quot; buttons. Every keystroke syncs live.</p>
              </div>
              <div className="border-2 border-black p-6 bg-zinc-900 text-white text-center">
                <h4 className="font-mono text-secondary uppercase font-bold text-xs mb-3">Privacy First</h4>
                <p className="font-body text-xs text-zinc-400">Data is not indexed by Google or listed in &quot;Public Pastes.&quot;</p>
              </div>
              <div className="border-2 border-black p-6 bg-zinc-900 text-white text-center">
                <h4 className="font-mono text-secondary uppercase font-bold text-xs mb-3">Ephemeral</h4>
                <p className="font-body text-xs text-zinc-400">Hard-purged after 24 hours. No permanent trail of your data.</p>
              </div>
            </div>
          </section>

          {/* SECTION 4: ZERO TRACKING */}
          <section className="mb-20 border-t-2 border-black pt-16">
            <div className="bg-black text-white p-12 border-l-[20px] border-secondary flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-grow">
                <h2 className="font-headline text-4xl md:text-6xl font-black uppercase mb-6 italic leading-tight">Zero Tracking._<br/>Zero Login.</h2>
                <p className="font-body text-lg text-zinc-400 leading-relaxed max-w-xl">
                  We believe in <strong>Transient Privacy</strong>. In 2026, you shouldn&apos;t have to provide a phone number or email just to move text between your own devices.
                </p>
              </div>
              <Link href="/" className="inline-block bg-white text-black font-mono font-black py-5 px-14 hover:bg-secondary transition-colors uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] shrink-0">
                SYNC_ONLINE
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // ONLINE-HUB // V1.5
          </div>
          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link href="/" className="text-zinc-500 hover:text-secondary transition-colors">Home</Link>
            <Link href="/about" className="text-zinc-500 hover:text-secondary transition-colors">About</Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-secondary transition-colors">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
