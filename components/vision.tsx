"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
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
  const sectionRef = useRef<HTMLElement>(null);
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    function calc() {
      const el = sectionRef.current;
      if (!el) return;
      const sectionH = el.offsetHeight;
      const viewportH = window.innerHeight;
      // If section is taller than viewport, use a negative top so
      // the section scrolls fully before pinning. Otherwise pin at 0.
      const offset = sectionH > viewportH ? -(sectionH - viewportH) : 0;
      setStickyTop(offset);
    }

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-[1] py-28 lg:py-32 overflow-hidden bg-bg"
      style={{ position: "sticky", top: stickyTop }}
    >
      {/* DNA background image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/bg-dna.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.07]"
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Soft vignette to blend edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#faf9f7_70%)]" />
      </div>

      <div className="relative max-w-[1140px] mx-auto px-6">
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

          <div className="grid gap-4">
              {VISION_FEATURES.map((feature, i) => {
                const Icon = iconMap[feature.icon];
                return (
                  <FadeIn key={feature.title} direction="left" delay={i * 100}>
                    <div className="group relative flex gap-4 p-6 pl-[calc(1.5rem+3px)] bg-bg-card border border-border-light rounded-[12px] shadow-sm transition-all duration-350 hover:border-purple-pale hover:shadow-[0_8px_32px_rgba(91,58,140,0.12)] hover:-translate-y-0.5 overflow-hidden">
                      {/* Gradient accent bar — left edge */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple to-rose opacity-0 transition-opacity duration-350 group-hover:opacity-100" />

                      <div className="w-11 h-11 rounded-xl bg-purple-wash flex items-center justify-center text-purple shrink-0 transition-all duration-350 group-hover:bg-purple group-hover:text-white">
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
                  </FadeIn>
                );
              })}
            </div>
        </div>
      </div>
    </section>
  );
}
