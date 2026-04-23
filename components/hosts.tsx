"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LINKS, HOSTS, type Host } from "@/lib/constants";
import { Instagram, Linkedin, Youtube, X } from "lucide-react";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
} as const;

/* ── Host Modal (tablet only, portaled to body) ── */
function HostModal({
  host,
  onClose,
}: {
  host: Host;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on next frame
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
      <div className="absolute inset-0 bg-black/70" />

      <div
        className={cn(
          "relative bg-purple-deep rounded-[20px] overflow-hidden max-w-[720px] w-full max-h-[85vh] shadow-[0_25px_80px_rgba(0,0,0,0.3)] flex flex-row transition-all duration-300",
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/8 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-[18px] h-[18px] stroke-[1.5]" />
        </button>

        {/* Photo side */}
        <div className="relative w-[42%] shrink-0 min-h-[400px]">
          <Image
            src={host.image}
            alt={host.name}
            fill
            className="object-cover"
            style={{
              objectPosition:
                "imagePosition" in host ? host.imagePosition : "center 20%",
            }}
            sizes="320px"
          />
          <div className="absolute inset-0 bg-purple-deep/10 mix-blend-multiply" />
        </div>

        {/* Content side */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col justify-center bg-gradient-to-br from-purple-deep via-[#3c2066] to-[#2d1b4e]">
          <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-purple-light mb-2.5 block">
            {host.title}
          </span>
          <h3 className="font-serif text-[1.8rem] font-bold text-white leading-tight mb-4">
            {host.name}
          </h3>
          <p className="text-[0.88rem] text-white/65 leading-[1.75] mb-6">
            {host.bio}
          </p>

          {/* Social links */}
          <div className="flex gap-3">
            {(
              Object.entries(host.social) as [
                keyof typeof socialIcons,
                string,
              ][]
            ).map(([platform, url]) => {
              const Icon = socialIcons[platform];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 transition-all hover:bg-white hover:text-purple-deep hover:border-white hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function HostCards({ initialSlug }: { initialSlug?: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [modalHost, setModalHost] = useState<Host | null>(null);

  /* ── Open/close helpers ──────────────────────────────────────────
     Two open paths by viewport: ≥640px uses the portaled modal,
     <640px uses in-place expansion of the card. URL-syncing (below)
     needs a single entry point that applies to both paths so a
     `/hosts/<slug>` URL produces the right UI at any width. */
  const openHost = useCallback((host: Host) => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setModalHost(null);
      setExpanded(host.name);
    } else {
      setExpanded(null);
      setModalHost(host);
    }
  }, []);

  /* Same as `openHost` but also pushes `/hosts/<slug>` onto history
     so clicks on a card produce a shareable URL. Separates the
     user-initiated flow (wants URL change) from the mount/popstate
     flow (already at correct URL — just mirrors state). */
  const openHostWithUrl = useCallback(
    (host: Host) => {
      openHost(host);
      if (typeof window !== "undefined") {
        window.history.pushState(
          { hostSlug: host.slug },
          "",
          `/hosts/${host.slug}`,
        );
      }
    },
    [openHost],
  );

  const closeHost = useCallback(() => {
    setModalHost(null);
    setExpanded(null);
    if (typeof window !== "undefined") {
      const state = window.history.state as { hostSlug?: string } | null;
      if (state?.hostSlug) {
        window.history.back();
      } else {
        // Cold entry at /hosts/<slug>: route back to the hosts section of
        // the About page so the user lands somewhere useful rather than
        // bouncing out of the site.
        window.history.replaceState(null, "", "/about#hosts");
      }
    }
  }, []);

  const handleCardClick = useCallback(
    (host: Host) => {
      // Mobile tap-to-toggle: tapping the already-expanded card closes it.
      if (
        typeof window !== "undefined" &&
        window.innerWidth < 640 &&
        expanded === host.name
      ) {
        closeHost();
        return;
      }
      openHostWithUrl(host);
    },
    [expanded, openHostWithUrl, closeHost],
  );

  // Auto-open on mount when the server-rendered page passed a slug
  // (e.g. user landed directly at `/hosts/adam`). Also scrolls the Hosts
  // section into view so closing the modal (or the mobile inline
  // expansion) lands the user at the section rather than at the top of
  // the About page.
  //
  // DOM query (`getElementById`) rather than a React ref: `<section
  // id="hosts">` is rendered by this component's parent (`Hosts`) — its
  // id is already the stable anchor contract for `/about#hosts` URL
  // navigation, so reusing it for programmatic scroll avoids threading a
  // ref through the tree. `behavior: "auto"` because a smooth-scroll on
  // mount reads as a layout glitch when arriving from a social share.
  // Runs *before* `openHost` so the underlying page is already positioned
  // when the modal/expansion paints.
  useEffect(() => {
    if (!initialSlug) return;
    const host = HOSTS.find((h) => h.slug === initialSlug);
    if (!host) return;
    document
      .getElementById("hosts")
      ?.scrollIntoView({ block: "start", behavior: "auto" });
    openHost(host);
  }, [initialSlug, openHost]);

  // Browser back/forward ↔ modal state sync.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handlePopState = () => {
      const match = window.location.pathname.match(/^\/hosts\/([^/]+)$/);
      if (match) {
        const next = HOSTS.find((h) => h.slug === match[1]);
        if (next) {
          openHost(next);
          return;
        }
      }
      setModalHost(null);
      setExpanded(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [openHost]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 md:gap-5 mb-16">
        {HOSTS.map((host, i) => {
          const isOpen = expanded === host.name;
          return (
            <FadeIn key={host.name} delay={i * 120}>
              <div
                className={cn(
                  "group relative rounded-[16px] overflow-hidden cursor-pointer transition-shadow duration-500",
                  "hover:shadow-[0_0_30px_rgba(168,124,224,0.2)]",
                  isOpen && "max-md:!shadow-[0_0_30px_rgba(168,124,224,0.2)]"
                )}
                onClick={() => handleCardClick(host)}
              >
                <div className="relative w-full aspect-[3/4] lg:aspect-[9/14] bg-bg">
                  <Image
                    src={host.image}
                    alt={host.name}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out",
                      "group-hover:scale-[1.05]",
                      isOpen && "max-md:!scale-[1.05]"
                    )}
                    style={{
                      objectPosition:
                        "imagePosition" in host
                          ? host.imagePosition
                          : "center 20%",
                    }}
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />

                  {/* Subtle purple tint overlay */}
                  <div className="absolute inset-0 bg-purple-deep/15 mix-blend-multiply" />

                  {/* Bottom gradient — default */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
                    "lg:group-hover:opacity-0",
                    isOpen && "max-md:!opacity-0"
                  )} />
                  {/* Bottom gradient — expanded (taller, denser) */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 via-60% to-transparent transition-opacity duration-500",
                    "opacity-0 lg:group-hover:opacity-100",
                    isOpen && "max-md:!opacity-100"
                  )} />

                  {/* Name + Title + Bio */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7 z-[2]">
                    {/* Host title pill.
                       Parent is a plain block (`mb-2`) rather than the earlier
                       `inline-flex` wrapper so the pill's `max-w-full` actually
                       clamps against the card's content area. At `sm:` the grid
                       flips to 3-up which drops each card's content area to
                       ~138px at a 640px viewport — the original sizing
                       (`text-[0.65rem]` + uppercase + `tracking-[0.15em]` +
                       `px-3.5`) needed ~250–300px for titles like "Founder/CEO
                       — Healthspan Collective" and overflowed. Progressive
                       scaling here keeps the editorial character at `lg:+`
                       (where there's ~360px of card room) and tightens it at
                       each smaller tier. `leading-[1.4]` + `text-center` turn a
                       wrapped 2-line pill into a readable stadium shape rather
                       than a lopsided blob. */}
                    <div className="mb-2">
                      <span className="inline-block max-w-full text-[0.54rem] sm:text-[0.56rem] md:text-[0.6rem] lg:text-[0.65rem] font-semibold tracking-[0.08em] md:tracking-[0.12em] lg:tracking-[0.15em] uppercase text-purple-light bg-white/[0.08] backdrop-blur-md border border-white/[0.1] rounded-full px-2.5 md:px-3 lg:px-3.5 py-0.5 lg:py-1 leading-[1.4] text-center">
                        {host.title}
                      </span>
                    </div>
                    <h3 className={cn(
                      "font-serif text-2xl md:text-[1.7rem] font-bold text-white leading-tight mb-0 transition-all duration-500",
                      "lg:group-hover:mb-3",
                      isOpen && "max-md:!mb-3"
                    )}>
                      {host.name}
                    </h3>

                    {/* Bio — tap on mobile only, hover on lg+ desktop */}
                    <div className={cn(
                      "max-h-0 opacity-0 transition-all duration-500 ease-out overflow-hidden",
                      "lg:group-hover:max-h-[300px] lg:group-hover:opacity-100",
                      isOpen && "max-md:!max-h-[300px] max-md:!opacity-100"
                    )}>
                      <p className="text-[0.8rem] text-white/70 leading-relaxed md:mt-0">
                        {host.bio}
                      </p>

                      {/* Social */}
                      <div className="flex gap-2.5 mt-3 mb-1">
                        {(
                          Object.entries(host.social) as [
                            keyof typeof socialIcons,
                            string,
                          ][]
                        ).map(([platform, url]) => {
                          const Icon = socialIcons[platform];
                          return (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={platform}
                              onClick={(e) => e.stopPropagation()}
                              className="w-8 h-8 rounded-full bg-white/[0.15] border border-white/[0.2] flex items-center justify-center text-white/80 transition-all hover:bg-white hover:text-purple-deep hover:border-white hover:-translate-y-0.5"
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {modalHost && <HostModal host={modalHost} onClose={closeHost} />}
    </>
  );
}

export function Hosts({ initialSlug }: { initialSlug?: string } = {}) {
  return (
    <section
      id="hosts"
      className="relative z-[3] pt-36 pb-24 lg:pt-40 lg:pb-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #2d1b4e 0%, #3c2066 55%, #4a2d6e 100%)",
      }}
    >
      {/* Ambient glows */}
      <div className="absolute top-[12%] left-[5%] w-[500px] h-[500px] rounded-full bg-purple-mid/12 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[8%] right-[10%] w-[420px] h-[420px] rounded-full bg-rose/5 blur-[130px] pointer-events-none" />

      {/* Subtle diagonal pattern — matches the rest of the dark-panel language */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.5'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Your Hosts"
            title="Presented by the Healthspan Collective in Partnership with Mission Matters"
            accentWord={["Healthspan Collective", "Mission Matters"]}
            subtitle="Dedicated to accelerating the science of longevity and building a global community of healthspan leaders."
            centered
            dark
          />
        </FadeIn>

        {/* Editorial Host Profiles */}
        <HostCards initialSlug={initialSlug} />

        {/* Colophon strip — dual logos centered in divider */}
        <FadeIn delay={200}>
          <div className="relative">
            {/* Full-width flat line with ECG between logos */}
            <div className="absolute top-[44px] md:top-[48px] left-0 right-0 h-px bg-white/[0.12]" />

            {/* Partner logos — side by side */}
            <div className="flex items-center justify-center mb-8 relative z-[1]">
              {/* Healthspan Collective icon */}
              <div className="relative w-[88px] h-[88px] md:w-[96px] md:h-[96px] rounded-full bg-white border border-white/20 overflow-hidden shadow-lg shadow-black/10">
                <Image
                  src="/brand/icon.png"
                  alt="Healthspan Collective"
                  fill
                  className="object-contain p-[3px] -translate-y-[1px]"
                />
              </div>

              {/* ECG heartbeat connector */}
              <svg
                viewBox="0 0 100 32"
                className="w-[56px] md:w-[72px] h-[32px] shrink-0 -mx-2 md:-mx-3"
                aria-hidden="true"
              >
                <path
                  d="M0,16 L15,16 L22,9 L30,23 L38,4 L46,28 L54,9 L62,20 L70,16 L100,16"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Mission Matters logo */}
              <div className="h-[88px] md:h-[96px] px-5 rounded-2xl bg-white border border-white/20 flex items-center justify-center shadow-lg shadow-black/10">
                <Image
                  src="/brand/mission-matters.png"
                  alt="Mission Matters"
                  width={600}
                  height={200}
                  className="h-[50px] md:h-[56px] w-auto object-contain"
                />
              </div>
            </div>

            {/* Description text — centered, minimal */}
            <p className="text-sm text-white/50 leading-relaxed text-center max-w-[600px] mx-auto mb-6">
              The core objective of the Longevity Leadership Conference is to
              Accelerate Growth, Investment and Knowledge About The Longevity
              Industry. Through curated events, strategic partnerships, and
              thought leadership, the Healthspan Collective is building the
              definitive community for the longevity ecosystem.
            </p>

            {/* Social links — minimal, centered */}
            <div className="flex gap-4 justify-center">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-white/40 transition-all hover:text-white"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
              <span className="text-white/15">|</span>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-white/40 transition-all hover:text-white"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
