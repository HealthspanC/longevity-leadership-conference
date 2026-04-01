import { SITE, LINKS } from "@/lib/constants";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { FadeIn } from "./fade-in";
import { Countdown } from "./countdown";

const details = [
  { icon: Calendar, label: "Date", value: SITE.date },
  { icon: Clock, label: "Time", value: SITE.time },
  { icon: MapPin, label: "Venue", value: SITE.venue },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-2 min-h-screen flex items-center pt-36 pb-24 bg-[linear-gradient(180deg,var(--color-bg)_0%,var(--color-purple-wash)_40%,var(--color-bg)_100%)] overflow-visible"
    >
      {/* Molecular background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(91,58,140,0.04)_0%,transparent_50%),radial-gradient(circle_at_85%_60%,rgba(192,96,128,0.03)_0%,transparent_40%),radial-gradient(circle_at_50%_90%,rgba(42,122,110,0.03)_0%,transparent_40%)]" />
      </div>

      <div className="max-w-[1140px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h1 className="font-serif text-[clamp(2.6rem,5.5vw,4.2rem)] font-bold leading-[1.2] mb-6 tracking-tight overflow-visible pb-1">
              Longevity
              <br />
              Leadership
              <br />
              <em className="text-purple">Conference</em>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-9 max-w-[520px]">
              {SITE.description}
            </p>

            <div className="flex flex-wrap gap-3 md:gap-5 mb-10">
              {details.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-bg-card border border-border-light rounded-[12px] py-3.5 px-5 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-[10px] bg-purple-wash flex items-center justify-center text-purple shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-[0.1em] text-text-muted font-semibold">
                      {label}
                    </div>
                    <div className="font-bold text-sm text-text">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3.5 items-center">
              <a
                href={LINKS.tickets}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-purple-deep text-white py-4 px-9 rounded-full font-bold text-[0.95rem] transition-all hover:bg-purple hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(45,27,78,0.25)] relative overflow-hidden"
              >
                Reserve Your Seat
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2.5 border-[1.5px] border-border text-text py-[15px] px-8 rounded-full font-semibold text-[0.95rem] transition-all hover:border-purple hover:text-purple hover:-translate-y-0.5"
              >
                Learn More
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="relative flex items-center justify-center max-w-[400px] mx-auto lg:max-w-none">
              {/* Decorative rings */}
              <div className="absolute border border-border-light rounded-full w-[340px] h-[340px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
              <div className="absolute border border-dashed border-border-light/50 rounded-full w-[420px] h-[420px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
              <div className="absolute border border-border-light/30 rounded-full w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
              <Countdown />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
