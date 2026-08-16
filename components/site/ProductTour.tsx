"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { PhoneFrame } from "@/components/site/phone/PhoneFrame";
import {
  AllocationScreen,
  InstrumentScreen,
  WalletKpiScreen,
  WalletValueScreen,
} from "@/components/site/phone/screens";
import { InstrumentOverviewScreen } from "@/components/site/phone/moreScreens";
import type { getSiteContent } from "@/content/site";

type Content = ReturnType<typeof getSiteContent>;

// Free-tier features only — Five Lenses and AI Insight are Pro, showcased
// together in their own dedicated section (see AlphaPro.tsx), not duplicated
// here in the free guided tour.
const SCREENS = [WalletValueScreen, AllocationScreen, WalletKpiScreen, InstrumentOverviewScreen, InstrumentScreen];

export function ProductTour({ tour }: { tour: Content["tour"] }) {
  const steps = tour.steps.length;

  return (
    <section id="tour" className="relative">
      <MobileTour tour={tour} />
      <DesktopTour tour={tour} steps={steps} />
    </section>
  );
}

/** Mobile: a native horizontal scroll-snap carousel, one full-width card per
 * step, natural document height. Deliberately NOT a vertical scroll-jacked
 * pin like desktop — that approach relied on `dvh`, which tracks Mobile
 * Safari's address bar as it shows/hides. Mid-pin, the bar can toggle and
 * shrink the sticky container out from under content that was laid out for
 * a taller state, clipping it. A horizontal carousel has no viewport-height
 * dependency at all, so there's nothing for the browser chrome to break. */
function MobileTour({ tour }: { tour: Content["tour"] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const steps = tour.steps.length;

  const handleScroll = () => {
    const el = carouselRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    // Cards are narrower than the container (neighbors peek at the edges —
    // see the width/padding below) so the step size is card width + gap,
    // not the container's own clientWidth.
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const step = first.offsetWidth + gap;
    const idx = Math.round(el.scrollLeft / step);
    setActive(Math.min(steps - 1, Math.max(0, idx)));
  };

  return (
    <div className="lg:hidden">
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <span className="eyebrow">{tour.eyebrow}</span>
        <h2 className="mt-4 max-w-lg text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--heading)]">
          {tour.title}
        </h2>
      </div>

      <div className="mt-8 flex items-center gap-2 px-4">
        {tour.steps.map((step, i) => (
          <span
            key={step.tag}
            className="h-1.5 flex-1 rounded-full transition-colors duration-300"
            style={{ background: i === active ? "var(--brand)" : "var(--border)" }}
            aria-hidden
          />
        ))}
      </div>

      <div
        ref={carouselRef}
        onScroll={handleScroll}
        // Cards are narrower than the viewport (86%) with matching side
        // padding, so the next/previous card visibly peeks in at both
        // edges — the standard "this is a carousel, swipe me" cue. Without
        // it a single edge-to-edge card reads as a static screen.
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[7%] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tour.steps.map((step, i) => {
          const Screen = SCREENS[i];
          const on = i === active;
          return (
            <div
              key={step.tag}
              className="w-[86%] flex-none snap-center transition-opacity duration-300"
              style={{ opacity: on ? 1 : 0.4 }}
            >
              <div className="mx-auto w-full max-w-[220px]">
                <PhoneFrame glow={on}>
                  <Screen play={on} />
                </PhoneFrame>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: "var(--brand)", color: "#fff" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand-soft)" }}>
                    {step.tag}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[var(--heading)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Desktop: sticky-pinned tour, scroll position drives the active step.
 * Unaffected by the mobile browser-chrome/dvh issue above — desktop browsers
 * don't have a collapsing address bar eating into the viewport mid-scroll. */
function DesktopTour({ tour, steps }: { tour: Content["tour"]; steps: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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
    <div
      ref={sectionRef}
      // Per-step scroll distance — tightened from 90vh (felt slow).
      className="relative hidden [--tour-step:65vh] lg:block"
      style={{ height: `calc(${steps} * var(--tour-step) + 40vh)` }}
    >
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
                      setActive(i);
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
          <div className="order-1 mx-auto w-full max-w-[300px] lg:order-2">
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
    </div>
  );
}
