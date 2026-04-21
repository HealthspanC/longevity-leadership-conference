"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowRight } from "lucide-react";
import { AgendaModal, parseTimeRange } from "./agenda";
import { AgendaMobile, HeroCard } from "./agenda-mobile";
import { FadeIn } from "./fade-in";
import { AGENDA, type AgendaSession } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ── About page agenda CTA — "Day at a Glance" clock dial ────
   A 12-hour clock face where the conference day (10:00 AM –
   4:30 PM) is rendered as a sweeping gradient arc. Each phase
   gets its modal accent color. Eleven session dots sit along
   the arc at their real start times. Clicking any dot opens
   the full AgendaModal, scrolled to that session. Clicking a
   phase label jumps to the first session of that phase. The
   center "View Full Agenda" button and any empty dial area
   open the modal at the top.

   The /about#agenda hash (used by the homepage Sponsors CTA)
   works purely as a scroll anchor now — arriving at /about
   with that hash scrolls to the agenda section but does NOT
   auto-open the modal, since the inline banner + Time Rail /
   DayClock already shows the full agenda.
   ─────────────────────────────────────────────────────────── */

/* ── Accent color system (mirrors components/agenda.tsx) ──── */

type AccentFamily = "rose" | "purple" | "slate";

const FORMAT_ACCENT: Record<AgendaSession["format"], AccentFamily> = {
  welcome: "rose",
  keynote: "purple",
  panel: "purple",
  networking: "slate",
  closing: "rose",
};

const ACCENT_COLORS: Record<
  AccentFamily,
  { dot: string; label: string }
> = {
  rose: { dot: "#a86a7e", label: "#9b5a70" },
  purple: { dot: "#7b52b5", label: "#6b47a0" },
  slate: { dot: "#9992a6", label: "#7d7890" },
};

// Session IDs whose tooltips always nudge outward from the dial's
// center heading, regardless of how the bubble was triggered. These
// dots sit near the horizontal midline of the arc, so a bubble
// centered on the dot would otherwise overlap "A Day of Longevity
// Leadership". Listed sessions lean outward on both auto-shown
// affordance-hint display AND direct user hover.
const OUTWARD_SHIFT_IDS = new Set<string>([
  "opening",       // 10:00 – 10:15 AM (leans left — also the default hint)
  "panel-capital", // 2:20 – 3:00 PM
  "closing",       // 3:00 – 3:30 PM
  "networking",    // 3:30 – 4:30 PM
]);

const PHASE_LABEL: Record<AgendaSession["phase"], string> = {
  morning: "Morning",
  midday: "Midday",
  afternoon: "Afternoon",
  finale: "Finale",
};

const PHASE_ARC_COLOR: Record<AgendaSession["phase"], string> = {
  morning: "#7b52b5",
  midday: "#9992a6",
  afternoon: "#7b52b5",
  finale: "#a86a7e",
};

const PHASE_ORDER: ReadonlyArray<AgendaSession["phase"]> = [
  "morning",
  "midday",
  "afternoon",
  "finale",
];

/* ── SVG geometry helpers ─────────────────────────────────── */

/** 12-hour clock angle in degrees, 0° at 12 o'clock, clockwise. */
function timeToAngle(h24: number, m: number): number {
  return (h24 % 12) * 30 + m * 0.5; // 30°/hour · 0.5°/min
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  deg: number
): { x: number; y: number } {
  const rad = ((deg - 90) * Math.PI) / 180;
  // Round to 3 decimals — avoids SSR/CSR hydration mismatches that
  // otherwise show up as floating-point drift between Math.cos/sin
  // evaluations in Node vs the browser.
  const round = (n: number) => Math.round(n * 1000) / 1000;
  return { x: round(cx + r * Math.cos(rad)), y: round(cy + r * Math.sin(rad)) };
}

