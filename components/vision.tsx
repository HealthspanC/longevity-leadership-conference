"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  Stethoscope,
  Rocket,
  TrendingUp,
  Briefcase,
  Users,
  Signal,
  Handshake,
  FlaskConical,
  Presentation,
  Network,
  Microscope,
  UtensilsCrossed,
} from "lucide-react";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

/* ── Bullet list data ───────────────────────────────────────── */

const WHO_FOR = [
  {
    icon: Stethoscope,
    text: "Physicians transitioning into longevity and preventative medicine",
  },
  {
    icon: Rocket,
    text: "Founders building or scaling healthspan-focused companies",
  },
  {
    icon: TrendingUp,
    text: "Investors looking for high-quality deal flow in longevity and human performance",
  },
  {
    icon: Briefcase,
    text: "Operators and executives driving innovation across diagnostics, therapeutics, and wellness",
  },
];

const WHAT_DIFFERENT = [
  {
    icon: Users,
    label: "Curated room",
    text: "Surrounded by peers operating at a high level",
  },
  {
    icon: Signal,
    label: "Signal over noise",
    text: "Conversations grounded in science, business, and real outcomes",
  },
  {
    icon: Handshake,
    label: "Access to capital & partnerships",
    text: "Direct exposure to aligned investors and strategic partners",
  },
  {
    icon: FlaskConical,
    label: "Experiential integration",
    text: "Engage with leading longevity technologies and evidence-based brands",
  },
];

const WHAT_EXPECT = [
  {
    icon: Presentation,
    text: "High-level keynote presentations and focused panel discussions",
  },
  {
    icon: Network,
    text: "Strategic networking with founders, clinicians, and investors",
  },
  {
    icon: Microscope,
    text: "Exhibiting brands showcasing clinically relevant technologies and solutions",
  },
  {
    icon: UtensilsCrossed,
    text: "A catered lunch and structured opportunities for deeper conversation",
  },
];

/* ── Component ──────────────────────────────────────────────── */

