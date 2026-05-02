import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { earlyAccessBodySchema } from "@/lib/early-access-schema";

const RESEND_API = "https://api.resend.com";

type ResendErrorBody = { message?: string; name?: string };

async function createResendContact(
  apiKey: string,
  email: string,
  firstName?: string,
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

  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: "Early access is not configured on this deployment." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  let parsed;
  try {
    parsed = earlyAccessBodySchema.parse(json);
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }
    throw e;
  }

  const name =
    parsed.name && parsed.name.length > 0 ? parsed.name : undefined;

  const created = await createResendContact(apiKey, parsed.email, name);

  const duplicate =
    !created.ok &&
    (created.status === 422 ||
      created.status === 409 ||
      /already exists|duplicate|already been taken/i.test(created.message));

  if (!created.ok && !duplicate) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 502 },
    );
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
          { error: "Something went wrong. Please try again later." },
          { status: 502 },
        );
      }
    }
  }

  if (duplicate) {
    return NextResponse.json({
      ok: true,
      message: "You are already on the list.",
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks — we will be in touch.",
  });
}
