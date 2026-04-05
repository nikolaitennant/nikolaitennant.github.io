"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { experience } from "@/data/portfolio";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" className="relative px-6 py-32" ref={ref} data-peeks='[{"msg":"NatureAlpha is his favorite role so far","s":"l","y":"45%"},{"msg":"£829K value at dunnhumby","s":"r","y":"35%"},{"msg":"He loved research at Singh Lab","s":"l","y":"55%"}]'>
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-heading text-4xl font-bold tracking-tight sm:text-5xl text-foreground"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] top-0 h-full w-[2px] bg-gradient-to-b from-foreground/20 via-foreground/5 to-transparent" />

          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                className="relative flex gap-6"
              >
                {/* Node */}
                <div className="relative z-10 mt-6">
                  <div className="h-3 w-3 rounded-full bg-foreground/80 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                </div>

                {/* Card */}
                <SpotlightCard className="flex-1 p-6">
                  <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
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
                        className="rounded-md border border-border bg-foreground/[0.03] px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
