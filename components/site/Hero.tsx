"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { CSSProperties, PointerEvent } from "react";
import { PhoneFrame } from "@/components/site/phone/PhoneFrame";
import { WalletValueScreen } from "@/components/site/phone/screens";
import { PrimaryCta, SecondaryCta } from "@/components/site/PrimaryCta";
import type { getSiteContent } from "@/content/site";

type Content = ReturnType<typeof getSiteContent>;

/** CSS-driven entrance so above-the-fold content paints even before hydration. */
const rise = (delay: number): CSSProperties => ({ animationDelay: `${delay}s` });

export function Hero({ hero, trust, appStore }: { hero: Content["hero"]; trust: Content["trust"]; appStore: Content["appStore"] }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pt-28 pb-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pt-36 lg:pb-16">
      <div className="text-center lg:text-left">
        <span className="eyebrow anim-fade-rise" style={rise(0)}>
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--gain)" }} />
          {hero.eyebrow}
        </span>

        <h1 className="anim-fade-rise mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[var(--heading)] sm:text-5xl lg:text-6xl" style={rise(0.06)}>
          {hero.titleA}
          <br />
          <span className="gradient-text">{hero.titleB}</span>
          <br />
          {hero.titleC}
        </h1>

        <p className="anim-fade-rise mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg lg:mx-0" style={rise(0.12)}>
          {hero.sub}
        </p>

        <div className="anim-fade-rise mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start" style={rise(0.18)}>
          <PrimaryCta label={hero.ctaPrimary} appStore={appStore} />
          <SecondaryCta label={hero.ctaSecondary} href="#tour" />
        </div>

        <p className="anim-fade-rise mt-4 text-xs text-[var(--faint)]" style={rise(0.24)}>
          {hero.note}
        </p>

        <ul className="anim-fade-rise mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--muted)] lg:justify-start" style={rise(0.3)}>
          {trust.items.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gain)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="anim-fade-only relative mx-auto w-full max-w-[300px] [perspective:1200px]"
        style={rise(0.15)}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <motion.div className={reduce ? "" : "anim-float"} style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
          <PhoneFrame>
            <WalletValueScreen />
          </PhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}
