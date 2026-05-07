"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

const COOKIE_CONSENT_KEY = "ai_cookie_consent";
const CONSENT_CHANGED_EVENT = "ai-cookie-consent-changed";

function readConsent(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "accepted" || value === "rejected") {
    return value;
  }
  return null;
}

export function CookieConsentBanner() {
  const t = useTranslations("CookieConsent");
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const [isConsentLoaded, setIsConsentLoaded] = useState(false);
  const analyticsEnabled =
    process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === "1";

  useEffect(() => {
    setConsent(readConsent());
    setIsConsentLoaded(true);
  }, []);

  function setConsentValue(value: "accepted" | "rejected") {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    setConsent(value);
  }

  if (!analyticsEnabled || !isConsentLoaded || consent !== null) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-(--border) bg-background px-4 py-4 shadow-(--shadow-elevated)">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-foreground">
          {t("message")}{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:no-underline">
            {t("privacyLink")}
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setConsentValue("rejected")}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-(--border) px-4 text-sm font-medium text-foreground transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            {t("reject")}
          </button>
          <button
            type="button"
            onClick={() => setConsentValue("accepted")}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-(--brand-hover)"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
