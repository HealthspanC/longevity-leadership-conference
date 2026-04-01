"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => setLoaded(true);
    video.addEventListener("loadeddata", handleLoaded);

    // If already loaded (cached)
    if (video.readyState >= 3) setLoaded(true);

    return () => video.removeEventListener("loadeddata", handleLoaded);
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
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      {/* Primary gradient — dark bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,6,18,0.92)] via-[rgba(10,6,18,0.5)] to-[rgba(10,6,18,0.3)]" />

      {/* Purple tint for brand cohesion */}
      <div className="absolute inset-0 bg-[rgba(45,27,78,0.25)] mix-blend-multiply" />

      {/* Top vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,6,18,0.5)_100%)]" />

      {/* Bottom fade to stats band */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(10,6,18,0.9)] to-transparent" />
    </div>
  );
}
