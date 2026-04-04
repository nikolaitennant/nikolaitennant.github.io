"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { personalInfo } from "@/data/portfolio";

const contactLinks = [
  { label: "Email", href: `mailto:${personalInfo.email}`, value: personalInfo.email },
  { label: "LinkedIn", href: personalInfo.linkedin, value: "nikolai-tennant" },
  { label: "GitHub", href: personalInfo.github, value: "nikolaitennant" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="contact" className="relative px-6 py-32" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Left — Evervault card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] border border-border rounded-3xl overflow-hidden"
          >
            <EvervaultCard text="NT" />
          </motion.div>

          {/* Right — contact info */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl font-bold tracking-tight sm:text-5xl text-foreground"
            >
              Get in touch
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              Open to opportunities in AI engineering, research collaborations,
              and interesting conversations.
            </motion.p>

            <div className="space-y-3">
              {contactLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="group flex items-center justify-between border-b border-border py-4 transition-colors hover:border-foreground/[0.12]"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                      {link.label}
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.value}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-foreground/15 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
