# Ghost AI Companion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Spline robot with an LLM-powered ghost AI companion that roams the About section, peeks from edges on other sections, and answers questions about Nikolai via OpenAI API. Add a dedicated Education section. Clean up dead code.

**Architecture:** Ghost is a fixed-position SVG character with noise-based autonomous movement, managed by a React context that tracks section visibility, chat state, and peek timing. OpenAI calls happen client-side. Each ghost subsystem (movement, eyes, chat, peek) is a separate hook for testability.

**Tech Stack:** Next.js 14, React 18, Framer Motion, simplex-noise (already installed), OpenAI API (browser fetch), Tailwind CSS, SVG.

**Spec:** `docs/superpowers/specs/2026-04-04-ghost-ai-companion-design.md`

---

## Phase 1: Cleanup

### Task 1: Delete unused components

**Files:**
- Delete: `src/components/Dock.tsx`
- Delete: `src/components/ui/bento-tilt.tsx`
- Delete: `src/components/ui/border-beam.tsx`
- Delete: `src/components/ui/container-scroll.tsx`
- Delete: `src/components/ui/particle-text.tsx`
- Delete: `src/components/ui/stagger-text.tsx`
- Delete: `src/components/ui/wavy-background.tsx`
- Modify: `src/components/About.tsx` (remove BentoTilt import)
- Modify: `src/components/Hero.tsx` (remove ParticleText import)

- [ ] **Step 1: Verify no other imports exist**

Run: `grep -r "bento-tilt\|border-beam\|container-scroll\|particle-text\|stagger-text\|wavy-background\|Dock" src/ --include="*.tsx" --include="*.ts" -l`

Expected: Only the files being deleted + About.tsx + Hero.tsx

- [ ] **Step 2: Delete the 7 unused files**

```bash
rm src/components/Dock.tsx
rm src/components/ui/bento-tilt.tsx
rm src/components/ui/border-beam.tsx
rm src/components/ui/container-scroll.tsx
rm src/components/ui/particle-text.tsx
rm src/components/ui/stagger-text.tsx
rm src/components/ui/wavy-background.tsx
```

- [ ] **Step 3: Remove BentoTilt from About.tsx**

In `src/components/About.tsx`, remove the import line:
```typescript
import { BentoTilt } from "@/components/ui/bento-tilt";
```

Replace the `<BentoTilt key={stat.label}>` wrapper with a plain `<div key={stat.label}>` and remove the closing `</BentoTilt>`.

- [ ] **Step 4: Remove ParticleText from Hero.tsx**

In `src/components/Hero.tsx`, remove:
```typescript
const ParticleText = dynamic(() => import("@/components/ui/particle-text"), { ssr: false });
```

And remove any `<ParticleText ... />` usage in the JSX (replace with the text content directly if used).

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors about missing modules.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: delete 7 unused components (~500 lines dead code)"
```

---

### Task 2: Remove unused dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Verify gsap and motion are unused**

Run: `grep -r "from ['\"]gsap" src/ --include="*.tsx" --include="*.ts"` (expect no results)
Run: `grep -r "from ['\"]motion" src/ --include="*.tsx" --include="*.ts"` (expect no results)

- [ ] **Step 2: Remove packages**

Run: `npm uninstall gsap motion`

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove unused gsap and motion dependencies"
```

---

## Phase 2: Data

### Task 3: Merge rich content from main branch into portfolio.ts

**Files:**
- Modify: `src/data/portfolio.ts`

- [ ] **Step 1: Read main branch portfolio data**

Run: `git show main:src/data/portfolio.ts > /tmp/main-portfolio.ts`

Review the main branch content. Key data to merge:
- Experience: Split dunnhumby into two roles (Associate → Research Engineer promotion)
- Education: Add `achievements`, `relevant` coursework arrays, `location`
- Projects: Add `longDescription`, `features`, `impact` fields
- Publication: Add `longDescription`, `collaboration`, `technologies`
- New exports: `researchProjects` (SenID with detail), `researchInterests`
- Skills: Add `Mathematics & Statistics` category, add missing items (TensorFlow, NumPy, Git)

- [ ] **Step 2: Update personalInfo**

