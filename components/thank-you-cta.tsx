"use client";

import { useState, useEffect } from "react";
import { CircleCheck, ArrowRight } from "lucide-react";

/**
 * Hero-mounted closing CTA. Shown after the 2026 conference ended.
 * Captures first/last name + email and posts to /api/subscribe (Moosend).
 *
 * Visual pairs the existing dark/glassmorphic hero aesthetic. Designed to
 * sit in the right column of the lg:grid-cols-2 hero on desktop and to
 * stack cleanly under the headline copy on mobile.
 */
export function ThankYouCTA() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    if (status === "success") {
      requestAnimationFrame(() => setSuccessVisible(true));
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <div className="relative w-full max-w-[460px] mx-auto">
      {/* Soft atmospheric glow behind card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -m-8 rounded-[40px] bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.28)_0%,rgba(139,92,246,0.08)_45%,transparent_75%)] blur-2xl"
      />

      <div className="relative z-[1] bg-white/[0.07] backdrop-blur-xl border border-white/[0.15] rounded-[24px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        {status === "success" ? (
          <div
            className={`text-center py-4 transition-all duration-500 ease-out ${
              successVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-purple-light/20 border border-purple-light/30 flex items-center justify-center">
                <CircleCheck className="w-7 h-7 text-purple-light" />
              </div>
            </div>
            <h3 className="font-bold text-2xl text-white mb-2">You&rsquo;re on the list!</h3>
            <p className="text-sm text-white/70">We hope to see you at our next event!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <span className="text-[0.75rem] font-semibold tracking-[0.28em] uppercase text-purple-light/80 block mb-3">
                With Gratitude
              </span>
              <p className="text-[1rem] sm:text-[1.05rem] text-white/85 leading-relaxed">
                A heartfelt thank you to all of our sponsors, speakers, volunteers, and attendees for an incredible event this year. We&rsquo;ll be back in 2027 &mdash; Don&rsquo;t miss out!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  disabled={status === "loading"}
                  aria-label="First name"
                  className="flex-1 min-w-0 bg-white/[0.08] border border-white/[0.15] rounded-full py-3 px-5 text-[0.875rem] text-white placeholder:text-white/40 outline-none transition-all focus:border-purple-light/60 focus:bg-white/[0.12] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] disabled:opacity-60"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  disabled={status === "loading"}
                  aria-label="Last name"
                  className="flex-1 min-w-0 bg-white/[0.08] border border-white/[0.15] rounded-full py-3 px-5 text-[0.875rem] text-white placeholder:text-white/40 outline-none transition-all focus:border-purple-light/60 focus:bg-white/[0.12] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] disabled:opacity-60"
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                disabled={status === "loading"}
                aria-label="Email address"
                className="w-full bg-white/[0.08] border border-white/[0.15] rounded-full py-3 px-5 text-[0.875rem] text-white placeholder:text-white/40 outline-none transition-all focus:border-purple-light/60 focus:bg-white/[0.12] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group w-full bg-white text-purple-deep py-3.5 rounded-full font-bold text-[0.9rem] transition-all hover:bg-purple-deep hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.4)] inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer"
              >
                {status === "loading" ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe for Updates
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {status === "error" ? (
              <p className="text-xs text-rose-light mt-3 text-center">{errorMsg}</p>
            ) : (
              <p className="text-[0.85rem] text-white/55 mt-3.5 text-center">
                Be the first to know about future events.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
