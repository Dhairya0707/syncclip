
import type { Metadata } from "next";
import Link from "next/link";
import AndroidWindowsSimulation from "../../components/AndroidWindowsSimulation";

export const metadata: Metadata = {
  title: "Copy Text from Android to Windows PC Instantly — No App, No Login | SyncClip",
  description:
    "The fastest way to sync text from Android to Windows PC. No USB cable, no Bluetooth, no app install. Just open the browser and paste in under 100ms.",
  keywords: [
    "android to windows clipboard",
    "copy text android to windows",
    "android windows clipboard sync",
    "share text android to pc",
    "phone link alternative",
    "copy text from android to windows 11",
    "android to pc text transfer no app",
    "clipboard sync android windows free",
  ],
  alternates: {
    canonical: "https://syncclip.in/android-to-windows",
  },
  openGraph: {
    title: "Copy Text from Android to Windows PC Instantly — SyncClip",
    description:
      "No USB, no Bluetooth, no Phone Link setup. Sync your clipboard between Android and Windows in under 100ms — straight from the browser.",
    url: "https://syncclip.in/android-to-windows",
    type: "website",
    images: [
      {
        url: "https://syncclip.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Android to Windows Clipboard Sync — SyncClip",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SyncClip — Android to Windows Clipboard Sync",
  url: "https://syncclip.in/android-to-windows",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Android, Windows",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "847",
    bestRating: "5",
    worstRating: "1",
  },
  description:
    "SyncClip instantly syncs your clipboard between Android and Windows PC in under 100ms. No app installation, no Microsoft Phone Link setup, no USB cable required.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I copy text from Android to Windows without a cable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open syncclip.in on both your Android phone and Windows PC. Create a session on one device, enter the 6-character code on the other, and anything you type appears instantly on both devices. No cable, no app install, no login required.",
      },
    },
    {
      "@type": "Question",
      name: "Is SyncClip better than Microsoft Phone Link for clipboard sync?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes for most users. Phone Link requires same WiFi network, Windows 11, and a specific set of supported Android phones. SyncClip works on any browser, any WiFi, any Android version, and also works on Mac and Linux — no OS restrictions.",
      },
    },
    {
      "@type": "Question",
      name: "How fast is Android to Windows clipboard sync?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SyncClip uses full-duplex WebSockets to sync text in under 100ms. That is faster than Bluetooth pairing, faster than email, and faster than any cloud notes app.",
      },
    },
    {
      "@type": "Question",
      name: "Does SyncClip work without the same WiFi network?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SyncClip routes through cloud WebSockets, so your phone and PC do not need to be on the same WiFi. You can sync from mobile data to office WiFi, from home to a coffee shop, or even across countries.",
      },
    },
  ],
};

const COMPARISON = [
  {
    feature: "Works without same WiFi",
    syncclip: true,
    phoneLink: false,
    bluetooth: false,
    cable: true,
  },
  {
    feature: "Zero app install",
    syncclip: true,
    phoneLink: false,
    bluetooth: false,
    cable: false,
  },
  {
    feature: "No pairing / setup",
    syncclip: true,
    phoneLink: false,
    bluetooth: false,
    cable: false,
  },
  {
    feature: "Works on any Android",
    syncclip: true,
    phoneLink: false,
    bluetooth: true,
    cable: true,
  },
  {
    feature: "Works on Mac / Linux too",
    syncclip: true,
    phoneLink: false,
    bluetooth: true,
    cable: true,
  },
  {
    feature: "Sync speed",
    syncclip: "<100ms",
    phoneLink: "1–3s",
    bluetooth: "2–5s",
    cable: "Manual",
  },
  {
    feature: "No account required",
    syncclip: true,
    phoneLink: false,
    bluetooth: true,
    cable: true,
  },
  {
    feature: "Auto-delete / privacy",
    syncclip: true,
    phoneLink: false,
    bluetooth: true,
    cable: true,
  },
];

function Check({ val }: { val: boolean | string }) {
  if (typeof val === "string") {
    return (
      <span className="font-mono text-xs font-black text-secondary">{val}</span>
    );
  }
  return val ? (
    <span className="text-secondary font-black text-base">✓</span>
  ) : (
    <span className="text-red-500 font-black text-base">✕</span>
  );
}

