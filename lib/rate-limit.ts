// Simple in-memory rate limiter. One request per WINDOW_MS per key.
// Adequate for launch traffic; swap for Upstash or Vercel KV when real
// load arrives (see Day 6 audit task).

const WINDOW_MS = 10_000;
const buckets = new Map<string, number>();

type RateResult = { ok: true } | { ok: false; retryAfterSeconds: number };

export function checkRateLimit(key: string): RateResult {
  const now = Date.now();
  const last = buckets.get(key) ?? 0;
  const elapsed = now - last;

  if (elapsed < WINDOW_MS) {
    return { ok: false, retryAfterSeconds: Math.ceil((WINDOW_MS - elapsed) / 1000) };
  }

  buckets.set(key, now);

  // Periodic cleanup so the map doesn't grow without bound.
  if (buckets.size > 5_000) {
    for (const [k, t] of buckets) {
      if (now - t > WINDOW_MS * 6) buckets.delete(k);
    }
  }

  return { ok: true };
}
