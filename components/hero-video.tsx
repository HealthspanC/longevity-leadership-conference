"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const show = () => setVisible(true);

    // Show as soon as any data is available
    video.addEventListener("loadeddata", show);
    video.addEventListener("canplay", show);
    video.addEventListener("playing", show);

    // Already loaded (cached)
    if (video.readyState >= 1) show();

    // Explicitly trigger play
    video.play().catch(() => show());

    // Fallback: show after 1s regardless (video will render its first frame)
    const timeout = setTimeout(show, 1000);

    return () => {
      clearTimeout(timeout);
      video.removeEventListener("loadeddata", show);
      video.removeEventListener("canplay", show);
      video.removeEventListener("playing", show);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1.5s] ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,6,18,0.92)] via-[rgba(10,6,18,0.5)] to-[rgba(10,6,18,0.3)]" />
      <div className="absolute inset-0 bg-[rgba(45,27,78,0.25)] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,6,18,0.5)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(10,6,18,0.9)] to-transparent" />
    </div>
  );
}
