"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, ExternalLink, CheckCircle } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { publication } from "@/data/portfolio";

export default function Publications() {
  return (
    <section id="publications" className="relative overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mb-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-4 text-sm uppercase tracking-widest text-muted-foreground"
            >
              Published Research
            </motion.p>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-white">{publication.title.split(":")[0]}</span>
            </h2>
          </div>
        }
      >
        {/* Publication content inside the 3D scroll card */}
        <div className="flex h-full flex-col justify-between p-6 md:p-10">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">{publication.journal}</span>
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                {publication.status}
              </span>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
              {publication.title}
            </h3>
            <p className="mb-2 text-sm text-muted-foreground">{publication.authors}</p>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              {publication.description}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {publication.keyFindings.map((finding, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={14} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              Read Paper <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
