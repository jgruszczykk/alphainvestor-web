import type { ReactNode } from "react";

type Props = {
  id?: string;
  className?: string;
  animationDelay?: string;
  children: ReactNode;
};

export function MarketingSection({
  id,
  className = "",
  animationDelay = "0ms",
  children,
}: Props) {
  return (
    <section
      id={id}
      className={[
        "mx-auto w-full max-w-6xl scroll-mt-24",
        className,
      ].join(" ")}
      style={{ animationDelay }}
    >
      {children}
    </section>
  );
}

export function MarketingSectionHeader({
  title,
  intro,
  className = "",
}: {
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <header className={["mx-auto max-w-2xl text-center", className].join(" ")}>
      <h2 className="text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
        {title}
      </h2>
      {intro ? (
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          {intro}
        </p>
      ) : null}
    </header>
  );
}

export function MarketingCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-[var(--border)] bg-transparent p-5 transition-colors duration-200 dark:bg-white/[0.025] sm:p-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
