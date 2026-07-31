import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Online Clipboard — Instant Sync, No App, No Login",
  description:
    "Copy text on your phone, paste on PC in milliseconds. The fastest free online clipboard — no downloads, no account, no tracking. Works on Android, iPhone, Windows, Mac, Linux.",
  keywords: [
    "online clipboard",
    "clipboard online",
    "free online clipboard",
    "online clipboard free",
    "copy paste online",
    "share clipboard online",
    "clipboard sharing tool",
    "clipboard sync",
    "text clipboard online",
    "syncclip",
  ],
  alternates: {
    canonical: "https://syncclip.in/clipboard",
    languages: {
      "en-US": "https://syncclip.in/clipboard",
      "en-IN": "https://syncclip.in/clipboard",
      "en-NP": "https://syncclip.in/clipboard",
      "en-PK": "https://syncclip.in/clipboard",
    },
  },
  openGraph: {
    title: "Online Clipboard — Copy & Paste Between Devices Free (No App)",
    description:
      "Free online clipboard — paste on PC what you copied on your phone in under 1 second. No login, no app. Android, iPhone, Windows, Mac.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Clipboard — Copy & Paste Between Devices Free",
    description:
      "Free online clipboard — sync text between phone and PC in under 1 second. No login, no app install.",
  },
};