Keep the redesign version (LLM Engineer title, NatureAlpha subtitle) but add back `citizenship`:

```typescript
export const personalInfo = {
  name: "Nikolai Tennant",
  title: "LLM Engineer",
  subtitle: "Building agentic AI systems at NatureAlpha",
  location: "London, UK",
  email: "nikolaitennant@gmail.com",
  linkedin: "https://www.linkedin.com/in/nikolai-tennant/",
  github: "https://github.com/nikolaitennant",
  bio: "I build agentic AI systems at NatureAlpha, designing and deploying LLM-powered pipelines for sustainable finance data. Previously, I was a Research Engineer at dunnhumby working on customer data science, and a Research Assistant at Singh Lab using deep learning to study ageing biology. I hold an MSc in Data Science and a BA in History from Brown University.",
  citizenship: "Dual US/UK citizen",
};
```

- [ ] **Step 3: Update experience with promotion detail**

```typescript
export const experience = [
  {
    title: "LLM Engineer",
    company: "NatureAlpha",
    period: "2025 - Present",
    description:
      "Building agentic AI systems for sustainable finance. Designing and deploying LLM-powered data pipelines, RAG systems, and multi-agent workflows for ESG and biodiversity data analysis.",
    technologies: ["Python", "LLMs", "LangChain", "RAG", "Agentic Systems", "AWS"],
  },
  {
    title: "Research Engineer",
    company: "dunnhumby",
    period: "2025",
    description:
      "Developed NLP and LLM systems for data insight synthesis. Contributed to design and implementation of core functionality involving vector embeddings, cost modelling, impact prediction, and dynamic product ranking.",
    technologies: ["Python", "SQL", "PySpark", "AWS", "GCP", "Machine Learning"],
    promotion: true,
  },
  {
    title: "Associate Research Engineer",
    company: "dunnhumby",
    period: "2023 - 2025",
    description:
      "Built a complete ML pipeline using autoencoders on a 5M customer dataset for Tesco Mobile handset assortment. Delivered projects generating £829K in business value. Refactored codebases and removed external API dependencies.",
    technologies: ["Python", "SQL", "PySpark", "AWS", "GCP", "Data Pipelines"],
  },
  {
    title: "Research Assistant",
    company: "Singh Lab, Brown University",
    period: "2022 - 2023",
    description:
      "Conducted X chromosome dosage compensation research as part of the NSF-funded IISAGE initiative. Developed computational models for cross-species ageing biomarker analysis across 11 research laboratories.",
    technologies: ["Python", "Deep Learning", "CNN", "Genomics", "Single-cell Analysis"],
  },
];
```

- [ ] **Step 4: Update education with coursework and achievements**

```typescript
export const education = [
  {
    degree: "MSc Data Science",
    school: "Brown University",
    location: "Providence, RI",
    gpa: "4.0/4.0",
    period: "2022 - 2023",
    achievements: [
      "Singh Lab Research Assistant",
      "Sustainable Food Initiative",
      "Brown Club Lacrosse: Won D2 regionals, placed 5th nationals",
    ],
    coursework: [
      "Statistical Learning",
      "Machine Learning",
      "Deep Learning",
      "Data Engineering",
      "Computational Probability & Statistics",
    ],
  },
  {
    degree: "BA History (Data Science minor)",
    school: "Brown University",
    location: "Providence, RI",
    gpa: "3.6/4.0",
    period: "2018 - 2022",
    achievements: [
      "Data Science Club Team Lead",
      "Data Science Fellow",
      "Research Assistant, ML for Earth & Environment",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Applied Statistics",
      "Linear Algebra",
      "Intro to Econometrics",
      "Cybersecurity Ethics",
    ],
  },
];
```

- [ ] **Step 5: Update projects with long descriptions**

Add `longDescription`, `features`, and `impact` to each project. Keep existing fields. Refer to `/tmp/main-portfolio.ts` for the full text.

- [ ] **Step 6: Update publication with detail**

Add `longDescription`, `collaboration`, and `technologies` fields from main branch data.

- [ ] **Step 7: Update skills with full categories**

