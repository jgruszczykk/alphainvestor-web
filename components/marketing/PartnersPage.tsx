import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";

const PARTNERS_EMAIL = "partners@alphainvestor.app";

export async function PartnersPage() {
  const t = await getTranslations("Partners");

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px]"
        >
          {t("backHome")}
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.02em] text-[var(--heading)] sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--foreground)]">{t("intro")}</p>

        <section className="mt-10 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[var(--heading)]">{t("dataTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t("dataBody")}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--heading)]">{t("volumeTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t("volumeBody")}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--heading)]">{t("contactTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t("contactBody")}</p>
            <a
              href={`mailto:${PARTNERS_EMAIL}`}
              className="mt-3 inline-block text-sm font-semibold text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px]"
            >
              {PARTNERS_EMAIL}
            </a>
          </div>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-[var(--muted)]">{t("disclaimer")}</p>
      </main>
      <SiteFooter />
    </div>
  );
}
