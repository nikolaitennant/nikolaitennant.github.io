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
      className="relative min-h-screen w-full overflow-hidden bg-background py-24 md:py-0 md:h-screen"
    >
      {/* 3D Robot */}
      <motion.div
        style={{ opacity: robotOpacity }}
        className="absolute bottom-0 right-0 left-0 h-[45%] md:h-full md:top-0 md:left-auto md:w-[50%] z-0"
      >
        <HoloRobot />
      </motion.div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-background via-background/80 via-[50%] to-transparent md:bg-none" />
      <div className="absolute inset-0 z-[1] pointer-events-none hidden md:block bg-gradient-to-r from-background via-background/80 via-[45%] to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-start pt-20 md:items-center md:pt-0 pointer-events-none">
        <div className="w-full max-w-xl pl-6 pr-4 sm:pl-10 md:pl-16 lg:pl-24 space-y-6 md:space-y-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono"
          >
            About Me
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight"
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
            className="text-sm text-muted-foreground max-w-md leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-xl font-bold text-foreground font-heading">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mt-1">{stat.label}</div>
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
                className="border border-border rounded-lg px-3 py-2 bg-card/50"
              >
                <p className="text-xs font-medium text-foreground/80">{edu.degree}</p>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {edu.school} &middot; {edu.gpa}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-mono"
          >
            {personalInfo.location}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
