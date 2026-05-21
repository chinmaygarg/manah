import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { verifyTurnstile } from "./turnstile";

beforeEach(() => {
  vi.stubEnv("TURNSTILE_SECRET_KEY", "secret-key");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("verifyTurnstile", () => {
  it("returns true when Cloudflare reports success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
    expect(await verifyTurnstile("token")).toBe(true);
  });

  it("returns false when Cloudflare reports failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: false }), { status: 200 }),
    );
    expect(await verifyTurnstile("token")).toBe(false);
  });

  it("returns false when the secret key is missing", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    expect(await verifyTurnstile("token")).toBe(false);
  });

  it("returns false when the request throws", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));
    expect(await verifyTurnstile("token")).toBe(false);
  });
});
