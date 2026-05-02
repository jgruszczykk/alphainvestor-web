import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getClientIp } from "@/lib/client-ip";
import { earlyAccessRequestSchema } from "@/lib/early-access-schema";
import { assertWaitlistRateLimits } from "@/lib/rate-limit/waitlist";
import { sendWaitlistWelcomeEmail } from "@/lib/resend/waitlistWelcomeEmail";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

const RESEND_API = "https://api.resend.com";

/** Reject oversized JSON bodies (bytes). */
const MAX_BODY_BYTES = 8192;

type ResendErrorBody = { message?: string; name?: string };

type CreateContactFailure = {
  ok: false;
  status: number;
  message: string;
  errorName?: string;
};

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

/**
 * Resend uses 422 for validation errors (e.g. unknown contact property), not only
 * duplicates. Treat duplicate only when status/message/name indicates it.
 */
function resendContactIsDuplicate(failure: CreateContactFailure): boolean {
  if (failure.status === 409) return true;
  const name = failure.errorName?.toLowerCase() ?? "";
  if (name.includes("duplicate")) return true;
  const m = failure.message.toLowerCase();
  return /already exists|duplicate contact|already been taken|already registered|contact with this email|contact already exists/i.test(
    m,
  );
}

async function createResendContact(
  apiKey: string,
  email: string,
  opts: {
    firstName?: string;
    properties?: Record<string, string>;
    segmentId?: string;
  } = {},
): Promise<{ ok: true } | CreateContactFailure> {
  const body: Record<string, unknown> = {
    email,
    first_name: opts.firstName || undefined,
    unsubscribed: false,
  };
  if (opts.properties && Object.keys(opts.properties).length > 0) {
    body.properties = opts.properties;
  }
  if (opts.segmentId) {
    body.segments = [{ id: opts.segmentId }];
  }

  const res = await fetch(`${RESEND_API}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return { ok: true };
  }

  let message = `Upstream error (${res.status})`;
  let errorName: string | undefined;
  try {
    const data = (await res.json()) as ResendErrorBody;
    if (typeof data.message === "string") {
      message = data.message;
    }
    if (typeof data.name === "string") {
      errorName = data.name;
    }
  } catch {
    // ignore parse errors
  }

  return { ok: false, status: res.status, message, errorName };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID?.trim();
  const welcomeFrom = process.env.RESEND_WELCOME_FROM?.trim();
  const localePropertyKey =
    process.env.RESEND_SIGNUP_LOCALE_PROPERTY_KEY?.trim() ?? "";

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
  const turnstileOk = await verifyTurnstileToken(parsed.turnstileToken);
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

  /** Resend rejects unknown property keys unless defined under Audience → Contact properties. */
  const properties =
    localePropertyKey.length > 0 &&
    (parsed.locale === "en" || parsed.locale === "pl")
      ? { [localePropertyKey]: parsed.locale }
      : undefined;

  const created = await createResendContact(apiKey, parsed.email, {
    firstName: name,
    properties,
    segmentId: segmentId || undefined,
  });

  if (!created.ok) {
    if (resendContactIsDuplicate(created)) {
      return NextResponse.json({
        ok: true,
        message: copy[lang].duplicate,
      });
    }
    return NextResponse.json({ error: copy[lang].serverError }, { status: 502 });
  }

  if (welcomeFrom) {
    await sendWaitlistWelcomeEmail({
      apiKey,
      from: welcomeFrom,
      to: parsed.email,
      lang,
      firstName: name,
    });
  }

  return NextResponse.json({
    ok: true,
    message: copy[lang].thanks,
  });
}
