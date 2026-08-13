"use client";

/**
 * Faithful, lightweight reproductions of the iOS app's building blocks,
 * rendered as pure HTML/SVG so they can animate on scroll / entrance.
 * Colours come from the app-accurate CSS vars in globals.css (--app-*,
 * --gain, --sector-*), so the mockups read as the real product.
 */

import { motion, useInView, useSpring, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Status bar + tab bar                                               */
/* ------------------------------------------------------------------ */

export function StatusBar({ time = "9:41" }: { time?: string }) {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-white">
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden>
          <path d="M8 2.2c2.4 0 4.6.9 6.2 2.4l1.3-1.4A11 11 0 0 0 8 .2 11 11 0 0 0 .5 3.2l1.3 1.4A9 9 0 0 1 8 2.2Z" />
          <path d="M8 5.6c1.4 0 2.7.5 3.7 1.4l1.3-1.4A7 7 0 0 0 8 3.6a7 7 0 0 0-5 1.9l1.3 1.5A5.4 5.4 0 0 1 8 5.6Z" />
          <path d="M8 8.8 10.2 6.6A3.2 3.2 0 0 0 8 5.8a3.2 3.2 0 0 0-2.2.8L8 8.8Z" />
        </svg>
        {/* battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="2" y="2" width="18" height="8" rx="1.6" fill="currentColor" />
          <rect x="23" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

type Tab = { id: string; label: string; active?: boolean };

export function TabBar({ tabs }: { tabs: Tab[] }) {
  const icons: Record<string, ReactNode> = {
    wallet: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 3a9 9 0 1 0 9 9h-9V3Z" opacity="0.9" />
        <path d="M13 2.05V11h8.95A9 9 0 0 0 13 2.05Z" opacity="0.55" />
      </svg>
    ),
    watchlist: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path strokeLinejoin="round" d="m12 3 2.6 5.4 6 .9-4.3 4.2 1 6-5.3-2.8L6.7 19.5l1-6L3.4 9.3l6-.9L12 3Z" />
      </svg>
    ),
    news: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path strokeLinecap="round" d="M7 9h6M7 13h10M7 17h10" />
      </svg>
    ),
    settings: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M19.4 13.5a7.9 7.9 0 0 0 .1-3l1.7-1.3-1.7-3-2 .8a7.8 7.8 0 0 0-2.6-1.5L12.6 2h-3.4l-.4 2.5A7.8 7.8 0 0 0 6.2 6l-2-.8-1.7 3L4.2 9.5a7.9 7.9 0 0 0 0 3l-1.7 1.3 1.7 3 2-.8c.8.6 1.6 1.1 2.6 1.5l.4 2.5h3.4l.4-2.5c1-.4 1.8-.9 2.6-1.5l2 .8 1.7-3-1.7-1.3Z" />
      </svg>
    ),
  };

  return (
    <>
      {/* iOS-style bottom scrim: fades content to black behind the floating
          tab bar instead of a hard clip. Sits below the pill (z-10 vs z-20),
          non-interactive. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.7) 40%, transparent)" }}
        aria-hidden
      />
      {/* Absolute overlay — floats ON TOP of the scrolled content (which
          fills the full screen height, see ScreenScroll's pb-24), not a flex
          sibling that reserves its own space and leaves content stopping
          short above it. */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-4 pt-1.5">
        <div
          className="flex items-center justify-around gap-0.5 rounded-[20px] p-1"
          style={{
            // Lighter than the real app's near-black ground truth (~rgb(27))
            // so the pill still reads as a distinct glass element, but dialed
            // back from an earlier too-light pass toward a believable dark
            // "elevated surface" tint.
            background: "linear-gradient(165deg, rgba(100,100,108,0.5), rgba(72,72,78,0.46))",
            border: "0.5px solid rgba(255,255,255,0.18)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22), 0 10px 24px -14px rgba(0,0,0,0.6)",
            backdropFilter: "blur(24px) saturate(1.8)",
            WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          }}
        >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-[15px] py-1"
            style={{
              color: tab.active ? "var(--brand)" : "rgba(235,235,245,0.5)",
              background: tab.active ? "rgba(255,255,255,0.08)" : "transparent",
            }}
          >
            <span style={{ display: "block", width: 17, height: 17 }}>{icons[tab.id]}</span>
            <span className="text-[8px] font-medium leading-none">{tab.label}</span>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Segment control (1W / 1M / …)                                      */
/* ------------------------------------------------------------------ */

export function SegmentControl({
  options,
  activeIndex = 0,
}: {
  options: string[];
  activeIndex?: number;
}) {
  return (
    // Equal-width grid columns (not a left-packed flex row) so the pills
    // span the full card width with symmetric edge margins regardless of
    // each label's text width.
    <div className="grid w-full gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((opt, i) => (
        <span
          key={opt}
          className="rounded-full px-2 py-1 text-center text-[10px] font-semibold"
          style={
            i === activeIndex
              ? {
                  background: "linear-gradient(180deg, var(--brand-hover), var(--brand))",
                  color: "#fff",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 10px -3px rgba(10,132,255,0.65)",
                }
              : {
                  background: "linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0.05))",
                  color: "rgba(235,235,245,0.88)",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }
          }
        >
          {opt}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Count-up number (spring), triggered when in view                   */
/* ------------------------------------------------------------------ */

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  play = true,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const spring = useSpring(0, { stiffness: 60, damping: 18, mass: 1 });
  const display = useTransform(spring, (v) =>
    // Real app groups thousands with a space ("1 098"), not a comma — see
    // public/marketing/screens/wallet-value.png.
    `${prefix}${v
      .toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      .replace(/,/g, " ")}${suffix}`,
  );

  useEffect(() => {
    if (inView && play) spring.set(value);
  }, [inView, play, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Line chart (draws itself in)                                       */
/* ------------------------------------------------------------------ */

export function LineChart({
  points,
  width = 300,
  height = 130,
  color = "var(--gain)",
  refLineY,
  play = true,
}: {
  points: [number, number][]; // normalized 0..1 (x,y); y=0 top
  width?: number;
  height?: number;
  color?: string;
  refLineY?: number; // 0..1
  play?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const px = (p: [number, number]) => [p[0] * width, p[1] * height] as const;
  const d = points
    .map((p, i) => {
      const [x, y] = px(p);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const areaD = `${d} L ${width} ${height} L 0 ${height} Z`;
  const drawn = inView && play;

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="lc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" y1={g * height} x2={width} y2={g * height} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {typeof refLineY === "number" && (
        <line x1="0" y1={refLineY * height} x2={width} y2={refLineY * height} stroke="var(--brand)" strokeWidth="1.5" strokeOpacity="0.9" />
      )}
      <motion.path
        d={areaD}
        fill="url(#lc-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: drawn ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Donut / ring gauge                                                 */
/* ------------------------------------------------------------------ */

export function RingGauge({
  value,
  label,
  size = 92,
  color = "var(--amber)",
  play = true,
}: {
  value: number; // 0..100
  label?: string;
  size?: number;
  color?: string;
  play?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const r = size / 2 - 7;
  const c = 2 * Math.PI * r;
  const drawn = inView && play;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: drawn ? c * (1 - value / 100) : c }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[18px] font-bold leading-none text-white">
          <CountUp value={value} play={play} />
        </span>
        {label && <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wide" style={{ color }}>{label}</span>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Segmented allocation bar                                            */
/* ------------------------------------------------------------------ */

export function SectorBar({
  segments,
  play = true,
}: {
  segments: { pct: number; color: string }[];
  play?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/5">
      {segments.map((s, i) => (
        <motion.div
          key={i}
          style={{ background: s.color }}
          initial={{ width: 0 }}
          animate={{ width: inView && play ? `${s.pct}%` : 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 + i * 0.08 }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App card + section header                                          */
/* ------------------------------------------------------------------ */

export function AppCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[16px] p-3.5 ${className}`}
      style={{
        // iOS 26 GlassView(regular) tinted with iosColors.dark.groupedBackground
        // (#1c1c1e) — near-flat charcoal fill, matching the real app's actual
        // card look. A diagonal gradient reads fine on short KPI tiles but
        // visibly smears/stretches on tall multi-row cards (Five Lenses) —
        // keep the fill essentially flat and let the 1px inset highlight
        // carry the "glass" cue instead.
        background: "#1c1c1eeb",
        border: "1px solid #3f3f46",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 26px -16px rgba(0,0,0,0.75)",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
      }}
    >
      {children}
    </div>
  );
}

export function useEntrance() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  return { ref, inView };
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-white/[0.08] px-2 py-0.5 text-[8px] font-medium text-white/60">
      {children}
    </span>
  );
}

/* Small hook: reveal booleans for staggered content when a screen mounts. */
export function useMountedDelay(delay = 0): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(id);
  }, [delay]);
  return on;
}

/* ------------------------------------------------------------------ */
/* Detail-screen header: back + centered title + right icon           */
/* (grid = wallet switcher, share = export). Push/detail screens only —  */
/* tab-root screens use HeaderRow's grid+plus pattern instead.        */
/* ------------------------------------------------------------------ */

const shareIconPath = "M12 3v12M7 8l5-5 5 5M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3";
const gridIconRects = [
  [3, 3], [14, 3], [3, 14], [14, 14],
] as const;

export function DetailHeaderRow({ title, right = "share" }: { title: string; right?: "share" | "grid" }) {
  return (
    <div className="flex items-center justify-between px-4 pt-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md text-white/70">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </div>
      <span className="text-[13px] font-semibold">{title}</span>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md text-white/70">
        {right === "share" ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d={shareIconPath} />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            {gridIconRects.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="7" height="7" rx="1.6" />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
