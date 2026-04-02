"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LINKS, HOSTS } from "@/lib/constants";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";
import { MysticRose } from "./mystic-rose";

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
} as const;

function HostCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-16">
      {HOSTS.map((host, i) => {
        const isOpen = expanded === host.name;
        return (
          <FadeIn key={host.name} delay={i * 120}>
            <div
              className={cn(
                "group relative rounded-[16px] overflow-hidden cursor-pointer transition-shadow duration-500",
                "hover:shadow-[0_0_30px_rgba(168,124,224,0.2)]",
                isOpen && "!shadow-[0_0_30px_rgba(168,124,224,0.2)]"
              )}
              onClick={() => setExpanded(isOpen ? null : host.name)}
            >
              <div className="relative w-full aspect-[3/4] md:aspect-[9/14] bg-purple-deep">
                <Image
                  src={host.image}
                  alt={host.name}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    "group-hover:scale-[1.05]",
                    isOpen && "!scale-[1.05]"
                  )}
                  style={{
                    objectPosition:
                      "imagePosition" in host
                        ? host.imagePosition
                        : "center 20%",
                  }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Subtle purple tint overlay */}
                <div className="absolute inset-0 bg-purple-deep/15 mix-blend-multiply" />

                {/* Bottom gradient — default */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
                  "group-hover:opacity-0",
                  isOpen && "!opacity-0"
                )} />
                {/* Bottom gradient — expanded (taller, denser) */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 via-60% to-transparent transition-opacity duration-500",
                  "opacity-0 group-hover:opacity-100",
                  isOpen && "!opacity-100"
                )} />

                {/* Name + Title + Bio */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7 z-[2]">
                  <div className="inline-flex mb-2">
                    <span className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-purple-light bg-white/[0.08] backdrop-blur-md border border-white/[0.1] rounded-full px-3.5 py-1">
                      {host.title}
                    </span>
                  </div>
                  <h3 className={cn(
                    "font-serif text-2xl md:text-[1.7rem] font-bold text-white leading-tight mb-0 transition-all duration-500",
                    "group-hover:mb-3",
                    isOpen && "!mb-3"
                  )}>
                    {host.name}
                  </h3>

                  {/* Bio — tap on mobile, hover on desktop */}
                  <div className={cn(
                    "max-h-0 opacity-0 transition-all duration-500 ease-out overflow-hidden",
                    "md:group-hover:max-h-[300px] md:group-hover:opacity-100",
                    isOpen && "!max-h-[300px] !opacity-100"
                  )}>
                    <p className="text-[0.8rem] text-white/70 leading-relaxed md:mt-0">
                      {host.bio}
                    </p>

                    {/* Social */}
                    <div className="flex gap-2.5 mt-3 mb-1">
                      {(
                        Object.entries(host.social) as [
                          keyof typeof socialIcons,
                          string,
                        ][]
                      ).map(([platform, url]) => {
                        const Icon = socialIcons[platform];
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={platform}
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-full bg-white/[0.15] border border-white/[0.2] flex items-center justify-center text-white/80 transition-all hover:bg-white hover:text-purple-deep hover:border-white hover:-translate-y-0.5"
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

export function Hosts() {
  return (
    <section
      id="hosts"
      className="relative z-[3] py-24 lg:py-28 bg-purple-deep overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(192,96,128,0.15),transparent_50%),radial-gradient(circle_at_90%_60%,rgba(42,122,110,0.1),transparent_40%),radial-gradient(circle_at_50%_20%,rgba(91,58,140,0.2),transparent_50%)] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.05'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 3, x: "12%", y: "18%", dur: "18s", delay: "0s", opacity: 0.25 },
          { size: 2, x: "78%", y: "25%", dur: "22s", delay: "3s", opacity: 0.2 },
          { size: 4, x: "45%", y: "65%", dur: "25s", delay: "7s", opacity: 0.15 },
          { size: 2, x: "88%", y: "72%", dur: "20s", delay: "5s", opacity: 0.2 },
          { size: 3, x: "25%", y: "82%", dur: "24s", delay: "10s", opacity: 0.18 },
          { size: 2, x: "62%", y: "12%", dur: "19s", delay: "2s", opacity: 0.22 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-light animate-[host-float_var(--dur)_ease-in-out_var(--delay)_infinite]"
            style={{
              width: p.size,
              height: p.size,
              left: p.x,
              top: p.y,
              opacity: p.opacity,
              ["--dur" as string]: p.dur,
              ["--delay" as string]: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Your Hosts"
            title="Presented by the Healthspan Collective"
            accentWord="Healthspan Collective"
            subtitle="Dedicated to accelerating the science of longevity and building a global community of healthspan leaders."
            centered
            dark
          />
        </FadeIn>

        {/* Editorial Host Profiles */}
        <HostCards />

        {/* Colophon strip — icon centered in divider */}
        <FadeIn delay={200}>
          <div className="relative">
            {/* Divider line */}
            <div className="absolute top-[80px] left-0 right-0 h-px bg-white/[0.12]" />

            {/* Animated Mystic Rose logo */}
            <div className="flex justify-center mb-6 relative z-[1]">
              <MysticRose size={160} />
            </div>

            {/* Description text — centered, minimal */}
            <p className="text-sm text-white/50 leading-relaxed text-center max-w-[600px] mx-auto mb-6">
              The core objective of the Longevity Leadership Conference is to
              Accelerate Growth, Investment and Knowledge About The Longevity
              Industry. Through curated events, strategic partnerships, and
              thought leadership, the Healthspan Collective is building the
              definitive community for the longevity ecosystem.
            </p>

            {/* Social links — minimal, centered */}
            <div className="flex gap-4 justify-center">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-white/40 transition-all hover:text-white"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
              <span className="text-white/15">|</span>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-white/40 transition-all hover:text-white"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
