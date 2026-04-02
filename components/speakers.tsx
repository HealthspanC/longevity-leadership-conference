"use client";

import { useState, useRef, useCallback } from "react";
import { SPEAKERS, LINKS } from "@/lib/constants";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

function SpeakerCard({
  speaker,
}: {
  speaker: (typeof SPEAKERS)[number];
}) {
  const [tapped, setTapped] = useState(false);
  const isOpen = tapped;

  return (
    <div
      className={cn(
        "group relative w-[240px] md:w-[260px] shrink-0 rounded-[16px] overflow-hidden cursor-pointer transition-shadow duration-500",
        "hover:shadow-[0_0_30px_rgba(168,124,224,0.2)]",
        isOpen && "!shadow-[0_0_30px_rgba(168,124,224,0.2)]"
      )}
      onClick={() => setTapped(!tapped)}
    >
      <div className="relative w-full aspect-[3/4] bg-purple-deep">
        {/* Placeholder gradient — will be replaced with <Image> when photos arrive */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-purple-deep to-[#1a1a2e]" />

        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='1'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Centered placeholder icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
            <User className="w-9 h-9 text-white/20" />
          </div>
        </div>

        {/* Bottom gradient — default */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
            "group-hover:opacity-0",
            isOpen && "!opacity-0"
          )}
        />
        {/* Bottom gradient — expanded */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 via-60% to-transparent transition-opacity duration-500",
            "opacity-0 group-hover:opacity-100",
            isOpen && "!opacity-100"
          )}
        />

        {/* Name + Role + Bio */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 z-[2]">
          <div className="inline-flex mb-1.5">
            <span className="text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-purple-light bg-white/[0.08] backdrop-blur-md border border-white/[0.1] rounded-full px-3 py-0.5">
              {speaker.role}
            </span>
          </div>
          <h3
            className={cn(
              "font-serif text-lg md:text-xl font-bold text-white leading-tight mb-0 transition-all duration-500",
              "group-hover:mb-2",
              isOpen && "!mb-2"
            )}
          >
            {speaker.name}
          </h3>

          {/* Bio — hover on desktop, tap on mobile */}
          <div
            className={cn(
              "max-h-0 opacity-0 transition-all duration-500 ease-out overflow-hidden",
              "md:group-hover:max-h-[200px] md:group-hover:opacity-100",
              isOpen && "!max-h-[200px] !opacity-100"
            )}
          >
            <p className="text-[0.75rem] text-white/65 leading-relaxed">
              {speaker.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeakerReel() {
  const items = [...SPEAKERS, ...SPEAKERS, ...SPEAKERS];
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pauseTimeout = useRef<ReturnType<typeof setTimeout>>();
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startTranslate: 0,
    currentX: 0,
  });

  const getTrackX = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const style = getComputedStyle(track);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m41;
  }, []);

  const freezeTrack = useCallback(() => {
    setPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
  }, []);

  const resumeAfterDelay = useCallback(() => {
    const track = trackRef.current;
    pauseTimeout.current = setTimeout(() => {
      if (track) {
        track.style.transition = "";
        track.style.transform = "";
      }
      setPaused(false);
    }, 4000);
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const track = trackRef.current;
      if (!track) return;

      freezeTrack();
      const currentX = getTrackX();

      const cardWidth = window.innerWidth >= 768 ? 280 : 256;
      const gap = window.innerWidth >= 768 ? 20 : 16;
      const step = cardWidth + gap;

      const newX =
        direction === "left" ? currentX + step : currentX - step;

      track.style.transform = `translateX(${newX}px)`;
      track.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";

      resumeAfterDelay();
    },
    [freezeTrack, getTrackX, resumeAfterDelay]
  );

  // Drag / swipe handlers
  const onDragStart = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;

      freezeTrack();
      track.style.transition = "none";

      dragState.current = {
        isDragging: true,
        startX: clientX,
        startTranslate: getTrackX(),
        currentX: clientX,
      };
    },
    [freezeTrack, getTrackX]
  );

  const onDragMove = useCallback((clientX: number) => {
    const ds = dragState.current;
    if (!ds.isDragging) return;

    const track = trackRef.current;
    if (!track) return;

    ds.currentX = clientX;
    const delta = clientX - ds.startX;
    track.style.transform = `translateX(${ds.startTranslate + delta}px)`;
  }, []);

  const onDragEnd = useCallback(() => {
    const ds = dragState.current;
    if (!ds.isDragging) return;
    ds.isDragging = false;

    const track = trackRef.current;
    if (!track) return;

    // Snap to nearest card
    const cardWidth = window.innerWidth >= 768 ? 280 : 256;
    const gap = window.innerWidth >= 768 ? 20 : 16;
    const step = cardWidth + gap;
    const delta = ds.currentX - ds.startX;
    const currentX = ds.startTranslate + delta;

    // Snap with momentum — if dragged more than 30% of a card, go to next
    const snapped =
      Math.abs(delta) > step * 0.3
        ? Math.round(currentX / step) * step
        : Math.round(ds.startTranslate / step) * step;

    track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translateX(${snapped}px)`;

    resumeAfterDelay();
  }, [resumeAfterDelay]);

  // Mouse events
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onDragStart(e.clientX);
    },
    [onDragStart]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      onDragMove(e.clientX);
    },
    [onDragMove]
  );

  const onMouseUp = useCallback(() => {
    onDragEnd();
  }, [onDragEnd]);

  const onMouseLeave = useCallback(() => {
    if (dragState.current.isDragging) onDragEnd();
  }, [onDragEnd]);

  // Touch events
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      onDragStart(e.touches[0].clientX);
    },
    [onDragStart]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      onDragMove(e.touches[0].clientX);
    },
    [onDragMove]
  );

  const onTouchEnd = useCallback(() => {
    onDragEnd();
  }, [onDragEnd]);

  return (
    <div className="relative mb-14">
      {/* Subtle fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-bg/55 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-bg/55 to-transparent z-10 pointer-events-none" />

      {/* Navigation arrows */}
      <button
        onClick={() => scroll("left")}
        aria-label="Previous speaker"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 border border-border-light shadow-sm flex items-center justify-center text-purple-deep transition-all hover:bg-white hover:shadow-md hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Next speaker"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 border border-border-light shadow-sm flex items-center justify-center text-purple-deep transition-all hover:bg-white hover:shadow-md hover:scale-105 active:scale-95"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Scrolling track — draggable + swipeable */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className={cn(
            "flex gap-4 md:gap-5 pointer-events-none",
            !paused &&
              "animate-[speaker-scroll_45s_linear_infinite]"
          )}
        >
          {items.map((speaker, i) => (
            <SpeakerCard key={i} speaker={speaker} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Speakers() {
  return (
    <section
      id="speakers"
      className="relative z-2 py-28 lg:py-32 overflow-hidden"
    >
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
      </div>

      {/* Full-bleed reel */}
      <FadeIn delay={100}>
        <SpeakerReel />
      </FadeIn>

      <div className="max-w-[1140px] mx-auto px-6">
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
