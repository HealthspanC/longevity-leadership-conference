"use client";

import { INVOLVE_CARDS } from "@/lib/constants";
import { Mic, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

const iconMap: Record<string, React.ElementType> = {
  Mic,
  FileText,
};

const cardThemes = {
  purple: {
    glow: "rgba(168,124,224,0.35)",
    border: "#a87ce0",
    iconColor: "text-purple-light",
    linkColor: "text-purple-light",
    scanLine: "rgba(168,124,224,0.03)",
    orbitalColor: "rgba(168,124,224,0.4)",
  },
  rose: {
    glow: "rgba(192,96,128,0.3)",
    border: "#c06080",
    iconColor: "text-rose-pale",
    linkColor: "text-rose-pale",
    scanLine: "rgba(192,96,128,0.03)",
    orbitalColor: "rgba(192,96,128,0.4)",
  },
  teal: {
    glow: "rgba(42,122,110,0.3)",
    border: "#2a7a6e",
    iconColor: "text-teal",
    linkColor: "text-teal",
    scanLine: "rgba(42,122,110,0.03)",
    orbitalColor: "rgba(42,122,110,0.4)",
  },
} as const;

function InvolveCard({
  card,
}: {
  card: (typeof INVOLVE_CARDS)[number];
}) {
  const Icon = iconMap[card.icon];
  const theme = cardThemes[card.color];

  return (
    <div className="relative group">
      {/* Ambient underglow */}
      <div
        className="absolute -inset-3 rounded-2xl blur-xl transition-all duration-1000 opacity-0 group-hover:opacity-60"
        style={{ background: theme.glow }}
      />

      {/* Card container with animated border */}
      <div className="relative rounded-[12px] transition-all duration-500 group-hover:-translate-y-1">
        {/* Spinning gradient border */}
        <div className="absolute -inset-px rounded-[12px] overflow-hidden">
          <div className="absolute inset-0 rounded-[12px] border border-white/[0.12] group-hover:opacity-0 transition-opacity duration-500 z-[1]" />
          <div
            className="absolute inset-[-50%] opacity-30 group-hover:opacity-80 transition-opacity duration-700"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${theme.border}, transparent, ${theme.border}, transparent)`,
              animation: "involve-border-spin 8s linear infinite",
            }}
          />
        </div>

        {/* Inner card surface */}
        <div
          className="relative m-px rounded-[11px] px-5 py-5 md:px-6 overflow-hidden flex items-center gap-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(45,27,78,0.97) 0%, rgba(45,27,78,0.92) 100%)",
          }}
        >
          {/* Scan lines overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${theme.scanLine} 3px, ${theme.scanLine} 4px)`,
            }}
          />

          {/* Subtle shimmer sweep on hover */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 47%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 53%, transparent 60%)",
                animation: "involve-shimmer 5s ease-in-out infinite",
              }}
            />
          </div>

          {/* HUD corner brackets */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/10 group-hover:border-white/30 rounded-tl-sm transition-all duration-700 group-hover:w-3.5 group-hover:h-3.5" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/10 group-hover:border-white/30 rounded-tr-sm transition-all duration-700 group-hover:w-3.5 group-hover:h-3.5" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/10 group-hover:border-white/30 rounded-bl-sm transition-all duration-700 group-hover:w-3.5 group-hover:h-3.5" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/10 group-hover:border-white/30 rounded-br-sm transition-all duration-700 group-hover:w-3.5 group-hover:h-3.5" />

          {/* Icon with orbital ring */}
          <div className="relative w-11 h-11 shrink-0">
            <div
              className="absolute inset-0 rounded-full border border-dashed group-hover:scale-105 transition-transform duration-1000"
              style={{
                borderColor: theme.orbitalColor,
                animation: "involve-orbital 20s linear infinite",
              }}
            />
            <div
              className={cn(
                "absolute inset-0.5 rounded-full flex items-center justify-center bg-white/[0.08] group-hover:bg-white/[0.14] transition-all duration-500",
                theme.iconColor
              )}
            >
              {Icon && <Icon className="w-4.5 h-4.5" />}
            </div>
          </div>

          {/* Text + CTA */}
          <div className="relative flex-1 min-w-0">
            <h3 className="font-bold text-[0.95rem] text-white leading-tight">
              {card.title}
            </h3>
            <p className="text-[0.8rem] text-white/50 leading-relaxed mt-1 line-clamp-2">
              {card.description}
            </p>
          </div>

          {/* CTA arrow */}
          <a
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "relative shrink-0 inline-flex items-center gap-1 font-semibold text-[0.8rem] transition-all duration-300 group-hover:gap-1.5",
              theme.linkColor
            )}
          >
            <span className="hidden sm:inline">Apply</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function GetInvolved() {
  return (
    <section
      id="involve"
      className="relative z-[3] py-16 lg:py-20 bg-purple-deep overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(192,96,128,0.15),transparent_50%),radial-gradient(circle_at_90%_60%,rgba(42,122,110,0.1),transparent_40%),radial-gradient(circle_at_50%_20%,rgba(91,58,140,0.2),transparent_50%)] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.05'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Get Involved"
            title="Join the Movement"
            accentWord="Movement"
            subtitle="Multiple pathways to engage with the longevity leadership community."
            centered
            dark
          />
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[720px] mx-auto">
            {INVOLVE_CARDS.map((card) => (
              <InvolveCard key={card.title} card={card} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
