"use client";

/**
 * Five more accurate/grounded app screens for the Apple-style deep-dive
 * sections. NewsScreen and OptimizerScreen are traced from real screenshots
 * (public/marketing/screens/{news,portfolio-optimizer}.png). Scanner/Compare/
 * AlphaScore have no reference screenshot — built from the exact feature
 * specs in docs/free-vs-pro-v1.md (result counts, metric counts) rather than
 * invented, using the same primitives/tone language already validated
 * against real screens elsewhere in this file set.
 */

import { motion } from "motion/react";
import { AppCard, Chip, DetailHeaderRow, StatusBar } from "./primitives";

const clampReveal = (play: boolean, i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: play ? { opacity: 1, y: 0 } : { opacity: 0 },
  transition: { duration: 0.4, delay: i * 0.07 },
});

/* ============================ News ============================ */

const ARTICLES = [
  {
    title: "Pimco's Stracke Sees Client Diversification Away From US",
    excerpt: "Pimco President Christian Stracke discusses the firm's expansion of its international business. Speaking at the Milken Institute Global Conference in Beverly Hills, Califor…",
    src: "youtube.com",
    time: "2026-05-04 17:02:13",
    grad: "linear-gradient(135deg,#1e3a8a,#0f172a)",
  },
  {
    title: "Markets Look Past War Risks as Earnings Remain Strong",
    excerpt: "S&P 500 Posts Best Month Since November 2020 Despite lingering geopolitical tensions, higher oil prices, and renewed inflation concerns, equities moved higher in April…",
    src: "bloomberg.com",
    time: "2026-05-04 13:44:02",
    grad: "linear-gradient(135deg,#14532d,#022c22)",
  },
  {
    title: "Fed Officials Signal Patience on Rate Cuts Through Q3",
    excerpt: "Several regional presidents reiterated a wait-and-see approach on policy, citing sticky core inflation and a resilient labor market heading into summer…",
    src: "reuters.com",
    time: "2026-05-04 09:18:47",
    grad: "linear-gradient(135deg,#7c2d12,#1c1917)",
  },
];