export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    function calc() {
      const el = sectionRef.current;
      if (!el) return;
      const sectionH = el.offsetHeight;
      const viewportH = window.innerHeight;
      const offset = sectionH > viewportH ? -(sectionH - viewportH) : 0;
      setStickyTop(offset);
    }

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <>
      <div id="about" className="relative z-[1]" />
      <section
        ref={sectionRef}
        className="relative z-[1] py-28 lg:py-32 overflow-hidden bg-bg"
        style={{ position: "sticky", top: stickyTop }}
      >
        {/* DNA background image */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/bg-dna.png"
            alt=""
            fill
            className="object-cover object-center opacity-[0.15]"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#faf9f7_85%)]" />
        </div>

        <div className="relative max-w-[1140px] mx-auto px-6">
          {/* ── Zone 1: Founder Quote ────────────────────────── */}
          <FadeIn>
            <div className="max-w-[820px] mx-auto text-center mb-20 lg:mb-24">
              <SectionHeader
                label="About the Conference"
                title="For Industry Insiders"
                accentWord="Insiders"
                centered
              />

              <blockquote className="relative font-serif text-[clamp(1.15rem,2.2vw,1.55rem)] italic leading-[1.75] text-text/85 max-w-[720px] mx-auto">
                <span className="absolute -top-4 -left-2 text-[4rem] leading-none text-purple-light/25 font-serif select-none">
                  &ldquo;
                </span>
                Every meaningful shift in society started with a small group
                of people who trusted each other enough to think out loud.
                That&rsquo;s what we&rsquo;re building here. The Longevity
                Leadership Conference brings together the clinicians, founders,
                and investors actively shaping the next era of healthspan
                forming lasting relationships and connecting capital to
                innovation, all in the premise to move the industry forward,
                together.
              </blockquote>

              <div className="mt-7 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-light/20">
                  <Image
                    src="/hosts/elias-1.png"
                    alt="Elias Arjan"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-text">Elias Arjan</p>
                  <p className="text-xs text-text-secondary">
                    Chief Community Officer, Healthspan Collective
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Zone 2: About Description ────────────────────── */}
          <FadeIn>
            <div className="max-w-[820px] mx-auto mb-20 lg:mb-24">
              <div className="relative pl-7 border-l-[3px] border-purple-light/40">
                <p className="text-[1.05rem] leading-[1.85] text-text-secondary mb-5">
                  The Longevity Leadership Conference is a one-day gathering
                  designed for the decision-makers in the longevity industry.
                </p>
                <p className="text-[1.05rem] leading-[1.85] text-text font-medium italic">
                  Structured more like a mastermind than a traditional
                  conference, the experience is designed to maximize meaningful
                  interaction exploring where the science is heading, where
                  capital is flowing, and where the most consequential
                  opportunities in longevity are taking shape.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── Zone 3: Three Pillars ────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20 lg:mb-24">
            {/* Who This Is For */}
            <FadeIn delay={0}>
              <div className="group relative bg-bg-card rounded-[16px] p-7 shadow-sm transition-all duration-350 hover:shadow-[0_8px_32px_rgba(91,58,140,0.12)] hover:-translate-y-0.5 h-full overflow-hidden ring-1 ring-border-light hover:ring-purple-mid/25">
                {/* Gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple via-purple-light to-purple opacity-60 group-hover:opacity-100 transition-opacity duration-350" />
                {/* Hover left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple to-rose opacity-0 transition-opacity duration-350 group-hover:opacity-100" />
                <h3 className="font-serif text-[1.2rem] font-bold text-text mb-5">
                  Who This Is For
                </h3>
                <ul className="flex flex-col gap-4">
                  {WHO_FOR.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-wash flex items-center justify-center text-purple shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[0.9rem] text-text-secondary leading-relaxed">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* What Makes It Different */}
            <FadeIn delay={100}>
              <div className="group relative bg-bg-card rounded-[16px] p-7 shadow-sm transition-all duration-350 hover:shadow-[0_8px_32px_rgba(91,58,140,0.12)] hover:-translate-y-0.5 h-full overflow-hidden ring-1 ring-border-light hover:ring-purple-mid/25">
                {/* Gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-rose via-purple-light to-purple opacity-60 group-hover:opacity-100 transition-opacity duration-350" />
                {/* Hover left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple to-rose opacity-0 transition-opacity duration-350 group-hover:opacity-100" />
                <h3 className="font-serif text-[1.2rem] font-bold text-text mb-5">
                  What Makes It Different
                </h3>
                <ul className="flex flex-col gap-4">
                  {WHAT_DIFFERENT.map(({ icon: Icon, label, text }) => (
                    <li key={label} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-wash flex items-center justify-center text-purple shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[0.9rem] font-semibold text-text">
                          {label}
                        </span>
                        <p className="text-[0.85rem] text-text-secondary leading-relaxed mt-0.5">
                          {text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* What to Expect */}
            <FadeIn delay={200}>
              <div className="group relative bg-bg-card rounded-[16px] p-7 shadow-sm transition-all duration-350 hover:shadow-[0_8px_32px_rgba(91,58,140,0.12)] hover:-translate-y-0.5 h-full overflow-hidden ring-1 ring-border-light hover:ring-purple-mid/25">
                {/* Gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-light via-purple to-rose opacity-60 group-hover:opacity-100 transition-opacity duration-350" />
                {/* Hover left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple to-rose opacity-0 transition-opacity duration-350 group-hover:opacity-100" />
                <h3 className="font-serif text-[1.2rem] font-bold text-text mb-5">
                  What to Expect
                </h3>
                <ul className="flex flex-col gap-4">
                  {WHAT_EXPECT.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-wash flex items-center justify-center text-purple shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[0.9rem] text-text-secondary leading-relaxed">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* ── Zone 4: Positioning Closer ────────────────────── */}
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-4 mb-5">
                <div className="w-10 h-px bg-gradient-to-r from-transparent to-purple-light/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-light/50" />
                <div className="w-10 h-px bg-gradient-to-l from-transparent to-purple-light/40" />
              </div>
              <p className="font-serif text-[clamp(1.1rem,2vw,1.4rem)] italic text-text/80 max-w-[600px] mx-auto leading-relaxed">
                If you are serious about building in the longevity space, this
                is a room you want to be in.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
