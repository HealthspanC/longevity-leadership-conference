"use client";

import Image from "next/image";
import { Beaker, Droplets, Zap, ExternalLink } from "lucide-react";
import { EXPERIENCES } from "@/lib/constants";
import { FadeIn } from "./fade-in";

const ICON_MAP = {
  Beaker,
  Droplets,
  Zap,
} as const;

type Experience = (typeof EXPERIENCES)[number];

/* Shared accent — keeps the section consistent and on-brand */
const CARD_PURPLE = "#a87ce0";
const CARD_PURPLE_BG = "rgba(168,124,224,0.08)";

function ExperienceCard({ experience }: { experience: Experience }) {
  const Icon = ICON_MAP[experience.icon];

  return (
    <div className="group relative bg-white rounded-[16px] overflow-hidden ring-1 ring-border-light shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(91,58,140,0.12)] hover:-translate-y-1 hover:ring-purple-mid/20 h-full flex flex-col">
      {/* Accent top edge */}
      <div
        className="h-[3px]"
        style={{
          background: `linear-gradient(to right, ${CARD_PURPLE}, ${CARD_PURPLE}60)`,
        }}
      />

      {/* Main content — light with accent gradient wash */}
      <div className="relative p-5 md:p-6 flex flex-col flex-1">
        {/* Accent gradient wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, rgba(168,124,224,0.18) 0%, rgba(168,124,224,0.12) 50%, rgba(168,124,224,0.06) 100%)`,
          }}
        />

        <div className="relative z-[1] flex flex-col flex-1">
          {/* Icon */}
          <div className="mb-5">
            <div
              className="w-13 h-13 rounded-xl flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: CARD_PURPLE_BG,
                boxShadow: `0 2px 12px ${CARD_PURPLE}15`,
              }}
            >
              <Icon className="w-6 h-6" style={{ color: CARD_PURPLE }} />
            </div>
          </div>

          {/* Name */}
          <h3 className="font-serif text-[1.1rem] lg:text-[1.2rem] font-bold text-text leading-tight mb-1">
            {experience.name}
          </h3>

          {/* Tagline */}
          <span
            className="text-[0.6rem] font-bold tracking-[0.15em] uppercase mb-3"
            style={{ color: CARD_PURPLE }}
          >
            {experience.tagline}
          </span>

          {/* Description */}
          <p className="text-[0.82rem] text-text-secondary leading-[1.7] flex-1">
            {experience.description}
          </p>
        </div>
      </div>

      {/* Sponsor footer — dark purple gradient, always sits below the
          light content. An inner max-w wrapper centers the label, logo,
          and CTA row in a tidy column so they don't sprawl when the
          card is wider at tablet. */}
      <div className="mt-auto p-4 md:p-5 bg-gradient-to-br from-purple-deep via-[#3c2066] to-[#2d1b4e]">
        <div className="max-w-[380px] mx-auto">
          <span className="text-[0.5rem] text-white/50 font-medium tracking-wider uppercase block mb-2.5">
            Presented by
          </span>
          <div className="relative flex items-center justify-center bg-white rounded-[10px] h-14 px-5 mb-3 overflow-hidden">
            <Image
              src={experience.sponsorLogo}
              alt={experience.sponsor}
              width={300}
              height={100}
              className="max-h-9 max-w-full object-contain"
              style={
                "logoScale" in experience
                  ? { transform: `scale(${experience.logoScale})` }
                  : undefined
              }
            />
            <div className="absolute inset-0 bg-purple-deep/[0.06] mix-blend-multiply rounded-[10px] pointer-events-none" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[0.62rem] text-white/50 font-medium tracking-wide">
              {experience.cta}
            </span>
            <a
              href={experience.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[0.68rem] font-semibold text-purple-light hover:text-white transition-colors"
            >
              Visit
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experiences() {
  return (
    <section
      id="experiences"
      className="relative z-[2] py-20 lg:py-24 bg-bg overflow-hidden"
    >
      {/* Subtle top edge shadow for slide-up feel off the dark Hosts section */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/[0.08] to-transparent pointer-events-none" />

      <div className="relative max-w-[1080px] mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-10 lg:mb-12">
            <span className="inline-flex items-center gap-2.5 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-purple-mid mb-3 before:content-[''] before:w-5 before:h-px before:bg-purple-mid">
              On-Site Experiences
            </span>
            <h2 className="font-serif text-[clamp(1.75rem,4vw,2.4rem)] font-bold text-text leading-[1.15] mb-4">
              Immersive Wellness{" "}
              <span className="text-purple">Activations</span>
            </h2>
            <p className="text-[0.95rem] text-text-secondary leading-[1.7] max-w-[560px] mx-auto">
              Three exclusive, sponsor-hosted wellness experiences available to
              every attendee.
            </p>
          </div>
        </FadeIn>

        {/* Decorative separator */}
        <FadeIn delay={80}>
          <div className="flex justify-center mb-10 lg:mb-12">
            <div className="w-full max-w-[180px] h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
          </div>
        </FadeIn>

        {/* Cards grid */}
        <FadeIn delay={120}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 max-w-[380px] sm:max-w-[680px] lg:max-w-none mx-auto">
            {EXPERIENCES.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
