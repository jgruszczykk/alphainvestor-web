"use client";

/**
 * Faithful HTML/SVG reproductions of four hero app screens, used across the
 * landing (hero + scroll tour). Chrome text stays in the product's own UI
 * language (English) since these depict the actual app.
 */

import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  AppCard,
  Chip,
  CountUp,
  DetailHeaderRow,
  LineChart,
  RingGauge,
  SectorBar,
  SegmentControl,
  StatusBar,
  TabBar,
} from "./primitives";

const TABS = [
  { id: "wallet", label: "Wallet", active: true },
  { id: "watchlist", label: "Watchlist" },
  { id: "news", label: "News" },
  { id: "settings", label: "Settings" },
];

function ScreenScroll({ children }: { children: ReactNode }) {
  // pb-24 so the last card sits above the floating tab bar's visual area
  // instead of being clipped by it — the tab bar is an absolute overlay
  // (see TabBar in primitives.tsx), not a flex sibling that reserves space.
  return <div className="flex-1 overflow-hidden px-4 pt-1 pb-24">{children}</div>;
}

function InfoDot() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className="text-white/35">
      <circle cx="12" cy="12" r="9.5" />
      <path strokeLinecap="round" d="M12 11v5.5M12 8v.01" />
    </svg>
  );
}

function HeaderRow({ title, big = false }: { title: string; big?: boolean }) {
  return (
    <div className="flex items-center justify-between px-1 pt-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md text-white/70">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <rect x="3" y="3" width="7" height="7" rx="1.6" />
          <rect x="14" y="3" width="7" height="7" rx="1.6" />
          <rect x="3" y="14" width="7" height="7" rx="1.6" />
          <rect x="14" y="14" width="7" height="7" rx="1.6" />
        </svg>
      </div>
      {!big && <span className="text-[12px] font-semibold text-white">{title}</span>}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md text-white/70">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
    </div>
  );
}

/* ============================ Wallet value ============================ */

// A full year's worth of movement — genuine ups/downs, not a gentle dip.
const WALLET_POINTS: [number, number][] = [
  [0, 0.78], [0.08, 0.68], [0.15, 0.82], [0.22, 0.6], [0.3, 0.66], [0.38, 0.42], [0.46, 0.5],
  [0.55, 0.3], [0.63, 0.38], [0.72, 0.2], [0.8, 0.28], [0.88, 0.12], [0.94, 0.18], [1, 0.06],
];

export function WalletValueScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <HeaderRow title="Wallet" big />
      <div className="px-4 pt-1">
        <h1 className="text-[24px] font-bold tracking-tight">Wallet</h1>
      </div>
      <ScreenScroll>
        <AppCard className="mt-2">
          <div className="text-[12px] font-bold tracking-wide">WALLET VALUE</div>
          <div className="mt-0.5 text-[10px] text-white/45">Historical portfolio value for 1Y.</div>
          <div className="mt-3">
            <SegmentControl options={["1W", "1M", "3M", "1Y", "5Y"]} activeIndex={3} />
          </div>
          <div className="mt-3 rounded-xl border border-white/[0.06] p-2">
            <div className="flex justify-end text-[9px] text-white/40">9 340</div>
            <div className="h-[110px]">
              <LineChart points={WALLET_POINTS} refLineY={0.78} play={play} />
            </div>
            <div className="flex justify-end text-[9px] text-white/40">7 260</div>
            <div className="mt-1 flex items-center justify-between text-[9px]">
              <span className="text-white/40">May 2025</span>
              <span className="font-semibold" style={{ color: "var(--brand)" }}>8 492.23 USD</span>
              <span className="text-white/40">May 2026</span>
            </div>
          </div>
          <div className="mt-2 text-[8px] leading-tight text-white/35">
            Market data may be delayed and is for informational purposes only.
          </div>
        </AppCard>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <AppCard>
            <div className="flex items-center justify-between text-[10px] text-white/45">
              <span>Total P/L</span>
              <InfoDot />
            </div>
            <div className="mt-1 text-[15px] font-bold" style={{ color: "var(--gain)" }}>
              ≈ <CountUp value={1098} play={play} /> USD
            </div>
          </AppCard>
          <AppCard>
            <div className="flex items-center justify-between text-[10px] text-white/45">
              <span>Total P/L %</span>
              <InfoDot />
            </div>
            <div className="mt-1 text-[15px] font-bold" style={{ color: "var(--gain)" }}>
              <CountUp value={12.48} decimals={2} play={play} />%
            </div>
          </AppCard>
        </div>

        <AppCard className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-white/45">
            <span>Market value</span>
            <InfoDot />
          </div>
          <div className="mt-1 text-[18px] font-bold">
            <CountUp value={9890.34} decimals={2} play={play} /> USD
          </div>
        </AppCard>

        <AppCard className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-white/45">
            <span>Cost basis</span>
            <InfoDot />
          </div>
          <div className="mt-1 text-[18px] font-bold">
            <CountUp value={8792.34} decimals={2} play={play} /> USD
          </div>
        </AppCard>
      </ScreenScroll>
      <TabBar tabs={TABS} />
    </div>
  );
}

