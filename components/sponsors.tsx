"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SPONSORS } from "@/lib/constants";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "./fade-in";
import { ExperiencesModal } from "./experiences-modal";

type Sponsor = (typeof SPONSORS)[number];

/* ── Word-by-word reveal header ── */
function RevealHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const label = "Our Sponsors";
  const words = ["Powering", "the", "Future", "of", "Longevity"];
  const accentWord = "Future";
  const subtitle =
    "These visionary organizations make the Longevity Leadership Conference possible through their commitment to advancing healthspan science and innovation.";

  return (
    <div ref={ref} className="text-center mb-14">
      {/* Label */}
      <span
        className={cn(
          "inline-flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.25em] uppercase mb-3.5 text-purple-mid",
          "before:content-[''] before:w-6 before:h-px before:bg-purple-mid",
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        {label}
      </span>

      {/* Title — word by word */}
      <h2 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.15] mb-4 text-text">
        {words.map((word, i) => (
          <span
            key={i}
            className={cn(
              "inline-block transition-all duration-600 ease-out mr-[0.3em] last:mr-0",
              word === accentWord ? "text-purple" : "",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            style={{
              transitionDelay: isVisible ? `${300 + i * 100}ms` : "0ms",
            }}
          >
            {word}
          </span>
        ))}
      </h2>

      {/* Subtitle */}
      <p
        className={cn(
          "text-[1.05rem] leading-[1.75] max-w-[580px] mx-auto text-text-secondary transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: isVisible ? "900ms" : "0ms" }}
      >
        {subtitle}
      </p>
    </div>
  );
}

/* ── Sponsor Logo ── */
function SponsorLogo({
  sponsor,
  className,
}: {
  sponsor: Sponsor;
  className?: string;
}) {
  return (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={300}
      height={200}
      className={cn("max-h-full max-w-full object-contain", className)}
    />
  );
}

/* ── Desktop: Horizontal scrolling reel ── */
function SponsorCard({
  sponsor,
  onOpenModal,
}: {
  sponsor: Sponsor;
  onOpenModal: (sponsor: Sponsor) => void;
}) {
  return (
    <div
      className="shrink-0 w-[260px] cursor-pointer"
      onClick={() => onOpenModal(sponsor)}
    >
      <div className="relative rounded-[14px] overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(168,124,224,0.25)] hover:-translate-y-0.5 ring-1 ring-purple-mid/[0.12] hover:ring-purple-mid/[0.25]">
        {/* Logo area — white with radial glow */}
        <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(91,58,140,0.06),transparent_70%)]" />
          <SponsorLogo sponsor={sponsor} className="relative z-[1]" />
        </div>
        {/* Info below — dark purple */}
        <div className="p-4 bg-gradient-to-br from-purple-deep via-[#3c2066] to-[#2d1b4e]">
          <p className="text-[0.78rem] text-white/50 leading-relaxed mb-3 line-clamp-1">
            {sponsor.tagline}
          </p>
          <h4 className="font-serif text-base font-bold text-white leading-tight">
            {sponsor.name}
          </h4>
        </div>
      </div>
    </div>
  );
}

function SponsorReel({
  onOpenModal,
}: {
  onOpenModal: (sponsor: Sponsor) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const pauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Card width (260) + gap (20) = 280px per item
  const itemWidth = 280;
  const totalWidth = SPONSORS.length * itemWidth;

  // Start marquee only when section is visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 1.0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // Pause auto-scroll briefly after manual navigation
    setPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setPaused(false), 4000);
    el.scrollBy({ left: dir === "left" ? -itemWidth : itemWidth, behavior: "smooth" });
  }, []);

  // Auto-scroll: smoothly increment scrollLeft, loop seamlessly
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || paused || !inView) return;
    let raf: number;
    let last = performance.now();
    const speed = 0.5; // px per frame at 60fps feel — slow & elegant

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      el.scrollLeft += speed * (dt / 16.67);
      // Seamless loop: when we've scrolled past the first set, jump back
      if (el.scrollLeft >= totalWidth) {
        el.scrollLeft -= totalWidth;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, inView, totalWidth]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
        setPaused(false);
      }}
    >
      {/* Arrow controls — top right */}
      <div className="flex items-center justify-end mb-5">
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all hover:border-purple hover:text-purple active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all hover:border-purple hover:text-purple active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrolling row with edge fades */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-r from-bg/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-l from-bg/80 to-transparent" />

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* First set */}
          {SPONSORS.map((sponsor, i) => (
            <SponsorCard key={`a-${i}`} sponsor={sponsor} onOpenModal={onOpenModal} />
          ))}
          {/* Duplicate set for seamless loop */}
          {SPONSORS.map((sponsor, i) => (
            <SponsorCard key={`b-${i}`} sponsor={sponsor} onOpenModal={onOpenModal} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mobile: Swipeable carousel ── */
function MobileSponsorCarousel({
  onOpenModal,
}: {
  onOpenModal: (sponsor: Sponsor) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.firstElementChild?.clientWidth ?? 1;
      const gap = 16;
      const idx = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIdx(Math.min(idx, SPONSORS.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

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
      const next = Math.min(SPONSORS.length - 1, i + 1);
      scrollTo(next);
      return next;
    });
  }, [scrollTo]);

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
    <div className="lg:hidden mb-8">
      {/* Arrow controls + counter */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-text-muted font-medium tabular-nums">
          {activeIdx + 1} / {SPONSORS.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={goPrev}
            disabled={activeIdx === 0}
            aria-label="Previous sponsor"
            className="w-9 h-9 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all hover:border-purple hover:text-purple active:scale-95 disabled:opacity-30 disabled:hover:border-border-light disabled:hover:text-text-muted"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goNext}
            disabled={activeIdx === SPONSORS.length - 1}
            aria-label="Next sponsor"
            className="w-9 h-9 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all hover:border-purple hover:text-purple active:scale-95 disabled:opacity-30 disabled:hover:border-border-light disabled:hover:text-text-muted"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Swipeable cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 cursor-grab select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {SPONSORS.map((sponsor, i) => (
          <div
            key={i}
            className="shrink-0 w-[80vw] max-w-[340px] snap-start cursor-pointer"
            onClick={() => {
              if (!didDrag.current) onOpenModal(sponsor);
            }}
          >
            <div className="relative rounded-[18px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] ring-1 ring-purple-mid/[0.12]">
              {/* Logo area — white with radial glow */}
              <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(91,58,140,0.06),transparent_70%)]" />
                <SponsorLogo sponsor={sponsor} className="relative z-[1]" />
              </div>
              {/* Info below — dark purple */}
              <div className="p-5 bg-gradient-to-br from-purple-deep via-[#3c2066] to-[#2d1b4e]">
                <h3 className="font-serif text-lg font-bold text-white leading-tight mb-1">
                  {sponsor.name}
                </h3>
                <p className="text-[0.78rem] text-white/50 leading-relaxed line-clamp-2 mb-3">
                  {sponsor.tagline}
                </p>
                <p className="text-[0.75rem] text-purple-light font-semibold tracking-wide uppercase">
                  Tap to learn more &rarr;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active dots */}
      <div className="flex justify-center gap-2 mt-4">
        {SPONSORS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to sponsor ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIdx
                ? "w-6 bg-purple"
                : "w-1.5 bg-purple/25 hover:bg-purple/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Sponsor Modal (portaled to body) ── */
function SponsorModal({
  sponsor,
  onClose,
}: {
  sponsor: Sponsor;
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
      <div className="absolute inset-0 bg-black/70 transition-opacity" />

      <div
        className="relative bg-bg rounded-[20px] overflow-hidden max-w-[860px] w-full max-h-[85vh] shadow-[0_25px_80px_rgba(0,0,0,0.3)] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-purple-deep/8 backdrop-blur-sm flex items-center justify-center text-purple-deep/40 hover:text-purple-deep hover:bg-purple-deep/12 md:bg-white/8 md:text-white/40 md:hover:text-white md:hover:bg-white/15 transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-[18px] h-[18px] stroke-[1.5]" />
        </button>

        {/* Logo side — white */}
        <div className="relative w-full md:w-[44%] shrink-0 aspect-[4/3] md:aspect-auto md:min-h-full bg-white flex items-center justify-center p-10">
          <SponsorLogo sponsor={sponsor} className="relative z-[1] text-[1.8rem]" />
        </div>

        {/* Content side — dark purple */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-purple-deep via-[#3c2066] to-[#2d1b4e]">
          <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-purple-light mb-2.5 block">
            Sponsor
          </span>
          <h3 className="font-serif text-[1.6rem] md:text-[1.8rem] font-bold text-white leading-tight mb-1.5">
            {sponsor.name}
          </h3>
          <p className="text-[0.85rem] text-purple-light/70 font-medium mb-5">
            {sponsor.tagline}
          </p>

          <div className="text-[0.88rem] text-white/60 leading-[1.7] space-y-3">
            {sponsor.description.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {sponsor.website && (
            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-[0.82rem] font-semibold text-purple-light hover:text-white transition-colors"
            >
              Visit Website
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Main Section ── */
export function Sponsors() {
  const [modalSponsor, setModalSponsor] = useState<Sponsor | null>(null);
  const [showExperiences, setShowExperiences] = useState(false);

  return (
    <section
      id="sponsors"
      className="relative z-[3] pt-28 lg:pt-32 pb-2 lg:pb-3 bg-bg"
    >
      {/* Subtle top edge shadow for slide-up effect */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-[1140px] mx-auto px-6">
        <RevealHeader />

        {/* Desktop: Sponsor reel */}
        <FadeIn delay={100}>
          <div className="hidden lg:block mb-14">
            <SponsorReel onOpenModal={setModalSponsor} />
          </div>
        </FadeIn>

        {/* Mobile: Swipeable carousel */}
        <FadeIn delay={100}>
          <MobileSponsorCarousel onOpenModal={setModalSponsor} />
        </FadeIn>
        {/* On-Site Experiences CTA */}
        <FadeIn delay={150}>
          <div className="flex flex-col items-center py-12 lg:py-14">
            {/* Decorative separator */}
            <div className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-purple/25 to-transparent mb-8" />
            <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-text-muted mb-3">
              On-Site Experiences
            </span>
            <button
              onClick={() => setShowExperiences(true)}
              className="bg-purple-deep text-white py-3 px-8 rounded-full font-bold text-[0.88rem] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(91,58,140,0.25)] cursor-pointer"
            >
              Explore Wellness Activations
            </button>
          </div>
        </FadeIn>

        {/* Venue Partner */}
        <FadeIn delay={200}>
          <div className="max-w-[900px] mx-auto mb-14">
            <div className="flex flex-col items-center gap-4">
              <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-text-muted">
                Venue Partner
              </span>
              <a
                href="#venue"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("venue");
                  if (target) {
                    const y = target.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
                className="group relative flex items-center justify-center w-full max-w-[200px] sm:max-w-[280px] py-6 px-8 sm:py-8 sm:px-10 rounded-[16px] bg-white ring-1 ring-border-light transition-all duration-300 hover:shadow-[0_0_24px_rgba(168,124,224,0.15)] hover:-translate-y-0.5 hover:ring-purple-mid/20"
              >
                <Image
                  src="/sponsors/verizon.png"
                  alt="Verizon"
                  width={160}
                  height={36}
                  className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      {modalSponsor && (
        <SponsorModal
          sponsor={modalSponsor}
          onClose={() => setModalSponsor(null)}
        />
      )}

      {showExperiences && (
        <ExperiencesModal onClose={() => setShowExperiences(false)} />
      )}
    </section>
  );
}
