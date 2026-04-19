

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Anonymous & Ephemeral",
  description: "SyncClip requires no login and stores no data. Read our privacy policy to understand our commitment to zero-tracking, ephemeral clipboards.",
  alternates: {
    canonical: "https://syncclip.in/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/support" className="text-zinc-400 hover:text-white transition-colors">SUPPORT</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6 max-w-4xl mx-auto w-full">
        <div className="mb-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Legal</div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-6">
            PRIVACY_
          </h1>
          <p className="font-body text-xl md:text-2xl leading-relaxed italic text-zinc-600 max-w-2xl">
            We don't track you. We don't store your data. This is how we handle your privacy.
          </p>
        </div>

        <div className="space-y-12 border-t-2 border-black pt-10">
          <section>
            <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">No Login Required</h2>
            <p className="font-body text-zinc-700 leading-relaxed">
              SYNCCLIP operates on a completely anonymous basis. We do not require you to create an account, log in, or provide an email address. You remain entirely anonymous while using the service.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Data Volatility &amp; Storage</h2>
            <p className="font-body text-zinc-700 leading-relaxed">
              All clipboard data is strictly ephemeral. Sessions and their history are automatically and permanently purged from our database after 24 hours. If the &quot;Burn After Reading&quot; protocol is engaged, data is destroyed 5 seconds after a secondary node reads it. We do not maintain backups of expired session data.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">No Tracking or Analytics</h2>
            <p className="font-body text-zinc-700 leading-relaxed">
              We respect your privacy. SYNCCLIP uses minimal, cookie-free analytics simply to count page views and measure site performance. We do not use cross-site tracking, fingerprinting, or any advertising pixels.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-4">Contact</h2>
            <p className="font-body text-zinc-700 leading-relaxed">
              If you have any questions regarding this policy, please reach out via our <Link href="/support" className="font-bold underline hover:text-secondary">Support Form</Link> or email us directly at support.dhairyadarji@gmail.com.
            </p>
          </section>
        </div>
      </main>

      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-on-surface-variant uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // DISTRIBUTED CLIPBOARD PROTOCOL // V4.2
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
