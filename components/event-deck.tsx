"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { INVOLVE_CARDS } from "@/lib/constants";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

const TOTAL_SLIDES = 17;
const slides = Array.from({ length: TOTAL_SLIDES }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return `/deck/slide-${num}.jpg`;
});

function SlideViewer({
  current,
  go,
  isFullscreen,
  onToggleFullscreen,
}: {
  current: number;
  go: (dir: -1 | 1) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      go(touchDelta.current < 0 ? 1 : -1);
    }
  };

  return (
    <div className="relative select-none">
      {/* Slide area */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg aspect-video border-4 border-purple-deep"
        )}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((src, i) => {
          const isVisible = i === current;
          const isAdjacent =
            i === (current + 1) % TOTAL_SLIDES ||
            i === (current - 1 + TOTAL_SLIDES) % TOTAL_SLIDES;
          if (!isVisible && !isAdjacent) return null;
          return (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <Image
                src={src}
                alt={`Event deck slide ${i + 1}`}
                fill
                className="object-contain"
                sizes={isFullscreen ? "90vw" : "(max-width: 768px) 100vw, 1140px"}
                priority={i === 0}
              />
            </div>
          );
        })}

        {/* Left/Right nav */}
        <button
          onClick={() => go(-1)}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Fullscreen toggle */}
        <button
          onClick={onToggleFullscreen}
          className="absolute top-2 right-2 md:top-4 md:right-4 w-9 h-9 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all z-10"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Bottom bar: progress + counter */}
      <div
        className={cn(
          "flex items-center gap-4 mt-4",
          isFullscreen && "absolute bottom-6 left-1/2 -translate-x-1/2 w-[min(90vw,700px)]"
        )}
      >
        <div className={cn("flex-1 h-1 rounded-full overflow-hidden", isFullscreen ? "bg-white/10" : "bg-purple-deep/15")}>
          <div
            className={cn("h-full rounded-full transition-all duration-500 ease-out", isFullscreen ? "bg-purple-light" : "bg-purple-deep")}
            style={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }}
          />
        </div>
        <span className={cn("text-xs font-mono tabular-nums shrink-0", isFullscreen ? "text-white/40" : "text-purple-deep/50")}>
          {String(current + 1).padStart(2, "0")} / {TOTAL_SLIDES}
        </span>
      </div>
    </div>
  );
}

function FullscreenOverlay({
  current,
  go,
  onClose,
}: {
  current: number;
  go: (dir: -1 | 1) => void;
  onClose: () => void;
}) {
  return createPortal(
    <div
      className="fixed inset-0 z-[1100] bg-black/95 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-[90vw] max-h-[90vh]">
        <SlideViewer
          current={current}
          go={go}
          isFullscreen
          onToggleFullscreen={onClose}
        />
      </div>
    </div>,
    document.body
  );
}

export function EventDeck() {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const go = useCallback((dir: -1 | 1) => {
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return TOTAL_SLIDES - 1;
      if (next >= TOTAL_SLIDES) return 0;
      return next;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, isFullscreen]);

  return (
    <>
      {/* Purple banner header */}
      <section id="partnerships" className="relative z-[3] pt-16 lg:pt-20 pb-12 lg:pb-14 bg-purple-deep overflow-hidden">
        {/* Gradient overlays */}
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
              label="Event Deck"
              title="Partnership Overview"
              accentWord="Overview"
              subtitle="Explore partnership opportunities and learn more about the Longevity Leadership Conference."
              centered
              dark
            />
            <div className="flex items-center justify-center -mt-6">
              <a
                href={INVOLVE_CARDS[1].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white py-2.5 px-6 rounded-full font-semibold text-[0.85rem] transition-all hover:bg-white hover:text-purple-deep hover:-translate-y-0.5"
              >
                Become a Partner
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Slide viewer */}
      <section className="relative z-[3] py-12 lg:py-16 bg-bg overflow-hidden">
        <div className="relative z-10 max-w-[1140px] mx-auto px-6">
          <FadeIn>
            <SlideViewer
              current={current}
              go={go}
              isFullscreen={false}
              onToggleFullscreen={() => setIsFullscreen(true)}
            />
          </FadeIn>
        </div>

        {isFullscreen && (
          <FullscreenOverlay
            current={current}
            go={go}
            onClose={() => setIsFullscreen(false)}
          />
        )}
      </section>
    </>
  );
}
