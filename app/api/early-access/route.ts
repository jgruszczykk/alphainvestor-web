import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getClientIp } from "@/lib/client-ip";
import { earlyAccessRequestSchema } from "@/lib/early-access-schema";
import { assertWaitlistRateLimits } from "@/lib/rate-limit/waitlist";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

const RESEND_API = "https://api.resend.com";

/** Reject oversized JSON bodies (bytes). */
const MAX_BODY_BYTES = 8192;

type ResendErrorBody = { message?: string; name?: string };

const copy = {
  en: {
    thanks: "Thanks - we will be in touch.",
    duplicate: "You are already on the list.",
    invalidEmail: "Please enter a valid email address.",
    serverError: "Something went wrong. Please try again later.",
    notConfigured: "Early access is not configured on this deployment.",
    badJson: "Invalid JSON body.",
    rateLimited: "Too many attempts. Please try again later.",
    captchaFailed: "Security check failed. Please refresh and try again.",
    badRequest: "Request could not be processed.",
  },
  pl: {
    thanks: "Dziękujemy - odezwiemy się.",
    duplicate: "Już jesteś na liście.",
    invalidEmail: "Podaj prawidłowy adres e-mail.",
    serverError: "Coś poszło nie tak. Spróbuj ponownie później.",
    notConfigured: "Zapisy nie są skonfigurowane na tym środowisku.",
    badJson: "Nieprawidłowe dane JSON.",
    rateLimited: "Zbyt wiele prób. Spróbuj później.",
    captchaFailed: "Weryfikacja bezpieczeństwa nie powiodła się. Odśwież stronę i spróbuj ponownie.",
    badRequest: "Nie można przetworzyć żądania.",
  },
} as const;

function langOf(locale: unknown): "en" | "pl" {
  return locale === "pl" ? "pl" : "en";
}

async function createResendContact(
  apiKey: string,
  email: string,
  firstName?: string,
  properties?: Record<string, string>,
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const res = await fetch(`${RESEND_API}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      first_name: firstName || undefined,
      unsubscribed: false,
      ...(properties && Object.keys(properties).length > 0
        ? { properties }
        : {}),
    }),
  });

  if (res.ok) {
    return { ok: true };
  }

  let message = `Upstream error (${res.status})`;
  try {
    const data = (await res.json()) as ResendErrorBody;
    if (typeof data.message === "string") {
      message = data.message;
    }
  } catch {
    // ignore parse errors
  }

  return { ok: false, status: res.status, message };
}

async function addContactToSegment(
  apiKey: string,
  email: string,
  segmentId: string,
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const pathEmail = encodeURIComponent(email);
  const res = await fetch(
    `${RESEND_API}/contacts/${pathEmail}/segments/${segmentId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (res.ok) {
    return { ok: true };
  }

  let message = `Upstream error (${res.status})`;
  try {
    const data = (await res.json()) as ResendErrorBody;
    if (typeof data.message === "string") {
      message = data.message;
    }
  } catch {
    // ignore
  }

  return { ok: false, status: res.status, message };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID?.trim();

  const len = request.headers.get("content-length");
  if (len) {
    const n = Number(len);
    if (Number.isFinite(n) && n > MAX_BODY_BYTES) {
      return NextResponse.json({ error: copy.en.badRequest }, { status: 413 });
    }
  }

  let json: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: copy.en.badRequest }, { status: 413 });
    }
    json = raw.length ? JSON.parse(raw) : null;
  } catch {
    return NextResponse.json({ error: copy.en.badJson }, { status: 400 });
  }

  if (json === null || typeof json !== "object") {
    return NextResponse.json({ error: copy.en.badJson }, { status: 400 });
  }

  const L = langOf((json as { locale?: unknown }).locale);

  if (!apiKey?.trim()) {
    return NextResponse.json({ error: copy[L].notConfigured }, { status: 503 });
  }

  let parsed;
  try {
    parsed = earlyAccessRequestSchema.parse(json);
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        { error: copy[L].invalidEmail },
        { status: 400 },
      );
    }
    throw e;
  }

  const lang = langOf(parsed.locale);

  if (parsed.company?.trim()) {
    return NextResponse.json({ error: copy[lang].badRequest }, { status: 400 });
  }

  const ip = getClientIp(request);
  const turnstileOk = await verifyTurnstileToken(
    parsed.turnstileToken,
    ip,
  );
  if (!turnstileOk) {
    return NextResponse.json(
      { error: copy[lang].captchaFailed },
      { status: 400 },
    );
  }

  const rate = await assertWaitlistRateLimits(ip, parsed.email);
  if (!rate.ok) {
    return NextResponse.json(
      { error: copy[lang].rateLimited },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  const name =
    parsed.name && parsed.name.length > 0 ? parsed.name : undefined;

  const properties =
    parsed.locale === "en" || parsed.locale === "pl"
      ? { signup_locale: parsed.locale }
      : undefined;

  const created = await createResendContact(
    apiKey,
    parsed.email,
    name,
    properties,
  );

  const duplicate =
    !created.ok &&
    (created.status === 422 ||
      created.status === 409 ||
      /already exists|duplicate|already been taken/i.test(created.message));

  if (!created.ok && !duplicate) {
    return NextResponse.json({ error: copy[lang].serverError }, { status: 502 });
  }

  if (segmentId) {
    const segmentResult = await addContactToSegment(
      apiKey,
      parsed.email,
      segmentId,
    );
    if (!segmentResult.ok && !duplicate) {
      const segDup =
        segmentResult.status === 422 ||
        segmentResult.status === 409 ||
        /already/i.test(segmentResult.message);
      if (!segDup) {
        return NextResponse.json(
          { error: copy[lang].serverError },
          { status: 502 },
        );
      }
    }
  }

  if (duplicate) {
    return NextResponse.json({
      ok: true,
      message: copy[lang].duplicate,
    });
  }

  return NextResponse.json({
    ok: true,
    message: copy[lang].thanks,
  });
}
