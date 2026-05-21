// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useFormSubmit } from "./useFormSubmit";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useFormSubmit", () => {
  it("starts in the idle state", () => {
    const { result } = renderHook(() => useFormSubmit("/api/contact"));
    expect(result.current.status).toBe("idle");
    expect(result.current.error).toBeNull();
  });

  it("moves to success on a 200 response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    const { result } = renderHook(() => useFormSubmit("/api/contact"));
    let ok: boolean | undefined;
    await act(async () => {
      ok = await result.current.submit({ name: "Asha" });
    });
    expect(ok).toBe(true);
    expect(result.current.status).toBe("success");
  });

  it("moves to error and surfaces the server message on a non-200", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: "Too many requests." }), {
        status: 429,
      }),
    );
    const { result } = renderHook(() => useFormSubmit("/api/contact"));
    await act(async () => {
      await result.current.submit({});
    });
    expect(result.current.status).toBe("error");
    expect(result.current.error).toBe("Too many requests.");
  });

  it("moves to error on a network failure", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    const { result } = renderHook(() => useFormSubmit("/api/contact"));
    await act(async () => {
      await result.current.submit({});
    });
    expect(result.current.status).toBe("error");
    expect(result.current.error).not.toBeNull();
  });
});
