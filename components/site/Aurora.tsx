/**
 * Decorative aurora background — deep-navy canvas with drifting blue/purple
 * radial glows and a faint grid texture. Purely cosmetic, aria-hidden.
 */
export function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ background: "var(--surface)" }} />
      <div
        className="aurora-blob anim-aurora"
        style={{ top: "-12%", left: "8%", width: "46vw", height: "46vw", background: "rgba(10,132,255,0.32)" }}
      />
      <div
        className="aurora-blob anim-aurora"
        style={{ top: "12%", right: "-6%", width: "40vw", height: "40vw", background: "rgba(191,90,242,0.24)", animationDelay: "-8s" }}
      />
      <div
        className="aurora-blob anim-aurora"
        style={{ top: "56%", left: "-8%", width: "42vw", height: "42vw", background: "rgba(59,130,246,0.16)", animationDelay: "-14s" }}
      />
      <div className="grid-texture absolute inset-0 opacity-60" />
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{ background: "linear-gradient(to top, var(--surface), transparent)" }}
      />
    </div>
  );
}
