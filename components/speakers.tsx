"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { SPEAKERS, LINKS } from "@/lib/constants";
import { User, ChevronLeft, ChevronRight, Quote, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

type Speaker = (typeof SPEAKERS)[number];
const hasImage = (s: Speaker): s is Speaker & { image: string } =>
  "image" in s && typeof (s as Record<string, unknown>).image === "string";

/* ── Speaker photo or placeholder ── */
function SpeakerPhoto({
  speaker,
  sizes,
  className,
}: {
  speaker: Speaker;
  sizes: string;
  className?: string;
}) {
  if (hasImage(speaker)) {
    return (
      <Image
        src={speaker.image}
        alt={speaker.name}
        fill
        className={cn("object-cover object-top", className)}
        sizes={sizes}
      />
    );
  }
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-purple-deep to-[#1a1a2e]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='1'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
          <User className="w-8 h-8 text-white/15" />
        </div>
      </div>
    </>
  );
}

/* ── Desktop: Unified speaker reel ── */
function SpeakerReel({
  activeIndex,
  onPrev,
  onNext,
  onOpenModal,
}: {
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenModal: (speaker: Speaker) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const didDrag = useRef(false);

  // Rotate speakers so activeIndex is first
  const rotated = [
    ...SPEAKERS.slice(activeIndex),
    ...SPEAKERS.slice(0, activeIndex),
  ];

  // Reset scroll to start when active changes
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeIndex]);

  /* ── Drag/swipe handlers ── */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.clientX;
    scrollLeftPos.current = el.scrollLeft;
    el.style.scrollSnapType = "none";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) didDrag.current = true;
    el.scrollLeft = scrollLeftPos.current - dx;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = scrollRef.current;
    if (!el) return;
    el.style.scrollSnapType = "";
  }, []);

  return (
    <div className="relative">
      {/* Arrow controls — top right */}
      <div className="flex items-center justify-end mb-5">
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            aria-label="Previous speaker"
            className="w-9 h-9 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all hover:border-purple hover:text-purple active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            aria-label="Next speaker"
            className="w-9 h-9 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all hover:border-purple hover:text-purple active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Single row: featured (large) + rest (small) */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 cursor-grab select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {rotated.map((speaker, i) => {
          const isFeatured = i === 0;

          if (isFeatured) {
            return (
              <div
                key={`featured-${activeIndex}`}
                className="shrink-0 w-[340px] cursor-pointer"
                onClick={() => {
                  if (!didDrag.current) onOpenModal(speaker);
                }}
              >
                <div className="relative rounded-[18px] overflow-hidden h-full min-h-[440px]">
                  <SpeakerPhoto speaker={speaker} sizes="340px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 via-40% to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 z-[2]">
                    <h3 className="font-serif text-xl font-bold text-white leading-tight mb-1">
                      {speaker.name}
                    </h3>
                    <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-purple-light">
                      2026 {speaker.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={`card-${(activeIndex + i) % SPEAKERS.length}`}
              className="shrink-0 w-[230px] cursor-pointer"
              onClick={() => {
                if (!didDrag.current) onOpenModal(speaker);
              }}
            >
              <div className="relative rounded-[14px] overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(168,124,224,0.2)] hover:-translate-y-0.5">
                <div className="relative w-full aspect-[4/3] bg-purple-deep">
                  <SpeakerPhoto speaker={speaker} sizes="230px" />
                </div>
                <div className="p-4 bg-bg-card">
                  <p className="text-[0.78rem] text-text-secondary leading-relaxed mb-3 line-clamp-3">
                    &ldquo;{speaker.bio}&rdquo;
                  </p>
                  <h4 className="font-serif text-base font-bold text-text leading-tight mb-0.5">
                    {speaker.name}
                  </h4>
                  <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-purple">
                    2026 {speaker.role}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Mobile: Swipeable carousel for confirmed speakers ── */
function MobileSpeakerCarousel({
  onOpenModal,
}: {
  onOpenModal: (speaker: Speaker) => void;
}) {
  const confirmed = SPEAKERS.filter(hasImage);
  const tba = SPEAKERS.filter((s) => !hasImage(s));
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Track which card is active via scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.firstElementChild?.clientWidth ?? 1;
      const gap = 16; // gap-4
      const idx = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIdx(Math.min(idx, confirmed.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [confirmed.length]);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
    }
  }, []);

  const goPrev = useCallback(() => {
    setActiveIdx((i) => {
      const next = Math.max(0, i - 1);
      scrollTo(next);
      return next;
    });
  }, [scrollTo]);

  const goNext = useCallback(() => {
    setActiveIdx((i) => {
      const next = Math.min(confirmed.length - 1, i + 1);
      scrollTo(next);
      return next;
    });
  }, [scrollTo, confirmed.length]);

  // Mouse drag support for desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const didDrag = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.clientX;
    scrollLeftPos.current = el.scrollLeft;
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) didDrag.current = true;
    el.scrollLeft = scrollLeftPos.current - dx;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = scrollRef.current;
    if (!el) return;
    el.style.scrollSnapType = "";
    el.style.cursor = "";
  }, []);

  return (
    <div className="lg:hidden mb-14">
      {/* Arrow controls + counter */}
      {confirmed.length > 1 && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-text-muted font-medium tabular-nums">
            {activeIdx + 1} / {confirmed.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={goPrev}
              disabled={activeIdx === 0}
              aria-label="Previous speaker"
              className="w-9 h-9 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all hover:border-purple hover:text-purple active:scale-95 disabled:opacity-30 disabled:hover:border-border-light disabled:hover:text-text-muted"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              disabled={activeIdx === confirmed.length - 1}
              aria-label="Next speaker"
              className="w-9 h-9 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all hover:border-purple hover:text-purple active:scale-95 disabled:opacity-30 disabled:hover:border-border-light disabled:hover:text-text-muted"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Confirmed speakers — horizontal swipe cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 cursor-grab select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {confirmed.map((speaker, i) => (
          <div
            key={i}
            className="shrink-0 w-[80vw] max-w-[340px] snap-start cursor-pointer"
            onClick={() => {
              if (!didDrag.current) onOpenModal(speaker);
            }}
          >
            <div className="relative rounded-[18px] overflow-hidden bg-bg-card shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              {/* Taller image with gradient overlay */}
              <div className="relative w-full aspect-[4/5] bg-purple-deep">
                <SpeakerPhoto speaker={speaker} sizes="80vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 via-40% to-transparent" />
                {/* Name overlay on image */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-[2]">
                  <h3 className="font-serif text-xl font-bold text-white leading-tight mb-0.5">
                    {speaker.name}
                  </h3>
                  <span className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-purple-light">
                    2026 {speaker.role}
                  </span>
                </div>
              </div>
              {/* Compact info below */}
              <div className="p-5">
                <p className="font-serif text-[0.9rem] text-text/80 leading-relaxed italic line-clamp-2">
                  &ldquo;{speaker.quote}&rdquo;
                </p>
                <p className="text-[0.75rem] text-purple font-semibold mt-3 tracking-wide uppercase">
                  Tap to learn more &rarr;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active dots */}
      {confirmed.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 mb-8">
          {confirmed.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to speaker ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIdx
                  ? "w-6 bg-purple"
                  : "w-1.5 bg-purple/25 hover:bg-purple/40"
              )}
            />
          ))}
        </div>
      )}

      {/* TBA speakers — compact horizontal row */}
      {tba.length > 0 && (
        <div className="mt-2">
          <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-text-muted mb-4">
            More speakers coming soon
          </p>
          <div className="grid grid-cols-2 gap-3">
            {tba.map((speaker, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-[12px] bg-bg-card border border-border-light/50"
              >
                {/* Small circular placeholder */}
                <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden bg-purple-deep">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-dark to-[#1a1a2e]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="w-4 h-4 text-white/20" />
                  </div>
                </div>
                <div className="min-w-0">
                  <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-purple block">
                    2026
                  </span>
                  <span className="text-[0.75rem] font-semibold text-text leading-tight block truncate">
                    {speaker.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Speaker Modal (portaled to body) ── */
function SpeakerModal({
  speaker,
  onClose,
}: {
  speaker: Speaker;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" />

      <div
        className="relative bg-bg rounded-[20px] overflow-hidden max-w-[860px] w-full max-h-[85vh] shadow-[0_25px_80px_rgba(0,0,0,0.3)] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all md:top-4 md:right-4"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative w-full md:w-[44%] shrink-0 aspect-[3/2] md:aspect-auto md:min-h-full">
          <SpeakerPhoto
            speaker={speaker}
            sizes="(min-width: 768px) 380px, 100vw"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-purple mb-2.5 block">
            2026 {speaker.role}
          </span>
          <h3 className="font-serif text-[1.6rem] md:text-[1.8rem] font-bold text-text leading-tight mb-5">
            {speaker.name}
          </h3>

          <div className="mb-5 pl-4 border-l-[2.5px] border-purple-light/40">
            <p className="font-serif text-[0.95rem] md:text-[1.05rem] text-text/80 leading-relaxed italic">
              &ldquo;{speaker.quote}&rdquo;
            </p>
          </div>

          <p className="text-[0.88rem] text-text-secondary leading-[1.7]">
            {speaker.bio}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Main Section ── */
export function Speakers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalSpeaker, setModalSpeaker] = useState<Speaker | null>(null);
  const total = SPEAKERS.length;
  const goPrev = useCallback(
    () => setActiveIndex((i) => (i - 1 + total) % total),
    [total]
  );
  const goNext = useCallback(
    () => setActiveIndex((i) => (i + 1) % total),
    [total]
  );

  return (
    <section id="speakers" className="relative z-[3] py-28 lg:py-32 bg-bg">
      <div className="max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Featured Speakers"
            title="Industry Leaders"
            accentWord="Leaders"
            subtitle="World-class clinicians, researchers, investors, and business leaders sharing breakthrough insights on longevity."
            centered
          />
        </FadeIn>

        {/* Desktop: Unified speaker reel */}
        <FadeIn delay={100}>
          <div className="hidden lg:block mb-14">
            <SpeakerReel
              activeIndex={activeIndex}
              onPrev={goPrev}
              onNext={goNext}
              onOpenModal={setModalSpeaker}
            />
          </div>
        </FadeIn>

        {/* Mobile: Swipeable carousel + compact TBA grid */}
        <FadeIn delay={100}>
          <MobileSpeakerCarousel onOpenModal={setModalSpeaker} />
        </FadeIn>

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

      {modalSpeaker && (
        <SpeakerModal
          speaker={modalSpeaker}
          onClose={() => setModalSpeaker(null)}
        />
      )}
    </section>
  );
}
