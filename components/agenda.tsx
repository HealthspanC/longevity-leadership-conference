"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Sparkles,
  Mic,
  Users,
  Coffee,
  Award,
  MapPin,
  Clock,
  Download,
  FileDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AGENDA, SITE, type AgendaSession } from "@/lib/constants";

/* ── Format configuration ─────────────────────────────────────
   Each session format maps to an icon + accent family.
   Three families give visual hierarchy without rainbow clutter:
     • rose   — bookend moments (welcome + closing)
     • purple — content sessions (keynote + panel)
     • slate  — transitions (break + networking) — de-emphasized
   ─────────────────────────────────────────────────────────── */

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
  { bar: string; label: string; wash: string; dot: string }
> = {
  rose: {
    bar: "#a86a7e",
    label: "#9b5a70",
    wash: "rgba(168,106,126,0.045)",
    dot: "#a86a7e",
  },
  purple: {
    bar: "#7b52b5",
    label: "#6b47a0",
    wash: "rgba(123,82,181,0.04)",
    dot: "#7b52b5",
  },
  slate: {
    bar: "#9992a6",
    label: "#7d7890",
    wash: "rgba(153,146,166,0.035)",
    dot: "#9992a6",
  },
};

/* ── Phase configuration ─────────────────────────────────── */

type AgendaPhase = AgendaSession["phase"];

const PHASE_META: Record<
  AgendaPhase,
  { label: string; subtitle: string; time: string }
> = {
  morning: {
    label: "Morning",
    subtitle: "The foundation is set",
    time: "10:00 AM – 11:50 AM",
  },
  midday: {
    label: "Midday",
    subtitle: "Pause & connect",
    time: "11:50 AM – 1:00 PM",
  },
  afternoon: {
    label: "Afternoon",
    subtitle: "Strategy & capital",
    time: "1:00 PM – 3:00 PM",
  },
  finale: {
    label: "Finale",
    subtitle: "Forward motion",
    time: "3:00 PM – 4:30 PM",
  },
};

const PHASE_ORDER: AgendaPhase[] = [
  "morning",
  "midday",
  "afternoon",
  "finale",
];

/* ── Phase header — editorial, centered, ornamental ─────── */

function PhaseHeader({ phase }: { phase: AgendaPhase }) {
  const meta = PHASE_META[phase];
  return (
    <div className="text-center mb-6 sm:mb-7">
      <div className="inline-flex items-center gap-3 mb-2">
        <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-purple-mid/50" />
        <span className="text-[0.68rem] sm:text-[0.72rem] font-bold tracking-[0.24em] uppercase text-purple-mid whitespace-nowrap">
          {meta.label}
        </span>
        <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-purple-mid/50" />
      </div>
      <div className="font-display italic text-[1.02rem] sm:text-[1.12rem] text-text/80 leading-snug mb-1.5">
        {meta.subtitle}
      </div>
      <div className="text-[0.66rem] sm:text-[0.68rem] text-text-muted tracking-[0.12em] uppercase">
        {meta.time}
      </div>
    </div>
  );
}

/* ── Agenda row — stacked layout, time above card ───────── */

