import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, fontFamily } from "./theme";

/** Drifting aurora background — blue + purple radial glows. */
export function Aurora() {
  const f = useCurrentFrame();
  const d = (a: number, b: number, speed: number) => interpolate(Math.sin((f / speed) * Math.PI * 2), [-1, 1], [a, b]);
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: `${d(-8, 4, 260)}%`, left: `${d(2, 14, 300)}%`, width: 900, height: 900, borderRadius: 9999, background: "rgba(10,132,255,0.30)", filter: "blur(120px)" }} />
      <div style={{ position: "absolute", top: `${d(20, 8, 340)}%`, right: `${d(-6, 6, 320)}%`, width: 820, height: 820, borderRadius: 9999, background: "rgba(191,90,242,0.24)", filter: "blur(130px)" }} />
      <div style={{ position: "absolute", bottom: `${d(-6, 6, 380)}%`, left: `${d(-4, 8, 360)}%`, width: 760, height: 760, borderRadius: 9999, background: "rgba(59,130,246,0.16)", filter: "blur(120px)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(120% 80% at 50% 20%, transparent 40%, rgba(3,7,18,0.6) 100%)" }} />
    </AbsoluteFill>
  );
}

export function GlassCard({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        // iOS 26 GlassView(regular) tinted with iosColors.dark.groupedBackground
        // (#1c1c1e) — matches src/components/common/AppCard.tsx exactly (charcoal
        // glass, not a light/blue sheen). borderRadius/border scaled 1.5x for
        // this 528px-wide phone canvas vs the app's ~350pt content width.
        borderRadius: 26,
        padding: 30,
        background: "linear-gradient(155deg, rgba(46,46,50,0.92), rgba(28,28,30,0.88) 55%, rgba(20,20,22,0.85))",
        border: "1.5px solid #3f3f46",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 50px -30px rgba(0,0,0,0.8)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "26px 44px 6px", color: "#fff", fontSize: 30, fontWeight: 700 }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 26 }}>
          {[10, 15, 20, 26].map((h) => (
            <div key={h} style={{ width: 6, height: h, background: "#fff", borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ width: 52, height: 26, border: "3px solid rgba(255,255,255,0.5)", borderRadius: 7, padding: 3 }}>
          <div style={{ width: "80%", height: "100%", background: "#fff", borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id: "wallet", label: "Wallet" },
  { id: "watchlist", label: "Watchlist" },
  { id: "news", label: "News" },
  { id: "settings", label: "Settings" },
];

function TabIcon({ id, active }: { id: string; active: boolean }) {
  const col = active ? C.brand : "rgba(235,235,245,0.55)";
  const s = 42;
  if (id === "wallet")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill={col}>
        <path d="M12 3a9 9 0 1 0 9 9h-9V3Z" opacity={0.95} />
        <path d="M13 2.05V11h8.95A9 9 0 0 0 13 2.05Z" opacity={0.55} />
      </svg>
    );
  if (id === "watchlist")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={1.8}>
        <path strokeLinejoin="round" d="m12 3 2.6 5.4 6 .9-4.3 4.2 1 6-5.3-2.8L6.7 19.5l1-6L3.4 9.3l6-.9L12 3Z" />
      </svg>
    );
  if (id === "news")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={1.8}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path strokeLinecap="round" d="M7 9h6M7 13h10M7 17h10" />
      </svg>
    );
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 13.5a7.9 7.9 0 0 0 .1-3l1.7-1.3-1.7-3-2 .8a7.8 7.8 0 0 0-2.6-1.5L12.6 2h-3.4l-.4 2.5A7.8 7.8 0 0 0 6.2 6l-2-.8-1.7 3L4.2 9.5a7.9 7.9 0 0 0 0 3l-1.7 1.3 1.7 3 2-.8c.8.6 1.6 1.1 2.6 1.5l.4 2.5h3.4l.4-2.5c1-.4 1.8-.9 2.6-1.5l2 .8 1.7-3-1.7-1.3Z" />
    </svg>
  );
}

