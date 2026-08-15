"use client";

/**
 * Accurate/grounded app screens for the Apple-style deep-dive sections.
 * Every screen here is traced from a real device screenshot — News,
 * Optimizer, Scanner, Watchlist and AlphaScore from live app captures;
 * Compare is the one exception still awaiting a reference screenshot (its
 * List/Scan/Compare sibling tabs are confirmed real, its own detail content
 * is not yet verified).
 */

import { motion } from "motion/react";
import { AppCard, Chip, DetailHeaderRow, StatusBar } from "./primitives";

const clampReveal = (play: boolean, i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: play ? { opacity: 1, y: 0 } : { opacity: 0 },
  transition: { duration: 0.4, delay: i * 0.07 },
});

/* ============================ News ============================ */
/* Real data traced from live screenshots of both tabs. Headlines has no
   thumbnail images — text-only cards, date-grouped, with a sentiment badge.
   Brief is the personalized tab: a Morning Brief summary card followed by
   per-symbol "For you" cards tied to the user's own portfolio/watchlist. */

const HEADLINES = [
  {
    dateGroup: "TUESDAY, JUN 30",
    title: "Children's Miracle Network Welcomes DICK'S Sporting Goods Foundation as New National Partner",
    excerpt: "Salt Lake City, UT, June 30, 2026 (GLOBE NEWSWIRE) -- Children's Miracle Network announced the DICK'S Sporting Goods Foundation as a new national partner, marking the beginning of a strategic relationship focused on helping children thrive through access to…",
    src: "Globenewswire",
    time: "6/30/2026, 6:04:00 PM",
    sentiment: "Positive",
  },
  {
    title: "Vanguard and i3 Product Development Partner to Simplify Battery Integration for Commercial OEMs",
    excerpt: "Milwaukee, WI, June 30, 2026 (GLOBE NEWSWIRE) -- Vanguard has welcomed i3 Product Development as the newest member of its Battery Technology Partner program. The strategic partnership brings together industry-leading Vanguard® commercial-grade lithiu…",
    src: "Globenewswire",
    time: "6/30/2026, 5:00:00 PM",
    sentiment: "Positive",
  },
];

const BRIEF_ITEMS = [
  { tag: "JSW", time: "8/12/2026, 6:03:03 PM", title: "JSW.WA: uptrend meets low profitability", forYou: "The positive trend may enhance your portfolio's performance, but the financial risks wa…" },
  { tag: "ABAT", time: "8/11/2026, 6:04:30 PM", title: "ABAT.US: uptrend meets low profitability", forYou: "The uptrend may offer short-term gains, but low profitability raises concerns. Monitor for p…" },
  { tag: "ARM", time: "8/11/2026, 9:12:09 PM", title: "ARM.US moved -5.2%", forYou: "The decline may impact your overall portfolio performance significantly. Consider mon…" },
];

