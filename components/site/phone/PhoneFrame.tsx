"use client";

import type { ReactNode } from "react";

/**
 * Design canvas: every fixed px value below (bezel padding, dynamic island,
 * home indicator, side buttons, and all screen content in `screens.tsx` /
 * `primitives.tsx`) was tuned against a phone rendered at this width. Callers
 * render PhoneFrame at different widths (Hero ~300px, ProductTour column
 * ~260-300px, AlphaPro ~280px) — without scaling, content sized for 300px
 * looks oversized ("zoomed in") when squeezed into a narrower box. Fixing
 * this by rewriting every px value across two files isn't tractable; instead
 * we render the unchanged markup at its fixed design size and scale the
 * WHOLE canvas down/up via a CSS container-query ratio, so it's pixel-exact
 * at 300px and proportionally correct at any other width.
 */
const DESIGN_W = 300;
const DESIGN_H = 620; // = 300 through the bezel(3px)+black(10px) padding chain at aspect-[9/19.5]

/**
 * Marketing iPhone frame: titanium bezel, dynamic island, screen clip.
 * Children render inside a true-black screen at the app's aspect ratio.
 */
export function PhoneFrame({
  children,
  className = "",
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}`, containerType: "inline-size" }}
    >
      {glow && (
        <div
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(10,132,255,0.35), transparent 70%), radial-gradient(50% 40% at 70% 80%, rgba(191,90,242,0.28), transparent 70%)",
          }}
          aria-hidden
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(calc(100cqw / ${DESIGN_W}px))`,
          transformOrigin: "top left",
        }}
      >
        <div
          className="relative rounded-[2.9rem] p-[3px]"
          style={{
            background: "linear-gradient(150deg,#3a3d45,#111318 40%,#26282f 70%,#0b0c10)",
            boxShadow: "var(--shadow-phone)",
          }}
        >
          <div className="rounded-[2.75rem] bg-black p-[10px]">
            <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.1rem] bg-black">
              {/* dynamic island */}
              <div className="absolute left-1/2 top-2.5 z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" aria-hidden />
              <div className="flex h-full flex-col">{children}</div>
              {/* iOS home indicator */}
              <div
                className="pointer-events-none absolute bottom-[7px] left-1/2 z-20 h-[5px] w-[34%] -translate-x-1/2 rounded-full bg-white/45"
                aria-hidden
              />
            </div>
          </div>
          {/* side buttons */}
          <div className="absolute -left-[3px] top-[110px] h-8 w-[3px] rounded-l bg-[#26282f]" aria-hidden />
          <div className="absolute -left-[3px] top-[160px] h-12 w-[3px] rounded-l bg-[#26282f]" aria-hidden />
          <div className="absolute -right-[3px] top-[140px] h-16 w-[3px] rounded-r bg-[#26282f]" aria-hidden />
        </div>
      </div>
    </div>
  );
}
