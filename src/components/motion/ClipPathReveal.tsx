"use client";

import React from "react";
import { motion } from "framer-motion";
import { clipPathRevealVariants } from "@/lib/motion";
import { useCollector } from "@/context/CollectorContext";

interface ClipPathRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export function ClipPathReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.2,
}: ClipPathRevealProps) {
  const { reduceMotion } = useCollector();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={{
        hidden: clipPathRevealVariants.hidden,
        visible: {
          ...clipPathRevealVariants.visible,
          transition: {
            ...clipPathRevealVariants.visible.transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
