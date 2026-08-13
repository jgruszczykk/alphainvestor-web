import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "./theme";
import { DetailHeader, GlassCard, TabHeader } from "./ui";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function Title({ children }: { children: string }) {
  const f = useCurrentFrame();
  const op = interpolate(f, [0, 10], [0, 1], clamp);
  return <div style={{ fontSize: 62, fontWeight: 800, color: "#fff", letterSpacing: -1.5, padding: "8px 4px 18px", opacity: op }}>{children}</div>;
}

/* ---------------- Wallet ---------------- */

const PTS = [
  [0, 0.42], [0.16, 0.62], [0.32, 0.66], [0.5, 0.64], [0.66, 0.5], [0.82, 0.32], [1, 0.16],
] as const;

export function WalletScreen() {
  const f = useCurrentFrame();
  const W = 468, H = 200;
  const d = PTS.map((p, i) => `${i === 0 ? "M" : "L"} ${(p[0] * W).toFixed(1)} ${(p[1] * H).toFixed(1)}`).join(" ");
  const dash = interpolate(f, [8, 52], [1, 0], clamp);
  const areaOp = interpolate(f, [40, 60], [0, 1], clamp);
  const pl = Math.round(interpolate(f, [10, 46], [0, 1098], clamp));
  const plp = interpolate(f, [10, 46], [0, 12.48], clamp);
  const mv = interpolate(f, [16, 58], [0, 9890.34], clamp);

  return (
    <>
      <TabHeader />
      <Title>Wallet</Title>
      <GlassCard>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 1, color: "#fff" }}>WALLET VALUE</div>
        <div style={{ fontSize: 23, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>Historical portfolio value · 1W</div>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {["1W", "1M", "3M", "1Y", "5Y"].map((o, i) => (
            <span key={o} style={{ padding: "8px 18px", borderRadius: 999, fontSize: 22, fontWeight: 700, color: i === 0 ? "#fff" : "rgba(235,235,245,0.8)", background: i === 0 ? `linear-gradient(180deg,${C.brandHi},${C.brand})` : "rgba(255,255,255,0.08)", boxShadow: i === 0 ? "inset 0 1px 0 rgba(255,255,255,0.4)" : "none" }}>{o}</span>
          ))}
        </div>
        <div style={{ marginTop: 22, borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", padding: 16 }}>
          <div style={{ textAlign: "right", fontSize: 20, color: "rgba(255,255,255,0.4)" }}>8 492</div>
          <svg width={W} height={H} style={{ display: "block" }}>
            <line x1="0" y1={H * 0.16} x2={W} y2={H * 0.16} stroke={C.brand} strokeWidth={2.5} opacity={0.9} />
            <path d={`${d} L ${W} ${H} L 0 ${H} Z`} fill="url(#g)" opacity={areaOp} />
            <path d={d} fill="none" stroke={C.gain} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={dash} />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.gain} stopOpacity={0.25} />
                <stop offset="100%" stopColor={C.gain} stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, marginTop: 6 }}>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>24/4</span>
            <span style={{ color: C.brand, fontWeight: 700 }}>8 492.23 USD</span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>4/5</span>
          </div>
        </div>
      </GlassCard>
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <GlassCard style={{ flex: 1, padding: 26 }}>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.45)" }}>Total P/L</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: C.gain, marginTop: 6 }}>≈ {pl.toLocaleString("en-US")} USD</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 26 }}>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.45)" }}>Total P/L %</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: C.gain, marginTop: 6 }}>{plp.toFixed(2)}%</div>
        </GlassCard>
      </div>
      <GlassCard style={{ marginTop: 20, padding: 26 }}>
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.45)" }}>Total wealth</div>
        <div style={{ fontSize: 50, fontWeight: 800, color: "#fff", marginTop: 6 }}>{mv.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</div>
      </GlassCard>
    </>
  );
}

/* ---------------- Allocation ---------------- */

const SECTORS = [
  { name: "Technology", pct: 68, color: C.s1 },
  { name: "Financial Services", pct: 14, color: C.s2 },
  { name: "Consumer Defensive", pct: 11, color: C.s3 },
  { name: "Real Estate", pct: 4, color: C.s4 },
  { name: "Energy", pct: 2, color: C.s5 },
];
const HOLD = [{ s: "ADBE", p: 39 }, { s: "ASML", p: 14 }, { s: "COKE", p: 11 }];

