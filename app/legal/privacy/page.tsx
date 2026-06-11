import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SyncClip privacy policy — information we process, clipboard data handling, data retention, security, and contact information.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://syncclip.in/legal/privacy",
  },
};

export default function LegalPrivacyPage() {
  const lastUpdated = "June 11, 2026";

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/support" className="text-zinc-400 hover:text-white transition-colors">SUPPORT</Link>
        </nav>
      </header>

      <main className="pt-32 pb-20 flex-grow px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Legal</div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-4">
            Privacy Policy
          </h1>
          <p className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase mb-16">
            Last Updated: {lastUpdated}
          </p>

          <div className="space-y-14 border-t-2 border-black pt-12">
            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Introduction</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                SyncClip is a privacy-first clipboard synchronization service. This policy explains what information we process, how we handle your data, and your rights regarding your information. SyncClip is designed to minimize data collection and prioritize user privacy.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Information We Process</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                We do not require user accounts. We do not require email addresses. We do not collect names, IP addresses (except transiently for connection routing), or any personally identifiable information. The only data processed is the clipboard content you voluntarily submit for synchronization.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Anonymous Usage</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                SyncClip operates on a fully anonymous basis. Session identification is handled through randomly generated 6-character codes. No account creation, login, or identity verification is required to use the service. You remain anonymous throughout your session.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Clipboard Data Handling</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                Clipboard content is processed solely for the purpose of synchronization between your connected devices. Content is encrypted during transmission using HTTPS/TLS. We do not read, inspect, or analyze the content of your clipboard data beyond what is technically necessary for real-time synchronization.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Data Retention</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                Clipboard content may be temporarily stored on infrastructure required for synchronization. All session data — including text content, history snapshots, and presence metadata — is automatically and permanently purged from our database within 24 hours of session creation. We do not maintain backups, archives, or long-term storage of clipboard data.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Burn After Reading Protocol</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                When Burn After Reading is enabled by the session creator, clipboard content is automatically and permanently destroyed shortly after being read by a connected device. This protocol triggers an irreversible deletion of all session data — including text content, archives, and presence records — from our database, making the data unrecoverable.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Security</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                Data is encrypted during transmission using HTTPS/TLS. Session codes are generated using cryptographically secure randomness (<code className="font-mono text-xs bg-zinc-100 px-1.5 py-0.5 border border-zinc-300">crypto.getRandomValues</code>). We enforce a strict Content Security Policy (CSP) to prevent cross-site scripting. Session payloads are capped at 100KB to prevent abuse. A hard limit of 100 connected nodes per session protects against resource exhaustion attacks.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Analytics</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                We use privacy-respecting analytics for aggregate usage statistics and service performance monitoring. No personal data is collected through our analytics. We do not use advertising trackers, browser fingerprinting, behavioral profiling, or cross-site tracking mechanisms. Analytics data is used solely to understand application performance and aggregate usage patterns.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Third-Party Services</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                SyncClip uses the following third-party services:
              </p>
              <ul className="font-body text-base text-zinc-700 leading-relaxed list-disc pl-6 mt-3 space-y-2">
                <li><strong className="font-bold">Convex</strong> — Real-time database and synchronization engine. Clipboard content is temporarily stored on Convex infrastructure for the purpose of cross-device sync.</li>
                <li><strong className="font-bold">Vercel</strong> — Application hosting and edge delivery network.</li>
                <li><strong className="font-bold">Vercel Analytics</strong> — Privacy-preserving, cookie-free aggregate analytics.</li>
              </ul>
              <p className="font-body text-base text-zinc-700 leading-relaxed mt-4">
                Each service operates under its own privacy and data processing agreements. We select providers that align with our privacy-first philosophy.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Contact Information</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                Questions regarding this privacy policy may be directed to:
              </p>
              <div className="mt-4 p-6 border-2 border-black bg-zinc-50">
                <p className="font-mono text-sm tracking-widest font-bold">
                  support.dhairyadarji@gmail.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Changes to This Policy</h2>
              <p className="font-body text-base text-zinc-700 leading-relaxed">
                We may update this privacy policy from time to time. Changes will be reflected on this page with an updated &quot;Last Updated&quot; date. Continued use of SyncClip after changes constitutes acceptance of the updated policy. We encourage you to review this page periodically.
              </p>
            </section>

            <div className="pt-6 border-t-2 border-black">
              <p className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                SyncClip // {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-on-surface-variant uppercase text-center md:text-left">
            &copy; {new Date().getFullYear()} SYNCCLIP // DISTRIBUTED CLIPBOARD PROTOCOL // V4.2
          </div>
          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link href="/" className="text-zinc-500 hover:text-secondary transition-colors">Home</Link>
            <Link href="/about" className="text-zinc-500 hover:text-secondary transition-colors">About</Link>
            <Link href="/support" className="text-zinc-500 hover:text-secondary transition-colors">Support</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
