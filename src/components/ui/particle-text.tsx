"use client";

import React, { useEffect, useRef, useCallback } from "react";

const COLORS = ["#00e5ff", "#73A9FF", "#ff0040", "#E06666", "#a78bfa", "#8A2BE2", "#DDA0DD", "#9370DB", "#BA55D3", "#C71585", "#E6E6FA"];
const SAMPLING_DENSITY = 4;
const FRICTION = 0.95;
const MOUSE_RADIUS = 100;
const MOUSE_STRENGTH = 1.5;
const ATTRACTION = 0.08;
const NOISE = 0.3;
const TRAIL_ALPHA = 0.2;
const SETTLE_DIST = 4;

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  tx: number; ty: number;
  size: number;
  color: string;
  attractOff: number;
  noiseOff: number;
}

export default function ParticleText({
  text = "NIKOLAI TENNANT",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x?: number; y?: number }>({});
  const frameRef = useRef<number>(0);
  const initRef = useRef(false);

  const getTextPoints = useCallback((word: string, w: number, h: number) => {
    const tmp = document.createElement("canvas");
    tmp.width = w;
    tmp.height = h;
    const ctx = tmp.getContext("2d")!;

    // Find best font size
    let fontSize = 10;
    for (let fs = 300; fs >= 10; fs -= 2) {
      ctx.font = `900 ${fs}px 'Space Grotesk', sans-serif`;
      const m = ctx.measureText(word);
      if (m.width < w * 0.85 && fs < h * 0.35) {
        fontSize = fs;
        break;
      }
    }

    ctx.clearRect(0, 0, w, h);
    ctx.font = `900 ${fontSize}px 'Space Grotesk', sans-serif`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(word, w / 2, h / 2);

    const img = ctx.getImageData(0, 0, w, h).data;
    const points: { x: number; y: number }[] = [];
    for (let y = 0; y < h; y += SAMPLING_DENSITY) {
      for (let x = 0; x < w; x += SAMPLING_DENSITY) {
        if (img[(y * w + x) * 4 + 3] > 128) {
          points.push({ x, y });
        }
      }
    }
    return points;
  }, []);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;

    const points = getTextPoints(text.toUpperCase(), w, h);
    if (points.length === 0) return;

    const count = Math.min(Math.max(points.length, 800), 5000);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const t = points[i % points.length];
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        tx: t.x,
        ty: t.y,
        size: 1 + Math.random() * 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        attractOff: (Math.random() - 0.5) * 0.03,
        noiseOff: (Math.random() - 0.5) * 0.15,
      });
    }
    particlesRef.current = particles;
    initRef.current = true;
  }, [text, getTextPoints]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_ALPHA})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const mouse = mouseRef.current;

    for (const p of particlesRef.current) {
      const dx = p.tx - p.x;
      const dy = p.ty - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let attr = ATTRACTION + p.attractOff;
      let noise = NOISE + p.noiseOff;

      if (dist < SETTLE_DIST) {
        attr *= 0.15;
        noise *= 0.7;
      } else if (dist < SETTLE_DIST * 4) {
        const f = (dist - SETTLE_DIST) / (SETTLE_DIST * 3);
        attr *= 0.15 + 0.85 * f;
        noise *= 0.7 + 0.3 * f;
      }

      let fx = 0, fy = 0;

      if (mouse.x !== undefined && mouse.y !== undefined) {
        const mx = p.x - mouse.x;
        const my = p.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < MOUSE_RADIUS && md > 0) {
          const angle = Math.atan2(my, mx);
          const force = ((MOUSE_RADIUS - md) / MOUSE_RADIUS) * MOUSE_STRENGTH;
          fx += Math.cos(angle) * force;
          fy += Math.sin(angle) * force;
          attr *= 0.1;
        }
      }

      if (dist > 0.01) {
        fx += (dx / dist) * attr * Math.min(dist, 100) * 0.1;
        fy += (dy / dist) * attr * Math.min(dist, 100) * 0.1;
      }

      fx += (Math.random() - 0.5) * noise;
      fy += (Math.random() - 0.5) * noise;

      p.vx = (p.vx + fx) * FRICTION;
      p.vy = (p.vy + fy) * FRICTION;
      p.x += p.vx;
      p.y += p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.2, p.size), 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = Math.min(4, p.size * 1.2);
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      init();
    };

    // Wait for fonts to load
    document.fonts.ready.then(() => {
      resize();
      frameRef.current = requestAnimationFrame(animate);
    });

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [init, animate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseRef.current = {}; }}
      onTouchMove={(e) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect && e.touches[0]) {
          mouseRef.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        }
      }}
      onTouchEnd={() => { mouseRef.current = {}; }}
      style={{ display: "block", background: "transparent" }}
    />
  );
}
