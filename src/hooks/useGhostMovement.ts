"use client";

import { useRef, useCallback, useEffect } from "react";
import { createNoise3D } from "simplex-noise";

interface GhostPosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tilt: number;
  speed: number;
}

interface UseGhostMovementOptions {
  enabled: boolean;
  speedMultiplier?: number;
}

export function useGhostMovement({ enabled, speedMultiplier = 1 }: UseGhostMovementOptions) {
  const posRef = useRef<GhostPosition>({ x: 0, y: 0, vx: 0, vy: 0, tilt: 0, speed: 0 });
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const noiseRef = useRef(createNoise3D());
  const frameRef = useRef<number>(0);
  const elRef = useRef<HTMLDivElement | null>(null);

  const setElement = useCallback((el: HTMLDivElement | null) => {
    elRef.current = el;
    if (el && posRef.current.x === 0) {
      posRef.current.x = window.innerWidth * 0.6;
      posRef.current.y = window.innerHeight * 0.4;
    }
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const noise = noiseRef.current;

    function tick() {
      const pos = posRef.current;
      const el = elRef.current;
      if (!el) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      timeRef.current += 0.006;
      const t = timeRef.current;
      const sp = speedMultiplier;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Noise-driven wandering
      const wanderX = noise(t * 0.7, 1.0, 0) * w * 0.3 * sp;
      const wanderY = noise(t * 0.5, 0, 5.0) * h * 0.25 * sp;
      const baseX = w * 0.55 + wanderX;
      const baseY = h * 0.4 + wanderY;

      // Slight cursor gravity
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dx = mx - pos.x;
      const dy = my - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const attraction = sp > 0.5 ? Math.min(0.0003, 12 / (dist + 200)) : 0;

      pos.vx += (baseX - pos.x) * 0.003 * sp + dx * attraction;
      pos.vy += (baseY - pos.y) * 0.003 * sp + dy * attraction;
      pos.vx *= 0.97;
      pos.vy *= 0.97;

      // Occasional speed burst
      if (sp > 0.5 && Math.random() < 0.002) {
        pos.vx += (Math.random() - 0.5) * 2.5;
        pos.vy += (Math.random() - 0.5) * 2;
      }

      pos.x += pos.vx;
      pos.y += pos.vy;

      // Soft bounds
      const margin = 30;
      if (pos.x < margin) { pos.x = margin; pos.vx = Math.abs(pos.vx) * 0.4; }
      if (pos.x > w - 120) { pos.x = w - 120; pos.vx = -Math.abs(pos.vx) * 0.4; }
      if (pos.y < margin) { pos.y = margin; pos.vy = Math.abs(pos.vy) * 0.4; }
      if (pos.y > h - 130) { pos.y = h - 130; pos.vy = -Math.abs(pos.vy) * 0.4; }

      pos.tilt = Math.max(-10, Math.min(10, pos.vx * 2.5));
      pos.speed = Math.sqrt(pos.vx * pos.vx + pos.vy * pos.vy);

      el.style.left = `${pos.x}px`;
      el.style.top = `${pos.y}px`;

      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [enabled, speedMultiplier]);

  return { setElement, posRef, mouseRef };
}
