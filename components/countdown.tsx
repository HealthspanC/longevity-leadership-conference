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
    <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-[28px] p-12 px-10 shadow-[0_8px_40px_rgba(0,0,0,0.3)] text-center relative z-2 flex flex-col items-center justify-center">
      <div className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-white/50 mb-6">
        The Future of Health Begins In
      </div>
      <div className="flex gap-3 justify-center" role="timer" aria-label="Countdown to conference">
        {items.map((item, i) => (
          <div key={i} className="text-center">
            <div className="flex items-center justify-center w-[72px] h-[72px] bg-white/[0.1] border border-white/[0.15] rounded-[12px] text-[1.8rem] font-extrabold text-white">
              {typeof item.value === "number"
                ? String(item.value).padStart(2, "0")
                : item.value}
            </div>
            <div className="text-[0.6rem] uppercase tracking-[0.15em] text-white/45 mt-1.5 font-bold">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
