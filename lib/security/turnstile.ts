type SiteverifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

/**
 * When `TURNSTILE_SECRET_KEY` is unset, verification is skipped (dev/CI).
 *
 * We intentionally do **not** send `remoteip` to siteverify: behind Vercel +
 * Cloudflare (or other proxies), inferred IPs often mismatch the challenge IP
 * and Cloudflare returns `success: false`, causing spurious 400s.
 */
export async function verifyTurnstileToken(
  token: string | undefined,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return true;
  }
  if (!token?.trim()) {
    return false;
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token.trim());

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );

  try {
    const data = (await res.json()) as SiteverifyResponse;
    return data.success === true;
  } catch {
    return false;
  }
}
