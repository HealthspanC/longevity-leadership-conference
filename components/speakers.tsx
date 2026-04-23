"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { SPEAKERS, LINKS } from "@/lib/constants";
import { User, ChevronLeft, ChevronRight, Quote, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

type Speaker = (typeof SPEAKERS)[number];
const hasImage = (s: Speaker): s is Speaker & { image: string } =>
  "image" in s && typeof (s as Record<string, unknown>).image === "string";

const TAG_STYLES: Record<string, string> = {
  Keynote: "bg-purple text-white",
  Panelist: "border border-purple text-purple",
  Moderator: "bg-purple-wash text-purple",
};

function SpeakerTag({ speaker, dark = false }: { speaker: Speaker; dark?: boolean }) {
  const tag = "tag" in speaker ? (speaker as { tag: string }).tag : null;
  if (!tag) return null;
  return (
    <span
      className={cn(
        "inline-block text-[0.55rem] font-bold tracking-[0.15em] uppercase px-2.5 py-[3px] rounded-full leading-none",
        dark ? (tag === "Keynote" ? "bg-white/20 text-white" : tag === "Panelist" ? "border border-white/30 text-white/80" : "bg-white/10 text-white/70")
          : TAG_STYLES[tag] ?? ""
      )}
    >
      {tag}
    </span>
  );
}

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
        className={cn("object-cover", !('imagePosition' in speaker) && "object-top", className)}
        style={{
          ...('imagePosition' in speaker ? { objectPosition: (speaker as { imagePosition: string }).imagePosition } : {}),
          ...('imageScale' in speaker ? { transform: `scale(${(speaker as { imageScale: string }).imageScale})` } : {}),
        }}
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
  progress = 0,
}: {
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenModal: (speaker: Speaker) => void;
  progress?: number;
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
      {/* Arrow controls + progress — top right */}
      <div className="flex items-center justify-end gap-4 mb-5">
        {/* Progress bar — overall position through all speakers */}
        <div className="w-28 h-[3px] bg-purple/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((activeIndex + progress) / SPEAKERS.length) * 100}%` }}
          />
        </div>
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
                  <div className="absolute inset-x-0 bottom-0 p-6 z-[2] flex flex-col items-start">
                    <h3 className="font-serif text-xl font-bold text-white leading-tight mb-1">
                      {speaker.name}
                    </h3>
                    <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-purple-light">
                      {speaker.role}
                    </span>
                    <div className="mt-2.5">
                      <SpeakerTag speaker={speaker} dark />
                    </div>
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
                <div className="p-4 bg-bg-card flex flex-col items-start">
                  <p className="text-[0.78rem] text-text-secondary leading-relaxed mb-3 line-clamp-3">
                    {speaker.bio}
                  </p>
                  <h4 className="font-serif text-base font-bold text-text leading-tight mb-0.5">
                    {speaker.name}
                  </h4>
                  <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-purple">
                    {speaker.role}
                  </span>
                  <div className="mt-2.5">
                    <SpeakerTag speaker={speaker} />
                  </div>
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
                <div className="absolute inset-x-0 bottom-0 p-5 z-[2] flex flex-col items-start">
                  <h3 className="font-serif text-xl font-bold text-white leading-tight mb-0.5">
                    {speaker.name}
                  </h3>
                  <span className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-purple-light">
                    {speaker.role}
                  </span>
                  <div className="mt-2.5">
                    <SpeakerTag speaker={speaker} dark />
                  </div>
                </div>
              </div>
              {/* Compact info below */}
              <div className="p-5">
                {'quote' in speaker && (speaker as { quote?: string }).quote && (
                  <p className="font-serif text-[0.9rem] text-text/80 leading-relaxed italic line-clamp-2">
                    {(speaker as { quote: string }).quote}
                  </p>
                )}
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
      <div className="absolute inset-0 bg-black/70 transition-opacity" />

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

        <div className="relative w-full md:w-[44%] shrink-0 aspect-[4/3] md:aspect-auto md:min-h-full">
          <SpeakerPhoto
            speaker={speaker}
            sizes="(min-width: 768px) 380px, 100vw"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-purple mb-2.5 block">
            {speaker.role}
          </span>
          <h3 className="font-serif text-[1.6rem] md:text-[1.8rem] font-bold text-text leading-tight mb-2">
            {speaker.name}
          </h3>
          <div className="mb-5">
            <SpeakerTag speaker={speaker} />
          </div>

          {'quote' in speaker && (speaker as { quote?: string }).quote && (
            <div className="mb-5 pl-4 border-l-[2.5px] border-purple-light/40">
              <p className="font-serif text-[0.95rem] md:text-[1.05rem] text-text/80 leading-relaxed italic">
                {(speaker as { quote: string }).quote}
              </p>
            </div>
          )}

          <div className="text-[0.88rem] text-text-secondary leading-[1.7] space-y-3">
            {speaker.bio.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Main Section ── */
export function Speakers({ initialSlug }: { initialSlug?: string } = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalSpeaker, setModalSpeaker] = useState<Speaker | null>(null);

  /* ── Modal + URL sync ────────────────────────────────────────────
     The speaker modal is now URL-synced so every open becomes a shareable
     link (`/speakers/<slug>`) — which is what makes per-speaker OG images
     actually useful. Without this sync, the dynamic routes would only work
     for externally-provided URLs; users browsing the carousel on `/` would
     never generate a shareable link organically.

     Implementation:
     - `openModal(speaker)` pushes `/speakers/<slug>` onto history, tagging
       the entry with `{ modalSlug }` so we can tell it apart from real
       navigation later.
     - `closeModal()` rewinds that push when we recognise our own marker;
       otherwise (e.g., cold entry direct to `/speakers/<slug>`) we swap
       the URL to `/` so the user stays in the app.
     - A `popstate` listener keeps the modal in sync with the URL for
       browser back/forward — Back from `/speakers/sanjiv` → `/` closes
       the modal; Forward re-opens it.
     - `initialSlug` (passed from the `[slug]` route's server component)
       auto-opens the matching modal on mount without manipulating history
       — we're already at the correct URL, no push needed.

     Why `pushState` for opens rather than `replaceState`: we want browser
     Back to actually close the modal, which only happens if opening added
     a history entry. `replaceState` would make Back skip past the modal
     entirely, which feels broken. */
  const openModal = useCallback((speaker: Speaker) => {
    track('Speaker View', { name: speaker.name });
    setModalSpeaker(speaker);
    if (typeof window !== 'undefined') {
      window.history.pushState(
        { modalSlug: speaker.slug },
        '',
        `/speakers/${speaker.slug}`,
      );
    }
  }, []);

  const closeModal = useCallback(() => {
    setModalSpeaker(null);
    if (typeof window !== 'undefined') {
      // If the modal was opened via our click handler, this entry has our
      // marker — go back one so browser history stays clean.
      const state = window.history.state as { modalSlug?: string } | null;
      if (state?.modalSlug) {
        window.history.back();
      } else {
        // Cold entry at /speakers/<slug>: replace with "/" so closing
        // returns the user to the home page rather than bouncing them
        // out of the site.
        window.history.replaceState(null, '', '/');
      }
    }
  }, []);

  // Auto-open modal on mount when the server-rendered page passed a slug.
  // Also rotates the desktop reel so that speaker is the featured card
  // behind the modal (in case the user closes it and lingers on the page),
  // and scrolls the Speakers section into view so closing the modal lands
  // the user at the carousel rather than at the top of a 5000px page.
  //
  // DOM query (`getElementById`) rather than a React ref: `<section
  // id="speakers">` is rendered inside this same component, and its id is
  // already the stable anchor contract for `/#speakers` URL navigation.
  // A ref would be redundant. `behavior: "auto"` because a smooth-scroll
  // on mount reads as a layout glitch when arriving from a social share.
  // Runs *before* `setModalSpeaker` so the underlying page is already
  // positioned when the modal paints on top.
  useEffect(() => {
    if (!initialSlug) return;
    const idx = SPEAKERS.findIndex((s) => s.slug === initialSlug);
    if (idx < 0) return;
    setActiveIndex(idx);
    document
      .getElementById("speakers")
      ?.scrollIntoView({ block: "start", behavior: "auto" });
    setModalSpeaker(SPEAKERS[idx]);
  }, [initialSlug]);

  // URL ↔ modal state sync on browser back/forward. Runs once on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      const match = window.location.pathname.match(/^\/speakers\/([^/]+)$/);
      if (match) {
        const next = SPEAKERS.find((s) => s.slug === match[1]);
        if (next) {
          setModalSpeaker(next);
          return;
        }
      }
      setModalSpeaker(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const total = SPEAKERS.length;

  // Auto-advance state
  const AUTO_INTERVAL = 6000; // 6 seconds
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timerStart = useRef(Date.now());
  const rafRef = useRef<number>(undefined);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
    timerStart.current = Date.now();
    setProgress(0);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
    timerStart.current = Date.now();
    setProgress(0);
  }, [total]);

  // IntersectionObserver — only auto-advance when section is in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance timer with progress tracking
  useEffect(() => {
    if (paused || !inView || modalSpeaker) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    timerStart.current = Date.now();
    setProgress(0);

    const tick = () => {
      const elapsed = Date.now() - timerStart.current;
      const pct = Math.min(elapsed / AUTO_INTERVAL, 1);
      setProgress(pct);

      if (pct >= 1) {
        setActiveIndex((i) => (i + 1) % total);
        timerStart.current = Date.now();
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, inView, total, modalSpeaker]);

  return (
    <section
      ref={sectionRef}
      id="speakers"
      className="relative z-[3] pt-28 lg:pt-32 pb-2 lg:pb-3 bg-bg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        timerStart.current = Date.now();
        setProgress(0);
      }}
    >
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
              onOpenModal={openModal}
              progress={progress}
            />
          </div>
        </FadeIn>

        {/* Mobile: Swipeable carousel + compact TBA grid */}
        <FadeIn delay={100}>
          <MobileSpeakerCarousel onOpenModal={openModal} />
        </FadeIn>

      </div>

      {modalSpeaker && (
        <SpeakerModal speaker={modalSpeaker} onClose={closeModal} />
      )}
    </section>
  );
}
