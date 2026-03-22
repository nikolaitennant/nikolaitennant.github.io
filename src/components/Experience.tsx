"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { experience } from "@/data/portfolio";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" className="relative px-4 py-32" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-heading text-4xl font-bold tracking-tight sm:text-5xl"
        >
          <span className="text-white">Experience</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] top-0 h-full w-[2px] bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

          <div className="space-y-12">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                className="relative flex gap-6"
              >
                {/* Node */}
                <div className="relative z-10 mt-1.5">
                  <div className="h-4 w-4 rounded-full border-2 border-background bg-white shadow-[0_0_12px_rgba(255,255,255,0.2)]" />
                </div>

                {/* Card */}
                <div className="glass flex-1 rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                  <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <div className="flex items-center gap-1.5 text-sm text-primary">
                        <Briefcase size={14} />
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/50 bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
