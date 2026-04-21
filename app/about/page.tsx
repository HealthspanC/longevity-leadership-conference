import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hosts } from "@/components/hosts";
import { Experiences } from "@/components/experiences";
import { AboutAgendaCTA } from "@/components/about-agenda-cta";
import { SITE } from "@/lib/constants";
import { Calendar, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Longevity Leadership Conference 2026 | April 30, LA",
  description:
    "Meet the hosts, explore on-site wellness activations, and view the full-day agenda for the Longevity Leadership Conference 2026 — April 30, 2026 at the Verizon Innovation Lab, Playa Vista.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Longevity Leadership Conference 2026",
    description:
      "Hosts, on-site wellness experiences, and the full-day agenda for April 30, 2026 in Los Angeles.",
    url: "https://longevityleadershipconference.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Longevity Leadership Conference 2026",
    description:
      "Hosts, on-site wellness experiences, and the full-day agenda — April 30, 2026 in Los Angeles.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
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

        <Hosts />
        <Experiences />
        <AboutAgendaCTA />
      </main>
      <Footer />
    </>
  );
}