export function NewsScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <div className="px-4 pt-2">
        <h1 className="text-[24px] font-bold tracking-tight">News</h1>
      </div>
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <div className="divide-y divide-white/[0.06]">
          {ARTICLES.map((a, i) => (
            <motion.div key={a.title} className="py-3" {...clampReveal(play, i)}>
              <div className="h-24 w-full rounded-xl" style={{ background: a.grad }} />
              <div className="mt-2 text-[11px] font-bold leading-snug">{a.title}</div>
              <div className="mt-1 text-[9px] leading-snug text-white/45">{a.excerpt}</div>
              <div className="mt-1 text-[9px] text-white/40">{a.src} · {a.time}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ Wallet Optimizer ============================ */
/* Real data traced from a live "IKE" wallet screenshot. */

const OPT_SCENARIOS = ["Balanced", "Defensive", "Growth"];

export function OptimizerScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md text-white/70">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 5l-7 7 7 7" /></svg>
        </div>
        <span className="text-[13px] font-semibold">IKE</span>
        <div className="flex items-center gap-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md text-white/70">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md text-white/70 text-[13px] leading-none">⋯</div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <AppCard>
          <div className="text-[12px] font-bold tracking-wide">WALLET OPTIMIZER</div>
          <div className="mt-1 text-[10px] leading-snug text-white/45">What-if rebalance for this scenario preset—educational, not a trade plan.</div>
          <div className="mt-3 flex gap-1.5">
            {OPT_SCENARIOS.map((s) => (
              <span
                key={s}
                className="rounded-full px-2.5 py-1 text-[9px] font-semibold"
                style={
                  s === "Balanced"
                    ? { border: "1px solid var(--brand)", color: "var(--brand)", background: "rgba(10,132,255,0.12)" }
                    : { border: "0.5px solid rgba(255,255,255,0.14)", color: "rgba(235,235,245,0.7)" }
                }
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-2 text-[9px] text-white/45">Preset caps: top-1 ≤28%, top-3 ≤60%</div>
          <div className="mt-3 rounded-xl border p-2.5" style={{ background: "rgba(10,132,255,0.08)", borderColor: "rgba(10,132,255,0.25)" }}>
            <div className="text-[10px] leading-snug text-white/85">
              <span style={{ color: "var(--brand)" }}>💡 </span>
              Under balanced caps (top-3 ≤60%) you have ~31.6% of headroom — this preset shifts a slice from your largest position into mid-sized ones.
            </div>
            <div className="mt-1 text-[9px] font-semibold" style={{ color: "var(--brand)" }}>Why this matters</div>
          </div>
          <div className="mt-3 space-y-1 text-[10px] text-white/60">
            <div className="flex justify-between"><span>Top holding</span><span className="text-white/85">13.3% → 10.3%</span></div>
            <div className="flex justify-between"><span>Top-3 concentration</span><span className="text-white/85">28.4% → 26.8%</span></div>
            <div className="flex justify-between"><span>Illustrative shift</span><span className="text-white/85">~5 775.30 PLN</span></div>
          </div>
          <div className="mt-3 space-y-2 text-[9px] leading-snug text-white/50">
            <div>• Illustrative: shift ~10.0% of your portfolio from the largest position into mid-sized ones — a balanced posture, not a trade plan.</div>
            <div>• Illustrative step 3: re-check concentration metrics if you change the scenario preset. Numbers are educational, not prescriptive.</div>
          </div>
        </AppCard>

        <AppCard className="mt-3">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold tracking-wide">POSITIONS</div>
            <span className="text-[9px] text-white/40">Close all</span>
          </div>
          <div className="mt-0.5 text-[9px] text-white/40">Grouped by symbol</div>

          <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-[10px]" style={{ background: "rgba(10,132,255,0.16)", color: "var(--brand)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 12a8 8 0 0 1 14.9-4M20 12a8 8 0 0 1-14.9 4M20 4v5h-5M4 20v-5h5" /></svg>
              </span>
              <div>
                <div className="text-[11px] font-bold">Update wallet</div>
                <div className="text-[9px] text-white/40">55 positions · 27 Jul 2026</div>
              </div>
            </div>
            <span className="text-white/30">›</span>
          </div>

          {[
            { name: "Alphabet", sym: "GOOGL.US", value: "2 565.30 PLN", detail: "×2 · 2 lots · 2024-11-21 – 2024-11-22" },
          ].map((p, i) => (
            <motion.div key={p.sym} className="mt-3 border-t border-white/[0.06] pt-2.5" {...clampReveal(play, i)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold">{p.name}</span>
                  <Chip>{p.sym}</Chip>
                </div>
                <span className="text-[11px] font-bold text-white/90">{p.value}</span>
              </div>
              <div className="mt-1 text-[9px] text-white/40">{p.detail}</div>
            </motion.div>
          ))}
        </AppCard>
      </div>
    </div>
  );
}

/* ============================ Market Scanner ============================ */

const SCAN_ROWS = [
  { s: "NVDA", sig: "Strong buy", sc: 92 },
  { s: "ASML", sig: "Accumulate", sc: 81 },
  { s: "MSFT", sig: "Hold", sc: 67 },
  { s: "TSLA", sig: "Caution", sc: 41 },
  { s: "COIN", sig: "High risk", sc: 28 },
];

export function ScannerScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <div className="px-4 pt-2">
        <h1 className="text-[24px] font-bold tracking-tight">Scanner</h1>
      </div>
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <AppCard>
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-bold tracking-wide text-white/45">500 RESULTS · PORTFOLIO-AWARE</div>
            <Chip>PRO</Chip>
          </div>
          <div className="mt-2 divide-y divide-white/[0.06]">
            {SCAN_ROWS.map((r, i) => {
              const col = r.sc >= 70 ? "var(--gain)" : r.sc >= 50 ? "var(--amber)" : "var(--loss)";
              return (
                <motion.div key={r.s} className="flex items-center justify-between py-2.5" {...clampReveal(play, i)}>
                  <div className="flex items-center gap-2.5">
                    <span className="w-14 text-[13px] font-bold">{r.s}</span>
                    <span className="text-[10px] text-white/55">{r.sig}</span>
                  </div>
                  <span
                    className="rounded-lg px-2 py-0.5 text-[11px] font-bold"
                    style={{ color: col, background: `color-mix(in srgb, ${col} 16%, transparent)` }}
                  >
                    {r.sc}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </AppCard>
      </div>
    </div>
  );
}

/* ============================ Compare ============================ */

const COMPARE_SYMS = ["ADBE", "ASML", "NVDA", "MSFT"];
const COMPARE_ROWS = [
  { label: "P/E", vals: ["31.2", "38.6", "58.2", "34.1"] },
  { label: "Growth", vals: ["+18%", "+22%", "+61%", "+14%"] },
  { label: "Margin", vals: ["42%", "31%", "56%", "38%"] },
  { label: "Beta", vals: ["1.12", "1.24", "1.68", "0.94"] },
];

export function CompareScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <div className="px-4 pt-2">
        <h1 className="text-[24px] font-bold tracking-tight">Compare</h1>
      </div>
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <AppCard>
          <div className="text-[10px] font-bold tracking-wide text-white/45">4 INSTRUMENTS · ALL METRICS</div>
          <div className="mt-3 grid grid-cols-5 gap-1 text-center">
            <span />
            {COMPARE_SYMS.map((s) => (
              <span key={s} className="text-[10px] font-bold">{s}</span>
            ))}
          </div>
          {COMPARE_ROWS.map((row, i) => (
            <motion.div key={row.label} className="mt-2 grid grid-cols-5 gap-1 border-t border-white/[0.06] pt-2 text-center" {...clampReveal(play, i)}>
              <span className="text-left text-[9px] text-white/45">{row.label}</span>
              {row.vals.map((v, j) => (
                <span key={j} className="text-[10px] text-white/80">{v}</span>
              ))}
            </motion.div>
          ))}
        </AppCard>

        <AppCard className="mt-3">
          <div className="text-[10px] font-bold tracking-wide text-white/45">CORRELATION MATRIX</div>
          <div className="mt-2 grid grid-cols-4 gap-1">
            {[0.62, 0.71, 0.44, 0.58, 0.39, 0.67].map((v, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-md text-[9px] font-semibold"
                style={{ background: `rgba(10,132,255,${0.15 + v * 0.35})`, color: "white" }}
              >
                {v.toFixed(2)}
              </div>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
}

/* ============================ Alpha Score ============================ */
/* Real data traced from a live GOOGL.US screenshot — pillar names, /100
   scale, 9-segment meter, and the exact inline citation style (Piotroski
   F-Score, Altman Z, ROE/ROA/margin, D/E/CR) are the actual app, not
   invented "classic model" chips. */

const SCORE_PILLARS = [
  {
    name: "Quality",
    score: 78,
    label: "strong financial quality",
    desc: "Piotroski F-Score 7/9 → strong financial quality. Higher F-Scores usually mean stronger fundamentals.",
    icon: <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.3 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8L12 2Z" fill="currentColor" />,
  },
  {
    name: "Distress",
    score: 85,
    label: "low bankruptcy risk",
    desc: "Altman Z 16.55 → low bankruptcy risk. Higher Z in this model usually means lower distress risk.",
    icon: <path d="M12 3l8 3.5v5c0 5-3.4 8.7-8 9.5-4.6-.8-8-4.5-8-9.5v-5L12 3Zm-1.2 11.1 5-5.3-1.4-1.4-3.6 3.9-1.4-1.4-1.4 1.4 2.8 2.8Z" fill="currentColor" />,
  },
  {
    name: "Profitability",
    score: 90,
    label: "solid returns",
    desc: "ROE 48.7% · ROA 13.0% · margin 60.9% → solid returns. ROE, ROA, and margin together describe return quality.",
    icon: <path d="M4 20V10h3v10H4Zm6.5 0V4h3v16h-3ZM17 20v-7h3v7h-3Z" fill="currentColor" />,
  },
  {
    name: "Leverage",
    score: 88,
    label: "conservative balance sheet",
    desc: "D/E 0.43 · CR 2.01 → conservative balance sheet. Conservative debt and liquidity often mean more balance-sheet cushion.",
    icon: <path d="M4 6h16v3H4V6Zm0 4.5h16v3H4v-3ZM4 15h16v3H4v-3Z" fill="currentColor" />,
  },
];

function ScoreMeter({ score }: { score: number }) {
  const segs = 9;
  const filled = Math.round((score / 100) * segs);
  return (
    <div className="flex gap-1">
      {Array.from({ length: segs }).map((_, i) => (
        <span key={i} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: i < filled ? "var(--gain)" : "rgba(255,255,255,0.12)" }} />
      ))}
    </div>
  );
}

export function AlphaScoreScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <DetailHeaderRow title="GOOGL.US" right="share" />
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <AppCard>
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold tracking-wide">ALPHA SCORE</div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.08] text-[9px] text-white/50">?</span>
          </div>
          <div className="mt-1 text-[10px] text-white/45">Balanced · Fundamental read</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-[30px] font-bold" style={{ color: "var(--gain)" }}>85</span>
              <span className="text-[12px] text-white/40">/100</span>
            </div>
            <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold" style={{ background: "rgba(74,222,128,0.16)", color: "var(--gain)" }}>Strong</span>
          </div>
          <div className="mt-1.5 text-[9px] text-white/45">Strongest pillar: profitability (90/100)</div>
        </AppCard>

        <div className="mt-3 space-y-3">
          {SCORE_PILLARS.map((p, i) => (
            <motion.div key={p.name} {...clampReveal(play, i)}>
              <AppCard className="flex flex-row items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]" style={{ background: "rgba(74,222,128,0.16)", color: "var(--gain)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>{p.icon}</svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold">{p.name}</span>
                    <ScoreMeter score={p.score} />
                    <span className="text-[11px] font-bold" style={{ color: "var(--gain)" }}>{p.score}/100</span>
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium text-white/55">{p.label}</div>
                  <p className="mt-1 text-[9px] leading-snug text-white/40">{p.desc}</p>
                </div>
              </AppCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
