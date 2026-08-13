import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const C = {
  bg: "#030712",
  bg2: "#070c1a",
  brand: "#0a84ff",
  brandHi: "#2493ff",
  ai: "#bf5af2",
  aiSoft: "#d9a6ff",
  gain: "#30d158",
  loss: "#ff453a",
  amber: "#ff9f0a",
  heading: "#f8fafc",
  text: "#cbd5e1",
  muted: "#94a3b8",
  faint: "#64748b",
  appCardTop: "rgba(255,255,255,0.12)",
  appCardBot: "rgba(255,255,255,0.03)",
  s1: "#ff453a",
  s2: "#64d2ff",
  s3: "#5e5ce6",
  s4: "#ffd60a",
  s5: "#30d158",
} as const;

export const FPS = 30;
