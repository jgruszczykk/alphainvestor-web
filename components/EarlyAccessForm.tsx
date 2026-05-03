"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState, useTransition } from "react";

const turnstileSiteKey =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || ""
    : "";

type FormState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type Props = {
  /**
   * `embedded` - no outer card; use inside `CtaBand` so one bordered container wraps copy + fields.
   * `card` - standalone bordered block (e.g. future isolated page).
   */
  variant?: "card" | "embedded";
};

export function EarlyAccessForm({ variant = "card" }: Props) {
  const t = useTranslations("Form");
  const locale = useLocale();
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  /** Same token as state; refs update synchronously so submit never races onSuccess. */
  const turnstileTokenRef = useRef<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const embedded = variant === "embedded";
  const requiresTurnstile = Boolean(turnstileSiteKey);
  const turnstileReady = !requiresTurnstile || Boolean(turnstileToken);
  const disabled =
    isPending || state.status === "success" || !turnstileReady;

  const fieldBg = embedded
    ? "bg-transparent dark:bg-white/[0.04]"
    : "bg-[var(--surface)] dark:bg-white/[0.04]";

  function onSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "");
    const name = String(formData.get("name") ?? "");
    const company = String(formData.get("company") ?? "");

    const tokenNow = turnstileTokenRef.current ?? turnstileToken;
    if (requiresTurnstile && !tokenNow?.trim()) {
      setState({
        status: "error",
        message: t("errorCaptcha"),
      });
      return;
    }

    startTransition(async () => {
      setState({ status: "pending" });
      const token = (turnstileTokenRef.current ?? turnstileToken)?.trim();
      try {
        const res = await fetch("/api/early-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name: name || undefined,
            company: company || undefined,
            locale: locale === "pl" ? "pl" : "en",
            turnstileToken: token || undefined,
          }),
        });

        const data = (await res.json()) as {
          ok?: boolean;
          message?: string;
          error?: string;
        };

        if (res.status === 503) {
          setState({
            status: "error",
            message: data.error ?? t("errorNotConfigured"),
          });
          return;
        }

        if (res.status === 429) {
          setState({
            status: "error",
            message: data.error ?? t("errorRateLimited"),
          });
          return;
        }

        if (!res.ok) {
          turnstileTokenRef.current = null;
          setTurnstileToken(null);
          turnstileRef.current?.reset();
          setState({
            status: "error",
            message: data.error ?? t("errorGeneric"),
          });
          return;
        }

        setState({
          status: "success",
          message: data.message ?? t("successDefault"),
        });
      } catch {
        setState({
          status: "error",
          message: t("errorNetwork"),
        });
      }
    });
  }

  const formClass = embedded
    ? "relative flex w-full max-w-md flex-col gap-4"
    : "relative flex w-full max-w-md flex-col gap-3 rounded-2xl border border-[var(--border)] bg-transparent p-6 dark:bg-white/[0.02]";

  return (
    <form action={onSubmit} className={formClass}>
      {!embedded ? (
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-[var(--heading)]">
            {t("title")}
          </h2>
          <p className="text-sm text-[var(--muted)]">{t("subtitle")}</p>
        </div>
      ) : null}

      {/* Honeypot - hidden from users */}
      <div
        className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
        aria-hidden
      >
        <label htmlFor="waitlist-company">Company</label>
        <input
          id="waitlist-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-[var(--heading)]">
        {t("email")}
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          disabled={disabled}
          placeholder={t("emailPlaceholder")}
          className={`rounded-lg border border-[var(--border)] px-3 py-2 text-base font-normal text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--heading)]/10 disabled:opacity-60 ${fieldBg}`}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-[var(--heading)]">
        {t("name")}{" "}
        <span className="font-normal text-[var(--muted)]">
          {t("nameOptional")}
        </span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          maxLength={120}
          disabled={disabled}
          placeholder={t("namePlaceholder")}
          className={`rounded-lg border border-[var(--border)] px-3 py-2 text-base font-normal text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--heading)]/10 disabled:opacity-60 ${fieldBg}`}
        />
      </label>

      {requiresTurnstile ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[var(--muted)]">{t("captchaHint")}</p>
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            options={{ language: locale === "pl" ? "pl" : "en" }}
            onSuccess={(token) => {
              turnstileTokenRef.current = token;
              setTurnstileToken(token);
            }}
            onExpire={() => {
              turnstileTokenRef.current = null;
              setTurnstileToken(null);
            }}
            onError={() => {
              turnstileTokenRef.current = null;
              setTurnstileToken(null);
            }}
          />
        </div>
      ) : null}

      <button
        type="submit"
        disabled={disabled}
        className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-[var(--brand)] px-4 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-[background-color,opacity] duration-200 hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>

      {/*
        Single live region: success uses `polite` so it doesn't interrupt,
        error uses `assertive` so screen readers announce immediately. Both
        are also `role`d so VoiceOver/NVDA pick them up even when the
        underlying assistive-tech setting ignores `aria-live`.
      */}
      <div
        aria-live="polite"
        aria-atomic="true"
        role="status"
        className="min-h-[1.25rem]"
      >
        {state.status === "success" ? (
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            {state.message}
          </p>
        ) : null}
      </div>
      <div aria-live="assertive" aria-atomic="true" role="alert">
        {state.status === "error" ? (
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
