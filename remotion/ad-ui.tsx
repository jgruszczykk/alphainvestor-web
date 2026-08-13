import type { CSSProperties } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, fontFamily } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function rand(i: number) {
  const x = Math.sin(i * 127.1 + 43.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Word-by-word kinetic type with spring overshoot. */
export function Kinetic({
  text,
  delay = 0,
  size = 88,
  color = C.heading,
  weight = 800,
  stagger = 4,
  style,
}: {
  text: string;
  delay?: number;
  size?: number;
  color?: string;
  weight?: number;
  stagger?: number;
  style?: CSSProperties;
}) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-end", fontSize: size, rowGap: "0.14em", fontFamily, ...style }}>
      {words.map((w, i) => {
        const s = spring({ frame: f - delay - i * stagger, fps, config: { damping: 12, stiffness: 200, mass: 0.7 } });
        const y = interpolate(s, [0, 1], [70, 0]);
        const sc = interpolate(s, [0, 1], [0.7, 1]);
        return (
          <span key={i} style={{ display: "inline-block", marginRight: "0.26em", fontSize: size, fontWeight: weight, letterSpacing: -1.5, color, lineHeight: 1.02, opacity: s, transform: `translateY(${y}px) scale(${sc})` }}>
            {w}
          </span>
        );
      })}
    </div>
  );
}

/** Strobe flash overlay at given local frames. */
export function Flash({ at, color = "#ffffff", peak = 0.85, len = 5 }: { at: number; color?: string; peak?: number; len?: number }) {
  const f = useCurrentFrame();
  const op = interpolate(f, [at, at + 1, at + len], [0, peak, 0], clamp);
  return <AbsoluteFill style={{ background: color, opacity: op, pointerEvents: "none" }} />;
}

const TICKERS = [
  { s: "AAPL", d: "+2.4%", up: true }, { s: "TSLA", d: "-5.1%", up: false }, { s: "NVDA", d: "+7.8%", up: true },
  { s: "BTC", d: "-3.2%", up: false }, { s: "MSFT", d: "+1.1%", up: true }, { s: "AMD", d: "-4.6%", up: false },
  { s: "META", d: "+3.9%", up: true }, { s: "SPY", d: "-0.8%", up: false }, { s: "ETH", d: "+5.5%", up: true },
  { s: "AMZN", d: "-2.0%", up: false }, { s: "GOOGL", d: "+0.6%", up: true }, { s: "COIN", d: "-8.3%", up: false },
  { s: "PLTR", d: "+9.1%", up: true }, { s: "XTB", d: "-1.4%", up: false },
];

/**
 * Chaotic ticker storm for the hook. `converge` (0..1) pulls chips toward the
 * centre and fades them for the turn.
 */
