import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "./theme";
import { DetailHeader, GlassCard, SegmentControl, TabHeader } from "./ui";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* Every screen below is a frame-driven port of the matching component in
   components/site/phone/{screens,moreScreens,primitives}.tsx — same data,
   same Tailwind values converted to their literal px equivalents (the
   canvas here is the site's native 300px design width; Phone in ./ui.tsx
   scales the whole thing up for video, so nothing here is hand-estimated). */

function InfoDot() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden style={{ color: "rgba(255,255,255,0.35)" }}>
      <circle cx="12" cy="12" r="9.5" />
      <path strokeLinecap="round" d="M12 11v5.5M12 8v.01" />
    </svg>
  );
}

/** LineChart clone — draws in via pathLength, optional dashed ref line at
 * today's value. Matches primitives.tsx's LineChart exactly (gridlines,
 * area fill, stroke width), driven by useCurrentFrame instead of useInView. */
function LineChart({ points, color = C.gain, refLineY, height = 110 }: { points: [number, number][]; color?: string; refLineY?: number; height?: number }) {
  const f = useCurrentFrame();
  const width = 260; // 300 canvas - 2*20 card padding margin, matches AppCard content width closely enough for a chart
  const px = (p: [number, number]) => [p[0] * width, p[1] * height] as const;
  const d = points.map((p, i) => { const [x, y] = px(p); return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`; }).join(" ");
  const areaD = `${d} L ${width} ${height} L 0 ${height} Z`;
  const drawLen = interpolate(f, [0, 36], [0, 1], clamp);
  const areaOp = interpolate(f, [24, 40], [0, 1], clamp);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} aria-hidden>
      <defs>
        <linearGradient id="lc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" y1={g * height} x2={width} y2={g * height} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {typeof refLineY === "number" && (
        <line x1="0" y1={refLineY * height} x2={width} y2={refLineY * height} stroke={C.brand} strokeWidth="1.5" strokeOpacity="0.9" />
      )}
      <path d={areaD} fill="url(#lc-fill)" opacity={areaOp} />
      <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - drawLen} />
    </svg>
  );
}

/* ---------------- Wallet ---------------- */
/* Matches WalletValueScreen in components/site/phone/screens.tsx exactly:
   same flat-accumulation-then-breakout curve, same real KPI numbers. */

const WALLET_POINTS: [number, number][] = [
  [0, 0.88], [0.08, 0.91], [0.15, 0.9], [0.22, 0.84], [0.3, 0.79], [0.38, 0.78], [0.46, 0.77],
  [0.55, 0.69], [0.63, 0.58], [0.72, 0.47], [0.8, 0.39], [0.88, 0.29], [0.94, 0.19], [1, 0.06],
];

export function WalletScreen() {
  const f = useCurrentFrame();
  const pl = Math.round(interpolate(f, [10, 46], [0, 18701], clamp));
  const plp = interpolate(f, [10, 46], [0, 12.48], clamp);
  const mv = interpolate(f, [16, 58], [0, 168492.23], clamp);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TabHeader big />
      <div style={{ padding: "4px 16px 0" }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: -0.5, color: "#fff" }}>Wallet</h1>
      </div>
      <div style={{ flex: 1, overflow: "hidden", padding: "4px 16px 96px" }}>
        <GlassCard style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.3, color: "#fff" }}>WALLET VALUE</div>
          <div style={{ marginTop: 2, fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Historical portfolio value for 1Y.</div>
          <div style={{ marginTop: 12 }}><SegmentControl options={["1W", "1M", "3M", "1Y", "5Y"]} activeIndex={3} /></div>
          <div style={{ marginTop: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 8 }}>
            <div style={{ textAlign: "right", fontSize: 9, color: "rgba(255,255,255,0.4)" }}>159 100</div>
            <LineChart points={WALLET_POINTS} refLineY={WALLET_POINTS[WALLET_POINTS.length - 1][1]} />
            <div style={{ textAlign: "right", fontSize: 9, color: "rgba(255,255,255,0.4)" }}>123 700</div>
            <div style={{ marginTop: 4, display: "flex", justifyContent: "space-between", fontSize: 9 }}>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>May 2025</span>
              <span style={{ fontWeight: 600, color: C.brand }}>144 660.23 USD</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>May 2026</span>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 8, lineHeight: 1.3, color: "rgba(255,255,255,0.35)" }}>Market data may be delayed and is for informational purposes only.</div>
        </GlassCard>

        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <GlassCard>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.45)" }}><span>Total P/L</span><InfoDot /></div>
            <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: C.gain, whiteSpace: "nowrap" }}>≈ {pl.toLocaleString("en-US").replace(/,/g, " ")} USD</div>
          </GlassCard>
          <GlassCard>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.45)" }}><span>Total P/L %</span><InfoDot /></div>
            <div style={{ marginTop: 4, fontSize: 13, fontWeight: 700, color: C.gain, whiteSpace: "nowrap" }}>{plp.toFixed(2)}%</div>
          </GlassCard>
        </div>

        <GlassCard style={{ marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.45)" }}><span>Market value</span><InfoDot /></div>
          <div style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>{mv.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, " ")} USD</div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ---------------- Allocation ---------------- */
/* Matches AllocationScreen exactly: real accounts BY WALLET, BY ASSET CLASS,
   LARGEST HOLDINGS with wallet chip + company name. */

const WALLETS = [
  { name: "IKE", pct: 40, color: C.gain },
  { name: "PLN", pct: 22, color: C.brand },
  { name: "USD", pct: 13, color: C.amber },
  { name: "mBank", pct: 13, color: C.ai },
  { name: "IBKR", pct: 5, color: "#ff375f" },
  { name: "Metals", pct: 4, color: C.s2 },
  { name: "Crypto", pct: 3, color: C.s3 },
];
const ASSET_CLASSES = [
  { name: "Stock", pct: 73, color: C.gain },
  { name: "ETF", pct: 20, color: C.brand },
  { name: "Commodity", pct: 4, color: C.amber },
  { name: "forex", pct: 3, color: C.ai },
];
const HOLDINGS = [
  { sym: "CSPX.UK", pct: 10, wallet: "IKE", name: "Core S&P 500" },
  { sym: "PKN.PL", pct: 6, wallet: "IKE", name: "Orlen" },
  { sym: "MSFT.US", pct: 6, wallet: "IKE", name: "Microsoft" },
];

function SectorBar({ segments, atFrame = 0 }: { segments: { pct: number; color: string }[]; atFrame?: number }) {
  const f = useCurrentFrame() - atFrame;
  const grow = interpolate(f, [0, 32], [0, 1], clamp);
  return (
    <div style={{ display: "flex", height: 10, width: "100%", overflow: "hidden", borderRadius: 999, background: "rgba(255,255,255,0.05)" }}>
      {segments.map((s, i) => <div key={i} style={{ width: `${s.pct * grow}%`, background: s.color }} />)}
    </div>
  );
}
function Chip({ children }: { children: string }) {
  return <span style={{ borderRadius: 6, background: "rgba(255,255,255,0.08)", padding: "2px 8px", fontSize: 8, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{children}</span>;
}

export function AllocationScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TabHeader title="Portfolio" />
      <div style={{ flex: 1, overflow: "hidden", padding: "4px 16px 96px" }}>
        <GlassCard style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.3, color: "#fff" }}>ALLOCATION</div>

          <div style={{ marginTop: 12, fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>BY WALLET</div>
          <div style={{ marginTop: 6 }}><SectorBar segments={WALLETS.map((w) => ({ pct: w.pct, color: w.color }))} /></div>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            {WALLETS.map((w) => (
              <div key={w.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 10 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.75)" }}><span style={{ width: 8, height: 8, borderRadius: 999, background: w.color }} />{w.name}</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>{w.pct}%</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 9, fontWeight: 600 }}>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>BY ASSET CLASS</span>
            <span style={{ color: C.brand }}>By sector</span>
          </div>
          <div style={{ marginTop: 6 }}><SectorBar segments={ASSET_CLASSES.map((a) => ({ pct: a.pct, color: a.color }))} atFrame={8} /></div>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            {ASSET_CLASSES.map((a) => (
              <div key={a.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 10 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.75)" }}><span style={{ width: 8, height: 8, borderRadius: 999, background: a.color }} />{a.name}</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>{a.pct}%</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>LARGEST HOLDINGS</div>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            {HOLDINGS.map((h) => (
              <div key={h.sym}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{h.sym}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Chip>{h.wallet}</Chip>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{h.pct}%</span>
                  </div>
                </div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{h.name}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ---------------- Instrument chart ---------------- */
/* Matches InstrumentScreen exactly: CHART eyebrow + help icon, real
   NVDA.US 1Y series, ref line at today's price, Volume/RSI/MACD, AI callout. */

const IPTS: [number, number][] = [
  [0, 0.86], [0.06, 0.72], [0.12, 0.78], [0.18, 0.66], [0.24, 0.7], [0.3, 0.58], [0.36, 0.62],
  [0.42, 0.5], [0.48, 0.54], [0.54, 0.44], [0.6, 0.46], [0.66, 0.36], [0.72, 0.32], [0.78, 0.38],
  [0.84, 0.26], [0.9, 0.22], [0.95, 0.16], [1, 0.06],
];

function MiniVolume({ seed }: { seed: number }) {
  const f = useCurrentFrame();
  const bars = Array.from({ length: 40 }).map((_, i) => 6 + ((i * (37 + seed * 5) + seed * 11) % 29));
  return (
    <svg viewBox="0 0 400 34" width="100%" height={26} preserveAspectRatio="none" aria-hidden>
      {bars.map((h, i) => {
        const g = interpolate(f, [i * 0.6, 12 + i * 0.6], [0, 1], clamp);
        return <rect key={i} x={i * 10} y={34 - h * g} width="6" height={h * g} fill="rgba(255,255,255,0.32)" />;
      })}
    </svg>
  );
}
function MiniLine({ color, seed }: { color: string; seed: number }) {
  const f = useCurrentFrame();
  const drawLen = interpolate(f, [0, 30], [0, 1], clamp);
  const pts = Array.from({ length: 30 }).map((_, i) => 17 + Math.sin(i / 2.6 + seed) * 12 * (((i * 53) % 17) / 17 + 0.4));
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${((i / (pts.length - 1)) * 400).toFixed(1)} ${(34 - v).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 400 34" width="100%" height={26} preserveAspectRatio="none" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="2" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - drawLen} />
    </svg>
  );
}
function MiniHist({ seed }: { seed: number }) {
  const f = useCurrentFrame();
  const bars = Array.from({ length: 40 }).map((_, i) => ({ v: Math.sin(i / 4.2 + seed) * (((i * 29) % 13) / 13 * 0.7 + 0.3), up: Math.sin(i / 4.2 + seed) >= 0 }));
  return (
    <svg viewBox="0 0 400 28" width="100%" height={22} preserveAspectRatio="none" aria-hidden>
      {bars.map((b, i) => {
        const h = Number((Math.abs(b.v) * 13).toFixed(2));
        const g = interpolate(f, [i * 0.5, 10 + i * 0.5], [0, 1], clamp);
        return <rect key={i} x={i * 10} y={b.up ? 14 - h * g : 14} width="6" height={h * g} fill={b.up ? C.gain : C.loss} />;
      })}
    </svg>
  );
}
function MiniRow({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  // Slightly tighter than the site's mt-3 (12px) — the video has no scroll,
  // so this card must fit the fixed screen height in one shot.
  return (
    <div style={{ marginTop: 6 }}>
      {children}
      <div style={{ marginTop: 4, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 8, color: "rgba(255,255,255,0.4)" }}>
        <span>{label}</span><span>{value}</span>
      </div>
    </div>
  );
}

export function InstrumentScreen() {
  const f = useCurrentFrame();
  const calloutOp = interpolate(f, [58, 72], [0, 1], clamp);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <DetailHeader title="NVDA.US" right="share" />
      <div style={{ flex: 1, overflow: "hidden", padding: "8px 16px 0" }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: -0.3, color: "#fff" }}>NVIDIA Corp.</h1>
        <GlassCard style={{ marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.3, color: "#fff" }}>CHART</div>
            <span style={{ display: "flex", height: 24, width: 24, alignItems: "center", justifyContent: "center", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 9, color: "rgba(255,255,255,0.5)" }}>?</span>
          </div>
          <div style={{ marginTop: 8 }}><SegmentControl options={["1W", "1M", "3M", "1Y", "5Y"]} activeIndex={3} /></div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.gain }}>+91.20 (+128.4%)</span>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>↑ past 1Y</span>
          </div>
          <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)" }}>Closed: 12 Aug at 02:00 · Disclaimer</div>

          <div style={{ marginTop: 8, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 8 }}>
            <div style={{ textAlign: "right", fontSize: 9, color: "rgba(255,255,255,0.4)" }}>163.90</div>
            <LineChart points={IPTS} color={C.gain} refLineY={IPTS[IPTS.length - 1][1]} height={78} />
            <div style={{ textAlign: "right", fontSize: 9, color: "rgba(255,255,255,0.4)" }}>71.51</div>
            <div style={{ marginTop: 4, display: "flex", justifyContent: "space-between", fontSize: 9 }}>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>Aug 2025</span>
              <span style={{ fontWeight: 600, color: C.brand }}>163.14</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>Aug 2026</span>
            </div>
          </div>

          <MiniRow label="Volume" value=""><MiniVolume seed={2} /></MiniRow>
          <MiniRow label="RSI (14)" value="62.0"><MiniLine color={C.brand} seed={5} /></MiniRow>
          <MiniRow label="MACD (12,26,9)" value="+2.155"><MiniHist seed={9} /></MiniRow>

          <div style={{ marginTop: 8, borderRadius: 12, border: "1px solid rgba(10,132,255,0.25)", background: "rgba(10,132,255,0.08)", padding: 8, opacity: calloutOp }}>
            <div style={{ fontSize: 10, lineHeight: 1.35, color: "rgba(255,255,255,0.85)" }}>
              <span style={{ color: C.brand }}>💡 </span>
              NVDA.US: RSI 62 · MACD histogram +2.155 → &ldquo;orderly upside&rdquo; momentum, no exhaustion signal yet.
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ---------------- Portfolio Insight (Alpha Pro) ---------------- */
/* Matches PortfolioInsightScreen exactly: wallet-level Tape / Diversification
   / Concentration / Breadth pillars, scored on the wallet's real weights. */

const INSIGHT_PILLARS = [
  { name: "Tape", score: 4, label: "Risk-on tape", icon: "tape" },
  { name: "Diversification", score: 5, label: "Well spread", icon: "div" },
  { name: "Concentration", score: 2, label: "Lower concentration", icon: "conc" },
  { name: "Breadth", score: 5, label: "Many drivers", icon: "breadth" },
];
const INSIGHT_ICONS: Record<string, React.ReactNode> = {
  tape: <path d="M3 12h3l2-6 4 12 3-9 2 5h4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />,
  div: <><circle cx="6" cy="6" r="2.2" fill="currentColor" /><circle cx="18" cy="6" r="2.2" fill="currentColor" /><circle cx="12" cy="18" r="2.2" fill="currentColor" /><path d="M7.6 7.4 10.4 16M16.4 7.4 13.6 16M8 6h8" stroke="currentColor" strokeWidth={1.6} /></>,
  conc: <path d="M4 5h16v3H4V5Zm0 5.5h16v3H4v-3ZM4 16h16v3H4v-3Z" fill="currentColor" />,
  breadth: <><rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" /></>,
};
function LensMeter({ score, color = C.gain }: { score: number; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map((i) => <span key={i} style={{ width: 10, height: 10, borderRadius: 3, background: i <= score ? color : "rgba(255,255,255,0.12)" }} />)}
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color }}>{score}/5</span>
    </div>
  );
}
const proTint = { background: "color-mix(in srgb, #bf5af2 9%, #1c1c1e)", borderColor: "color-mix(in srgb, #bf5af2 30%, transparent)" };

export function LensesScreen() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chip = spring({ frame: f, fps, config: { damping: 12 } });
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TabHeader title="Portfolio" />
      <div style={{ flex: 1, overflow: "hidden", padding: "4px 16px 96px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 4px 0" }}>
          <h1 style={{ margin: 0, fontSize: 15, fontWeight: 800, letterSpacing: -0.2, color: "#fff" }}>PORTFOLIO INSIGHT</h1>
          <span style={{ display: "flex", height: 24, width: 24, alignItems: "center", justifyContent: "center", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 9, color: "rgba(255,255,255,0.5)" }}>?</span>
        </div>

        <div style={{ marginTop: 12, borderRadius: 20, border: `1px solid ${proTint.borderColor}`, background: proTint.background, padding: 16 }}>
          <div style={{ transform: `scale(${interpolate(chip, [0, 1], [0.7, 1])})`, transformOrigin: "left center" }}>
            <span style={{ display: "inline-block", borderRadius: 12, padding: "8px 16px", fontSize: 14, fontWeight: 700, background: "rgba(255,159,10,0.16)", color: C.amber }}>Mixed signals</span>
          </div>
          <p style={{ marginTop: 12, fontSize: 10, lineHeight: 1.35, color: "rgba(255,255,255,0.8)" }}>The portfolio exhibits strong diversification with moderate volatility and lower concentration risk.</p>
          <p style={{ marginTop: 8, fontSize: 10, lineHeight: 1.35, color: "rgba(255,255,255,0.5)" }}>• Daily movements indicate a calm market environment.</p>
        </div>

        <div style={{ marginTop: 12, borderRadius: 20, border: `1px solid ${proTint.borderColor}`, background: proTint.background, padding: 16 }}>
          {INSIGHT_PILLARS.map((p, i) => {
            const s = spring({ frame: f - i * 8, fps, config: { damping: 17 } });
            const op = interpolate(s, [0, 1], [0, 1]);
            const y = interpolate(s, [0, 1], [8, 0]);
            return (
              <div key={p.name} style={{ display: "flex", gap: 12, padding: "12px 0", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none", opacity: op, transform: `translateY(${y}px)` }}>
                <div style={{ marginTop: 2, display: "flex", height: 36, width: 36, flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: 10, background: "rgba(74,222,128,0.16)", color: C.gain }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>{INSIGHT_ICONS[p.icon]}</svg>
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{p.name}</span>
                    <LensMeter score={p.score} />
                  </div>
                  <div style={{ marginTop: 2, fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{p.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Alpha Score (Alpha Pro) ---------------- */
/* Matches AlphaScoreScreen exactly: real GOOGL.US data — Quality/Distress/
   Profitability/Leverage pillars on a /100 scale, 9-segment meter. */

const SCORE_PILLARS = [
  { name: "Quality", score: 78, label: "strong financial quality" },
  { name: "Distress", score: 85, label: "low bankruptcy risk" },
  { name: "Profitability", score: 90, label: "solid returns" },
  { name: "Leverage", score: 88, label: "conservative balance sheet" },
];
function ScoreMeter({ score, grow }: { score: number; grow: number }) {
  const segs = 9;
  const filled = Math.round((score / 100) * segs * grow);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: segs }).map((_, i) => <span key={i} style={{ width: 10, height: 10, borderRadius: 3, background: i < filled ? C.gain : "rgba(255,255,255,0.12)" }} />)}
    </div>
  );
}

export function AiScreen() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scoreGrow = interpolate(f, [10, 40], [0, 1], clamp);
  const score = Math.round(85 * scoreGrow);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <DetailHeader title="GOOGL.US" right="share" />
      <div style={{ flex: 1, overflow: "hidden", padding: "12px 16px 0" }}>
        <GlassCard>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.3, color: "#fff" }}>ALPHA SCORE</div>
            <span style={{ display: "flex", height: 24, width: 24, alignItems: "center", justifyContent: "center", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 9, color: "rgba(255,255,255,0.5)" }}>?</span>
          </div>
          <div style={{ marginTop: 4, fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Balanced · Fundamental read</div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 30, fontWeight: 700, color: C.gain }}>{score}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>/100</span>
            </div>
            <span style={{ borderRadius: 999, padding: "4px 10px", fontSize: 9, fontWeight: 600, background: "rgba(74,222,128,0.16)", color: C.gain }}>Strong</span>
          </div>
          <div style={{ marginTop: 6, fontSize: 9, color: "rgba(255,255,255,0.45)" }}>Strongest pillar: profitability (90/100)</div>
        </GlassCard>

        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
          {SCORE_PILLARS.map((p, i) => {
            const s = spring({ frame: f - i * 7, fps, config: { damping: 17 } });
            const op = interpolate(s, [0, 1], [0, 1]);
            const y = interpolate(s, [0, 1], [10, 0]);
            const grow = interpolate(f, [i * 7, 18 + i * 7], [0, 1], clamp);
            return (
              <GlassCard key={p.name} style={{ opacity: op, transform: `translateY(${y}px)` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{p.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.gain }}>{p.score}/100</span>
                </div>
                <div style={{ marginTop: 6 }}><ScoreMeter score={p.score} grow={grow} /></div>
                <div style={{ marginTop: 4, fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>{p.label}</div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
