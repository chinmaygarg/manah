/**
 * Maps a Contact-form inquiry type to the env var holding its mailbox.
 * Addresses themselves live in env vars, never in code.
 */
const ROUTING: Record<string, string> = {
  Careers: "MAIL_TO_CAREERS",
  "Media / Press": "MAIL_TO_MEDIA",
  "Partnership Opportunity": "MAIL_TO_PARTNERSHIPS",
};

function lookup(envKey: string): string {
  const address = process.env[envKey] || process.env.MAIL_TO_GENERAL;
  if (!address) {
    throw new Error(`No recipient configured (${envKey} / MAIL_TO_GENERAL)`);
  }
  return address;
}

/** Resolves the destination mailbox for a Contact-form submission. */
export function resolveRecipient(inquiryType: string): string {
  return lookup(ROUTING[inquiryType] ?? "MAIL_TO_GENERAL");
}

/** Resolves the destination mailbox for a Partner-form submission. */
export function getPartnerRecipient(): string {
  return lookup("MAIL_TO_PARTNERSHIPS");
}