/** SVG arc `d` attribute between two clock angles, drawn clockwise. */
function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  let sweep = endAngle - startAngle;
  if (sweep < 0) sweep += 360; // allow wrap past 360°
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function arcLength(r: number, startAngle: number, endAngle: number): number {
  let sweep = endAngle - startAngle;
  if (sweep < 0) sweep += 360;
  return (sweep / 360) * 2 * Math.PI * r;
}

function parseSessionStart(time: string): { h24: number; m: number } {
  const parsed = parseTimeRange(time);
  if (!parsed) return { h24: 10, m: 0 };
  return {
    h24: parseInt(parsed.start.slice(0, 2), 10),
    m: parseInt(parsed.start.slice(2, 4), 10),
  };
}

/* ── DayClock visualization ──────────────────────────────── */

const DIAL_SIZE = 600; // SVG viewBox size
const CENTER = 300;
const ARC_RADIUS = 220;
const DIAL_RIM_RADIUS = 240;
const PHASE_LABEL_RADIUS = 272;

interface SessionMarker {
  session: AgendaSession;
  angle: number;
  x: number;
  y: number;
  accent: AccentFamily;
}

interface PhaseSegment {
  phase: AgendaSession["phase"];
  startAngle: number;
  endAngle: number;
  midAngle: number;
  firstId: string;
}

