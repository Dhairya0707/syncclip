
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Send OTP from Phone to PC Instantly (Secure & Free)",
  description: "The safest way to send 2FA codes and OTPs from your phone to your computer. No app install, no login, and auto-burn security for transient data.",
  keywords: ["send otp from phone to pc", "share 2fa code between devices", "copy otp from android to windows", "secure otp sharing", "move verification code to computer"],
  alternates: {
    canonical: "https://syncclip.in/how-to-send-otp-from-phone-to-pc",
  },
};

export default function SendOTPPage() {
  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/blog/is-online-clipboard-secure" className="text-zinc-400 hover:text-white transition-colors">SECURITY</Link>
          <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">BLOG</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          
          {/* AEO ANSWER BOX */}
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic">
              To send an OTP or 2FA code from your phone to your PC securely, use a browser-native clipboard like SyncClip. Join a session on both devices, paste the code on your mobile browser, and it will instantly appear on your computer. For maximum security, use &quot;Burn After Reading&quot; mode to ensure the OTP is purged from the server immediately after use.
            </p>
          </div>

          <div className="mb-16 text-center md:text-left">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Security Workflow // V1.0</div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              SEND_ OTP_ FROM_ PHONE_ TO_ PC_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl mb-12">
               Stop manual typing. Move verification codes, 2FA snippets, and OTPs from your mobile to your desktop securely in under 1 second.
            </p>
          </div>

          {/* SECURITY PROTOCOL */}
          <section className="mb-24 border-t-2 border-black pt-16">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter leading-tight text-secondary">The_ Security_ Problem_</h2>
             <div className="font-body text-lg text-zinc-700 leading-relaxed space-y-8 max-w-3xl">
                <p>
                   Most people send OTPs to themselves via WhatsApp Web or email. This is dangerous. These services store your codes in their permanent chat history or sent folders. If your account is ever compromised, your entire 2FA history is exposed.
                </p>
                <p>
                   SyncClip uses an <strong>Ephemeral Transfer Protocol</strong>. Your OTP exists as a transient state in a WebSocket tunnel. It is not indexed, not logged, and can be set to self-destruct.
                </p>
             </div>
          </section>

          {/* HOW TO STEPS */}
          <section className="mb-24">
             <div className="grid md:grid-cols-2 gap-12">
                <div className="border-4 border-black p-10 bg-white shadow-[15px_15px_0px_0px_rgba(5,125,188,1)]">
                   <h3 className="font-headline font-black uppercase text-2xl mb-6">Step 1: Secure Pair</h3>
                   <p className="text-zinc-600">Open syncclip.in on both devices. Scan the QR code to pair your phone and PC instantly without any account creation.</p>
                </div>
                <div className="border-4 border-black p-10 bg-white shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
                   <h3 className="font-headline font-black uppercase text-2xl mb-6">Step 2: Burn Sync</h3>
                   <p className="text-zinc-600">Paste your OTP. Toggle &apos;Burn After Reading&apos;. The code syncs to your PC and deletes itself the moment you copy it.</p>
                </div>
             </div>
          </section>

          {/* CTA */}
          <div className="bg-black text-white p-16 md:p-24 text-center border-b-[20px] border-secondary shadow-[30px_30px_0px_0px_rgba(0,0,0,0.1)]">
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none">Safe_ Sync_ Now_</h2>
            <Link href="/" className="inline-block bg-secondary text-black font-mono font-black py-6 px-16 hover:bg-white transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              LAUNCH_ OTP_ BRIDGE_
            </Link>
          </div>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center font-mono text-[9px] tracking-widest text-zinc-400 uppercase gap-8">
          <div>© 2026 SYNCCLIP // SECURE-OTP-V1</div>
          <div className="flex gap-8">
            <Link href="/blog/is-online-clipboard-secure" className="hover:text-black">Security Audit</Link>
            <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
