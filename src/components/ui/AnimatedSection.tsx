"use client";

import { type TargetAndTransition, motion } from "framer-motion";

type AnimationVariant = "fade-up" | "fade-left" | "fade-right" | "scale-up" | "blur-in";

const variantMap: Record<AnimationVariant, { initial: TargetAndTransition; animate: TargetAndTransition }> = {
  "fade-up": {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  "fade-left": {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  "fade-right": {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  "scale-up": {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
  },
  "blur-in": {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  variant = "fade-up",
}: AnimatedSectionProps) {
  const { initial, animate } = variantMap[variant];

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
