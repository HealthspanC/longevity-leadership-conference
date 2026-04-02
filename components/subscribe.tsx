"use client";

import { useState } from "react";
import { FadeIn } from "./fade-in";

export function Subscribe() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <section id="subscribe" className="relative z-2 pt-28 lg:pt-32 pb-0 bg-gradient-to-b from-bg from-60% to-purple-deep">
      <div className="max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <div className="dark-panel-texture bg-purple-deep rounded-[28px] py-20 px-8 md:px-14 text-center relative overflow-hidden shadow-[0_20px_60px_rgba(45,27,78,0.2)]">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.25em] uppercase text-purple-light mb-3.5 before:content-[''] before:w-6 before:h-px before:bg-purple-light">
                Stay Connected
              </span>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-white mb-3.5">
                Never Miss an Update
              </h2>
              <p className="text-base text-white/65 mb-9 max-w-[460px] mx-auto leading-relaxed">
                Subscribe for speaker announcements, early-bird access, and
                exclusive insights from the longevity leadership community.
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2.5 max-w-[460px] mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    disabled={status === "loading"}
                    aria-label="First name"
                    className="flex-1 bg-white/10 border border-white/15 rounded-full py-4 px-6 text-[0.95rem] text-white placeholder:text-white/40 outline-none transition-all focus:border-white/30 focus:bg-white/15 disabled:opacity-60"
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    disabled={status === "loading"}
                    aria-label="Last name"
                    className="flex-1 bg-white/10 border border-white/15 rounded-full py-4 px-6 text-[0.95rem] text-white placeholder:text-white/40 outline-none transition-all focus:border-white/30 focus:bg-white/15 disabled:opacity-60"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={status === "loading"}
                    aria-label="Email address"
                    className="flex-1 bg-white/10 border border-white/15 rounded-full py-4 px-6 text-[0.95rem] text-white placeholder:text-white/40 outline-none transition-all focus:border-white/30 focus:bg-white/15 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-white text-purple-deep py-4 px-7 rounded-full font-bold text-[0.95rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)] whitespace-nowrap disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === "loading"
                      ? "Subscribing..."
                      : status === "success"
                        ? "Subscribed!"
                        : "Subscribe"}
                  </button>
                </div>
              </form>
              {status === "error" && (
                <p className="text-xs text-rose-light mt-3">{errorMsg}</p>
              )}
              {status !== "error" && (
                <p className="text-xs text-white/35 mt-3.5">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              )}
            </div>
          </div>
        </FadeIn>
        <div className="h-16 lg:h-20" />
      </div>
    </section>
  );
}
