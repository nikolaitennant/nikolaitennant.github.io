"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo, stats, education } from "@/data/portfolio";

const HoloRobot = dynamic(() => import("@/components/HoloRobot"), { ssr: false });

export default function Interactive3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const robotOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black py-24 md:py-0 md:h-screen"
    >
      {/* 3D Robot — right half on desktop */}
      <motion.div
        style={{ opacity: robotOpacity }}
        className="absolute inset-0 md:left-[40%] z-0"
      >
        <HoloRobot />
      </motion.div>

      {/* Overlays for text readability — no top fade so hero blends in */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none md:via-black/50" />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[1] bg-gradient-to-t from-[hsl(0,0%,2%)] to-transparent pointer-events-none" />

      {/* Content — left side */}
      <div className="relative z-10 flex h-full items-center pointer-events-none">
        <div className="max-w-lg px-8 md:px-16 space-y-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono"
          >
            About Me
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            I build things
            <br />
            that think.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm text-white/40 max-w-md leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-4 gap-3"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-bold text-white/90 font-heading">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/25 font-mono mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="border border-white/5 rounded-lg px-3 py-2 bg-white/[0.02]"
              >
                <p className="text-xs font-medium text-white/60">{edu.degree}</p>
                <p className="text-[10px] text-white/25 font-mono">
                  {edu.school} &middot; {edu.gpa}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/15 font-mono"
          >
            <span>{personalInfo.location}</span>
            <span className="w-4 h-px bg-white/15" />
            <span>{personalInfo.citizenship}</span>
          </motion.div>
        </div>
      </div>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 z-10 text-[9px] uppercase tracking-[0.3em] text-white/15 font-mono pointer-events-none hidden md:block"
      >
        move cursor to interact
      </motion.div>
    </section>
  );
}
