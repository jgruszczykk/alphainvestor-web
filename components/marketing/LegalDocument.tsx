import { Link } from "@/i18n/navigation";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

type Props = {
  backHomeLabel: string;
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
  footerNote?: string;
};

export function LegalDocument({
  backHomeLabel,
  title,
  lastUpdated,
  intro,
  sections,
  footerNote,
}: Props) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="text-sm text-[var(--muted)] underline-offset-4 hover:text-[var(--heading)] hover:underline"
      >
        {backHomeLabel}
      </Link>
      <article className="space-y-8">
        <header className="space-y-3 border-b border-[var(--border)] pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--heading)]">{title}</h1>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            {lastUpdated}
          </p>
          {intro ? (
            <p className="text-sm leading-relaxed text-[var(--muted)]">{intro}</p>
          ) : null}
        </header>
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-base font-semibold text-[var(--heading)]">{section.title}</h2>
              <div className="space-y-3 text-sm leading-relaxed text-[var(--muted)]">
                {section.paragraphs.map((p, i) => (
                  <p key={`${section.title}-${i}`}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        {footerNote ? (
          <p className="border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)]">
            {footerNote}
          </p>
        ) : null}
      </article>
    </div>
  );
}
