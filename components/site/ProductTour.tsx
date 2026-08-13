"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { PhoneFrame } from "@/components/site/phone/PhoneFrame";
import {
  AllocationScreen,
  InstrumentScreen,
  WalletValueScreen,
} from "@/components/site/phone/screens";
import type { getSiteContent } from "@/content/site";

type Content = ReturnType<typeof getSiteContent>;

// Free-tier features only — Five Lenses and AI Insight are Pro, showcased
// together in their own dedicated section (see AlphaPro.tsx), not duplicated
// here in the free guided tour.
const SCREENS = [WalletValueScreen, AllocationScreen, InstrumentScreen];

export function ProductTour({ tour }: { tour: Content["tour"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const steps = tour.steps.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // Map 0..1 across the section into a step index, with a little bias so the
    // first/last steps get a full beat.
    const idx = Math.min(steps - 1, Math.max(0, Math.floor(p * steps * 0.999)));
    setActive(idx);
  });

  return (
    <section id="tour" ref={sectionRef} className="relative" style={{ height: `${steps * 90 + 40}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
          {/* Copy column */}
          <div className="order-2 lg:order-1">
            <span className="eyebrow">{tour.eyebrow}</span>
            <h2 className="mt-4 max-w-lg text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--heading)] sm:text-3xl lg:text-4xl">
              {tour.title}
            </h2>

            <div className="mt-8 space-y-2">
              {tour.steps.map((step, i) => {
                const on = i === active;
                return (
                  <button
                    key={step.tag}
                    type="button"
                    onClick={() => {
                      const el = sectionRef.current;
                      if (!el) return;
                      const top = el.offsetTop + (el.offsetHeight - window.innerHeight) * ((i + 0.5) / steps);
                      window.scrollTo({ top, behavior: "smooth" });
                    }}
                    className="block w-full rounded-2xl border p-4 text-left transition-all duration-300"
                    style={{
                      borderColor: on ? "color-mix(in srgb, var(--brand) 40%, transparent)" : "var(--border)",
                      background: on ? "color-mix(in srgb, var(--brand) 8%, transparent)" : "transparent",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors"
                        style={{
                          background: on ? "var(--brand)" : "rgba(148,163,184,0.14)",
                          color: on ? "#fff" : "var(--muted)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: on ? "var(--brand-soft)" : "var(--faint)" }}>
                        {step.tag}
                      </span>
                    </div>
                    <h3 className={`mt-3 text-lg font-semibold transition-colors ${on ? "text-[var(--heading)]" : "text-[var(--muted)]"}`}>
                      {step.title}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
                    </motion.div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phone column */}
          <div className="order-1 mx-auto w-full max-w-[260px] lg:order-2 lg:max-w-[300px]">
            <div className="relative">
              {SCREENS.map((Screen, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ pointerEvents: i === active ? "auto" : "none" }}
                >
                  <PhoneFrame glow={i === active}>
                    <Screen play={i === active} />
                  </PhoneFrame>
                </motion.div>
              ))}
              {/* spacer to give the absolute stack its height */}
              <div className="invisible">
                <PhoneFrame glow={false}>
                  <WalletValueScreen play={false} />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
