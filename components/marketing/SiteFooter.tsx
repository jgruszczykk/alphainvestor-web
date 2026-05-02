import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("Home");
  const tFooter = await getTranslations("Footer");

  return (
    <footer
      className="anim-fade-rise relative z-10 mt-auto border-t border-[var(--border)] px-4 py-8 text-center text-xs text-[var(--muted)] sm:px-6"
      style={{ animationDelay: "920ms" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <p>
          © {new Date().getFullYear()} Alpha Investor. {tFooter("rights")}
        </p>
        <p className="mx-auto mt-2 max-w-xl">{t("disclaimer")}</p>
        <p className="mt-1 text-[10px] opacity-80">{tFooter("notAdvice")}</p>
      </div>
    </footer>
  );
}