function AgendaRow({
  session,
  index,
}: {
  session: AgendaSession;
  index: number;
}) {
  const config = FORMAT_CONFIG[session.format];
  const Icon = config.icon;
  const c = ACCENT[config.accent];

  return (
    <li
      id={`session-${session.id}`}
      className="mb-4 sm:mb-5 last:mb-0 group scroll-mt-6"
      style={{
        animation: `agenda-rise 520ms cubic-bezier(0.22, 1, 0.36, 1) ${
          180 + index * 45
        }ms both`,
      }}
    >
      {/* Time label — sits above the card, outside */}
      <div className="flex items-center gap-2 mb-2 pl-1">
        <div
          className="w-[5px] h-[5px] rounded-full shrink-0"
          style={{ backgroundColor: c.dot }}
        />
        <span
          className="text-[0.66rem] sm:text-[0.68rem] font-bold tracking-[0.14em] uppercase"
          style={{ color: c.label }}
        >
          {session.time}
        </span>
      </div>

      {/* Card */}
      <div className="relative rounded-[16px] bg-white ring-1 ring-border-light overflow-hidden shadow-[0_1px_3px_rgba(16,10,30,0.03),0_10px_28px_-16px_rgba(45,27,78,0.18)] transition-all duration-300 group-hover:ring-purple-mid/20 group-hover:-translate-y-[1px] group-hover:shadow-[0_2px_6px_rgba(16,10,30,0.04),0_18px_40px_-16px_rgba(45,27,78,0.25)]">
        {/* Left accent bar — format-specific color */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ backgroundColor: c.bar }}
        />

        {/* Very subtle top wash — barely perceptible depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${c.wash} 0%, transparent 55%)`,
          }}
        />

        <div className="relative px-5 py-5 sm:px-7 sm:py-6">
          {/* Format label — inline icon + text, no circle */}
          <div className="flex items-center gap-1.5 mb-3">
            <Icon
              className="w-[13px] h-[13px] shrink-0"
              strokeWidth={2.3}
              style={{ color: c.label }}
            />
            <span
              className="text-[0.58rem] sm:text-[0.6rem] font-bold tracking-[0.2em] uppercase"
              style={{ color: c.label }}
            >
              {session.formatLabel}
            </span>
          </div>

          {/* Session title */}
          <h3 className="font-display text-[1.18rem] sm:text-[1.32rem] font-semibold text-text leading-[1.2] tracking-[-0.005em] mb-4">
            {session.title}
          </h3>

          {/* Speakers variant (welcome, keynote, closing) */}
          {session.speakers && !session.moderator && (
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-1.5 gap-x-6">
              {session.speakers.map((s) => (
                <div
                  key={s.name}
                  className="text-[0.84rem] leading-relaxed"
                >
                  <span className="font-semibold text-text">{s.name}</span>
                  {s.role && (
                    <span className="text-text-muted"> · {s.role}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Panel variant (moderator + panelists) */}
          {session.moderator && (
            <div className="space-y-3">
              <div>
                <div className="text-[0.56rem] font-bold tracking-[0.2em] uppercase text-text-muted mb-1">
                  Moderator
                </div>
                <div className="text-[0.84rem] leading-relaxed">
                  <span className="font-semibold text-text">
                    {session.moderator.name}
                  </span>
                  {session.moderator.role && (
                    <span className="text-text-muted">
                      {" "}
                      · {session.moderator.role}
                    </span>
                  )}
                </div>
              </div>
              {session.panelists && (
                <div>
                  <div className="text-[0.56rem] font-bold tracking-[0.2em] uppercase text-text-muted mb-1.5">
                    Panelists
                  </div>
                  <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-y-1.5 gap-x-6">
                    {session.panelists.map((p) => (
                      <li
                        key={p.name}
                        className="text-[0.84rem] leading-relaxed"
                      >
                        <span className="font-semibold text-text">
                          {p.name}
                        </span>
                        {p.role && (
                          <span className="text-text-muted"> · {p.role}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Closing session format details */}
          {session.formatDetails && (
            <ul className="mt-4 pt-4 border-t border-border-light/60 space-y-1.5">
              {session.formatDetails.map((d) => (
                <li
                  key={d}
                  className="text-[0.8rem] text-text-secondary leading-relaxed flex gap-2.5"
                >
                  <span
                    className="w-[3px] h-[3px] rounded-full mt-[0.65em] shrink-0"
                    style={{ backgroundColor: c.dot, opacity: 0.7 }}
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}

/* ── ICS calendar export ─────────────────────────────────────
   Parses each session's human time string ("10:00 – 10:15 AM",
   "11:50 AM – 1:00 PM") into 24-hour local times and emits a
   VCALENDAR with America/Los_Angeles TZID.
   ─────────────────────────────────────────────────────────── */

export function parseTimeRange(
  input: string
): { start: string; end: string } | null {
  const m = input
    .trim()
    .match(
      /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/i
    );
  if (!m) return null;
  const [, sH, sM, sAp, eH, eM, eAp] = m;
  const endMeridiem = eAp.toUpperCase();
  const startMeridiem = (sAp || eAp).toUpperCase();
  const to24 = (h: string, meridiem: string) => {
    let hh = parseInt(h, 10);
    if (meridiem === "PM" && hh !== 12) hh += 12;
    if (meridiem === "AM" && hh === 12) hh = 0;
    return hh.toString().padStart(2, "0");
  };
  return {
    start: `${to24(sH, startMeridiem)}${sM}00`,
    end: `${to24(eH, endMeridiem)}${eM}00`,
  };
}

function escapeICSText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r/g, "")
    .replace(/\n/g, "\\n");
}

function foldICSLine(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length > 74) {
    chunks.push(" " + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  if (rest.length > 0) chunks.push(" " + rest);
  return chunks.join("\r\n");
}

function nowDTStamp(): string {
  const d = new Date();
  const p = (n: number) => n.toString().padStart(2, "0");
  return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(
    d.getUTCDate()
  )}T${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`;
}

function buildDescription(session: AgendaSession): string {
  const lines: string[] = [session.formatLabel];
  if (session.speakers && !session.moderator) {
    lines.push("", "Speakers:");
    for (const s of session.speakers) {
      lines.push(s.role ? `• ${s.name} — ${s.role}` : `• ${s.name}`);
    }
  }
  if (session.moderator) {
    const mod = session.moderator.role
      ? `${session.moderator.name} — ${session.moderator.role}`
      : session.moderator.name;
    lines.push("", `Moderator: ${mod}`);
    if (session.panelists) {
      lines.push("", "Panelists:");
      for (const p of session.panelists) {
        lines.push(p.role ? `• ${p.name} — ${p.role}` : `• ${p.name}`);
      }
    }
  }
  if (session.formatDetails) {
    lines.push("");
    for (const d of session.formatDetails) lines.push(`• ${d}`);
  }
  return lines.join("\n");
}

function generateICS(sessions: readonly AgendaSession[]): string {
  const stamp = nowDTStamp();
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Longevity Leadership Conference//Program 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Longevity Leadership Conference 2026",
    "X-WR-TIMEZONE:America/Los_Angeles",
    "BEGIN:VTIMEZONE",
    "TZID:America/Los_Angeles",
    "BEGIN:DAYLIGHT",
    "DTSTART:19700308T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "TZNAME:PDT",
    "TZOFFSETFROM:-0800",
    "TZOFFSETTO:-0700",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "DTSTART:19701101T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "TZNAME:PST",
    "TZOFFSETFROM:-0700",
    "TZOFFSETTO:-0800",
    "END:STANDARD",
    "END:VTIMEZONE",
  ];

  for (const session of sessions) {
    const parsed = parseTimeRange(session.time);
    if (!parsed) continue;
    const summary = `${session.formatLabel} — ${session.title}`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${session.id}@llc2026.healthspancollective.co`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=America/Los_Angeles:20260430T${parsed.start}`,
      `DTEND;TZID=America/Los_Angeles:20260430T${parsed.end}`,
      `SUMMARY:${escapeICSText(summary)}`,
      `LOCATION:${escapeICSText("Verizon Innovation Lab, Los Angeles")}`,
      `DESCRIPTION:${escapeICSText(buildDescription(session))}`,
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.map(foldICSLine).join("\r\n");
}

function downloadAgendaICS() {
  const ics = generateICS(AGENDA);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "longevity-leadership-conference-2026.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── PDF download (via native print dialog) ────────────────
   Opens the browser's print dialog, which defaults to "Save
   as PDF" destination on all modern browsers. The dedicated
   <PrintableAgenda /> sheet (rendered alongside the modal)
   is the only thing visible on print — globals.css hides
   every other body child under the @media print rule.
   Benefits over a client-side PDF library:
     • Native font rendering (Inter + Playfair Display +
       Grift all render as vectors with selectable text)
     • No bundle-size hit
     • Always in sync with the live AGENDA constant
   ────────────────────────────────────────────────────── */
function downloadAgendaPDF() {
  if (typeof window === "undefined") return;
  window.print();
}

/* ── PrintableAgenda — editorial program sheet ────────────
   Rendered as a sibling portal to the modal. Hidden on
   screen via `display: none` (see .agenda-print-root in
   globals.css). On print, it's the only body child shown,
   laid out to US Letter with editorial typography that
   mirrors the modal's design language: serif italics for
   the phase subtitle, small-caps purple kickers, format-
   color accent dots, hairline rules with gradient fades.
   The layout is pt-based so print sizing is predictable
   across browsers, and `break-inside: avoid-page` on each
   session/phase block prevents awkward mid-item splits.
   ────────────────────────────────────────────────────── */
function PrintableAgenda() {
  return (
    <div
      className="agenda-print-root"
      style={{
        fontFamily: "var(--font-sans), Inter, system-ui, sans-serif",
        color: "#1a1a2e",
        background: "#ffffff",
        // Letter content width = 8.5in - 1.2in margins = 7.3in
        maxWidth: "7.3in",
        margin: "0 auto",
        padding: 0,
      }}
    >
      {/* ── Masthead ─────────────────────────────────────── */}
      <header style={{ textAlign: "center", marginBottom: "28pt" }}>
        {/* Top row — draft pill + site wordmark anchor */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32pt",
            fontSize: "7pt",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#9b5a70" }}>
            Draft · Subject to Change
          </span>
          <span style={{ color: "#8888a0" }}>
            longevityleadershipconference.com
          </span>
        </div>

        {/* Ornamental date kicker */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10pt",
            marginBottom: "14pt",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "48pt",
              height: "0.5pt",
              background:
                "linear-gradient(to right, transparent, rgba(123,82,181,0.45))",
            }}
          />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6pt",
              fontFamily:
                "var(--font-serif), 'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "10pt",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#5b3a8c",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "3pt",
                height: "3pt",
                borderRadius: "50%",
                background: "rgba(123,82,181,0.7)",
              }}
            />
            Thursday · April 30 · 2026
            <span
              style={{
                display: "inline-block",
                width: "3pt",
                height: "3pt",
                borderRadius: "50%",
                background: "rgba(123,82,181,0.7)",
              }}
            />
          </span>
          <span
            style={{
              display: "inline-block",
              width: "48pt",
              height: "0.5pt",
              background:
                "linear-gradient(to left, transparent, rgba(123,82,181,0.45))",
            }}
          />
        </div>

        {/* Hero title */}
        <h1
          style={{
            fontFamily:
              "var(--font-serif), 'Playfair Display', Georgia, serif",
            fontWeight: 600,
            fontSize: "30pt",
            lineHeight: 1.1,
            letterSpacing: "-0.018em",
            color: "#1a1a2e",
            margin: "0 0 10pt 0",
          }}
        >
          A Day of <span style={{ color: "#5b3a8c" }}>Longevity Leadership</span>
        </h1>

        {/* Italic tagline */}
        <p
          style={{
            fontFamily:
              "var(--font-serif), 'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontSize: "11.5pt",
            lineHeight: 1.5,
            color: "#555566",
            maxWidth: "4.6in",
            margin: "0 auto 16pt",
          }}
        >
          Eleven curated sessions — the people and conversations shaping the
          next era of healthspan.
        </p>

        {/* Location + stats row */}
        <div
          style={{
            fontSize: "8.5pt",
            color: "#555566",
            letterSpacing: "0.04em",
          }}
        >
          Verizon Innovation Lab · Playa Vista · Los Angeles
          <span style={{ color: "#c9bcdb", margin: "0 8pt" }}>·</span>
          <span
            style={{
              fontWeight: 700,
              fontSize: "7.5pt",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#7b52b5",
            }}
          >
            11 Sessions · 4 Phases · 6½ Hours
          </span>
        </div>

        {/* Ornamental scene break */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8pt",
            marginTop: "22pt",
          }}
        >
          <span
            style={{
              flex: "0 1 140pt",
              height: "0.5pt",
              background:
                "linear-gradient(to right, transparent, rgba(123,82,181,0.28))",
            }}
          />
          <span
            style={{
              display: "inline-flex",
              gap: "4pt",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "3pt",
                height: "3pt",
                borderRadius: "50%",
                background: "rgba(123,82,181,0.4)",
              }}
            />
            <span
              style={{
                display: "inline-block",
                width: "4pt",
                height: "4pt",
                borderRadius: "50%",
                background: "rgba(123,82,181,0.55)",
              }}
            />
            <span
              style={{
                display: "inline-block",
                width: "3pt",
                height: "3pt",
                borderRadius: "50%",
                background: "rgba(123,82,181,0.4)",
              }}
            />
          </span>
          <span
            style={{
              flex: "0 1 140pt",
              height: "0.5pt",
              background:
                "linear-gradient(to left, transparent, rgba(123,82,181,0.28))",
            }}
          />
        </div>
      </header>

      {/* ── Phases ─────────────────────────────────────── */}
      {PHASE_ORDER.map((phase) => {
        const sessions = AGENDA.filter((s) => s.phase === phase);
        if (sessions.length === 0) return null;
        const meta = PHASE_META[phase];
        return (
          <section
            key={phase}
            style={{
              marginBottom: "26pt",
              // Prefer keeping a phase together; acceptable to break if too tall
              pageBreakInside: "avoid",
              breakInside: "avoid-page",
            }}
          >
            {/* Phase header */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "18pt",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10pt",
                  marginBottom: "6pt",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "40pt",
                    height: "0.5pt",
                    background:
                      "linear-gradient(to right, transparent, rgba(123,82,181,0.5))",
                  }}
                />
                <span
                  style={{
                    fontSize: "9pt",
                    fontWeight: 700,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "#7b52b5",
                  }}
                >
                  {meta.label}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: "40pt",
                    height: "0.5pt",
                    background:
                      "linear-gradient(to left, transparent, rgba(123,82,181,0.5))",
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-serif), 'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "13pt",
                  lineHeight: 1.35,
                  color: "#1a1a2e",
                  marginBottom: "4pt",
                }}
              >
                {meta.subtitle}
              </div>
              <div
                style={{
                  fontSize: "7.5pt",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#8888a0",
                }}
              >
                {meta.time}
              </div>
            </div>

            {/* Sessions */}
            <div>
              {sessions.map((session, si) => {
                const config = FORMAT_CONFIG[session.format];
                const c = ACCENT[config.accent];
                return (
                  <article
                    key={session.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "14pt 1fr",
                      columnGap: "12pt",
                      padding: "10pt 0",
                      borderTop:
                        si === 0
                          ? "0.5pt solid rgba(228,224,218,0.8)"
                          : "0.25pt solid rgba(228,224,218,0.55)",
                      pageBreakInside: "avoid",
                      breakInside: "avoid-page",
                    }}
                  >
                    {/* Format-color accent dot + left bar column */}
                    <div
                      style={{
                        position: "relative",
                        paddingTop: "3pt",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "8pt",
                          height: "8pt",
                          borderRadius: "50%",
                          background: c.dot,
                        }}
                      />
                    </div>

                    {/* Content column */}
                    <div>
                      {/* Kicker row — time · format label */}
                      <div
                        style={{
                          fontSize: "7.5pt",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: c.label,
                          marginBottom: "4pt",
                        }}
                      >
                        {session.time}
                        <span
                          style={{
                            opacity: 0.5,
                            margin: "0 6pt",
                          }}
                        >
                          ·
                        </span>
                        {session.formatLabel}
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          fontFamily:
                            "var(--font-serif), 'Playfair Display', Georgia, serif",
                          fontWeight: 600,
                          fontSize: "12.5pt",
                          lineHeight: 1.25,
                          letterSpacing: "-0.005em",
                          color: "#1a1a2e",
                          margin: "0 0 4pt 0",
                        }}
                      >
                        {session.title}
                      </h3>

                      {/* Speakers (non-panel) */}
                      {session.speakers && !session.moderator && (
                        <div
                          style={{
                            fontSize: "9pt",
                            lineHeight: 1.5,
                            color: "#555566",
                          }}
                        >
                          {session.speakers
                            .map((s) =>
                              s.role ? `${s.name} — ${s.role}` : s.name
                            )
                            .join(" · ")}
                        </div>
                      )}

                      {/* Moderator + panelists (panel sessions) */}
                      {session.moderator && (
                        <div
                          style={{
                            fontSize: "9pt",
                            lineHeight: 1.55,
                            color: "#555566",
                          }}
                        >
                          <div>
                            <span
                              style={{
                                fontWeight: 600,
                                color: "#1a1a2e",
                              }}
                            >
                              Moderator:
                            </span>{" "}
                            {session.moderator.role
                              ? `${session.moderator.name} — ${session.moderator.role}`
                              : session.moderator.name}
                          </div>
                          {session.panelists && (
                            <div style={{ marginTop: "2pt" }}>
                              <span
                                style={{
                                  fontWeight: 600,
                                  color: "#1a1a2e",
                                }}
                              >
                                Panelists:
                              </span>{" "}
                              {session.panelists
                                .map((p) =>
                                  p.role ? `${p.name} — ${p.role}` : p.name
                                )
                                .join(" · ")}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Format details (bullets) */}
                      {session.formatDetails && (
                        <ul
                          style={{
                            fontSize: "8.5pt",
                            lineHeight: 1.5,
                            color: "#555566",
                            margin: "5pt 0 0 0",
                            paddingLeft: "12pt",
                            listStyle: "disc",
                          }}
                        >
                          {session.formatDetails.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                );
              })}
              {/* Closing rule under last session in phase */}
              <div
                style={{
                  borderTop: "0.5pt solid rgba(228,224,218,0.8)",
                }}
              />
            </div>
          </section>
        );
      })}

      {/* ── Footer ─────────────────────────────────────── */}
      <footer
        style={{
          marginTop: "20pt",
          paddingTop: "14pt",
          borderTop: "0.5pt solid rgba(228,224,218,0.8)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily:
              "var(--font-serif), 'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontSize: "8.5pt",
            color: "#8888a0",
            marginBottom: "4pt",
          }}
        >
          Agenda subject to refinement. Final program will be published
          closer to the event.
        </div>
        <div
          style={{
            fontSize: "7pt",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#5b3a8c",
          }}
        >
          longevityleadershipconference.com
        </div>
      </footer>
    </div>
  );
}

export function AgendaModal({
  onClose,
  focusId,
}: {
  onClose: () => void;
  focusId?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
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

  // Deep-link: if a focusId is provided, scroll that session into view once
  // the modal is visible and rendered. Uses the modal's internal scroll
  // container (data-agenda-scroll) so the document scroll isn't affected.
  useEffect(() => {
    if (!focusId || !visible) return;
    const scroller = document.querySelector<HTMLDivElement>(
      "[data-agenda-scroll]"
    );
    const target = document.getElementById(`session-${focusId}`);
    if (!scroller || !target) return;

    // Wait one frame past the entrance transition kickoff so the modal
    // actually has its final height — then scroll inside the container.
    const raf = requestAnimationFrame(() => {
      // Compute target offset relative to the scroller's top, with a small
      // breathing-room margin above.
      const scrollerRect = scroller.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const offset =
        scroller.scrollTop + (targetRect.top - scrollerRect.top) - 24;
      scroller.scrollTo({ top: offset, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [focusId, visible]);

  return (
    <>
      {createPortal(
    <div
      className={cn(
        // Mobile anchors the modal near the top (items-start) so the X
        // button never hides under the browser's URL bar chrome. Extra
        // top padding + safe-area-inset gives clearance from the status
        // bar / notch on iOS. Desktop keeps centered placement.
        "fixed inset-0 z-[9999] flex items-start sm:items-center justify-center px-4 pb-4 sm:p-6 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
      style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

      {/* Modal shell — warm cream gradient background.
          `max-h-[92dvh]` uses dynamic viewport height so the modal
          respects mobile browsers' visible viewport (excluding the
          URL bar) instead of the larger layout viewport. */}
      <div
        className={cn(
          "relative w-full max-w-[720px] max-h-[92dvh] rounded-[22px] overflow-hidden transition-all duration-300",
          "bg-gradient-to-b from-[#fbfaf7] to-[#f6f2ea]",
          "shadow-[0_30px_90px_rgba(45,27,78,0.3),0_0_0_1px_rgba(45,27,78,0.06)]",
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — glass pill, floats above scrollable content.
            Mobile uses a larger 44px touch target (iOS/Android minimum)
            and a tighter corner offset so it never collides with the
            centered draft pill below. */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 md:top-6 md:right-6 z-10 w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-white/80 backdrop-blur-md ring-1 ring-black/[0.06] shadow-[0_2px_10px_rgba(16,10,30,0.08)] flex items-center justify-center text-text-muted hover:text-text hover:bg-white hover:shadow-[0_3px_14px_rgba(16,10,30,0.12)] active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-[18px] h-[18px] stroke-[1.5]" />
        </button>

        {/* Scrollable content */}
        <div
          data-agenda-scroll
          className="overflow-y-auto max-h-[92dvh] px-5 pt-16 pb-8 sm:px-10 sm:pt-12 sm:pb-10 md:px-14 md:pt-14 md:pb-12"
        >
          {/* ── Editorial hero block ───────────────────────────── */}
          <div className="text-center mb-12 sm:mb-14 max-w-[640px] mx-auto">
            {/* Draft pill — delicate, demoted above the hero */}
            <div className="inline-flex items-center px-3 py-1 mb-8 rounded-full bg-[rgba(168,106,126,0.06)] ring-1 ring-[rgba(168,106,126,0.18)]">
              <span className="text-[0.56rem] font-bold tracking-[0.22em] uppercase text-[#9b5a70]">
                Draft Conference Agenda — Subject to Change
              </span>
            </div>

            {/* Ornamental date kicker — editorial save-the-date feel.
                On mobile the flanking hairlines are hidden so the date
                stays on a single line inside the narrow viewport. */}
            <div
              className="inline-flex items-center gap-3 sm:gap-4 mb-5 max-w-full"
              style={{
                animation:
                  "agenda-rise 600ms cubic-bezier(0.22, 1, 0.36, 1) 60ms both",
              }}
            >
              <div className="hidden sm:block h-px w-16 bg-gradient-to-r from-transparent to-purple-mid/45" />
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="w-[3px] h-[3px] rounded-full bg-purple-mid/70 shrink-0" />
                <span className="font-display italic text-[0.72rem] sm:text-[0.92rem] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-purple-mid">
                  Thursday · April 30 · 2026
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-purple-mid/70 shrink-0" />
              </div>
              <div className="hidden sm:block h-px w-16 bg-gradient-to-l from-transparent to-purple-mid/45" />
            </div>

            {/* Hero title */}
            <h2
              className="font-display text-[clamp(1.75rem,4.8vw,2.6rem)] font-semibold text-text leading-[1.05] tracking-[-0.018em] mb-5"
              style={{
                animation:
                  "agenda-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both",
              }}
            >
              A Day of{" "}
              <span className="text-purple">Longevity Leadership</span>
            </h2>

            {/* Grift italic tagline — narrative framing */}
            <p
              className="font-display italic text-[clamp(0.98rem,1.9vw,1.12rem)] text-text-secondary leading-[1.55] max-w-[500px] mx-auto mb-7"
              style={{
                animation:
                  "agenda-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) 160ms both",
              }}
            >
              Eleven curated sessions — the people and conversations shaping
              the next era of healthspan.
            </p>

            {/* Metadata — location + time (date lives in the kicker above) */}
            <div
              className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.82rem] text-text-secondary"
              style={{
                animation:
                  "agenda-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both",
              }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin
                  className="w-[13px] h-[13px] text-purple-mid shrink-0"
                  strokeWidth={2}
                />
                <span>Verizon Innovation Lab, Los Angeles</span>
              </span>
              <span
                className="hidden sm:inline text-text-muted/50"
                aria-hidden
              >
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock
                  className="w-[13px] h-[13px] text-purple-mid shrink-0"
                  strokeWidth={2}
                />
                <span>{SITE.time}</span>
              </span>
            </div>
          </div>

          {/* Ornamental separator — extended scene break before Morning */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14">
            <div className="h-px flex-1 max-w-[220px] bg-gradient-to-r from-transparent via-purple-mid/20 to-purple-mid/35" />
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-[4px] h-[4px] rounded-full bg-purple-mid/40" />
              <span className="w-[5px] h-[5px] rounded-full bg-purple-mid/55" />
              <span className="w-[4px] h-[4px] rounded-full bg-purple-mid/40" />
            </div>
            <div className="h-px flex-1 max-w-[220px] bg-gradient-to-l from-transparent via-purple-mid/20 to-purple-mid/35" />
          </div>

          {/* Agenda grouped by phase */}
          <div className="space-y-9 sm:space-y-11">
            {PHASE_ORDER.map((phase) => {
              const sessions = AGENDA.filter((s) => s.phase === phase);
              if (sessions.length === 0) return null;
              return (
                <div key={phase}>
                  <PhaseHeader phase={phase} />
                  <ol className="list-none">
                    {sessions.map((session) => (
                      <AgendaRow
                        key={session.id}
                        session={session}
                        index={AGENDA.indexOf(session)}
                      />
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>

          {/* Footer — Add to Calendar + Download PDF + disclaimer.
              The two download actions stack vertically as a matched
              pair; both share the same glass-pill chrome so they read
              as siblings rather than primary/secondary CTAs. */}
          <div className="mt-10 sm:mt-12 pt-7 border-t border-border-light/60 text-center">
            <div className="inline-flex flex-col items-center gap-2.5 mb-4">
              <button
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
            <p className="text-[0.72rem] text-text-muted italic">
              Agenda subject to refinement. Final program will be published
              closer to the event.
            </p>
          </div>
        </div>
      </div>
    </div>,
        document.body
      )}
      {/* Sibling portal — editorial print sheet. Hidden on screen via
          .agenda-print-root (display:none). On window.print() it
          becomes the only visible body child. */}
      {createPortal(<PrintableAgenda />, document.body)}
    </>
  );
}
