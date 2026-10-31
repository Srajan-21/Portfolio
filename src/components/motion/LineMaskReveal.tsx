"use client";

import React from "react";
import { motion } from "framer-motion";
import { lineMaskContainerVariants, lineMaskItemVariants, EASINGS, DURATIONS } from "@/lib/motion";
import { useCollector } from "@/context/CollectorContext";

interface LineMaskRevealProps {
  lines?: string[];
  children?: React.ReactNode;
  className?: string;
  lineClassName?: string;
  delay?: number;
  threshold?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
}

export function LineMaskReveal({
  lines,
  children,
  className = "",
  lineClassName = "",
  delay = 0,
  threshold = 0.2,
  as: Component = "div",
}: LineMaskRevealProps) {
  const { reduceMotion } = useCollector();

  if (reduceMotion) {
    return (
      <Component className={className}>
        {lines ? (
          lines.map((line, idx) => (
            <span key={idx} className={`block ${lineClassName}`}>
              {line}
            </span>
          ))
        ) : (
          children
        )}
      </Component>
    );
  }

  if (lines && lines.length > 0) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: threshold }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {lines.map((line, idx) => (
          <div key={idx} className="overflow-hidden">
            <motion.span
              variants={lineMaskItemVariants}
              className={`block ${lineClassName}`}
            >
              {line}
            </motion.span>
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: "110%", opacity: 0.001 }}
      whileInView={{ y: "0%", opacity: 1 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration: DURATIONS.slow,
        ease: EASINGS.editorial,
        delay,
      }}
      className={`overflow-hidden ${className}`}
    >
      <div className={lineClassName}>{children}</div>
    </motion.div>
  );
}
