/**
 * Returns true when the hidden honeypot field (`company_website`) was filled.
 * Real users never see or fill this field, so a non-empty value is a bot
 * signal. Callers respond with a silent success so the bot is not tipped off.
 */
export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  return (
    typeof body.company_website === "string" &&
    body.company_website.trim() !== ""
  );
}
