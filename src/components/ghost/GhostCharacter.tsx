"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface GhostCharacterProps {
  size?: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  tilt?: number;
  speed?: number;
  mouth?: "idle" | "happy" | "talk" | "ooh";
  onClick?: () => void;
}

interface PupilOffset {
  x: number;
  y: number;
}

const PUPIL_MAX = 2.8;
const BLINK_MIN = 2000;
const BLINK_MAX = 5000;
const BLINK_DURATION = 110;
const DOUBLE_BLINK_CHANCE = 0.25;
const WANDER_DISTANCE_THRESHOLD = 300;

function getMouthShape(mouth: GhostCharacterProps["mouth"]) {
  switch (mouth) {
    case "happy":
      return <div className="ghost-mouth-happy" />;
    case "talk":
      return <div className="ghost-mouth-talk" />;
    case "ooh":
      return <div className="ghost-mouth-ooh" />;
    default:
      return <div className="ghost-mouth-idle" />;
  }
}

export default function GhostCharacter({
  size = 90,
  mouseRef,
  tilt = 0,
  speed = 0,
  mouth = "idle",
  onClick,
}: GhostCharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const wanderRef = useRef({ t: 0 });

  const [pupilOffset, setPupilOffset] = useState<PupilOffset>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  const isSquinting = speed > 1.5;

  // Eye tracking RAF loop
  const trackEyes = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      rafRef.current = requestAnimationFrame(trackEyes);
      return;
    }

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mx = mouseRef.current?.x ?? centerX;
    const my = mouseRef.current?.y ?? centerY;

    const dx = mx - centerX;
    const dy = my - centerY;
    const dist = Math.hypot(dx, dy);

    if (dist > WANDER_DISTANCE_THRESHOLD) {
      // Wander with sine waves
      wanderRef.current.t += 0.02;
      const t = wanderRef.current.t;
      setPupilOffset({
        x: Math.sin(t * 1.3) * PUPIL_MAX * 0.6,
        y: Math.cos(t * 0.9) * PUPIL_MAX * 0.5,
      });
    } else {
      // Track cursor
      const angle = Math.atan2(dy, dx);
      const magnitude = Math.min(dist / 120, 1);
      setPupilOffset({
        x: Math.cos(angle) * magnitude * PUPIL_MAX,
        y: Math.sin(angle) * magnitude * PUPIL_MAX,
      });
    }

    rafRef.current = requestAnimationFrame(trackEyes);
  }, [mouseRef]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(trackEyes);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trackEyes]);

  // Blinking
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextBlink = () => {
      const delay =
        BLINK_MIN + Math.random() * (BLINK_MAX - BLINK_MIN);
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);

          // Possibly double-blink
          if (Math.random() < DOUBLE_BLINK_CHANCE) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
                scheduleNextBlink();
              }, BLINK_DURATION);
            }, 180);
          } else {
            scheduleNextBlink();
          }
        }, BLINK_DURATION);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  const glowSize = size * 1.6;
  const eyeContainerTop = size * 0.38;
  const mouthTop = size * 0.58;

  const eyeClassName = [
    "ghost-eye",
    isBlinking ? "ghost-blink" : "",
    isSquinting && !isBlinking ? "ghost-squint" : "",
  ]
    .filter(Boolean)
    .join(" ");

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
      {/* Outer ambient glow */}
      <div
        className="ghost-glow"
        style={{
          width: glowSize,
          height: glowSize,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Ghost SVG body */}
      <svg
        className="ghost-svg"
        viewBox="0 0 90 105"
        width={size}
        height={size * 1.17}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient
            id="ghost-body-grad"
            cx="45%"
            cy="25%"
            r="65%"
            fx="45%"
            fy="15%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(210,235,255,0.45)" />
            <stop offset="30%" stopColor="rgba(180,215,255,0.3)" />
            <stop offset="60%" stopColor="rgba(150,190,250,0.15)" />
            <stop offset="100%" stopColor="rgba(120,170,240,0.05)" />
          </radialGradient>

          <radialGradient
            id="ghost-inner-glow"
            cx="50%"
            cy="35%"
            r="55%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(200,230,255,0.25)" />
            <stop offset="100%" stopColor="rgba(160,200,255,0)" />
          </radialGradient>
        </defs>

        {/* Body + tail — single seamless path */}
        <path
          d="M 45 6 C 65 6, 78 20, 78 40 L 78 65 C 78 68, 76 72, 74 75 L 70 85 C 68 88, 66 86, 64 82 L 60 72 C 58 69, 56 71, 54 75 L 50 85 C 48 88, 46 86, 44 82 L 40 72 C 38 69, 36 71, 34 75 L 30 85 C 28 88, 26 86, 24 82 L 20 72 C 18 68, 14 68, 12 65 L 12 40 C 12 20, 25 6, 45 6 Z"
          fill="url(#ghost-body-grad)"
          stroke="rgba(180,220,255,0.18)"
          strokeWidth="0.8"
        />

        {/* Inner breathing glow */}
        <ellipse
          cx="45"
          cy="38"
          rx="22"
          ry="26"
          fill="url(#ghost-inner-glow)"
          style={{ animation: "ghost-glow-pulse 3s ease-in-out infinite" }}
        />
      </svg>

      {/* Eyes layer */}
      <div
        className="ghost-eyes"
        style={{ top: eyeContainerTop }}
      >
        <div className={eyeClassName}>
          <div
            className="ghost-pupil"
            style={{
              transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
            }}
          />
          <div className="ghost-lid" />
        </div>
        <div className={eyeClassName}>
          <div
            className="ghost-pupil"
            style={{
              transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
            }}
          />
          <div className="ghost-lid" />
        </div>
      </div>

      {/* Mouth layer */}
      <div
        className="ghost-mouth-wrap"
        style={{ top: mouthTop }}
      >
        {getMouthShape(mouth)}
      </div>

      {/* Sparkle particles */}
      <div className="ghost-sparkle ghost-sparkle-1" />
      <div className="ghost-sparkle ghost-sparkle-2" />
      <div className="ghost-sparkle ghost-sparkle-3" />
    </div>
  );
}
