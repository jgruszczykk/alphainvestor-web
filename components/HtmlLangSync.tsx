"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/** Keeps `<html lang>` in sync on client navigations (root layout may not re-render). */
export function HtmlLangSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