function FloatingTabBar({ active = "wallet" }: { active?: string }) {
  return (
    <div style={{ marginTop: "auto", padding: "16px 26px 34px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: 8,
          padding: 12,
          borderRadius: 44,
          background: "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(20,22,28,0.6))",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,0.22), 0 24px 50px -24px rgba(0,0,0,0.85)",
        }}
      >
        {TABS.map((t) => {
          const on = t.id === active;
          return (
            <div key={t.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "12px 0", borderRadius: 34, background: on ? "rgba(255,255,255,0.10)" : "transparent", boxShadow: on ? "inset 0 2px 0 rgba(255,255,255,0.2)" : "none" }}>
              <TabIcon id={t.id} active={on} />
              <span style={{ fontSize: 20, fontWeight: 500, color: on ? C.brand : "rgba(235,235,245,0.55)" }}>{t.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** iPhone frame with children as the screen. `tab` selects the active tab. */
export function Phone({
  children,
  tab = "wallet",
  showTabBar = true,
  style,
}: {
  children: ReactNode;
  tab?: string;
  showTabBar?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ width: 620, ...style }}>
      <div style={{ position: "relative", borderRadius: 88, padding: 6, background: "linear-gradient(150deg,#3a3d45,#111318 40%,#26282f 70%,#0b0c10)", boxShadow: "0 80px 160px -50px rgba(0,0,0,0.9), 0 20px 50px -20px rgba(0,0,0,0.7)" }}>
        <div style={{ borderRadius: 82, background: "#000", padding: 22 }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 19.5", borderRadius: 62, overflow: "hidden", background: "#000", display: "flex", flexDirection: "column", fontFamily }}>
            <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", width: 150, height: 42, borderRadius: 999, background: "#000", zIndex: 20 }} />
            <StatusBar />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: "0 30px" }}>{children}</div>
            {showTabBar && <FloatingTabBar active={tab} />}
            <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", width: "34%", height: 9, borderRadius: 999, background: "rgba(255,255,255,0.5)", zIndex: 20 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- Screen headers (match real app exactly) -------- */
/* Tab-root screens (Wallet/Allocation): grid icon left, plus icon right, no
   centered title — the big title is a separate line below. Push/detail
   screens (Instrument, Five Lenses): back-chevron left, centered title,
   share/grid icon right. See public/marketing/screens/{wallet-value,
   five-lenses,fundamentals}.png. */
function CircleBtn({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: 68, height: 68, borderRadius: 999, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.75)" }}>
      {children}
    </div>
  );
}
const GridIcon = (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" /></svg>
);
const PlusIcon = (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
);
const BackIcon = (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
);
const ShareIcon = (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 8l5-5 5 5M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" /></svg>
);

export function TabHeader() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px" }}>
      <CircleBtn>{GridIcon}</CircleBtn>
      <CircleBtn>{PlusIcon}</CircleBtn>
    </div>
  );
}

export function DetailHeader({ title, right = "share" }: { title: string; right?: "share" | "grid" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0 4px" }}>
      <CircleBtn>{BackIcon}</CircleBtn>
      <span style={{ fontSize: 32, fontWeight: 700, color: "#fff", fontFamily }}>{title}</span>
      <CircleBtn>{right === "grid" ? GridIcon : ShareIcon}</CircleBtn>
    </div>
  );
}

/** Lower-third caption with eyebrow + headline, animated in. */
export function Caption({ eyebrow, title, atFrame = 0 }: { eyebrow: string; title: string; atFrame?: number }) {
  const f = useCurrentFrame() - atFrame;
  const op = interpolate(f, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(f, [0, 16], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 90, right: 90, bottom: 150, textAlign: "center", opacity: op, transform: `translateY(${y}px)`, fontFamily }}>
      <div style={{ display: "inline-block", padding: "10px 22px", borderRadius: 999, border: "1px solid rgba(148,163,184,0.3)", background: "rgba(148,163,184,0.1)", color: C.brandHi, fontSize: 26, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
      <div style={{ marginTop: 22, color: C.heading, fontSize: 66, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5 }}>{title}</div>
    </div>
  );
}
