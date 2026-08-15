"use client";

/**
 * Faithful HTML/SVG reproductions of four hero app screens, used across the
 * landing (hero + scroll tour). Chrome text stays in the product's own UI
 * language (English) since these depict the actual app.
 */

import { motion } from "motion/react";
import { useState } from "react";
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

// A full year's worth of movement — a flat, choppy accumulation phase that
// breaks out into an accelerating (exponential-feeling) climb, rather than a
// steady linear grind. Real ups/downs layered on top, not a smooth curve.
const WALLET_POINTS: [number, number][] = [
  [0, 0.88], [0.08, 0.91], [0.15, 0.9], [0.22, 0.84], [0.3, 0.79], [0.38, 0.78], [0.46, 0.77],
  [0.55, 0.69], [0.63, 0.58], [0.72, 0.47], [0.8, 0.39], [0.88, 0.29], [0.94, 0.19], [1, 0.06],
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
            <div className="flex justify-end text-[9px] text-white/40">159 100</div>
            <div className="h-[110px]">
              <LineChart points={WALLET_POINTS} refLineY={WALLET_POINTS[WALLET_POINTS.length - 1][1]} play={play} />
            </div>
            <div className="flex justify-end text-[9px] text-white/40">123 700</div>
            <div className="mt-1 flex items-center justify-between text-[9px]">
              <span className="text-white/40">May 2025</span>
              <span className="font-semibold" style={{ color: "var(--brand)" }}>144 660.23 USD</span>
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
            <div className="mt-1 whitespace-nowrap text-[12px] font-bold" style={{ color: "var(--gain)" }}>
              ≈ <CountUp value={18701} play={play} /> USD
            </div>
          </AppCard>
          <AppCard>
            <div className="flex items-center justify-between text-[10px] text-white/45">
              <span>Total P/L %</span>
              <InfoDot />
            </div>
            <div className="mt-1 whitespace-nowrap text-[13px] font-bold" style={{ color: "var(--gain)" }}>
              <CountUp value={12.48} decimals={2} play={play} />%
            </div>
          </AppCard>
        </div>

        <AppCard className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-white/45">
            <span>Market value</span>
            <InfoDot />
          </div>
          <div className="mt-1 whitespace-nowrap text-[16px] font-bold">
            <CountUp value={168492.23} decimals={2} play={play} /> USD
          </div>
        </AppCard>

        <AppCard className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-white/45">
            <span>Cost basis</span>
            <InfoDot />
          </div>
          <div className="mt-1 whitespace-nowrap text-[16px] font-bold">
            <CountUp value={149791.23} decimals={2} play={play} /> USD
          </div>
        </AppCard>
      </ScreenScroll>
      <TabBar tabs={TABS} />
    </div>
  );
}

/* ============================ Allocation ============================ */
/* Real data traced from a live "Portfolio" screenshot: grouping is BY WALLET
   (real accounts: IKE, PLN, USD, mBank, IBKR, Metals, Crypto — not a generic
   "Long Term Portfolio"), then BY ASSET CLASS with a "By sector" toggle, then
   Largest Holdings carrying both a company-name subtitle and a wallet chip. */

const WALLETS = [
  { name: "IKE", pct: 40, color: "var(--gain)" },
  { name: "PLN", pct: 22, color: "var(--brand)" },
  { name: "USD", pct: 13, color: "var(--amber)" },
  { name: "mBank", pct: 13, color: "var(--ai)" },
  { name: "IBKR", pct: 5, color: "#ff375f" },
  { name: "Metals", pct: 4, color: "#64d2ff" },
  { name: "Crypto", pct: 3, color: "#5e5ce6" },
];

const ASSET_CLASSES = [
  { name: "Stock", pct: 73, color: "var(--gain)" },
  { name: "ETF", pct: 20, color: "var(--brand)" },
  { name: "Commodity", pct: 4, color: "var(--amber)" },
  { name: "forex", pct: 3, color: "var(--ai)" },
];

const HOLDINGS = [
  { sym: "CSPX.UK", pct: 10, wallet: "IKE", name: "Core S&P 500" },
  { sym: "PKN.PL", pct: 6, wallet: "IKE", name: "Orlen" },
  { sym: "MSFT.US", pct: 6, wallet: "IKE", name: "Microsoft" },
];

