import { describe, it, expect } from "vitest";
import { getClientId } from "./client-id";

function req(headers: Record<string, string>): Request {
  return new Request("http://localhost/api/contact", { headers });
}

describe("getClientId", () => {
  it("uses the first IP from x-forwarded-for", () => {
    expect(getClientId(req({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" }))).toBe(
      "1.1.1.1",
    );
  });

  it("falls back to x-real-ip", () => {
    expect(getClientId(req({ "x-real-ip": "3.3.3.3" }))).toBe("3.3.3.3");
  });

  it("returns 'unknown' when no IP header is present", () => {
    expect(getClientId(req({}))).toBe("unknown");
  });
});
