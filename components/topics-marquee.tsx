"use client";


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
    <section className="relative z-[3] bg-bg pt-4 pb-10 lg:pt-6 lg:pb-12 overflow-hidden">

      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.25em] uppercase text-purple-mid before:content-[''] before:w-6 before:h-px before:bg-purple-mid">
          Topics
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        {ROWS.map((topics, rowIdx) => {
          const direction = rowIdx % 2 === 0 ? "left" : "right";
          const duration = 60 + rowIdx * 10;

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
                {[...topics, ...topics].map((topic, i) => (
                  <span
                    key={`${topic}-${i}`}
                    className="shrink-0 px-6 py-3 rounded-full border border-border text-sm font-medium text-text-secondary whitespace-nowrap transition-all duration-300 hover:border-[#ff3c8e] hover:text-[#ff3c8e] hover:bg-[#ff3c8e]/5 hover:shadow-[0_0_12px_rgba(255,60,142,0.15)] cursor-default"
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
