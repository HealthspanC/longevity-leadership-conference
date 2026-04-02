"use client";

import { useRef, useEffect, useCallback } from "react";

interface MysticRoseProps {
  size?: number;
  className?: string;
}

export function MysticRose({ size = 80, className }: MysticRoseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    angle1: 0,
    angle2: 0,
    hoverProgress: 0,
    isHovering: false,
    animationId: 0,
  });
  const nodes = 14;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx = maybeCtx;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.46;
    const state = stateRef.current;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Hover easing
    state.hoverProgress += state.isHovering ? 0.05 : -0.05;
    state.hoverProgress = Math.max(0, Math.min(1, state.hoverProgress));

    const baseSpeed = 0.0003;
    const hoverSpeed = 0.0015;
    const speed = baseSpeed + (hoverSpeed - baseSpeed) * state.hoverProgress;

    // White circle background — match rose radius so no white rim shows
    const bgRadius = radius;
    ctx.beginPath();
    ctx.arc(cx, cy, bgRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Draw mystic rose pattern
    function drawRose(rotation: number) {
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i < nodes; i++) {
        const theta = rotation + (i * 2 * Math.PI) / nodes;
        points.push({
          x: cx + radius * Math.cos(theta),
          y: cy + radius * Math.sin(theta),
        });
      }

      ctx.strokeStyle = "rgba(45, 10, 89, 0.5)";
      ctx.lineWidth = Math.max(0.5, radius * 0.02);
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#2d0059";

      ctx.beginPath();
      for (let i = 0; i < nodes; i++) {
        for (let j = i + 1; j < nodes; j++) {
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
        }
      }
      ctx.stroke();

      // Node dots — scale with radius
      const dotOuter = Math.max(2, radius * 0.055);
      const dotInner = Math.max(1, radius * 0.02);
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#d5b3ff";
      for (let i = 0; i < nodes; i++) {
        ctx.fillStyle = "rgba(168, 113, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, dotOuter, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, dotInner, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    drawRose(state.angle1);
    drawRose(state.angle2);

    // Central circle — dark purple gradient
    const coreRadius = radius * 0.38 + state.hoverProgress * radius * 0.015;
    const glowIntensity = 20 + state.hoverProgress * 25;

    ctx.shadowBlur = glowIntensity;
    ctx.shadowColor = "rgba(168, 113, 255, 0.6)";

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
    gradient.addColorStop(0, "#4A148C");
    gradient.addColorStop(1, "#23004D");

    ctx.beginPath();
    ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // White "H" letter in center
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${coreRadius * 0.9}px "Inter", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("H", cx, cy + coreRadius * 0.03);
    ctx.restore();

    state.angle1 += speed;
    state.angle2 -= speed;

    state.animationId = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size with DPR for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const dist = Math.hypot(mx - size / 2, my - size / 2);
      stateRef.current.isHovering = dist < size * 0.16;
    };

    const handleLeave = () => {
      stateRef.current.isHovering = false;
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    const state = stateRef.current;
    state.animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(state.animationId);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [size, draw]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Healthspan Collective"
    />
  );
}
