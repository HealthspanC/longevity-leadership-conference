import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThankYouCTA } from "@/components/thank-you-cta";
import { SITE } from "@/lib/constants";
import { MapPin, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "2026 Recap | Longevity Leadership Conference",
  description:
    "Thank you to everyone who made the 3rd Annual Longevity Leadership Conference an extraordinary day on April 30, 2026 at the Verizon Innovation Lab, Playa Vista. We'll be back in 2027.",
  alternates: { canonical: "/tickets" },
  openGraph: {
    title: "2026 Recap | Longevity Leadership Conference",
    description:
      "Thank you to everyone who joined the 3rd Annual Longevity Leadership Conference on April 30, 2026 in Los Angeles. We'll be back in 2027.",
    url: "https://www.longevityleadershipconference.com/tickets",
    type: "website",
    // Explicit image — matches the home page / about page OG card so social
    // shares of /tickets render the same conference branding. See notes in
    // app/about/page.tsx on why sub-field inheritance isn't reliable once a
    // page redefines `openGraph`.
    images: [
      {
        url: "https://www.longevityleadershipconference.com/og-image2.jpg",
        width: 1000,
        height: 1000,
        alt: "3rd Annual Longevity Leadership Conference — April 30, 2026 (Concluded)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 Recap | Longevity Leadership Conference",
    description: "Thanks for an extraordinary day. We'll be back in 2027.",
    images: ["https://www.longevityleadershipconference.com/og-image2.jpg"],
  },
};

export default function TicketsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero banner — dark purple with event-photo backdrop */}
        <section className="relative bg-purple-deep overflow-hidden pt-36 pb-20 lg:pt-40 lg:pb-24">
          {/* Backdrop image: keynote photo with layered overlays so the
              photo whispers atmosphere without competing with text/form.
              Layers (back-to-front):
                1. Image (next/image, full-bleed)
                2. Vertical gradient — heavy darken top + bottom, breathes mid
                3. Flat darken — keeps overall contrast predictable
                4. Radial vignette — corners sink into brand purple */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/recap/2026-keynote.png"
              alt="3rd Annual Longevity Leadership Conference keynote — Verizon Innovation Lab, April 30 2026"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-deep/90 via-purple-deep/55 to-purple-deep/95" />
            <div className="absolute inset-0 bg-purple-deep/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(45,27,78,0.35)_60%,rgba(45,27,78,0.75)_100%)]" />
          </div>

          {/* Ambient glows — atmospheric pops over the photo */}
          <div className="absolute top-[20%] left-[5%] w-[500px] h-[500px] rounded-full bg-purple-mid/10 blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-rose/5 blur-[120px] pointer-events-none" />

          {/* Subtle pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.5'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.1] mb-8 text-white">
              Thanks for an Unforgettable <span className="text-purple-light">Day</span>
            </h1>

            {/* Event details pills — held on these dates */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] rounded-full px-4 py-2 text-[0.8rem] text-white/70">
                <Calendar className="w-3.5 h-3.5 text-purple-light" />
                {SITE.date}
              </div>
              <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] rounded-full px-4 py-2 text-[0.8rem] text-white/70">
                <Clock className="w-3.5 h-3.5 text-purple-light" />
                {SITE.time}
              </div>
              <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] rounded-full px-4 py-2 text-[0.8rem] text-white/70">
                <MapPin className="w-3.5 h-3.5 text-purple-light" />
                Verizon Innovation Lab · 13031 W Jefferson Blvd, Los Angeles, CA 90094
              </div>
            </div>

            {/* 2027 subscribe CTA — same component used in the home hero for
                consistency. Sits inside the dark hero so its glassmorphic
                styling reads correctly. */}
            <ThankYouCTA />
          </div>
        </section>

        {/* Recap stats — light background */}
        <section className="relative bg-bg py-12 lg:py-14">
          {/* Top shadow for depth */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/[0.03] to-transparent pointer-events-none" />

          <div className="relative max-w-[800px] mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center">
              <div>
                <p className="text-[1.8rem] font-serif font-bold text-text">3</p>
                <p className="text-[0.75rem] text-text-secondary uppercase tracking-[0.1em]">Years Running</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-light" />
              <div>
                <p className="text-[1.8rem] font-serif font-bold text-text">200</p>
                <p className="text-[0.75rem] text-text-secondary uppercase tracking-[0.1em]">Attendees</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-light" />
              <div>
                <p className="text-[1.8rem] font-serif font-bold text-text">20+</p>
                <p className="text-[0.75rem] text-text-secondary uppercase tracking-[0.1em]">Expert Speakers</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-light" />
              <div>
                <p className="text-[1.8rem] font-serif font-bold text-text">1</p>
                <p className="text-[0.75rem] text-text-secondary uppercase tracking-[0.1em]">Unforgettable Day</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
