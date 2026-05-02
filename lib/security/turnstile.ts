type SiteverifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

/** When `TURNSTILE_SECRET_KEY` is unset, verification is skipped (dev/CI). */
export async function verifyTurnstileToken(
  token: string | undefined,
  remoteip: string,
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
  if (remoteip && remoteip !== "unknown") {
    body.set("remoteip", remoteip);
  }

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