export function AllocationScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <HeaderRow title="Portfolio" />
      <ScreenScroll>
        <AppCard className="mt-2">
          <div className="text-[12px] font-bold tracking-wide">ALLOCATION</div>

          <div className="mt-3 text-[9px] font-semibold text-white/40">BY WALLET</div>
          <div className="mt-1.5">
            <SectorBar segments={WALLETS.map((w) => ({ pct: w.pct, color: w.color }))} play={play} />
          </div>
          <div className="mt-2 space-y-1.5">
            {WALLETS.map((w) => (
              <div key={w.name} className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1.5 text-white/75">
                  <i className="h-2 w-2 rounded-full" style={{ background: w.color }} /> {w.name}
                </span>
                <span className="text-white/50">{w.pct}%</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-[9px] font-semibold">
            <span className="text-white/40">BY ASSET CLASS</span>
            <span style={{ color: "var(--brand)" }}>By sector</span>
          </div>
          <div className="mt-1.5">
            <SectorBar segments={ASSET_CLASSES.map((a) => ({ pct: a.pct, color: a.color }))} play={play} />
          </div>
          <div className="mt-2 space-y-1.5">
            {ASSET_CLASSES.map((a) => (
              <div key={a.name} className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1.5 text-white/75">
                  <i className="h-2 w-2 rounded-full" style={{ background: a.color }} /> {a.name}
                </span>
                <span className="text-white/50">{a.pct}%</span>
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
                    <Chip>{h.wallet}</Chip>
                    <span className="text-[11px] font-semibold text-white/70">{h.pct}%</span>
                  </div>
                </div>
                <div className="text-[9px] text-white/40">{h.name}</div>
              </div>
            ))}
          </div>
        </AppCard>
      </ScreenScroll>
      <TabBar tabs={TABS} />
    </div>
  );
}

/* ============================ Wallet KPI detail ============================ */
/* Real data traced from a live "Portfolio" screenshot, scrolled past the
   allocation card: Health Score reads 100/Healthy here (a well-diversified
   demo wallet), a currency selector, and the full KPI tile set — several of
   which (Assets value, YTD, YTD%, 1d%, Wallets, Positions) don't exist
   anywhere in the earlier Wallet screen at all. */

type KpiEntry = { label: string; value: number; decimals?: number; prefix?: string; suffix?: string; color?: string };

const KPI_TILES_2COL: KpiEntry[] = [
  { label: "Total P/L", value: 21027, prefix: "≈ ", color: "var(--gain)" },
  { label: "Total P/L %", value: 20.64, decimals: 2, suffix: "%", color: "var(--gain)" },
];
const KPI_TILES_2COL_B: KpiEntry[] = [
  { label: "Cash balance", value: 14338 },
  { label: "Market value", value: 137217 },
];
const KPI_TILES_2COL_C: KpiEntry[] = [
  { label: "YTD", value: 7559, prefix: "≈ ", color: "var(--gain)" },
  { label: "YTD %", value: 6.56, decimals: 2, suffix: "%", color: "var(--gain)" },
];
const KPI_TILES_3COL: KpiEntry[] = [
  { label: "1d %", value: 0.34, decimals: 2, prefix: "+", suffix: "%" },
  { label: "Wallets", value: 7 },
  { label: "Positions", value: 104 },
];

function KpiTile({ label, value, decimals = 0, prefix = "", suffix = "", color = "#fff", play = true }: KpiEntry & { play?: boolean }) {
  return (
    <AppCard>
      <div className="flex items-center justify-between text-[9px] text-white/45">
        <span>{label}</span>
        <InfoDot />
      </div>
      <div className="mt-1 whitespace-nowrap text-[14px] font-bold" style={{ color }}>
        <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} play={play} />
      </div>
    </AppCard>
  );
}

