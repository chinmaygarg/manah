import { Resend } from "resend";

let client: Resend | null = null;

function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}

interface SendEmailInput {
  readonly to: string;
  readonly subject: string;
  readonly html: string;
  readonly replyTo?: string;
}

/** Sends a transactional email via Resend. Throws on any failure. */
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailInput): Promise<void> {
  const from = process.env.MAIL_FROM;
  if (!from) {
    throw new Error("MAIL_FROM is not configured");
  }

  const { error } = await getClient().emails.send({
    from,
    to,
    subject,
    html,
    replyTo,
  });

  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
}

/** Adds a contact to the configured Resend Audience. Throws on any failure. */
export async function addAudienceContact(email: string): Promise<void> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    throw new Error("RESEND_AUDIENCE_ID is not configured");
  }

  const { error } = await getClient().contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    throw new Error(`Resend contact create failed: ${error.message}`);
  }
}
