"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Beaker, Droplets, Zap, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXPERIENCES } from "@/lib/constants";

const ICON_MAP = {
  Beaker,
  Droplets,
  Zap,
} as const;

type Experience = (typeof EXPERIENCES)[number];

/* Pastel background tints per accent color */
const ACCENT_BG: Record<string, string> = {
  "#a87ce0": "rgba(168,124,224,0.08)",
  "#2a7a6e": "rgba(42,122,110,0.08)",
  "#c06080": "rgba(192,96,128,0.08)",
};

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
            style={{ backgroundColor: CARD_PURPLE_BG, boxShadow: `0 2px 12px ${CARD_PURPLE}15` }}
          >
            <Icon
              className="w-6 h-6"
              style={{ color: CARD_PURPLE }}
            />
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

      {/* Sponsor footer — dark purple gradient */}
      <div className="mt-auto p-4 md:p-5 bg-gradient-to-br from-purple-deep via-[#3c2066] to-[#2d1b4e]">
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
  );
}

export function ExperiencesModal({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className={cn(
          "relative w-full max-w-[960px] max-h-[90vh] rounded-[20px] overflow-hidden bg-bg shadow-[0_25px_80px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)] transition-all duration-300",
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/[0.04] flex items-center justify-center text-text-muted hover:text-text hover:bg-black/[0.08] transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-[18px] h-[18px] stroke-[1.5]" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[90vh] p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2.5 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-purple-mid mb-3 before:content-[''] before:w-5 before:h-px before:bg-purple-mid">
              On-Site Experiences
            </span>
            <h2 className="font-serif text-[clamp(1.5rem,3.5vw,2.2rem)] font-bold text-text leading-[1.15] mb-3">
              Immersive Wellness{" "}
              <span className="text-purple">Activations</span>
            </h2>
            <p className="text-[0.9rem] text-text-secondary leading-[1.7] max-w-[520px] mx-auto">
              Three exclusive, sponsor-hosted wellness experiences available to
              every attendee.
            </p>
          </div>

          {/* Decorative separator */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-[160px] h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-sm:max-w-[380px] max-sm:mx-auto">
            {EXPERIENCES.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