```typescript
export const skills = {
  "Languages": ["Python", "SQL", "R", "TypeScript", "Bash", "Git"],
  "ML & AI": ["PyTorch", "TensorFlow", "LangChain", "FAISS", "NLP", "Computer Vision", "Deep Learning"],
  "Mathematics": ["Linear Algebra", "Statistical Modelling", "Bayesian Analysis"],
  "Data & Cloud": ["PySpark", "Pandas", "NumPy", "AWS", "GCP", "Databricks", "Docker"],
  "Specialised": ["RAG Systems", "LLMs", "Agentic AI", "Genomics", "MLOps"],
};
```

- [ ] **Step 8: Verify build**

Run: `npm run build`
Expected: Build succeeds. No type errors.

- [ ] **Step 9: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat: merge rich content from main branch — coursework, achievements, project details"
```

---

## Phase 3: Ghost Core

### Task 4: Create useGhostMovement hook

**Files:**
- Create: `src/hooks/useGhostMovement.ts`

- [ ] **Step 1: Create the movement hook**

```typescript
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
  bounds?: { width: number; height: number };
}

export function useGhostMovement({ enabled, speedMultiplier = 1, bounds }: UseGhostMovementOptions) {
  const posRef = useRef<GhostPosition>({ x: 0, y: 0, vx: 0, vy: 0, tilt: 0, speed: 0 });
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const noiseRef = useRef(createNoise3D());
  const frameRef = useRef<number>(0);
  const elRef = useRef<HTMLDivElement | null>(null);

  const setElement = useCallback((el: HTMLDivElement | null) => {
    elRef.current = el;
    if (el && posRef.current.x === 0) {
      const w = bounds?.width ?? window.innerWidth;
      const h = bounds?.height ?? window.innerHeight;
      posRef.current.x = w * 0.6;
      posRef.current.y = h * 0.4;
    }
  }, [bounds]);

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
      const w = bounds?.width ?? window.innerWidth;
      const h = bounds?.height ?? window.innerHeight;

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
  }, [enabled, speedMultiplier, bounds]);

  return { setElement, posRef, mouseRef };
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (hook not yet imported anywhere).

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useGhostMovement.ts
git commit -m "feat: add useGhostMovement hook — noise-driven organic movement"
```

---

### Task 5: Create Ghost SVG component

**Files:**
- Create: `src/components/ghost/GhostCharacter.tsx`

- [ ] **Step 1: Create the ghost character component**

```typescript
"use client";

import { useEffect, useRef, useCallback } from "react";

interface GhostCharacterProps {
  size?: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  tilt?: number;
  speed?: number;
  mouth?: "idle" | "happy" | "talk" | "ooh";
  onClick?: () => void;
}

