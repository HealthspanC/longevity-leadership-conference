"use client";

import Image from "next/image";
import { LINKS, HOSTS } from "@/lib/constants";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
} as const;

export function Hosts() {
  return (
    <section
      id="hosts"
      className="relative z-2 py-24 lg:py-28 bg-purple-deep overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(192,96,128,0.15),transparent_50%),radial-gradient(circle_at_90%_60%,rgba(42,122,110,0.1),transparent_40%),radial-gradient(circle_at_50%_20%,rgba(91,58,140,0.2),transparent_50%)] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.05'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

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
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-16">
            {HOSTS.map((host) => (
              <div
                key={host.name}
                className="group relative rounded-[16px] overflow-hidden cursor-pointer"
              >
                {/* Photo — tall portrait, duotone by default */}
                <div className="relative w-full aspect-[3/4] md:aspect-[9/14] bg-purple-deep">
                  <Image
                    src={host.image}
                    alt={host.name}
                    fill
                    className="object-cover"
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

                  {/* Bottom gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Always-visible: Name + Title — uses flex-end so content grows upward */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7 z-[2]">
                    <div className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-purple-light/80 mb-1.5">
                      {host.title}
                    </div>
                    <h3 className="font-serif text-2xl md:text-[1.7rem] font-bold text-white leading-tight mb-0 transition-all duration-500 group-hover:mb-3">
                      {host.name}
                    </h3>

                    {/* Bio — slides up on hover (desktop), always visible on mobile */}
                    <div className="md:max-h-0 md:opacity-0 md:group-hover:max-h-[300px] md:group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden">
                      <p className="text-[0.8rem] text-white/70 leading-relaxed mt-3 md:mt-0">
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
            ))}
          </div>
        </FadeIn>

        {/* Colophon strip — icon centered in divider */}
        <FadeIn delay={200}>
          <div className="relative">
            {/* Divider line */}
            <div className="absolute top-[32px] left-0 right-0 h-px bg-white/[0.12]" />

            {/* Icon centered on the line */}
            <div className="flex justify-center mb-8 relative z-[1]">
              <div className="w-16 h-16 rounded-full bg-white border border-white/20 flex items-center justify-center p-2.5">
                <Image
                  src="/brand/icon.png"
                  alt="Healthspan Collective"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                />
              </div>
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
