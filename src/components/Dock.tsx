"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Github, Linkedin, Mail, FileText, User, Briefcase, Code, MessageCircle } from "lucide-react";

const items = [
  { icon: User, href: "#about", label: "About" },
  { icon: Briefcase, href: "#experience", label: "Experience" },
  { icon: Code, href: "#projects", label: "Projects" },
  { icon: MessageCircle, href: "#contact", label: "Contact" },
  { icon: Github, href: "https://github.com/nikolaitennant", label: "GitHub", external: true },
  { icon: Linkedin, href: "https://www.linkedin.com/in/nikolai-tennant/", label: "LinkedIn", external: true },
  { icon: Mail, href: "mailto:nikolaitennant@gmail.com", label: "Email" },
  { icon: FileText, href: "/resume.pdf", label: "Resume", external: true },
];

function DockItem({ mouseX, item }: { mouseX: MotionValue<number>; item: typeof items[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const size = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 70, 40]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  const iconScale = useSpring(
    useTransform(size, [40, 70], [1, 1.4]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className="rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center backdrop-blur-md hover:bg-white/[0.1] transition-colors"
    >
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className="flex items-center justify-center w-full h-full text-white/50 hover:text-white transition-colors"
        aria-label={item.label}
      >
        <motion.div style={{ scale: iconScale }}>
          <Icon size={16} />
        </motion.div>
      </a>
    </motion.div>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-3 rounded-2xl bg-black/60 border border-white/[0.06] backdrop-blur-xl px-4 pb-3 pt-3 shadow-2xl"
      >
        {items.map((item) => (
          <DockItem key={item.label} mouseX={mouseX} item={item} />
        ))}
      </motion.div>
    </motion.div>
  );
}