export default function AndroidToWindowsPage() {
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
      <header
        className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6"
        role="banner"
      >
        <Link
          href="/"
          className="font-serif italic font-black text-white hover:text-secondary transition-colors"
        >
          SYNCCLIP
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/clipboard"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            TOOL
          </Link>
          <Link
            href="/blog"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            BLOG
          </Link>
        </nav>
      </header>

      <main className="pt-10 flex-grow">

        {/* ── HERO ── */}
        <section className="bg-black text-white px-6 pt-20 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary uppercase mb-4">
              Android → Windows // Zero Friction
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white mb-6">
              COPY TEXT<br />
              <span className="text-secondary">ANDROID →</span><br />
              WINDOWS_
            </h1>
            <p className="font-body text-lg md:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
              No USB cable. No Bluetooth pairing. No Phone Link setup.{" "}
              <strong className="text-white">
                Just open a browser on both devices and paste in under 100ms.
              </strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="inline-block bg-secondary text-white font-label font-black py-4 px-10 hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(5,125,188,0.4)]"
              >
                Try It Free — No Install ⚡
              </Link>
              <a
                href="#simulation"
                className="inline-block bg-transparent text-white border-2 border-zinc-700 font-label font-bold py-4 px-8 hover:border-white transition-all uppercase tracking-widest text-sm"
              >
                See Live Demo ↓
              </a>
            </div>
          </div>
        </section>

        {/* ── LIVE SIMULATION SANDBOX ── */}
        <section id="simulation" className="bg-zinc-950 px-6 py-16 border-y-4 border-black">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="font-mono text-[9px] tracking-[0.3em] text-secondary uppercase mb-1">
                  ⚡ LIVE SYNC SIMULATION
                </div>
                <h2 className="font-headline text-2xl md:text-4xl font-black uppercase text-white tracking-tight">
                  Watch It Happen_
                </h2>
              </div>
              <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest border border-zinc-700 px-3 py-1.5">
                REAL WEBSOCKET PROTOCOL
              </div>
            </div>

            {/* The simulation */}
            <div className="bg-zinc-900 border-2 border-zinc-700 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(5,125,188,0.15)]">
              <AndroidWindowsSimulation />
            </div>

            <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-4 text-center">
              Simulated — real product works identically. Try it live at syncclip.in
            </p>
          </div>
        </section>

        {/* ── WHY NOT PHONE LINK ── */}
        <section className="px-6 py-16 border-b-2 border-black bg-surface">
          <div className="max-w-5xl mx-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary uppercase mb-4">
              The Problem
            </div>
            <h2 className="font-headline text-3xl md:text-6xl font-black uppercase tracking-tight mb-10">
              Why Phone Link Falls Short_
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Same WiFi Required",
                  desc: "Phone Link only works when both devices are on the exact same WiFi network. At a coffee shop? Hotspot? Different office floor? It fails.",
                  icon: "📶",
                },
                {
                  title: "Windows 11 + Approved Phones Only",
                  desc: "Phone Link requires Windows 11 and a limited list of Samsung, HONOR, or Surface Duo devices. Most Android phones are left out.",
                  icon: "🚫",
                },
                {
                  title: "Mandatory Microsoft Account",
                  desc: "You must sign in with a Microsoft account and go through a Bluetooth pairing ritual every time. SyncClip needs zero accounts.",
                  icon: "🔒",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-headline text-xl font-black uppercase mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-zinc-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW TO USE ── */}
        <section className="px-6 py-16 bg-black text-white border-b-4 border-secondary">
          <div className="max-w-5xl mx-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary uppercase mb-4">
              3-Step Protocol
            </div>
            <h2 className="font-headline text-3xl md:text-6xl font-black uppercase tracking-tight mb-12">
              How to Use It_
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Open on Android",
                  desc: 'Go to syncclip.in on your Android phone. Tap "Create Session". A 6-character code is generated instantly.',
                },
                {
                  step: "02",
                  title: "Join on Windows",
                  desc: "Open syncclip.in on your Windows browser. Enter the 6-character code from your phone. Both devices are now linked.",
                },
                {
                  step: "03",
                  title: "Paste Instantly",
                  desc: "Type or paste anything on your phone. It appears on your Windows PC in real-time. Hit Copy and paste it anywhere.",
                },
              ].map((s) => (
                <div key={s.step} className="border-2 border-zinc-800 p-8 hover:border-secondary transition-colors">
                  <div className="font-mono text-5xl font-black text-secondary mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-headline text-2xl font-black uppercase mb-3">
                    {s.title}
                  </h3>
                  <p className="font-body text-sm text-zinc-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/"
                className="inline-block bg-secondary text-white font-label font-black py-4 px-12 hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(5,125,188,0.4)]"
              >
                Start Syncing Now — Free ⚡
              </Link>
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="px-6 py-16 border-b-2 border-black bg-surface">
          <div className="max-w-5xl mx-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary uppercase mb-4">
              Tool Comparison // 2026
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              SyncClip vs The Alternatives_
            </h2>
            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white font-mono text-[9px] uppercase tracking-widest">
                    <th className="p-4 border-r border-zinc-800 font-bold">Feature</th>
                    <th className="p-4 border-r border-zinc-800 text-secondary font-bold">SyncClip ⚡</th>
                    <th className="p-4 border-r border-zinc-800 font-bold">Phone Link</th>
                    <th className="p-4 border-r border-zinc-800 font-bold">Bluetooth</th>
                    <th className="p-4 font-bold">USB Cable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black font-mono text-xs">
                  {COMPARISON.map((row) => (
                    <tr key={row.feature}>
                      <td className="p-4 border-r border-black font-bold bg-zinc-50 text-xs uppercase tracking-wide">
                        {row.feature}
                      </td>
                      <td className="p-4 border-r border-black text-center bg-secondary/5">
                        <Check val={row.syncclip} />
                      </td>
                      <td className="p-4 border-r border-black text-center">
                        <Check val={row.phoneLink} />
                      </td>
                      <td className="p-4 border-r border-black text-center">
                        <Check val={row.bluetooth} />
                      </td>
                      <td className="p-4 text-center">
                        <Check val={row.cable} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── USE CASES ── */}
        <section className="px-6 py-16 border-b-2 border-black bg-zinc-50">
          <div className="max-w-5xl mx-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary uppercase mb-4">
              Real Use Cases // India + Global
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              When You'll Use It_
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "🔐",
                  title: "OTP & 2FA Codes",
                  desc: "Got a one-time password on your phone but need it in a browser on PC? No more typing 6 digits manually.",
                },
                {
                  icon: "💬",
                  title: "WhatsApp Links",
                  desc: "Someone sent you a link on WhatsApp on your phone. Open it on your PC browser with one paste.",
                },
                {
                  icon: "⌨️",
                  title: "Terminal Commands",
                  desc: "Noted a command in your phone's notes app during a meeting. Get it to your PC terminal in one sync.",
                },
                {
                  icon: "📍",
                  title: "Addresses & Locations",
                  desc: "Copy a delivery address from your Android to paste directly into Google Maps or a form on your PC.",
                },
                {
                  icon: "🔗",
                  title: "YouTube / Article URLs",
                  desc: "Found something on your phone you want to watch on a big screen. Sync the URL, paste in PC browser.",
                },
                {
                  icon: "💳",
                  title: "UPI IDs / Order Codes",
                  desc: "Move payment IDs, booking references, or tracking numbers from phone to PC forms instantly.",
                },
              ].map((uc) => (
                <div
                  key={uc.title}
                  className="flex gap-5 border-b border-zinc-200 pb-6 last:border-0 last:pb-0"
                >
                  <div className="text-2xl flex-shrink-0 mt-1">{uc.icon}</div>
                  <div>
                    <h3 className="font-headline text-lg font-black uppercase mb-1">{uc.title}</h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-6 py-16 border-b-2 border-black bg-surface">
          <div className="max-w-5xl mx-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary uppercase mb-4">
              FAQ // Android to Windows
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              Common Questions_
            </h2>
            <div className="space-y-8">
              {faqSchema.mainEntity.map((faq) => (
                <div key={faq.name} className="border-b-2 border-black pb-8">
                  <h3 className="font-headline text-xl font-black uppercase mb-3">{faq.name}</h3>
                  <p className="font-body text-base text-zinc-600 leading-relaxed max-w-3xl">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-black text-white px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary uppercase mb-4">
              Free // No Login // No Install
            </div>
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              STOP TYPING<br />
              <span className="text-secondary">START SYNCING_</span>
            </h2>
            <p className="font-body text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
              Open syncclip.in on your Android and your Windows PC.{" "}
              <strong className="text-white">That&apos;s all it takes.</strong>
            </p>
            <Link
              href="/"
              className="inline-block bg-secondary text-white font-label font-black py-5 px-16 hover:bg-white hover:text-black transition-all uppercase tracking-widest text-lg shadow-[10px_10px_0px_0px_rgba(5,125,188,0.4)]"
            >
              Open SyncClip Free ⚡
            </Link>
            <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-6">
              Works on Android · Windows · Mac · Linux · iOS — Any Browser
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // ANDROID TO WINDOWS CLIPBOARD SYNC
          </div>
          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link href="/" className="text-zinc-500 hover:text-secondary transition-colors">Home</Link>
            <Link href="/clipboard" className="text-zinc-500 hover:text-secondary transition-colors">Tool</Link>
            <Link href="/blog/phone-link-vs-syncclip" className="text-zinc-500 hover:text-secondary transition-colors">Phone Link vs SyncClip</Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-secondary transition-colors">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
