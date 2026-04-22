"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Beaker,
  Droplets,
  Zap,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { EXPERIENCES } from "@/lib/constants";
import { FadeIn } from "./fade-in";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  Beaker,
  Droplets,
  Zap,
} as const;

type Experience = (typeof EXPERIENCES)[number];

/* ── Individual editorial card ──────────────────────────────
   Two-panel layout: media (image) on the left, light body on
   the right (stacked on mobile). A glass medallion sits on the
   hero image carrying the experience's Lucide glyph (magazine-
   cover convention, pictogram variant) and the sponsor-gradient
   footer lives at the bottom of the body — preserving the
   light ⇄ dark duality users already associate with this
   section.
   ────────────────────────────────────────────────────────── */
function ExperienceCard({
  experience,
  index,
  isActive,
  didDragRef,
}: {
  experience: Experience;
  index: number;
  isActive: boolean;
  didDragRef: React.MutableRefObject<boolean>;
}) {
  const Icon = ICON_MAP[experience.icon];
  const total = EXPERIENCES.length;

  return (
    <article
      data-card-index={index}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${experience.name}`}
      className={cn(
        "snap-start shrink-0 w-[calc(100vw-3rem)] sm:w-[calc(100vw-4rem)] lg:w-[720px]",
        // `flex flex-col` is essential, not decorative: the parent scroll track
        // is `display: flex` (default `align-items: stretch`), so every card
        // gets stretched to the tallest sibling's height. On mobile, card 3's
        // two-line kicker ("Pulsed Electromagnetic Field Therapy" wraps with
        // tracking-[0.22em]) makes it the tallest; cards 1 & 2 then inherit
        // that height. Without the flex-col here the inner wrapper sits at its
        // natural block height inside the stretched article, and the article's
        // own bg-white shows through beneath the purple footer as a white
        // band. Making the article a flex-col lets the inner wrapper take
        // `flex-1` and fill the remainder.
        "relative bg-white rounded-[28px] flex flex-col",
        "ring-1 ring-border-light shadow-[0_2px_16px_rgba(0,0,0,0.05)]",
        "transition-[transform,box-shadow] duration-500 ease-out",
        "hover:shadow-[0_18px_44px_rgba(91,58,140,0.16)] hover:-translate-y-1",
        "motion-reduce:transform-none motion-reduce:hover:translate-y-0"
      )}
    >
      {/* Accent top edge — subtly saturates when this card is active, mirroring
         the medallion halo intensification for a coordinated focus cue. */}
      <div
        className={cn(
          "h-[3px] rounded-t-[28px] transition-opacity duration-700 ease-out",
          isActive ? "opacity-100" : "opacity-55"
        )}
        style={{
          background:
            "linear-gradient(to right, rgba(168,124,224,1), rgba(168,124,224,0.6) 55%, rgba(168,124,224,0.2))",
        }}
      />

      {/* ── Editorial medallion ──
         Sits on the hero image (iconic-pictogram convention — Apple /
         Linear / Kinfolk — rather than the numbered-cover variant).
         Four layers: soft purple halo → glass body (backdrop-blur) →
         hairline inner ring → the experience's Lucide glyph. The halo
         intensifies when this card is the active (centered) one in the
         carousel. The glyph tells the user what the experience *is*
         (peptide / IV / PEMF) at a glance; pagination dots + the
         article's `aria-label="N of 3"` handle ordering semantics.
         ──────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute top-5 left-5 lg:top-6 lg:left-6 z-20 w-[74px] h-[74px] lg:w-[84px] lg:h-[84px] pointer-events-none"
      >
        {/* Outer halo — intensifies when card is active */}
        <div
          className={cn(
            "absolute -inset-2 rounded-full transition-opacity duration-700 ease-out",
            isActive ? "opacity-90" : "opacity-45"
          )}
          style={{
            background:
              "radial-gradient(circle, rgba(168,124,224,0.55) 0%, rgba(168,124,224,0.18) 40%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />

        {/* Medallion body — glass-morphism over image */}
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 30% 22%, rgba(198,172,230,0.34) 0%, rgba(91,58,140,0.88) 45%, rgba(26,12,44,0.96) 100%)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow:
              "0 12px 32px rgba(20,10,38,0.55), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(168,124,224,0.18)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Inner hairline ring */}
          <div
            className="absolute inset-[5px] rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(255,255,255,0.11)" }}
          />

          {/* Content — the experience's Lucide glyph as the medallion's
             focal mark. Replaces the previous Playfair numeral: the icon
             communicates *what the experience is* (peptide shot / IV /
             PEMF), while the pagination dots and article `aria-label`
             handle positional ordering.
             `strokeWidth={1.75}` (default 2) sits slightly lighter on
             the glass body — reads as editorial rather than utilitarian,
             and visually matches the weight of the hairline inner ring.
             `w-8 / lg:w-9` → 32px / 36px, matching the cap-height weight
             of the previous `text-[2rem] / text-[2.3rem]` numeral so the
             medallion's perceived density is preserved.
             `drop-shadow` (SVG-safe) replaces the numeral's textShadow,
             which only renders on text glyphs. */}
          <Icon
            className="relative w-8 h-8 lg:w-9 lg:h-9 text-white"
            strokeWidth={1.75}
            style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}
          />
        </div>
      </div>

      {/* Layout flip at `sm:` (640px) — side-by-side on all but the
         narrowest phones. Originally this was `lg:` (1024px), which
         stranded the entire 640–1023px range in the mobile stacked
         tier with a viewport-wide card (`sm:w-[calc(100vw-4rem)]`)
         topped by a 5:4 image panel — at 700px viewport the image
         alone was ~509px tall, burying the title below the fold. At
         `sm:` (640px) the card is 576px wide, splitting into a 265px
         image and 311px body — tight but readable at the mobile title
         size (1.55rem), and it scales smoothly up to the fixed 720px
         card at 1024px. Below 640px the stacked layout stays as
         designed; the card width drops to `calc(100vw-3rem)` and
         side-by-side would leave the body column under ~290px. */}
      <div className="flex flex-col sm:flex-row flex-1 sm:min-h-[464px] overflow-hidden rounded-b-[28px]">
        {/* Media — 5:4 stacked on narrow mobile, 46% of card at sm: and up */}
        <div className="relative sm:w-[46%] aspect-[5/4] sm:aspect-auto sm:min-h-[464px] bg-purple-wash shrink-0 overflow-hidden">
          <Image
            src={experience.heroImage}
            alt={`${experience.sponsor} — ${experience.name}`}
            fill
            sizes="(min-width: 1024px) 450px, (min-width: 640px) calc((100vw - 4rem) * 0.46), calc(100vw - 48px)"
            priority={index === 0}
            draggable={false}
            className="object-cover pointer-events-none select-none"
            // Optional per-entry crop focus. Add `objectPosition: "center 30%"`
            // (or similar) to any EXPERIENCES entry in lib/constants.ts if a
            // particular image needs its focal point biased against the crop.
            style={
              "objectPosition" in experience &&
              typeof (experience as { objectPosition?: string })
                .objectPosition === "string"
                ? {
                    objectPosition: (
                      experience as { objectPosition: string }
                    ).objectPosition,
                  }
                : undefined
            }
          />
          {/* Top-fade so the medallion reads well over brighter image corners */}
          <div
            className="absolute top-0 inset-x-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,12,44,0.32) 0%, rgba(26,12,44,0) 100%)",
            }}
          />
          {/* Inner inset ring — editorial "framed plate" feel */}
          <div
            className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10"
            aria-hidden
          />
        </div>

        {/* Body — light zone with the existing purple accent wash.
           Note the asymmetric padding: px + pt only, no pb. The sponsor footer
           lives as the last flex child and sits flush with the body's
           border-box bottom, so no bottom padding is needed. Previously the
           footer used a -mb-6 trick to cover the body's p-6 bottom padding,
           but on mobile (content-sized flex container) that mechanic leaves a
           sliver of near-transparent body gradient showing through to the
           article's white bg, which read as a white band below the footer. */}
        <div
          className="relative flex-1 px-6 md:px-8 pt-6 md:pt-8 flex flex-col"
          style={{
            background:
              "linear-gradient(180deg, rgba(168,124,224,0.16) 0%, rgba(168,124,224,0.07) 55%, rgba(168,124,224,0.02) 100%)",
          }}
        >
          {/* Title — now the first body element. The icon previously shown
             in a 52px white-glass badge here has moved up into the medallion
             on the hero image, so the body panel opens directly on the
             serif title. This also trims ~72px of vertical height per card
             on mobile, which had made the cards feel disproportionately
             tall relative to Speakers and Sponsors carousels. */}
          <h3 className="font-serif text-[1.55rem] lg:text-[1.85rem] font-bold leading-[1.1] text-text mb-2 tracking-[-0.01em]">
            {experience.name}
          </h3>

          {/* Kicker — purple-mid uppercase (replaces snippet's teal) */}
          <span className="text-[0.66rem] font-bold tracking-[0.22em] uppercase text-purple-mid mb-4">
            {experience.tagline}
          </span>

          {/* Body copy */}
          <p className="text-[0.92rem] text-text-secondary leading-[1.75] flex-1 mb-6">
            {experience.description}
          </p>

          {/* Sponsor footer — preserves the existing purple-gradient duality.
             Horizontal negative margins extend the footer edge-to-edge over
             the body's horizontal padding. No negative bottom margin: the
             body now uses asymmetric px + pt padding (no pb), so the footer
             sits flush with the body's bottom edge and the article's
             overflow-hidden clips it to the 28px rounded corner. */}
          <div className="-mx-6 md:-mx-8 mt-auto p-4 md:p-5 bg-gradient-to-br from-purple-deep via-[#3c2066] to-[#2d1b4e]">
            <div className="max-w-[380px] mx-auto">
              <span className="text-[0.5rem] text-white/50 font-medium tracking-[0.15em] uppercase block mb-2.5">
                Presented by
              </span>
              <div className="relative flex items-center justify-center bg-white rounded-[10px] h-14 px-5 mb-3 overflow-hidden">
                <Image
                  src={experience.sponsorLogo}
                  alt={experience.sponsor}
                  width={300}
                  height={100}
                  draggable={false}
                  className="max-h-9 max-w-full object-contain pointer-events-none select-none"
                  style={
                    "logoScale" in experience
                      ? { transform: `scale(${experience.logoScale})` }
                      : undefined
                  }
                />
                <div className="absolute inset-0 bg-purple-deep/[0.06] mix-blend-multiply rounded-[10px] pointer-events-none" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[0.62rem] text-white/50 font-medium tracking-wide">
                  {experience.cta}
                </span>
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onClickCapture={(e) => {
                    // Native <a> bypasses React synthetic click gating, so we
                    // intercept drags here: if user dragged the carousel, this
                    // mouseup is a scroll release — not a link click.
                    if (didDragRef.current) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  className="inline-flex items-center gap-1 text-[0.68rem] font-semibold text-purple-light hover:text-white transition-colors"
                >
                  Visit
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Main section ───────────────────────────────────────────
   Horizontal snap-scroll carousel. Drag-to-scroll on desktop
   mouse, native swipe on touch. Pagination dots + desktop
   prev/next arrows both update `activeIndex`, which is kept in
   sync by a passive scroll listener that measures which card
   center is closest to the scroll viewport center.
   ────────────────────────────────────────────────────────── */
export function Experiences() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll state — mirrors the proven pattern in components/speakers.tsx
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const didDrag = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  /* Keep active index in sync with scroll position. Use the center-match
     approach (not raw `Math.round(scrollLeft / slotWidth)`) so we don't
     trip over the asymmetric leading/trailing padding that snap-start
     produces on wide viewports. */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cards = el.querySelectorAll<HTMLElement>("[data-card-index]");
      if (cards.length === 0) return;
      const viewCenter = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const c = card.offsetLeft + card.clientWidth / 2;
        const d = Math.abs(c - viewCenter);
        if (d < minDist) {
          minDist = d;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    // Prime once on mount so initial dot state is correct.
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Drag handlers (desktop mouse) ── */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.clientX;
    scrollStart.current = el.scrollLeft;
    // Disable snap during drag so free-form dragging doesn't fight
    // scroll-snap trying to restore to the nearest snap point each frame.
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) didDrag.current = true;
    el.scrollLeft = scrollStart.current - dx;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = scrollRef.current;
    if (!el) return;
    el.style.scrollSnapType = "";
    el.style.cursor = "";
  }, []);

  /* ── Scroll to a specific card (centers it in view) ── */
  const scrollToIndex = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(
      `[data-card-index="${idx}"]`
    );
    if (!card) return;
    const left =
      card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, []);

  const goPrev = useCallback(() => {
    scrollToIndex(Math.max(0, activeIndex - 1));
  }, [activeIndex, scrollToIndex]);

  const goNext = useCallback(() => {
    scrollToIndex(Math.min(EXPERIENCES.length - 1, activeIndex + 1));
  }, [activeIndex, scrollToIndex]);

  /* ── Keyboard navigation on the carousel region ──
     Matches the ARIA carousel authoring practice: Arrow keys step, Home/End
     jump to the first/last slide. We preventDefault so the browser's native
     per-pixel scroll on an overflow container doesn't fight the card-at-a-time
     advance. Only fires when the track itself (or something inside it) has
     focus — the outer page can still scroll normally via arrow keys. */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToIndex(EXPERIENCES.length - 1);
      }
    },
    [goPrev, goNext, scrollToIndex]
  );

  return (
    <section
      id="experiences"
      className="relative z-[2] py-20 lg:py-24 bg-bg overflow-hidden"
    >
      {/* Subtle top-edge shadow for slide-up feel off the preceding dark section */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/[0.08] to-transparent pointer-events-none" />

      {/* Ambient purple radial glows — borrowed from the snippet ::before/::after */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(168,124,224,0.16) 0%, rgba(168,124,224,0.06) 55%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[440px] h-[440px] rounded-full pointer-events-none blur-[2px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(198,178,235,0.22) 0%, rgba(198,178,235,0.06) 55%, transparent 80%)",
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-6">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-10 lg:mb-12">
            <span className="inline-flex items-center gap-2.5 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-purple-mid mb-3 before:content-[''] before:w-5 before:h-px before:bg-purple-mid after:content-[''] after:w-5 after:h-px after:bg-purple-mid">
              On-Site Experiences
            </span>
            <h2 className="font-serif text-[clamp(1.85rem,4.2vw,2.55rem)] font-bold text-text leading-[1.1] mb-4 tracking-[-0.015em]">
              Immersive Wellness{" "}
              <em className="not-italic text-purple">Activations</em>
            </h2>
            <p className="text-[0.98rem] text-text-secondary leading-[1.7] max-w-[580px] mx-auto">
              Three exclusive, sponsor-hosted wellness experiences available to
              every attendee.
            </p>
          </div>
        </FadeIn>

        {/* Decorative diamond separator */}
        <FadeIn delay={80}>
          <div className="flex justify-center items-center gap-3 mb-10 lg:mb-12 text-purple/40">
            <div className="w-[60px] h-px bg-gradient-to-r from-transparent to-purple/40" />
            <div className="w-2 h-2 border border-purple/50 rotate-45" />
            <div className="w-[60px] h-px bg-gradient-to-l from-transparent to-purple/40" />
          </div>
        </FadeIn>

        {/* Carousel */}
        <FadeIn delay={120}>
          <div className="relative">
            {/* Desktop prev/next arrows — floating at container edges */}
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous experience"
              className={cn(
                "hidden lg:flex absolute top-[calc(50%-1rem)] -translate-y-1/2 -left-3 z-20",
                "w-11 h-11 rounded-full bg-white ring-1 ring-purple-mid/25",
                "items-center justify-center text-purple-mid",
                "shadow-[0_6px_20px_rgba(91,58,140,0.14)]",
                "transition-all duration-200 hover:ring-purple-mid hover:text-purple hover:scale-105 active:scale-95",
                "disabled:opacity-30 disabled:pointer-events-none"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === EXPERIENCES.length - 1}
              aria-label="Next experience"
              className={cn(
                "hidden lg:flex absolute top-[calc(50%-1rem)] -translate-y-1/2 -right-3 z-20",
                "w-11 h-11 rounded-full bg-white ring-1 ring-purple-mid/25",
                "items-center justify-center text-purple-mid",
                "shadow-[0_6px_20px_rgba(91,58,140,0.14)]",
                "transition-all duration-200 hover:ring-purple-mid hover:text-purple hover:scale-105 active:scale-95",
                "disabled:opacity-30 disabled:pointer-events-none"
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scroll track */}
            <div
              ref={scrollRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="On-site wellness experiences"
              tabIndex={-1}
              className={cn(
                "flex gap-6 overflow-x-auto snap-x snap-mandatory",
                "pt-8 pb-14 -mx-6 px-6 cursor-grab select-none",
                "[&::-webkit-scrollbar]:hidden"
              )}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                // overflow-y:visible lets each card's hover shadow and -translate-y
                // lift render outside the track without being clipped. The medallion
                // itself lives inside the card and doesn't need this, but the hover
                // shadow still breathes a full ~28px beyond the card's rounded edge.
                overflowY: "visible",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onKeyDown={handleKeyDown}
            >
              {EXPERIENCES.map((exp, i) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  index={i}
                  isActive={i === activeIndex}
                  didDragRef={didDrag}
                />
              ))}
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {EXPERIENCES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to experience ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 ease-out",
                    i === activeIndex
                      ? "w-7 bg-purple-mid"
                      : "w-1.5 bg-purple-light/40 hover:bg-purple-light/70"
                  )}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
