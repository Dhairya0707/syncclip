"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { track } from "../utils/analytics";
import { sendError } from "../utils/discord";

const TYPEWRITER_TEXT =
  "Type here. Your text syncs instantly to any device that joins with the code below. No login. No app.";

export default function InlineClipboardEmbed() {
  const createSession = useMutation(api.sessions.createSession);

  const [text, setText] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");

  const hasInteracted = useRef(false);
  const sessionCreated = useRef(false);
  const twIndexRef = useRef(0);

  // Typewriter prompt — stops the moment the user types
  useEffect(() => {
    if (hasInteracted.current) return;
    const id = setInterval(() => {
      if (hasInteracted.current) {
        clearInterval(id);
        return;
      }
      twIndexRef.current += 1;
      setTypewriterText(TYPEWRITER_TEXT.slice(0, twIndexRef.current));
      if (twIndexRef.current >= TYPEWRITER_TEXT.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, []);

  const initSession = useCallback(async () => {
    if (sessionCreated.current || creating) return;
    setCreating(true);
    sessionCreated.current = true;
    try {
      let nodeId = localStorage.getItem("syncclip_node_id");
      if (!nodeId) {
        nodeId = `NODE-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        localStorage.setItem("syncclip_node_id", nodeId);
      }
      const newCode = await createSession({
        ownerNodeId: nodeId,
        initialText: "",
      });
      setCode(newCode);
      track("clip_embed_session_created", {
        source: "clipboard_landing",
        timestamp: new Date().toISOString(),
      });

      // Save to recent sessions
      const saved = localStorage.getItem("syncclip_recent_sessions");
      const current = saved ? JSON.parse(saved) : [];
      const updated = [newCode, ...current.filter((c: string) => c !== newCode)].slice(0, 10);
      localStorage.setItem("syncclip_recent_sessions", JSON.stringify(updated));
    } catch (err) {
      sessionCreated.current = false;
      setCreating(false);
      sendError("InlineClipboardEmbed session creation failed", err instanceof Error ? err.message : String(err));
    } finally {
      setCreating(false);
    }
  }, [createSession, creating]);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);

    if (!hasInteracted.current) {
      hasInteracted.current = true;
      setTypewriterText(""); // clear prompt instantly on first keystroke
      track("clip_embed_interaction", {
        source: "clipboard_landing",
        timestamp: new Date().toISOString(),
      });
      await initSession();
    }
  };

  const handleCopyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyLink = () => {
    if (!code) return;
    navigator.clipboard.writeText(`https://syncclip.in/${code}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(5,125,188,1)]"
      id="live-clipboard"
      aria-label="Free online clipboard — type to start syncing"
    >
      {/* Header Bar */}
      <div className="bg-black text-white px-5 py-3 font-mono text-[10px] tracking-widest uppercase flex justify-between items-center gap-2 flex-wrap">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse block" />
          FREE ONLINE CLIPBOARD // LIVE SESSION
        </span>
        <span className="text-zinc-400">
          {code
            ? `SESSION: ${code}`
            : creating
            ? "CREATING SESSION..."
            : "TYPE TO START"}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Textarea */}
        <div className="relative">
          <textarea
            value={hasInteracted.current ? text : typewriterText}
            onChange={handleChange}
            placeholder=""
            rows={6}
            className="w-full border-2 border-black bg-zinc-50 font-mono text-sm text-black p-4 resize-none focus:outline-none focus:border-secondary focus:bg-white transition-colors"
            aria-label="Online clipboard text area — type here to sync between devices"
            spellCheck={false}
          />
          {!hasInteracted.current && (
            <div className="absolute bottom-3 right-3 font-mono text-[9px] tracking-widest uppercase text-zinc-400 select-none pointer-events-none">
              CLICK TO EDIT
            </div>
          )}
        </div>

        {/* Session Code + Actions Row */}
        {code ? (
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Code Display */}
            <div className="flex items-center gap-0 border-2 border-black flex-shrink-0">
              <div className="bg-zinc-900 text-white px-4 py-3 font-mono text-[10px] tracking-widest uppercase">
                SESSION CODE
              </div>
              <div className="bg-secondary text-black px-5 py-3 font-mono font-black text-lg tracking-[0.3em]">
                {code}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleCopyCode}
                className="border-2 border-black bg-white text-black font-mono font-bold py-2 px-4 hover:bg-black hover:text-white transition-all text-[10px] tracking-widest uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                {copied ? "COPIED ✓" : "COPY CODE"}
              </button>
              <button
                onClick={handleCopyLink}
                className="border-2 border-black bg-white text-black font-mono font-bold py-2 px-4 hover:bg-secondary hover:border-secondary hover:text-black transition-all text-[10px] tracking-widest uppercase shadow-[3px_3px_0px_0px_rgba(5,125,188,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                COPY LINK
              </button>
              <Link
                href={"/" + code}
                className="border-2 border-black bg-black text-white font-mono font-bold py-2 px-4 hover:bg-secondary hover:border-secondary hover:text-black transition-all text-[10px] tracking-widest uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] inline-block"
              >
                OPEN FULL SESSION →
              </Link>
            </div>
          </div>
        ) : (
          /* Pre-interaction state */
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="border-2 border-dashed border-zinc-300 px-4 py-3 font-mono text-[10px] tracking-widest uppercase text-zinc-400 flex-shrink-0">
              SESSION CODE GENERATES ON FIRST KEYSTROKE
            </div>
            <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase">
              No account needed. No install. Works on any device.
            </span>
          </div>
        )}

        {/* Second device instruction */}
        {code && (
          <div className="bg-zinc-100 border border-zinc-200 p-3 font-mono text-[9px] tracking-widest uppercase text-zinc-500 leading-relaxed">
            📱 ON YOUR SECOND DEVICE: Go to{" "}
            <strong className="text-black">syncclip.in/{code}</strong> or open{" "}
            <strong className="text-black">syncclip.in/join</strong> and enter code{" "}
            <strong className="text-secondary">{code}</strong> — text syncs instantly.
          </div>
        )}
      </div>
    </div>
  );
}
