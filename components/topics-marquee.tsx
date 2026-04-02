"use client";

import { SectionHeader } from "./section-header";
import { FadeIn } from "./fade-in";

const ROWS = [
  [
    "health", "longevity", "mindset optimization", "psychedelics",
    "nutrition", "metabolic health", "biohacking", "sleep science",
    "aging reversal", "telomere health", "circadian rhythm", "NAD+ therapy",
    "performance medicine", "vitality",
  ],
  [
    "hormone therapy", "epigenetics", "stress recovery", "brain health",
    "healing", "supplementation", "wellness technology", "cognition",
    "neuroplasticity", "mitochondrial health", "sexual health", "blood biomarkers",
    "immune resilience", "mental fitness",
  ],
  [
    "breathwork", "fasting protocols", "peptide therapy", "inflammation",
    "mobility", "gut health", "relationships", "muscle health",
    "hyperbaric oxygen", "IV therapy", "bone density", "microbiome",
    "detoxification", "pain management",
  ],
  [
    "toxin elimination", "purpose & meaning", "cold exposure",
    "regenerative medicine", "stem cells", "heart health",
    "red light therapy", "functional medicine", "gene therapy",
    "skin longevity", "vision health", "dental wellness",
    "sound healing", "emotional resilience",
  ],
];

export function TopicsMarquee() {
  return (
    <section className="relative z-[3] bg-purple-deep py-16 lg:py-20 overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(192,96,128,0.15),transparent_50%),radial-gradient(circle_at_90%_60%,rgba(42,122,110,0.1),transparent_40%),radial-gradient(circle_at_50%_20%,rgba(91,58,140,0.2),transparent_50%)] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.05'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 mb-10">
        <FadeIn>
          <SectionHeader
            label="Topics"
            title="What You'll Explore"
            accentWord="Explore"
            subtitle="From cutting-edge science to timeless wellness practices — the conversations shaping the future of human healthspan."
            centered
            dark
          />
        </FadeIn>
      </div>
      <div className="relative z-10 flex flex-col gap-3">
        {ROWS.map((topics, rowIdx) => {
          const direction = rowIdx % 2 === 0 ? "left" : "right";
          const duration = 35 + rowIdx * 8;

          return (
            <div key={rowIdx} className="relative">
              {/* Fade edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-purple-deep to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-purple-deep to-transparent" />

              <div
                className="flex gap-3 w-max"
                style={{
                  animation: `marquee-${direction} ${duration}s linear infinite`,
                }}
              >
                {[...topics, ...topics].map((topic, i) => (
                  <span
                    key={`${topic}-${i}`}
                    className="shrink-0 px-6 py-3 rounded-full border border-white/15 text-sm font-medium text-white/60 whitespace-nowrap transition-colors duration-300 hover:border-purple-light/50 hover:text-white hover:bg-white/[0.08] cursor-default"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
