"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, Trophy, BookOpen } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { education } from "@/data/portfolio";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="education" className="relative px-6 py-32" ref={ref} data-peeks='[{"msg":"4.0 GPA at Brown — not bad right?","s":"r","y":"40%"},{"msg":"Ask me about his thesis!","s":"l","y":"55%"},{"msg":"History degree is actually useful for AI","s":"r","y":"30%"}]'>
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center font-heading text-4xl font-bold tracking-tight sm:text-5xl text-foreground"
        >
          Education
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-center text-muted-foreground"
        >
          Brown University &middot; Providence, RI
        </motion.p>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
            >
              <SpotlightCard className="h-full p-6">
                {/* Header */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                    <GraduationCap size={12} />
                    {idx === 0 ? "Graduate" : "Undergraduate"}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {edu.period}
                    </span>
                    <span className="rounded-md border border-border bg-foreground/[0.03] px-2 py-0.5 text-xs font-mono text-foreground/70">
                      {edu.gpa}
                    </span>
                  </div>
                </div>

                {/* Achievements */}
                {"achievements" in edu && edu.achievements && (
                  <div className="mb-4">
                    <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                      <Trophy size={11} />
                      Highlights
                    </div>
                    <ul className="space-y-1">
                      {edu.achievements.map((a) => (
                        <li key={a} className="text-sm text-muted-foreground leading-relaxed">
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Coursework */}
                {"coursework" in edu && edu.coursework && (
                  <div>
                    <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                      <BookOpen size={11} />
                      Key Coursework
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((c) => (
                        <span
                          key={c}
                          className="rounded-md border border-border bg-foreground/[0.03] px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
