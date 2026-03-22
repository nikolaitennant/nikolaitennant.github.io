"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function HoloRobot() {
  return (
    <div className="relative h-full w-full">
      {/* Spline robot */}
      <div
        className="h-full w-full"
        style={{
          filter: "saturate(0.3) brightness(0.85) contrast(1.3)",
          mixBlendMode: "screen",
        }}
      >
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/40" />
            </div>
          }
        >
          <Spline scene={SCENE_URL} className="h-full w-full" />
        </Suspense>
      </div>

      {/* Holographic color overlay — cyan tint */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,229,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Chromatic aberration layers */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.07]"
        style={{
          background: "radial-gradient(ellipse at 45% 50%, rgba(0,229,255,0.4) 0%, transparent 50%)",
          transform: "translate(8px, -4px)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.05]"
        style={{
          background: "radial-gradient(ellipse at 55% 50%, rgba(255,0,64,0.4) 0%, transparent 50%)",
          transform: "translate(-8px, 4px)",
        }}
      />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.06]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px)",
        }}
      />

      {/* Subtle noise grain */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
