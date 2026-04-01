import { LINKS, NAV_ITEMS } from "@/lib/constants";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-2 border-t border-border pt-16 pb-7 bg-bg-warm">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 font-bold text-base text-text tracking-tight">
              <div className="w-9 h-9 bg-purple-deep rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="font-black text-xs text-white tracking-wide relative z-10">
                  LLC
                </span>
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle,rgba(192,96,128,0.4),transparent)]" />
              </div>
              Longevity Leadership Conference
            </div>
            <p className="text-[0.88rem] text-text-muted leading-relaxed mt-3.5 max-w-[300px]">
              A Premium Executive Forum for the Longevity Industry. Hosted by
              the Healthspan Collective in Playa Vista, CA.
            </p>
          </div>

          {/* Event */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-[18px] text-text-secondary">
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
                      className="text-[0.88rem] text-text-muted hover:text-purple transition-colors"
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
            <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-[18px] text-text-secondary">
              Get Involved
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={LINKS.applySpeaker}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.88rem] text-text-muted hover:text-purple transition-colors"
                >
                  Apply to Speak
                </a>
              </li>
              <li>
                <a
                  href={LINKS.applyPartner}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.88rem] text-text-muted hover:text-purple transition-colors"
                >
                  Become a Partner
                </a>
              </li>
              <li>
                <a
                  href={LINKS.applyFuture}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.88rem] text-text-muted hover:text-purple transition-colors"
                >
                  Future Events
                </a>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.12em] mb-[18px] text-text-secondary">
              Follow Us
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.88rem] text-text-muted hover:text-purple transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.88rem] text-text-muted hover:text-purple transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-7 border-t border-border-light text-[0.78rem] text-text-muted gap-3.5">
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
              className="w-9 h-9 rounded-full bg-bg-muted border border-border-light flex items-center justify-center text-text-muted transition-all hover:bg-purple-deep hover:text-white hover:border-purple-deep hover:-translate-y-0.5"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-bg-muted border border-border-light flex items-center justify-center text-text-muted transition-all hover:bg-purple-deep hover:text-white hover:border-purple-deep hover:-translate-y-0.5"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