/* ============================ Allocation ============================ */

const SECTORS = [
  { name: "Technology", pct: 68, color: "var(--sector-1)", label: "68%" },
  { name: "Financial Services", pct: 14, color: "var(--sector-2)", label: "14%" },
  { name: "Consumer Defensive", pct: 11, color: "var(--sector-3)", label: "11%" },
  { name: "Real Estate", pct: 4, color: "var(--sector-4)", label: "4%" },
  { name: "Energy", pct: 2, color: "var(--sector-5)", label: "2%" },
  { name: "Consumer Cyclical", pct: 1, color: "var(--sector-6)", label: "<1%" },
];

const HOLDINGS = [
  { sym: "ADBE", pct: 39 },
  { sym: "ASML", pct: 14 },
  { sym: "COKE", pct: 11 },
];

export function AllocationScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <HeaderRow title="Wallet" />
      <ScreenScroll>
        <AppCard className="mt-2 flex items-center gap-4">
          <RingGauge value={50} label="Watch" color="var(--amber)" play={play} />
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-[12px] font-bold tracking-wide">
              <span style={{ color: "var(--loss)" }}>♥</span> HEALTH SCORE
            </div>
            <p className="mt-1 text-[10px] leading-snug text-white/55">
              Stretched: a few names can move the whole profile — worth a quick “what if” check.
            </p>
          </div>
        </AppCard>

        <AppCard className="mt-3">
          <div className="text-[12px] font-bold tracking-wide">ALLOCATION</div>

          <div className="mt-3 text-[9px] font-semibold text-white/40">BY PORTFOLIO</div>
          <div className="mt-1.5">
            <SectorBar segments={[{ pct: 100, color: "var(--sector-5)" }]} play={play} />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5 text-white/75">
              <i className="h-2 w-2 rounded-sm" style={{ background: "var(--sector-5)" }} /> Long Term Portfolio
            </span>
            <span className="text-white/50">100%</span>
          </div>

          <div className="mt-4 text-[9px] font-semibold text-white/40">BY SECTOR</div>
          <div className="mt-1.5">
            <SectorBar segments={SECTORS.map((s) => ({ pct: s.pct, color: s.color }))} play={play} />
          </div>
          <div className="mt-2 space-y-1.5">
            {SECTORS.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1.5 text-white/75">
                  <i className="h-2 w-2 rounded-sm" style={{ background: s.color }} /> {s.name}
                </span>
                <span className="text-white/50">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-[9px] font-semibold text-white/40">LARGEST HOLDINGS</div>
          <div className="mt-2 space-y-2">
            {HOLDINGS.map((h) => (
              <div key={h.sym}>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold">{h.sym}</span>
                  <div className="flex items-center gap-2">
                    <Chip>Long Term Portfolio</Chip>
                    <span className="text-[11px] font-semibold text-white/70">{h.pct}%</span>
                  </div>
                </div>
                <div className="text-[9px] text-white/40">{h.sym}</div>
              </div>
            ))}
          </div>
        </AppCard>
      </ScreenScroll>
      <TabBar tabs={TABS} />
    </div>
  );
}

/* ============================ Technical Lenses ============================ */
/* Real data traced from a live GOOGL.US screenshot: this is the
   INSTRUMENT-level lens set (Trend/Structure/Levels/Volume…) — a different,
   separate taxonomy from the wallet-level Portfolio Insight pillars above.
   Insufficient-data lenses render "—" instead of a score, matching the app. */

