"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, Tag, CircleCheck, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";

const STORAGE_KEY = "llc_promo_dismissed";
const DELAY_MS = 30_000; // 30 seconds
const COUPON_CODE = "LLCSUBR15";

export function PromoPopup() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [revealVisible, setRevealVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const timer = setTimeout(() => {
      setShow(true);
      track("Promo Popup Shown");
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [mounted]);

  // Trigger entrance animation
  useEffect(() => {
    if (show) {
      requestAnimationFrame(() => setVisible(true));
    }
  }, [show]);

  // Trigger coupon reveal animation
  useEffect(() => {
    if (status === "success") {
      requestAnimationFrame(() => setRevealVisible(true));
    }
  }, [status]);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setShow(false);
      try {
        localStorage.setItem(STORAGE_KEY, new Date().toISOString());
      } catch {
        // localStorage unavailable
      }
    }, 300);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: "", lastName: "" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setEmail("");
      track("Subscribe", { source: "popup", coupon: COUPON_CODE });

      // Mark as dismissed so popup won't reappear
      try {
        localStorage.setItem(STORAGE_KEY, new Date().toISOString());
      } catch {
        // localStorage unavailable
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    track("Coupon Copy", { code: COUPON_CODE });
    setTimeout(() => setCopied(false), 3000);
  }

  if (!show || !mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-5 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
      onClick={status === "success" ? undefined : dismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Popup card */}
      <div
        className={cn(
          "relative w-full max-w-[420px] max-h-[90vh] overflow-y-auto rounded-[20px] shadow-[0_25px_80px_rgba(0,0,0,0.25)] transition-all duration-300",
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {status === "success" ? (
          /* ── Coupon Reveal ── */
          <div className="bg-bg px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8">
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center text-text-muted hover:text-text hover:bg-black/[0.08] transition-all duration-200 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>

            <div
              className={`text-center transition-all duration-500 ease-out ${
                revealVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
            >
              {/* Success icon */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-pale flex items-center justify-center">
                  <CircleCheck className="w-6 h-6 sm:w-7 sm:h-7 text-purple" />
                </div>
              </div>

              {/* Heading */}
              <h3 className="font-serif text-[1.25rem] sm:text-[1.5rem] font-bold text-text mb-1.5 sm:mb-2">
                You&rsquo;re on the list!
              </h3>
              <p className="text-[0.85rem] sm:text-[0.88rem] text-text-secondary leading-relaxed mb-4 sm:mb-5">
                Here&rsquo;s your exclusive discount as a welcome gift.
              </p>

              {/* Decorative separator */}
              <div className="flex justify-center mb-4 sm:mb-5">
                <div className="w-full max-w-[120px] h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
              </div>

              {/* Coupon block */}
              <div className="bg-purple-pale/60 border border-purple/[0.12] rounded-[14px] px-4 py-4 sm:px-6 sm:py-5 mb-3 sm:mb-4">
                <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-purple-mid block mb-2">
                  Your Discount Code
                </span>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-mono text-[1.1rem] sm:text-[1.35rem] font-bold text-purple-deep tracking-[0.12em] sm:tracking-[0.15em]">
                    {COUPON_CODE}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-purple-mid hover:text-purple-deep transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Fine print */}
              <p className="text-[0.78rem] text-text-muted mb-4 sm:mb-5">
                Apply code at checkout for 15% off any ticket.
              </p>

              {/* CTA */}
              <Link
                href="/tickets"
                onClick={() =>
                  track("Ticket Click", { location: "promo-popup" })
                }
                className="inline-flex w-full justify-center bg-purple-deep text-white py-3.5 rounded-full font-bold text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(45,27,78,0.3)]"
              >
                Get Your Tickets
              </Link>
            </div>
          </div>
        ) : (
          /* ── Subscribe Form ── */
          <>
            {/* Purple gradient header band */}
            <div className="relative bg-gradient-to-br from-purple-deep via-[#3c2066] to-[#2d1b4e] px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8 text-center overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,124,224,0.2),transparent_60%)] pointer-events-none" />

              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4 stroke-[1.5]" />
              </button>

              {/* Icon */}
              <div className="relative z-[1] flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.1] border border-white/[0.15] flex items-center justify-center">
                  <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-purple-light" />
                </div>
              </div>

              {/* Label */}
              <span className="relative z-[1] text-[0.6rem] font-bold tracking-[0.25em] uppercase text-purple-light/70 block mb-2">
                Exclusive Offer
              </span>

              {/* Heading */}
              <h3 className="relative z-[1] text-[1.3rem] sm:text-[1.5rem] font-bold text-white leading-tight tracking-tight">
                Unlock 15% Off Tickets
              </h3>
            </div>

            {/* Light content area with email form */}
            <div className="bg-bg px-6 pt-5 pb-6 sm:px-8 sm:pt-6 sm:pb-8 text-center">
              <p className="text-[0.85rem] sm:text-[0.88rem] text-text-secondary leading-relaxed mb-4 sm:mb-5">
                Enter your email to receive an exclusive discount code for
                the Longevity Leadership Conference.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={status === "loading"}
                  aria-label="Email address"
                  className="w-full bg-white border border-purple-deep/30 rounded-full py-3.5 px-6 text-[0.9rem] text-text placeholder:text-text-muted outline-none transition-all focus:border-purple-deep/60 focus:shadow-[0_0_0_3px_rgba(45,27,78,0.08)] disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-purple-deep text-white py-3.5 rounded-full font-bold text-[0.9rem] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(45,27,78,0.3)] cursor-pointer disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "loading"
                    ? "Subscribing..."
                    : "Unlock My Discount"}
                </button>
              </form>

              {status === "error" && (
                <p className="text-xs text-rose mt-2.5 text-center">
                  {errorMsg}
                </p>
              )}

              {/* Dismiss text */}
              <button
                onClick={dismiss}
                className="mt-3 text-[0.72rem] text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
              >
                No thanks
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
