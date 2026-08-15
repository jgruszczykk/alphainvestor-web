import type { ComponentType } from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AllocationScreen, InstrumentScreen, LensesScreen, WalletScreen } from "./screens";
import { C, fontFamily } from "./theme";
import { Aurora, Caption, Phone } from "./ui";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ---------------- Intro ---------------- */

function Intro() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 16 } });
  const scale = interpolate(s, [0, 1], [0.8, 1]);
  const out = interpolate(f, [46, 60], [1, 0], clamp);
  const subY = interpolate(spring({ frame: f - 8, fps, config: { damping: 18 } }), [0, 1], [30, 0]);
  const subOp = interpolate(f, [8, 24], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: out, fontFamily }}>
      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -3, background: "linear-gradient(100deg,#fff,#cfe1ff 45%,#8fb6ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Alpha Investor</div>
      </div>
      <div style={{ marginTop: 26, fontSize: 42, color: C.muted, opacity: subOp, transform: `translateY(${subY}px)`, fontFamily }}>Your whole investing picture, in one place.</div>
    </AbsoluteFill>
  );
}

/* ---------------- Scene ---------------- */

function Scene({
  Screen,
  tab,
  eyebrow,
  title,
  first = false,
  showTabBar = true,
}: {
  Screen: ComponentType;
  tab: string;
  eyebrow: string;
  title: string;
  first?: boolean;
  showTabBar?: boolean;
}) {
  const f = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fadeIn = interpolate(f, [0, 12], [0, 1], clamp);
  const fadeOut = interpolate(f, [durationInFrames - 12, durationInFrames], [1, 0], clamp);
  const op = fadeIn * fadeOut;
  const enter = first ? spring({ frame: f, fps, config: { damping: 15, stiffness: 90 } }) : 1;
  const y = interpolate(enter, [0, 1], [first ? 520 : 0, 0]);
  // slow cinematic push-in across the scene
  const push = interpolate(f, [0, durationInFrames], [0.83, 0.9], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ transform: `translateY(${y - 70}px) scale(${push})` }}>
        <Phone tab={tab} showTabBar={showTabBar}>
          <Screen />
        </Phone>
      </div>
      <Caption eyebrow={eyebrow} title={title} atFrame={first ? 22 : 6} />
    </AbsoluteFill>
  );
}

/* ---------------- Outro ---------------- */

function Outro() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 16 } });
  const scale = interpolate(s, [0, 1], [0.9, 1]);
  const op = interpolate(f, [0, 14], [0, 1], clamp);
  const pill = spring({ frame: f - 14, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: op, fontFamily }}>
      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: -3, color: C.heading }}>Alpha Investor</div>
        <div style={{ marginTop: 20, fontSize: 40, color: C.muted }}>Portfolio clarity, pocket-sized.</div>
        <div style={{ marginTop: 48, display: "flex", gap: 22, justifyContent: "center", transform: `scale(${pill})` }}>
          <div style={{ padding: "26px 52px", borderRadius: 999, fontSize: 40, fontWeight: 700, color: "#fff", background: `linear-gradient(180deg,${C.brandHi},${C.brand})`, boxShadow: "0 20px 50px -16px rgba(10,132,255,0.6)" }}>Join Early Access</div>
          <div style={{ padding: "26px 44px", borderRadius: 999, fontSize: 40, fontWeight: 700, color: "#fff", background: "#000", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", gap: 14 }}>
             App Store
          </div>
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: C.faint }}>Educational software — not investment advice.</div>
      </div>
    </AbsoluteFill>
  );
}

/* ---------------- Composition ---------------- */

export const VIDEO = { width: 1080, height: 1920, fps: 30, durationInFrames: 682 };

export function ProductVideo() {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Aurora />
      <Sequence durationInFrames={62}><Intro /></Sequence>
      <Sequence from={56} durationInFrames={158}><Scene first Screen={WalletScreen} tab="wallet" eyebrow="Wallet" title="Track every portfolio" /></Sequence>
      <Sequence from={206} durationInFrames={128}><Scene Screen={AllocationScreen} tab="wallet" eyebrow="Allocation" title="See how you're split" /></Sequence>
      <Sequence from={326} durationInFrames={150}><Scene Screen={InstrumentScreen} tab="watchlist" showTabBar={false} eyebrow="Chart" title="Every signal, explained" /></Sequence>
      <Sequence from={468} durationInFrames={140}><Scene Screen={LensesScreen} tab="wallet" eyebrow="Alpha Pro" title="AI that explains" /></Sequence>
      <Sequence from={600} durationInFrames={82}><Outro /></Sequence>
    </AbsoluteFill>
  );
}
