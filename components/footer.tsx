import Image from "next/image";
import { LINKS, NAV_ITEMS } from "@/lib/constants";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-2 bg-purple-deep overflow-hidden">
      {/* Texture overlay (rose/teal radial glows + hatch) */}
      <div className="absolute inset-0 dark-panel-texture" />

      {/* Extra subtle glow behind brand column */}
      <div className="absolute top-1/3 left-[10%] w-[350px] h-[350px] rounded-full bg-purple-mid/8 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1140px] mx-auto px-6 pt-16 pb-7">
        {/* Gradient top divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-purple-light/30 to-transparent" />

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
            <p className="text-[0.88rem] text-white/50 leading-relaxed max-w-[300px]">
              A Premium Executive Forum for the Longevity Industry. Hosted by
              the Healthspan Collective in Playa Vista, CA.
            </p>
          </div>

          {/* Event */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-[18px] text-white/40">
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
                      className="text-[0.88rem] text-white/60 hover:text-white transition-colors"
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
            <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-[18px] text-white/40">
              Get Involved
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={LINKS.applySpeaker}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.88rem] text-white/60 hover:text-white transition-colors"
                >
                  Apply to Speak
                </a>
              </li>
              <li>
                <a
                  href={LINKS.applyPartner}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.88rem] text-white/60 hover:text-white transition-colors"
                >
                  Become a Partner
                </a>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-[18px] text-white/40">
              Follow Us
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.88rem] text-white/60 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.88rem] text-white/60 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-7 text-[0.78rem] text-white/35 gap-3.5">
          {/* Gradient bottom divider */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ marginTop: "-28px" }} />

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
    </footer>
  );
}
