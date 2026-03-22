"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const contactLinks = [
  {
    label: "Email",
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    value: personalInfo.email,
  },
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    icon: Linkedin,
    value: "nikolai-tennant",
  },
  {
    label: "GitHub",
    href: personalInfo.github,
    icon: Github,
    value: "nikolaitennant",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="contact" className="relative px-4 py-32" ref={ref}>
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          Get in <span className="text-white">touch</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-lg text-muted-foreground"
        >
          Open to opportunities in AI engineering, research collaborations, and
          interesting conversations.
        </motion.p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {contactLinks.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="glass group flex w-full items-center gap-3 rounded-xl px-6 py-4 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] sm:w-auto"
            >
              <link.icon size={18} className="text-primary" />
              <span className="text-sm text-muted-foreground">{link.value}</span>
              <ArrowUpRight
                size={14}
                className="ml-auto text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
