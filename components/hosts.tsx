import Image from "next/image";
import { LINKS, HOSTS } from "@/lib/constants";
import { Instagram, Linkedin, Youtube, HeartPulse } from "lucide-react";
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
      className="relative z-2 py-24 lg:py-28 bg-bg-warm border-t border-b border-border-light"
    >
      <div className="max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Your Hosts"
            title="Presented by the Healthspan Collective"
            accentWord="Healthspan Collective"
            subtitle="Dedicated to accelerating the science of longevity and building a global community of healthspan leaders."
            centered
          />
        </FadeIn>

        {/* Host Profiles */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {HOSTS.map((host) => (
              <div
                key={host.name}
                className="bg-bg-card border border-border-light rounded-[16px] overflow-hidden shadow-sm transition-all duration-350 hover:shadow-lg hover:-translate-y-1 flex flex-col"
              >
                {/* Photo */}
                <div className="relative w-full aspect-[5/6] bg-gradient-to-br from-purple-deep to-purple overflow-hidden">
                  <Image
                    src={host.image}
                    alt={host.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "imagePosition" in host ? host.imagePosition : "center 20%" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-sm text-text-muted font-medium mb-1">
                    {host.title}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-purple mb-3">
                    {host.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">
                    {host.bio}
                  </p>

                  {/* Social */}
                  <div className="flex gap-2.5 mt-5">
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
                          className="w-9 h-9 rounded-full bg-purple-wash border border-purple-pale flex items-center justify-center text-purple transition-all hover:bg-purple hover:text-white hover:border-purple hover:-translate-y-0.5"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Healthspan Collective org card */}
        <FadeIn delay={200}>
          <div className="bg-bg-card border border-border rounded-[20px] p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-8 lg:gap-10 items-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple via-rose to-teal" />

            <div className="w-[140px] h-[140px] rounded-[20px] bg-gradient-to-br from-purple-deep to-purple flex items-center justify-center flex-col gap-2 mx-auto lg:mx-0">
              <HeartPulse className="w-9 h-9 text-white/85" />
              <div className="font-extrabold text-[0.65rem] tracking-[0.12em] uppercase text-center leading-tight text-white/90">
                Healthspan
                <br />
                Collective
              </div>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-[520px] mx-auto lg:mx-0">
                The core objective of the Longevity Leadership Conference is to
                Accelerate Growth, Investment and Knowledge About The Longevity
                Industry. Through curated events, strategic partnerships, and
                thought leadership, the Healthspan Collective is building the
                definitive community for the longevity ecosystem.
              </p>
              <div className="flex gap-2.5 justify-center lg:justify-start">
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-bg-muted border border-border-light px-4 py-2 rounded-full text-xs font-semibold text-text-secondary transition-all hover:border-purple-pale hover:text-purple hover:bg-purple-wash"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  Instagram
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-bg-muted border border-border-light px-4 py-2 rounded-full text-xs font-semibold text-text-secondary transition-all hover:border-purple-pale hover:text-purple hover:bg-purple-wash"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
