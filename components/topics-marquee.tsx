"use client";

import { SectionHeader } from "./section-header";
import { FadeIn } from "./fade-in";

const ROWS = [
  [
    "health", "longevity", "mindset optimization", "psychedelics",
    "nutrition", "metabolic health", "biohacking", "sleep science",
  ],
  [
    "hormone therapy", "epigenetics", "stress recovery", "brain health",
    "healing", "supplementation", "wellness technology", "cognition",
  ],
  [
    "breathwork", "fasting protocols", "peptide therapy", "inflammation",
    "mobility", "gut health", "relationships", "muscle health",
  ],
  [
    "toxin elimination", "purpose & meaning", "cold exposure",
    "regenerative medicine", "stem cells", "heart health",
    "red light therapy", "functional medicine",
  ],
];

export function TopicsMarquee() {
  return (
    <section className="relative z-[3] bg-bg py-16 lg:py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 mb-10">
        <FadeIn>
          <SectionHeader
            label="Topics"
            title="What You'll Explore"
            accentWord="Explore"
            subtitle="From cutting-edge science to timeless wellness practices — the conversations shaping the future of human healthspan."
            centered
          />
        </FadeIn>
      </div>
      <div className="flex flex-col gap-3">
        {ROWS.map((topics, rowIdx) => {
          // Alternate direction: even rows scroll left, odd rows scroll right
          const direction = rowIdx % 2 === 0 ? "left" : "right";
          // Slightly different speeds per row
          const duration = 35 + rowIdx * 8;

          return (
            <div key={rowIdx} className="relative">
              {/* Fade edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-bg to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-bg to-transparent" />

              <div
                className="flex gap-3 w-max"
                style={{
                  animation: `marquee-${direction} ${duration}s linear infinite`,
                }}
              >
                {/* Duplicate the list twice for seamless loop */}
                {[...topics, ...topics].map((topic, i) => (
                  <span
                    key={`${topic}-${i}`}
                    className="shrink-0 px-6 py-3 rounded-full border border-text/10 text-sm font-medium text-text/70 whitespace-nowrap transition-colors duration-300 hover:border-purple/40 hover:text-purple hover:bg-purple-wash cursor-default"
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
