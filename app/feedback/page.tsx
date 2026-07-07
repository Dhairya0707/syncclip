"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { sendInfo } from "../../utils/discord";
import { track } from "../../utils/analytics";

function FeedbackFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code") || "DIRECT";

  const [pmf, setPmf] = useState<string>("");
  const [nps, setNps] = useState<number | null>(null);
  const [referral, setReferral] = useState<string>("REDDIT");
  const [hearAboutDetail, setHearAboutDetail] = useState<string>("");
  const [useCases, setUseCases] = useState<string[]>([]);
  const [bug, setBug] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    track("feedback_page_viewed", { roomCode, timestamp: new Date().toISOString() });
  }, [roomCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pmf) {
      setErrorMsg("Please select how you would feel if SyncClip went away.");
      return;
    }
    if (nps === null) {
      setErrorMsg("Please select your recommendation score.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // Send directly to Discord webhook
      await sendInfo("Feedback Campaign Submission", [
        { name: "Room Origin", value: roomCode, inline: true },
        { name: "PMF Score", value: pmf, inline: true },
        { name: "NPS Score", value: String(nps), inline: true },
        { name: "Referral Source", value: referral, inline: true },
        { name: "How They Heard (Detail)", value: hearAboutDetail || "Not Provided" },
        { name: "Primary Use Cases", value: useCases.length > 0 ? useCases.join(", ") : "None Selected" },
        { name: "Bugs / Annoyances", value: bug || "None Reported" },
        { name: "Contact Name", value: name || "Anonymous", inline: true },
        { name: "Contact Email", value: email || "Anonymous", inline: true }
      ]);

      // Save complete status in LocalStorage
      localStorage.setItem("syncclip_feedback_done", "true");

      // Track in Umami
      track("feedback_submitted", {
        pmf,
        nps,
        referral,
        hearAboutDetail,
        roomCode,
        timestamp: new Date().toISOString()
      });

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to transmit feedback payload.");
    }
  };

  const handleReturn = () => {
    if (roomCode && roomCode !== "DIRECT") {
      router.push(`/${roomCode}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/support" className="text-zinc-400 hover:text-white transition-colors">SUPPORT</Link>
          <span className="text-secondary font-bold">FEEDBACK</span>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6 md:px-12 max-w-4xl mx-auto w-full">
        <div className="mb-12">
          <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">TRANSMISSION FEEDBACK GATE</div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-6">
            FEEDBACK_
          </h1>
          <p className="font-body text-xl md:text-2xl leading-relaxed italic text-zinc-600 max-w-2xl">
            You are one of our active clipboard operators. Help shape the future of SyncClip by sharing your thoughts.
          </p>
        </div>

        {status === "success" ? (
          <div className="border-4 border-black p-10 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center space-y-6 max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-secondary text-6xl animate-pulse">rocket_launch</span>
            <h3 className="font-headline text-3xl font-black uppercase tracking-tight">TRANSMISSION CONFIRMED</h3>
            <p className="font-body text-zinc-600 text-lg">
              Your responses have been successfully piped to our Discord pipeline. Thank you for helping build SyncClip.
            </p>
            <button 
              onClick={handleReturn}
              className="mt-4 w-full bg-black text-white font-label font-bold py-5 uppercase tracking-widest text-sm hover:bg-secondary transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              RETURN TO SYNCCLIP ⚡
            </button>
          </div>
        ) : (
          <form className="border-4 border-black p-8 md:p-12 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-8" onSubmit={handleSubmit}>
            {status === "error" && (
              <div className="bg-red-50 border-2 border-red-300 p-4 text-red-600 font-mono text-xs flex gap-2 items-center">
                <span className="material-symbols-outlined text-sm">error</span>
                {errorMsg.toUpperCase()}
              </div>
            )}
            
            {errorMsg && status !== "error" && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 text-yellow-800 font-mono text-xs flex gap-2 items-center">
                <span className="material-symbols-outlined text-sm">warning</span>
                {errorMsg.toUpperCase()}
              </div>
            )}

            {/* Q1: PMF */}
            <div className="space-y-4">
              <label className="block font-mono text-xs md:text-sm tracking-wider uppercase font-bold text-zinc-800">
                01 // How would you feel if you could no longer use SyncClip tomorrow? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "VERY_DISAPPOINTED", label: "VERY DISAPPOINTED" },
                  { id: "SOMEWHAT_DISAPPOINTED", label: "SOMEWHAT DISAPPOINTED" },
                  { id: "NOT_DISAPPOINTED", label: "NOT DISAPPOINTED" }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPmf(opt.id)}
                    className={`border-2 border-black p-4 font-mono text-xs font-bold uppercase tracking-widest text-center transition-all ${
                      pmf === opt.id 
                        ? "bg-secondary text-white shadow-none translate-x-[4px] translate-y-[4px]" 
                        : "bg-white text-black hover:bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: NPS */}
            <div className="space-y-4">
              <label className="block font-mono text-xs md:text-sm tracking-wider uppercase font-bold text-zinc-800">
                02 // How likely are you to recommend SyncClip to a friend or colleague? *
              </label>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 11 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNps(i)}
                    className={`border-2 border-black w-11 h-11 font-mono text-xs font-bold flex items-center justify-center transition-all ${
                      nps === i 
                        ? "bg-secondary text-white shadow-none translate-x-[3px] translate-y-[3px]" 
                        : "bg-white text-black hover:bg-zinc-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="flex justify-between font-mono text-[9px] text-zinc-400 uppercase tracking-wider px-1">
                <span>0 - Not Likely</span>
                <span>10 - Extremely Likely</span>
              </div>
            </div>

            {/* Q3: Referral */}
            <div className="space-y-4">
              <label className="block font-mono text-xs md:text-sm tracking-wider uppercase font-bold text-zinc-800">
                03 // Where did you first hear about SyncClip? *
              </label>
              <select 
                value={referral}
                onChange={e => setReferral(e.target.value)}
                className="w-full border-2 border-black p-4 bg-transparent font-mono text-xs uppercase tracking-widest focus:outline-none focus:bg-zinc-50 transition-colors"
              >
                <option value="REDDIT">Reddit</option>
                <option value="LINKEDIN">LinkedIn</option>
                <option value="GOOGLE_SEARCH">Google Search</option>
                <option value="AI_SEARCH">AI Search (Perplexity/ChatGPT/Gemini)</option>
                <option value="FRIEND">Friend / Colleague</option>
                <option value="OTHER">Other</option>
              </select>
              <input 
                type="text"
                value={hearAboutDetail}
                onChange={e => setHearAboutDetail(e.target.value)}
                placeholder="Tell us more — e.g. 'My friend shared it on WhatsApp' (optional)"
                className="w-full border-2 border-black p-4 bg-transparent font-body text-sm focus:outline-none focus:bg-zinc-50 transition-colors mt-4"
                maxLength={200}
              />
            </div>

            {/* Q4: Use Cases */}
            <div className="space-y-4">
              <label className="block font-mono text-xs md:text-sm tracking-wider uppercase font-bold text-zinc-800">
                04 // What do you sync the most? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs uppercase tracking-wider">
                {[
                  { id: "OTP_CODES", label: "OTP / 2FA Codes" },
                  { id: "CODE_SNIPPETS", label: "Code Snippets" },
                  { id: "URLS_LINKS", label: "URLs / Links" },
                  { id: "TEXT_NOTES", label: "Text / Quick Notes" }
                ].map(item => (
                  <label 
                    key={item.id} 
                    className={`flex items-center gap-3 p-4 border-2 border-black cursor-pointer transition-colors ${
                      useCases.includes(item.id) ? "bg-zinc-50" : "bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={useCases.includes(item.id)}
                      onChange={() => {
                        setUseCases(prev => 
                          prev.includes(item.id) 
                            ? prev.filter(x => x !== item.id) 
                            : [...prev, item.id]
                        );
                      }}
                      className="w-4 h-4 border-2 border-black rounded-none text-black focus:ring-0 cursor-pointer"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Q5: Bug / Annoyance */}
            <div className="space-y-4">
              <label className="block font-mono text-xs md:text-sm tracking-wider uppercase font-bold text-zinc-800">
                05 // What is the single most annoying thing or bug about SyncClip right now?
              </label>
              <textarea 
                rows={3} 
                value={bug}
                onChange={e => setBug(e.target.value)}
                className="w-full border-2 border-black p-4 bg-transparent font-body focus:outline-none focus:bg-zinc-50 transition-colors resize-none text-sm" 
                placeholder="Detail your system friction (optional)..."
              />
            </div>

            {/* Q6: Optional Contact info */}
            <div className="space-y-4 border-t-2 border-dashed border-zinc-200 pt-6">
              <label className="block font-mono text-xs md:text-sm tracking-wider uppercase font-bold text-zinc-800">
                06 // Leave your contact (Optional)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-zinc-500 mb-1">Operator Name</label>
                  <input 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Operator Name"
                    className="w-full border-b-2 border-zinc-300 p-3 bg-transparent font-body focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-zinc-500 mb-1">Email / ID</label>
                  <input 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border-b-2 border-zinc-300 p-3 bg-transparent font-body focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={status === "loading"}
              className="mt-4 w-full bg-zinc-900 text-white font-label font-bold py-5 uppercase tracking-widest text-sm hover:bg-secondary transition-colors disabled:bg-zinc-400 disabled:cursor-not-allowed shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
            >
              {status === "loading" ? "TRANSMITTING..." : "FORCE TRANSMIT FEEDBACK ⚡"}
            </button>
          </form>
        )}
      </main>

      {/* Footer Ribbon */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-on-surface-variant uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP PUBLISHING GROUP // DISTRIBUTED ARCHIVAL CLIPBOARD // V4.2
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

export default function FeedbackPage() {
  return (
    <Suspense fallback={
      <div className="bg-surface font-body min-h-screen flex items-center justify-center">
        <div className="font-mono text-xs tracking-widest animate-pulse">LOADING FEEDBACK ENGINE...</div>
      </div>
    }>
      <FeedbackFormContent />
    </Suspense>
  );
}
