"use client";

import Image from "next/image";
import { SITE } from "@/lib/constants";
import { FadeIn } from "./fade-in";
import { HeroVideo } from "./hero-video";
import { ThankYouCTA } from "./thank-you-cta";

export function Hero() {
  return (
    <section
      className="relative z-2 min-h-screen flex items-center pt-60 md:pt-56 lg:pt-52 pb-10 md:pb-24 overflow-hidden"
    >
      {/* Video background */}
      <HeroVideo />

      <div className="relative z-10 max-w-[1140px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h1 className="font-['Grift'] text-[clamp(2.6rem,5.5vw,4.2rem)] leading-[0.9] mb-6 tracking-[0.04em] uppercase overflow-visible pb-1 text-white">
              <span className="inline-block relative">
                <Image
                  src="/brand/llc-icon-color.png"
                  alt="Longevity Leadership Conference"
                  width={160}
                  height={160}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full -mb-6 opacity-90"
                />
                <span className="font-bold">Longevity</span>
              </span>
              <br />
              <span className="font-normal text-[0.72em] tracking-[0.18em]">Leadership</span>
              <br />
              <span className="font-normal text-[0.72em] tracking-[0.2em]">Conference</span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed max-w-[520px]">
              {SITE.description}
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <ThankYouCTA />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