export function WalletKpiScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <HeaderRow title="Portfolio" />
      <ScreenScroll>
        <AppCard className="mt-2 flex items-center gap-4">
          <RingGauge value={100} label="Healthy" color="var(--gain)" play={play} />
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-[12px] font-bold tracking-wide">
              <span style={{ color: "var(--loss)", fontSize: "18px", lineHeight: 1 }}>♥</span> HEALTH SCORE
            </div>
            <p className="mt-1 text-[10px] leading-snug text-white/55">
              Excellent balance—your portfolio looks ideally spread. Recheck after big rallies in top names.
            </p>
          </div>
        </AppCard>

        <AppCard className="mt-3 flex flex-row items-center justify-between">
          <span className="text-[11px] text-white/60">Portfolio display currency</span>
          <span className="flex items-center gap-1 text-[13px] font-bold">PLN <span className="text-white/40">⌄</span></span>
        </AppCard>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {KPI_TILES_2COL.map((tile) => (
            <KpiTile key={tile.label} {...tile} play={play} />
          ))}
        </div>

        <div className="mt-3">
          <KpiTile label="Assets value" value={122879} play={play} />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {KPI_TILES_2COL_B.map((tile) => (
            <KpiTile key={tile.label} {...tile} play={play} />
          ))}
        </div>

        <div className="mt-3">
          <KpiTile label="Cost basis" value={101852} play={play} />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {KPI_TILES_2COL_C.map((tile) => (
            <KpiTile key={tile.label} {...tile} play={play} />
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {KPI_TILES_3COL.map((tile) => (
            <AppCard key={tile.label} className="p-2.5">
              <div className="text-[8px] text-white/45">{tile.label}</div>
              <div className="mt-1 whitespace-nowrap text-[11px] font-bold text-white">
                <CountUp value={tile.value} decimals={tile.decimals ?? 0} prefix={tile.prefix ?? ""} suffix={tile.suffix ?? ""} play={play} />
              </div>
            </AppCard>
          ))}
        </div>
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

// "Structure" (real GOOGL.US data: insufficient — moving averages missing)
// is deliberately left out of this marketing showcase. The score is real
// and accurate, but an empty "—" row reads as broken/unfinished next to
// scored pillars in a feature highlight; the full 4-lens set (including
// Structure and an unconfirmed Volume) still exists in the real app.
const LENSES: { name: string; score: number; tone: "loss" | "amber" | "gain" | "muted"; label: string; icon: string; desc: string }[] = [
  { name: "Trend", score: 2, tone: "loss", label: "Weak", icon: "trend", desc: "GOOGL.US: 1M -4.4% · session -3.8% → “weak”. Pressure shows in the window and today, not just one print." },
  { name: "Levels", score: 3, tone: "amber", label: "Mid-range", icon: "levels", desc: "GOOGL.US: Price 343.80 · support 314.90 · resistance 384.48 → “mid-range”. Levels are prior stalls, not guarantees. Breaks need follow-through, bounces need confirmation." },
];

const LENS_ICONS: Record<string, ReactNode> = {
  trend: <path d="M4 15l5-5 4 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
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
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
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
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
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

const RANGE_OPTIONS = ["1W", "1M", "3M", "1Y", "5Y"] as const;
type InstrumentRange = (typeof RANGE_OPTIONS)[number];

// Per-range price series (normalized 0..1 x/y, y=0 top) + the summary stats
// shown above the chart. All series converge on the same "now" price
// (163.14) — only the lookback window and historical shape change.
const RANGE_DATA: Record<InstrumentRange, {
  points: [number, number][];
  high: string;
  low: string;
  changeAbs: string;
  changePct: string;
  dateLeft: string;
  dateRight: string;
}> = {
  "1W": {
    points: [[0, 0.42], [0.15, 0.5], [0.3, 0.38], [0.45, 0.44], [0.6, 0.3], [0.75, 0.34], [0.88, 0.18], [1, 0.06]],
    high: "165.80", low: "158.20",
    changeAbs: "+3.10", changePct: "+1.94%",
    dateLeft: "5 Aug", dateRight: "12 Aug",
  },
  "1M": {
    points: [[0, 0.62], [0.1, 0.7], [0.2, 0.55], [0.3, 0.6], [0.4, 0.48], [0.5, 0.52], [0.6, 0.4], [0.7, 0.36], [0.8, 0.28], [0.9, 0.2], [1, 0.06]],
    high: "166.40", low: "150.10",
    changeAbs: "+9.80", changePct: "+6.39%",
    dateLeft: "12 Jul", dateRight: "12 Aug",
  },
  "3M": {
    points: [[0, 0.74], [0.1, 0.68], [0.2, 0.72], [0.3, 0.6], [0.4, 0.64], [0.5, 0.5], [0.6, 0.46], [0.7, 0.38], [0.8, 0.32], [0.9, 0.18], [1, 0.06]],
    high: "167.90", low: "128.30",
    changeAbs: "+28.40", changePct: "+21.08%",
    dateLeft: "May 2026", dateRight: "Aug 2026",
  },
  "1Y": {
    points: [
      [0, 0.86], [0.06, 0.72], [0.12, 0.78], [0.18, 0.66], [0.24, 0.7], [0.3, 0.58], [0.36, 0.62],
      [0.42, 0.5], [0.48, 0.54], [0.54, 0.44], [0.6, 0.46], [0.66, 0.36], [0.72, 0.32], [0.78, 0.38],
      [0.84, 0.26], [0.9, 0.22], [0.95, 0.16], [1, 0.06],
    ],
    high: "163.90", low: "71.51",
    changeAbs: "+91.20", changePct: "+128.4%",
    dateLeft: "Aug 2025", dateRight: "Aug 2026",
  },
  "5Y": {
    points: [[0, 0.94], [0.08, 0.9], [0.16, 0.86], [0.24, 0.82], [0.32, 0.78], [0.4, 0.7], [0.48, 0.64], [0.56, 0.56], [0.64, 0.46], [0.72, 0.36], [0.8, 0.26], [0.88, 0.16], [1, 0.06]],
    high: "180.20", low: "12.40",
    changeAbs: "+142.30", changePct: "+680.5%",
    dateLeft: "2021", dateRight: "2026",
  },
};

function MiniVolume({ seed = 0, play = true }: { seed?: number; play?: boolean }) {
  const bars = Array.from({ length: 40 }).map((_, i) => 6 + ((i * (37 + seed * 5) + seed * 11) % 29));
  return (
    <svg viewBox="0 0 400 34" className="h-[34px] w-full" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={i * 10}
          width="6"
          fill="rgba(255,255,255,0.32)"
          initial={{ height: 0, y: 34 }}
          animate={play ? { height: h, y: 34 - h } : { height: 0, y: 34 }}
          transition={{ duration: 0.5, delay: i * 0.012, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

function MiniLine({ color, seed = 0, play = true }: { color: string; seed?: number; play?: boolean }) {
  const pts = Array.from({ length: 30 }).map((_, i) => 17 + Math.sin(i / 2.6 + seed) * 12 * (((i * 53) % 17) / 17 + 0.4));
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${((i / (pts.length - 1)) * 400).toFixed(1)} ${(34 - v).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 400 34" className="h-[34px] w-full" preserveAspectRatio="none">
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
    </svg>
  );
}

function MiniHist({ seed = 0, play = true }: { seed?: number; play?: boolean }) {
  const bars = Array.from({ length: 40 }).map((_, i) => ({ v: Math.sin(i / 4.2 + seed) * (((i * 29) % 13) / 13 * 0.7 + 0.3), up: Math.sin(i / 4.2 + seed) >= 0 }));
  return (
    <svg viewBox="0 0 400 28" className="h-[28px] w-full" preserveAspectRatio="none">
      {bars.map((b, i) => {
        const h = Number((Math.abs(b.v) * 13).toFixed(2));
        return (
          <motion.rect
            key={i}
            x={i * 10}
            width="6"
            fill={b.up ? "var(--gain)" : "var(--loss)"}
            initial={{ height: 0, y: 14 }}
            animate={play ? { height: h, y: b.up ? 14 - h : 14 } : { height: 0, y: 14 }}
            transition={{ duration: 0.5, delay: i * 0.012, ease: "easeOut" }}
          />
        );
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
  const [rangeIndex, setRangeIndex] = useState(3); // 1Y — matches the real screenshot's default
  const range = RANGE_OPTIONS[rangeIndex];
  const data = RANGE_DATA[range];

  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <DetailHeaderRow title="NVDA.US" right="share" />
      <div className="flex-1 overflow-hidden px-4 pt-2">
        <h1 className="text-[18px] font-bold tracking-tight">NVIDIA Corp.</h1>

        <AppCard className="mt-2">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold tracking-wide">CHART</div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.08] text-[9px] text-white/50">?</span>
          </div>
          <div className="mt-2">
            <SegmentControl options={[...RANGE_OPTIONS]} activeIndex={rangeIndex} onSelect={setRangeIndex} />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[12px] font-bold" style={{ color: "var(--gain)" }}>{data.changeAbs} ({data.changePct})</span>
            <span className="text-[9px] text-white/40">↑ past {range}</span>
          </div>
          <div className="text-[8px] text-white/35">Closed: 12 Aug at 02:00 · Disclaimer</div>

          <div className="mt-2 rounded-xl border border-white/[0.06] p-2">
            <div className="flex justify-end text-[9px] text-white/40">{data.high}</div>
            <div key={range} className="h-[100px]">
              <LineChart points={data.points} color="var(--gain)" refLineY={data.points[data.points.length - 1][1]} play={play} />
            </div>
            <div className="flex justify-end text-[9px] text-white/40">{data.low}</div>
            <div className="mt-1 flex items-center justify-between text-[9px]">
              <span className="text-white/40">{data.dateLeft}</span>
              <span className="font-semibold" style={{ color: "var(--brand)" }}>163.14</span>
              <span className="text-white/40">{data.dateRight}</span>
            </div>
          </div>

          <MiniRow label="Volume" value=""><MiniVolume key={`vol-${range}`} seed={rangeIndex} play={play} /></MiniRow>
          <MiniRow label="RSI (14)" value="62.0"><MiniLine key={`rsi-${range}`} color="var(--brand)" seed={rangeIndex} play={play} /></MiniRow>
          <MiniRow label="MACD (12,26,9)" value="+2.155"><MiniHist key={`macd-${range}`} seed={rangeIndex} play={play} /></MiniRow>

          <div className="mt-3 rounded-xl border p-2.5" style={{ background: "rgba(10,132,255,0.08)", borderColor: "rgba(10,132,255,0.25)" }}>
            <div className="text-[10px] leading-snug text-white/85">
              <span style={{ color: "var(--brand)" }}>💡 </span>
              NVDA.US: RSI 62 · MACD histogram +2.155 → &ldquo;orderly upside&rdquo; momentum, no exhaustion signal yet.
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
