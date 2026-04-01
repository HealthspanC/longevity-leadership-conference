"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, new Date(SITE.targetDate).getTime() - Date.now());
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5) / 6e4),
    seconds: Math.floor((diff % 6e4) / 1e3),
  };
}

export function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const items = time
    ? [
        { value: time.days, label: "Days" },
        { value: time.hours, label: "Hours" },
        { value: time.minutes, label: "Min" },
        { value: time.seconds, label: "Sec" },
      ]
    : [
        { value: "--", label: "Days" },
        { value: "--", label: "Hours" },
        { value: "--", label: "Min" },
        { value: "--", label: "Sec" },
      ];

  return (
    <div className="text-center relative z-2 flex flex-col items-center justify-center">
      <div className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] md:tracking-[0.25em] uppercase text-white/40 mb-4 md:mb-5 whitespace-nowrap">
        The Future of Health Begins In
      </div>
      <div className="flex gap-3 md:gap-5 justify-center" role="timer" aria-label="Countdown to conference">
        {items.map((item, i) => (
          <div key={i} className="text-center">
            <div className="text-[2rem] md:text-[2.8rem] font-extrabold text-white leading-none tabular-nums drop-shadow-[0_0_12px_rgba(139,92,246,0.3)]">
              {typeof item.value === "number"
                ? String(item.value).padStart(2, "0")
                : item.value}
            </div>
            <div className="text-[0.55rem] uppercase tracking-[0.2em] text-purple-light/60 mt-2 font-bold">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
