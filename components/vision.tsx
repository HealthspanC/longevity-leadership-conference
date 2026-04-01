import { VISION_FEATURES } from "@/lib/constants";
import { Trophy, Activity, TrendingUp, Users } from "lucide-react";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Activity,
  TrendingUp,
  Users,
};

export function Vision() {
  return (
    <section id="about" className="relative z-2 py-28 lg:py-32">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <FadeIn>
            <SectionHeader
              label="Our Vision"
              title="Redefining the Human Healthspan"
              accentWord="Human Healthspan"
            />
            <blockquote className="font-serif text-[clamp(1.4rem,2.5vw,1.9rem)] italic leading-relaxed text-text pl-7 mt-4 border-l-[3px] border-purple-light">
              &ldquo;Our vision is a society where living to 100 in excellent
              health is the norm, not the exception. We see a future where every
              generation benefits from scientific advancements in health and
              longevity.&rdquo;
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-purple">
              &mdash; The Healthspan Collective
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="grid gap-4">
              {VISION_FEATURES.map((feature) => {
                const Icon = iconMap[feature.icon];
                return (
                  <div
                    key={feature.title}
                    className="flex gap-4 p-6 bg-bg-card border border-border-light rounded-[12px] shadow-sm transition-all duration-350 hover:border-purple-pale hover:shadow-[0_8px_32px_rgba(91,58,140,0.12)] hover:-translate-y-0.5"
                  >
                    <div className="w-11 h-11 rounded-xl bg-purple-wash flex items-center justify-center text-purple shrink-0">
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-bold text-[0.95rem] text-text mb-0.5">
                        {feature.title}
                      </div>
                      <div className="text-sm text-text-secondary leading-relaxed">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