export default function ClipboardPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SyncClip — Free Online Clipboard",
    alternateName: [
      "Online Clipboard",
      "Free Clipboard Tool",
      "Clipboard Sharing App",
      "Clipboard Sync",
    ],
    url: "https://syncclip.in/clipboard",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    browserRequirements:
      "Requires JavaScript. Works on Chrome, Firefox, Safari, Edge.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online clipboard to copy and paste text between phone, laptop, and tablet in under 100ms. No login, no app install. Works on Android, iOS, Windows, Mac, Linux.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an online clipboard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An online clipboard is a web-based tool that lets you copy and paste text between different devices like phones, laptops, and tablets without installing any software. SyncClip is a free online clipboard that works instantly in your browser.",
        },
      },
      {
        "@type": "Question",
        name: "How do I use an online clipboard to copy text between devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open syncclip.in on both devices, create or join a session using the 6-character code, and paste text on one device. It instantly appears on the other device through real-time WebSocket sync.",
        },
      },
      {
        "@type": "Question",
        name: "Is online clipboard sharing safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SyncClip uses SSL encryption for all data in transit. Sessions are ephemeral and auto-delete after 24 hours. You can also enable Burn After Reading mode to destroy data immediately after it is accessed.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install an app to use an online clipboard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. SyncClip runs entirely in your web browser. No downloads, no plugins, and no account creation required. It works on Chrome, Safari, Firefox, and Edge across all operating systems.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best free clipboard for Android and Windows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SyncClip is the best free clipboard for syncing between Android and Windows. Unlike native tools that are locked to one ecosystem, SyncClip works across all operating systems through the browser.",
        },
      },
      {
        "@type": "Question",
        name: "Is online clipboard free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. SyncClip is a 100% free online clipboard with no hidden fees, no premium tier, and no ads. Unlimited sessions, unlimited devices, zero cost.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best free online clipboard in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SyncClip is rated the best free online clipboard for 2026. It offers real-time WebSocket sync under 100ms, works on every browser and OS, requires no account, and auto-deletes data after 24 hours for privacy.",
        },
      },
    ],
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
            ONLINE CLIPBOARD
          </Link>
          <Link
            href="/clipboard-sync-guide"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            GUIDE
          </Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          {/* AEO ANSWER BOX (Answer First Strategy) */}
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-6">
              Quick Answer // AEO Node
            </div>
            <p className="font-body text-xl md:text-3xl leading-relaxed italic">
              <strong>Quick Answer:</strong> An online clipboard is a web-based
              utility that allows you to sync text, code, and snippets between
              devices instantly using real-time WebSockets. Unlike native tools,
              it works across Android, iOS, Windows, and Mac without apps or
              logins, providing an ephemeral, encrypted bridge for
              cross-platform data sharing.
            </p>
          </div>

          <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">
            Free Clipboard Tool // No Login Required
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
            FREE ONLINE CLIPBOARD_
          </h1>
          <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl mb-12">
            Need to <strong>copy and paste text between devices</strong>? Use
            this free online clipboard to sync your clipboard between phone,
            laptop, and tablet instantly. No login, no app install, no tracking.
          </p>
          {/* KNOWLEDGE HUB DIRECTORY (Pillar Wiring) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            <Link
              href="/blog/what-is-a-live-clipboard"
              className="bg-black text-white p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-black transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Live Clipboard_
            </Link>
            <Link
              href="/blog/is-online-clipboard-secure"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Security Audit_
            </Link>
            <Link
              href="/copy-text-from-phone-to-computer"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Phone to PC_
            </Link>
            <Link
              href="/blog/5-ways-to-copy-text-between-phone-and-laptop"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              5-Ways Guide_
            </Link>
            <Link
              href="/pushbullet-alternative"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Pushbullet Alt_
            </Link>
            <Link
              href="/blog/best-online-clipboard-tools-2026"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Best Tools 2026_
            </Link>
            <Link
              href="/blog/online-clipboard-vs-cloud-notes"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Notes vs Sync_
            </Link>
            <Link
              href="/blog/clipboard-sync-for-remote-teams"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Remote Teams_
            </Link>
            <Link
              href="/blog/online-clipboard-vs-desktop-apps"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Apps vs Web_
            </Link>
            <Link
              href="/blog/syncclip-vs-universal-clipboard"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Ecosystems_
            </Link>
          </div>

          <Link
            href="/?src=clipboard_hero"
            className="inline-block bg-black text-white font-mono font-black py-5 px-12 hover:bg-secondary transition-colors uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(5,125,188,1)]"
          >
            Start Free Clipboard ⚡
          </Link>
          {/* </div> */}

          {/* SECTION: WHAT IS AN ONLINE CLIPBOARD */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">
              What is an Online Clipboard?
            </h2>
            <div className="grid md:grid-cols-2 gap-10 font-body text-base text-zinc-700 leading-relaxed">
              <div>
                <p className="mb-6">
                  An <strong>online clipboard</strong> is a web-based tool that
                  allows you to copy text, code snippets, URLs, or any string of
                  data on one device and instantly paste it on another. Unlike
                  your device&apos;s built-in clipboard (which only works
                  locally), an online clipboard bridges the gap between
                  different operating systems and devices.
                </p>
                <p>
                  Traditional clipboard tools require app installations, account
                  signups, or are locked to specific ecosystems (like
                  Apple&apos;s Universal Clipboard). A modern{" "}
                  <strong>clipboard sharing tool</strong> like SyncClip
                  eliminates all of that friction.
                </p>
              </div>
              <div className="bg-zinc-100 p-8 border-2 border-black">
                <h3 className="font-headline font-black uppercase text-lg mb-4">
                  Use Cases for Online Clipboard:
                </h3>
                <ul className="space-y-3 text-sm text-zinc-600">
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">→</span>{" "}
                    <strong>Copy paste between phone and PC</strong> without
                    emailing yourself
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">→</span> Share{" "}
                    <strong>clipboard online</strong> with another person
                    instantly
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">→</span>{" "}
                    <strong>Sync clipboard between devices</strong> across
                    different operating systems
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">→</span> Move 2FA
                    codes from phone to desktop browser
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">→</span> Transfer
                    code snippets between IDE and mobile
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION: HOW TO USE */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              How to Use This Free Clipboard
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-mono text-4xl font-black text-secondary">
                  01
                </span>
                <h3 className="font-headline font-black uppercase text-xl my-4">
                  Open Clipboard
                </h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Go to{" "}
                  <Link href="/" className="text-secondary underline">
                    syncclip.in
                  </Link>{" "}
                  on your first device. Click &quot;Create Session&quot; to
                  start a new clipboard session.
                </p>
              </div>
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(5,125,188,1)]">
                <span className="font-mono text-4xl font-black text-secondary">
                  02
                </span>
                <h3 className="font-headline font-black uppercase text-xl my-4">
                  Connect Devices
                </h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Enter the 6-character code on your second device, or scan the
                  QR code. Both devices are now connected to the same clipboard.
                </p>
              </div>
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-mono text-4xl font-black text-secondary">
                  03
                </span>
                <h3 className="font-headline font-black uppercase text-xl my-4">
                  Copy &amp; Paste
                </h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Paste text on one device. It appears on the other instantly.
                  Use the &quot;Copy&quot; button to grab it to your local
                  clipboard.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: WHY THIS CLIPBOARD IS DIFFERENT */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">
              Why This Clipboard Tool is Different
            </h2>
            <div className="space-y-6 font-body text-base text-zinc-700 leading-relaxed max-w-3xl">
              <p>
                Most <strong>clipboard sharing tools</strong> require you to
                download an app, create an account, or pay for a subscription.
                SyncClip is different because it runs entirely in your browser.
              </p>
              <p>
                Need an <strong>online clipboard</strong> for a quick copy paste
                between your Android phone and Windows laptop? Just open the
                URL. No Google login. No Play Store download. No permissions.
                Your clipboard data is encrypted in transit and automatically
                deleted after 24 hours.
              </p>
              <p>
                Whether you search for &quot;<strong>clipboard online</strong>
                &quot;, &quot;<strong>free clipboard tool</strong>&quot;, or
                &quot;<strong>share clipboard online</strong>&quot; — SyncClip
                is the answer. It works on every browser, every OS, every
                device.
              </p>
            </div>
          </section>

          {/* SECTION: COMPARISON TABLE */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              SyncClip vs. Legacy Tools (2026 Specs)
            </h2>
            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left border-collapse font-mono text-xs md:text-sm">
                <thead>
                  <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-wider">
                    <th className="p-4 border-r border-zinc-800 font-bold">
                      Feature Metric
                    </th>
                    <th className="p-4 border-r border-zinc-800 text-secondary font-bold">
                      SyncClip (2026 Protocol)
                    </th>
                    <th className="p-4 border-r border-zinc-800 font-bold">
                      Legacy Tools (Email/Slack/Pushbullet)
                    </th>
                    <th className="p-4 font-bold">
                      Universal Clipboard (Apple)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">
                      Synchronization Latency
                    </td>
                    <td className="p-4 border-r border-black text-emerald-600 font-bold">
                      &lt;100ms (WebSocket tunnel)
                    </td>
                    <td className="p-4 border-r border-black">
                      30s+ (SMTP / Cloud polling)
                    </td>
                    <td className="p-4">1s - 5s (Bluetooth/Local network)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">
                      Authentication Barrier
                    </td>
                    <td className="p-4 border-r border-black text-secondary font-bold">
                      Zero Login (Anonymous pairing)
                    </td>
                    <td className="p-4 border-r border-black">
                      Mandatory Login (OAuth)
                    </td>
                    <td className="p-4">Mandatory iCloud Login</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">
                      Data Sovereignty
                    </td>
                    <td className="p-4 border-r border-black text-secondary font-bold">
                      24hr Auto-Purge &amp; Burn Mode
                    </td>
                    <td className="p-4 border-r border-black">
                      Permanent database logs
                    </td>
                    <td className="p-4">Transient local cache</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">
                      Ecosystem Locking
                    </td>
                    <td className="p-4 border-r border-black text-secondary font-bold">
                      100% OS Agnostic (Browser-native)
                    </td>
                    <td className="p-4 border-r border-black">
                      App-locked (Android/Win)
                    </td>
                    <td className="p-4">Ecosystem-locked (Apple Only)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">
                      Price &amp; Ad Pollution
                    </td>
                    <td className="p-4 border-r border-black text-emerald-600 font-bold">
                      FREE (No ads, 100% clean UI)
                    </td>
                    <td className="p-4 border-r border-black">
                      $4.99/mo / Heavy display ads
                    </td>
                    <td className="p-4">Free (Bundled with hardware)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              Clipboard FAQ
            </h2>
            <div className="space-y-8">
              {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="border-b border-zinc-200 pb-8">
                  <h3 className="font-headline text-xl font-black uppercase mb-4">
                    {faq.name}
                  </h3>
                  <p className="font-body text-base text-zinc-600 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-black text-white p-12 text-center">
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase mb-6 italic">
              Start Using This Clipboard_
            </h2>
            <p className="font-mono text-sm tracking-widest mb-10 text-zinc-400">
              FREE · NO LOGIN · NO APP · INSTANT SYNC
            </p>
            <Link
              href="/?src=clipboard_cta"
              className="inline-block bg-secondary text-black font-mono font-black py-4 px-10 hover:bg-white transition-colors uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
            >
              Create My Clipboard Now ⚡
            </Link>
          </section>
        </article>
      </main>

      {/* FOOTER */}
      <footer
        className="w-full border-t-2 border-black bg-white"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // ONLINE CLIPBOARD // FREE
            TOOL
          </div>
          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link
              href="/"
              className="text-zinc-500 hover:text-secondary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/online-clipboard"
              className="text-zinc-500 hover:text-secondary transition-colors"
            >
              Online Clipboard
            </Link>
            <Link
              href="/clipboard-sync-guide"
              className="text-zinc-500 hover:text-secondary transition-colors"
            >
              Guide
            </Link>
            <Link
              href="/privacy"
              className="text-zinc-500 hover:text-secondary transition-colors"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
