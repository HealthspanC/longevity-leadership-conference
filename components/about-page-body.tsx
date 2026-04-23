"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hosts } from "@/components/hosts";
import { Experiences } from "@/components/experiences";
import { AboutAgendaCTA } from "@/components/about-agenda-cta";
import { SITE } from "@/lib/constants";
import { Calendar, Clock, MapPin } from "lucide-react";

/**
 * Shared about-page body.
 *
 * Rendered by:
 *   - `app/about/page.tsx` — landing `/about` (no init props)
 *   - `app/hosts/page.tsx` — list surface; `initialScrollTo="hosts"`
 *   - `app/hosts/[slug]/page.tsx` — per-host deep link; `initialHostSlug`
 *   - `app/experiences/page.tsx` — list surface; `initialScrollTo="experiences"`
 *   - `app/experiences/[slug]/page.tsx` — per-experience deep link; `initialExperienceSlug`
 *
 * The slug routes used to render a lean shell (`<Navbar /> + <OneSection /> + <Footer />`),
 * which felt like a stripped-down separate page. Shipping the full About body
 * everywhere keeps the experience coherent: a visitor arriving from a shared
 * link sees the About hero + hosts + experiences + agenda CTA, with the
 * specific section they came to see brought into view (and, where applicable,
 * the matching modal auto-opened).
 *
 * Init props are mutually exclusive:
 *   - `initialHostSlug` / `initialExperienceSlug` — scrolls + opens handled
 *     by the section components' own mount effects (single source of truth
 *     for the open-and-scroll logic).
 *   - `initialScrollTo` — list-page variant where no slug is specified;
 *     page-scroll only, no modal. Handled here because the section
 *     components only scroll when their `initialSlug` fires.
 *
 * DOM query over React ref: the section's `<section id="hosts">` /
 * `<div id="iwa">` element has a stable id that already exists as an
 * anchor-link contract (`/about#hosts`, `/about#iwa`). Reading it via
 * `document.getElementById` is lighter than threading a ref through the
 * tree for a one-shot scroll.
 *
 * Client component because of the mount effect; all child sections are
 * already `"use client"` so there's no RSC-composition cost.
 */

export function AboutPageBody({
  initialHostSlug,
  initialExperienceSlug,
  initialScrollTo,
}: {
  initialHostSlug?: string;
  initialExperienceSlug?: string;
  initialScrollTo?: "hosts" | "experiences";
} = {}) {
  // List-page scroll-to-section. Runs only when `initialScrollTo` is set
  // (the list routes /hosts and /experiences — no modal to open). The
  // per-slug routes rely on the section components' own `initialSlug`
  // effects for scroll, so this effect stays a no-op there.
  //
  // `behavior: "auto"` (instant): a smooth-scroll on mount reads as a
  // layout glitch to users arriving from a social share. The global
  // `scroll-padding-top: 120px` in app/globals.css handles the navbar
  // offset so the section header lands cleanly below the fixed navbar.
  useEffect(() => {
    if (!initialScrollTo) return;
    const id = initialScrollTo === "hosts" ? "hosts" : "iwa";
    document.getElementById(id)?.scrollIntoView({
      block: "start",
      behavior: "auto",
    });
  }, [initialScrollTo]);

  return (
    <>
      <Navbar variant="about" />
      <main className="min-h-screen">
        {/* Intro hero — cream editorial */}
        <section className="relative pt-40 pb-16 lg:pt-48 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#faf9f7] to-[#f4efe8]">
          {/* Subtle purple wash behind the title */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full bg-purple-pale/50 blur-[130px] pointer-events-none" />
          {/* Delicate diagonal texture, barely perceptible */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%235b3a8c' stroke-width='0.3' fill='none' opacity='0.5'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-[780px] mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2.5 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-purple-mid mb-4 before:content-[''] before:w-5 before:h-px before:bg-purple-mid/70">
              About the Conference
            </span>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.2rem)] font-bold text-text leading-[1.08] tracking-[-0.01em] mb-5">
              A Day With the{" "}
              <span className="text-purple">Longevity Leaders</span>
            </h1>
            <p className="text-[1rem] lg:text-[1.05rem] text-text-secondary leading-[1.7] max-w-[560px] mx-auto mb-8">
              Meet the hosts shaping the conversation, explore the on-site
              wellness activations, and preview the full-day program.
            </p>

            {/* Event detail pills */}
            <div className="flex flex-wrap justify-center gap-2.5">
              <div className="inline-flex items-center gap-2 bg-purple-deep rounded-full px-4 py-2 text-[0.8rem] text-white shadow-[0_2px_10px_rgba(45,27,78,0.18)]">
                <Calendar className="w-3.5 h-3.5 text-purple-light" />
                {SITE.date}
              </div>
              <div className="inline-flex items-center gap-2 bg-purple-deep rounded-full px-4 py-2 text-[0.8rem] text-white shadow-[0_2px_10px_rgba(45,27,78,0.18)]">
                <Clock className="w-3.5 h-3.5 text-purple-light" />
                {SITE.time}
              </div>
              <div className="inline-flex items-center gap-2 bg-purple-deep rounded-full px-4 py-2 text-[0.8rem] text-white shadow-[0_2px_10px_rgba(45,27,78,0.18)]">
                <MapPin className="w-3.5 h-3.5 text-purple-light" />
                {SITE.venue}
              </div>
            </div>
          </div>
        </section>

        <Hosts initialSlug={initialHostSlug} />
        {/* `#iwa` (Immersive Wellness Activations) is the user-facing anchor
            name for the Experiences section — added as a wrapper id alongside
            the component's internal `id="experiences"` so deep links to
            `/about#iwa` work without renaming the internal section. */}
        <div id="iwa">
          <Experiences initialSlug={initialExperienceSlug} />
        </div>
        <AboutAgendaCTA />
      </main>
      <Footer />
    </>
  );
}
