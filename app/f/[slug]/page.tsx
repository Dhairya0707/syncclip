"use client";

import { useState, useEffect, useRef, Suspense, use, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FORMS_REGISTRY, FormConfig, FormQuestion } from "@/config/forms";
import { sendInfo } from "@/utils/discord";
import { track } from "@/utils/analytics";
import { useExperiment } from "@/utils/experiments";

function DynamicFormContent({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code") || "DIRECT";

  const isFeatureCampaign = useExperiment("FEATURE_CAMPAIGN_ENABLED");
  const isFeedbackCampaign = useExperiment("FEEDBACK_CAMPAIGN_ENABLED");
  const isAnyCampaignActive = isFeatureCampaign || isFeedbackCampaign;

  const formConfig: FormConfig = FORMS_REGISTRY[slug] || FORMS_REGISTRY["feature-request"];
  const totalQuestions = formConfig.questions.length;

  // Flag redirect gate: if neither campaign flag is active, return user to room or home
  useEffect(() => {
    if (!isAnyCampaignActive) {
      if (roomCode && roomCode !== "DIRECT") {
        router.push(`/${roomCode}`);
      } else {
        router.push("/");
      }
    }
  }, [isAnyCampaignActive, roomCode, router]);

  // Step state: 'welcome' | number (0 to totalQuestions - 1) | 'thankyou'
  const [step, setStep] = useState<"welcome" | number | "thankyou">("welcome");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(3);

  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  // Auto-focus input on question change
  useEffect(() => {
    if (typeof step === "number") {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Redirect countdown timer on thank you screen
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "thankyou" && roomCode && roomCode !== "DIRECT") {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push(`/${roomCode}`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, roomCode, router]);

  const handleAnswer = useCallback((questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setErrorMsg("");
  }, []);

  const validateCurrentStep = useCallback((): boolean => {
    if (typeof step !== "number") return true;
    const currentQ = formConfig.questions[step];
    if (currentQ.required) {
      const val = answers[currentQ.id];
      if (val === undefined || val === null || (typeof val === "string" && val.trim() === "")) {
        setErrorMsg("Please answer this question to continue");
        return false;
      }
    }
    setErrorMsg("");
    return true;
  }, [step, formConfig.questions, answers]);

  const submitForm = useCallback(async () => {
    setStatus("loading");
    setErrorMsg("");

    try {
      const rawEmail = answers["contact_email"];
      const userEmail = rawEmail !== undefined && rawEmail !== null && String(rawEmail).trim() !== "" ? String(rawEmail).trim() : "Not Provided";

      const discordFields = [
        { name: "Form ID", value: formConfig.id, inline: true },
        { name: "Room Origin", value: roomCode, inline: true },
        { name: "📧 Contact Email", value: userEmail, inline: true },
        ...formConfig.questions
          .filter((q) => q.id !== "contact_email")
          .map((q) => {
            const val = answers[q.id];
            const formattedVal = val !== undefined && val !== null && String(val).trim() !== "" ? String(val) : "Not Provided";
            return {
              name: q.label,
              value: formattedVal,
            };
          }),
      ];

      await sendInfo(`Form Submission: ${formConfig.title}`, discordFields);

      const storageKey = formConfig.id === "feature-request" ? "syncclip_feature_campaign_done" : "syncclip_feedback_campaign_done";
      localStorage.setItem(storageKey, Date.now().toString());

      track("form_submitted", {
        formId: formConfig.id,
        roomCode,
        timestamp: new Date().toISOString(),
      });

      setStatus("idle");
      setStep("thankyou");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to transmit submission payload.");
    }
  }, [formConfig, roomCode, answers]);

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) return;

    if (typeof step === "number") {
      if (step < totalQuestions - 1) {
        setStep(step + 1);
      } else {
        submitForm();
      }
    }
  }, [step, totalQuestions, validateCurrentStep, submitForm]);

  const handlePrev = useCallback(() => {
    if (typeof step === "number" && step > 0) {
      setStep(step - 1);
      setErrorMsg("");
    } else if (step === 0) {
      setStep("welcome");
      setErrorMsg("");
    }
  }, [step]);

  // Keyboard navigation & shortcuts (Up/Down Arrows, Enter, Cmd+Enter, A/B/C, 0-9)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputActive = activeEl?.tagName === "INPUT" || activeEl?.tagName === "TEXTAREA";
      const isTextArea = activeEl?.tagName === "TEXTAREA";

      // Navigation: Cmd + Enter / Ctrl + Enter in textarea advances
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleNext();
        return;
      }

      // Enter key in single line inputs or buttons
      if (e.key === "Enter" && !isTextArea) {
        if (step === "welcome") {
          e.preventDefault();
          setStep(0);
          return;
        }

        if (step === "thankyou") {
          e.preventDefault();
          if (roomCode && roomCode !== "DIRECT") {
            router.push(`/${roomCode}`);
          } else {
            router.push("/");
          }
          return;
        }

        if (typeof step === "number") {
          e.preventDefault();
          handleNext();
          return;
        }
      }

      // Arrow Key Navigation (Down = Next, Up = Prev) when not actively editing text or multiline
      if (!isInputActive) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          handleNext();
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          handlePrev();
          return;
        }
      }

      // Quick Key Selection for Multiple Choice Options (A, B, C, D) & Scale (0-9)
      if (typeof step === "number" && !isInputActive) {
        const currentQ = formConfig.questions[step];

        if (currentQ.type === "select" && currentQ.options) {
          const keyUpper = e.key.toUpperCase();
          const optionIndex = keyUpper.charCodeAt(0) - 65; // 'A' -> 0, 'B' -> 1...
          if (optionIndex >= 0 && optionIndex < currentQ.options.length) {
            e.preventDefault();
            const selectedOpt = currentQ.options[optionIndex];
            handleAnswer(currentQ.id, selectedOpt);
            setTimeout(() => {
              if (step < totalQuestions - 1) {
                setStep(step + 1);
              } else {
                submitForm();
              }
            }, 180);
          }
        }

        if (currentQ.type === "scale") {
          const num = parseInt(e.key, 10);
          if (!isNaN(num) && num >= 0 && num <= 10) {
            e.preventDefault();
            handleAnswer(currentQ.id, num);
            setTimeout(() => {
              if (step < totalQuestions - 1) {
                setStep(step + 1);
              } else {
                submitForm();
              }
            }, 180);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, formConfig.questions, totalQuestions, handleNext, handlePrev, handleAnswer, submitForm, roomCode, router]);

  const progressPercent = typeof step === "number" ? Math.round(((step + 1) / totalQuestions) * 100) : step === "thankyou" ? 100 : 0;

  return (
    <div className="bg-surface text-black font-body h-screen w-screen overflow-hidden flex flex-col justify-between selection:bg-secondary selection:text-white relative">
      {/* Top Header Bar & Progress */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black text-white h-12 flex justify-between items-center px-4 sm:px-6 border-b-2 border-black font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <Link href={roomCode && roomCode !== "DIRECT" ? `/${roomCode}` : "/"} className="font-serif italic font-black text-white hover:text-secondary transition-colors">
            SYNCCLIP
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-secondary font-bold truncate max-w-[140px] sm:max-w-none">{formConfig.title}</span>
        </div>

        {roomCode && roomCode !== "DIRECT" && (
          <div className="bg-zinc-900 text-secondary px-2.5 py-0.5 sm:px-3 sm:py-1 font-bold text-[9px] sm:text-[10px] tracking-widest border border-secondary">
            NODE: {roomCode}
          </div>
        )}
      </header>

      {/* Thin Animated Top Progress Line */}
      {typeof step === "number" && (
        <div className="fixed top-12 left-0 w-full h-1.5 bg-zinc-800 z-50">
          <div
            className="h-full bg-secondary transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Main Full-Screen Body Container */}
      <main className="flex-grow flex items-center justify-center pt-16 pb-20 px-4 sm:px-8 max-w-2xl mx-auto w-full overflow-y-auto max-h-screen">
        {/* 1. WELCOME / START SCREEN */}
        {step === "welcome" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 w-full">
            <div className="font-mono text-[10px] tracking-[0.25em] text-secondary mb-3 uppercase font-bold">
              {formConfig.badge}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-headline text-zinc-950 mb-4 leading-tight">
              {formConfig.title}
            </h1>

            <p className="font-body text-base sm:text-lg text-zinc-600 leading-relaxed font-normal mb-8">
              {formConfig.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 mb-10 text-[11px] font-mono text-zinc-600 uppercase tracking-widest">
              <span className="bg-secondary text-white px-3 py-1 font-bold border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">⚡ TAKES ~30 SECONDS</span>
              <span>•</span>
              <span className="bg-zinc-100 text-zinc-800 px-2 py-0.5 border border-zinc-300">NO LOGIN REQUIRED</span>
              <span>•</span>
              <span className="bg-zinc-100 text-zinc-800 px-2 py-0.5 border border-zinc-300">DISCORD UPLINK</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => setStep(0)}
                className="bg-secondary text-white font-label font-bold py-4 px-8 border-2 border-black hover:bg-black hover:border-black transition-all uppercase tracking-widest text-xs shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-3 cursor-pointer"
              >
                <span>START FORM</span>
                <span className="font-mono text-[10px] bg-black text-white px-2 py-0.5 border border-white/20">↵ ENTER</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. TYPEFORM QUESTION STEP */}
        {typeof step === "number" && (
          <div key={step} className="animate-in fade-in slide-in-from-bottom-4 duration-250 w-full my-auto">
            {/* Question Counter Badge */}
            <div className="flex items-center gap-2 mb-3 font-mono text-xs text-secondary font-bold tracking-widest uppercase">
              <span>{String(step + 1).padStart(2, "0")}</span>
              <span>→</span>
              <span className="text-zinc-500 font-medium">QUESTION {step + 1} OF {totalQuestions}</span>
            </div>

            {/* Question Title */}
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight font-headline text-zinc-950 mb-3 leading-snug">
              {formConfig.questions[step].label}
              {formConfig.questions[step].required && <span className="text-red-500 ml-1.5">*</span>}
            </h2>

            {formConfig.questions[step].description && (
              <p className="font-body text-xs sm:text-sm text-zinc-500 mb-6 font-normal">
                {formConfig.questions[step].description}
              </p>
            )}

            {errorMsg && (
              <div className="bg-red-500 text-white p-3 border-2 border-black font-mono text-xs mb-6 uppercase font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ⚠ {errorMsg}
              </div>
            )}

            {/* INPUT TYPE: TEXTAREA */}
            {formConfig.questions[step].type === "textarea" && (
              <div className="space-y-2.5">
                <textarea
                  ref={inputRef as any}
                  rows={4}
                  value={answers[formConfig.questions[step].id] || ""}
                  onChange={(e) => handleAnswer(formConfig.questions[step].id, e.target.value)}
                  placeholder={formConfig.questions[step].placeholder}
                  className="w-full bg-white border-2 border-black p-4 font-body text-base sm:text-lg text-zinc-900 placeholder:font-body placeholder:text-zinc-400 placeholder:text-base focus:outline-none focus:border-secondary shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
                />
                <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                  Press <strong className="text-black bg-zinc-200 px-1 font-bold">Cmd + Enter</strong> or click Next to advance
                </div>
              </div>
            )}

            {/* INPUT TYPE: TEXT */}
            {formConfig.questions[step].type === "text" && (
              <input
                ref={inputRef as any}
                type="text"
                value={answers[formConfig.questions[step].id] || ""}
                onChange={(e) => handleAnswer(formConfig.questions[step].id, e.target.value)}
                placeholder={formConfig.questions[step].placeholder}
                className="w-full bg-white border-2 border-black p-4 font-body text-base sm:text-lg text-zinc-900 placeholder:font-body placeholder:text-zinc-400 placeholder:text-base focus:outline-none focus:border-secondary shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            )}

            {/* INPUT TYPE: SELECT (MULTIPLE CHOICE WITH KEYBINDINGS A, B, C, D) */}
            {formConfig.questions[step].type === "select" && formConfig.questions[step].options && (
              <div className="space-y-2.5">
                {formConfig.questions[step].options!.map((opt, idx) => {
                  const letterKey = String.fromCharCode(65 + idx); // A, B, C...
                  const isSelected = answers[formConfig.questions[step].id] === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => {
                        handleAnswer(formConfig.questions[step].id, opt);
                        setTimeout(() => handleNext(), 180);
                      }}
                      className={`w-full text-left p-4 font-body text-base border-2 border-black transition-all flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${
                        isSelected
                          ? "bg-secondary text-white border-black font-bold"
                          : "bg-white text-zinc-900 hover:border-secondary hover:bg-zinc-50"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`font-mono text-xs font-black px-2 py-0.5 border border-black ${isSelected ? "bg-black text-white border-black" : "bg-zinc-100 text-black"}`}>
                          {letterKey}
                        </span>
                        <span className="font-medium">{opt}</span>
                      </div>
                      {isSelected && <span className="font-mono text-white font-black text-base">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* INPUT TYPE: SCALE (0-10 RATING WITH NUMBER KEYS 0-9) */}
            {formConfig.questions[step].type === "scale" && (
              <div>
                <div className="grid grid-cols-6 sm:grid-cols-11 gap-2 mb-3">
                  {Array.from({ length: 11 }, (_, i) => i).map((num) => {
                    const isSelected = answers[formConfig.questions[step].id] === num;
                    return (
                      <button
                        type="button"
                        key={num}
                        onClick={() => {
                          handleAnswer(formConfig.questions[step].id, num);
                          setTimeout(() => handleNext(), 180);
                        }}
                        className={`p-3 sm:p-4 font-mono text-sm sm:text-base font-black border-2 border-black text-center transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${
                          isSelected
                            ? "bg-secondary text-white border-black scale-105"
                            : "bg-white text-black hover:bg-secondary hover:text-white"
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest px-1">
                  <span>0 = NOT LIKELY</span>
                  <span>10 = EXTREMELY LIKELY</span>
                </div>
              </div>
            )}

            {/* Question Action Controls */}
            <div className="mt-7 flex items-center gap-3">
              <button
                onClick={handleNext}
                disabled={status === "loading"}
                className="bg-secondary text-white font-label font-bold py-3.5 px-6 border-2 border-black hover:bg-black hover:border-black transition-all uppercase tracking-widest text-xs shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2.5 cursor-pointer"
              >
                <span>{step === totalQuestions - 1 ? (status === "loading" ? "TRANSMITTING..." : "SUBMIT FORM") : "OK / NEXT"}</span>
                <span className="font-mono text-[10px] bg-black text-white px-2 py-0.5 border border-white/20">↵ ENTER</span>
              </button>

              {step > 0 && (
                <button
                  onClick={handlePrev}
                  className="bg-white text-black font-label font-bold py-3.5 px-4 border-2 border-black hover:bg-zinc-200 transition-all uppercase tracking-widest text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  ↑ PREV
                </button>
              )}
            </div>
          </div>
        )}

        {/* 3. THANK YOU / ENDING SCREEN */}
        {step === "thankyou" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 w-full text-center">
            <div className="bg-white border-3 border-black p-6 sm:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="font-mono text-[10px] tracking-[0.25em] text-secondary mb-3 uppercase font-bold">
                SUBMISSION ACKNOWLEDGED // FOUNDER DIRECT READ
              </div>

              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-headline text-black mb-4 leading-none">
                You&apos;re Awesome ❤️
              </h1>

              <p className="font-body text-base sm:text-lg text-zinc-700 leading-relaxed font-medium mb-4">
                Every single submission is read directly by the founder. The best community ideas and friction fixes are usually shipped within days, not months!
              </p>

              <div className="font-mono text-xs text-zinc-500 mb-6 uppercase tracking-wider">
                ⚡ Check back soon to see what the community has built.
              </div>

              {roomCode && roomCode !== "DIRECT" && (
                <div className="bg-zinc-100 border border-black p-3.5 mb-6 font-mono text-xs text-black">
                  Redirecting back to room <strong className="text-secondary">{roomCode}</strong> in {countdown} seconds...
                </div>
              )}

              <button
                onClick={() => {
                  if (roomCode && roomCode !== "DIRECT") {
                    router.push(`/${roomCode}`);
                  } else {
                    router.push("/");
                  }
                }}
                className="w-full bg-secondary text-white font-label font-bold py-4 px-6 border-2 border-black hover:bg-black hover:border-black transition-all uppercase tracking-widest text-xs shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                {roomCode && roomCode !== "DIRECT" ? `RETURN TO ROOM (${roomCode}) ↵` : "RETURN TO HOME ↵"}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation Bar & Shortcuts Hint */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-black text-white h-12 flex justify-between items-center px-4 sm:px-6 border-t-2 border-black font-mono text-[9px] sm:text-[10px] uppercase tracking-widest">
        <div className="flex items-center gap-3 text-zinc-400 truncate">
          {typeof step === "number" && (
            <>
              <span className="hidden md:inline">Use <strong className="text-white">A, B, C</strong> or <strong className="text-white">0-9</strong> keys to pick answers</span>
              <span className="hidden md:inline">•</span>
              <span>Use <strong className="text-white">↑ ↓ Arrows</strong> or <strong className="text-white">↵ Enter</strong></span>
            </>
          )}
          {step === "welcome" && <span>Press <strong className="text-white">↵ Enter</strong> to start</span>}
        </div>

        {typeof step === "number" && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className="bg-zinc-900 text-white px-2.5 py-1 hover:bg-secondary disabled:opacity-30 border border-zinc-700 transition-all cursor-pointer text-[9px] sm:text-[10px]"
              title="Previous question (Arrow Up)"
            >
              ▲ PREV
            </button>
            <button
              onClick={handleNext}
              className="bg-secondary text-white px-2.5 py-1 font-bold hover:bg-white hover:text-black border border-secondary transition-all cursor-pointer text-[9px] sm:text-[10px]"
              title="Next question (Arrow Down)"
            >
              ▼ NEXT
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}

export default function DynamicFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return (
    <Suspense fallback={<div className="bg-surface min-h-screen p-12 font-mono text-xs text-black">Loading form...</div>}>
      <DynamicFormContent slug={resolvedParams.slug} />
    </Suspense>
  );
}
