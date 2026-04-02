"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TileShape = "wide" | "tall" | "square";

interface GalleryTile {
  src: string;
  alt: string;
  shape: TileShape;
  /** Override object-position for custom cropping (e.g. "center 70%") */
  position?: string;
}

// Art-directed shapes per image. The layout uses these to size tiles.
// wide  → short & wide (landscape scenes, stages)
// tall  → narrow & tall (people standing, portraits)
// square → even, with a slight zoom to crop into the subject
const IMAGES: GalleryTile[] = [
  { src: "/gallery/HX4A4198.jpg",  alt: "Innovation Lab group photo",          shape: "wide" },
  { src: "/gallery/HX4A3790.jpg",  alt: "Networking by sponsor banner",        shape: "tall", position: "25% center" },
  { src: "/gallery/HX4A4146.jpg",  alt: "Tru Niagen booth",                   shape: "tall", position: "center 60%" },
  { src: "/gallery/DSC01036.JPG",  alt: "Hosts with sponsors at step-and-repeat", shape: "wide" },
  { src: "/gallery/HX4A3879.jpg",  alt: "Attendees chatting at vendor booth",  shape: "tall" },
  { src: "/gallery/DSC02303.jpg",  alt: "Panel discussion on stage",          shape: "wide" },
  { src: "/gallery/HX4A3785.jpg",  alt: "Vendor booth conversation",          shape: "square", position: "30% center" },
  { src: "/gallery/HX4A3829.jpg",  alt: "OsteoStrong booth",                  shape: "square" },
  { src: "/gallery/DSC01153.JPG",  alt: "Speakers presenting on main stage",  shape: "wide" },
  { src: "/gallery/HX4A3950.jpg",  alt: "Attendees networking in hallway",     shape: "tall" },
  { src: "/gallery/HX4A3631.jpg",  alt: "Speaker presenting research",        shape: "square", position: "35% center" },
  { src: "/gallery/DSC01126.JPG",  alt: "Panelists at wellness session",      shape: "wide" },
  { src: "/gallery/HX4A4078.jpg",  alt: "One-on-one conversation",            shape: "wide" },
  { src: "/gallery/DSC02355.jpg",  alt: "Hosts on stage",                     shape: "wide" },
  { src: "/gallery/HX4A4127.jpg",  alt: "Women chatting at booth",            shape: "tall" },
  { src: "/gallery/HX4A3877.jpg",  alt: "Attendees in conversation",          shape: "tall" },
  { src: "/gallery/DSC01209.JPG",  alt: "Medicine 4.0 keynote presentation",  shape: "wide" },
  { src: "/gallery/Longevity Clinic Panel.JPG", alt: "Longevity clinic panelists", shape: "wide" },
];

// --- Layout helpers ---

// Column width by the widest shape in the pair
function colWidth(a: GalleryTile, b: GalleryTile | null): string {
  const shapes = [a.shape, b?.shape].filter(Boolean) as TileShape[];
  // tall images get extra-wide columns so the image fills nicely
  if (shapes.includes("tall"))   return "clamp(280px, 36vw, 480px)";
  if (shapes.includes("wide"))   return "clamp(280px, 38vw, 520px)";
  return "clamp(240px, 28vw, 380px)"; // square
}

// Flex ratio determines vertical split between two tiles in a column
function flexForShape(shape: TileShape): number {
  if (shape === "wide")   return 2;   // short — takes less vertical space
  if (shape === "tall")   return 5;   // tall — takes more vertical space
  return 3;                            // square — middle ground
}

// Pair images into columns of 2
function buildColumns(images: GalleryTile[]): [GalleryTile, GalleryTile | null][] {
  const cols: [GalleryTile, GalleryTile | null][] = [];
  for (let i = 0; i < images.length; i += 2) {
    cols.push([images[i], images[i + 1] ?? null]);
  }
  return cols;
}

const COLUMNS = buildColumns(IMAGES);
const TOTAL_TILES = IMAGES.length;
const SCROLL_MULTIPLIER = 5;

// --- Lightbox ---

function Lightbox({
  tile,
  onClose,
  onPrev,
  onNext,
}: {
  tile: GalleryTile;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Close on Escape, navigate with arrows
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-xl"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Prev / Next arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-lg"
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-lg"
        aria-label="Next image"
      >
        ›
      </button>

      {/* Image */}
      <div
        className="relative w-[90vw] h-[85vh] max-w-[1200px] animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

// --- Main Gallery ---

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

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

      const trackWidth = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(${-pct * trackWidth}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevImage = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i - 1 + TOTAL_TILES) % TOTAL_TILES : null));
  }, []);
  const nextImage = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i + 1) % TOTAL_TILES : null));
  }, []);

  // Track the global image index as we render columns
  let globalIdx = 0;

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="relative z-[3] bg-bg"
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
                const topIdx = globalIdx++;
                const bottomIdx = bottom ? globalIdx++ : -1;
                const w = colWidth(top, bottom);

                const topFlex = flexForShape(top.shape);
                const bottomFlex = bottom ? flexForShape(bottom.shape) : 0;

                return (
                  <div
                    key={colIdx}
                    className="h-full flex flex-col gap-3 shrink-0"
                    style={{ width: w }}
                  >
                    <Tile tile={top} flex={topFlex} onClick={() => openLightbox(topIdx)} />
                    {bottom && (
                      <Tile tile={bottom} flex={bottomFlex} onClick={() => openLightbox(bottomIdx)} />
                    )}
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

      {/* Lightbox modal */}
      {lightboxIdx !== null && (
        <Lightbox
          tile={IMAGES[lightboxIdx]}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}

// --- Tile ---

function Tile({
  tile,
  flex,
  onClick,
}: {
  tile: GalleryTile;
  flex: number;
  onClick: () => void;
}) {
  // Square images get a slight zoom to crop into the subject
  const isSquare = tile.shape === "square";

  return (
    <div
      className="relative rounded-[12px] overflow-hidden group cursor-pointer"
      style={{ flex }}
      onClick={onClick}
    >
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        sizes="(max-width: 768px) 50vw, 520px"
        className={cn(
          "object-cover transition-transform duration-500 group-hover:scale-105",
          isSquare && "scale-125"
        )}
        style={tile.position ? { objectPosition: tile.position } : undefined}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>
    </div>
  );
}
