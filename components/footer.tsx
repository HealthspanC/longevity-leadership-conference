"use client";

import { useState } from "react";
import Image from "next/image";
import { LINKS, NAV_ITEMS } from "@/lib/constants";
import { Instagram, Linkedin } from "lucide-react";
import { FadeIn } from "./fade-in";

function SubscribeForm() {
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
    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 gap-6">
      {/* Left: text */}
      <div className="lg:flex-1 text-center lg:text-left">
        <h3 className="font-serif text-[1.4rem] font-bold text-white mb-1.5">
          Never Miss an Update
        </h3>
        <p className="text-[0.85rem] text-white/50 leading-relaxed">
          Subscribe for speaker announcements, early-bird access, and exclusive insights.
        </p>
      </div>

      {/* Right: form */}
      <div className="lg:flex-1">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              disabled={status === "loading"}
              aria-label="First name"
              className="flex-1 bg-white/[0.07] border border-white/[0.12] rounded-full py-2.5 px-5 text-[0.85rem] text-white placeholder:text-white/35 outline-none transition-all focus:border-purple-light/40 focus:bg-white/[0.1] disabled:opacity-60"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              disabled={status === "loading"}
              aria-label="Last name"
              className="flex-1 bg-white/[0.07] border border-white/[0.12] rounded-full py-2.5 px-5 text-[0.85rem] text-white placeholder:text-white/35 outline-none transition-all focus:border-purple-light/40 focus:bg-white/[0.1] disabled:opacity-60"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status === "loading"}
              aria-label="Email address"
              className="flex-1 bg-white/[0.07] border border-white/[0.12] rounded-full py-2.5 px-5 text-[0.85rem] text-white placeholder:text-white/35 outline-none transition-all focus:border-purple-light/40 focus:bg-white/[0.1] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-purple-deep py-2.5 px-6 rounded-full font-bold text-[0.85rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)] whitespace-nowrap disabled:opacity-60 disabled:hover:translate-y-0"
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
          <p className="text-xs text-rose-light mt-2">{errorMsg}</p>
        )}
        {status !== "error" && (
          <p className="text-xs text-white/30 mt-2 text-center sm:text-left">
            We respect your privacy. Unsubscribe at any time.
          </p>
        )}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="subscribe" className="relative z-2 bg-purple-deep overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 dark-panel-texture" />

      {/* Ambient glows */}
      <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full bg-purple-mid/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-rose/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1140px] mx-auto px-6">
        {/* Subscribe area */}
        <div className="pt-14 lg:pt-16 pb-12 lg:pb-14">
          <FadeIn>
            <SubscribeForm />
          </FadeIn>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

        {/* Footer links */}
        <div className="pt-14 pb-7">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12 mb-12">
            {/* Brand */}
            <div>
              <Image
                src="/brand/logo-white.png"
                alt="Healthspan Collective"
                width={3230}
                height={786}
                className="h-[52px] w-auto mb-4"
              />
              <p className="text-[0.85rem] text-white/45 leading-relaxed max-w-[300px]">
                A Premium Executive Forum for the Longevity Industry. Hosted by
                the Healthspan Collective in Playa Vista, CA.
              </p>
            </div>

            {/* Event */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-[18px] text-white/35">
                Event
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[...NAV_ITEMS.slice(0, 3), { label: "Buy Tickets", href: LINKS.tickets }].map(
                  (item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[0.85rem] text-white/55 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-[18px] text-white/35">
                Get Involved
              </h4>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a
                    href={LINKS.applySpeaker}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.85rem] text-white/55 hover:text-white transition-colors"
                  >
                    Apply to Speak
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.applyPartner}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.85rem] text-white/55 hover:text-white transition-colors"
                  >
                    Become a Partner
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-[18px] text-white/35">
                Follow Us
              </h4>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a
                    href={LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.85rem] text-white/55 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.85rem] text-white/55 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative flex flex-col md:flex-row items-center justify-between pt-7 text-[0.78rem] text-white/30 gap-3.5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            <span>
              &copy; {new Date().getFullYear()} Longevity Leadership Conference.
              All rights reserved.
            </span>
            <div className="flex gap-2.5">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white/50 transition-all hover:bg-white/[0.14] hover:text-white hover:border-white/[0.2] hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white/50 transition-all hover:bg-white/[0.14] hover:text-white hover:border-white/[0.2] hover:-translate-y-0.5"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
