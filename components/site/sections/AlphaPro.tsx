"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { PhoneFrame } from "@/components/site/phone/PhoneFrame";
import { PortfolioInsightScreen } from "@/components/site/phone/screens";
import type { getSiteContent } from "@/content/site";
import { Reveal } from "./shared";

type Content = ReturnType<typeof getSiteContent>;

const TONE: Record<string, string> = { loss: "var(--loss)", amber: "var(--amber)", gain: "var(--gain)" };

/**
 * The single, unified showcase for everything behind the paywall — AI
 * portfolio insight AND the five-lens scoring model live in one section, not
 * scattered across the page next to the free-tier guided tour. Sold as the
 * "analyst in your pocket" that turns real data into confident decisions.
 */
export function AlphaPro({ ai, lenses }: { ai: Content["ai"]; lenses: Content["lenses"] }) {
  const lensRef = useRef<HTMLDivElement>(null);
  const lensInView = useInView(lensRef, { once: true, margin: "-15% 0px" });

  return (
    <section id="lenses" className="relative overflow-hidden py-20 lg:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(191,90,242,0.35), transparent 65%)", filter: "blur(60px)" }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal className="order-2 mx-auto w-full max-w-[280px] lg:order-1">
          <PhoneFrame>
            <PortfolioInsightScreen />
          </PhoneFrame>
        </Reveal>

        <div className="order-1 lg:order-2">
          <span className="eyebrow" style={{ color: "var(--ai-soft)", borderColor: "color-mix(in srgb, var(--ai) 35%, transparent)" }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--ai)" }} />
            {ai.eyebrow}
          </span>
          <Reveal>
            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl lg:text-4xl">
              <span className="gradient-text-ai">{ai.title}</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)]">{ai.sub}</p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {ai.bullets.map((b, i) => (
              <Reveal key={b} delay={0.08 * i}>
                <li className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "color-mix(in srgb, var(--ai) 20%, transparent)", color: "var(--ai-soft)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {b}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Five Lenses — the scoring model behind the insight above, folded
          into the same Pro story instead of living as its own disconnected
          section. */}
      <div className="relative mx-auto mt-20 max-w-4xl px-4 sm:px-6 lg:mt-28">
        <Reveal className="text-center">
          <h3 className="text-xl font-bold leading-tight tracking-[-0.02em] text-[var(--heading)] sm:text-2xl">{lenses.title}</h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">{lenses.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div ref={lensRef} className="glass-strong rounded-3xl p-6 sm:p-8">
            <div className="space-y-5">
              {lenses.items.map((lens, i) => {
                const color = TONE[lens.tone];
                return (
                  <div key={lens.name}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-[var(--heading)]">{lens.name}</span>
                      <span className="text-sm font-bold" style={{ color }}>{lens.score}/5</span>
                    </div>
                    <div className="mt-1 text-xs text-[var(--muted)]">{lens.label}</div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        animate={{ width: lensInView ? `${(lens.score / 5) * 100}%` : 0 }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-md text-center text-xs text-[var(--faint)]">{lenses.footnote}</p>
        <p className="mx-auto mt-2 max-w-md text-center text-xs leading-relaxed text-[var(--faint)]">{ai.disclaimer}</p>
      </div>
    </section>
  );
}
