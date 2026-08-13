"use client";

import { motion, useInView } from "motion/react";
import { type ReactNode, useRef } from "react";

/** Fade + rise into view on scroll (respects reduced motion via CSS/motion). */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 20,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignClass}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--heading)] sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">{sub}</p>}
    </Reveal>
  );
}
