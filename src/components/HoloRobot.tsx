"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function HoloRobot() {
  return (
    <div className="relative h-full w-full">
      {/* Spline robot — inverted in light mode */}
      <div
        className="h-full w-full dark:filter-none"
        style={{ filter: "saturate(0) brightness(0.7) contrast(1.5) sepia(0.3) hue-rotate(160deg)" }}
      >
        <div className="h-full w-full dark:[filter:none] [filter:invert(1)_saturate(0)_brightness(1.2)_contrast(1.1)]">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground/60" />
              </div>
            }
          >
            <Spline scene={SCENE_URL} className="h-full w-full" />
          </Suspense>
        </div>
      </div>

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.08]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(128,128,128,0.4) 2px, rgba(128,128,128,0.4) 3px)",
        }}
      />
    </div>
  );
}
