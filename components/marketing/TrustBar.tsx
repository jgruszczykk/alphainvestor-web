import { getTranslations } from "next-intl/server";

const TRUST_KEYS = ["trustItem1", "trustItem2", "trustItem3", "trustItem4"] as const;

export async function TrustBar() {
  const t = await getTranslations("Home");

  return (
    <section
      id="trust-bar"
      className="anim-fade-rise mx-auto mt-8 w-full max-w-6xl border-y border-[var(--border)] py-6 sm:mt-10"
      style={{ animationDelay: "260ms" }}
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-xs font-medium text-[var(--muted)] sm:gap-x-6 sm:text-sm">
        {TRUST_KEYS.map((key, index) => (
          <li key={key} className="flex items-center gap-4">
            {index > 0 ? (
              <span className="hidden text-[var(--border)] sm:inline" aria-hidden>
                ·
              </span>
            ) : null}
            <span>{t(key)}</span>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-4 max-w-3xl text-center text-[11px] leading-relaxed text-[var(--muted)] sm:text-xs">
        {t("trustBrokersLine")}
      </p>
    </section>
  );
}
