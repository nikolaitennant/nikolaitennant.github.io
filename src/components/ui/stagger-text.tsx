"use client";

import React, { useRef } from "react";
import { motion, useInView, type Transition, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "top" | "bottom" | "left" | "right" | "z";

const transformVariants = (direction?: Direction) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : 0,
    scale: direction === "z" ? 0 : 1,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
});

function Word({
  word,
  transition = { ease: [0.25, 0.1, 0.25, 1], duration: 0.5 },
  direction = "bottom",
}: {
  word: string;
  transition?: Transition;
  direction?: Direction;
}) {
  return (
    <span className="inline-block text-nowrap align-top">
      {word.split("").map((char, index) => (
        <span key={index} className="inline-block">
          <motion.span
            className="inline-block"
            variants={transformVariants(direction)}
            transition={transition}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface StaggerTextProps extends HTMLMotionProps<"div"> {
  text: string;
  stagger?: number;
  transition?: Transition;
  direction?: Direction;
  className?: string;
}

export function StaggerText({
  text,
  stagger = 0.03,
  transition,
  direction = "bottom",
  className,
  ...props
}: StaggerTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      transition={{ staggerChildren: stagger }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("relative", className)}
      {...props}
    >
      {text.split(" ").map((word, index) => (
        <React.Fragment key={index}>
          <Word transition={transition} direction={direction} word={word} />
          {index < text.split(" ").length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.div>
  );
}
