"use client";

import {
  Sparkles,
  Mic,
  Users,
  Coffee,
  Award,
  Download,
  FileDown,
} from "lucide-react";
import { AGENDA, type AgendaSession } from "@/lib/constants";
import { FadeIn } from "./fade-in";
import { downloadAgendaICS, downloadAgendaPDF } from "./agenda";

/* ── Mobile Time Rail — vertical timeline view of the conference day.
   A purpose-built mobile alternative to the desktop DayClock dial:
   hero masthead → ornamental scene break → four phase blocks, each
   a sequence of session cards aligned to a continuous vertical rail
   with format-colored dots. Same data, same modal as the desktop
   view — just linearized for narrow viewports.
   ─────────────────────────────────────────────────────────── */

/* ── Accent color system — mirrors components/agenda.tsx and
   components/about-agenda-cta.tsx. Colocated rather than imported
   to keep this module self-contained (both source files already
   duplicate these values locally). ────────────────────────── */

type AccentFamily = "rose" | "purple" | "slate";

const FORMAT_CONFIG: Record<
  AgendaSession["format"],
  { icon: typeof Sparkles; accent: AccentFamily }
> = {
  welcome: { icon: Sparkles, accent: "rose" },
  keynote: { icon: Mic, accent: "purple" },
  panel: { icon: Users, accent: "purple" },
  networking: { icon: Coffee, accent: "slate" },
  closing: { icon: Award, accent: "rose" },
};

const ACCENT: Record<
  AccentFamily,
  { bar: string; label: string; dot: string; wash: string }
> = {
  rose: {
    bar: "#a86a7e",
    label: "#9b5a70",
    dot: "#a86a7e",
    wash: "rgba(168,106,126,0.045)",
  },
  purple: {
    bar: "#7b52b5",
    label: "#6b47a0",
    dot: "#7b52b5",
    wash: "rgba(123,82,181,0.04)",
  },
  slate: {
    bar: "#9992a6",
    label: "#7d7890",
    dot: "#9992a6",
    wash: "rgba(153,146,166,0.035)",
  },
};

const PHASE_META: Record<
  AgendaSession["phase"],
  { label: string; subtitle: string; time: string; railColor: string }
> = {
  morning: {
    label: "Morning",
    subtitle: "The foundation is set",
    time: "10:00 AM – 11:50 AM",
    railColor: "#7b52b5",
  },
  midday: {
    label: "Midday",
    subtitle: "Pause & connect",
    time: "11:50 AM – 1:00 PM",
    railColor: "#9992a6",
  },
  afternoon: {
    label: "Afternoon",
    subtitle: "Strategy & capital",
    time: "1:00 PM – 3:00 PM",
    railColor: "#7b52b5",
  },
  finale: {
    label: "Finale",
    subtitle: "Forward motion",
    time: "3:00 PM – 4:30 PM",
    railColor: "#a86a7e",
  },
};

const PHASE_ORDER: AgendaSession["phase"][] = [
  "morning",
  "midday",
  "afternoon",
  "finale",
];

/* ── HeroCard — editorial masthead as a dark purple gradient banner.
   Uses the site's canonical dark-panel recipe (matches the Hosts
   section): 3-stop diagonal purple + two ambient glows (purple-light
   upper-left, rose lower-right) + a subtle diagonal line pattern
   overlay. Eyebrow gets flanking hairlines in purple-light to echo
   the PhaseHeader ornamentation. No CTA — the Time Rail rendered
   below IS the agenda, so a "View Full Agenda" button would be
   redundant. ─────────────────────────────────────────────── */

export function HeroCard() {
  return (
    <div
      className="relative overflow-hidden p-10 sm:p-14 text-center shadow-[0_12px_40px_rgba(45,27,78,0.32)]"
      style={{
        background: `
          radial-gradient(ellipse 130% 90% at 20% 15%, rgba(168,124,224,0.35), transparent 55%),
          radial-gradient(ellipse 100% 80% at 85% 110%, rgba(192,96,128,0.18), transparent 55%),
          linear-gradient(135deg, #2d1b4e 0%, #3c2066 55%, #4a2d6e 100%)
        `,
      }}
    >
      {/* Subtle diagonal pattern — matches Hosts section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.5'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content — `relative` wrapper ensures it paints above the absolute pattern overlay */}
      <div className="relative">
        {/* Eyebrow — purple-light with flanking hairlines */}
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/70" />
          <span className="text-[0.58rem] font-bold tracking-[0.28em] uppercase text-white">
            April 30 · 2026
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/70" />
        </div>
        {/* Title — white serif, purple-light accent on "Longevity Leadership" */}
        <h2 className="font-display text-[clamp(1.6rem,6vw,2.1rem)] font-semibold text-white leading-[1.1] tracking-[-0.012em] mb-3">
          Agenda <span className="text-purple-light">Overview</span>
        </h2>
        {/* Sub-stat */}
        <p className="text-[0.78rem] text-white/65 tracking-wide">
          11 sessions · 4 phases · 6½ hours
        </p>
      </div>
    </div>
  );
}

