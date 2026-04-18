import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TicketEmbed } from "@/components/ticket-embed";
import { SITE } from "@/lib/constants";
import { MapPin, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Tickets | Longevity Leadership Conference 2026 | April 30, LA",
  description:
    "Reserve your seat at the Longevity Leadership Conference 2026, hosted by Healthspan Collective and Mission Matters Media. April 30, 2026 at the Verizon Innovation Lab, Playa Vista, Los Angeles.",
  alternates: { canonical: "/tickets" },
  openGraph: {
    title: "Tickets | Longevity Leadership Conference 2026",
    description:
      "Reserve your seat for the Longevity Leadership Conference, April 30, 2026 in Los Angeles.",
    url: "https://longevityleadershipconference.com/tickets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tickets | Longevity Leadership Conference 2026",
    description: "Reserve your seat — April 30, 2026 in Los Angeles.",
  },
};

export default function TicketsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero banner — dark purple */}
        <section className="relative bg-purple-deep overflow-hidden pt-36 pb-20 lg:pt-40 lg:pb-24">
          {/* Ambient glows */}
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
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.1] mb-5 text-white">
              Reserve Your <span className="text-purple-light">Seat</span>
            </h1>
            <p className="text-[1.05rem] leading-[1.75] max-w-[520px] mx-auto text-white/55 mb-8">
              Secure your place among the most influential minds shaping the
              future of longevity and healthspan science.
            </p>

            {/* Event details pills */}
            <div className="flex flex-wrap justify-center gap-3">
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
                {SITE.venue}
              </div>
            </div>
          </div>
        </section>

        {/* Ticket embed section — light background */}
        <section className="relative bg-bg py-16 lg:py-20">
          {/* Top shadow for depth */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/[0.03] to-transparent pointer-events-none" />

          <div className="relative max-w-[800px] mx-auto px-6">
            <TicketEmbed />

            {/* Trust signals */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center">
              <div>
                <p className="text-[1.8rem] font-serif font-bold text-text">3</p>
                <p className="text-[0.75rem] text-text-secondary uppercase tracking-[0.1em]">Years Running</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-light" />
              <div>
                <p className="text-[1.8rem] font-serif font-bold text-text">300+</p>
                <p className="text-[0.75rem] text-text-secondary uppercase tracking-[0.1em]">Expected Attendees</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-light" />
              <div>
                <p className="text-[1.8rem] font-serif font-bold text-text">20+</p>
                <p className="text-[0.75rem] text-text-secondary uppercase tracking-[0.1em]">Expert Speakers</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-light" />
              <div>
                <p className="text-[1.8rem] font-serif font-bold text-text">1</p>
                <p className="text-[0.75rem] text-text-secondary uppercase tracking-[0.1em]">Exclusive Day</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
