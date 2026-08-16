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

/* ------------------------------------------------------------------ */
/* Everything below renders at the SAME 300px design width as the real
   site's components/site/phone/PhoneFrame.tsx + primitives.tsx — every
   px value here is copied verbatim from those files (Tailwind classes
   converted to their literal px equivalents), not hand-estimated at
   video scale. `Phone` renders this 300-wide canvas once, then applies
   a single CSS `scale()` transform to size it for the video — so
   corner radii, padding and font sizes stay in the exact same
   proportion as the site, with zero manual rescaling error. */

/** AppCard clone — rounded-[16px] p-3.5, exact site values. */
export function GlassCard({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        borderRadius: 16,
        padding: 14,
        background: "#1c1c1eeb",
        border: "1px solid #3f3f46",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 26px -16px rgba(0,0,0,0.75)",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** StatusBar clone — px-6 pt-3 pb-1 text-[10px], exact site icon paths/sizes. */
function StatusBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px 4px", fontSize: 10, fontWeight: 600, color: "#fff" }}>
      <span>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden>
          <path d="M8 2.2c2.4 0 4.6.9 6.2 2.4l1.3-1.4A11 11 0 0 0 8 .2 11 11 0 0 0 .5 3.2l1.3 1.4A9 9 0 0 1 8 2.2Z" />
          <path d="M8 5.6c1.4 0 2.7.5 3.7 1.4l1.3-1.4A7 7 0 0 0 8 3.6a7 7 0 0 0-5 1.9l1.3 1.5A5.4 5.4 0 0 1 8 5.6Z" />
          <path d="M8 8.8 10.2 6.6A3.2 3.2 0 0 0 8 5.8a3.2 3.2 0 0 0-2.2.8L8 8.8Z" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="2" y="2" width="18" height="8" rx="1.6" fill="currentColor" />
          <rect x="23" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" fillOpacity="0.5" />
        </svg>
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

/** Same icon glyphs as TabBar's `icons` map in primitives.tsx, at 18x18. */
function TabIcon({ id, active }: { id: string; active: boolean }) {
  const col = active ? "var(--brand)" : "rgba(235,235,245,0.5)";
  if (id === "wallet")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={col} aria-hidden>
        <path d="M12 3a9 9 0 1 0 9 9h-9V3Z" opacity="0.9" />
        <path d="M13 2.05V11h8.95A9 9 0 0 0 13 2.05Z" opacity="0.55" />
      </svg>
    );
  if (id === "watchlist")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.8" aria-hidden>
        <path strokeLinejoin="round" d="m12 3 2.6 5.4 6 .9-4.3 4.2 1 6-5.3-2.8L6.7 19.5l1-6L3.4 9.3l6-.9L12 3Z" />
      </svg>
    );
  if (id === "news")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.8" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path strokeLinecap="round" d="M7 9h6M7 13h10M7 17h10" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 13.5a7.9 7.9 0 0 0 .1-3l1.7-1.3-1.7-3-2 .8a7.8 7.8 0 0 0-2.6-1.5L12.6 2h-3.4l-.4 2.5A7.8 7.8 0 0 0 6.2 6l-2-.8-1.7 3L4.2 9.5a7.9 7.9 0 0 0 0 3l-1.7 1.3 1.7 3 2-.8c.8.6 1.6 1.1 2.6 1.5l.4 2.5h3.4l.4-2.5c1-.4 1.8-.9 2.6-1.5l2 .8 1.7-3-1.7-1.3Z" />
    </svg>
  );
}

