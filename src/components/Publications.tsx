"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, ExternalLink, CheckCircle } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { publication } from "@/data/portfolio";

export default function Publications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="publications" className="relative px-6 py-32" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground"
        >
          Published Research
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-center font-heading text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {publication.title.split(":")[0]}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SpotlightCard
            className="p-8 md:p-12"
            spotlightColor="rgba(0, 229, 255, 0.08)"
          >
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-foreground/50" />
                <span className="text-sm font-medium text-foreground/70">
                  {publication.journal}
                </span>
              </div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 text-xs text-emerald-400 font-mono">
                {publication.status}
              </span>
            </div>

            {/* Title */}
            <h3 className="mb-3 text-xl font-bold md:text-2xl">
              {publication.title}
            </h3>
            <p className="mb-2 text-sm text-muted-foreground font-mono">
              {publication.authors}
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              {publication.description}
            </p>

            {/* Key findings */}
            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              {publication.keyFindings.map((finding, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-400/70" />
                  <span className="text-sm text-muted-foreground">{finding}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 transition-all hover:text-foreground hover:border-foreground/20 hover:bg-foreground/5"
            >
              Read Paper <ExternalLink size={14} />
            </a>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
