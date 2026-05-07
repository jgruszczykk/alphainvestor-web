"use client";

import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "ai_cookie_consent";
const CONSENT_CHANGED_EVENT = "ai-cookie-consent-changed";

function hasAnalyticsConsent() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
}

/** Renders Vercel Web Analytics only when `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=1`. */
export function VercelAnalyticsGate() {
  const [canTrack, setCanTrack] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      setCanTrack(hasAnalyticsConsent());
    };

    updateConsent();
    window.addEventListener(CONSENT_CHANGED_EVENT, updateConsent);
    window.addEventListener("storage", updateConsent);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, updateConsent);
      window.removeEventListener("storage", updateConsent);
    };
  }, []);

  if (process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS !== "1") {
    return null;
  }
  if (!canTrack) {
    return null;
  }

  return <Analytics />;
}
