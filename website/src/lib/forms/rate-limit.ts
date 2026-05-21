interface RateLimiterOptions {
  readonly limit: number;
  readonly windowMs: number;
}

export interface RateLimiter {
  /** Returns true if the request is allowed, false if rate-limited. */
  check(id: string): boolean;
}

/**
 * In-memory per-id sliding-window limiter. Best-effort only: serverless
 * instances do not share this Map and it resets on cold start. Turnstile
 * and the honeypot are the primary bot defence.
 */
export function createRateLimiter({
  limit,
  windowMs,
}: RateLimiterOptions): RateLimiter {
  const hits = new Map<string, readonly number[]>();

  return {
    check(id) {
      const now = Date.now();
      const recent = (hits.get(id) ?? []).filter(
        (timestamp) => now - timestamp < windowMs,
      );

      if (recent.length >= limit) {
        hits.set(id, recent);
        return false;
      }

      hits.set(id, [...recent, now]);
      return true;
    },
  };
}
