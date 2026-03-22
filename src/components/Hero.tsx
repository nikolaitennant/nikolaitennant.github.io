"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { createNoise3D } from "simplex-noise";
import { personalInfo } from "@/data/portfolio";

const ParticleText = dynamic(() => import("@/components/ui/particle-text"), { ssr: false });

// ── Layer 1: Wavy Canvas Background ──────────────────────────────
const WavyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise = createNoise3D();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    ctx.filter = "blur(14px)";
    let nt = 0;
    let frameId: number;

    const colors = ["#1a1a2e", "#16213e", "#0f3460", "#1a1a2e", "#1b1b3a"];

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      ctx.filter = "blur(14px)";
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.fillStyle = "hsl(0, 0%, 2%)";
      ctx.globalAlpha = 0.4;
      ctx.fillRect(0, 0, w, h);
      nt += 0.0008;

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.lineWidth = 60;
        ctx.strokeStyle = colors[i];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 900, 0.3 * i, nt) * 120;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />;
};

// ── Layer 2: Interactive Particle Field ──────────────────────────
interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
}

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });
  const frameIdRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.floor(width * height * 0.00015);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x, y, originX: x, originY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.3,
      });
    }
    particlesRef.current = particles;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const mouse = mouseRef.current;

    for (const p of particlesRef.current) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (mouse.isActive && dist < 150) {
        const force = (150 - dist) / 150;
        p.vx -= (dx / dist) * force * 4;
        p.vy -= (dy / dist) * force * 4;
      }

      // Gentle ambient drift — origins slowly wander
      const time = Date.now() * 0.0003;
      const driftX = Math.sin(time + p.originX * 0.01) * 0.15;
      const driftY = Math.cos(time + p.originY * 0.01) * 0.15;
      p.vx += driftX;
      p.vy += driftY;

      p.vx += (p.originX - p.x) * 0.02;
      p.vy += (p.originY - p.y) * 0.02;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.x += p.vx;
      p.y += p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fill();
    }

    frameIdRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      initParticles(width, height);
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, [initParticles]);

  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, isActive: true };
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseRef.current.isActive = false; }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

// ── Layer 3: Glitch Decode + Spring Anaglyph ────────────────────
const GlitchText: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text, className = "", delay = 0,
}) => {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const lastMouse = useRef({ x: 0, y: 0, t: 0 });
  const target = useRef({ x: 3, y: -1.5 });
  const current = useRef({ x: 3, y: -1.5 });
  const frameRef = useRef<number>(0);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplay(
          text.split("").map((_, idx) =>
            idx < iteration ? text[idx] : chars[Math.floor(Math.random() * chars.length)]
          ).join("")
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  // Spring animation loop — always running, smoothly interpolates
  useEffect(() => {
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;

      if (h1Ref.current && started) {
        const x = current.current.x;
        const y = current.current.y;
        h1Ref.current.style.textShadow =
          `${x}px ${y}px 0 rgba(0,229,255,0.8), ${-x}px ${-y}px 0 rgba(255,0,64,0.65), ` +
          `${x * 0.5}px ${y * 0.5}px 8px rgba(0,229,255,0.25), ${-x * 0.5}px ${-y * 0.5}px 8px rgba(255,0,64,0.15)`;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [started]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    const dt = Math.max(1, now - lastMouse.current.t);
    const vx = (e.clientX - lastMouse.current.x) / dt * 16;
    const vy = (e.clientY - lastMouse.current.y) / dt * 16;
    lastMouse.current = { x: e.clientX, y: e.clientY, t: now };

    const speed = Math.sqrt(vx * vx + vy * vy);
    const force = Math.min(speed * 0.6, 8);

    if (speed > 0.3) {
      target.current = { x: (vx / speed) * force, y: (vy / speed) * force };
    }
  };

  const handleMouseLeave = () => {
    target.current = { x: 3, y: -1.5 };
  };

  return (
    <div className="relative inline select-none">
      <h1
        ref={h1Ref}
        className={`font-bold tracking-tighter inline ${className}`}
        style={{ textShadow: "3px -1.5px 0 rgba(0,229,255,0.5), -3px 1.5px 0 rgba(255,0,64,0.4)" }}
        onMouseEnter={(e) => { lastMouse.current = { x: e.clientX, y: e.clientY, t: Date.now() }; }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {display}
      </h1>
    </div>
  );
};

// ── Layer 4: Typing Cursor ───────────────────────────────────────
const TypingText: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text, className = "", delay = 2000,
}) => {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const blink = setInterval(() => setCursor((p) => !p), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className={className}>
      {displayed}
      <span className={`inline-block w-[2px] h-[1em] bg-white/70 ml-1 align-middle transition-opacity ${cursor ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
};

// ── Main Hero ────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-black" style={{ overflow: "clip", overflowClipMargin: "200px" }}>
      {/* Layer 1: Deep wavy canvas */}
      <WavyCanvas />

      {/* Layer 2: Interactive particles */}
      <ParticleField />

      {/* Layer 3: Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="max-w-5xl w-full text-center space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono"
          >
            {personalInfo.citizenship} &middot; {personalInfo.location}
          </motion.div>

          {/* Name with glitch decode + anaglyph + scan lines */}
          <div className="relative inline-block">
            <GlitchText
              text={personalInfo.name.toUpperCase()}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] text-white leading-[0.9]"
              delay={800}
            />
            {/* Scan lines over entire name */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.15,
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
              }}
            />
          </div>

          {/* Title with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <TypingText
              text={personalInfo.title}
              className="text-lg md:text-xl text-white/50 font-light tracking-widest uppercase font-mono"
              delay={2500}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            className="text-sm text-white/25 tracking-wide"
          >
            {personalInfo.subtitle}
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 0.8 }}
            className="flex justify-center items-center gap-6 pt-4"
          >
            {[
              { icon: Github, href: personalInfo.github },
              { icon: Linkedin, href: personalInfo.linkedin },
              { icon: Mail, href: `mailto:${personalInfo.email}` },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
