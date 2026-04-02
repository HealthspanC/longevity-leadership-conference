"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { SPEAKERS, LINKS } from "@/lib/constants";
import { User, ChevronLeft, ChevronRight, Quote, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

type Speaker = (typeof SPEAKERS)[number];
const hasImage = (s: Speaker): s is Speaker & { image: string } =>
  "image" in s && typeof (s as Record<string, unknown>).image === "string";

/* ── Featured Speaker (left panel) with crossfade ── */
function FeaturedSpeaker({
  speaker,
  speakerIndex,
}: {
  speaker: (typeof SPEAKERS)[number];
  speakerIndex: number;
}) {
  const [displayed, setDisplayed] = useState(speaker);
  const [displayedIndex, setDisplayedIndex] = useState(speakerIndex);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (speakerIndex === displayedIndex) return;
    // Fade out
    setFading(true);
    const t = setTimeout(() => {
      // Swap content at midpoint, then fade in
      setDisplayed(speaker);
      setDisplayedIndex(speakerIndex);
      setFading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [speaker, speakerIndex, displayedIndex]);

  return (
    <div className="relative rounded-[20px] overflow-hidden aspect-[3/4] lg:aspect-auto lg:h-full min-h-[420px]">
      {/* Background: photo or placeholder gradient */}
      {hasImage(displayed) ? (
        <Image
          src={displayed.image}
          alt={displayed.name}
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-purple-deep to-[#1a1a2e]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='1'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
              <User className="w-14 h-14 text-white/15" />
            </div>
          </div>
        </>
      )}

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 via-40% to-transparent" />

      {/* Name + role caption — crossfade transition */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-6 md:p-7 z-[2] transition-all duration-300",
          fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}
      >
        <h3 className="font-serif text-xl font-bold text-white leading-tight mb-1">
          {displayed.name}
        </h3>
        <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-purple-light">
          2026 {displayed.role}
        </span>
      </div>
    </div>
  );
}

/* ── Small Speaker Card (right carousel) ── */
function SpeakerCard({
  speaker,
  isActive,
  onClick,
}: {
  speaker: (typeof SPEAKERS)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[14px] overflow-hidden cursor-pointer transition-all duration-400",
        "hover:shadow-[0_0_24px_rgba(168,124,224,0.2)] hover:-translate-y-0.5",
        isActive &&
          "ring-2 ring-purple-light shadow-[0_0_24px_rgba(168,124,224,0.25)]"
      )}
      onClick={onClick}
    >
      {/* Photo or placeholder */}
      <div className="relative w-full aspect-[4/3] bg-purple-deep">
        {hasImage(speaker) ? (
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover object-top"
            sizes="260px"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-purple-deep to-[#1a1a2e]" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='1'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                <User className="w-6 h-6 text-white/20" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Text below image */}
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
  );
}

/* ── Carousel (right panel) — excludes the featured speaker ── */
function SpeakerCarousel({
  activeIndex,
  onSelect,
  onOpenModal,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
  onOpenModal: (speaker: Speaker) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const didDrag = useRef(false);

  // All speakers except the currently featured one
  const carouselSpeakers = SPEAKERS.map((s, i) => ({ speaker: s, originalIndex: i })).filter(
    (_, i) => i !== activeIndex
  );

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 260 + 16;
    el.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  }, []);

  /* ── Drag/swipe handlers ── */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.clientX;
    scrollLeft.current = el.scrollLeft;
    el.style.scrollSnapType = "none";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) didDrag.current = true;
    el.scrollLeft = scrollLeft.current - dx;
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
      {/* Arrow controls */}
      <div className="flex items-center justify-end mb-5">
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous speaker"
            className="w-9 h-9 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all hover:border-purple hover:text-purple active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next speaker"
            className="w-9 h-9 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all hover:border-purple hover:text-purple active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable cards — draggable */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 cursor-grab select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {carouselSpeakers.map(({ speaker, originalIndex }) => (
          <div
            key={originalIndex}
            className="w-[240px] md:w-[260px] shrink-0 snap-start"
          >
            <SpeakerCard
              speaker={speaker}
              isActive={false}
              onClick={() => {
                if (!didDrag.current) {
                  onSelect(originalIndex);
                  onOpenModal(speaker);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile Speaker Card (equal treatment) ── */
function MobileSpeakerCard({
  speaker,
  onClick,
}: {
  speaker: (typeof SPEAKERS)[number];
  onClick: () => void;
}) {
  return (
    <div className="relative rounded-[16px] overflow-hidden bg-bg-card cursor-pointer transition-all duration-300 hover:shadow-[0_0_24px_rgba(168,124,224,0.15)]" onClick={onClick}>
      {/* Photo or placeholder */}
      <div className="relative w-full aspect-[3/2] bg-purple-deep">
        {hasImage(speaker) ? (
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover object-top"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-purple-deep to-[#1a1a2e]" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='1'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                <User className="w-7 h-7 text-white/20" />
              </div>
            </div>
          </>
        )}
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <Quote className="w-4 h-4 text-purple-light mb-2.5 opacity-50" />
        <p className="font-serif text-[0.95rem] text-text/90 leading-relaxed italic mb-3">
          &ldquo;{speaker.quote}&rdquo;
        </p>
        <p className="text-[0.8rem] text-text-secondary leading-relaxed mb-3">
          {speaker.bio}
        </p>
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-text">{speaker.name}</h4>
          <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-purple">
            2026 {speaker.role}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Speaker Modal ── */
function SpeakerModal({
  speaker,
  onClose,
}: {
  speaker: Speaker;
  onClose: () => void;
}) {
  useEffect(() => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-bg rounded-[20px] overflow-hidden max-w-[680px] w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[4/3]">
          {hasImage(speaker) ? (
            <Image
              src={speaker.image}
              alt={speaker.name}
              fill
              className="object-cover object-top"
              sizes="680px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-purple-deep to-[#1a1a2e] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                <User className="w-12 h-12 text-white/15" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="px-8 pb-8 -mt-8 relative">
          <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-purple mb-2 block">
            2026 {speaker.role}
          </span>
          <h3 className="font-serif text-2xl font-bold text-text mb-4">
            {speaker.name}
          </h3>
          <Quote className="w-5 h-5 text-purple-light mb-2 opacity-50" />
          <p className="font-serif text-[1.05rem] text-text/85 leading-relaxed italic mb-5">
            &ldquo;{speaker.quote}&rdquo;
          </p>
          <p className="text-[0.9rem] text-text-secondary leading-relaxed">
            {speaker.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export function Speakers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalSpeaker, setModalSpeaker] = useState<Speaker | null>(null);

  return (
    <section
      id="speakers"
      className="relative z-2 py-28 lg:py-32"
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

        {/* Desktop: Split layout — Featured + Carousel */}
        <FadeIn delay={100}>
          <div className="hidden lg:grid lg:grid-cols-[minmax(360px,1fr)_1.4fr] gap-8 mb-14">
            {/* Left — Featured speaker (click to open modal) */}
            <div className="cursor-pointer" onClick={() => setModalSpeaker(SPEAKERS[activeIndex])}>
              <FeaturedSpeaker speaker={SPEAKERS[activeIndex]} speakerIndex={activeIndex} />
            </div>

            {/* Right — Carousel */}
            <div className="min-w-0">
              <SpeakerCarousel
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                onOpenModal={setModalSpeaker}
              />
            </div>
          </div>
        </FadeIn>

        {/* Mobile: Equal grid of all speakers */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden mb-14">
            {SPEAKERS.map((speaker, i) => (
              <MobileSpeakerCard key={i} speaker={speaker} onClick={() => setModalSpeaker(speaker)} />
            ))}
          </div>
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

      {/* Speaker detail modal */}
      {modalSpeaker && (
        <SpeakerModal
          speaker={modalSpeaker}
          onClose={() => setModalSpeaker(null)}
        />
      )}
    </section>
  );
}
