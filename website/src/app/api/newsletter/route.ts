import { newsletterSchema } from "@/lib/forms/schemas";
import { createRateLimiter } from "@/lib/forms/rate-limit";
import { getClientId } from "@/lib/forms/client-id";
import { verifyTurnstile } from "@/lib/forms/turnstile";
import { addAudienceContact } from "@/lib/forms/resend";
import { jsonOk, jsonError } from "@/lib/forms/respond";
import { isHoneypotFilled } from "@/lib/forms/honeypot";

export const runtime = "nodejs";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request): Promise<Response> {
  const clientId = getClientId(request);
  if (!limiter.check(clientId)) {
    return jsonError(429, "Too many requests. Please try again shortly.");
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonError(400, "Invalid request.");
  }

  // Honeypot: a real user never fills this. Return a silent success so the
  // bot is not told it was caught.
  if (isHoneypotFilled(body)) {
    return jsonOk();
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, "Please enter a valid email address.");
  }
  const data = parsed.data;

  if (!(await verifyTurnstile(data.turnstileToken, clientId))) {
    return jsonError(400, "Verification failed. Please retry.");
  }

  try {
    await addAudienceContact(data.email);
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return jsonError(502, "Something went wrong. Please try again.");
  }

  return jsonOk();
}
