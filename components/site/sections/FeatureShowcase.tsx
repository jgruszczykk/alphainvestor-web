"use client";

import type { ReactNode } from "react";
import { PhoneFrame } from "@/components/site/phone/PhoneFrame";
import { Reveal } from "./shared";

/**
 * Apple-style flagship feature section: big alternating image/copy block
 * with a stat callout for credibility. Reused across the deep-dive sections
 * (Scanner, Compare, Alpha Score, Optimizer, News) so each only supplies its
 * own phone screen + copy, not a whole new layout.
 */
export function FeatureShowcase({
  id,
  eyebrow,
  eyebrowColor = "var(--brand-soft)",
  title,
  body,
  stat,
  statLabel,
  bullets,
  reverse = false,
  screen,
}: {
  id?: string;
  eyebrow: string;
  eyebrowColor?: string;
  title: string;
  body: string;
  stat?: string;
  statLabel?: string;
  bullets?: string[];
  reverse?: boolean;
  screen: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-20">
      <div className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${reverse ? "" : ""}`}>
        <Reveal className={`mx-auto w-full max-w-[280px] ${reverse ? "lg:order-2" : "lg:order-1"}`}>
          <PhoneFrame>{screen}</PhoneFrame>
        </Reveal>

        <div className={reverse ? "lg:order-1" : "lg:order-2"}>
          <span className="eyebrow" style={{ color: eyebrowColor }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: eyebrowColor }} />
            {eyebrow}
          </span>
          <Reveal>
            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--heading)] sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)]">{body}</p>
          </Reveal>

          {stat && (
            <Reveal delay={0.1} className="mt-7 flex items-baseline gap-3">
              <span className="text-4xl font-bold tracking-tight text-[var(--heading)] sm:text-5xl">{stat}</span>
              {statLabel && <span className="text-sm text-[var(--muted)]">{statLabel}</span>}
            </Reveal>
          )}

          {bullets && (
            <ul className="mt-7 space-y-2.5">
              {bullets.map((b, i) => (
                <Reveal key={b} delay={0.06 * i}>
                  <li className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-soft)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-1 shrink-0">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {b}
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
