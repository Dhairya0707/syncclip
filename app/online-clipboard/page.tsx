
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Online Clipboard — Copy and Paste Across Devices Free",
  description: "The best free online clipboard to share text between your phone and laptop instantly. No signup, no login, no app download. Secure real-time clipboard sync for Android, iOS, Windows, Mac. Perfect clipboard sharing tool for developers and students.",
  keywords: ["online clipboard", "clipboard online", "share clipboard online", "online clipboard free", "clipboard sharing tool", "copy paste online", "text sharing between devices"],
  alternates: {
    canonical: "https://syncclip.in/online-clipboard",
  },
};

export default function OnlineClipboardPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best free online clipboard for cross-device sync?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SyncClip is the best free online clipboard for cross-device sync. It requires no login, no app installation, and syncs text in under 100ms between Android, iOS, Windows, and Mac using WebSocket technology."
        }
      },
      {
        "@type": "Question",
        "name": "How do I copy and paste between devices using an online clipboard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Open SyncClip on both devices, share the 6-character session code, and anything you copy on one device is instantly available on the other. No signup, no app, no email required."
        }
      },
      {
        "@type": "Question",
        "name": "Is online clipboard safe for sharing sensitive text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SyncClip encrypts all data in transit using HTTPS/TLS. Sessions auto-expire after 24 hours. Burn After Reading mode deletes data instantly after the connected device reads it. No permanent storage."
        }
      }
    ]
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
          {/* AEO ANSWER BOX */}
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4 text-center md:text-left">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic text-center md:text-left">
              An online clipboard is a web-based synchronization utility that allows users to share text, code, and links between multiple devices instantly. By using a secure WebSocket bridge like SyncClip, you can copy data on your phone and paste it on your computer without installing apps, creating accounts, or compromising your privacy.
            </p>
          </div>
                   <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Regional Solution // INDIA HUB</div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              ONLINE_ CLIPBOARD FOR INSTANT TEXT SHARING_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed italic text-zinc-600 max-w-2xl mb-12">
              The fastest way to share text between your mobile and computer in India. Secure, instant, and completely free.
            </p>
          </div>

          <div className="bg-zinc-100 p-8 border-2 border-black mb-16 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border-r border-zinc-300 pr-8">
                   <div className="text-black font-black mb-2 italic uppercase">India Response Speed</div>
                   <p className="text-[10px] leading-relaxed">Edge nodes in Mumbai and Chennai ensure sub-50ms handshake for domestic traffic.</p>
                </div>
                <div className="border-r border-zinc-300 px-8">
                   <div className="text-black font-black mb-2 italic uppercase">Developer Ready</div>
                   <p className="text-[10px] leading-relaxed">Copy JSON, XML, or Bash snippets without formatting corruption or hidden characters.</p>
                </div>
                <div className="pl-8">
                   <div className="text-black font-black mb-2 italic uppercase">Zero Persistence</div>
                   <p className="text-[10px] leading-relaxed">Transient data protocol ensures nothing is stored in long-term cold storage.</p>
                </div>
             </div>
          </div>

          {/* SECTION 1: THE INDIA CONTEXT */}
          <section className="mb-24 border-t-2 border-black pt-16">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter text-black leading-none">Solving_ The_ Local_ Workflow_</h2>
             <div className="font-body text-lg text-zinc-700 leading-relaxed space-y-8 max-w-3xl">
                <p>
                   Whether you are a software engineer in <strong>Bengaluru&apos;s tech parks</strong>, a research student in <strong>Mumbai</strong>, or a remote worker in <strong>Delhi</strong>, the &quot;mobile-to-PC&quot; gap is a daily hurdle. Many Indians rely on WhatsApp Web or Telegram to send links to themselves, but this clutters personal chats and compromises privacy. 
                </p>
                <p>
                   SyncClip provides a <strong>sovereign, browser-native alternative</strong>. Built on a low-latency stack (Next.js + Convex), it offers an immediate &quot;scratchpad&quot; that exists only as long as you need it. No more &quot;Sent to Self&quot; messages filling up your backup storage.
                </p>
             </div>
          </section>

          {/* THE LATENCY TAX SECTION */}
          <section className="mb-24 bg-zinc-900 text-white p-12 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-8 italic text-secondary">The_ Latency_ Tax_</h2>
             <p className="font-body text-lg text-zinc-400 mb-8 leading-relaxed max-w-3xl">
                Every second you spend waiting for a cloud note to sync or an email to arrive is a &quot;Latency Tax&quot; on your productivity. In a high-speed work environment, those seconds accumulate into minutes of lost focus. 
             </p>
             <p className="font-body text-lg text-zinc-400 mb-10 leading-relaxed max-w-3xl">
                By using an <strong>online clipboard</strong> powered by real-time WebSockets, you reduce the data transfer cycle to its physical limit. SyncClip moves data at the speed of your network handshake, typically under 100ms.
             </p>
             <div className="flex gap-4">
                <div className="h-1 flex-1 bg-secondary"></div>
                <div className="h-1 flex-1 bg-zinc-700"></div>
                <div className="h-1 flex-1 bg-zinc-700"></div>
             </div>
          </section>

          {/* SECTION 2: TARGET AUDIENCE WORKFLOWS */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-12">Optimized for Productivity</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50 transition-colors">
                <h3 className="font-headline font-black uppercase text-2xl mb-6 text-secondary">For Developers_</h3>
                <ul className="space-y-4 font-body text-sm text-zinc-600 leading-relaxed">
                  <li className="flex gap-3">
                     <span className="text-black font-black">/</span>
                     <p><strong className="text-black">API Snippets:</strong> Instantly move curl commands or JSON payloads between your Linux workstation and Android testing device without formatting errors.</p>
                  </li>
                  <li className="flex gap-3">
                     <span className="text-black font-black">/</span>
                     <p><strong className="text-black">No Setup:</strong> Works in every environment—from office Wi-Fi to mobile hotspots—without complex firewall or proxy configuration.</p>
                  </li>
                  <li className="flex gap-3">
                     <span className="text-black font-black">/</span>
                     <p><strong className="text-black">Zero Tracking:</strong> Maintain privacy while moving sensitive environment variables between development nodes.</p>
                  </li>
                </ul>
              </div>
              <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(5,125,188,1)] hover:bg-zinc-50 transition-colors">
                <h3 className="font-headline font-black uppercase text-2xl mb-6 text-secondary">For Students_</h3>
                <ul className="space-y-4 font-body text-sm text-zinc-600 leading-relaxed">
                  <li className="flex gap-3">
                     <span className="text-black font-black">/</span>
                     <p><strong className="text-black">Note Sync:</strong> Copy research references or citation links from your phone during lectures directly to your laptop research document.</p>
                  </li>
                  <li className="flex gap-3">
                     <span className="text-black font-black">/</span>
                     <p><strong className="text-black">Cross-Platform:</strong> Works perfectly on budget Android tablets, Windows laptops, and iPads alike with no software limitations.</p>
                  </li>
                  <li className="flex gap-3">
                     <span className="text-black font-black">/</span>
                     <p><strong className="text-black">Ephemeral Access:</strong> Use public library computers without leaving your personal links logged in to a cloud account.</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 3: SYNCCLIP VS PASTEBIN */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8 text-black">Online Clipboard vs Pastebin</h2>
            <p className="font-body text-lg text-zinc-700 leading-relaxed mb-12 max-w-3xl">
              While Pastebin sites are great for long-term code storage, they are terrible for transient, real-time sharing. SyncClip is a <strong>Distributed Clipboard Protocol</strong>, not a storage site.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-4 border-black p-8 bg-zinc-900 text-white relative group">
                <div className="font-mono text-secondary text-[10px] mb-4 font-black uppercase tracking-widest">// INSTANT UPDATE</div>
                <p className="font-body text-sm text-zinc-400 leading-relaxed italic">No &quot;Submit&quot; or &quot;Save&quot; buttons. Every keystroke syncs live via the hot layer. Speed is the only priority.</p>
              </div>
              <div className="border-4 border-black p-8 bg-zinc-900 text-white relative group">
                <div className="font-mono text-secondary text-[10px] mb-4 font-black uppercase tracking-widest">// PRIVACY FIRST</div>
                <p className="font-body text-sm text-zinc-400 leading-relaxed italic">Data is not indexed by Google or listed in public directories. Your snippets are invisible to the public web.</p>
              </div>
              <div className="border-4 border-black p-8 bg-zinc-900 text-white relative group">
                <div className="font-mono text-secondary text-[10px] mb-4 font-black uppercase tracking-widest">// EPHEMERAL</div>
                <p className="font-body text-sm text-zinc-400 leading-relaxed italic">Hard-purged after 24 hours of inactivity. We don&apos;t build a history; we facilitate a transition.</p>
              </div>
            </div>
          </section>

          {/* SECTION 4: ZERO TRACKING */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <div className="bg-black text-white p-12 border-l-[20px] border-secondary flex flex-col md:flex-row gap-12 items-center shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
              <div className="flex-grow">
                <h2 className="font-headline text-4xl md:text-6xl font-black uppercase mb-6 italic leading-tight text-secondary">Zero Tracking._<br/>Zero Login.</h2>
                <p className="font-body text-lg text-zinc-400 leading-relaxed max-w-xl">
                  We believe in <strong>Transient Privacy</strong>. In 2026, you shouldn&apos;t have to provide a phone number or email just to move text between your own devices. Use the &quot;Burn After Reading&quot; protocol for absolute sovereignty.
                </p>
              </div>
              <Link href="/" className="inline-block bg-white text-black font-mono font-black py-6 px-16 hover:bg-secondary transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] shrink-0">
                SYNC_ NOW_
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
