"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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

function VenueImageCycler() {
  const [active, setActive] = useState(0);
  // Track zoom state per image independently so outgoing image stays zoomed
  const [zoomed, setZoomed] = useState<Record<number, boolean>>({ 0: false });

  useEffect(() => {
    // Kick off first zoom
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setZoomed({ 0: true });
      });
    });

    const interval = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % VENUE_IMAGES.length;
        // Start next image at scale(1), outgoing stays zoomed in
        setZoomed((z) => ({ ...z, [next]: false }));
        // Start zoom on new image after it fades in
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
    <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(91,58,140,0.08)] ring-1 ring-border-light">
      {VENUE_IMAGES.map((img, i) => {
        const isActive = i === active;
        const isZoomed = zoomed[i] ?? false;
        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className={`object-cover ${img.objectPos}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
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
    </div>
  );
}

/* ── Placeholder for venue images until real photos are added ── */
function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#1a1028] flex items-center justify-center ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(91,58,140,0.15),transparent_70%)]" />
      <span className="text-white/20 text-sm font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
}

export function EventDeck() {
  return (
    <>
      {/* ── Purple banner header ── */}
      <section
        className="relative z-[3] pt-16 lg:pt-20 pb-12 lg:pb-14 bg-purple-deep overflow-hidden"
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
            <div className="flex items-center justify-center -mt-6">
              <a
                href={INVOLVE_CARDS[1].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white py-2.5 px-6 rounded-full font-semibold text-[0.85rem] transition-all hover:bg-white hover:text-purple-deep hover:-translate-y-0.5"
              >
                Become a Partner
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 1: The Venue — Split Layout ── */}
      <section id="venue" className="relative z-[3] py-24 lg:py-32 bg-bg overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <FadeIn>
              <div>
                <SectionHeader
                  label="The Venue"
                  title="Verizon Innovation Lab"
                  accentWord="Innovation"
                />
                <p className="text-[1.05rem] leading-[1.85] text-text-secondary -mt-6">
                  The Longevity Leadership Conference takes place inside the
                  Verizon Innovation Lab in Los Angeles&mdash;a private,
                  cutting-edge environment where next-generation technologies are
                  actively developed and brought to life.
                </p>
              </div>
            </FadeIn>

            {/* Right — Venue Image (auto-cycling) */}
            <FadeIn delay={200} direction="right">
              <VenueImageCycler />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Section 2: XR Stage — Cinematic Hero ── */}
      <section className="relative z-[3] bg-[#0d0a14] overflow-hidden">
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
                    className="inline-flex items-center gap-2.5 bg-white text-purple-deep py-4 px-9 rounded-full font-bold text-[0.95rem] transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                  >
                    Secure Your Seat
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