export default function GhostCharacter({
  size = 90,
  mouseRef,
  tilt = 0,
  speed = 0,
  mouth = "idle",
  onClick,
}: GhostCharacterProps) {
  const eyeLRef = useRef<HTMLDivElement>(null);
  const eyeRRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Eye tracking
  useEffect(() => {
    let frame: number;
    let time = 0;

    function updateEyes() {
      time += 0.006;
      const el = containerRef.current;
      if (!el || !mouseRef.current) {
        frame = requestAnimationFrame(updateEyes);
        return;
      }

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.3;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dx = mx - cx;
      const dy = my - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const max = 2.8;

      let sx = (dx / Math.max(d, 60)) * max;
      let sy = (dy / Math.max(d, 60)) * max;

      // Random wander when cursor far
      if (d > 300) {
        sx += Math.sin(time * 2.5 + 10) * 2;
        sy += Math.sin(time * 2.5 + 20) * 1.5;
      }

      const transform = `translate(${sx}px, ${sy}px)`;
      if (eyeLRef.current) eyeLRef.current.style.transform = transform;
      if (eyeRRef.current) eyeRRef.current.style.transform = transform;

      frame = requestAnimationFrame(updateEyes);
    }

    frame = requestAnimationFrame(updateEyes);
    return () => cancelAnimationFrame(frame);
  }, [mouseRef]);

  // Blinking
  useEffect(() => {
    function blink() {
      const el = containerRef.current;
      if (!el) return;
      el.classList.add("ghost-blink");
      setTimeout(() => {
        el.classList.remove("ghost-blink");
        if (Math.random() < 0.25) {
          setTimeout(() => {
            el.classList.add("ghost-blink");
            setTimeout(() => el.classList.remove("ghost-blink"), 90);
          }, 180);
        }
      }, 110);
      blinkTimeoutRef.current = setTimeout(blink, 2000 + Math.random() * 4500);
    }
    blinkTimeoutRef.current = setTimeout(blink, 1200);
    return () => clearTimeout(blinkTimeoutRef.current);
  }, []);

  const squint = speed > 1.5;
  const scale = size / 90;

  const mouthEl = {
    idle: <div className="ghost-mouth-idle" />,
    happy: <div className="ghost-mouth-happy" />,
    talk: <div className="ghost-mouth-talk" />,
    ooh: <div className="ghost-mouth-ooh" />,
  }[mouth];

  return (
    <div
      ref={containerRef}
      className="ghost-character"
      style={{
        width: size,
        height: size * 1.17,
        transform: `rotate(${tilt}deg)`,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {/* Glow */}
      <div
        className="ghost-glow"
        style={{
          width: size * 1.45,
          height: size * 1.45,
          top: -size * 0.22,
          left: -size * 0.22,
        }}
      />

      {/* SVG body */}
      <svg
        viewBox="0 0 90 105"
        fill="none"
        className="ghost-svg"
        style={{ width: size, height: size * 1.17 }}
      >
        <defs>
          <radialGradient id="gGrad" cx="45" cy="30" r="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(210, 235, 255, 0.45)" />
            <stop offset="30%" stopColor="rgba(180, 215, 255, 0.3)" />
            <stop offset="60%" stopColor="rgba(150, 190, 250, 0.15)" />
            <stop offset="100%" stopColor="rgba(120, 170, 240, 0.05)" />
          </radialGradient>
          <radialGradient id="gInner" cx="45" cy="35" r="25" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(200, 230, 255, 0.25)" />
            <stop offset="100%" stopColor="rgba(160, 200, 255, 0)" />
          </radialGradient>
        </defs>
        <path
          d="M 45 6 C 65 6, 78 20, 78 40 L 78 65 C 78 68, 76 72, 74 75 L 70 85 C 68 88, 66 86, 64 82 L 60 72 C 58 69, 56 71, 54 75 L 50 85 C 48 88, 46 86, 44 82 L 40 72 C 38 69, 36 71, 34 75 L 30 85 C 28 88, 26 86, 24 82 L 20 72 C 18 68, 14 68, 12 65 L 12 40 C 12 20, 25 6, 45 6 Z"
          fill="url(#gGrad)"
          stroke="rgba(180,220,255,0.18)"
          strokeWidth="0.8"
        />
        <circle cx="45" cy="35" r="22" fill="url(#gInner)" opacity="0.8">
          <animate attributeName="r" values="22;24;22" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Eyes */}
      <div className="ghost-eyes" style={{ top: size * 0.31 }}>
        <div className={`ghost-eye ${squint ? "ghost-squint" : ""}`}>
          <div className="ghost-lid" />
          <div className="ghost-pupil" ref={eyeLRef} />
        </div>
        <div className={`ghost-eye ${squint ? "ghost-squint" : ""}`}>
          <div className="ghost-lid" />
          <div className="ghost-pupil" ref={eyeRRef} />
        </div>
      </div>

      {/* Mouth */}
      <div className="ghost-mouth-wrap" style={{ top: size * 0.56 }}>
        {mouthEl}
      </div>

      {/* Sparkles */}
      <div className="ghost-sparkle ghost-sparkle-1" />
      <div className="ghost-sparkle ghost-sparkle-2" />
      <div className="ghost-sparkle ghost-sparkle-3" />
    </div>
  );
}
```

- [ ] **Step 2: Add ghost CSS to globals.css**

Append to `src/app/globals.css`:

```css
/* ── Ghost Character ──────────────────────────── */
.ghost-character {
  position: relative;
  pointer-events: all;
}

.ghost-glow {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(150, 200, 255, 0.12) 0%, rgba(130, 185, 255, 0.04) 40%, transparent 60%);
  pointer-events: none;
  animation: ghost-glow-pulse 4s ease-in-out infinite;
}

