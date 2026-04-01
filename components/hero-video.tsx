"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Explicitly trigger play for browsers that block autoplay attribute
    video.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,6,18,0.92)] via-[rgba(10,6,18,0.5)] to-[rgba(10,6,18,0.3)]" />
      <div className="absolute inset-0 bg-[rgba(45,27,78,0.25)] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,6,18,0.5)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(10,6,18,0.9)] to-transparent" />
    </div>
  );
}
