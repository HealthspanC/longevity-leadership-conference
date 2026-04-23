"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { ChevronRight, MapPin } from "lucide-react";
import { INVOLVE_CARDS, LINKS } from "@/lib/constants";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

const VENUE_IMAGES = [
  { src: "/venue/innovation-lab-exterior.jpg", alt: "Verizon Innovation Lab lobby", origin: "center", objectPos: "object-[20%_center]" },
  { src: "/venue/innovation-lab.jpg", alt: "Verizon Innovation Lab XR stage", origin: "center", objectPos: "object-center" },
  { src: "/venue/innovation-lab-3.jpg", alt: "Verizon Innovation Lab floor", origin: "left", objectPos: "object-[20%_center]" },
  { src: "/venue/innovation-lab-4.jpg", alt: "Verizon Innovation Lab corridor", origin: "right", objectPos: "object-[70%_center]" },
];

const CYCLE_DURATION = 6000;

/* ── Full-bleed venue segment with cycling background ── */
function VenueSegment() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const [zoomed, setZoomed] = useState<Record<number, boolean>>({ 0: false });

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setZoomed({ 0: true });
      });
    });

    const interval = setInterval(() => {
      setActive((cur) => {
        const next = (cur + 1) % VENUE_IMAGES.length;
        setPrev(cur); // keep outgoing image visible underneath
        setZoomed((z) => ({ ...z, [next]: false }));
        setTimeout(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setZoomed((z) => ({ ...z, [next]: true }));
            });
          });
        }, 100);
        return next;
      });
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] lg:h-[80vh] min-h-[520px] overflow-hidden">
      {/* Cycling background images — all behind overlays */}
      {VENUE_IMAGES.map((img, i) => {
        const isActive = i === active;
        const isPrev = i === prev;
        const isZoomed = zoomed[i] ?? false;
        // Active fades in on top (z-2), previous stays fully visible underneath (z-1)
        // All others hidden at z-0
        const layerZ = isActive ? 2 : isPrev ? 1 : 0;
        const layerOpacity = isActive || isPrev ? 1 : 0;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: layerOpacity,
              zIndex: layerZ,
              transition: isActive ? "opacity 1500ms ease-in-out" : "opacity 0ms",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className={`object-cover ${img.objectPos}`}
              sizes="100vw"
              priority={i === 0}
              style={{
                transformOrigin: img.origin,
                transform: isZoomed ? "scale(1.08)" : "scale(1)",
                transition: isZoomed
                  ? `transform ${CYCLE_DURATION}ms cubic-bezier(0.25, 0.1, 0.25, 1)`
                  : "transform 0ms",
              }}
            />
          </div>
        );
      })}

      {/* Dark overlays for readability — above images */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#0d0a14] via-[#0d0a14]/60 to-[#0d0a14]/40 pointer-events-none" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-[#0d0a14]/80 via-transparent to-transparent pointer-events-none" />

      {/* Content overlay — bottom-left aligned */}
      <div className="absolute inset-0 z-[4] flex items-end">
        <div className="max-w-[1140px] w-full mx-auto px-6 pb-16 lg:pb-20">
          <FadeIn>
            <div className="max-w-[560px]">
              <span className="inline-flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.25em] uppercase text-purple-light mb-4 before:content-[''] before:w-6 before:h-px before:bg-purple-light">
                The Venue
              </span>
              <h3
                className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-bold text-white leading-[1.1] mb-5"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
              >
                Verizon <span className="text-purple-light">Innovation</span> Lab
              </h3>
              <p
                className="text-[1.05rem] leading-[1.85] text-white/75 mb-6"
                style={{ textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}
              >
                The Longevity Leadership Conference takes place inside the
                Verizon Innovation Lab in Los Angeles&mdash;a private,
                cutting-edge environment where next-generation technologies are
                actively developed and brought to life.
              </p>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>13031 W Jefferson Blvd, Los Angeles, CA 90094</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Image indicator dots */}
      <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-[4] flex items-center gap-2">
        {VENUE_IMAGES.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-500"
            style={{
              backgroundColor: i === active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
              transform: i === active ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function EventDeck() {
  return (
    <>
      {/* ── Partner with Us — purple banner ── */}
      <section
        id="partner"
        // `scroll-mt-[120px]` is belt-and-braces redundancy alongside the
        // `html { scroll-padding-top: 120px }` rule in `app/globals.css`.
        // Keeping an explicit offset here makes the intent discoverable
        // when reading this component in isolation, and defends against
        // any future scope change on the global rule.
        className="relative z-[3] pt-16 lg:pt-20 pb-12 lg:pb-14 bg-purple-deep overflow-hidden scroll-mt-[120px]"
      >
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
              title="Partner with Us"
              accentWord="Us"
              subtitle="Explore partnership opportunities and learn more about the Longevity Leadership Conference."
              centered
              dark
            />
            <div className="flex flex-wrap items-center justify-center gap-3 -mt-6">
              <a
                href={INVOLVE_CARDS[1].href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('Partner Click', { location: 'partner-section' })}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white py-2.5 px-6 rounded-full font-semibold text-[0.85rem] transition-all hover:bg-white hover:text-purple-deep hover:-translate-y-0.5"
              >
                Become a Partner
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://forms.gle/iQPs2JuJ4dKEvwmg6"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('Investor Pass Click', { location: 'partner-section' })}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white py-2.5 px-6 rounded-full font-semibold text-[0.85rem] transition-all hover:bg-white hover:text-purple-deep hover:-translate-y-0.5"
              >
                Investor Pass
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://forms.gle/y9cediwgtzW649zC8"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('Media Pass Click', { location: 'partner-section' })}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white py-2.5 px-6 rounded-full font-semibold text-[0.85rem] transition-all hover:bg-white hover:text-purple-deep hover:-translate-y-0.5"
              >
                Media Pass
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 1: XR Stage — Cinematic Hero ── */}
      <section id="venue" className="relative z-[3] bg-[#0d0a14] overflow-hidden">
        {/* Image mosaic */}
        <div className="relative h-[60vh] lg:h-[75vh] min-h-[480px]">
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-[2px]">
            <div className="relative hidden md:block md:row-span-2">
              <Image
                src="/venue/xr-wide.jpg"
                alt="Panel discussion on XR stage"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
            <div className="relative col-span-2 md:col-span-1">
              <Image
                src="/venue/xr-speaker.jpg"
                alt="Speaker presenting on XR stage"
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative hidden md:block">
              <Image
                src="/venue/xr-environment.jpg"
                alt="XR stage environment with LED walls"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
            <div className="relative">
              <Image
                src="/venue/xr-immersion.jpg"
                alt="Audience watching XR stage presentation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="relative">
              <Image
                src="/venue/xr-audience.jpg"
                alt="Audience at the Longevity Leadership Conference"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a14] via-[#0d0a14]/40 to-transparent pointer-events-none" />

          {/* Headline overlay */}
          <div className="absolute bottom-0 left-0 right-0 pb-14 lg:pb-20" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
            <div className="max-w-[1140px] mx-auto px-6">
              <FadeIn>
                <span className="inline-flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.25em] uppercase text-purple-light mb-4 before:content-[''] before:w-6 before:h-px before:bg-purple-light">
                  XR Stage
                </span>
                <h3 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-white leading-[1.1]">
                  A Stage Built for the{" "}
                  <span className="text-purple-light">Future</span>
                </h3>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* XR Stage description — enhanced dark section */}
        <div className="relative py-20 lg:py-24 overflow-hidden">
          {/* Background image — heavily darkened and blurred */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/venue/innovation-lab.jpg"
              alt=""
              fill
              className="object-cover opacity-[0.35] blur-[1px]"
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[#0d0a14]/50" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0d0a14]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple/[0.06] blur-[150px]" />
          </div>

          <div className="relative z-10 max-w-[720px] mx-auto px-6">
            <FadeIn>
              {/* Frosted glass card */}
              <div className="relative rounded-[24px] overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/[0.06] shadow-[0_8px_60px_rgba(91,58,140,0.12),inset_0_1px_0_rgba(255,255,255,0.06)] p-10 md:p-14 text-center">
                {/* Inner glow accent — top edge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-purple-light/30 to-transparent" />

                <p className="text-[1.1rem] lg:text-[1.15rem] leading-[1.85] text-white/80 mb-6">
                  At the center of the experience is Verizon&rsquo;s XR Stage, an
                  advanced extended reality production environment built with
                  immersive LED walls and real-time rendering systems that blend
                  physical and digital worlds into a single, cinematic setting.
                </p>
                <p className="text-[1rem] leading-[1.85] text-white/55 mb-10">
                  Rather than a traditional stage, speakers are surrounded by
                  dynamic, high-resolution visuals that elevate every presentation
                  into a fully produced experience&mdash;placing the ideas, the
                  people, and the conversations shaping the future of healthspan
                  into a setting that reflects the level of innovation happening
                  in the room.
                </p>

                {/* Decorative divider */}
                <div className="inline-flex items-center gap-4 mb-10">
                  <div className="w-10 h-px bg-gradient-to-r from-transparent to-purple-light/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-light/40" />
                  <div className="w-10 h-px bg-gradient-to-l from-transparent to-purple-light/30" />
                </div>

                {/* CTA */}
                <div>
                  <Link
                    href={LINKS.tickets}
                    onClick={() => track('Ticket Click', { location: 'xr-stage' })}
                    className="group/btn relative inline-flex items-center gap-2.5 bg-white text-purple-deep py-4 px-9 rounded-full font-bold text-[0.95rem] transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(91,58,140,0.4)] hover:bg-gradient-to-r hover:from-white hover:to-purple-light/10"
                  >
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_100%,rgba(91,58,140,0.15),transparent_70%)]" />
                    <span className="relative">Secure Your Seat</span>
                    <ChevronRight className="relative w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ── Venue — full-bleed cinematic segment ── */}
        <VenueSegment />

        {/* ── Gradient blend into purple divider ── */}
        <div className="h-16 bg-gradient-to-b from-[#0d0a14] to-purple-deep" />
        <div className="dark-panel-texture bg-purple-deep h-3" />
      </section>
    </>
  );
}
