import { partnerSchema } from "@/lib/forms/schemas";
import { createRateLimiter } from "@/lib/forms/rate-limit";
import { getClientId } from "@/lib/forms/client-id";
import { verifyTurnstile } from "@/lib/forms/turnstile";
import { getPartnerRecipient } from "@/lib/forms/recipients";
import { renderPartnerEmail } from "@/lib/forms/email-templates";
import { sendEmail } from "@/lib/forms/resend";
import { jsonOk, jsonError } from "@/lib/forms/respond";

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

  if (
    typeof body.company_website === "string" &&
    body.company_website.trim() !== ""
  ) {
    return jsonOk();
  }

  const parsed = partnerSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, "Please check the form and try again.");
  }
  const data = parsed.data;

  if (!(await verifyTurnstile(data.turnstileToken, clientId))) {
    return jsonError(400, "Verification failed. Please retry.");
  }

  try {
    // Subject is a server-side constant — never interpolate user input into
    // it (header-injection safety). The organization name is in the body.
    await sendEmail({
      to: getPartnerRecipient(),
      replyTo: data.email,
      subject: "New partnership inquiry",
      html: renderPartnerEmail(data),
    });
  } catch (error) {
    console.error("Partner form send failed:", error);
    return jsonError(
      502,
      "Something went wrong. Please try again or email us directly.",
    );
  }

  return jsonOk();
}
