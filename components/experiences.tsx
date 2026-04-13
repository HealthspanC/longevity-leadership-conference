"use client";

import Image from "next/image";
import { Beaker, Droplets, Zap } from "lucide-react";
import { EXPERIENCES } from "@/lib/constants";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

const ICON_MAP = {
  Beaker,
  Droplets,
  Zap,
} as const;

type Experience = (typeof EXPERIENCES)[number];

function ExperienceCard({ experience }: { experience: Experience }) {
  const Icon = ICON_MAP[experience.icon];

  return (
    <div className="group relative rounded-[20px] overflow-hidden backdrop-blur-md bg-white/[0.03] border border-white/[0.07] shadow-[0_8px_48px_rgba(91,58,140,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-350 hover:shadow-[0_12px_48px_rgba(91,58,140,0.25)] hover:-translate-y-1 hover:border-white/[0.12] h-full flex flex-col p-6 md:p-7 lg:p-8">
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-350"
        style={{
          background: `linear-gradient(to right, transparent, ${experience.accentColor}, transparent)`,
        }}
      />

      {/* Inner glow accent — top edge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${experience.accentColor}40, transparent)`,
        }}
      />

      {/* Left accent bar — appears on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-350"
        style={{
          background: `linear-gradient(to bottom, ${experience.accentColor}, transparent)`,
        }}
      />

      {/* Icon */}
      <div className="mb-5">
        <div
          className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center"
        >
          <Icon
            className="w-5 h-5 lg:w-6 lg:h-6"
            style={{ color: experience.accentColor }}
          />
          {/* Ambient glow ring */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow: `0 0 20px ${experience.accentColor}25`,
              animation: "experience-glow 4s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Name */}
      <h3 className="font-serif text-[1.2rem] lg:text-[1.4rem] font-bold text-white leading-tight mb-1.5">
        {experience.name}
      </h3>

      {/* Tagline */}
      <span
        className="text-[0.7rem] font-bold tracking-[0.15em] uppercase mb-4"
        style={{ color: experience.accentColor }}
      >
        {experience.tagline}
      </span>

      {/* Description */}
      <p className="text-[0.88rem] text-white/55 leading-[1.75] mb-6 flex-1">
        {experience.description}
      </p>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(to right, ${experience.accentColor}30, transparent)`,
          }}
        />
        <div
          className="w-1 h-1 rounded-full"
          style={{ backgroundColor: `${experience.accentColor}50` }}
        />
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(to left, ${experience.accentColor}30, transparent)`,
          }}
        />
      </div>

      {/* Sponsor attribution */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center p-1 shrink-0">
          <Image
            src={experience.sponsorLogo}
            alt={experience.sponsor}
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <span className="text-[0.6rem] text-white/30 font-medium tracking-wider uppercase block leading-none mb-0.5">
            Presented by
          </span>
          <span className="text-[0.75rem] text-white/60 font-semibold">
            {experience.sponsor}
          </span>
        </div>
      </div>

      {/* CTA badge */}
      <div className="mt-auto">
        <span className="inline-flex items-center bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 text-[0.7rem] text-white/45 font-medium">
          {experience.cta}
        </span>
      </div>
    </div>
  );
}

export function Experiences() {
  return (
    <div className="relative">
      {/* Gradient transition: light → dark */}
      <div className="h-14 lg:h-16 bg-gradient-to-b from-bg to-purple-deep" />

      {/* Dark cinematic section */}
      <section className="relative z-[3] py-16 lg:py-20 bg-purple-deep overflow-hidden">
        {/* Ambient radial gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,124,224,0.08),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(42,122,110,0.06),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(91,58,140,0.1),transparent_50%)] pointer-events-none" />

        {/* Crosshatch texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.04'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-[1140px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="On-Site Experiences"
              title="Immersive Wellness Activations"
              accentWord="Activations"
              subtitle="Three exclusive, sponsor-hosted wellness experiences available to every attendee. Step in and experience the future of longevity firsthand."
              centered
              dark
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {EXPERIENCES.map((exp, i) => (
              <FadeIn key={exp.id} delay={i * 120}>
                <ExperienceCard experience={exp} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient transition: dark → light */}
      <div className="h-14 lg:h-16 bg-gradient-to-b from-purple-deep to-bg" />
    </div>
  );
}
