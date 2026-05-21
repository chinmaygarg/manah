const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface SiteVerifyResponse {
  readonly success?: boolean;
}

/**
 * Verifies a Cloudflare Turnstile token server-side. Returns false on any
 * missing config, network failure, or unsuccessful verification — callers
 * treat false as "reject the submission".
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp && remoteIp !== "unknown") {
      body.set("remoteip", remoteIp);
    }

    const response = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await response.json()) as SiteVerifyResponse;
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}
