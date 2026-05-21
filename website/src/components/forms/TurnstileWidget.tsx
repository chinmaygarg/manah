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
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY; renders nothing if it is unset.
 */
export default function TurnstileWidget({
  onVerify,
  onReset,
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not configured");
    return null;
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
