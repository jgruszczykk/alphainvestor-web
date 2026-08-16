import type { ComponentType, ReactNode } from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Flash, HookChaos, Kinetic, Pill, PopOut, WhitePoint, WhiteWorld } from "./ad-ui";
import { AiScreen, InstrumentScreen, LensesScreen, WalletScreen } from "./screens";
import { C, fontFamily } from "./theme";
import { Phone } from "./ui";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function PhoneStage({ Screen, tab, slam = false, showTabBar = true }: { Screen: ComponentType; tab: string; slam?: boolean; showTabBar?: boolean }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let y: number, scale: number, rot = 0, blur = 0;
  // Smaller + shifted further up than the phone alone would need, to leave
  // clearance below for LowerLine once it moves out of Instagram's Reels UI
  // dead zone (bottom ~320px+, more once a two-line caption wraps). Verified
  // empirically against rendered stills, not CSS math alone.
  if (slam) {
    const s = spring({ frame: f, fps, config: { damping: 14, stiffness: 120, mass: 0.9 } });
    y = interpolate(s, [0, 1], [420, -110]);
    scale = interpolate(s, [0, 1], [0.5, 0.76]);
    rot = interpolate(s, [0, 1], [-6, 0]);
    blur = interpolate(f, [0, 12], [14, 0], clamp);
  } else {
    const p = spring({ frame: f, fps, config: { damping: 16, stiffness: 220, mass: 0.6 } });
    scale = interpolate(p, [0, 1], [0.72, 0.76]);
    y = -110;
    blur = interpolate(f, [0, 6], [6, 0], clamp);
  }
  const float = Math.sin(f / 22) * 8;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `translateY(${y + float}px) scale(${scale}) rotate(${rot}deg)`, filter: blur > 0.2 ? `blur(${blur}px)` : "none" }}>
        <Phone tab={tab} showTabBar={showTabBar}>
          <Screen />
        </Phone>
      </div>
    </AbsoluteFill>
  );
}

function LowerLine({ text }: { text: string }) {
  return (
    <div style={{ position: "absolute", left: 70, right: 70, bottom: 400, textAlign: "center" }}>
      <Kinetic text={text} size={70} delay={4} stagger={3} color="#0b1220" />
    </div>
  );
}

function PopChip({ children, bg, color, shadow }: { children: ReactNode; bg: string; color: string; shadow: string }) {
  return <div style={{ padding: "26px 50px", borderRadius: 26, fontSize: 62, fontWeight: 800, color, background: bg, boxShadow: shadow, fontFamily, whiteSpace: "nowrap" }}>{children}</div>;
}
const GreenPop = (t: string) => <PopChip bg="linear-gradient(180deg,#3ddc84,#16a34a)" color="#fff" shadow="0 30px 70px -20px rgba(22,163,74,0.6)">{t}</PopChip>;
const AmberPop = (t: string) => <PopChip bg="#fff7e6" color={C.amber} shadow="0 30px 70px -20px rgba(255,159,10,0.4)">{t}</PopChip>;

function Scene({ Screen, tab, line, pop, slam = false, dx = 190, dy = -470, showTabBar = true }: { Screen: ComponentType; tab: string; line: string; pop: ReactNode; slam?: boolean; dx?: number; dy?: number; showTabBar?: boolean }) {
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill>
      <PhoneStage Screen={Screen} tab={tab} slam={slam} showTabBar={showTabBar} />
      <PopOut dur={durationInFrames} dx={dx} dy={dy}>{pop}</PopOut>
      <LowerLine text={line} />
      <Flash at={0} peak={0.5} len={5} color="#ffffff" />
    </AbsoluteFill>
  );
}

