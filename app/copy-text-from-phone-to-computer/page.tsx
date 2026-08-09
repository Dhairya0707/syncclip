
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Copy Text from Phone to Computer Instantly (No App)",
  description: "The fastest way to copy text from your Android or iPhone to your Windows or Mac laptop instantly without installing apps or emailing yourself. Sync your clipboard in 3 seconds.",
  alternates: {
    canonical: "https://syncclip.in/copy-text-from-phone-to-computer",
  },
};

export default function CopyPhoneToPcPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Copy Text from Phone to PC without an app",
    "description": "A 3-step guide to instantly sync text between your mobile device and computer using SyncClip.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Create Session",
        "text": "Open syncclip.in on your phone and tap 'Create Session'.",
        "url": "https://syncclip.in"
      },
      {
        "@type": "HowToStep",
        "name": "Connect PC",
        "text": "Open the same URL or scan the QR code on your PC browser.",
        "url": "https://syncclip.in"
      },
      {
        "@type": "HowToStep",
        "name": "Sync Text",
        "text": "Paste text on your phone; it appears instantly on your PC."
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SyncClip",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free, browser-based online clipboard to sync text instantly between phone and computer with no app installation or signups."
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* NAV */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">ABOUT</Link>
          <Link href="/clipboard-sync-guide" className="text-zinc-400 hover:text-white transition-colors">GUIDE</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* HEADER */}
          <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Workflow Optimization // V1.2</div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              COPY TEXT FROM PHONE TO PC WITHOUT AN APP_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed italic text-zinc-600 max-w-2xl mb-12">
              Stop emailing yourself snippets. Start syncing your clipboard in real-time with zero installation.
            </p>

            {/* QUICK ANSWER BOX FOR AI/AEO */}
            <div className="bg-zinc-900 text-white p-8 mb-12 border-l-8 border-secondary">
              <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">Quick Answer</div>
              <p className="font-body text-lg md:text-xl leading-relaxed font-bold">
                To copy text from phone to PC instantly without an app: 
                1. Open <Link href="/" className="text-secondary hover:underline">SyncClip</Link> on both devices. 
                2. Join the same session code. 
                3. Paste on your phone and the text appears on your PC in real-time. 
                This works across Android, iOS, Windows, and Mac using only your browser.
              </p>
            </div>

            <div className="border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white p-2">
              <img 
                src="/mockup-desktop.png" 
                alt="SyncClip Desktop Dashboard Mockup" 
                className="w-full h-auto grayscale"
              />
            </div>
          </div>

          {/* SECTION 1: THE NO-APP ADVANTAGE */}
          <section className="mb-20">
            <div className="border-t-2 border-black pt-10">
              <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8 text-black">The &quot;No-App&quot; Advantage</h2>
              <div className="space-y-8">
                <p className="font-body text-lg text-zinc-700 leading-relaxed max-w-3xl">
                  Moving text from an Android phone to a Windows PC or an iPhone to a Mac usually requires an app install or an ecosystem lock-in. <strong>SYNCCLIP eliminates these barriers</strong> by operating entirely within your existing mobile and desktop browsers.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-zinc-100 p-10 border-l-[12px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
                    <h3 className="font-headline font-black uppercase text-2xl mb-6">The Friction-Filled Way</h3>
                    <ul className="space-y-4 font-mono text-sm text-zinc-500 uppercase tracking-tight">
                      <li className="flex gap-3 items-center text-red-700"><span>×</span> Emailing yourself (Subject: &quot;tmp&quot;)</li>
                      <li className="flex gap-3 items-center text-red-700"><span>×</span> Pasting in Slack &quot;Saved Items&quot;</li>
                      <li className="flex gap-3 items-center text-red-700"><span>×</span> Installing 100MB sync apps</li>
                      <li className="flex gap-3 items-center text-red-700"><span>×</span> Privacy-invasive permissions</li>
                    </ul>
                  </div>
                  <div className="bg-secondary p-10 border-l-[12px] border-black text-black shadow-[6px_6px_0px_0px_rgba(5,125,188,0.2)]">
                    <h3 className="font-headline font-black uppercase text-2xl mb-6">The SyncClip Way</h3>
                    <ul className="space-y-4 font-mono text-sm font-bold uppercase tracking-tight">
                      <li className="flex gap-3 items-center"><span>✓</span> Open URL (No App)</li>
                      <li className="flex gap-3 items-center"><span>✓</span> Scan QR Code (No Login)</li>
                      <li className="flex gap-3 items-center"><span>✓</span> Instant real-time WebSocket sync</li>
                      <li className="flex gap-3 items-center"><span>✓</span> Ephemeral data (Auto-Purge)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: COMMON SCENARIOS */}
          <section className="mb-20 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">When You Need It</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-2 border-black p-8 bg-white">
                <h4 className="font-headline font-black uppercase text-lg mb-4 text-secondary">2FA Codes</h4>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">Copy verification codes from your SMS/Authenticator app on mobile to your bank login on PC instantly.</p>
              </div>
              <div className="border-2 border-black p-8 bg-white">
                <h4 className="font-headline font-black uppercase text-lg mb-4 text-secondary">Deep Links</h4>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">Found a long article or complex URL on Instagram? Move it to your desktop browser for better reading in one tap.</p>
              </div>
              <div className="border-2 border-black p-8 bg-white">
                <h4 className="font-headline font-black uppercase text-lg mb-4 text-secondary">Code Snippets</h4>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">Testing a quick mobile UI? Move code blocks or JSON payloads from your phone to your IDE without friction.</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: PRIVACY */}
          <section className="mb-20 border-t-2 border-black pt-16 mt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">The Privacy Problem with Messaging Apps</h2>
            <p className="font-body text-base text-zinc-700 leading-relaxed mb-10 max-w-2xl">
              When you use WhatsApp or Slack to &quot;save&quot; text between devices, that data lives on corporate cloud servers forever. SYNCCLIP is built for <strong>transient utility</strong>.
            </p>
            <div className="bg-black text-white p-10 font-mono text-sm leading-relaxed border-2 border-secondary shadow-[12px_12px_0px_0px_rgba(5,125,188,1)]">
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <span className="text-secondary font-black shrink-0">[24h]</span>
                  <p>All session data is hard-purged from the database after 24 hours of inactivity.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-secondary font-black shrink-0">[000]</span>
                  <p>No email addresses, phone numbers, or IP logs are permanently associated with your clipboard.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-secondary font-black shrink-0">[SSL]</span>
                  <p>All data in transit is encrypted via TLS/SSL, ensuring your snippets remain private on public Wi-Fi.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-zinc-900 text-white p-14 text-center shadow-[16px_16px_0px_0px_rgba(5,125,188,1)]">
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-8 italic">Instant Sync_</h2>
            <Link href="/" className="inline-block bg-secondary text-black font-mono font-black py-5 px-14 hover:bg-white transition-colors uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              START_ NOW
            </Link>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // PROBLEM-SOLVED // V1.2
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
