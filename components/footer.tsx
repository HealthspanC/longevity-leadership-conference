"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { LINKS, NAV_ITEMS } from "@/lib/constants";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-2 bg-purple-deep overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 dark-panel-texture" />

      {/* Ambient glows */}
      <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full bg-purple-mid/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-rose/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1140px] mx-auto px-6">
        <div className="pt-14 pb-7">
          {/* Brand — centered on mobile, left on desktop */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start mb-10 lg:mb-0 lg:float-left lg:max-w-[320px] lg:mr-12">
            <Image
              src="/brand/logo-white.png"
              alt="Healthspan Collective"
              width={3230}
              height={786}
              className="h-[44px] md:h-[52px] w-auto mb-4"
            />
            <p className="text-[0.85rem] text-white/45 leading-relaxed max-w-[300px]">
              A Premium Forum for the Longevity Industry. Hosted by
              the Healthspan Collective and Mission Matters in Playa Vista, CA.
            </p>
          </div>

          {/* Link columns — 2-col on mobile, 3-col row on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 mb-10 lg:mb-12 lg:overflow-hidden">
            {/* Event */}
            <div className="text-center md:text-left">
              <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-4 md:mb-[18px] text-white/35">
                Event
              </h4>
              <ul className="flex flex-col gap-2 md:gap-2.5 items-center md:items-start">
                {[...NAV_ITEMS.slice(0, 3), { label: "Buy Tickets", href: LINKS.tickets }].map(
                  (item) => (
                    <li key={item.label}>
                      <a
                        href={item.href.startsWith("#") ? "/" + item.href : item.href}
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
            <div className="text-center md:text-left">
              <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-4 md:mb-[18px] text-white/35">
                Get Involved
              </h4>
              <ul className="flex flex-col gap-2 md:gap-2.5 items-center md:items-start">
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
                    onClick={() => track('Partner Click', { location: 'footer' })}
                    className="text-[0.85rem] text-white/55 hover:text-white transition-colors"
                  >
                    Become a Partner
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow — icon row on mobile, text list on desktop */}
            <div className="col-span-2 md:col-span-1 text-center md:text-left">
              <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-4 md:mb-[18px] text-white/35">
                Follow Us
              </h4>
              {/* Mobile: icon buttons */}
              <div className="flex gap-3 justify-center md:hidden">
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 transition-all hover:bg-white/[0.14] hover:text-white"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 transition-all hover:bg-white/[0.14] hover:text-white"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
              </div>
              {/* Desktop: text links */}
              <ul className="hidden md:flex flex-col gap-2.5 items-start">
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

          {/* Clear float */}
          <div className="clear-both" />

          {/* Bottom bar */}
          <div className="relative flex flex-col md:flex-row items-center justify-between pt-7 text-[0.78rem] text-white/30 gap-3.5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            <span className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Longevity Leadership Conference.
              All rights reserved.
            </span>
            <div className="hidden md:flex gap-2.5">
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