function LensMeter({ score, colorOverride }: { score: number | null; colorOverride?: string }) {
  if (score === null) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: "rgba(255,255,255,0.12)" }} />
          ))}
        </div>
        <span className="text-[10px] font-bold text-white/40">—</span>
      </div>
    );
  }
  const color = colorOverride ?? (score <= 2 ? "var(--loss)" : score === 3 ? "var(--amber)" : "var(--gain)");
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-[3px]"
            style={{ background: i <= score ? color : "rgba(255,255,255,0.12)" }}
          />
        ))}
      </div>
      <span className="text-[10px] font-bold" style={{ color }}>{score}/5</span>
    </div>
  );
}

const LENSES: { name: string; score: number | null; tone: "loss" | "amber" | "gain" | "muted"; label: string; icon: string; desc: string }[] = [
  { name: "Trend", score: 2, tone: "loss", label: "Weak", icon: "trend", desc: "GOOGL.US: 1M -4.4% · session -3.8% → “weak”. Pressure shows in the window and today, not just one print." },
  { name: "Structure", score: null, tone: "muted", label: "Insufficient data", icon: "structure", desc: "GOOGL.US: Moving averages missing → “insufficient data”. Need SMA/EMA data to see if price sits above or below its trend rails." },
  { name: "Levels", score: 3, tone: "amber", label: "Mid-range", icon: "levels", desc: "GOOGL.US: Price 343.80 · support 314.90 · resistance 384.48 → “mid-range”. Levels are prior stalls, not guarantees. Breaks need follow-through, bounces need confirmation." },
];

const LENS_ICONS: Record<string, ReactNode> = {
  trend: <path d="M4 15l5-5 4 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  structure: <path d="M4 16l4-3 3 2 4-6 5 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  levels: <path d="M7 17 17 7M17 7h-6M17 7v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
};

const TONE_COLOR: Record<string, string> = { loss: "var(--loss)", amber: "var(--amber)", gain: "var(--gain)", muted: "rgba(235,235,245,0.4)" };

