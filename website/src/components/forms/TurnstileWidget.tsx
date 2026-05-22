"use client";

import { Turnstile } from "@marsidev/react-turnstile";

interface TurnstileWidgetProps {
  /** Called with a token when the challenge is solved. */
  readonly onVerify: (token: string) => void;
  /** Called when the token expires or errors, so callers can clear it. */
  readonly onReset: () => void;
}

/**
 * Cloudflare Turnstile widget. Reads the public site key from
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY. If the key is unset the form cannot be
 * verified, so a visible fallback message is shown rather than failing
 * silently (a missing widget leaves the submit button permanently disabled).
 */
export default function TurnstileWidget({
  onVerify,
  onReset,
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not configured");
    return (
      <p role="alert" className="text-body-sm text-red-600">
        Form verification is unavailable right now. Please email us directly.
      </p>
    );
  }

  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onVerify}
      onError={onReset}
      onExpire={onReset}
      options={{ theme: "light" }}
    />
  );
}
