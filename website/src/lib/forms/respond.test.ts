import { describe, it, expect } from "vitest";
import { jsonOk, jsonError } from "./respond";

describe("jsonOk", () => {
  it("returns a 200 with ok:true", async () => {
    const res = jsonOk();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});

describe("jsonError", () => {
  it("returns the given status with ok:false and the message", async () => {
    const res = jsonError(429, "Too many requests.");
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({
      ok: false,
      error: "Too many requests.",
    });
  });
});
