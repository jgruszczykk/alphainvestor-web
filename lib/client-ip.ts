/** Best-effort client IP for rate limiting (Vercel / Cloudflare / proxies). */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 128);
  }
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf.slice(0, 128);
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 128);
  return "unknown";
}
