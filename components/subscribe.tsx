"use client";

import { useState } from "react";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

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
    <section id="subscribe" className="relative z-[3] py-20 lg:py-24 bg-bg overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Stay Connected"
            title="Never Miss an Update"
            accentWord="Update"
            subtitle="Subscribe for speaker announcements, early-bird access, and exclusive insights from the longevity leadership community."
            centered
          />
        </FadeIn>

        <FadeIn delay={100}>
          <div className="max-w-[540px] mx-auto mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  disabled={status === "loading"}
                  aria-label="First name"
                  className="flex-1 bg-white border border-purple-deep/30 rounded-full py-3.5 px-6 text-[0.9rem] text-text placeholder:text-text-muted outline-none transition-all focus:border-purple-deep/60 focus:shadow-[0_0_0_3px_rgba(45,27,78,0.08)] disabled:opacity-60"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  disabled={status === "loading"}
                  aria-label="Last name"
                  className="flex-1 bg-white border border-purple-deep/30 rounded-full py-3.5 px-6 text-[0.9rem] text-text placeholder:text-text-muted outline-none transition-all focus:border-purple-deep/60 focus:shadow-[0_0_0_3px_rgba(45,27,78,0.08)] disabled:opacity-60"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={status === "loading"}
                  aria-label="Email address"
                  className="flex-1 bg-white border border-purple-deep/30 rounded-full py-3.5 px-6 text-[0.9rem] text-text placeholder:text-text-muted outline-none transition-all focus:border-purple-deep/60 focus:shadow-[0_0_0_3px_rgba(45,27,78,0.08)] disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-purple-deep text-white py-3.5 px-7 rounded-full font-bold text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(45,27,78,0.3)] whitespace-nowrap disabled:opacity-60 disabled:hover:translate-y-0"
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
              <p className="text-xs text-rose mt-3 text-center">{errorMsg}</p>
            )}
            {status !== "error" && (
              <p className="text-xs text-text-muted mt-3.5 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
