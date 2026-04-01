import { SPEAKERS, LINKS } from "@/lib/constants";
import { User } from "lucide-react";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

export function Speakers() {
  return (
    <section id="speakers" className="relative z-2 py-28 lg:py-32">
      <div className="max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Featured Speakers"
            title="Industry Trailblazers"
            accentWord="Trailblazers"
            subtitle="World-class clinicians, researchers, investors, and business leaders sharing breakthrough insights on longevity."
            centered
          />
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {SPEAKERS.map((speaker, i) => (
              <div
                key={i}
                className="bg-bg-card border border-border-light rounded-[12px] p-9 px-6 text-center shadow-sm transition-all duration-350 hover:border-purple-pale hover:shadow-[0_8px_32px_rgba(91,58,140,0.12)] hover:-translate-y-1"
              >
                <div className="w-[88px] h-[88px] rounded-full mx-auto mb-[18px] bg-gradient-to-br from-purple-wash to-rose-pale flex items-center justify-center text-purple-light border-2 border-purple-pale">
                  <User className="w-9 h-9" />
                </div>
                <div className="font-bold text-base mb-1 text-text">
                  {speaker.name}
                </div>
                <div className="text-sm text-purple font-semibold mb-2.5">
                  {speaker.role}
                </div>
                <div className="text-sm text-text-muted leading-relaxed">
                  {speaker.bio}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="text-center">
            <p className="text-text-secondary mb-3.5 text-[0.9rem]">
              Interested in sharing your expertise on stage?
            </p>
            <a
              href={LINKS.applySpeaker}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border-[1.5px] border-border text-text py-[15px] px-8 rounded-full font-semibold text-[0.95rem] transition-all hover:border-purple hover:text-purple hover:-translate-y-0.5"
            >
              Apply to Speak &rarr;
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