export function HookChaos({ converge = 0 }: { converge?: number }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {TICKERS.map((t, i) => {
        const baseX = rand(i) * 900 + 40;
        const baseY = rand(i + 99) * 1700 + 80;
        const cx = interpolate(converge, [0, 1], [baseX, 500]);
        const cy = interpolate(converge, [0, 1], [baseY, 950]);
        const drift = Math.sin((f + i * 20) / 14) * 14;
        const flick = 0.55 + 0.45 * Math.abs(Math.sin((f + i * 13) / 6));
        const rot = (rand(i + 7) - 0.5) * 22;
        const sc = interpolate(converge, [0, 1], [1, 0.3]) * (0.8 + rand(i + 3) * 0.5);
        const op = interpolate(converge, [0, 1], [flick, 0]) * interpolate(f, [0, 6], [0, 1], clamp);
        const col = t.up ? C.gain : C.loss;
        return (
          <div key={i} style={{ position: "absolute", left: cx, top: cy + drift, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`, opacity: op, fontFamily, whiteSpace: "nowrap", padding: "10px 20px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: `1px solid ${col}55` }}>
            <span style={{ fontSize: 34, fontWeight: 800, color: "#fff" }}>{t.s}</span>
            <span style={{ fontSize: 30, fontWeight: 700, color: col, marginLeft: 12 }}>{t.d}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

/** Reusable big pill (used in CTA). */
export function Pill({ children, kind = "brand" }: { children: React.ReactNode; kind?: "brand" | "dark" }) {
  const bg = kind === "brand" ? `linear-gradient(180deg,${C.brandHi},${C.brand})` : "#0a0f1c";
  return (
    <div style={{ padding: "28px 54px", borderRadius: 999, fontSize: 42, fontWeight: 700, color: "#fff", background: bg, border: kind === "dark" ? "1px solid rgba(255,255,255,0.2)" : "none", boxShadow: kind === "brand" ? "0 24px 60px -18px rgba(10,132,255,0.6)" : "0 20px 50px -20px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", gap: 16, fontFamily }}>
      {children}
    </div>
  );
}

/* ---- White point that collapses in then bursts to fill the frame ---- */
export function WhitePoint({ growStart, growEnd }: { growStart: number; growEnd: number }) {
  const f = useCurrentFrame();
  const r = interpolate(f, [growStart, growStart + 6, growEnd], [0, 26, 2100], { ...clamp, easing: (t) => t * t });
  const glow = interpolate(f, [growStart - 10, growStart], [0, 1], clamp);
  const op = interpolate(f, [growEnd, growEnd + 10], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none", opacity: op }}>
      <div style={{ width: r, height: r, borderRadius: 9999, background: "#fff", boxShadow: `0 0 ${80 * glow}px ${40 * glow}px rgba(255,255,255,0.85)` }} />
    </AbsoluteFill>
  );
}

/* ---- Bright "wealth" world: LIVE scrolling market action ---- */
function LiveCandles({ seed = 0, n = 7 }: { seed?: number; n?: number }) {
  const f = useCurrentFrame();
  const cw = 30;
  return (
    <svg width={n * cw} height={160}>
      {Array.from({ length: n }).map((_, i) => {
        const up = rand(i * 3 + seed) > 0.42;
        const top = 34 + rand(i + seed) * 40;
        const bh = 26 + rand(i + 5 + seed) * 55 + Math.sin((f + i * 8 + seed * 20) / 7) * 12;
        const col = up ? "#16a34a" : "#dc2626";
        return (
          <g key={i} transform={`translate(${i * cw + 10},0)`}>
            <line x1={6} y1={top - 14} x2={6} y2={top + bh + 14} stroke={col} strokeWidth={2} />
            <rect x={0} y={top} width={12} height={Math.max(6, bh)} rx={2} fill={col} />
          </g>
        );
      })}
    </svg>
  );
}
function TrendLine({ seed = 0, w = 300 }: { seed?: number; w?: number }) {
  const f = useCurrentFrame();
  const h = 130;
  const pts = 6;
  const d = Array.from({ length: pts })
    .map((_, i) => {
      const x = (i / (pts - 1)) * w;
      const y = h * (0.88 - (i / (pts - 1)) * 0.62) + Math.sin(f / 8 + i * 1.3 + seed) * 10;
      return `${i ? "L" : "M"} ${x.toFixed(0)} ${y.toFixed(0)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h}>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="#16a34a" opacity={0.08} />
      <path d={d} fill="none" stroke="#16a34a" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Tick({ seed = 0 }: { seed?: number }) {
  const f = useCurrentFrame();
  const up = rand(seed + 1) > 0.28;
  const v = 2 + Math.abs(Math.sin(f / 9 + seed)) * 34 + rand(seed) * 12;
  return <span style={{ fontSize: 56, fontWeight: 800, color: up ? "#16a34a" : "#0f172a", fontFamily, whiteSpace: "nowrap" }}>{up ? "+" : ""}{v.toFixed(1)}%</span>;
}

const LANES = [
  { y: 200, speed: 1.1, dir: -1, items: ["line", "candles", "tick", "candles", "line"] },
  { y: 460, speed: 1.6, dir: 1, items: ["tick", "line", "candles", "tick", "candles"] },
  { y: 1370, speed: 1.3, dir: -1, items: ["candles", "tick", "line", "candles", "tick"] },
  { y: 1650, speed: 1.9, dir: 1, items: ["line", "tick", "candles", "tick", "line"] },
];

function Motif({ it, seed }: { it: string; seed: number }) {
  return it === "line" ? <TrendLine seed={seed} /> : it === "candles" ? <LiveCandles seed={seed} /> : <Tick seed={seed} />;
}

export function WhiteWorld({ appear }: { appear: number }) {
  const f = useCurrentFrame();
  const laneW = 1500;
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#ffffff,#eef3fb)", opacity: appear, overflow: "hidden" }}>
      {LANES.map((lane, li) => {
        const shift = (f * lane.speed) % laneW;
        const tx = lane.dir < 0 ? -shift : shift - laneW;
        const cell = laneW / lane.items.length;
        return (
          <div key={li} style={{ position: "absolute", top: lane.y, left: 0, width: laneW * 2, display: "flex", transform: `translateX(${tx}px)`, opacity: 0.28 * appear }}>
            {[0, 1].map((rep) =>
              lane.items.map((it, i) => (
                <div key={`${rep}-${i}`} style={{ width: cell, display: "flex", justifyContent: "center", alignItems: "center", transform: `scale(${0.8 + rand(li * 10 + i) * 0.5})` }}>
                  <Motif it={it} seed={li * 7 + i} />
                </div>
              )),
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

/**
 * A hero element that springs OUT of the phone, grows in the bright world,
 * then snaps back toward the phone as the scene ends.
 */
export function PopOut({ children, dur, dx = 0, dy = -430 }: { children: React.ReactNode; dur: number; dx?: number; dy?: number }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inS = spring({ frame: f - 6, fps, config: { damping: 12, stiffness: 130, mass: 0.8 } });
  const outT = interpolate(f, [dur - 14, dur], [0, 1], clamp);
  const prog = inS * (1 - outT);
  const scale = interpolate(prog, [0, 1], [0.15, 1]);
  const tx = dx * prog;
  const ty = dy * prog;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ transform: `translate(${tx}px, ${ty}px) scale(${scale})`, opacity: interpolate(prog, [0, 0.2], [0, 1], clamp) }}>{children}</div>
    </AbsoluteFill>
  );
}
