/**
 * The Collector's Edition Motion System
 * 
 * Easing curves, timing constants, and motion variants tailored for an
 * ultra-luxurious, restrained editorial experience.
 * Inspired by museum monographs, fine watchmakers, and high-end editorial archives.
 */

// Silky, deliberate easing curves
export const EASINGS = {
  // Heavy editorial ease: fast initial acceleration, long silky deceleration
  editorial: [0.16, 1, 0.3, 1] as const,
  editorialCss: "cubic-bezier(0.16, 1, 0.3, 1)",

  // Dramatic panel split / curtain reveals
  expoInOut: [0.77, 0, 0.175, 1] as const,
  expoInOutCss: "cubic-bezier(0.77, 0, 0.175, 1)",

  // Gentle presence / fade transitions
  gentle: [0.25, 0.1, 0.25, 1] as const,
  gentleCss: "cubic-bezier(0.25, 0.1, 0.25, 1)",

  // Snappy yet damped for micro-interactions
  snappy: [0.33, 1, 0.68, 1] as const,
  snappyCss: "cubic-bezier(0.33, 1, 0.68, 1)",
};

export const DURATIONS = {
  instant: 0.15,
  fast: 0.35,
  medium: 0.7,
  slow: 1.1,
  deliberate: 1.6,
  curtain: 0.9,
};

/**
 * Text Line-Mask Variants
 * Parent element must have overflow-hidden.
 */
export const lineMaskItemVariants = {
  hidden: {
    y: "115%",
    opacity: 0.001,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.editorial,
    },
  },
};

export const lineMaskContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

/**
 * Surface / Plate Clip-Path Reveal Variants
 * High-end vertical unmasking with subtle scale recovery
 */
export const clipPathRevealVariants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
    scale: 1.08,
    opacity: 0.2,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1.0,
    opacity: 1,
    transition: {
      duration: DURATIONS.deliberate,
      ease: EASINGS.editorial,
    },
  },
};

/**
 * Gentle Fade In Up for Secondary Editorial Metadata
 */
export const fadeInUpVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATIONS.medium,
      ease: EASINGS.editorial,
    },
  },
};

/**
 * Foil Gleam Sweep
 */
export const foilGleamVariants = {
  idle: {
    backgroundPosition: "-200% 0",
  },
  hover: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 1.2,
      ease: EASINGS.gentle,
    },
  },
};
