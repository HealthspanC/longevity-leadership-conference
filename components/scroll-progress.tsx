"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[10000] pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-purple-deep via-purple-mid to-purple-light transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
      {/* Glow tip */}
      {progress > 0 && (
        <div
          className="absolute top-0 h-[2px] w-[60px] bg-gradient-to-r from-transparent to-purple-light/80 blur-[3px] transition-[left] duration-150 ease-out"
          style={{ left: `calc(${progress}% - 60px)` }}
        />
      )}
    </div>
  );
}
