"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data/portfolio";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const allSkills = Object.entries(skills);

  return (
    <section className="relative px-6 py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center font-heading text-4xl font-bold tracking-tight sm:text-5xl text-foreground"
        >
          Skills
        </motion.h2>

        {/* Each category is a horizontal flowing row */}
        <div className="space-y-12">
          {allSkills.map(([category, items], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: catIdx % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + catIdx * 0.12 }}
            >
              {/* Category label */}
              <div className="mb-4 flex items-center gap-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  {category}
                </span>
                <div className="flex-1 h-px bg-foreground/[0.04]" />
              </div>

              {/* Skill tags — flowing horizontal */}
              <div className="flex flex-wrap gap-3">
                {items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + catIdx * 0.1 + i * 0.06,
                    }}
                    className="group relative rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:border-foreground/20 hover:bg-foreground/[0.04] cursor-default"
                  >
                    {skill}
                    {/* Subtle glow on hover */}
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-foreground/[0.02] blur-sm" />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