function NewsTabHeader({ active }: { active: "Headlines" | "Brief" }) {
  return (
    <>
      <div className="px-4 pt-2">
        <h1 className="text-[24px] font-bold tracking-tight">News</h1>
      </div>
      <div className="px-4 pt-3">
        <div className="flex gap-1 rounded-2xl bg-white/[0.05] p-1">
          {(["Headlines", "Brief"] as const).map((t) => (
            <span
              key={t}
              className="flex-1 rounded-xl py-1.5 text-center text-[10px] font-semibold"
              style={t === active ? { background: "rgba(255,255,255,0.10)", color: "#fff" } : { color: "rgba(235,235,245,0.5)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export function NewsScreen({ play = true, tab = "brief" }: { play?: boolean; tab?: "headlines" | "brief" }) {
  if (tab === "headlines") {
    return (
      <div className="relative flex h-full flex-col bg-black text-white">
        <StatusBar time="9:41" />
        <NewsTabHeader active="Headlines" />
        <div className="flex-1 overflow-hidden px-4 pt-3">
          {HEADLINES.map((a, i) => (
            <motion.div key={a.title} {...clampReveal(play, i)}>
              {a.dateGroup && <div className="mb-2 text-[9px] font-bold tracking-wide text-white/40">{a.dateGroup}</div>}
              <AppCard className="mb-3">
                <div className="text-[11px] font-bold leading-snug">{a.title}</div>
                <div className="mt-1.5 text-[9px] leading-snug text-white/45">{a.excerpt}</div>
                <div className="mt-1.5 text-[9px] text-white/40">{a.src} · {a.time}</div>
                <span className="mt-2 inline-block rounded-md px-2 py-0.5 text-[8px] font-semibold" style={{ background: "rgba(74,222,128,0.16)", color: "var(--gain)" }}>{a.sentiment}</span>
              </AppCard>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <NewsTabHeader active="Brief" />
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <p className="text-[9px] text-white/40">Personalized updates for your portfolio and watchlist.</p>

        <div
          className="mt-2 rounded-[20px] border p-4"
          style={{ background: "color-mix(in srgb, var(--ai) 9%, var(--app-card))", borderColor: "color-mix(in srgb, var(--ai) 30%, transparent)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[13px] font-bold">
              <span style={{ color: "var(--ai)" }}>✦</span> Morning Brief
            </div>
            <span className="text-[10px] font-semibold" style={{ color: "var(--brand)" }}>Weekly</span>
          </div>
          <div className="mt-0.5 text-[9px] text-white/40">2026-08-13</div>
          <p className="mt-2 text-[10px] leading-snug text-white/85">
            Good morning. Today&apos;s market opens with mixed signals as some stocks exhibit positive trends while others face declines. Notably, JSW.WA and ABAT.US show upward momen…
          </p>
          <div className="mt-2 space-y-1 text-[9px] leading-snug text-white/55">
            <div>• JSW.WA shows positive momentum but carries financial risks due to high debt.</div>
            <div>• ABAT.US has seen a significant price increase, yet low profitability may impact long-term confidence.</div>
            <div>• ARM.US&apos;s recent decline raises concerns, despite a favorable growth outlook.</div>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {BRIEF_ITEMS.map((it, i) => (
            <motion.div key={it.tag} {...clampReveal(play, i)}>
              <AppCard>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-md px-1.5 py-0.5 text-[8px] font-semibold" style={{ background: "rgba(255,159,10,0.16)", color: "var(--amber)" }}>Price</span>
                    <span className="text-[9px] text-white/40">{it.tag} · {it.time}</span>
                  </div>
                  <span className="text-white/30">⌄</span>
                </div>
                <div className="mt-1.5 text-[11px] font-bold leading-snug">{it.title}</div>
                <div className="mt-1 text-[9px] leading-snug text-white/45">For you: {it.forYou}</div>
              </AppCard>
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

/* ============================ Watchlist tabs (shared) ============================ */
/* Real "Watchlist" screen has a List/Scan/Compare pill switcher right below
   the title — shared here so Scanner/Compare/Watchlist all show it. */

export function WatchlistTabHeader({ active }: { active: "List" | "Scan" | "Compare" }) {
  const tabs = ["List", "Scan", "Compare"] as const;
  return (
    <>
      <div className="px-4 pt-2">
        <h1 className="text-[24px] font-bold tracking-tight">Watchlist</h1>
      </div>
      <div className="px-4 pt-3">
        <div className="flex gap-1 rounded-2xl bg-white/[0.05] p-1">
          {tabs.map((t) => (
            <span
              key={t}
              className="flex-1 rounded-xl py-1.5 text-center text-[10px] font-semibold"
              style={t === active ? { background: "rgba(255,255,255,0.10)", color: "#fff" } : { color: "rgba(235,235,245,0.5)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================ Instrument Scanner ============================ */
/* Real data traced from a live "Watchlist → Scan" screenshot. */

const SCAN_PRESETS = ["Balanced", "Value", "Quality", "Growth", "Low risk"];
const SCAN_WEIGHTS = [
  { name: "Quality", pct: 20 },
  { name: "Distress", pct: 20 },
  { name: "Profitability", pct: 20 },
  { name: "Leverage", pct: 20 },
  { name: "Cash flow", pct: 20 },
];
const SCAN_ROWS = [
  { rank: 1, s: "TSM.US", pillar: "Strongest pillar: profitability (90/100)", sc: 88, chg: "1.68%", up: true },
  { rank: 2, s: "GOOGL.US", pillar: "Strong profitability · score 85", sc: 85, chg: "-0.08%", up: false },
  { rank: 3, s: "ISRG", pillar: "Strong leverage · score 83", sc: 83, chg: "0.01%", up: true },
];

export function ScannerScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <WatchlistTabHeader active="Scan" />
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <AppCard>
          <div className="text-[12px] font-bold tracking-wide">INSTRUMENT SCANNER</div>
          <div className="mt-1 text-[10px] text-white/45">Rank your watchlist with a scoring preset.</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SCAN_PRESETS.map((p) => (
              <span
                key={p}
                className="rounded-full px-2.5 py-1 text-[9px] font-semibold"
                style={
                  p === "Balanced"
                    ? { border: "1px solid var(--brand)", color: "var(--brand)", background: "rgba(10,132,255,0.12)" }
                    : { border: "0.5px solid rgba(255,255,255,0.14)", color: "rgba(235,235,245,0.7)" }
                }
              >
                {p}
              </span>
            ))}
          </div>

          <div className="mt-4 text-[10px] font-bold tracking-wide text-white/45">CUSTOM MODEL WEIGHTS</div>
          <div className="mt-1 text-[9px] leading-snug text-white/40">Adjust how each fundamental pillar contributes to Alpha Score.</div>
          <div className="mt-2 space-y-1.5">
            {SCAN_WEIGHTS.map((w) => (
              <div key={w.name} className="flex items-center justify-between text-[10px]">
                <span className="text-white/75">{w.name}</span>
                <span className="font-semibold text-white/90">{w.pct}%</span>
              </div>
            ))}
          </div>
        </AppCard>

        <div
          className="mt-3 rounded-[20px] border p-4"
          style={{ background: "color-mix(in srgb, var(--ai) 9%, var(--app-card))", borderColor: "color-mix(in srgb, var(--ai) 30%, transparent)" }}
        >
          <div className="text-[11px] font-bold tracking-wide">WHY THIS RESULT?</div>
          <div className="mt-1 text-[11px] font-bold">TSM.US tops your balanced scan</div>
          <div className="mt-1 text-[9px] leading-snug text-white/50">Strongest pillar: profitability (90/100). Educational ranking of 62 instruments—not buy/sell advice.</div>
        </div>

        <div className="mt-3 space-y-2">
          {SCAN_ROWS.map((r, i) => (
            <motion.div key={r.s} {...clampReveal(play, i)}>
              <AppCard className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold" style={{ background: "rgba(74,222,128,0.16)", color: "var(--gain)" }}>#{r.rank}</span>
                  <div>
                    <div className="text-[12px] font-bold">{r.s}</div>
                    <div className="text-[8px] text-white/40">{r.pillar}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-bold" style={{ color: "var(--gain)" }}>{r.sc}</div>
                  <div className="text-[9px]" style={{ color: r.up ? "var(--gain)" : "var(--loss)" }}>{r.chg}</div>
                </div>
              </AppCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ Watchlist (List) ============================ */
/* Real data traced from a live "Watchlist → List" screenshot. */

const WATCH_ROWS = [
  { sym: "VZ.US", ex: "US", price: "47.27 USD", chg: "0.51%", up: true },
  { sym: "PZU.WA", ex: "WA", price: "72.80 USD", chg: "-0.36%", up: false },
  { sym: "TTD.US", ex: "US", price: "13.56 USD", chg: "1.27%", up: true },
  { sym: "MSFT.US", ex: "US", price: "503.81 USD", chg: "-0.44%", up: false },
];

export function WatchlistScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <WatchlistTabHeader active="List" />
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <AppCard>
          <div className="text-[12px] font-bold tracking-wide">SEARCH</div>
          <p className="mt-1 text-[10px] leading-snug text-white/45">Find by symbol or company name, then add to watchlist.</p>
          <div className="mt-2 rounded-xl border border-white/[0.1] px-3 py-2 text-[10px] text-white/35">e.g. AAPL</div>
        </AppCard>

        <AppCard className="mt-3">
          <div className="text-[12px] font-bold tracking-wide">WATCHLIST PREVIEW</div>
          <p className="mt-1 text-[10px] leading-snug text-white/45">Manage your tracked symbols in one place.</p>
          <div className="mt-2 divide-y divide-white/[0.06]">
            {WATCH_ROWS.map((w, i) => (
              <motion.div key={w.sym} className="flex items-center justify-between py-2.5" {...clampReveal(play, i)}>
                <div>
                  <div className="text-[12px] font-bold">{w.sym}</div>
                  <div className="text-[8px] text-white/40">{w.ex}</div>
                  <div className="mt-0.5 text-[9px]">
                    <span className="text-white/60">{w.price}</span>{" "}
                    <span style={{ color: w.up ? "var(--gain)" : "var(--loss)" }}>{w.chg}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-white/35">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-[9px]">︿</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-[9px]">﹀</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[color:rgba(255,69,58,0.4)] text-[9px]" style={{ color: "var(--loss)" }}>🗑</span>
                </div>
              </motion.div>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
}

/* ============================ Compare ============================ */
/* Deliberately not built: the List/Scan/Compare tab bar is confirmed real,
   but no reference screenshot of the Compare tab's actual content exists.
   An earlier version fabricated a metrics table + correlation matrix here —
   removed per the "no invented renders" rule. Rebuild this once a real
   screenshot of the Compare tab is available. */

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
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-bold">{p.name}</span>
                    <span className="shrink-0 text-[11px] font-bold" style={{ color: "var(--gain)" }}>{p.score}/100</span>
                  </div>
                  <div className="mt-1.5">
                    <ScoreMeter score={p.score} />
                  </div>
                  <div className="mt-1 text-[10px] font-medium text-white/55">{p.label}</div>
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

/* ============================ Instrument Overview + Fundamentals ============================ */
/* Real data traced from a live MSFT.US screenshot. */

const OVERVIEW_ROWS: [string, string, string?][] = [
  ["Symbol", "MSFT.US"],
  ["Exchange", "US"],
  ["Currency", "USD"],
  ["Type", "stock"],
  ["Last", "503.81 USD"],
  ["Day Δ", "-2.25 (-0.44%)", "var(--loss)"],
  ["Last update:", "13 Aug 2026 at 02:00"],
];

const FUNDAMENTALS_ROWS: [string, string][] = [
  ["Market cap", "3.66T USD"],
  ["P/E", "27.45"],
  ["EPS", "17.94"],
  ["P/B", "8.49"],
  ["Enterprise value", "3.72T USD"],
  ["EV / EBITDA", "18.01"],
  ["PEG", "1.65"],
  ["Revenue (TTM)", "331.84B USD"],
  ["Net income (TTM)", "133.75B USD"],
  ["ROE", "34.0%"],
  ["ROA", "14.1%"],
  ["Gross margin", "67.9%"],
  ["Debt / equity", "0.71"],
  ["Current ratio", "1.23"],
  ["Dividend yield", "0.72%"],
  ["Dividend / share", "3.64"],
  ["Beta", "1.10"],
  ["52-week range", "349.2 – 550.24"],
  ["Sector", "Technology"],
  ["Industry", "Software - Infrastructure"],
];

export function InstrumentOverviewScreen({ play = true }: { play?: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <StatusBar time="9:41" />
      <DetailHeaderRow title="MSFT.US" right="share" />
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <AppCard>
          <div className="text-[12px] font-bold tracking-wide">OVERVIEW</div>
          <div className="mt-1 text-[9px] text-white/45">Instrument identity and market context.</div>
          <div className="mt-3 space-y-1.5">
            {OVERVIEW_ROWS.map(([label, value, color], i) => (
              <motion.div key={label} className="flex items-center justify-between text-[10px]" {...clampReveal(play, i)}>
                <span className="text-white/50">{label}</span>
                <span className="font-semibold" style={{ color: color ?? "#fff" }}>{value}</span>
              </motion.div>
            ))}
          </div>
        </AppCard>

        <AppCard className="mt-3">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold tracking-wide">FUNDAMENTALS</div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.08] text-[9px] text-white/50">?</span>
          </div>
          <div className="mt-3 space-y-1.5">
            {FUNDAMENTALS_ROWS.map(([label, value], i) => (
              <motion.div key={label} className="flex items-center justify-between text-[10px]" {...clampReveal(play, i)}>
                <span className="text-white/50">{label}</span>
                <span className="font-semibold text-white">{value}</span>
              </motion.div>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
}
