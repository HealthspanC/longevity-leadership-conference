import { SITE, LINKS } from "@/lib/constants";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { FadeIn } from "./fade-in";
import { Countdown } from "./countdown";
import { HeroVideo } from "./hero-video";

const details = [
  { icon: Calendar, label: "Date", value: SITE.date },
  { icon: Clock, label: "Time", value: SITE.time },
  { icon: MapPin, label: "Venue", value: SITE.venue },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-2 min-h-screen flex items-center pt-36 pb-24 overflow-visible"
    >
      {/* Video background */}
      <HeroVideo />

      <div className="relative z-10 max-w-[1140px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h1 className="font-serif text-[clamp(2.6rem,5.5vw,4.2rem)] font-bold leading-[1.2] mb-6 tracking-tight overflow-visible pb-1 text-white">
              Longevity
              <br />
              Leadership
              <br />
              <em className="text-purple-light">Conference</em>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed mb-9 max-w-[520px]">
              {SITE.description}
            </p>

            <div className="flex flex-wrap gap-3 md:gap-5 mb-10">
              {details.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-[12px] py-3.5 px-5 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-[10px] bg-white/[0.1] flex items-center justify-center text-purple-light shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-[0.1em] text-white/50 font-semibold">
                      {label}
                    </div>
                    <div className="font-bold text-sm text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3.5 items-center">
              <a
                href={LINKS.tickets}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-white text-purple-deep py-4 px-9 rounded-full font-bold text-[0.95rem] transition-all hover:bg-purple-light hover:text-purple-deep hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(255,255,255,0.15)] relative overflow-hidden"
              >
                Reserve Your Seat
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2.5 border-[1.5px] border-white/30 text-white py-[15px] px-8 rounded-full font-semibold text-[0.95rem] transition-all hover:border-white/60 hover:text-white hover:-translate-y-0.5"
              >
                Learn More
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="relative flex items-center justify-center max-w-[400px] mx-auto lg:max-w-none">
              {/* Radial glow */}
              <div className="absolute w-[520px] h-[520px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,rgba(139,92,246,0.04)_40%,transparent_70%)]" />

              {/* Inner arc — clockwise, 60s */}
              <div className="absolute w-[280px] h-[280px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block animate-[spin_60s_linear_infinite]">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 280" fill="none">
                  <defs>
                    <linearGradient id="arc1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgb(167,139,250)" stopOpacity="0.55" />
                      <stop offset="50%" stopColor="rgb(139,92,246)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <circle cx="140" cy="140" r="138" stroke="url(#arc1)" strokeWidth="1.5" strokeDasharray="430 438" strokeLinecap="round" />
                </svg>
                {/* Orbiting dot at arc head */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-light/80 shadow-[0_0_12px_4px_rgba(139,92,246,0.6)]" />
                </div>
              </div>

              {/* Middle arc — counter-clockwise, 45s */}
              <div className="absolute w-[380px] h-[380px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block animate-[spin_45s_linear_infinite_reverse]">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 380 380" fill="none">
                  <defs>
                    <linearGradient id="arc2" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(167,139,250)" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="rgb(139,92,246)" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <circle cx="190" cy="190" r="188" stroke="url(#arc2)" strokeWidth="1.2" strokeDasharray="580 602" strokeLinecap="round" />
                </svg>
                {/* Orbiting dot at arc head */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div className="w-2 h-2 rounded-full bg-purple-light/60 shadow-[0_0_10px_3px_rgba(139,92,246,0.45)]" />
                </div>
                {/* Secondary dot */}
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-light/45 shadow-[0_0_8px_2px_rgba(139,92,246,0.3)]" />
                </div>
              </div>

              {/* Outer arc — clockwise, 80s */}
              <div className="absolute w-[480px] h-[480px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block animate-[spin_80s_linear_infinite]">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480" fill="none">
                  <defs>
                    <linearGradient id="arc3" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgb(167,139,250)" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="rgb(139,92,246)" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <circle cx="240" cy="240" r="238" stroke="url(#arc3)" strokeWidth="1" strokeDasharray="730 768" strokeLinecap="round" />
                </svg>
                {/* Orbiting dot */}
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-light/45 shadow-[0_0_8px_3px_rgba(139,92,246,0.35)]" />
                </div>
              </div>
              <Countdown />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
