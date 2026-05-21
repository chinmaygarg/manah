import { describe, it, expect, vi, afterEach } from "vitest";
import { createRateLimiter } from "./rate-limit";

afterEach(() => {
  vi.useRealTimers();
});

describe("createRateLimiter", () => {
  it("allows requests up to the limit", () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 1000 });
    expect(limiter.check("ip-1")).toBe(true);
    expect(limiter.check("ip-1")).toBe(true);
    expect(limiter.check("ip-1")).toBe(true);
  });

  it("blocks the request that exceeds the limit", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
    limiter.check("ip-1");
    limiter.check("ip-1");
    expect(limiter.check("ip-1")).toBe(false);
  });

  it("tracks ids independently", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.check("ip-1")).toBe(true);
    expect(limiter.check("ip-2")).toBe(true);
    expect(limiter.check("ip-1")).toBe(false);
  });

  it("frees a slot once the window passes", () => {
    vi.useFakeTimers();
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.check("ip-1")).toBe(true);
    expect(limiter.check("ip-1")).toBe(false);
    vi.advanceTimersByTime(1001);
    expect(limiter.check("ip-1")).toBe(true);
  });
});
