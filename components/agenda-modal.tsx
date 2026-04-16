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
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AGENDA, type AgendaSession } from "@/lib/constants";

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

const PHASE_META: Record<AgendaPhase, { label: string; time: string }> = {
  morning: { label: "Morning Sessions", time: "10:00 AM – 11:50 AM" },
  midday: { label: "Midday Break", time: "11:50 AM – 1:00 PM" },
  afternoon: { label: "Afternoon Sessions", time: "1:00 PM – 3:00 PM" },
  finale: { label: "Closing & Networking", time: "3:00 PM – 4:30 PM" },
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
      <div className="inline-flex items-center gap-3 mb-1.5">
        <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-purple-mid/50" />
        <span className="text-[0.68rem] sm:text-[0.72rem] font-bold tracking-[0.24em] uppercase text-purple-mid whitespace-nowrap">
          {meta.label}
        </span>
        <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-purple-mid/50" />
      </div>
      <div className="text-[0.68rem] sm:text-[0.7rem] text-text-muted tracking-wide">
        {meta.time}
      </div>
    </div>
  );
}

/* ── Agenda row — stacked layout, time above card ───────── */

function AgendaRow({ session }: { session: AgendaSession }) {
  const config = FORMAT_CONFIG[session.format];
  const Icon = config.icon;
  const c = ACCENT[config.accent];

  return (
    <li className="mb-4 sm:mb-5 last:mb-0 group">
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

export function AgendaModal({ onClose }: { onClose: () => void }) {
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

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

      {/* Modal shell — warm cream gradient background */}
      <div
        className={cn(
          "relative w-full max-w-[720px] max-h-[92vh] rounded-[22px] overflow-hidden transition-all duration-300",
          "bg-gradient-to-b from-[#fbfaf7] to-[#f6f2ea]",
          "shadow-[0_30px_90px_rgba(45,27,78,0.3),0_0_0_1px_rgba(45,27,78,0.06)]",
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/[0.04] flex items-center justify-center text-text-muted hover:text-text hover:bg-black/[0.08] transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-[18px] h-[18px] stroke-[1.5]" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[92vh] px-5 pt-10 pb-8 sm:px-10 sm:pt-12 sm:pb-10 md:px-14 md:pt-14 md:pb-12">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 max-w-[640px] mx-auto">
            {/* Draft notice — honest, editorial, warm */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full bg-[rgba(168,106,126,0.08)] ring-1 ring-[rgba(168,106,126,0.22)]">
              <span className="w-[5px] h-[5px] rounded-full bg-[#a86a7e] animate-pulse" />
              <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#9b5a70]">
                Draft Conference Agenda — Subject to Change
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.55rem,4.2vw,2.35rem)] font-semibold text-text leading-[1.08] tracking-[-0.015em] mb-5">
              A Day of{" "}
              <span className="text-purple">Longevity Leadership</span>
            </h2>
            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.82rem] text-text-secondary">
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
                <Calendar
                  className="w-[13px] h-[13px] text-purple-mid shrink-0"
                  strokeWidth={2}
                />
                <span>April 30, 2026</span>
              </span>
            </div>
          </div>

          {/* Decorative separator */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-purple-mid/30 to-transparent" />
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
                      <AgendaRow key={session.id} session={session} />
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>

          {/* Footer disclaimer */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-border-light/60 text-center">
            <p className="text-[0.72rem] text-text-muted italic">
              Agenda subject to refinement. Final program will be published
              closer to the event.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
