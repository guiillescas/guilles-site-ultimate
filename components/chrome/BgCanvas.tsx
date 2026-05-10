"use client";

import { useEffect, useRef } from "react";

const CELL = 56;
const HOTSPOT_RADIUS = 220;
const BASE_ALPHA = 0.08;
const HOT_ALPHA = 0.55;

export function BgCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const mouse = { x: -1000, y: -1000 };
    let running = true;

    const resize = () => {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) rafId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    let rafId = 0;
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const cellPx = CELL * dpr;
      const radius = HOTSPOT_RADIUS * dpr;

      for (let x = 0; x < w + cellPx; x += cellPx) {
        for (let y = 0; y < h + cellPx; y += cellPx) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let alpha = BASE_ALPHA;
          let size = 1 * dpr;

          if (dist < radius) {
            const t = 1 - dist / radius;
            alpha = BASE_ALPHA + t * HOT_ALPHA;
            size = (1 + t * 1.4) * dpr;
          }

          ctx.fillStyle = `rgba(197, 252, 77, ${alpha})`;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas id="bg-canvas" aria-hidden="true" ref={ref} />;
}
