"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BentoTilt } from "@/components/ui/bento-tilt";
import { personalInfo, stats, education } from "@/data/portfolio";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="relative px-4 py-32" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-heading text-4xl font-bold tracking-tight sm:text-5xl"
        >
          About <span className="text-white">Me</span>
        </motion.h2>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {personalInfo.bio}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="rounded-lg border border-border/50 bg-secondary/30 px-4 py-2"
                  >
                    <p className="text-sm font-semibold text-foreground">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground">
                      {edu.school} &middot; {edu.gpa}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4 lg:col-span-2"
          >
            {stats.map((stat, i) => (
              <BentoTilt key={stat.label}>
                <div className="glass flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center">
                  <span className="text-white text-3xl font-bold sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
                </div>
              </BentoTilt>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