/** TabBar clone — same floating-pill overlay as primitives.tsx exactly. */
function FloatingTabBar({ active = "wallet" }: { active?: string }) {
  return (
    <>
      <div
        style={{ pointerEvents: "none", position: "absolute", insetInline: 0, bottom: 0, zIndex: 10, height: 128, background: "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.7) 40%, transparent)" }}
        aria-hidden
      />
      <div style={{ position: "absolute", insetInline: 0, bottom: 0, zIndex: 20, padding: "6px 20px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 2,
            borderRadius: 20,
            padding: 4,
            background: "linear-gradient(165deg, rgba(100,100,108,0.5), rgba(72,72,78,0.46))",
            border: "0.5px solid rgba(255,255,255,0.18)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22), 0 10px 24px -14px rgba(0,0,0,0.6)",
            backdropFilter: "blur(24px) saturate(1.8)",
            WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          }}
        >
          {TABS.map((t) => {
            const on = t.id === active;
            return (
              <div key={t.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, borderRadius: 15, padding: "4px 0", color: on ? "var(--brand)" : "rgba(235,235,245,0.5)", background: on ? "rgba(255,255,255,0.08)" : "transparent" }}>
                <span style={{ display: "block", width: 17, height: 17 }}><TabIcon id={t.id} active={on} /></span>
                <span style={{ fontSize: 8, fontWeight: 500, lineHeight: 1 }}>{t.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const DESIGN_W = 300;
const DESIGN_H = 620; // matches PhoneFrame.tsx's DESIGN_H exactly

/** iPhone frame with children as the screen. `tab` selects the active tab.
 * Renders the bezel/screen at the exact same 300px design width as the
 * site's PhoneFrame.tsx, then applies one scale() transform to reach
 * `width` — so every radius/padding stays in the site's exact proportion. */
export function Phone({
  children,
  tab = "wallet",
  showTabBar = true,
  width = 620,
  style,
}: {
  children: ReactNode;
  tab?: string;
  showTabBar?: boolean;
  width?: number;
  style?: React.CSSProperties;
}) {
  const scale = width / DESIGN_W;
  return (
    <div style={{ position: "relative", width, height: DESIGN_H * scale, ...style }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <div style={{ position: "relative", borderRadius: 46.4, padding: 3, background: "linear-gradient(150deg,#3a3d45,#111318 40%,#26282f 70%,#0b0c10)", boxShadow: "0 40px 90px -30px rgba(0,0,0,0.85), 0 8px 24px -12px rgba(0,0,0,0.6)" }}>
          <div style={{ borderRadius: 44, background: "#000", padding: 10 }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 19.5", borderRadius: 33.6, overflow: "hidden", background: "#000", display: "flex", flexDirection: "column", fontFamily }}>
              <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 92, height: 26, borderRadius: 999, background: "#000", zIndex: 20 }} />
              <StatusBar />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>{children}</div>
              {showTabBar && <FloatingTabBar active={tab} />}
              <div style={{ position: "absolute", bottom: 7, left: "50%", transform: "translateX(-50%)", width: "34%", height: 5, borderRadius: 999, background: "rgba(255,255,255,0.45)", zIndex: 20 }} />
            </div>
          </div>
          <div style={{ position: "absolute", left: -3, top: 110, height: 32, width: 3, borderRadius: "2px 0 0 2px", background: "#26282f" }} aria-hidden />
          <div style={{ position: "absolute", left: -3, top: 160, height: 48, width: 3, borderRadius: "2px 0 0 2px", background: "#26282f" }} aria-hidden />
          <div style={{ position: "absolute", right: -3, top: 140, height: 64, width: 3, borderRadius: "0 2px 2px 0", background: "#26282f" }} aria-hidden />
        </div>
      </div>
    </div>
  );
}

/* -------- Screen headers — exact clones of HeaderRow / DetailHeaderRow -------- */
/* Tab-root screens (Wallet/Allocation/Portfolio Insight): grid icon left,
   plus icon right, h-8 w-8 (32px) circles. Push/detail screens (Instrument,
   Alpha Score): back-chevron left, centered title, share/grid icon right —
   same 32px circles. Both exactly match components/site/phone/screens.tsx +
   primitives.tsx (not the old 68px hand-scaled versions). */
function CircleBtn({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 999,
        background: "rgba(255,255,255,0.12)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      {children}
    </div>
  );
}
const GridIcon = (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" />
    <rect x="3" y="14" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" />
  </svg>
);
const ShareGridIcon = (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" />
    <rect x="3" y="14" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" />
  </svg>
);
const PlusIcon = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
);
const BackIcon = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 5l-7 7 7 7" /></svg>
);
const ShareIcon = (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 3v12M7 8l5-5 5 5M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" /></svg>
);

/** HeaderRow clone — tab-root screens (px-1 pt-2, no back button). */
export function TabHeader({ title, big = false }: { title?: string; big?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 4px 0" }}>
      <CircleBtn>{GridIcon}</CircleBtn>
      {!big && title && <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{title}</span>}
      <CircleBtn>{PlusIcon}</CircleBtn>
    </div>
  );
}

/** DetailHeaderRow clone — push/detail screens (px-4 pt-3, back + title + share/grid). */
export function DetailHeader({ title, right = "share" }: { title: string; right?: "share" | "grid" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 0" }}>
      <CircleBtn>{BackIcon}</CircleBtn>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", fontFamily }}>{title}</span>
      <CircleBtn>{right === "grid" ? ShareGridIcon : ShareIcon}</CircleBtn>
    </div>
  );
}

/** SegmentControl clone — equal-width grid, rounded-full pills, exact site values. */
export function SegmentControl({ options, activeIndex = 0 }: { options: string[]; activeIndex?: number }) {
  return (
    <div style={{ display: "grid", width: "100%", gap: 8, gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((opt, i) => (
        <span
          key={opt}
          style={
            i === activeIndex
              ? { borderRadius: 999, padding: "4px 8px", textAlign: "center", fontSize: 10, fontWeight: 600, background: "linear-gradient(180deg, #2493ff, #0a84ff)", color: "#fff", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 10px -3px rgba(10,132,255,0.65)" }
              : { borderRadius: 999, padding: "4px 8px", textAlign: "center", fontSize: 10, fontWeight: 600, background: "linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0.05))", color: "rgba(235,235,245,0.88)", border: "0.5px solid rgba(255,255,255,0.12)" }
          }
        >
          {opt}
        </span>
      ))}
    </div>
  );
}

/** Lower-third caption with eyebrow + headline, animated in. Video-only — no
 * site equivalent (it's the ad/demo video's own subtitle treatment). */
export function Caption({ eyebrow, title, atFrame = 0 }: { eyebrow: string; title: string; atFrame?: number }) {
  const f = useCurrentFrame() - atFrame;
  const op = interpolate(f, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(f, [0, 16], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 90, right: 90, bottom: 340, textAlign: "center", opacity: op, transform: `translateY(${y}px)`, fontFamily }}>
      <div style={{ display: "inline-block", padding: "10px 22px", borderRadius: 999, border: "1px solid rgba(148,163,184,0.3)", background: "rgba(148,163,184,0.1)", color: C.brandHi, fontSize: 26, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
      <div style={{ marginTop: 22, color: C.heading, fontSize: 66, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5 }}>{title}</div>
    </div>
  );
}