function HookDark() {
  const f = useCurrentFrame();
  const converge = interpolate(f, [44, 72], [0, 1], clamp);
  const line1Out = interpolate(f, [24, 30], [1, 0], clamp);
  const shake = Math.sin(f * 3.4) * 9 * interpolate(f, [58, 72], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: "#000", transform: `translateX(${shake}px)` }}>
      <HookChaos converge={converge} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 80px" }}>
        {f < 30 ? (
          <div style={{ opacity: line1Out }}>
            <Kinetic text="Building wealth is a serious game." size={90} delay={3} />
          </div>
        ) : (
          <Kinetic text="Stop playing it blind." size={128} delay={0} stagger={3} />
        )}
      </AbsoluteFill>
      <Flash at={12} peak={0.4} len={4} />
      <Flash at={28} peak={0.4} len={3} />
    </AbsoluteFill>
  );
}

function CTA() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: f, fps, config: { damping: 14 } });
  const pills = spring({ frame: f - 18, fps, config: { damping: 13 } });
  const disc = interpolate(f, [40, 52], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily }}>
      <div style={{ transform: `scale(${interpolate(logo, [0, 1], [0.85, 1])})`, opacity: logo, textAlign: "center" }}>
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2, color: "#0a84ff", marginBottom: 26 }}>Alpha Investor</div>
        <Kinetic text="Take command of your money." size={86} delay={2} color="#0b1220" />
      </div>
      <div style={{ marginTop: 60, display: "flex", gap: 24, transform: `scale(${interpolate(pills, [0, 1], [0.7, 1])})`, opacity: pills }}>
        <Pill>Download free</Pill>
        <Pill kind="dark"> App Store</Pill>
      </div>
      <div style={{ marginTop: 44, fontSize: 26, color: "#64748b", opacity: disc }}>Educational software — not investment advice.</div>
    </AbsoluteFill>
  );
}

export const AD = { width: 1080, height: 1920, fps: 30, durationInFrames: 466 };

/** Music bed for the ad (public/audio/ad-bed.wav) — a 15.6s window (16.0-
 * 31.6s) of "Vlog Beat Background" by Tunetank, Pixabay Content License.
 * Fades in over the hook, holds through the scene run, fades out under the
 * CTA so it never cuts off abruptly. */
function AdBed() {
  const f = useCurrentFrame();
  const volume = interpolate(f, [0, 10, 415, 450], [0, 1, 1, 0], clamp);
  return <Audio src={staticFile("audio/ad-bed.wav")} volume={volume} />;
}

export function AdVideo() {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AdBed />
      <Sequence from={78} durationInFrames={388}><WhiteWorldSeq /></Sequence>
      <Sequence durationInFrames={74}><HookDark /></Sequence>
      <WhitePoint growStart={62} growEnd={86} />

      {/* Cuts land on ad-bed.wav's actual rhythm grid — a recurring hit every
          45 frames (1.5s @ 30fps) anchored at frame 100, found via RMS
          onset-energy analysis of this track (Tunetank - Vlog Beat
          Background). */}
      <Sequence from={100} durationInFrames={90}><Scene slam Screen={WalletScreen} tab="wallet" line="See everything you're building." pop={GreenPop("▲ +12.48%")} /></Sequence>
      <Sequence from={190} durationInFrames={90}><Scene Screen={InstrumentScreen} tab="watchlist" showTabBar={false} line="Every price. Every move." pop={GreenPop("NVDA ▲ +128%")} dx={-190} dy={-460} /></Sequence>
      <Sequence from={280} durationInFrames={90}><Scene Screen={AiScreen} tab="wallet" showTabBar={false} line="Know what actually matters." pop={GreenPop("Score 85 · Strong")} /></Sequence>
      <Sequence from={370} durationInFrames={45}><Scene Screen={LensesScreen} tab="wallet" line="See the whole wallet, scored." pop={AmberPop("✦ Mixed signals")} dx={-190} dy={-460} /></Sequence>

      <Sequence from={415} durationInFrames={51}><CTA /></Sequence>
    </AbsoluteFill>
  );
}

function WhiteWorldSeq() {
  const f = useCurrentFrame();
  const appear = interpolate(f, [0, 14], [0, 1], clamp);
  return <WhiteWorld appear={appear} />;
}