.ghost-svg {
  position: absolute;
  inset: 0;
  overflow: visible;
}

.ghost-eyes {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 14px;
  z-index: 2;
}

.ghost-eye {
  width: 12px;
  height: 14px;
  background: rgba(210, 230, 255, 0.06);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.ghost-pupil {
  width: 7px;
  height: 8px;
  background: radial-gradient(circle at 40% 35%, rgba(230, 245, 255, 0.95), rgba(180, 215, 255, 0.7));
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 2.5px;
  transition: transform 0.18s ease-out;
  box-shadow: 0 0 12px rgba(180, 220, 255, 0.6), 0 0 4px rgba(200, 230, 255, 0.8);
}

.ghost-pupil::after {
  content: '';
  position: absolute;
  width: 2.5px;
  height: 2.5px;
  background: #fff;
  border-radius: 50%;
  top: 1px;
  right: 1.5px;
}

.ghost-lid {
  position: absolute;
  inset: -1px;
  height: 0;
  background: rgba(100, 150, 220, 0.25);
  border-radius: 50%;
  transition: height 0.08s;
  z-index: 2;
}

.ghost-blink .ghost-lid { height: 110%; }
.ghost-squint .ghost-lid { height: 25%; }

.ghost-mouth-wrap {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.ghost-mouth-idle { width: 8px; height: 4px; border: 1.5px solid rgba(200,230,255,0.3); border-top: none; border-radius: 0 0 8px 8px; }
.ghost-mouth-happy { width: 14px; height: 7px; border: 1.5px solid rgba(200,230,255,0.5); border-top: none; border-radius: 0 0 12px 12px; }
.ghost-mouth-talk { width: 10px; height: 9px; border: 1.5px solid rgba(200,230,255,0.4); border-radius: 50%; animation: ghost-talk 0.3s infinite; }
.ghost-mouth-ooh { width: 7px; height: 8px; border: 1.5px solid rgba(200,230,255,0.35); border-radius: 50%; }

.ghost-sparkle {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(170, 215, 255, 0.5);
  box-shadow: 0 0 4px rgba(170, 215, 255, 0.3);
  pointer-events: none;
}

.ghost-sparkle-1 { bottom: 0; left: 20%; animation: ghost-spark-drift 2s 0s infinite; }
.ghost-sparkle-2 { bottom: 5px; left: 50%; animation: ghost-spark-drift 2.5s 0.6s infinite; }
.ghost-sparkle-3 { bottom: 0; left: 75%; animation: ghost-spark-drift 2s 1.2s infinite; }

/* Thought bubble */
.ghost-thought {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.78rem;
  color: rgba(220, 230, 255, 0.7);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  scale: 0.92;
  transition: opacity 0.35s, scale 0.35s;
}

.ghost-thought.visible { opacity: 1; scale: 1; }

.ghost-thought::before {
  content: '';
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%);
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
}

.ghost-thought::after {
  content: '';
  position: absolute;
  bottom: -13px;
  left: calc(50% + 5px);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
}

/* Chat minimal */
.ghost-chat {
  position: fixed;
  z-index: 1001;
  background: rgba(18, 18, 24, 0.95);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  width: 360px;
  overflow: hidden;
  opacity: 0;
  scale: 0.92;
  pointer-events: none;
  transition: opacity 0.3s, scale 0.3s;
}

.ghost-chat.open { opacity: 1; scale: 1; pointer-events: all; }

.ghost-chat-msgs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 280px;
  overflow-y: auto;
  padding: 1rem;
  scrollbar-width: none;
}

.ghost-chat-msgs::-webkit-scrollbar { display: none; }

.ghost-chat-msg {
  font-size: 0.82rem;
  line-height: 1.55;
}

.ghost-chat-msg-ai {
  color: rgba(153, 153, 153, 1);
  align-self: flex-start;
  max-width: 95%;
}

.ghost-chat-msg-user {
  color: rgba(204, 204, 204, 1);
  align-self: flex-end;
  text-align: right;
  max-width: 80%;
}

