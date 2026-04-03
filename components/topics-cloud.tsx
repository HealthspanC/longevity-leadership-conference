"use client";

/* ------------------------------------------------------------------ */
/*  Topics data with tiers                                             */
/* ------------------------------------------------------------------ */

interface TopicDef {
  label: string;
  tier: 1 | 2 | 3;
}

const ALL_TOPICS: TopicDef[] = [
  { label: "longevity", tier: 1 },
  { label: "health", tier: 1 },
  { label: "biohacking", tier: 1 },
  { label: "nutrition", tier: 1 },
  { label: "cognition", tier: 1 },
  { label: "vitality", tier: 1 },
  { label: "healing", tier: 1 },
  { label: "psychedelics", tier: 2 },
  { label: "mindset optimization", tier: 2 },
  { label: "metabolic health", tier: 2 },
  { label: "sleep science", tier: 2 },
  { label: "neuroplasticity", tier: 2 },
  { label: "gene therapy", tier: 2 },
  { label: "stem cells", tier: 2 },
  { label: "breathwork", tier: 2 },
  { label: "fasting protocols", tier: 2 },
  { label: "peptide therapy", tier: 2 },
  { label: "aging reversal", tier: 2 },
  { label: "brain health", tier: 2 },
  { label: "gut health", tier: 2 },
  { label: "epigenetics", tier: 2 },
  { label: "regenerative medicine", tier: 2 },
  { label: "cold exposure", tier: 2 },
  { label: "wellness technology", tier: 2 },
  { label: "supplementation", tier: 2 },
  { label: "NAD+ therapy", tier: 3 },
  { label: "telomere health", tier: 3 },
  { label: "circadian rhythm", tier: 3 },
  { label: "performance medicine", tier: 3 },
  { label: "hormone therapy", tier: 3 },
  { label: "stress recovery", tier: 3 },
  { label: "mitochondrial health", tier: 3 },
  { label: "sexual health", tier: 3 },
  { label: "blood biomarkers", tier: 3 },
  { label: "immune resilience", tier: 3 },
  { label: "mental fitness", tier: 3 },
  { label: "inflammation", tier: 3 },
  { label: "muscle health", tier: 3 },
  { label: "bone density", tier: 3 },
  { label: "microbiome", tier: 3 },
  { label: "detoxification", tier: 3 },
  { label: "pain management", tier: 3 },
  { label: "hyperbaric oxygen", tier: 3 },
  { label: "IV therapy", tier: 3 },
  { label: "mobility", tier: 3 },
  { label: "red light therapy", tier: 3 },
  { label: "functional medicine", tier: 3 },
  { label: "skin longevity", tier: 3 },
  { label: "vision health", tier: 3 },
  { label: "dental wellness", tier: 3 },
  { label: "sound healing", tier: 3 },
  { label: "emotional resilience", tier: 3 },
  { label: "toxin elimination", tier: 3 },
  { label: "purpose & meaning", tier: 3 },
  { label: "heart health", tier: 3 },
  { label: "relationships", tier: 3 },
];

/* ------------------------------------------------------------------ */
/*  Distribute into 4 rows: all tiers intermingled evenly              */
/* ------------------------------------------------------------------ */

function buildRows(): TopicDef[][] {
  // Seeded shuffle for consistent order
  const shuffled = [...ALL_TOPICS];
  let seed = 57;
  const rng = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Interleave tiers: pick from each tier round-robin so every row
  // gets a mix of bold, semi-bold, and regular words
  const tier1 = shuffled.filter((t) => t.tier === 1);
  const tier2 = shuffled.filter((t) => t.tier === 2);
  const tier3 = shuffled.filter((t) => t.tier === 3);

  const interleaved: TopicDef[] = [];
  const maxLen = Math.max(tier1.length, tier2.length, tier3.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < tier1.length) interleaved.push(tier1[i]);
    if (i < tier2.length) interleaved.push(tier2[i]);
    if (i < tier3.length) interleaved.push(tier3[i]);
  }

  // Deal into 4 rows round-robin
  const rows: TopicDef[][] = [[], [], [], []];
  interleaved.forEach((t, i) => {
    rows[i % 4].push(t);
  });

  // Space out tiers within each row: never allow 2+ same-tier words adjacent
  rows.forEach((row) => {
    // Separate by tier
    const byTier: Record<number, TopicDef[]> = { 1: [], 2: [], 3: [] };
    row.forEach((t) => byTier[t.tier].push(t));

    // Rebuild row by round-robin picking: tier3, tier2, tier3, tier2, tier1, ...
    // This ensures semi-bold (tier2) words are always separated by tier3
    const result: TopicDef[] = [];
    const queues = [byTier[3], byTier[2], byTier[1]]; // pick order priority
    let lastTier = 0;

    while (result.length < row.length) {
      let placed = false;
      // Try each queue, skip if it would create adjacency
      for (const q of queues) {
        if (q.length > 0 && q[0].tier !== lastTier) {
          const item = q.shift()!;
          result.push(item);
          lastTier = item.tier;
          placed = true;
          break;
        }
      }
      // Fallback: if all remaining are same tier, just place one
      if (!placed) {
        for (const q of queues) {
          if (q.length > 0) {
            const item = q.shift()!;
            result.push(item);
            lastTier = item.tier;
            break;
          }
        }
      }
    }

    row.splice(0, row.length, ...result);
  });

  return rows;
}

const ROWS = buildRows();

/* ------------------------------------------------------------------ */
/*  Row config: speed + direction                                      */
/* ------------------------------------------------------------------ */

const ROW_CONFIG = [
  { duration: 80, direction: "left" as const },
  { duration: 55, direction: "right" as const },
  { duration: 65, direction: "left" as const },
  { duration: 90, direction: "right" as const },
];

/* ------------------------------------------------------------------ */
/*  Tier styling                                                       */
/* ------------------------------------------------------------------ */

function tierClasses(tier: 1 | 2 | 3): string {
  switch (tier) {
    case 1:
      return "text-xl lg:text-2xl font-bold text-purple-dark";
    case 2:
      return "text-sm lg:text-base font-semibold text-purple";
    case 3:
      return "text-xs lg:text-sm font-medium text-text-muted";
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TopicsCloud() {
  return (
    <section
      className="relative z-[3] bg-bg pt-4 pb-8 lg:pt-6 lg:pb-10 overflow-hidden"
      style={{ contain: "layout style" }}
    >
      {/* Title */}
      <div className="text-center mb-5">
        <span className="inline-flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.25em] uppercase text-purple-mid before:content-[''] before:w-6 before:h-px before:bg-purple-mid">
          Topics
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        {ROWS.map((topics, rowIdx) => {
          const { duration, direction } = ROW_CONFIG[rowIdx];

          return (
            <div key={rowIdx} className="relative">
              {/* Fade edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-bg to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-bg to-transparent" />

              <div
                className="flex items-center gap-6 lg:gap-10 w-max will-change-transform"
                style={{
                  animation: `marquee-${direction} ${duration}s linear infinite`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {/* Duplicate for seamless loop */}
                {[...topics, ...topics].map((topic, i) => (
                  <span
                    key={`${topic.label}-${i}`}
                    className={`shrink-0 whitespace-nowrap transition-all duration-300 cursor-default
                      hover:text-[#ff3c8e] hover:scale-105
                      ${tierClasses(topic.tier)}
                    `}
                  >
                    {topic.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
