import { z } from "zod";

const SHORT = 200;
const PHONE = 40;
const EMAIL = 320;
const MESSAGE = 5000;
const TOKEN = 4096;
const DIVISION = 50;

const INQUIRY_TYPES = [
  "General Inquiry",
  "Project / EPC Inquiry",
  "Partnership Opportunity",
  "Careers",
  "Media / Press",
  "Investor Relations",
] as const;

const PARTNERSHIP_TYPES = [
  "Joint Venture",
  "Technology Partner",
  "Subcontractor",
  "Supplier",
  "Other",
] as const;

const INTEREST_AREAS = [
  "Power Transmission",
  "Renewable Energy",
  "Infrastructure",
  "Defence Electronics",
  "Aviation",
  "Green Hydrogen",
  "Manufacturing",
] as const;

const email = z.string().trim().min(1).max(EMAIL).email();
const turnstileToken = z.string().trim().min(1).max(TOKEN);
const optionalText = (max: number) => z.string().trim().max(max).optional();

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(SHORT),
  email,
  phone: optionalText(PHONE),
  company: optionalText(SHORT),
  type: z.enum(INQUIRY_TYPES),
  division: optionalText(DIVISION),
  message: z.string().trim().min(1).max(MESSAGE),
  turnstileToken,
});

export const partnerSchema = z.object({
  organization: z.string().trim().min(1).max(SHORT),
  contactPerson: z.string().trim().min(1).max(SHORT),
  email,
  phone: optionalText(PHONE),
  partnershipType: z.enum(PARTNERSHIP_TYPES),
  areaOfInterest: z.enum(INTEREST_AREAS),
  message: z.string().trim().min(1).max(MESSAGE),
  turnstileToken,
});

export const newsletterSchema = z.object({
  email,
  turnstileToken,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type PartnerInput = z.infer<typeof partnerSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