.ghost-chat-thinking {
  display: flex;
  gap: 4px;
  align-self: flex-start;
  padding: 0.3rem 0;
}

.ghost-chat-thinking span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(160, 200, 255, 0.3);
  animation: ghost-think-bounce 1.2s infinite;
}

.ghost-chat-thinking span:nth-child(2) { animation-delay: 0.15s; }
.ghost-chat-thinking span:nth-child(3) { animation-delay: 0.3s; }

.ghost-chat-input input {
  width: 100%;
  background: none;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding: 0.6rem 1rem;
  color: #ccc;
  font-size: 0.8rem;
  outline: none;
  font-family: inherit;
}

.ghost-chat-input input::placeholder { color: #333; }

.ghost-chat-chips {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
  padding: 0.4rem 1rem 0.6rem;
}

.ghost-chat-chip {
  font-size: 0.68rem;
  padding: 0.25rem 0.55rem;
  border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #666;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.015);
  font-family: inherit;
  transition: all 0.15s;
}

.ghost-chat-chip:hover {
  border-color: rgba(255, 255, 255, 0.12);
  color: #888;
}

/* Peek */
.ghost-peek-wrap {
  position: fixed;
  z-index: 999;
  pointer-events: none;
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s;
}

.ghost-peek-wrap.visible { opacity: 1; pointer-events: all; }

.ghost-peek-wrap.from-right {
  right: -25px;
  transform: translateX(30px);
}
.ghost-peek-wrap.from-right.visible { transform: translateX(0); }

.ghost-peek-wrap.from-left {
  left: -25px;
  transform: translateX(-30px);
}
.ghost-peek-wrap.from-left.visible { transform: translateX(0); }

.ghost-peek-msg {
  position: absolute;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  border: none;
  border-radius: 20px;
  padding: 0.45rem 0.85rem;
  font-size: 0.75rem;
  color: rgba(220, 230, 255, 0.7);
  white-space: nowrap;
  pointer-events: none;
}

.ghost-peek-wrap.from-right .ghost-peek-msg { right: 75px; top: 20px; }
.ghost-peek-wrap.from-left .ghost-peek-msg { left: 75px; top: 20px; }

/* Animations */
@keyframes ghost-glow-pulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
@keyframes ghost-talk { 0%, 100% { height: 9px; } 50% { height: 4px; } }
@keyframes ghost-spark-drift { 0% { opacity: 0.5; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-25px) scale(0.2); } }
@keyframes ghost-think-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.3; } 30% { transform: translateY(-4px); opacity: 0.8; } }
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/ghost/GhostCharacter.tsx src/app/globals.css
git commit -m "feat: add GhostCharacter SVG component with eyes, mouth, sparkles"
```

---

### Task 6: Create GhostChat component

**Files:**
- Create: `src/components/ghost/GhostChat.tsx`

- [ ] **Step 1: Create the minimal chat component**

```typescript
"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "ai" | "user";
  content: string;
}

interface GhostChatProps {
  open: boolean;
  onClose: () => void;
  onSend: (message: string) => Promise<string>;
  position: { left: number; top: number };
  onMouthChange: (mouth: "idle" | "happy" | "talk" | "ooh") => void;
}