/* ── PhaseHeader — small-caps label + italic subtitle + time range.
   Matches the modal's PhaseHeader but scaled for the narrow rail. */

function PhaseHeader({ phase }: { phase: AgendaSession["phase"] }) {
  const meta = PHASE_META[phase];
  return (
    <div className="text-center mb-5">
      <div className="inline-flex items-center gap-3 mb-1.5">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-purple-mid/50" />
        <span className="text-[0.66rem] font-bold tracking-[0.24em] uppercase text-purple-mid">
          {meta.label}
        </span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-purple-mid/50" />
      </div>
      <div className="font-display italic text-[0.98rem] text-text/80 leading-snug mb-1">
        {meta.subtitle}
      </div>
      <div className="text-[0.64rem] text-text-muted tracking-[0.12em] uppercase">
        {meta.time}
      </div>
    </div>
  );
}

/* ── SessionRow — three-column grid (time | rail+dot | card).
   The middle column hosts the vertical rail line (phase color at
   ~20% alpha) and the format-colored dot with a bg-colored ring
   that breaks the line so the dot appears to float on it. The
   card column is a tappable button that opens the modal at the
   session's id. ───────────────────────────────────────────── */

function SessionRow({
  session,
  onOpenAt,
}: {
  session: AgendaSession;
  onOpenAt: (focusId?: string) => void;
}) {
  const config = FORMAT_CONFIG[session.format];
  const Icon = config.icon;
  const c = ACCENT[config.accent];
  const railColor = PHASE_META[session.phase].railColor;

  // Note: deliberately no `id` on this <li>. The modal's AgendaRow uses
  // `id="session-{id}"` for its focusId deep-link scroll. Both views are
  // in the DOM at all viewport sizes (hidden via display:none on their
  // wrapper), so giving our <li> the same id would make getElementById
  // resolve to the hidden mobile <li> instead of the modal's row.
  return (
    <li className="grid grid-cols-[62px_20px_1fr] gap-x-2.5 mb-4 last:mb-0">
      {/* Time column */}
      <div className="pt-5 text-right">
        <div
          className="text-[0.6rem] font-bold tracking-[0.12em] uppercase leading-tight"
          style={{ color: c.label }}
        >
          {session.time}
        </div>
      </div>

      {/* Rail column — line + dot */}
      <div className="relative flex justify-center">
        <div
          className="absolute top-0 bottom-0 w-px"
          style={{ backgroundColor: `${railColor}33` }}
        />
        <div
          className="relative mt-[22px] w-3 h-3 rounded-full ring-4 ring-bg"
          style={{
            backgroundColor: c.dot,
            boxShadow: `0 0 0 1px ${c.dot}40`,
          }}
        />
      </div>

      {/* Card column — tappable button */}
      <button
        onClick={() => onOpenAt(session.id)}
        className="group text-left"
        aria-label={`${session.time} — ${session.title}. Opens full agenda.`}
      >
        <div className="relative rounded-[14px] bg-white ring-1 ring-border-light overflow-hidden shadow-[0_1px_3px_rgba(16,10,30,0.03),0_8px_22px_-16px_rgba(45,27,78,0.18)] transition-all duration-300 group-hover:ring-purple-mid/25 group-hover:-translate-y-[1px] group-hover:shadow-[0_2px_6px_rgba(16,10,30,0.04),0_14px_32px_-16px_rgba(45,27,78,0.25)] group-active:scale-[0.995]">
          {/* Left accent bar — format color */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{ backgroundColor: c.bar }}
          />
          {/* Very subtle top wash */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, ${c.wash} 0%, transparent 55%)`,
            }}
          />
          <div className="relative px-4 py-4">
            {/* Format pill — inline icon + tiny uppercase label */}
            <div className="flex items-center gap-1.5 mb-2">
              <Icon
                className="w-[12px] h-[12px] shrink-0"
                strokeWidth={2.3}
                style={{ color: c.label }}
              />
              <span
                className="text-[0.55rem] font-bold tracking-[0.2em] uppercase"
                style={{ color: c.label }}
              >
                {session.formatLabel}
              </span>
            </div>
            {/* Title */}
            <h3 className="font-display text-[1.02rem] font-semibold text-text leading-[1.2] tracking-[-0.005em]">
              {session.title}
            </h3>
            {/* Speakers — show all names (wraps to multiple lines as needed) */}
            {session.speakers && session.speakers.length > 0 && (
              <div className="mt-2 text-[0.75rem] text-text-muted leading-snug">
                {session.speakers.map((s) => s.name).join(" · ")}
              </div>
            )}
            {session.moderator && (
              <div className="mt-2 text-[0.75rem] text-text-muted leading-snug">
                <span className="text-text-secondary font-medium">
                  Moderator:
                </span>{" "}
                {session.moderator.name}
              </div>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}

/* ── Top-level component — assembly + FadeIn scroll entrance.
   Hero + each PhaseBlock fade in independently; PhaseBlocks
   stagger by 80ms per phase as the user scrolls. ──────────── */

export function AgendaMobile({
  onOpenAt,
}: {
  onOpenAt: (focusId?: string) => void;
}) {
  return (
    <>
      {/* Edge-to-edge banner — spans the full section width (= viewport
          width since the section has no horizontal constraint). */}
      <FadeIn>
        <HeroCard />
      </FadeIn>

      {/* Time Rail — outer wrapper provides horizontal padding so the rail
          doesn't stick to viewport edges on narrow phones; inner wrapper
          caps it to the editorial column width. */}
      <div className="px-6">
        <div className="max-w-[460px] sm:max-w-[540px] mx-auto">
          {PHASE_ORDER.map((phase, pi) => {
            const sessions = AGENDA.filter((s) => s.phase === phase);
            if (sessions.length === 0) return null;
            return (
              <FadeIn key={phase} delay={pi * 80}>
                <div className="mt-10">
                  <PhaseHeader phase={phase} />
                  <ol className="list-none">
                    {sessions.map((session) => (
                      <SessionRow
                        key={session.id}
                        session={session}
                        onOpenAt={onOpenAt}
                      />
                    ))}
                  </ol>
                </div>
              </FadeIn>
            );
          })}

          {/* Section footer — Add to Calendar + Download PDF + disclaimer.
              Mirrors the desktop modal's footer block (components/agenda.tsx
              ~line 1185) so the two surfaces feel like siblings: hairline
              separator, stacked glass-pill buttons, italic disclaimer.
              Previously these actions were only reachable on mobile by
              tapping a session to open the modal — now they surface at the
              bottom of the section itself. */}
          <FadeIn delay={PHASE_ORDER.length * 80}>
            <div className="mt-12 pt-8 border-t border-border-light/60 text-center">
              <div className="inline-flex flex-col items-center gap-2.5 mb-4">
                <button
                  type="button"
                  onClick={downloadAgendaICS}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white ring-1 ring-purple-mid/25 hover:ring-purple-mid/55 hover:bg-purple-wash/40 text-text hover:text-purple transition-all duration-250 text-[0.82rem] font-semibold cursor-pointer shadow-[0_1px_2px_rgba(45,27,78,0.04)] hover:shadow-[0_4px_14px_rgba(91,58,140,0.08)]"
                >
                  <Download
                    className="w-[14px] h-[14px] transition-transform duration-250 group-hover:translate-y-[1px]"
                    strokeWidth={2}
                  />
                  <span>Add to Calendar</span>
                </button>
                <button
                  type="button"
                  onClick={downloadAgendaPDF}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white ring-1 ring-purple-mid/25 hover:ring-purple-mid/55 hover:bg-purple-wash/40 text-text hover:text-purple transition-all duration-250 text-[0.82rem] font-semibold cursor-pointer shadow-[0_1px_2px_rgba(45,27,78,0.04)] hover:shadow-[0_4px_14px_rgba(91,58,140,0.08)]"
                >
                  <FileDown
                    className="w-[14px] h-[14px] transition-transform duration-250 group-hover:translate-y-[1px]"
                    strokeWidth={2}
                  />
                  <span>Download PDF</span>
                </button>
              </div>
              <p className="text-[0.72rem] text-text-muted italic leading-[1.55]">
                Agenda subject to refinement. Final program will be published
                closer to the event.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
