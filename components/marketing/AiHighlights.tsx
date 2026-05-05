import { getTranslations } from "next-intl/server";

export async function AiHighlights() {
  const t = await getTranslations("Home");

  return (
    <section
      id="ai"
      className="anim-fade-rise relative mx-auto mt-24 w-full max-w-5xl scroll-mt-24 lg:mt-28"
      style={{ animationDelay: "440ms" }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008))] px-6 py-12 text-center sm:px-10 sm:py-14">
        <span className="inline-flex items-center rounded-full border border-[var(--brand)]/30 bg-[var(--brand-tint)] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
          {t("aiProBadge")}
        </span>
        <h2 className="mx-auto mt-5 max-w-[20ch] text-balance text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--heading)] sm:text-4xl">
          {t("aiTitle")}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-[var(--foreground)] sm:text-lg">
          {t("aiIntro")}
        </p>
      </div>
    </section>
  );
}
