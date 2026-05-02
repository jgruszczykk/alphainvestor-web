import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url?.trim() || !token?.trim()) return null;
  return new Redis({ url, token });
}

let ipLimit: Ratelimit | null | undefined;
let emailLimit: Ratelimit | null | undefined;

function getIpLimiter(): Ratelimit | null {
  if (ipLimit !== undefined) return ipLimit;
  const redis = getRedis();
  if (!redis) {
    ipLimit = null;
    return null;
  }
  ipLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(8, "15 m"),
    prefix: "ratelimit:waitlist:ip",
  });
  return ipLimit;
}

function getEmailLimiter(): Ratelimit | null {
  if (emailLimit !== undefined) return emailLimit;
  const redis = getRedis();
  if (!redis) {
    emailLimit = null;
    return null;
  }
  emailLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "24 h"),
    prefix: "ratelimit:waitlist:email",
  });
  return emailLimit;
}

/** No-op when Upstash env is missing (local dev / CI). */
export async function assertWaitlistRateLimits(
  ip: string,
  emailNormalized: string,
): Promise<{ ok: true } | { ok: false }> {
  const ipLimiter = getIpLimiter();
  const emailLimiter = getEmailLimiter();
  if (!ipLimiter || !emailLimiter) {
    return { ok: true };
  }

  const [ipResult, emailResult] = await Promise.all([
    ipLimiter.limit(ip.slice(0, 128)),
    emailLimiter.limit(emailNormalized.slice(0, 256)),
  ]);

  if (!ipResult.success || !emailResult.success) {
    return { ok: false };
  }
  return { ok: true };
}