export default function GhostChat({ open, onClose, onSend, position, onMouthChange }: GhostChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hey! Ask me anything about Nikolai." },
  ]);
  const [thinking, setThinking] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const msgsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [open]);

  async function handleSend(text: string) {
    if (!text.trim()) return;
    setChipsVisible(false);
    setMessages((prev) => [...prev, { role: "user", content: text.trim() }]);
    setThinking(true);
    onMouthChange("talk");

    setTimeout(() => {
      if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }, 50);

    try {
      const response = await onSend(text.trim());
      setMessages((prev) => [...prev, { role: "ai", content: response }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I couldn't process that. Try again?" }]);
    } finally {
      setThinking(false);
      onMouthChange("happy");
      setTimeout(() => {
        if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
        onMouthChange("idle");
      }, 2000);
    }
  }

  const chips = ["What does he do?", "Research", "Tech stack", "Education"];

  return (
    <div
      className={`ghost-chat ${open ? "open" : ""}`}
      style={{ left: position.left, top: position.top }}
    >
      <button
        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/[0.04] text-[#444] text-[0.65rem] flex items-center justify-center hover:bg-white/[0.08] hover:text-[#888] z-10 transition-all"
        onClick={onClose}
      >
        &times;
      </button>

      <div ref={msgsRef} className="ghost-chat-msgs">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`ghost-chat-msg ${m.role === "ai" ? "ghost-chat-msg-ai" : "ghost-chat-msg-user"}`}
          >
            {m.content}
          </div>
        ))}
        {thinking && (
          <div className="ghost-chat-thinking">
            <span /><span /><span />
          </div>
        )}
      </div>

      {chipsVisible && (
        <div className="ghost-chat-chips">
          {chips.map((c) => (
            <button key={c} className="ghost-chat-chip" onClick={() => handleSend(c)}>
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="ghost-chat-input">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask anything..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/components/ghost/GhostChat.tsx
git commit -m "feat: add minimal GhostChat component — no chrome, Enter to send"
```

---

### Task 7: Create useGhostAI hook (OpenAI integration)

**Files:**
- Create: `src/hooks/useGhostAI.ts`

- [ ] **Step 1: Create the AI hook with fallback responses**

```typescript
"use client";

import { useCallback } from "react";
import { personalInfo, experience, education, projects, publication, skills, stats } from "@/data/portfolio";

const SYSTEM_PROMPT = `You are Nikolai Tennant's friendly AI assistant on his portfolio website. You speak in first person as if you know Nikolai personally. Be concise (2-3 sentences max), warm, slightly nerdy, and proud of his work. Never make up information — only use what's provided.

NIKOLAI'S DATA:
Name: ${personalInfo.name}
Role: ${personalInfo.title} at NatureAlpha
Location: ${personalInfo.location}
Bio: ${personalInfo.bio}

Experience:
${experience.map((e) => `- ${e.title} at ${e.company} (${e.period}): ${e.description}`).join("\n")}

Education:
${education.map((e) => `- ${e.degree}, ${e.school} (${e.period}), GPA: ${e.gpa}`).join("\n")}

Projects:
${projects.map((p) => `- ${p.title}: ${p.description}`).join("\n")}

Publication: ${publication.title} — ${publication.description}

Skills: ${Object.entries(skills).map(([cat, items]) => `${cat}: ${items.join(", ")}`).join("; ")}

Stats: ${stats.map((s) => `${s.value} ${s.label}`).join(", ")}`;

const FALLBACK_RESPONSES: Record<string, string> = {
  default: "He's an LLM Engineer at NatureAlpha, building agentic AI systems for sustainable finance.",
  research: "His Nature paper is a deep learning ageing clock for Drosophila — 95% accuracy, 0.99 AUC. First author.",
  tech: "Mostly Python — PyTorch, LangChain, FAISS for RAG. AWS and PySpark for big data. TypeScript for frontend.",
  education: "Brown University. MSc Data Science, 4.0 GPA. BA History before that.",
  rag: "RAG Scholar AI — document Q&A with smart citations. Built with LangChain and FAISS.",
};

function getFallback(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("research") || q.includes("paper") || q.includes("nature")) return FALLBACK_RESPONSES.research;
  if (q.includes("tech") || q.includes("stack") || q.includes("python")) return FALLBACK_RESPONSES.tech;
  if (q.includes("edu") || q.includes("brown") || q.includes("school")) return FALLBACK_RESPONSES.education;
  if (q.includes("rag") || q.includes("scholar")) return FALLBACK_RESPONSES.rag;
  return FALLBACK_RESPONSES.default;
}

export function useGhostAI() {
  const sendMessage = useCallback(async (userMessage: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      // Fallback: no API key, use canned responses
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
      return getFallback(userMessage);
    }

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);

      const data = await res.json();
      return data.choices[0]?.message?.content ?? getFallback(userMessage);
    } catch {
      return getFallback(userMessage);
    }
  }, []);

  return { sendMessage };
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useGhostAI.ts
git commit -m "feat: add useGhostAI hook — OpenAI integration with fallback responses"
```

---

### Task 8: Create GhostCompanion orchestrator

**Files:**
- Create: `src/components/ghost/GhostCompanion.tsx`

This is the main component that ties everything together — movement, character, chat, peek, section awareness.

- [ ] **Step 1: Create the orchestrator component**

This component manages:
- Section visibility (IntersectionObserver)
- Ghost show/hide based on current section
- Chat open/close state
- Peek timing and positioning
- Thought bubble cycling
- Intro sequence

The full implementation should wire together `useGhostMovement`, `GhostCharacter`, `GhostChat`, and `useGhostAI`. It uses `IntersectionObserver` to detect which section is visible and manages the state machine:

States: `idle` (roaming on About), `chatting` (chat open), `hidden` (not on About, not peeking), `peeking` (sliding in from edge).

- [ ] **Step 2: Verify build**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/components/ghost/GhostCompanion.tsx
git commit -m "feat: add GhostCompanion orchestrator — section awareness, peek, thoughts"
```

---

## Phase 4: Education & Integration

### Task 9: Create Education section

**Files:**
- Create: `src/components/Education.tsx`

- [ ] **Step 1: Create the Education component**

Two cards side by side using education data from `portfolio.ts`. Each card shows: degree, school, GPA badge, period, achievements, coursework tags. Uses `motion` from framer-motion for scroll-triggered entrance. Responsive: stacks on mobile.

- [ ] **Step 2: Verify build**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/components/Education.tsx
git commit -m "feat: add dedicated Education section with coursework and achievements"
```

---

### Task 10: Wire into page.tsx

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/HoloRobot.tsx`

- [ ] **Step 1: Update page.tsx**

```typescript
"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Interactive3D from "@/components/Interactive3D";
import Education from "@/components/Education";
import Publications from "@/components/Publications";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const GhostCompanion = dynamic(() => import("@/components/ghost/GhostCompanion"), { ssr: false });

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Interactive3D />
        <Education />
        <Publications />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <GhostCompanion />
    </>
  );
}
```

- [ ] **Step 2: Update Interactive3D.tsx**

Remove the `HoloRobot` import and the Spline 3D element. Keep the about section text, stats, and layout — just remove the robot from the right side. The ghost companion is now a separate fixed-position overlay, not part of this section.

- [ ] **Step 3: Delete HoloRobot**

```bash
rm src/components/HoloRobot.tsx
```

- [ ] **Step 4: Evaluate three.js removal**

Check if `@react-three/fiber`, `@react-three/drei`, and `three` are still imported anywhere:

Run: `grep -r "react-three\|from ['\"]three" src/ --include="*.tsx" --include="*.ts"`

If no results, remove them:

Run: `npm uninstall three @react-three/fiber @react-three/drei`

- [ ] **Step 5: Full build verification**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 6: Test locally**

Run: `npm run dev`
Open `http://localhost:3000` and verify:
- Hero section loads normally
- Ghost appears on About section with intro greeting
- Ghost drifts organically, eyes track cursor
- Click ghost opens minimal chat
- Chat responds (fallback responses if no API key)
- Scroll to Education — ghost fades, peek appears from edge after delay
- Click peek — chat opens
- Close chat outside About — ghost fades
- Education section renders with two cards

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: integrate ghost companion, education section, remove Spline robot"
```

---

## Phase 5: Polish

### Task 11: Add .env.local for OpenAI key

**Files:**
- Create: `.env.local`
- Modify: `.gitignore`

- [ ] **Step 1: Create env file**

```
NEXT_PUBLIC_OPENAI_API_KEY=your-key-here
```

- [ ] **Step 2: Ensure .gitignore includes .env.local**

Check if `.env.local` is already in `.gitignore`. If not, add it.

- [ ] **Step 3: Commit .gitignore only**

```bash
git add .gitignore
git commit -m "chore: ensure .env.local is gitignored"
```

---

### Task 12: Fix Nav resume link and portfolio data

**Files:**
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Fix resume link**

Find the resume link in Nav.tsx and change `/resume.pdf` to the correct filename.

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "fix: correct resume link path in Nav"
```