function DayClock({ onOpenAt }: { onOpenAt: (focusId?: string) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  // True only when `hovered` was set by the default affordance-hint
  // effect below, not by a real user interaction. Drives the
  // quadrant-aware outward shift in SessionTooltip so the hint bubble
  // leans away from the dial's center text; user hovers stay centered.
  const [hoverIsDefault, setHoverIsDefault] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);

  // Trigger entrance animation once the dial scrolls into view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Media query listeners — reduced motion + touch devices
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cp = window.matchMedia("(pointer: coarse)");
    setReducedMotion(rm.matches);
    setCoarsePointer(cp.matches);
    const onRm = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const onCp = (e: MediaQueryListEvent) => setCoarsePointer(e.matches);
    rm.addEventListener("change", onRm);
    cp.addEventListener("change", onCp);
    return () => {
      rm.removeEventListener("change", onRm);
      cp.removeEventListener("change", onCp);
    };
  }, []);

  // Dismiss tooltip on outside tap (coarse pointers)
  useEffect(() => {
    if (!coarsePointer || !hovered) return;
    const onDown = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setHovered(null);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [coarsePointer, hovered]);

  // Affordance hint — once the dots have finished their staggered
  // entrance (≈1.5s after inView), show the first session's tooltip
  // by default so users realize the dots are hoverable. The hint
  // clears naturally the instant the user hovers any dot (onMouseLeave
  // resets `hovered` to null). Fine pointers only: on touch, a dot
  // that starts in the "hovered" state would skip the first-tap-
  // reveals-tooltip step and open the modal on the very first tap.
  useEffect(() => {
    if (!inView || coarsePointer) return;
    const firstId = AGENDA[0]?.id;
    if (!firstId) return;
    const delay = reducedMotion ? 0 : 1500;
    const timer = setTimeout(() => {
      setHovered((curr) => {
        if (curr != null) return curr; // user already engaged — respect that
        setHoverIsDefault(true);
        return firstId;
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, coarsePointer, reducedMotion]);

  // Session markers on the arc
  const markers = useMemo<SessionMarker[]>(
    () =>
      AGENDA.map((session) => {
        const { h24, m } = parseSessionStart(session.time);
        const angle = timeToAngle(h24, m);
        const pos = polarToCartesian(CENTER, CENTER, ARC_RADIUS, angle);
        return {
          session,
          angle,
          x: pos.x,
          y: pos.y,
          accent: FORMAT_ACCENT[session.format],
        };
      }),
    []
  );

  // Phase segments (computed from first/last session's clock angles)
  const phaseSegments = useMemo<PhaseSegment[]>(() => {
    const segments: PhaseSegment[] = [];
    for (const phase of PHASE_ORDER) {
      const sessions = AGENDA.filter((s) => s.phase === phase);
      if (sessions.length === 0) continue;
      const first = sessions[0];
      const last = sessions[sessions.length - 1];
      const firstParsed = parseTimeRange(first.time);
      const lastParsed = parseTimeRange(last.time);
      const sh = firstParsed ? parseInt(firstParsed.start.slice(0, 2), 10) : 10;
      const sm = firstParsed ? parseInt(firstParsed.start.slice(2, 4), 10) : 0;
      const eh = lastParsed ? parseInt(lastParsed.end.slice(0, 2), 10) : sh + 1;
      const em = lastParsed ? parseInt(lastParsed.end.slice(2, 4), 10) : sm;
      const startAngle = timeToAngle(sh, sm);
      const endAngle = timeToAngle(eh, em);
      let sweep = endAngle - startAngle;
      if (sweep < 0) sweep += 360;
      const midAngle = (startAngle + sweep / 2) % 360;
      segments.push({
        phase,
        startAngle,
        endAngle,
        midAngle,
        firstId: first.id,
      });
    }
    return segments;
  }, []);

  // Touch dot behavior: first tap reveals tooltip, second tap opens modal
  const handleDotClick = useCallback(
    (id: string) => {
      if (coarsePointer) {
        if (hovered === id) onOpenAt(id);
        else {
          setHovered(id);
          setHoverIsDefault(false);
        }
      } else {
        onOpenAt(id);
      }
    },
    [coarsePointer, hovered, onOpenAt]
  );

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square w-full max-w-[560px] lg:max-w-[720px] xl:max-w-[820px] mx-auto select-none"
      role="region"
      aria-label="Conference day overview — click any session marker to view details"
      onClick={(e) => {
        // Background (non-interactive) click on the dial → open modal
        if (e.target === e.currentTarget) onOpenAt();
      }}
    >
      {/* Ambient purple glow — premium halo behind the dial */}
      <div
        className="absolute inset-[12%] rounded-full bg-purple-wash/60 blur-[80px] pointer-events-none"
        aria-hidden
      />

      {/* SVG dial */}
      <svg
        viewBox={`0 0 ${DIAL_SIZE} ${DIAL_SIZE}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        <defs>
          {/* Cool lavender-cream dial face — pairs with the page's
              `bg` (#faf9f7) and the lavender purple-wash family.
              Center matches the section background exactly, edge
              lifts into a pale lavender so the rim reads as cool
              platinum rather than warm brass. */}
          <radialGradient id="ac-dial-face" cx="50%" cy="50%">
            <stop offset="78%" stopColor="#faf9f7" />
            <stop offset="100%" stopColor="#ebe3f5" />
          </radialGradient>

          {/* Daylight bloom — warm ivory wash concentrated at the
              event arc's angular centroid (upper-right quadrant,
              roughly the 1:45 PM clock position). Falls off to
              transparent by its outer radius so the cool lavender
              base shows through unchanged on the "night" half of
              the dial. The dial face itself then whispers that the
              conference day is the bright half of the clock. */}
          <radialGradient id="ac-dial-daylight" cx="62%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#fdf5e8" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#fdf5e8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#fdf5e8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dial face — cool lavender base */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={DIAL_RIM_RADIUS}
          fill="url(#ac-dial-face)"
        />

        {/* Daylight bloom — warm wash biased toward the event arc */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={DIAL_RIM_RADIUS}
          fill="url(#ac-dial-daylight)"
        />

        {/* Outer hairline rim — muted lavender instead of warm tan */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={DIAL_RIM_RADIUS}
          fill="none"
          stroke="#c9bcdb"
          strokeWidth={0.5}
          opacity={0.7}
        />

        {/* Hour tick marks — cardinal (12/3/6/9) slightly bolder */}
        {Array.from({ length: 12 }).map((_, i) => {
          const isCardinal = i % 3 === 0;
          const angle = i * 30;
          const inner = polarToCartesian(
            CENTER,
            CENTER,
            isCardinal ? 204 : 212,
            angle
          );
          const outer = polarToCartesian(CENTER, CENTER, 222, angle);
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#a89cc4"
              strokeWidth={isCardinal ? 1.5 : 0.8}
              opacity={isCardinal ? 0.85 : 0.55}
              strokeLinecap="round"
            />
          );
        })}

        {/* Base "rest of day" ring — pale lavender (purple-pale token) */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={ARC_RADIUS}
          fill="none"
          stroke="#e8ddf5"
          strokeWidth={10}
          opacity={0.65}
        />

        {/* Phase arc segments with scroll-triggered draw-in */}
        {phaseSegments.map((seg, i) => {
          const d = describeArc(
            CENTER,
            CENTER,
            ARC_RADIUS,
            seg.startAngle,
            seg.endAngle
          );
          const length = arcLength(ARC_RADIUS, seg.startAngle, seg.endAngle);
          const shouldDraw = inView || reducedMotion;

          return (
            <path
              key={seg.phase}
              d={d}
              stroke={PHASE_ARC_COLOR[seg.phase]}
              strokeWidth={10}
              strokeLinecap="butt"
              fill="none"
              style={{
                strokeDasharray: reducedMotion ? undefined : length,
                strokeDashoffset: shouldDraw
                  ? 0
                  : reducedMotion
                  ? 0
                  : length,
                transition: reducedMotion
                  ? "none"
                  : `stroke-dashoffset 1100ms cubic-bezier(0.22, 1, 0.36, 1) ${
                      i * 80
                    }ms`,
              }}
            />
          );
        })}

      </svg>

      {/* Phase labels — clickable small-caps radiating outward */}
      {phaseSegments.map(({ phase, midAngle, firstId }) => {
        const pos = polarToCartesian(
          CENTER,
          CENTER,
          PHASE_LABEL_RADIUS,
          midAngle
        );
        return (
          <button
            key={phase}
            onClick={(e) => {
              e.stopPropagation();
              onOpenAt(firstId);
            }}
            className={cn(
              "absolute text-[0.54rem] sm:text-[0.62rem] font-bold tracking-[0.22em] sm:tracking-[0.26em] uppercase whitespace-nowrap text-purple-mid hover:text-purple transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-mid focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f7] rounded-sm px-1 py-0.5",
              inView || reducedMotion ? "opacity-100" : "opacity-0"
            )}
            style={{
              left: `${(pos.x / DIAL_SIZE) * 100}%`,
              top: `${(pos.y / DIAL_SIZE) * 100}%`,
              transform: "translate(-50%, -50%)",
              transitionDelay:
                inView && !reducedMotion ? "1000ms" : "0ms",
            }}
            aria-label={`Jump to ${PHASE_LABEL[phase]} phase in the agenda`}
          >
            {PHASE_LABEL[phase]}
          </button>
        );
      })}

      {/* Session dots — interactive buttons overlaid on the arc */}
      {markers.map(({ session, x, y, accent }, i) => {
        const color = ACCENT_COLORS[accent].dot;
        const isHovered = hovered === session.id;
        return (
          <button
            key={session.id}
            onClick={(e) => {
              e.stopPropagation();
              handleDotClick(session.id);
            }}
            onMouseEnter={() => {
              if (!coarsePointer) {
                setHovered(session.id);
                setHoverIsDefault(false);
              }
            }}
            onMouseLeave={() => {
              if (!coarsePointer) setHovered(null);
            }}
            onFocus={() => {
              setHovered(session.id);
              setHoverIsDefault(false);
            }}
            onBlur={() => setHovered(null)}
            className="absolute w-7 h-7 rounded-full flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-mid focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f7]"
            style={{
              left: `${(x / DIAL_SIZE) * 100}%`,
              top: `${(y / DIAL_SIZE) * 100}%`,
              transform: "translate(-50%, -50%)",
              opacity: inView || reducedMotion ? 1 : 0,
              transition: reducedMotion
                ? "none"
                : `opacity 320ms ease-out ${600 + i * 60}ms`,
            }}
            aria-label={`${session.time} — ${session.title}`}
          >
            <span
              className="block w-3 h-3 rounded-full ring-2 ring-white shadow-[0_1px_3px_rgba(45,27,78,0.25)] transition-transform duration-200"
              style={{
                backgroundColor: color,
                transform: isHovered ? "scale(1.45)" : "scale(1)",
              }}
            />
          </button>
        );
      })}

      {/* Tooltip — glass chip with time + title */}
      {hovered && (
        <SessionTooltip
          markers={markers}
          hoveredId={hovered}
          isDefaultHint={hoverIsDefault}
        />
      )}

      {/* Center content stack — date, hero, meta, CTA */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center text-center px-[22%] pointer-events-none transition-opacity duration-700",
          inView || reducedMotion ? "opacity-100" : "opacity-0"
        )}
        style={{
          transitionDelay: inView && !reducedMotion ? "300ms" : "0ms",
        }}
      >
        <div className="text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.28em] uppercase text-purple-mid mb-2">
          Thursday · April 30 · 2026
        </div>
        <h3 className="font-display text-[clamp(1rem,2.2vw,1.55rem)] font-semibold text-text leading-[1.15] tracking-[-0.012em] mb-2.5">
          A Day of <span className="text-purple">Longevity Leadership</span>
        </h3>
        <p className="text-[0.7rem] sm:text-[0.76rem] text-text-secondary mb-5">
          11 sessions · 4 phases · 6½ hours
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenAt();
          }}
          className="pointer-events-auto inline-flex items-center gap-2 bg-purple-deep text-white py-2.5 px-5 sm:py-3 sm:px-6 rounded-full font-semibold text-[0.76rem] sm:text-[0.82rem] shadow-[0_4px_18px_rgba(45,27,78,0.22)] hover:shadow-[0_10px_30px_rgba(91,58,140,0.28)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          View Full Agenda
          <ArrowRight className="w-[14px] h-[14px]" />
        </button>
      </div>
    </div>
  );
}

/* ── Tooltip — smart-positioned glass chip ───────────────── */

function SessionTooltip({
  markers,
  hoveredId,
  isDefaultHint,
}: {
  markers: SessionMarker[];
  hoveredId: string;
  isDefaultHint: boolean;
}) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  // Reset the measured width when the hovered session changes so the
  // next layout pass re-measures against the bubble's max-width cap.
  useLayoutEffect(() => {
    setWidth(null);
  }, [hoveredId]);

  // Shrink the bubble to the width of its widest actually-rendered line.
  // Standard CSS sizes an absolutely-positioned "shrink-to-fit" box to
  // max-content capped at max-width — which leaves trailing whitespace
  // whenever a title wraps to 2+ lines. Range.getClientRects() returns
  // one rect per visual line; we pick the widest and collapse the bubble
  // to it + horizontal padding. Runs before paint, so the user never
  // sees the intermediate max-width layout.
  useLayoutEffect(() => {
    if (width !== null) return;
    const el = bubbleRef.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLElement>("[data-measure]");
    let longest = 0;
    for (const line of lines) {
      const range = document.createRange();
      range.selectNodeContents(line);
      for (const rect of range.getClientRects()) {
        if (rect.width > longest) longest = rect.width;
      }
    }
    if (longest > 0) {
      // px-4 → 32px total horizontal padding. +1px guards against
      // subpixel rounding that could re-wrap the longest line.
      setWidth(Math.ceil(longest) + 32 + 1);
    }
  }, [width]);

  const m = markers.find((mk) => mk.session.id === hoveredId);
  if (!m) return null;

  const isBelow = m.y < CENTER; // upper half → tooltip sits below the dot
  const leftPct = (m.x / DIAL_SIZE) * 100;
  const topPct = (m.y / DIAL_SIZE) * 100;

  // Keep the dot anchor inside the dial footprint when it's near the
  // left or right edge. The bubble itself may extend slightly past the
  // dial rim into the surrounding whitespace — the dial wrapper has no
  // overflow clip — which is acceptable visually.
  const clampedLeft = Math.max(18, Math.min(82, leftPct));

  // Quadrant-aware outward shift. Applied when either (a) this is the
  // auto-shown affordance hint or (b) the hovered session is one of
  // the known-problematic ones (listed in OUTWARD_SHIFT_IDS) whose
  // centered bubble would cross "A Day of Longevity Leadership". All
  // other user hovers keep the default `-50%` centering so the bubble
  // sits under the cursor.
  const horizOffset = (m.x - CENTER) / ARC_RADIUS; // −1 (9 o'clock) → +1 (3 o'clock)
  const shiftOutward = isDefaultHint || OUTWARD_SHIFT_IDS.has(hoveredId);
  const translateXPct = shiftOutward ? -50 + 30 * horizOffset : -50;

  return (
    <div
      ref={bubbleRef}
      className="absolute pointer-events-none z-10 w-auto max-w-[min(220px,62vw)] rounded-xl bg-white/95 backdrop-blur-md ring-1 ring-purple-mid/20 px-4 py-3 shadow-[0_10px_28px_rgba(45,27,78,0.14)] transition-all duration-200"
      style={{
        left: `${clampedLeft}%`,
        top: `calc(${topPct}% + ${isBelow ? "22px" : "-22px"})`,
        transform: `translate(${translateXPct}%, ${isBelow ? "0" : "-100%"})`,
        width: width !== null ? `${width}px` : undefined,
      }}
      role="tooltip"
    >
      <div
        data-measure
        className="text-[0.58rem] font-bold tracking-[0.18em] uppercase mb-1"
        style={{ color: ACCENT_COLORS[m.accent].label }}
      >
        {m.session.time}
      </div>
      <div
        data-measure
        className="font-display text-[0.88rem] font-semibold text-text leading-[1.25]"
      >
        {m.session.title}
      </div>
    </div>
  );
}

/* ── Top-level wrapper — section + modal state ───────────── */

export function AboutAgendaCTA() {
  const [modalState, setModalState] = useState<{
    open: boolean;
    focusId?: string;
  }>({ open: false });

  // Note: the /about#agenda deep link (from the homepage Sponsors CTA and
  // elsewhere) no longer auto-opens the modal. The /about page now has a
  // full inline agenda visualization — banner + Time Rail on mobile,
  // banner + DayClock on tablet and desktop — so the modal popping open
  // on arrival would obscure that inline view. The hash still works as a
  // scroll anchor to this section.

  const openAt = useCallback((focusId?: string) => {
    setModalState({ open: true, focusId });
  }, []);

  return (
    <>
      <section
        id="agenda"
        className="relative z-[2] py-24 lg:py-32 bg-bg overflow-hidden"
      >
        {/* Mobile (<768px): AgendaMobile sits at full section width so its
            HeroCard banner can render edge-to-edge; internal wrappers
            handle the narrower Time Rail column. */}
        <div className="md:hidden">
          <AgendaMobile onOpenAt={openAt} />
        </div>

        {/* Tablet + desktop (≥768px): same edge-to-edge banner above the
            clock dial. The banner renders at section width; the dial sits
            in the 1080px editorial column below, tiering from a compact
            560px at tablet up to 820px at xl so narrower tablet windows
            don't render an oversized dial. */}
        <div className="hidden md:block">
          <FadeIn>
            <HeroCard />
          </FadeIn>
          <div className="relative max-w-[1080px] mx-auto px-6 mt-16">
            <DayClock onOpenAt={openAt} />
          </div>
        </div>
      </section>
      {modalState.open && (
        <AgendaModal
          onClose={() => setModalState({ open: false })}
          focusId={modalState.focusId}
        />
      )}
    </>
  );
}
