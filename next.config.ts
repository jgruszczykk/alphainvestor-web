import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * Security headers for the marketing site.
 *
 * Enforced today:
 *   - HSTS with `preload` (we control the apex DNS, so preloading is safe).
 *   - X-Content-Type-Options to defeat MIME sniffing.
 *   - Referrer-Policy: strict-origin-when-cross-origin so outbound clicks
 *     don't leak the full URL.
 *   - X-Frame-Options + frame-ancestors 'none' so we can't be iframed
 *     (clickjacking).
 *   - A tight Permissions-Policy turning off APIs we never use.
 *
 * CSP is shipped in **Report-Only** mode for v1. Reasoning:
 *   - Next.js 16 + React 19 emit inline `<script>` / `<style>` for hydration
 *     and Tailwind's runtime CSS variables; without per-request nonces these
 *     trigger blocked-source warnings.
 *   - We rely on Cloudflare Turnstile (loads from challenges.cloudflare.com)
 *     and optionally Vercel Web Analytics — both require allowlisting.
 *   - Report-Only lets us land a baseline policy now, monitor real reports,
 *     then promote to enforced once the violation log is empty.
 *
 * To switch CSP to enforced once verified:
 *   1. Set `CSP_ENFORCE=1` in the Vercel project env.
 *   2. Redeploy. The header name flips to `Content-Security-Policy`.
 *
 * Reports go to the path set by `CSP_REPORT_URI` (a free https endpoint
 * works; recommend report-uri.com or Sentry's CSP endpoint). When unset,
 * `report-uri` is omitted so violations only appear in browser devtools.
 */

const cspDirectives = (): string => {
  const turnstile = "https://challenges.cloudflare.com";
  const vercelAnalytics = "https://va.vercel-scripts.com";
  const fontsCss = "https://fonts.googleapis.com";
  const fontsFiles = "https://fonts.gstatic.com";
  const reportUri = process.env.CSP_REPORT_URI?.trim();

  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    // 'unsafe-inline' on scripts is risky; we keep it OFF and rely on
    // Next.js hydration scripts being whitelisted via 'self'. If that
    // breaks something, prefer adding a nonce over relaxing this.
    "script-src": ["'self'", "'unsafe-inline'", turnstile, vercelAnalytics],
    // Tailwind v4 + Next can emit inline <style> for critical CSS;
    // 'unsafe-inline' is required until we wire nonces.
    "style-src": ["'self'", "'unsafe-inline'", fontsCss],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'", "data:", fontsFiles],
    "connect-src": ["'self'", turnstile, vercelAnalytics],
    "frame-src": [turnstile],
    "frame-ancestors": ["'none'"],
    "form-action": ["'self'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "upgrade-insecure-requests": [],
  };

  const parts = Object.entries(directives).map(([k, v]) =>
    v.length > 0 ? `${k} ${v.join(" ")}` : k,
  );

  if (reportUri) {
    parts.push(`report-uri ${reportUri}`);
  }

  return parts.join("; ");
};

const securityHeaders = (): { key: string; value: string }[] => {
  const csp = cspDirectives();
  const enforce = process.env.CSP_ENFORCE === "1";
  const cspHeaderName = enforce
    ? "Content-Security-Policy"
    : "Content-Security-Policy-Report-Only";

  return [
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: [
        "accelerometer=()",
        "autoplay=()",
        "camera=()",
        "geolocation=()",
        "gyroscope=()",
        "magnetometer=()",
        "microphone=()",
        "midi=()",
        "payment=()",
        "usb=()",
        "interest-cohort=()",
      ].join(", "),
    },
    { key: cspHeaderName, value: csp },
  ];
};

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to every HTML response. Static assets
        // under /_next/static/ are served by Vercel with their own
        // long-cache headers and don't need CSP.
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: securityHeaders(),
      },
    ];
  },
};

export default withNextIntl(nextConfig);
