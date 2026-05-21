import type { ContactInput, PartnerInput } from "./schemas";

const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes HTML-significant characters so user input is inert in email bodies. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPE_MAP[char] ?? char);
}

function row(label: string, value: string | undefined): string {
  if (!value || value.trim() === "") return "";
  return (
    `<tr>` +
    `<td style="padding:6px 14px;font-weight:600;color:#0a1f44;` +
    `vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>` +
    `<td style="padding:6px 14px;color:#333;">${escapeHtml(value)}</td>` +
    `</tr>`
  );
}

function messageBlock(message: string): string {
  const safe = escapeHtml(message).replace(/\n/g, "<br>");
  return (
    `<p style="margin:16px 14px 0;font-weight:600;color:#0a1f44;">Message</p>` +
    `<p style="margin:4px 14px 0;color:#333;line-height:1.55;">${safe}</p>`
  );
}

function shell(title: string, rows: string, message: string): string {
  return (
    `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;">` +
    `<h2 style="color:#0a1f44;">${escapeHtml(title)}</h2>` +
    `<table style="border-collapse:collapse;width:100%;">${rows}</table>` +
    messageBlock(message) +
    `</div>`
  );
}

/** Builds the HTML body for a Contact-form notification email. */
export function renderContactEmail(data: ContactInput): string {
  const rows =
    row("Name", data.name) +
    row("Email", data.email) +
    row("Phone", data.phone) +
    row("Company", data.company) +
    row("Inquiry type", data.type) +
    row("Division of interest", data.division);
  return shell("New contact enquiry", rows, data.message);
}

/** Builds the HTML body for a Partner-form notification email. */
export function renderPartnerEmail(data: PartnerInput): string {
  const rows =
    row("Organization", data.organization) +
    row("Contact person", data.contactPerson) +
    row("Email", data.email) +
    row("Phone", data.phone) +
    row("Partnership type", data.partnershipType) +
    row("Area of interest", data.areaOfInterest);
  return shell("New partnership inquiry", rows, data.message);
}
