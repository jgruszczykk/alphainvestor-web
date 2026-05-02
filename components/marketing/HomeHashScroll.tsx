"use client";

import { useEffect } from "react";

/** After SPA navigation to `/#section`, scroll the target into view (browser may not). */
export function HomeHashScroll() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "").trim();
    if (!id) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    };
    requestAnimationFrame(() => requestAnimationFrame(run));
  }, []);
  return null;
}
