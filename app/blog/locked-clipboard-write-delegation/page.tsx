import type { Metadata } from "next";
import Link from "next/link";
import WriteDelegationDemo from "@/components/WriteDelegationDemo";

export const metadata: Metadata = {
  robots: { index: true },
  title: "Pass the Pen: How to Delegate Write Access in a Locked Shared Clipboard",
  description: "How to grant temporary write access to a specific guest inside a locked shared clipboard session without compromising security or exposing it to overwrites.",
  keywords: ["shared clipboard write access", "delegate write permission", "locked clipboard sync", "collaborative clipboard lock", "ephemeral websocket collaboration", "pass the pen clipboard"],
  alternates: {
    canonical: "https://syncclip.in/blog/locked-clipboard-write-delegation",
  },
};

export default function WriteDelegationBlog() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is write access delegation in a locked clipboard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Write access delegation, or 'Pass the Pen', allows the owner of a locked shared clipboard session to authorize specific connected nodes to write and edit the clipboard contents, while keeping all other nodes read-only."
        }
      },
      {
        "@type": "Question",
        "name": "How does 'Pass the Pen' work in SyncClip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When a session is locked, the owner can open the 'Nodes' drawer, see the active connected devices, and toggle the 'Delegated Write' switch to ON for any chosen node. That guest node is instantly granted write access without unlocking the room for others."
        }
      },
      {
        "@type": "Question",
        "name": "Is write access delegation secure against machine spoofing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SyncClip implements an anti-spoofing mechanism by filtering presence query payloads. Unique node identifiers are only delivered to the session owner's client and are never exposed to other guest devices, preventing bad actors from hijacking write privileges."
        }
      }
    ]
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/clipboard" className="text-zinc-400 hover:text-white transition-colors">CLIPBOARD</Link>
          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">ABOUT</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          
          {/* AEO ANSWER BOX */}
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4 text-center md:text-left">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed italic text-center md:text-left">
              <strong>Quick Answer:</strong> To delegate write access in a locked shared clipboard session, the session owner can use SyncClip's <strong>&quot;Pass the Pen&quot;</strong> feature. By opening the Nodes panel, the owner can toggle write permissions ON for specific connected devices individually. This allows teammates to edit or copy code while keeping all other connected participants in a secure read-only state.
            </p>
          </div>

          <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase text-center md:text-left">New Protocol Release // Collaborative Control</div>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter font-headline leading-[0.9] text-black mb-12 text-center md:text-left">
            PASS THE PEN: WRITE DELEGATION IN LOCKED CLIPBOARD SESSIONS_
          </h1>

          <div className="prose prose-zinc max-w-none font-body text-lg text-zinc-700 leading-relaxed space-y-12">
            <p className="text-xl leading-relaxed text-zinc-800 font-medium">
              Real-time clipboards are incredible for quick, friction-free synchronization between devices. However, when working in a collaborative environment—such as team meetings or pair-programming sessions—unlocked clipboards can quickly result in chaotic text overwriting. The standard solution is to lock the session, making the owner the sole editor and casting everyone else into read-only mode. But what happens if a teammate needs to make a quick correction without opening the gates to everyone?
            </p>

            <p>
              SyncClip's new <strong>Write Access Delegation (&quot;Pass the Pen&quot;)</strong> addresses this exact pain point. Instead of forcing a binary choice between complete open-access chaos and total lockdown, room owners can now selectively authorize write privileges to specific connected guest nodes.
            </p>

            <h2 className="text-2xl md:text-3xl font-headline font-black text-black uppercase tracking-tight mt-12 mb-4">
              How Write Delegation Works Under the Hood
            </h2>
            <p>
              In a typical shared session, each client is assigned a unique node identifier (<code>nodeId</code>) stored in their local storage. When you activate write delegation:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Presence Security:</strong> To prevent peers from hijacking permissions, guest devices never see the raw node IDs of other participants. Unique machine IDs are delivered exclusively to the session owner.
              </li>
              <li>
                <strong>Selective Authorization:</strong> The owner toggles write access for a specific guest device from the <em>Nodes list</em>. This adds that guest's identifier to the room's authorized writer list in our backend database.
              </li>
              <li>
                <strong>Real-Time Permissions:</strong> The guest device's UI instantly shifts from <code>(READ ONLY)</code> to <code>(AUTHORIZED WRITER)</code>, unlocking the textarea and enabling instant synchronization.
              </li>
            </ul>

            {/* LIVE SIMULATOR DEMO */}
            <WriteDelegationDemo />

            <h2 className="text-2xl md:text-3xl font-headline font-black text-black uppercase tracking-tight mt-12 mb-4">
              Step-by-Step: Toggling Guest Write Access
            </h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Open your SyncClip session and click <strong>Lock</strong> in your Node settings. All other joined devices are instantly restricted to read-only status.</li>
              <li>Open the <strong>Nodes</strong> drawer on your device. You will see a list of all active connected peers.</li>
              <li>Find the guest you want to authorize and click the <strong>Delegated Write [ON]</strong> button.</li>
              <li>The guest can now edit and sync. Once they are finished, click <strong>OFF</strong> or hit <strong>Revoke All Write Access</strong> to lock down the session once more.</li>
            </ol>

            <p className="border-t border-black pt-8 mt-12 font-mono text-xs uppercase tracking-wider text-zinc-500">
              Published by the SyncClip Core Team. Explore our zero-friction clipboard bridge today at <Link href="/" className="text-secondary underline hover:text-black transition-colors">syncclip.in</Link>.
            </p>
          </div>
          
        </article>
      </main>

      <footer className="bg-black text-white py-12 px-6 border-t-2 border-black font-mono text-xs uppercase tracking-widest" role="contentinfo">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>&copy; 2026 SyncClip. Editorial Brutalism.</div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-secondary transition-colors">HOME</Link>
            <Link href="/privacy" className="hover:text-secondary transition-colors">PRIVACY</Link>
            <Link href="/support" className="hover:text-secondary transition-colors">SUPPORT</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
