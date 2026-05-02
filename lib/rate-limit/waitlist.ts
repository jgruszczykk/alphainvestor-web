import { neon } from "@neondatabase/serverless";

/** 15 minutes in seconds (IP window, same as former Upstash sliding window target). */
const IP_BUCKET_SEC = 15 * 60;
/** 24 hours in seconds (email window). */
const EMAIL_BUCKET_SEC = 24 * 60 * 60;

const MAX_IP_HITS = 8;
const MAX_EMAIL_HITS = 3;

type Sql = ReturnType<typeof neon>;

let sql: Sql | null | undefined;

function getSql(): Sql | null {
  if (sql !== undefined) return sql;
  const url = process.env.WAITLIST_RATE_LIMIT_DATABASE_URL?.trim();
  if (!url) {
    sql = null;
    return null;
  }
  sql = neon(url);
  return sql;
}

function ipBucketEpoch(): number {
  const s = Math.floor(Date.now() / 1000);
  return Math.floor(s / IP_BUCKET_SEC) * IP_BUCKET_SEC;
}

function emailBucketEpoch(): number {
  const s = Math.floor(Date.now() / 1000);
  return Math.floor(s / EMAIL_BUCKET_SEC) * EMAIL_BUCKET_SEC;
}

async function incrementAndReadHits(
  q: Sql,
  scope: "ip" | "email",
  subject: string,
  bucketEpoch: number,
): Promise<number> {
  const rows = (await q`
    INSERT INTO waitlist_rate_limits (scope, subject, bucket_epoch, hits)
    VALUES (${scope}, ${subject}, ${bucketEpoch}, 1)
    ON CONFLICT (scope, subject, bucket_epoch)
    DO UPDATE SET hits = waitlist_rate_limits.hits + 1
    RETURNING hits
  `) as { hits: number }[];
  const row = rows[0];
  return Number(row?.hits ?? 0);
}

/**
 * Fixed-window counters in Postgres (e.g. Neon — free tier, no card for signup).
 * No-op when `WAITLIST_RATE_LIMIT_DATABASE_URL` is unset.
 */
export async function assertWaitlistRateLimits(
  ip: string,
  emailNormalized: string,
): Promise<{ ok: true } | { ok: false }> {
  const q = getSql();
  if (!q) {
    return { ok: true };
  }

  const ipKey = ip.slice(0, 128);
  const emailKey = emailNormalized.slice(0, 256);

  try {
    const [ipHits, emailHits] = await Promise.all([
      incrementAndReadHits(q, "ip", ipKey, ipBucketEpoch()),
      incrementAndReadHits(q, "email", emailKey, emailBucketEpoch()),
    ]);

    if (ipHits > MAX_IP_HITS || emailHits > MAX_EMAIL_HITS) {
      return { ok: false };
    }
    return { ok: true };
  } catch (e) {
    console.error("[waitlist rate limit] database error:", e);
    return { ok: true };
  }
}