export function AllocationScreen() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = interpolate(f, [8, 40], [0, 1], clamp);
  const ring = interpolate(f, [6, 40], [0, 50], clamp);
  const rC = 2 * Math.PI * 78;
  return (
    <>
      <TabHeader />
      <Title>Allocation</Title>
      <GlassCard style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ position: "relative", width: 176, height: 176 }}>
          <svg width={176} height={176} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={88} cy={88} r={78} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={12} />
            <circle cx={88} cy={88} r={78} fill="none" stroke={C.amber} strokeWidth={12} strokeLinecap="round" strokeDasharray={rC} strokeDashoffset={rC * (1 - ring / 100)} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: "#fff" }}>{Math.round(ring)}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.amber }}>WATCH</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 10 }}><span style={{ color: C.loss }}>♥</span> HEALTH SCORE</div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.55)", marginTop: 8, lineHeight: 1.35 }}>A few names can move the whole profile — worth a quick check.</div>
        </div>
      </GlassCard>
      <GlassCard style={{ marginTop: 20 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>BY SECTOR</div>
        <div style={{ display: "flex", height: 18, borderRadius: 999, overflow: "hidden", marginTop: 14, background: "rgba(255,255,255,0.05)" }}>
          {SECTORS.map((s) => (
            <div key={s.name} style={{ width: `${s.pct * grow}%`, background: s.color }} />
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          {SECTORS.map((s, i) => {
            const op = interpolate(f, [12 + i * 4, 24 + i * 4], [0, 1], clamp);
            return (
              <div key={s.name} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 26, opacity: op }}>
                <span style={{ color: "rgba(255,255,255,0.78)", display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 16, height: 16, borderRadius: 4, background: s.color }} /> {s.name}</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>{s.pct}%</span>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginTop: 20 }}>LARGEST HOLDINGS</div>
        <div style={{ marginTop: 12 }}>
          {HOLD.map((h, i) => {
            const x = interpolate(spring({ frame: f - (18 + i * 6), fps, config: { damping: 16 } }), [0, 1], [40, 0]);
            const op = interpolate(f, [18 + i * 6, 30 + i * 6], [0, 1], clamp);
            return (
              <div key={h.s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", opacity: op, transform: `translateX(${x}px)` }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>{h.s}</span>
                <span style={{ fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{h.p}%</span>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </>
  );
}

/* ---------------- Five lenses ---------------- */

/* Exact copy from public/marketing/screens/five-lenses.png (symbol TTD). */
const LENS = [
  { name: "Trend", score: 1, tone: C.loss, label: "Bearish", icon: "trend", desc: "TTD: 3M -39.9%, session -0.6% both down (Bearish)—pressure shows in the window and today, not just one print." },
  { name: "Valuation", score: 3, tone: C.amber, label: "Fairly valued", icon: "val", desc: "TTD: P/E 26.1, EV/EBITDA 15.3, P/B 4.66 → our quick read: “fairly valued”." },
  { name: "Growth", score: 3, tone: C.amber, label: "Moderate growth", icon: "growth", desc: "TTD: rev/sh 6.03, NI/sh 0.92 → “moderate growth” on a coarse scale." },
  { name: "Risk", score: 3, tone: C.amber, label: "Moderate risk", icon: "risk", desc: "TTD: D/E 0.18, ROE 16.9%, gross margin 78.6% → “moderate risk” (education only)." },
  { name: "Momentum", score: 4, tone: C.gain, label: "Neutral", icon: "mom", desc: "TTD: RSI 54 middle-ish, histogram +0.314 positive—slight buyer edge, no clear stretch yet." },
];

const LENS_ICONS: Record<string, React.ReactNode> = {
  trend: <path d="M4 15l5-5 4 3 6-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />,
  val: <><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth={1.8} /><circle cx="12" cy="12" r="2.4" fill="currentColor" /></>,
  growth: <path d="M13 3l-8 10h6l-1 8 8-10h-6l1-8Z" fill="currentColor" />,
  risk: <path d="M12 4l9 15H3l9-15Zm0 6v4m0 3h.01" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />,
  mom: <path d="M13 3l-8 10h6l-1 8 8-10h-6l1-8Z" fill="currentColor" />,
};

function LensMeter({ score, tone }: { score: number; tone: string }) {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ width: 12, height: 12, borderRadius: 3, background: i <= score ? tone : "rgba(255,255,255,0.12)" }} />
      ))}
      <span style={{ fontSize: 24, fontWeight: 800, color: tone, marginLeft: 6 }}>{score}/5</span>
    </div>
  );
}

export function LensesScreen() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <DetailHeader title="TTD" right="share" />
      <div style={{ marginTop: 8 }}>
        {LENS.map((l, i) => {
          const s = spring({ frame: f - (6 + i * 7), fps, config: { damping: 17 } });
          const op = interpolate(s, [0, 1], [0, 1]);
          const y = interpolate(s, [0, 1], [16, 0]);
          return (
            <div key={l.name} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: i < LENS.length - 1 ? "1px solid #2c2c2e" : "none", opacity: op, transform: `translateY(${y}px)` }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, flexShrink: 0, background: `${l.tone}26`, color: l.tone, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={26} height={26} viewBox="0 0 24 24">{LENS_ICONS[l.icon]}</svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 30, fontWeight: 800, color: "#fff" }}>{l.name}</span>
                  <LensMeter score={l.score} tone={l.tone} />
                </div>
                <div style={{ fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{l.label}</div>
                <div style={{ fontSize: 19, color: "rgba(255,255,255,0.42)", marginTop: 8, lineHeight: 1.4 }}>{l.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------------- AI insight ---------------- */

const BULLETS = [
  "Top 3 positions ≈ 63.1% of value — concentration risk.",
  "Diversification score 51/100 — moderate spread.",
  "Daily volatility ≈ 1.60% — normal fluctuation.",
];

export function AiScreen() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chip = spring({ frame: f - 14, fps, config: { damping: 12 } });
  return (
    <>
      <DetailHeader title="" right="grid" />
      <Title>Long Term Portfolio</Title>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: "rgba(255,255,255,0.5)", marginTop: -14, marginBottom: 10 }}>PORTFOLIO INSIGHT</div>
      <GlassCard
        style={{
          // Real "pro" variant: aurora wash (purple→blue) layered OVER the
          // normal charcoal glass base — matches AppCard.tsx's ProCardOverlay
          // + iosBrand.auroraWash.dark, not a solid purple replacement.
          background:
            "linear-gradient(100deg, rgba(124,58,237,0.16), rgba(59,130,246,0.11)), linear-gradient(155deg, rgba(46,46,50,0.92), rgba(28,28,30,0.88) 55%, rgba(20,20,22,0.85))",
          border: "1.5px solid rgba(167,139,250,0.40)",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 1, color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: C.ai, fontSize: 34 }}>✦</span> SIGNAL READOUT
        </div>
        <div style={{ marginTop: 22, transform: `scale(${chip})`, transformOrigin: "left center" }}>
          <span style={{ display: "inline-block", padding: "16px 30px", borderRadius: 22, fontSize: 40, fontWeight: 800, color: C.amber, background: "rgba(255,159,10,0.16)" }}>Mixed signals</span>
        </div>
        <div style={{ fontSize: 27, color: "rgba(255,255,255,0.8)", marginTop: 24, lineHeight: 1.4 }}>Moderate risk and average diversification. Key holdings drive most of the value — potential headline risk.</div>
        <div style={{ marginTop: 22 }}>
          {BULLETS.map((b, i) => {
            const op = interpolate(f, [26 + i * 8, 38 + i * 8], [0, 1], clamp);
            const x = interpolate(f, [26 + i * 8, 38 + i * 8], [-20, 0], clamp);
            return <div key={b} style={{ fontSize: 25, color: "rgba(255,255,255,0.55)", padding: "8px 0", opacity: op, transform: `translateX(${x}px)`, lineHeight: 1.35 }}>• {b}</div>;
          })}
        </div>
      </GlassCard>
    </>
  );
}

/* ---------------- Instrument chart — matches real app exactly ---------------- */
/* Real screen: symbol name, red/green %-change line, segmented range, line
   chart w/ hi-lo + date labels, then Volume bars + RSI line + MACD histogram
   stacked below in the SAME card (see public/marketing/screens/instrument-chart.png). */

const IPTS = [0.14, 0.28, 0.22, 0.34, 0.3, 0.42, 0.5, 0.44, 0.38, 0.46, 0.55, 0.5, 0.62, 0.7, 0.66, 0.78, 0.74, 0.86, 0.94];
export function InstrumentScreen() {
  const f = useCurrentFrame();
  const W = 468, H = 170;
  const dash = interpolate(f, [8, 44], [1, 0], clamp);
  const areaOp = interpolate(f, [36, 50], [0, 1], clamp);
  const d = IPTS.map((v, i) => `${i === 0 ? "M" : "L"} ${((i / (IPTS.length - 1)) * W).toFixed(1)} ${(H - v * H).toFixed(1)}`).join(" ");
  return (
    <>
      <DetailHeader title="NVDA" right="share" />
      <div style={{ fontSize: 40, fontWeight: 800, color: "#fff", padding: "14px 0 10px" }}>NVIDIA Corp.</div>
      <GlassCard>
        <div style={{ display: "flex", gap: 10 }}>
          {["1W", "1M", "3M", "1Y", "5Y"].map((o, i) => (
            <span key={o} style={{ padding: "8px 16px", borderRadius: 999, fontSize: 21, fontWeight: 700, color: i === 3 ? "#fff" : "rgba(235,235,245,0.8)", background: i === 3 ? `linear-gradient(180deg,${C.brandHi},${C.brand})` : "rgba(255,255,255,0.08)" }}>{o}</span>
          ))}
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, color: C.gain, marginTop: 16 }}>+91.20 (+128.4%) <span style={{ fontWeight: 700 }}>↑ past 1Y</span></div>
        <div style={{ fontSize: 20, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Closed: today at 4:00 PM</div>
        <div style={{ marginTop: 14, borderRadius: 18, border: "1px solid rgba(255,255,255,0.06)", padding: 14 }}>
          <div style={{ textAlign: "right", fontSize: 19, color: "rgba(255,255,255,0.4)" }}>163.90</div>
          <svg width={W} height={H} style={{ display: "block" }}>
            <line x1="0" y1={H * 0.62} x2={W} y2={H * 0.62} stroke={C.brand} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.7} />
            <path d={`${d} L ${W} ${H} L 0 ${H} Z`} fill="url(#ig)" opacity={areaOp} />
            <path d={d} fill="none" stroke={C.gain} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={dash} />
            <defs><linearGradient id="ig" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.gain} stopOpacity={0.22} /><stop offset="100%" stopColor={C.gain} stopOpacity={0} /></linearGradient></defs>
          </svg>
          <div style={{ textAlign: "right", fontSize: 19, color: "rgba(255,255,255,0.4)" }}>71.51</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, marginTop: 4 }}>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Aug 2025</span>
            <span style={{ color: C.brand, fontWeight: 700 }}>163.14</span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Aug 2026</span>
          </div>
        </div>
        <MiniVolume seed={2} />
        <MiniLine label="RSI (14)" value="61.4" seed={5} color={C.brand} />
        <MiniHist label="MACD (12,26,9)" value="0.842" seed={9} />
      </GlassCard>
    </>
  );
}

function MiniVolume({ seed }: { seed: number }) {
  const f = useCurrentFrame();
  return (
    <div style={{ marginTop: 14 }}>
      <svg width={468} height={38}>
        {Array.from({ length: 46 }).map((_, i) => {
          const h = 4 + rand(i + seed) * 30;
          const g = interpolate(f, [10 + i * 0.6, 22 + i * 0.6], [0, 1], clamp);
          return <rect key={i} x={i * 10.2} y={38 - h * g} width={6} height={h * g} fill="rgba(255,255,255,0.35)" />;
        })}
      </svg>
      <div style={{ fontSize: 19, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Volume</div>
    </div>
  );
}
function MiniLine({ label, value, seed, color }: { label: string; value: string; seed: number; color: string }) {
  const f = useCurrentFrame();
  const dash = interpolate(f, [16, 42], [1, 0], clamp);
  const pts = Array.from({ length: 30 }).map((_, i) => 0.5 + Math.sin(i / 3 + seed) * 0.3 * (rand(i + seed) * 0.6 + 0.4));
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${((i / (pts.length - 1)) * 468).toFixed(1)} ${(38 - v * 38).toFixed(1)}`).join(" ");
  return (
    <div style={{ marginTop: 14 }}>
      <svg width={468} height={38}><path d={d} fill="none" stroke={color} strokeWidth={2.5} pathLength={1} strokeDasharray={1} strokeDashoffset={dash} /></svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, color: "rgba(255,255,255,0.4)", marginTop: 2 }}><span>{label}</span><span>{value}</span></div>
    </div>
  );
}
function MiniHist({ label, value, seed }: { label: string; value: string; seed: number }) {
  const f = useCurrentFrame();
  return (
    <div style={{ marginTop: 14 }}>
      <svg width={468} height={30}>
        {Array.from({ length: 46 }).map((_, i) => {
          const v = Math.sin(i / 4 + seed) * (0.4 + rand(i + seed) * 0.6);
          const up = v >= 0;
          const h = Math.abs(v) * 13;
          const g = interpolate(f, [16 + i * 0.5, 26 + i * 0.5], [0, 1], clamp);
          return <rect key={i} x={i * 10.2} y={up ? 15 - h * g : 15} width={6} height={h * g} fill={up ? C.gain : C.loss} />;
        })}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, color: "rgba(255,255,255,0.4)", marginTop: 2 }}><span>{label}</span><span>{value}</span></div>
    </div>
  );
}
function rand(i: number) { const x = Math.sin(i * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); }
