"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryTile {
  title: string;
  subtitle: string;
  gradient: string;
  aspect: "1/1" | "4/3";
  // image?: string; — uncomment when adding real images
}

// Grid is arranged as columns, each column has a top and bottom tile.
// Varying 1:1 and 4:3 ratios creates a dynamic mosaic feel.
const COLUMNS: [GalleryTile, GalleryTile][] = [
  [
    {
      title: "Keynote Presentations",
      subtitle: "Groundbreaking longevity research.",
      gradient: "linear-gradient(145deg, #2d1b4e 0%, #5b3a8c 60%, #7b52b5 100%)",
      aspect: "4/3",
    },
    {
      title: "Executive Networking",
      subtitle: "Forging powerful connections.",
      gradient: "linear-gradient(160deg, #3c2066, #6b4090)",
      aspect: "1/1",
    },
  ],
  [
    {
      title: "Biotech Showcase",
      subtitle: "Live health-tech demonstrations.",
      gradient: "linear-gradient(135deg, #1e3a4c, #2a6058, #2a7a6e)",
      aspect: "1/1",
    },
    {
      title: "Expert Panels",
      subtitle: "Deep-dive healthspan discussions.",
      gradient: "linear-gradient(150deg, #2d1b4e, #4a2d6e, #6b4090)",
      aspect: "4/3",
    },
  ],
  [
    {
      title: "Healthspan in Action",
      subtitle: "Immersive wellness experiences.",
      gradient: "linear-gradient(135deg, #4a2040, #7a3060, #c06080)",
      aspect: "4/3",
    },
    {
      title: "Investor Roundtables",
      subtitle: "Connecting capital with ventures.",
      gradient: "linear-gradient(140deg, #1a2e2a, #2a5a4e, #3a8a7a)",
      aspect: "1/1",
    },
  ],
  [
    {
      title: "Awards Ceremony",
      subtitle: "Recognizing longevity pioneers.",
      gradient: "linear-gradient(160deg, #1a1a2e, #2d1b4e, #3c2066)",
      aspect: "1/1",
    },
    {
      title: "Verizon Innovation Lab",
      subtitle: "Silicon Beach, Playa Vista.",
      gradient: "linear-gradient(135deg, #2d1b4e, #5b3a8c)",
      aspect: "4/3",
    },
  ],
  [
    {
      title: "VIP Reception",
      subtitle: "Exclusive pre-event gathering.",
      gradient: "linear-gradient(145deg, #3c2066, #5b3a8c, #7b52b5)",
      aspect: "4/3",
    },
    {
      title: "Fireside Chats",
      subtitle: "Intimate leadership conversations.",
      gradient: "linear-gradient(135deg, #1a2e2a, #2a5a4e)",
      aspect: "1/1",
    },
  ],
  [
    {
      title: "Longevity Lab",
      subtitle: "Hands-on biomarker testing.",
      gradient: "linear-gradient(150deg, #2a4a5e, #1e3a4c, #2a7a6e)",
      aspect: "1/1",
    },
    {
      title: "Closing Gala",
      subtitle: "An unforgettable evening.",
      gradient: "linear-gradient(160deg, #4a2040, #7a3060, #c06080)",
      aspect: "4/3",
    },
  ],
];

const TOTAL_TILES = COLUMNS.length * 2;
const SCROLL_MULTIPLIER = 5; // number of 100vh sections for scroll distance

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollableDistance = sectionHeight - viewportHeight;
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      setProgress(pct);

      // Translate the track horizontally
      const trackWidth = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(${-pct * trackWidth}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let tileIndex = 0;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative z-2"
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="pt-28 pb-6 px-6 shrink-0">
          <div className="max-w-[1140px] mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <span className="inline-flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.25em] uppercase text-purple-mid mb-3.5 before:content-[''] before:w-6 before:h-px before:bg-purple-mid">
                  Past Highlights
                </span>
                <h2 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.15]">
                  Event <span className="text-purple">Gallery</span>
                </h2>
              </div>

              {/* Progress indicator */}
              <div className="hidden md:flex items-center gap-4 pb-2">
                <span className="text-sm text-text-muted font-medium tabular-nums">
                  {String(Math.min(Math.round(progress * TOTAL_TILES) + 1, TOTAL_TILES)).padStart(2, "0")} / {String(TOTAL_TILES).padStart(2, "0")}
                </span>
                <div className="w-32 h-[2px] bg-border-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple rounded-full transition-all duration-150 ease-out"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal mosaic grid */}
        <div className="flex-1 relative min-h-0">
          <div
            ref={trackRef}
            className="absolute top-0 left-0 h-full flex gap-3 px-6 will-change-transform"
            style={{ width: "max-content" }}
          >
            {COLUMNS.map((column, colIdx) => {
              const [top, bottom] = column;
              const topIdx = tileIndex++;
              const bottomIdx = tileIndex++;

              return (
                <div
                  key={colIdx}
                  className="h-full flex flex-col gap-3 shrink-0"
                  style={{ width: "clamp(220px, 28vw, 340px)" }}
                >
                  {/* Top tile */}
                  <Tile tile={top} index={topIdx} />
                  {/* Bottom tile */}
                  <Tile tile={bottom} index={bottomIdx} />
                </div>
              );
            })}

            {/* End spacer */}
            <div className="shrink-0 w-6" />
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
          style={{ opacity: progress > 0.05 ? 0 : 0.6 }}
        >
          <span className="text-xs text-text-muted font-medium tracking-wider uppercase">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-text-muted/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ tile, index }: { tile: GalleryTile; index: number }) {
  // 1:1 tiles take less vertical space, 4:3 tiles take more
  const flexValue = tile.aspect === "1/1" ? "3" : "4";

  return (
    <div
      className="relative rounded-[12px] overflow-hidden group cursor-pointer"
      style={{ flex: flexValue }}
    >
      {/* Background — swap gradient for Image when adding photos */}
      <div className="absolute inset-0" style={{ background: tile.gradient }} />

      {/* Hatch texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.06'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Shimmer */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.04)_50%,transparent_70%)] bg-[length:200%_100%] animate-[gallery-shimmer_4s_ease-in-out_infinite] pointer-events-none" />

      {/* Bottom gradient for text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Tile number */}
      <div className="absolute top-4 left-5 text-white/10 font-serif text-[3rem] font-bold leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-[2]">
        <h3 className="font-serif text-lg font-bold text-white mb-1 leading-tight">
          {tile.title}
        </h3>
        <p className="text-xs text-white/55 leading-relaxed">
          {tile.subtitle}
        </p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3]" />
    </div>
  );
}
