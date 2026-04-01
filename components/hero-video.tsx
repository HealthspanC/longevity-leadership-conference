"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

const VIMEO_ID = "1106534793";
const START_TIME = 4; // seconds
const END_TIME = 60; // seconds

export function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || playerRef.current) return;

    const player = new Player(el, {
      id: Number(VIMEO_ID),
      background: true, // autoplay, muted, no controls, loop
      muted: true,
      autopause: false,
      dnt: true, // do not track
      quality: "1080p",
    });

    playerRef.current = player;

    player.ready().then(() => {
      player.setCurrentTime(START_TIME);
    });

    player.on("timeupdate", (data: { seconds: number }) => {
      if (data.seconds >= END_TIME) {
        player.setCurrentTime(START_TIME);
      }
    });

    return () => {
      player.destroy();
      playerRef.current = null;
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Vimeo player — scaled up to ensure full cover with no letterboxing */}
      <div
        ref={containerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100%,177.78vh)] h-[max(100%,56.25vw)]"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,6,18,0.92)] via-[rgba(10,6,18,0.5)] to-[rgba(10,6,18,0.3)]" />
      <div className="absolute inset-0 bg-[rgba(45,27,78,0.25)] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,6,18,0.5)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(10,6,18,0.9)] to-transparent" />
    </div>
  );
}
