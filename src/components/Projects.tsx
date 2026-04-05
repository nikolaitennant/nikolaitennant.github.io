"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Code, Brain, Eye } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { projects } from "@/data/portfolio";

const icons = [Code, Brain, Eye];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" className="relative px-6 py-32" ref={ref} data-peeks='[{"msg":"RAG Scholar AI is his proudest side project","s":"r","y":"50%"},{"msg":"0.96 AUC on SenID — impressive","s":"l","y":"40%"},{"msg":"225 people in that hackathon!","s":"r","y":"60%"}]'>
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-heading text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Projects
        </motion.h2>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-4">
          {projects.map((project, idx) => {
            const Icon = icons[idx % icons.length];
            // Make first card span more columns
            const area = idx === 0
              ? "md:[grid-area:1/1/2/7]"
              : idx === 1
              ? "md:[grid-area:1/7/2/13]"
              : "md:[grid-area:2/1/3/13]";

            return (
              <motion.li
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
                className={`min-h-[14rem] list-none ${area}`}
              >
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                      <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                          {project.title}
                        </h3>
                        <p className="text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-2">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                            <Github size={14} /> Code
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                            <ExternalLink size={14} /> Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
