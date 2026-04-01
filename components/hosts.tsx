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
      className="relative z-2 py-24 lg:py-28 bg-purple-deep overflow-hidden"
    >
      {/* Gradient overlays — matches mission banner */}
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

        {/* Host Profiles */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {HOSTS.map((host) => (
              <div
                key={host.name}
                className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.1] rounded-[16px] overflow-hidden transition-all duration-350 hover:bg-white/[0.12] hover:-translate-y-1 flex flex-col"
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
                  <div className="text-sm text-white/50 font-medium mb-1">
                    {host.title}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {host.name}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed flex-1">
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
                          className="w-9 h-9 rounded-full bg-white/[0.1] border border-white/[0.15] flex items-center justify-center text-white/70 transition-all hover:bg-white hover:text-purple-deep hover:border-white hover:-translate-y-0.5"
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
          <div className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.1] rounded-[20px] p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-8 lg:gap-10 items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-light via-rose to-teal" />

            <div className="w-[140px] h-[140px] rounded-[20px] bg-white/[0.1] border border-white/[0.15] flex items-center justify-center flex-col gap-2 mx-auto lg:mx-0">
              <HeartPulse className="w-9 h-9 text-white/85" />
              <div className="font-extrabold text-[0.65rem] tracking-[0.12em] uppercase text-center leading-tight text-white/90">
                Healthspan
                <br />
                Collective
              </div>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-sm text-white/65 leading-relaxed mb-5 max-w-[520px] mx-auto lg:mx-0">
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
                  className="flex items-center gap-2 bg-white/[0.1] border border-white/[0.15] px-4 py-2 rounded-full text-xs font-semibold text-white/70 transition-all hover:bg-white hover:text-purple-deep hover:border-white"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  Instagram
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/[0.1] border border-white/[0.15] px-4 py-2 rounded-full text-xs font-semibold text-white/70 transition-all hover:bg-white hover:text-purple-deep hover:border-white"
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
