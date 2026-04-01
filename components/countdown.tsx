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
    <div className="bg-bg-card border border-border rounded-[28px] p-12 px-10 shadow-lg text-center relative z-2">
      <div className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-text-muted mb-6">
        The Future of Health Begins In
      </div>
      <div className="flex gap-3 justify-center mb-7" role="timer" aria-label="Countdown to conference">
        {items.map((item, i) => (
          <div key={i} className="text-center">
            <div className="flex items-center justify-center w-[72px] h-[72px] bg-purple-wash border border-purple-pale rounded-[12px] text-[1.8rem] font-extrabold text-purple-deep">
              {typeof item.value === "number"
                ? String(item.value).padStart(2, "0")
                : item.value}
            </div>
            <div className="text-[0.6rem] uppercase tracking-[0.15em] text-text-muted mt-1.5 font-bold">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <p className="font-serif italic text-base text-text-secondary">
        &ldquo;Where every generation benefits from the science of longevity.&rdquo;
      </p>
    </div>
  );
}
