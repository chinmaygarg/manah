import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const { addAudienceContact } = vi.hoisted(() => ({
  addAudienceContact: vi.fn(),
}));
vi.mock("@/lib/forms/resend", () => ({ addAudienceContact }));

import { POST } from "./route";

const VALID = { email: "asha@example.com", turnstileToken: "token" };

function post(body: unknown, ip = "7.7.7.7"): Request {
  return new Request("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

function mockTurnstile(success: boolean) {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ success }), { status: 200 }),
  );
}

beforeEach(() => {
  vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
  addAudienceContact.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/newsletter", () => {
  it("adds the contact and returns 200", async () => {
    mockTurnstile(true);
    const res = await POST(post(VALID, "3.0.0.1"));
    expect(res.status).toBe(200);
    expect(addAudienceContact).toHaveBeenCalledWith("asha@example.com");
  });

  it("returns 400 for an invalid email", async () => {
    mockTurnstile(true);
    const res = await POST(post({ ...VALID, email: "bad" }, "3.0.0.2"));
    expect(res.status).toBe(400);
    expect(addAudienceContact).not.toHaveBeenCalled();
  });

  it("returns 400 when Turnstile fails", async () => {
    mockTurnstile(false);
    const res = await POST(post(VALID, "3.0.0.3"));
    expect(res.status).toBe(400);
  });

  it("silently returns 200 when the honeypot is filled", async () => {
    mockTurnstile(true);
    const res = await POST(
      post({ ...VALID, company_website: "bot" }, "3.0.0.4"),
    );
    expect(res.status).toBe(200);
    expect(addAudienceContact).not.toHaveBeenCalled();
  });

  it("returns 502 when the audience add throws", async () => {
    mockTurnstile(true);
    addAudienceContact.mockRejectedValue(new Error("down"));
    const res = await POST(post(VALID, "3.0.0.5"));
    expect(res.status).toBe(502);
  });
});