export function TechnicalLensesScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <DetailHeaderRow title="GOOGL.US" right="share" />
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <div
          className="rounded-[20px] border p-4"
          style={{ background: "color-mix(in srgb, var(--ai) 9%, var(--app-card))", borderColor: "color-mix(in srgb, var(--ai) 30%, transparent)" }}
        >
          <div className="text-[12px] font-bold tracking-wide">SIGNAL READOUT</div>
          <div className="mt-2">
            <span className="inline-block rounded-xl px-3 py-1.5 text-[12px] font-bold" style={{ background: "color-mix(in srgb, var(--amber) 16%, transparent)", color: "var(--amber)" }}>
              Mixed signals
            </span>
          </div>
          <p className="mt-2 text-[10px] leading-snug text-white/80">GOOGL.US shows weak trend signals amid mid-range price levels.</p>
          <p className="mt-1 text-[9px] leading-snug text-white/45">• Neutral momentum suggests potential for cautious observation.</p>
        </div>

        <AppCard className="mt-3">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold tracking-wide">TECHNICAL LENSES</div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.08] text-[9px] text-white/50">?</span>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {LENSES.map((l, idx) => (
              <motion.div
                key={l.name}
                className="py-3 first:pt-2 last:pb-0"
                initial={{ opacity: 0, y: 8 }}
                animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
                    style={{ background: `color-mix(in srgb, ${TONE_COLOR[l.tone]} 18%, transparent)`, color: TONE_COLOR[l.tone] }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>{LENS_ICONS[l.icon]}</svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold">{l.name}</span>
                      <LensMeter score={l.score} />
                    </div>
                    <div className="mt-0.5 text-[10px] font-medium text-white/60">{l.label}</div>
                    <p className="mt-1 text-[9px] leading-snug text-white/45">{l.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
}

/* ============================ AI Portfolio insight ============================ */
/* Real data traced from a live "Portfolio" wallet screenshot: header says
   "Portfolio" (not "Wallet"), pillars are Tape / Diversification /
   Concentration / Breadth / Volatility — a different, wallet-level taxonomy
   from the instrument-level Technical Lenses below. */

const INSIGHT_BULLETS = ["Daily movements indicate a calm market environment."];

const PORTFOLIO_PILLARS = [
  { name: "Tape", score: 4, label: "Risk-on tape", icon: "tape", desc: "Today's book is ~1.00% “weighted wiggle” (big moves in big lines count more). Loudest name PGE.PL 4.89%—just how bumpy, not up or down." },
  { name: "Diversification", score: 5, label: "Well spread", icon: "div", desc: "Diversification score 100/100—higher ≈ more spread-out weights. Lower ≈ a few names can swing the whole wallet." },
  { name: "Concentration", score: 2, label: "Lower concentration", icon: "conc", desc: "Top 3 ≈ 20.0% of value (low in our simple model)—bigger share = more headline risk in a few names." },
  { name: "Breadth", score: 5, label: "Many drivers", icon: "breadth", desc: "Effective ≈26.2 “drivers” from weights, low concentration in any single name." },
];

const PORTFOLIO_ICONS: Record<string, ReactNode> = {
  tape: <path d="M3 12h3l2-6 4 12 3-9 2 5h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  div: <><circle cx="6" cy="6" r="2.2" fill="currentColor" /><circle cx="18" cy="6" r="2.2" fill="currentColor" /><circle cx="12" cy="18" r="2.2" fill="currentColor" /><path d="M7.6 7.4 10.4 16M16.4 7.4 13.6 16M8 6h8" stroke="currentColor" strokeWidth="1.6" /></>,
  conc: <path d="M4 5h16v3H4V5Zm0 5.5h16v3H4v-3ZM4 16h16v3H4v-3Z" fill="currentColor" />,
  breadth: <><rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" /></>,
};

export function PortfolioInsightScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <HeaderRow title="Portfolio" />
      <ScreenScroll>
        <div className="flex items-center justify-between px-1 pt-2">
          <h1 className="text-[15px] font-bold tracking-tight">PORTFOLIO INSIGHT</h1>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.08] text-[9px] text-white/50">?</span>
        </div>

        <div
          className="mt-3 rounded-[20px] border p-4"
          style={{ background: "color-mix(in srgb, var(--ai) 9%, var(--app-card))", borderColor: "color-mix(in srgb, var(--ai) 30%, transparent)" }}
        >
          <div className="mt-1">
            <span
              className="inline-block rounded-xl px-4 py-2 text-[14px] font-bold"
              style={{ background: "color-mix(in srgb, var(--amber) 16%, transparent)", color: "var(--amber)" }}
            >
              Mixed signals
            </span>
          </div>
          <p className="mt-3 text-[10px] leading-snug text-white/80">
            The portfolio exhibits strong diversification with moderate volatility and lower concentration risk.
          </p>
          <div className="mt-3 space-y-2">
            {INSIGHT_BULLETS.map((b, i) => (
              <motion.p
                key={i}
                className="text-[10px] leading-snug text-white/50"
                initial={{ opacity: 0, x: -6 }}
                animate={play ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
              >
                • {b}
              </motion.p>
            ))}
          </div>
        </div>

        <div
          className="mt-3 rounded-[20px] border p-4"
          style={{ background: "color-mix(in srgb, var(--ai) 9%, var(--app-card))", borderColor: "color-mix(in srgb, var(--ai) 30%, transparent)" }}
        >
          <div className="divide-y divide-white/[0.06]">
            {PORTFOLIO_PILLARS.map((p, idx) => (
              <motion.div
                key={p.name}
                className="py-3 first:pt-0"
                initial={{ opacity: 0, y: 8 }}
                animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]" style={{ background: "rgba(74,222,128,0.16)", color: "var(--gain)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>{PORTFOLIO_ICONS[p.icon]}</svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold">{p.name}</span>
                      <LensMeter score={p.score} colorOverride="var(--gain)" />
                    </div>
                    <div className="mt-0.5 text-[10px] font-medium text-white/60">{p.label}</div>
                    <p className="mt-1 text-[9px] leading-snug text-white/45">{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScreenScroll>
      <TabBar tabs={TABS} />
    </div>
  );
}

/* ============================ Instrument (chart + indicators) ============================ */
/* Matches public/marketing/screens/instrument-chart.png: back+symbol+share
   header (no tab bar — this is a push/detail screen), company name, segmented
   range, price/%-change, line chart, then Volume/RSI/MACD stacked below in
   the same card. */

const INSTRUMENT_POINTS: [number, number][] = [
  [0, 0.86], [0.06, 0.72], [0.12, 0.78], [0.18, 0.66], [0.24, 0.7], [0.3, 0.58], [0.36, 0.62],
  [0.42, 0.5], [0.48, 0.54], [0.54, 0.44], [0.6, 0.46], [0.66, 0.36], [0.72, 0.32], [0.78, 0.38],
  [0.84, 0.26], [0.9, 0.22], [0.95, 0.16], [1, 0.06],
];

function MiniVolume() {
  const bars = Array.from({ length: 40 }).map((_, i) => 6 + ((i * 37) % 29));
  return (
    <svg viewBox="0 0 400 34" className="h-[34px] w-full" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <rect key={i} x={i * 10} y={34 - h} width="6" height={h} fill="rgba(255,255,255,0.32)" />
      ))}
    </svg>
  );
}

function MiniLine({ color }: { color: string }) {
  const pts = Array.from({ length: 30 }).map((_, i) => 17 + Math.sin(i / 2.6) * 12 * (((i * 53) % 17) / 17 + 0.4));
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${((i / (pts.length - 1)) * 400).toFixed(1)} ${(34 - v).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 400 34" className="h-[34px] w-full" preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function MiniHist() {
  const bars = Array.from({ length: 40 }).map((_, i) => ({ v: Math.sin(i / 4.2) * (((i * 29) % 13) / 13 * 0.7 + 0.3), up: Math.sin(i / 4.2) >= 0 }));
  return (
    <svg viewBox="0 0 400 28" className="h-[28px] w-full" preserveAspectRatio="none">
      {bars.map((b, i) => {
        const h = Math.abs(b.v) * 13;
        return <rect key={i} x={i * 10} y={b.up ? 14 - h : 14} width="6" height={h} fill={b.up ? "var(--gain)" : "var(--loss)"} />;
      })}
    </svg>
  );
}

function MiniRow({ label, value, children }: { label: string; value: string; children: ReactNode }) {
  return (
    <div className="mt-3">
      {children}
      <div className="mt-1 flex items-center justify-between text-[8px] text-white/40">
        <span>{label}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}

export function InstrumentScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md text-white/70">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 5l-7 7 7 7" /></svg>
        </div>
        <span className="text-[13px] font-semibold">NVDA</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md text-white/70">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 3v12M7 8l5-5 5 5M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" /></svg>
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-4 pt-2">
        <h1 className="text-[18px] font-bold tracking-tight">NVIDIA Corp.</h1>

        <AppCard className="mt-2">
          <SegmentControl options={["1W", "1M", "3M", "1Y", "5Y"]} activeIndex={3} />
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[12px] font-bold" style={{ color: "var(--gain)" }}>+91.20 (+128.4%)</span>
            <span className="text-[9px] text-white/40">↑ past 1Y</span>
          </div>
          <div className="text-[8px] text-white/35">Closed: today at 4:00 PM</div>

          <div className="mt-2 rounded-xl border border-white/[0.06] p-2">
            <div className="flex justify-end text-[9px] text-white/40">163.90</div>
            <div className="h-[100px]">
              <LineChart points={INSTRUMENT_POINTS} color="var(--gain)" refLineY={0.6} play={play} />
            </div>
            <div className="flex justify-end text-[9px] text-white/40">71.51</div>
            <div className="mt-1 flex items-center justify-between text-[9px]">
              <span className="text-white/40">Aug 2025</span>
              <span className="font-semibold" style={{ color: "var(--brand)" }}>163.14</span>
              <span className="text-white/40">Aug 2026</span>
            </div>
          </div>

          <MiniRow label="Volume" value=""><MiniVolume /></MiniRow>
          <MiniRow label="RSI (14)" value="61.4"><MiniLine color="var(--brand)" /></MiniRow>
          <MiniRow label="MACD (12,26,9)" value="0.842"><MiniHist /></MiniRow>
        </AppCard>
      </div>
    </div>
  );
}
