"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";
import { FadeIn } from "./fade-in";

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <div ref={ref} className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold text-white leading-none">
      {count}{started && count >= target ? suffix : ""}
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative z-10">
      <div className="dark-panel-texture bg-purple-deep relative overflow-hidden">
        {/* Top fade — blends with hero video overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[rgba(10,6,18,0.35)] to-transparent pointer-events-none" />
        {/* Bottom fade — blends into light page background */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-purple-deep/50" />

        <div className="max-w-[1140px] mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 py-14 relative">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="text-center relative z-10 py-4 md:py-0"
                >
                  {i < STATS.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-[15%] h-[70%] w-px bg-white/10" />
                  )}
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-white/50 font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
