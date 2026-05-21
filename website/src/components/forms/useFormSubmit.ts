"use client";

import { useCallback, useState } from "react";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FormSubmit {
  readonly status: SubmitStatus;
  readonly error: string | null;
  /** POSTs the payload as JSON. Resolves true on success, false otherwise. */
  submit(payload: Record<string, unknown>): Promise<boolean>;
}

const GENERIC_ERROR = "Something went wrong. Please try again.";

/** Shared submit state machine for the contact, partner and newsletter forms. */
export function useFormSubmit(endpoint: string): FormSubmit {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: Record<string, unknown>): Promise<boolean> => {
      setStatus("submitting");
      setError(null);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await response
          .json()
          .catch(() => ({}))) as { error?: string };

        if (!response.ok) {
          setError(data.error ?? GENERIC_ERROR);
          setStatus("error");
          return false;
        }

        setStatus("success");
        return true;
      } catch {
        setError("Network error. Please check your connection and retry.");
        setStatus("error");
        return false;
      }
    },
    [endpoint],
  );

  return { status, error, submit };
}
