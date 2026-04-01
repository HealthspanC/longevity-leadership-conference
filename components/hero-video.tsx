"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

const VIMEO_ID = "1106534793";
const START_TIME = 4.7;
const END_TIME = 60;

export function HeroVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || playerRef.current) return;

    const player = new Player(iframe);
    playerRef.current = player;

    player.on("timeupdate", (data: { seconds: number }) => {
      if (data.seconds >= END_TIME || data.seconds < START_TIME - 1) {
        player.setCurrentTime(START_TIME);
      }
    });

    player.on("ended", () => {
      player.setCurrentTime(START_TIME);
      player.play();
    });

    return () => {
      playerRef.current = null;
    };
  }, [mounted]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Render iframe only on client to avoid hydration mismatch from Vimeo SDK */}
      {mounted && (
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&muted=1&loop=1&dnt=1&quality=1080p#t=${START_TIME}s`}
          allow="autoplay; fullscreen"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none pointer-events-none"
          style={{
            width: "max(100%, 177.78vh)",
            height: "max(100%, 56.25vw)",
          }}
          title="Conference highlight reel"
        />
      )}

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,6,18,0.92)] via-[rgba(10,6,18,0.5)] to-[rgba(10,6,18,0.3)]" />
      <div className="absolute inset-0 bg-[rgba(45,27,78,0.25)] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,6,18,0.5)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(10,6,18,0.9)] to-transparent" />
    </div>
  );
}
